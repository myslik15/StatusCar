from django.urls import path
from cars.views import car, advertisement, selection

urlpatterns = [
    path('adv/', advertisement, name='adv'),
    path('selection/', selection, name='selection'),
    path('car/<int:adv_id>/', car, name='car')  # Исправлено - убраны лишние пробелы
]