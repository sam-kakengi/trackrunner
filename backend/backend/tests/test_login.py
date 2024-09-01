import os
import django
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "backend.settings")
django.setup()
import pytest
from django.urls import reverse
from django.contrib.auth.models import User

@pytest.fixture
def create_user(db):
    
    user = User.objects.create_user(username='testuser', password='windowstream19', email='testuser@test.com')
    return user
    

@pytest.mark.django_db
def test_successful_login_details(client, create_user):
    response = client.post(reverse('login'), {
        'email': 'testuser@test.com',
        'password': 'windowstream19'
    })
    assert response.status_code == 200
    


@pytest.mark.django_db
def test_incorrect_password(client, create_user):
    response = client.post(reverse('login'), {
        'email': 'testuser@test.com',
        'password': 'failed19'
    })
    assert response.status_code == 200
    assert 'Credentials did not match. Try again.' in response.content.decode()


@pytest.mark.django_db
def test_nonexistent_email(client):
    response = client.post(reverse('login'), {
        'email': 'jamesmcceavy@tester.com',
        'password': 'windowstream19'
    })
    assert response.status_code == 200
    assert 'Credentials did not match. Try again.' in response.content.decode()
