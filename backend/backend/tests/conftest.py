import os
import django
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "backend.settings")
django.setup()
import pytest
from django.urls import reverse
from django.contrib.auth.models import User
from rest_framework.test import APIClient


@pytest.fixture(autouse=True)
def login_url() -> str:
    return reverse('rest_login')

@pytest.fixture
def client() -> APIClient:
    return APIClient()

@pytest.fixture
def create_user(db) -> User:
    user = User.objects.create_user(username='testuser', password='windowstream19', email='testuser@test.com')
    return user

@pytest.fixture(autouse=True)
def register_url() -> str:
    return reverse('rest_register')

@pytest.fixture
def registered_user(client, register_url) -> dict:
    data = {
        'username': 'newname',
        'email': 'user19382@hotmael.com',
        'password1': 'newpassword19',
        'password2': 'newpassword19',
    }
    response = client.post(register_url, data)
    
    assert response.status_code == 204, f"Unexpected status code: {response.status_code}"
    return data