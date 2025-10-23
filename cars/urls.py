from django.urls import path
from cars.views import home



urlpatterns = [
    path('', home, name='home'),
]
