from running.models import RunActivity, Route
from rest_framework import viewsets, status, generics
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from running.serializers import (GetRouteSerializer, CreateUpdateRouteSerializer, PersonalBestSerializer,
                                 GetRunningSerializer, CreateUpdateRunningSerializer, MostRecentSerializer)
from django.db.models import F, ExpressionWrapper, FloatField

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
        latest = RunActivity.objects.filter(user=self.request.user).latest('finished')
        return latest if latest else None

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
        return best if best else None