from django import forms
from django.contrib.auth.forms import UserCreationForm
from users.models import User

class UserRegisterForm(UserCreationForm):
    # ПРАВИЛЬНОЕ ОБЪЯВЛЕНИЕ ПОЛЕЙ:
    username = forms.CharField(
        widget=forms.TextInput(attrs={'class': 'form-control'})
    )
    first_name = forms.CharField(
        widget=forms.TextInput(attrs={'class': 'form-control'})
    )
    last_name = forms.CharField(
        widget=forms.TextInput(attrs={'class': 'form-control'})
    )
    email = forms.EmailField(
        widget=forms.EmailInput(attrs={'class': 'form-control'})
    )
    
    class Meta:
        model = User
        fields = (
            'username',
            'first_name', 
            'last_name',
            'email',
            'password1',
            'password2',
        )

class ProfileForm(forms.ModelForm):
    first_name = forms.CharField(
        widget=forms.TextInput(attrs={'class': 'form-control'})
    )
    last_name = forms.CharField(
        widget=forms.TextInput(attrs={'class': 'form-control'})
    )
    email = forms.EmailField(
        widget=forms.EmailInput(attrs={'class': 'form-control'})
    )
    image = forms.ImageField(required=False)
    
    class Meta:
        model = User
        fields = (
            'first_name',
            'last_name', 
            'email',
            'image'
        )

class UserLoginForm(forms.Form):
    username = forms.CharField(
        widget=forms.TextInput(attrs={'class': 'form-control'})
    )
    password = forms.CharField(
        widget=forms.PasswordInput(attrs={'class': 'form-control'})
    )