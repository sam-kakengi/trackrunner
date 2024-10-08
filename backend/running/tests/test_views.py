import os
import django
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "backend.settings")
django.setup()
import pytest
from django.urls import reverse
from rest_framework.test import APIClient
from rest_framework import status
from running.models import RunActivity, Route
from datetime import date, datetime, timedelta
from typing import Tuple
from running.utils import format_ordinal_suffix, format_duration
from dateutil.relativedelta import relativedelta

@pytest.fixture
def api_client() -> APIClient:
    return APIClient()

@pytest.fixture
def user(django_user_model):
    return django_user_model.objects.create_user(username='testuser', password='password')

@pytest.fixture
def auth_client(api_client, user) -> APIClient:
    api_client.force_authenticate(user=user)
    return api_client

@pytest.fixture
def route(user) -> Route:
    return Route.objects.create(name='Test Route', distance=5.0, user=user)

@pytest.fixture
def new_run_finished(user, route: Route) -> RunActivity:
    run = RunActivity.objects.create(user=user, route=route, finished=datetime.now().strftime("%Y-%m-%dT%H:%M:%S"), 
                                     duration=3600, notes='Test notes')
    run.save()
    return run

@pytest.fixture
def new_run_duration_only(user, route: Route) -> RunActivity:
    run = RunActivity.objects.create(user=user, route=route, duration=3600, notes='Test notes')
    run.save()
    return run

@pytest.fixture
def new_run_quick(user, route: Route) -> RunActivity:
    run = RunActivity.objects.create(user=user, route=route, duration=1200, notes='Test notes', 
                                     finished=datetime.now().strftime("%Y-%m-%dT%H:%M:%S"))
    run.save()
    return run

@pytest.fixture
def start_active_run(auth_client, route: Route) -> Tuple[Route, dict, str]:
    url = reverse('active')
    data = {'route': route.pk, 'notes': 'Test notes'}
    response = auth_client.post(url, data)
    return response, data, url

@pytest.mark.django_db
def test_routes_get_object(auth_client, route: Route):
    url = reverse('route-detail', args=[route.pk])
    response = auth_client.get(url)
    assert response.status_code == status.HTTP_200_OK
    assert response.data['id'] == route.pk
    assert response.data['name'] == route.name
    assert response.data['distance'] == route.distance

@pytest.mark.django_db
def test_routes_get_list(auth_client, user):
    url = reverse('route-list')
    response = auth_client.get(url)
    assert response.status_code == status.HTTP_200_OK
    assert all(route['user'] == user.id for route in response.data)

@pytest.mark.django_db
def test_route_create(auth_client):
    url = reverse('route-list')
    data = {'name': 'Test Route', 'distance': 5.0}
    response = auth_client.post(url, data)
    assert response.status_code == status.HTTP_201_CREATED
    assert response.data['name'] == 'Test Route'
    assert response.data['distance'] == 5.0

@pytest.mark.django_db
def test_route_update(auth_client, route: Route):
    url = reverse('route-detail', args=[route.pk])
    data = {'name': 'Updated Route', 'distance': 10.0}
    response = auth_client.patch(url, data)
    assert response.status_code == status.HTTP_200_OK
    assert response.data['name'] == 'Updated Route'
    assert response.data['distance'] == 10.0

@pytest.mark.django_db
def test_route_delete(auth_client, route: Route):
    url = reverse('route-list')
    data = {'name': 'Test Route', 'distance': 5.0}
    response = auth_client.post(url, data)
    url = reverse('route-detail', args=[route.pk])
    response = auth_client.delete(url)
    assert response.status_code == status.HTTP_204_NO_CONTENT
    assert not Route.objects.filter(pk=route.pk).exists()

@pytest.mark.django_db
def test_run_get_object(auth_client, route: Route):
    url = reverse('runs-list')
    data = {'route': route.pk, 'start': datetime.now().isoformat()}
    response_post = auth_client.post(url, data)
    assert response_post.status_code == status.HTTP_201_CREATED
    url = reverse('runs-detail', args=[response_post.data['id']])
    response_get = auth_client.get(url)
    assert response_get.status_code == status.HTTP_200_OK
    assert response_get.data['id'] == response_post.data['id']
    assert response_get.data['route']['id'] == route.pk
    assert response_get.data['start'] != None

@pytest.mark.django_db
def test_run_update(auth_client, new_run_finished: RunActivity):
    url = reverse('runs-detail', args=[new_run_finished.pk])
    data = {'notes': 'Updated notes', 
            'start': datetime.now().strftime("%Y-%m-%dT%H:%M:%S"), 
            'finished': datetime.now().strftime("%Y-%m-%dT%H:%M:%S")}
    response = auth_client.patch(url, data)
    assert response.status_code == status.HTTP_200_OK
    assert response.data['notes'] == 'Updated notes'

@pytest.mark.django_db
def test_get_object_url(auth_client, new_run_finished: RunActivity):
    url = reverse('runs-detail', args=[new_run_finished.pk])
    response = auth_client.get(url)
    assert response.status_code == status.HTTP_200_OK
    assert response.data['id'] == new_run_finished.pk

@pytest.mark.django_db
def test_run_get_list(auth_client, user):
    url = reverse('runs-list')
    response = auth_client.get(url)
    assert response.status_code == status.HTTP_200_OK
    assert all(run['user'] == user.id for run in response.data)

@pytest.mark.django_db
def test_run_create_log(auth_client, route: Route):
    url = reverse('runs-list')
    data = {'route': route.pk, 'start': datetime.now().strftime("%Y-%m-%dT%H:%M:%S"), 
            'duration': 3600, 'notes': 'Test notes'}
    response = auth_client.post(url, data)
    assert response.status_code == status.HTTP_201_CREATED
    assert response.data['route']['id'] == route.pk
    assert response.data['start'] == data['start']
    assert response.data['duration'] == data['duration']
    assert response.data['notes'] == data['notes']

