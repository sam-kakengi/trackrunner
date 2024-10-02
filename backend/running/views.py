from datetime import datetime
from running.models import RunActivity, Route
from rest_framework import viewsets, status, generics
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from running.serializers import (ActivateRunSerializer, UpdateRunSerializer, GetRouteSerializer, CreateUpdateRouteSerializer, PersonalBestSerializer,
                                 GetRunningSerializer, CreateUpdateRunningSerializer, MostRecentSerializer, RunDataPointSerializer, ChartDataSerializer)
from django.db.models import F, ExpressionWrapper, FloatField
from .utils import format_seconds
from django.utils import timezone
from dateutil.relativedelta import relativedelta
from collections import defaultdict

class RouteView(viewsets.ModelViewSet):
    queryset = Route.objects.all()
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication]
    http_method_names = ['get', 'post', 'patch', 'delete']

    def get_serializer_class(self):
        """Return the correct serializer class based on the request method"""
        if self.request.method in ['POST', 'PATCH']:
            return CreateUpdateRouteSerializer
        return GetRouteSerializer

    def get_queryset(self):
        """Return only the RunActivities for the current user"""
        return Route.objects.filter(user=self.request.user)
    
    def perform_create(self, serializer):
        """Automatically set the user to the current user on save"""
        serializer.save(user=self.request.user)
    
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        response_serializer = GetRouteSerializer(serializer.instance)
        return Response(response_serializer.data, status=status.HTTP_201_CREATED)

class RunningView(viewsets.ModelViewSet):
    queryset = RunActivity.objects.all()
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication]
    http_method_names = ['get', 'post', 'patch']

    def get_queryset(self):
        """Return only the RunActivities for the current user"""
        return RunActivity.objects.filter(user=self.request.user)
    
    def create(self, request, *args, **kwargs):
        """Controls the creation of a new RunActivity"""
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        response_serializer = GetRunningSerializer(serializer.instance)
        return Response(response_serializer.data, status=status.HTTP_201_CREATED)

    def perform_create(self, serializer):
        """Automatically set the user to the current user on save"""
        serializer.save(user=self.request.user)
    
    def get_serializer_class(self):
        """Return the correct serializer class based on the request method"""
        if self.request.method in ['POST', 'PATCH']:
            return CreateUpdateRunningSerializer
        return GetRunningSerializer
    
    def get_object(self):
        """Return the specific RunActivity for the current user"""
        queryset = self.get_queryset()
        obj = generics.get_object_or_404(queryset, pk=self.kwargs.get('pk'))
        self.check_object_permissions(self.request, obj)
        return obj

class MostRecentRunView(generics.RetrieveAPIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication]
    serializer_class = MostRecentSerializer

    def get_object(self):
        """Return the most recent RunActivity for the current user"""
        try:
            latest = RunActivity.objects.filter(user=self.request.user, duration__isnull=False, finished__isnull=False).latest('finished')
        except RunActivity.DoesNotExist:
            latest = None
        return latest
    
    def get(self, request, *args, **kwargs):
        """Return the active run if it exists"""
        instance = self.get_object()
        if not instance:
            return Response({"detail": "No recently finished run."},status=status.HTTP_404_NOT_FOUND)
        serializer = self.get_serializer(instance)
        return Response(serializer.data)

class PersonalBestView(generics.RetrieveAPIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication]
    serializer_class = PersonalBestSerializer
    
    def get_object(self):
        """Return the personal best RunActivity for the current user"""
        speed_annotation = ExpressionWrapper(F('route__distance') / F('duration'), output_field=FloatField())
        best = RunActivity.objects.select_related('route').filter(user=self.request.user, route__distance__isnull=False
                                                            ).annotate(speed=speed_annotation).order_by('-speed').first()
        if not best:
            best = RunActivity.objects.select_related('route').filter(user=self.request.user).order_by('duration').first()
        return best

