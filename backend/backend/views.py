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
        logout(request)

    if request.method == 'POST':
        email = request.POST.get('email')
        password = request.POST.get('password')
        user = authenticate_user(email, password)

        if user is not None:
            login(request, user)
            username_message = f'Successfully signed in {user.username}!' if user.username else 'Successfully signed in!'
            messages.success(request, username_message)
        else:
            messages.error(request, 'Credentials did not match. Try again.')

    return render(request, 'login.html')


def logout_view(request):
    logout(request)
    return redirect('login')


def register_view(request):
    """
    Handles user registration. If the user is already authenticated, redirects to the login page.
    Otherwise, processes POST requests to create a new user account.
    """
    if request.user.is_authenticated:
        return redirect('login')

    if request.method == 'POST':
        email = request.POST.get('email').strip()
        username = request.POST.get('username', '').strip()
        password1 = request.POST.get('password1').strip()
        password2 = request.POST.get('password2').strip()
        terms_accepted = request.POST.get('terms')

        errors = {}

        if not terms_accepted:
            errors['terms'] = 'You must accept the Terms & Conditions to create an account.'
        
        if password1 != password2:
            errors['password2'] = 'Passwords do not match.'

        if User.objects.filter(email=email).exists():
            errors['email'] = 'Registration failed. Please check your details and try again.'
        
        if len(username) < 4 or len(username) > 30:
            errors['username'] = "Username must be between 4 and 30 characters."

        if errors:
            return render(request, 'registration.html', {'errors': errors})

        user = User.objects.create_user(username=username, email=email, password=password1)
        user.save()

        user = authenticate(request, username=username, password=password1)
        if user is not None:
            login(request, user)  # Log the user in
            register_success_msg = f'Welcome {user.username}' if user.username else f'Welcome {user.email}'
            messages.success(request, register_success_msg)
            

    return render(request, 'registration.html')