from django.shortcuts import render, redirect
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from django.contrib import messages


def authenticate_user(email, password):
    try:
        user = User.objects.get(email=email)
        user = authenticate(username=user.username, password=password)
        return user
    except User.DoesNotExist:
        return None


def login_view(request):

    if request.user.is_authenticated:
        return "You are already logged in."
    
    if request.method == 'POST':
        email = request.POST.get('email')
        password = request.POST.get('password')


        user = authenticate_user(email, password)


        if user is not None:
            login(request, user)
            messages.success(request, f'Successfully signed in {user.username}!')
        else:
            messages.error(request, 'Credentials did not match. Try again.')

    return render(request, 'login.html')


def logout_view(request):
    logout(request)
    return redirect('login')