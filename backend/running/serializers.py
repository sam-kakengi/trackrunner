from rest_framework import serializers
from .models import RunActivity, Route

class RoutesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Route
        fields = '__all__'

class RunActivitySerializer(serializers.ModelSerializer):
    class Meta:
        model = RunActivity
        fields = '__all__'