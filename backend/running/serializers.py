from rest_framework import serializers
from rest_framework.serializers import ModelSerializer, SerializerMethodField
from .models import Route, RunActivity


class GetRouteSerializer(ModelSerializer):
    class Meta:
        model = Route
        fields = ['id', 'name', 'distance']

class CreateUpdateRouteSerializer(ModelSerializer):
    class Meta:
        model = Route
        fields = ['name', 'distance']

class GetRunningSerializer(ModelSerializer):

    route = SerializerMethodField(read_only=True)
    start = serializers.DateTimeField(format='%Y-%m-%dT%H:%M:%S')
    finished = serializers.DateTimeField(format='%Y-%m-%dT%H:%M:%S')

    def get_route(self, obj):
        return GetRouteSerializer(obj.route).data

    class Meta:
        model = RunActivity
        fields = ['id', 'start', 'finished', 'duration', 'route', 'notes', 'created', 'updated']

class CreateUpdateRunningSerializer(ModelSerializer):

    start = serializers.DateTimeField(format='%d-%m-%YT%H:%M:%S', required=False)
    finished = serializers.DateTimeField(format='%d-%m-%YT%H:%M:%S', required=False)

    class Meta:
        model = RunActivity
        fields = ['start', 'finished', 'duration', 'route', 'notes']