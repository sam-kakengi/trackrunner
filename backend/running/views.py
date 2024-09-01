from datetime import datetime
from running.models import RunActivity, Route
from rest_framework import viewsets, status, generics
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from running.serializers import (ActivateRunSerializer, DeactivateRunSerializer, GetRouteSerializer, CreateUpdateRouteSerializer, PersonalBestSerializer,
                                 GetRunningSerializer, CreateUpdateRunningSerializer, MostRecentSerializer)
from django.db.models import F, ExpressionWrapper, FloatField
from .utils import format_seconds

class RouteView(viewsets.ModelViewSet):
    queryset = Route.objects.all()
    permission_classes = [IsAuthenticated]
    authentication_classes = [SessionAuthentication, BasicAuthentication] #  TODO: Remove BasicAuthentication during merge
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
    authentication_classes = [SessionAuthentication, BasicAuthentication] #  TODO: Remove BasicAuthentication during merge
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

class MostRecentRunView(generics.RetrieveAPIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [SessionAuthentication, BasicAuthentication] #  TODO: Remove BasicAuthentication during merge
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
    authentication_classes = [SessionAuthentication, BasicAuthentication] #  TODO: Remove BasicAuthentication during merge
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
    authentication_classes = [SessionAuthentication, BasicAuthentication] #  TODO: Remove BasicAuthentication during merge
    http_method_names = ['get', 'post', 'patch']

    def get_object(self):
        """Returns an active (start has begun, but not complete) run for the current user"""
        try:
            active = RunActivity.objects.filter(user=1, finished__isnull=True, duration__isnull=True, start__lte=datetime.now()).latest('created')
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
    
    def get_serializer(self, *args, **kwargs):
        return self.get_serializer_class()(*args, **kwargs)
    
    def post(self, request, *args, **kwargs):
        """Controls the activation of a new run"""
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(user=request.user, start=datetime.now())
        response_serializer = ActivateRunSerializer(serializer.instance)
        return Response(response_serializer.data, status=status.HTTP_201_CREATED)
    
    def patch(self, request, *args, **kwargs):
        """Controls the deactivation of an active RunActivity"""
        instance = self.get_object()
        if not instance:
            return Response({"detail": "No active run currently."},status=status.HTTP_404_NOT_FOUND)
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        finished = datetime.now()
        duration = round(finished.timestamp() - instance.start.timestamp(), 0)
        serializer.save(finished=finished, duration=duration)
        return Response({"duration": format_seconds(duration)}, status=status.HTTP_200_OK)
    
    def get_serializer_class(self):
        """Return the correct serializer class based on the request method"""
        if self.request.method == 'POST':
            return ActivateRunSerializer
        elif self.request.method == 'PATCH':
            return DeactivateRunSerializer
        else:
            return GetRunningSerializer