class ActiveRunView(generics.RetrieveUpdateAPIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication]
    http_method_names = ['get', 'post', 'patch']

    def get_object(self):
        """Returns an active (start has begun, but not complete) run for the current user"""
        try:
            active = RunActivity.objects.filter(user=self.request.user, finished__isnull=True, duration__isnull=True, start__lte=datetime.now()).latest('created')
            return active
        except RunActivity.DoesNotExist:
            return None
    
    def get(self, request, *args, **kwargs):
        """Return the active run if it exists"""
        instance = self.get_object()
        if not instance:
            return Response({"detail": "No active run currently."},status=status.HTTP_404_NOT_FOUND)
        serializer = self.get_serializer(instance)
        return Response(serializer.data)
    
    def post(self, request, *args, **kwargs):
        """Controls the activation of a new run"""
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        current_run = self.get_object()
        if current_run:
            return Response({"detail": "An active run already exists."}, status=status.HTTP_409_CONFLICT)
        aware_time = timezone.make_aware(datetime.now())
        serializer.save(user=request.user, start=aware_time)
        response_serializer = ActivateRunSerializer(serializer.instance)
        return Response(response_serializer.data, status=status.HTTP_201_CREATED)
    
    def patch(self, request, *args, **kwargs):
        """Controls the deactivation of an active RunActivity"""
        instance = self.get_object()
        if not instance:
            return Response({"detail": "No active run currently."},status=status.HTTP_404_NOT_FOUND)
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        if serializer.validated_data.get('paused'):
            if instance.paused:
                instance.paused += serializer.validated_data.get('paused')  
            else:
                instance.paused = serializer.validated_data.get('paused')
            instance.save()
            return Response({"detail": f"Current paused duration  {instance.paused}s"}, status=status.HTTP_200_OK)
        finished = timezone.make_aware(datetime.now())
        paused = instance.paused if instance.paused else 0
        duration = abs(round((finished.timestamp() - instance.start.timestamp()) - paused, 0))
        serializer.save(finished=finished, duration=duration)
        return Response({"message": "Run complete", "duration": format_seconds(duration), "id": instance.pk}, status=status.HTTP_200_OK)
    
    def get_serializer_class(self):
        """Return the correct serializer class based on the request method"""
        if self.request.method == 'POST':
            return ActivateRunSerializer
        elif self.request.method == 'PATCH':
            return UpdateRunSerializer
        else:
            return GetRunningSerializer


class ChartView(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication]
    serializer_class = ChartDataSerializer
    http_method_names = ['get']

    
    def get_queryset(self):
        """Return the default queryset for the last 3 months"""
        end_date = timezone.now().date()
        start_date = end_date - relativedelta(months=3)
        return RunActivity.objects.filter(
            user=self.request.user,
            finished__gte=start_date,
            finished__lte=end_date
        ).select_related('route')
    

    # def get(self, request, *args, **kwargs):
    #     """Return the chart data for the current user"""
    #     queryset = self.get_queryset()
    #     serializer = self.get_serializer(queryset) #TODO: Create a serializer for the chart request, include start and end date
    #     #TODO: Format data to match the expected response; the one in slack
    #     return Response(serializer.data) # TODO: Grab the start and end date from the reques
    

    def get(self, request, *args, **kwargs):
        """Return the chart data for the current user"""
        end_date = request.query_params.get('end')
        start_date = request.query_params.get('start')

        if end_date or start_date:
            queryset = self.filter_by_date_range(start_date, end_date)
        else:
            queryset = self.get_queryset()
            start_date = queryset.first().finished.strftime('%d-%m-%Y') if queryset.exists() else None
            end_date = queryset.last().finished.strftime('%d-%m-%Y') if queryset.exists() else None

        data_by_route = defaultdict(list)
        for run in queryset:
            data_by_route[run.route.name].append({
                "date": run.finished.strftime('%d-%m-%Y'),
                "duration": int(run.duration) if run.duration is not None else None
            })

        chart_data = {
            'start_date': start_date,
            'end_date': end_date,
            'chart_data': dict(data_by_route) if data_by_route else {"detail": "No routes found"}
        }

        serializer = self.get_serializer(chart_data)
        return Response(serializer.data)
    

    def filter_by_date_range(self, start_date, end_date):
        """Filter queryset by custom date range"""
        if end_date:
            try:
                end_date = timezone.datetime.strptime(end_date, '%d-%m-%Y').date()
            except ValueError:
                raise Response({"detail": "Invalid end date format. Use DD-MM-YYYY."}, status=status.HTTP_400_BAD_REQUEST)
        else:
            end_date = timezone.now().date()

        if start_date:
            try:
                start_date = timezone.datetime.strptime(start_date, '%d-%m-%Y').date()
            except ValueError:
                raise Response({"detail": "Invalid start date format. Use DD-MM-YYYY."}, status=status.HTTP_400_BAD_REQUEST)
        else:
            start_date = end_date - relativedelta(months=3)

        return RunActivity.objects.filter(
            user=self.request.user,
            finished__gte=start_date,
            finished__lte=end_date
        ).select_related('route').order_by('finished')
    
    

