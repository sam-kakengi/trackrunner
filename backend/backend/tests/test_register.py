import os
import django
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "backend.settings")
django.setup()
import pytest
from django.urls import reverse
from django.contrib.auth.models import User
from rest_framework.test import APIClient

@pytest.fixture
def client() -> APIClient:
    return APIClient()

@pytest.fixture
def create_user(db) -> User:
    user = User.objects.create_user(username='testuser', password='windowstream19', email='testuser@test.com')
    return user

@pytest.mark.django_db
def test_successful_registration(client: APIClient):
    url = reverse('rest_register')
    data = {
        'username': 'newname',
        'email': 'user19382@hotmael.com',
        'password1': 'newpassword19',
        'password2': 'newpassword19',
    }
    response = client.post(url, data)
    
    assert response.status_code == 204, f"Unexpected status code: {response.status_code}"
    
    user_exists = User.objects.filter(username=data['username'], email=data['email']).exists()
    assert user_exists, "User was not created in the database"
    

@pytest.mark.django_db
def test_registration_with_existing_user(client, create_user: User):
    url = reverse('rest_register')
    data = {
        'username': create_user.username,
        'email': create_user.email, 
        'password1': 'anotherpassword19',
        'password2': 'anotherpassword19',
    }
    response = client.post(url, data)
    
    assert response.status_code == 400, f"Unexpected status code: {response.status_code}"
    user_count = User.objects.filter(username=data['username'], email=data['email']).count()
    assert user_count == 1, "User was created"

@pytest.mark.django_db
def test_registration_with_missing_fields(client):
    url = reverse('rest_register')
    data = {
        'username': '',
        'email': 'incompleteuser@test.com',
        'password1': 'incompletepassword19',
        'password2': 'incompletepassword19',
    }
    response = client.post(url, data)
    
    print("\n--- Test Output: Registration with Missing Fields ---")
    print(f"Status Code: {response.status_code}")
    print(f"Response Content: {response.content.decode()}")
    
    assert response.status_code == 400, f"Unexpected status code: {response.status_code}"
    response_data = response.json()
    print(f"Response JSON: {response_data}")
    assert 'username' in response_data, "Username error not found in response data"
    assert 'This field may not be blank.' in str(response_data['username'])
    
    print("--- End Test Output ---")

@pytest.mark.django_db
def test_registration_with_password_mismatch(client):
    url = reverse('rest_register')
    data = {
        'username': 'mismatchuser',
        'email': 'mismatchuser@test.com',
        'password1': 'password19',
        'password2': 'differentpassword19',
    }
    response = client.post(url, data)
    
    print("\n--- Test Output: Registration with Password Mismatch ---")
    print(f"Status Code: {response.status_code}")
    print(f"Response Content: {response.content.decode()}")
    
    assert response.status_code == 400, f"Unexpected status code: {response.status_code}"
    response_data = response.json()
    print(f"Response JSON: {response_data}")
    assert 'non_field_errors' in response_data, "Password mismatch error not found in response data"
    assert 'The two password fields didn"t match.' in str(response_data['non_field_errors'])
    
    print("--- End Test Output ---")
    