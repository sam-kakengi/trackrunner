import os
import django
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "backend.settings")
django.setup()
import pytest
from django.urls import reverse
from django.contrib.auth.models import User

@pytest.mark.django_db
def test_sucessful_logout(client):
    user = User.objects.create_user(username='testuserforlogout', password='windowstream20', email="testuserforlogout@test.com")

    client.login(username='testuserforlogout', password='windowstream20')

    response = client.get(reverse('logout'))

    assert response.status_code == 302
    assert response.url == reverse('login')


    