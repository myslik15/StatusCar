from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from users.forms import ProfileForm, UserLoginForm, UserRegisterForm
from django.contrib import auth
from django.http import HttpResponseRedirect
from users.models import User
from django.urls import reverse
from django.contrib.auth import logout
from django.contrib.auth import update_session_auth_hash
from django.contrib.auth.forms import PasswordChangeForm
from django.contrib import messages

from django.contrib.auth import authenticate, login as auth_login

def login(request):
    if request.method == 'POST':
        form = UserLoginForm(data=request.POST)
        if form.is_valid():
            # Получаем email из формы
            email = form.cleaned_data['email']
            password = form.cleaned_data['password']
            
            try:
                # Находим пользователя по email
                user = User.objects.get(email=email)
                # Аутентифицируем по username и password
                user = authenticate(username=user.username, password=password)
                
                if user is not None:
                    auth_login(request, user)
                    return HttpResponseRedirect(reverse('home'))
                else:
                    # Если пароль неверный
                    messages.error(request, 'Неверный пароль')
            except User.DoesNotExist:
                # Если пользователь не найден
                messages.error(request, 'Пользователь с таким email не найден')
        else:
            # Если форма невалидна
            messages.error(request, 'Пожалуйста, исправьте ошибки в форме')
    else:
        form = UserLoginForm()
    
    context = {
        'form': form,   
    }
    return render(request, 'users/login.html', context)


def register(request):
    if request.method == 'POST':
        form = UserRegisterForm(data=request.POST)
        if form.is_valid():
            user = form.save()  # Сохраняем пользователя
            auth.login(request, user)  # Логиним пользователя
            return HttpResponseRedirect(reverse('home'))  # Редирект на главную
        else:
            # Если форма невалидна, показываем ошибки
            print("Form errors:", form.errors)  # Для дебага
    else:
        form = UserRegisterForm()

    context = {
        'form': form,
    }
    return render(request, 'users/register.html', context)


@login_required
def profile(request):
    if request.method == 'POST':
        form = ProfileForm(data=request.POST, instance=request.user, files=request.FILES)  # ← исправлено
        if form.is_valid():
            form.save()
            user = request.user
            user.first_name = form.cleaned_data['first_name']
            user.last_name = form.cleaned_data['last_name']
            user.email = form.cleaned_data['email']
            user.save()
            return HttpResponseRedirect(reverse('profile'))
    else:
        form = ProfileForm(instance=request.user)  # ← исправлено
    
    context = {
        'form': form,
    }
    return render(request, 'users/profile.html', context)


@login_required
def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse('home'))


@login_required
def password_change(request):
    if request.method == 'POST':
        form = PasswordChangeForm(request.user, request.POST)
        if form.is_valid():
            user = form.save()
            update_session_auth_hash(request, user)
            messages.success(request, 'Пароль успешно изменен!')
            return HttpResponseRedirect(reverse('profile'))
        else:
            for field, errors in form.errors.items():
                for error in errors:
                    messages.error(request, f'{error}')
    else:
        form = PasswordChangeForm(request.user)
    
    # Возвращаем обратно в профиль с активной вкладкой безопасности
    return HttpResponseRedirect(reverse('profile'))

