from django.db import models
from users.models import User

class Car(models.Model):
    title = models.CharField(verbose_name="Название")
    price = models.DecimalField(max_digits=10, decimal_places=2, verbose_name="Цена")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Создано")
    brand = models.CharField(verbose_name="Марка")
    model = models.CharField(verbose_name="Модель")
    generation = models.CharField(verbose_name="Поколение")
    year = models.IntegerField(verbose_name="Год")
    engine_type = models.CharField(verbose_name="Тип двигателя")
    engine_volume = models.CharField(verbose_name="Объем двигателя")
    transmission = models.CharField(verbose_name="Коробка передач")
    body_type = models.CharField(verbose_name="Тип кузова")
    drive_type = models.CharField(verbose_name="Привод")
    mileage = models.IntegerField(verbose_name="Пробег")
    color = models.CharField(verbose_name="Цвет")    
    damage = models.BooleanField(verbose_name="Есть повреждения")
    damage_description = models.TextField(blank=True, verbose_name="Описание повреждений")

    class Meta:
        verbose_name = "Автомобиль"
        verbose_name_plural = "Автомобили"
        ordering = ['-created_at']
    
    def __str__(self):
        return f"{self.brand} {self.model} {self.year}."
