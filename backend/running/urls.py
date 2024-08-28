from django.urls import path
from . import views

urlpatterns = [
    path('activities/', views.RunActivityListCreate.as_view(), name='run_activity_list_create'),
    path('routes/', views.RoutesListCreate.as_view(), name='routes_list_create'),
]