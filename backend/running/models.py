from django.db import models
from django.contrib.auth.models import User 

class Route(models.Model):
    name = models.CharField(max_length=100)
    distance = models.FloatField(blank=True, null=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='routes')
    def __str__(self):
        return f"{self.name} ({self.distance}km)"

class RunActivity(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    start = models.DateTimeField(null=True, blank=True)
    finished = models.DateTimeField(null=True, blank=True)
    duration = models.FloatField(null=True, blank=True)
    route = models.ForeignKey(Route, on_delete=models.CASCADE)
    notes = models.TextField(null=True, blank=True)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.user.username}: Route: {self.route.name} - Duration:  {self.duration}s"