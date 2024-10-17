import os
import django
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "backend.settings")
django.setup()
import pytest
from django.urls import reverse
from django.contrib.auth.models import User
from rest_framework.test import APIClient


@pytest.mark.django_db
def test_successful_registration(registered_user):
    user_exists = User.objects.filter(username=registered_user['username'], email=registered_user['email']).exists()
    assert user_exists, "User was not created in the database"
    

@pytest.mark.django_db
def test_registration_with_existing_user(client: APIClient, register_url, registered_user):
    data = {
        'username': registered_user['username'],
        'email': registered_user['email'], 
        'password1': 'anotherpassword19',
        'password2': 'anotherpassword19',
    }
    response = client.post(register_url, data)
    
    assert response.status_code == 400, f"Unexpected status code: {response.status_code}"
    user_count = User.objects.filter(username=data['username'], email=data['email']).count()
    assert user_count == 1, "User was created"

@pytest.mark.django_db
def test_registration_with_missing_fields(client, register_url):
    data = {
        'username': '',
        'email': 'incompleteuser@test.com',
        'password1': 'incompletepassword19',
        'password2': 'incompletepassword19',
    }
    response = client.post(register_url, data)
    assert response.status_code == 400, f"Unexpected status code: {response.status_code}"
    new_user = User.objects.filter(username=data['username'], email=data['email']).exists()
    assert not new_user, "User was created unexpectedly"

@pytest.mark.django_db
def test_registration_with_password_mismatch(client: APIClient, register_url):
    data = {
        'username': 'mismatchuser',
        'email': 'mismatchuser@test.com',
        'password1': 'password19',
        'password2': 'differentpassword19',
    }
    response = client.post(register_url, data)
    assert response.status_code == 400, f"Unexpected status code: {response.status_code}"
    new_user = User.objects.filter(username=data['username'], email=data['email']).exists()
    assert not new_user, "User was created unexpectedly"
    