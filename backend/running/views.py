from django.shortcuts import render
from rest_framework import generics
from .models import RunActivity, Route
from .serializers import RunActivitySerializer, RoutesSerializer

class RunActivityListCreate(generics.ListCreateAPIView):
    queryset = RunActivity.objects.all()
    serializer_class = RunActivitySerializer

class RoutesListCreate(generics.ListCreateAPIView):
    queryset = Route.objects.all()
    serializer_class = RoutesSerializer
# Create your views here.
