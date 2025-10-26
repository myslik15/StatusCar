from django.urls import path
from cars.views import car, advertisement, selection



urlpatterns = [
    path('car/', car, name='car'),
    path('adv/', advertisement, name='adv'),
    path('selection/', selection, name='selection') 
]
