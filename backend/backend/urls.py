"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from running.views import RouteView, RunningView, MostRecentRunView, PersonalBestView, ActiveRunView

router = DefaultRouter()
router.register(r'routes', RouteView, basename='route')
router.register(r'', RunningView, basename='runs')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/run/', include(router.urls)),
    path('api/auth/', include('dj_rest_auth.urls')),  # login, logout, password change, etc.
    path('api/auth/registration/', include('dj_rest_auth.registration.urls')),  # registration with email-based login
    path('api/run/recent', MostRecentRunView.as_view(), name='recent'),
    path('api/run/best', PersonalBestView.as_view(), name='best'),
    path('api/run/active', ActiveRunView.as_view(), name='active'),
]
