from django.shortcuts import render, redirect
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from django.contrib import messages


def authenticate_user(email, password):
    """
    Authenticates a user based on the provided email and password.

    This function attempts to retrieve a user object from the database using the provided email.
    If a user with the given email exists, it then authenticates the user using the provided password.
    If the authentication is successful, the user object is returned. Otherwise, None is returned.

    """
    try:
        user = User.objects.get(email=email)
        user = authenticate(username=user.username, password=password)
        return user
    except User.DoesNotExist:
        return None


def login_view(request):
    """
    Handles user login. If the user is already authenticated, returns a message indicating so.
    Otherwise, processes POST requests to authenticate the user and log them in.

    """
    if request.user.is_authenticated:
        return "You are already logged in."

    if request.method == 'POST':
        email = request.POST.get('email')
        password = request.POST.get('password')
        user = authenticate_user(email, password)

        if user is not None:
            login(request, user)
            username_message = f'Successfully signed in {user.username}!' if user.username else 'Successfully signed in!'
            messages.success(request, f'Successfully signed in {username_message}!')
        else:
            messages.error(request, 'Credentials did not match. Try again.')

    return render(request, 'login.html')


def logout_view(request):
    logout(request)
    return redirect('login')