@pytest.mark.django_db
def test_invalid_recent_run(auth_client, new_run_duration_only: RunActivity):
    url = reverse('recent')
    response = auth_client.get(url)
    assert response.status_code == status.HTTP_404_NOT_FOUND

@pytest.mark.django_db
def test_recent_run(auth_client, new_run_finished: RunActivity):
    url = reverse('recent')
    response = auth_client.get(url)
    assert response.status_code == status.HTTP_200_OK
    assert response.data['id'] == new_run_finished.pk
    assert response.data['duration'] == "01:00:00"
    finished = datetime.fromisoformat(new_run_finished.finished)
    assert response.data['date'] == format_ordinal_suffix(finished, include_year=False)

@pytest.mark.django_db
def test_personal_best(auth_client, new_run_finished: RunActivity, new_run_quick: RunActivity):
    url = reverse('best')
    response = auth_client.get(url)
    assert response.status_code == status.HTTP_200_OK
    assert response.data['id'] == new_run_quick.pk
    assert response.data['duration'] == "20:00"
    finished = datetime.fromisoformat(new_run_quick.finished)
    assert response.data['date'] == format_ordinal_suffix(finished, include_year=True)

@pytest.mark.django_db
def test_get_inactive_run(auth_client):
    url = reverse('active')
    response = auth_client.get(url)
    assert response.status_code == status.HTTP_404_NOT_FOUND

@pytest.mark.django_db
def test_start_active_run(auth_client, start_active_run, route: Route):
    response, data, url = start_active_run
    assert response.status_code == status.HTTP_201_CREATED
    assert response.data['route'] == route.pk
    assert response.data['notes'] == data['notes']
    response = auth_client.get(url)
    assert response.status_code == status.HTTP_200_OK
    assert response.data['route']['id'] == route.pk
    assert response.data['notes'] == data['notes']
    assert response.data['start'] != None

@pytest.mark.django_db
def test_existing_active_run(auth_client: APIClient, start_active_run):
    response, data, url = start_active_run
    response = auth_client.post(url, data)
    assert response.status_code == status.HTTP_409_CONFLICT

@pytest.mark.django
def test_pause_active_run(auth_client, start_active_run):
    response, data, url = start_active_run
    response = auth_client.patch(url, {'paused': 120})
    assert response.status_code == status.HTTP_200_OK
    response = auth_client.get(url)
    assert response.status_code == status.HTTP_200_OK
    assert response.data['paused'] == 120
    response = auth_client.patch(url, {'paused': 120})
    assert response.status_code == status.HTTP_200_OK
    response = auth_client.get(url)
    assert response.data['paused'] == 240

@pytest.mark.django_db
def test_end_active_run(auth_client, start_active_run, route: Route):
    response, data, url = start_active_run
    response = auth_client.patch(url, {'notes': 'Test notes'})
    assert response.status_code == status.HTTP_200_OK
    response = auth_client.get(url)
    assert response.status_code == status.HTTP_404_NOT_FOUND

@pytest.mark.django_db
def test_reset_active_run(auth_client, start_active_run):
    response, data, url = start_active_run
    response = auth_client.delete(url)
    assert response.status_code == status.HTTP_204_NO_CONTENT
    response = auth_client.get(url)
    assert response.status_code == status.HTTP_404_NOT_FOUND

@pytest.mark.django_db
def test_chart_data(auth_client, user, route: Route):
    url = reverse('chart')
    
    run_date = lambda delta, string_format:  ((datetime.now() - timedelta(days=delta) ).strftime("%Y-%m-%dT%H:%M:%S") if string_format 
                                              else (datetime.now() - timedelta(days=delta)))
    run_1: RunActivity = RunActivity.objects.create(user=user, route=route, duration=1200, notes='Test notes', finished=run_date(0, True))
    run_1.save()
    response = auth_client.get(url)
    assert response.status_code == status.HTTP_200_OK
    today = date.today()
    expected_data = { route.name : [{"date": run_date(0, False).strftime("%d-%m-%Y"), "duration": run_1.duration, "time": format_duration(run_1.duration)}] }
    assert response.data['start'] == (today- relativedelta(months=3, days=-1)).strftime("%d-%m-%Y")
    assert response.data['end'] == (today + relativedelta(days=1)).strftime("%d-%m-%Y")
    assert response.data['data'] == expected_data
    run_2: RunActivity = RunActivity.objects.create(user=user, route=route, duration=1200, notes='Test notes', finished=run_date(10, True))
    run_2.save()
    expected_data[route.name].append({"date": run_date(10, False).strftime("%d-%m-%Y"), "duration": run_2.duration, "time": format_duration(run_2.duration)})
    expected_data[route.name] = sorted(expected_data[route.name], key=lambda x: datetime.strptime(x['date'], "%d-%m-%Y"))
    response = auth_client.get(url)
    assert dict(response.data['data']) == expected_data
    new_route = Route.objects.create(name='New Route', distance=5.0, user=user)
    run_3: RunActivity = RunActivity.objects.create(user=user, route=new_route, duration=1200, notes='Test notes', finished=run_date(4, True))
    run_3.save()
    expected_data[new_route.name] = [{"date": run_date(4, False).strftime("%d-%m-%Y"), "duration": run_3.duration, "time": format_duration(run_3.duration)}]
    response = auth_client.get(url)
    actual_data = dict(response.data['data'])
    assert actual_data == expected_data

    
    