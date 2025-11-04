from django.db import models
from users.models import User

class Car(models.Model):
    BODY_TYPES = [
        ('sedan', 'Седан'),
        ('hatchback', 'Хэтчбек'),
        ('suv', 'Внедорожник'),
        ('coupe', 'Купе'),
        ('wagon', 'Универсал'),
    ]
    TRANSMISSION_TYPES = [
        ('manual', 'Механика'),
        ('auto', 'Автомат'),
        ('cvt', 'Вариатор'),
    ]
    ENGINE_TYPES = [
        ('petrol', 'Бензин'),
        ('diesel', 'Дизель'),
        ('hybrid', 'Гибрид'),
        ('electric', 'Электро'),
    ]
    DRIVE_TYPES = [
        ('fwd', 'Передний'),
        ('rwd', 'Задний'),
        ('awd', 'Полный'),
    ]

    title = models.CharField(verbose_name="Название", max_length=255)
    brand = models.CharField(verbose_name="Марка", max_length=100)
    model = models.CharField(verbose_name="Модель", max_length=100)
    generation = models.CharField(verbose_name="Поколение", max_length=100, blank=True)
    year = models.IntegerField(verbose_name="Год")
    engine_type = models.CharField(verbose_name="Тип двигателя", choices=ENGINE_TYPES, max_length=20)
    engine_volume = models.DecimalField(verbose_name="Объем двигателя", max_digits=3, decimal_places=1)
    transmission = models.CharField(verbose_name="Коробка передач", choices=TRANSMISSION_TYPES, max_length=20)
    body_type = models.CharField(verbose_name="Тип кузова", choices=BODY_TYPES, max_length=20)
    drive_type = models.CharField(verbose_name="Привод", choices=DRIVE_TYPES, max_length=20)
    mileage = models.IntegerField(verbose_name="Пробег")
    color = models.CharField(verbose_name="Цвет", max_length=50)

    class Meta:
        verbose_name = "Автомобиль"
        verbose_name_plural = "Автомобили"

    def __str__(self):
        return f"{self.brand} {self.model} {self.year}"


class Advertisement(models.Model):
    car = models.OneToOneField(Car, on_delete=models.CASCADE)
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    photo_1 = models.ImageField(upload_to='')
    photo_2 = models.ImageField(upload_to='???', blank=True, null=True)
    photo_3 = models.ImageField(upload_to='???', blank=True, null=True)
    photo_4 = models.ImageField(upload_to='???', blank=True, null=True)
    damage = models.BooleanField(verbose_name="Есть повреждения")
    damage_description = models.TextField(blank=True, verbose_name="Описание повреждений")
    price = models.DecimalField(max_digits=10, decimal_places=2, verbose_name="Цена")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Создано")
    first_name = models.CharField()
    last_name = models.CharField()
    
    def __str__(self):
        return f"Объявление: {self.car.brand} {self.car.model} - {self.price} BYN"







