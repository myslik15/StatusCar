# cars/forms.py
from django import forms
from .models import Car

class CarFilterForm(forms.Form):
    # Основные поля
    brand = forms.CharField(
        required=False, 
        label='Марка',
        widget=forms.TextInput(attrs={'placeholder': 'Марка'})
    )
    model = forms.CharField(
        required=False, 
        label='Модель',
        widget=forms.TextInput(attrs={'placeholder': 'Модель'})
    )
    generation = forms.CharField(
        required=False, 
        label='Поколение',
        widget=forms.TextInput(attrs={'placeholder': 'Поколение'})
    )
    
    # Поля с выбором из предопределенных значений
    body_type = forms.ChoiceField(
        choices=[('', 'Любой кузов')] + Car.BODY_TYPES,
        required=False,
        label='Кузов'
    )
    
    transmission = forms.ChoiceField(
        choices=[('', 'Любая коробка')] + Car.TRANSMISSION_TYPES,
        required=False,
        label='Коробка'
    )
    
    engine_type = forms.ChoiceField(
        choices=[('', 'Любой двигатель')] + Car.ENGINE_TYPES,
        required=False,
        label='Двигатель'
    )
    
    drive_type = forms.ChoiceField(
        choices=[('', 'Любой привод')] + Car.DRIVE_TYPES,
        required=False,
        label='Привод'
    )
    
    # Диапазоны
    engine_volume_min = forms.DecimalField(
        required=False, 
        min_value=0, 
        max_value=10,
        decimal_places=1,
        label='Объем от, л',
        widget=forms.NumberInput(attrs={'placeholder': 'Объем от, л'})
    )
    engine_volume_max = forms.DecimalField(
        required=False, 
        min_value=0, 
        max_value=10,
        decimal_places=1,
        label='до',
        widget=forms.NumberInput(attrs={'placeholder': 'до'})
    )
    
    year_min = forms.IntegerField(
        required=False, 
        min_value=1900, 
        max_value=2030,
        label='Год от',
        widget=forms.NumberInput(attrs={'placeholder': 'Год от'})
    )
    year_max = forms.IntegerField(
        required=False, 
        min_value=1900, 
        max_value=2030,
        label='до',
        widget=forms.NumberInput(attrs={'placeholder': 'до'})
    )
    
    mileage_min = forms.IntegerField(
        required=False, 
        min_value=0,
        label='Пробег от, км',
        widget=forms.NumberInput(attrs={'placeholder': 'Пробег от, км'})
    )
    mileage_max = forms.IntegerField(
        required=False, 
        min_value=0,
        label='до',
        widget=forms.NumberInput(attrs={'placeholder': 'до'})
    )
    
    price_min = forms.DecimalField(
        required=False, 
        min_value=0,
        decimal_places=2,
        label='Цена от, BYN',
        widget=forms.NumberInput(attrs={'placeholder': 'Цена от, BYN'})
    )
    price_max = forms.DecimalField(
        required=False, 
        min_value=0,
        decimal_places=2,
        label='до',
        widget=forms.NumberInput(attrs={'placeholder': 'до'})
    )
    
    # Состояние автомобиля
    condition = forms.ChoiceField(
        choices=[
            ('all', 'Все'),
            ('new', 'Новые'),
            ('used', 'С пробегом'),
        ],
        required=False,
        initial='all',
        label='Состояние'
    )