from rest_framework.serializers import ModelSerializer
from .models import Route, RunActivity


class GetRouteSerializer(ModelSerializer):
    class Meta:
        model = Route
        fields = ['id', 'name', 'distance']

class CreateUpdateRouteSerializer(ModelSerializer):
    class Meta:
        model = Route
        fields = ['name', 'distance']

class GetRunActivitySerializer(ModelSerializer):
    class Meta:
        model = RunActivity
        fields = ['id', 'user', 'start', 'finished', 'duration', 'route', 'notes', 'created', 'updated']

class CreateRunActivitySerializer(ModelSerializer):
    class Meta:
        model = RunActivity
        fields = ['start', 'finished', 'duration', 'route', 'notes']

class UpdateRunActivitySerializer(ModelSerializer):
    class Meta:
        model = RunActivity
        fields = ['start', 'finished', 'duration', 'route', 'notes']