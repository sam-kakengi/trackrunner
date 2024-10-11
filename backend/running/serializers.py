from rest_framework import serializers
from rest_framework.serializers import ModelSerializer, SerializerMethodField
from .models import Route, RunActivity

from .utils import format_ordinal_suffix, format_seconds

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
    updated = serializers.DateTimeField(format='%Y-%m-%dT%H:%M:%S')
    duration_formatted = serializers.SerializerMethodField()
    date_formatted = serializers.SerializerMethodField()

    def get_route(self, obj):
        return GetRouteSerializer(obj.route).data

    def get_duration_formatted(self, obj):
        return format_seconds(obj.duration)

    def get_date_formatted(self, obj):
        if obj.finished is None:
            return None
        return format_ordinal_suffix(obj.finished)

    class Meta:
        model = RunActivity
        fields = ['id', 'start', 'finished', 'duration', 'route', 'notes', 'updated', 'paused', 'duration_formatted', 'date_formatted']

class CreateUpdateRunningSerializer(ModelSerializer):

    start = serializers.DateTimeField(format='%Y-%m-%dT%H:%M:%S', required=False)
    finished = serializers.DateTimeField(format='%Y-%m-%dT%H:%M:%S', required=False)

    class Meta:
        model = RunActivity
        fields = ['start', 'finished', 'duration', 'route', 'notes']

class MostRecentSerializer(ModelSerializer):

    route = SerializerMethodField(read_only=True)
    date = SerializerMethodField(read_only=True)
    duration = SerializerMethodField(read_only=True)
    notes = SerializerMethodField(read_only=True)

    def get_route(self, obj: RunActivity):
        return obj.route.name
    
    def get_duration(self, obj: RunActivity):
        return format_seconds(obj.duration)
    
    def get_date(self, obj: RunActivity):
        return format_ordinal_suffix(obj.finished)
    
    def get_notes(self, obj: RunActivity):
        return obj.notes

    class Meta:
        model = RunActivity
        fields = ['id', 'date', 'duration', 'route', 'notes']

class PersonalBestSerializer(ModelSerializer):

    route = SerializerMethodField(read_only=True)
    duration = SerializerMethodField(read_only=True)
    date = SerializerMethodField(read_only=True)

    def get_route(self, obj: RunActivity):
        return obj.route.name
    
    def get_duration(self, obj: RunActivity):
        return format_seconds(obj.duration)
    
    def get_date(self, obj: RunActivity):
        return format_ordinal_suffix(obj.finished, include_year=True)
    
    class Meta:
        model = RunActivity
        fields = ['id', 'duration', 'route', 'date']

class ActivateRunSerializer(ModelSerializer):

    class Meta:
        model = RunActivity
        fields = ['route', 'notes']

class UpdateRunSerializer(ModelSerializer):

    class Meta:
        model = RunActivity
        fields = ['notes', 'paused']
