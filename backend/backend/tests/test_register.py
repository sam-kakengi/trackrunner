import pytest
from django.urls import reverse
from django.contrib.auth.models import User

@pytest.fixture
def create_user(db):
    user = User.objects.create_user(username='testuser', password='windowstream19', email='testuser@test.com')
    return user

@pytest.mark.django_db
def test_successful_registration(client):
    response = client.post(reverse('register'), {
        'username': 'newuser',
        'email': 'newuser@test.com',
        'password1': 'newpassword19',
        'password2': 'newpassword19',
        'terms': 'on'  
    })
    assert response.status_code == 200
    assert User.objects.filter(username='newuser').exists()

@pytest.mark.django_db
def test_registration_with_existing_email(client, create_user):
    response = client.post(reverse('register'), {
        'username': 'anotheruser',
        'email': 'testuser@test.com',  
        'password1': 'anotherpassword19',
        'password2': 'anotherpassword19',
        'terms': 'on'  
    })
    assert response.status_code == 200  
    assert 'Registration failed. Please check your details and try again.' in response.content.decode()

@pytest.mark.django_db
def test_registration_with_missing_fields(client):
    response = client.post(reverse('register'), {
        'username': '',
        'email': 'incompleteuser@test.com',
        'password1': 'incompletepassword19',
        'password2': 'incompletepassword19',
        'terms': 'on'  
    })
    assert response.status_code == 200  
    assert 'Username must be between 4 and 30 characters.' in response.content.decode()

@pytest.mark.django_db
def test_registration_with_password_mismatch(client):
    response = client.post(reverse('register'), {
        'username': 'mismatchuser',
        'email': 'mismatchuser@test.com',
        'password1': 'password19',
        'password2': 'differentpassword19',
        'terms': 'on'  # Assuming terms checkbox is checked
    })
    assert response.status_code == 200  
    assert 'Passwords do not match.' in response.content.decode()

@pytest.mark.django_db
def test_registration_without_accepting_terms(client):
    response = client.post(reverse('register'), {
        'username': 'newuser',
        'email': 'newuser@test.com',
        'password1': 'newpassword19',
        'password2': 'newpassword19',
        'terms': ''  
    })
    assert response.status_code == 200
    print(response.content.decode())  
    assert 'You must accept the Terms &amp; Conditions to create an account.' or 'You must accept the Terms and Conditions to create an account.' in response.content.decode()
    