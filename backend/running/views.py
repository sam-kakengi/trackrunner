from running.models import RunActivity, Route
from rest_framework import viewsets
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from running.serializers import GetRouteSerializer, CreateUpdateRouteSerializer

class RouteView(viewsets.ModelViewSet):
    queryset = Route.objects.all()
    permission_classes = [IsAuthenticated]
    authentication_classes = [SessionAuthentication, BasicAuthentication] #  TODO: Remove BasicAuthentication during merge

    def get_serializer_class(self):
        """Return the correct serializer class based on the request method"""
        if self.request.method == 'POST' or self.request.method == 'PATCH':
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

