from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from users.forms import ProfileForm, UserLoginForm, UserRegisterForm
from django.contrib import auth
from django.http import HttpResponseRedirect
from django.urls import reverse
from django.contrib.auth import logout
from django.contrib.auth import update_session_auth_hash
from django.contrib.auth.forms import PasswordChangeForm
from django.contrib import messages


def login(request):
    if request.method == 'POST':
        form = UserLoginForm(data=request.POST)
        if form.is_valid():
            username = request.POST['username']
            password = request.POST['password']
            user = auth.authenticate(username=username, password=password)
            if user:
                auth.login(request, user)
                return HttpResponseRedirect(reverse('home')) # reverse to tranform in url adress
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
        form = ProfileForm(data=request.POST, instance=request.user.profile, files=request.FILES)  # ← исправлено
        if form.is_valid():
            form.save()
            user = request.user
            user.first_name = form.cleaned_data['first_name']
            user.last_name = form.cleaned_data['last_name']
            user.email = form.cleaned_data['email']
            user.save()
            return HttpResponseRedirect(reverse('users:profile'))
    else:
        form = ProfileForm(instance=request.user.profile)  # ← исправлено
    
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

