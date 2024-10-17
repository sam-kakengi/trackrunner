import os
import django
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "backend.settings")
django.setup()
import pytest
from django.urls import reverse
from django.contrib.auth.models import User
from rest_framework.test import APIClient


@pytest.mark.django_db
def test_successful_login_details(client: APIClient, registered_user: dict, login_url: str):
    response = client.post(login_url, {
        'email': registered_user['email'],
        'password': registered_user['password1']
    })
    assert response.status_code == 200
    


@pytest.mark.django_db
def test_incorrect_password(client: APIClient, registered_user: dict, login_url):
    response = client.post(login_url, {
        'email': registered_user['email'],
        'password': 'failed19'
    })
    assert response.status_code == 400



@pytest.mark.django_db
def test_nonexistent_email(client: APIClient, login_url):
    response = client.post(login_url, {
        'email': 'jamesmcceavy@tester.com',
        'password': 'windowstream19'
    })
    assert response.status_code == 400


@pytest.mark.django_db
def test_sucessful_logout(client: APIClient):
    username = 'testuserforlogout'
    password = 'windowstream20'
    email = "testuserforlogout@test.com"
    User.objects.create_user(username=username, password=password, email=email)
    authenticated = client.login(username=username, password=password)
    if authenticated:
        response = client.post(reverse('rest_logout'))
        assert response.status_code == 200
        assert client.session.get('_auth_user_id') is None
        res = client.get(reverse('route-list'))
        assert res.status_code == 401