# cars/views.py
from django.shortcuts import render, get_object_or_404
from cars.models import Car, Advertisement
from cars.forms import CarFilterForm
from django.db.models import Q

def car(request, adv_id):
    adv_item = get_object_or_404(Advertisement, id=adv_id)
    return render(request, 'cars/car.html', {'adv': adv_item})

def advertisement(request):
    return render(request, 'cars/advertisement.html')

def selection(request):
    form = CarFilterForm(request.GET or None)
    ads = Advertisement.objects.select_related("car").all()

    if form.is_valid():
        data = form.cleaned_data
        car_filters = Q()

        if data.get('brand'):
            car_filters &= Q(car__brand__icontains=data['brand'])
        if data.get('model'):
            car_filters &= Q(car__model__icontains=data['model'])
        if data.get('generation'):
            car_filters &= Q(car__generation__icontains=data['generation'])
        if data.get('body_type'):
            car_filters &= Q(car__body_type=data['body_type'])
        if data.get('transmission'):
            car_filters &= Q(car__transmission=data['transmission'])
        if data.get('engine_type'):
            car_filters &= Q(car__engine_type=data['engine_type'])
        if data.get('drive_type'):
            car_filters &= Q(car__drive_type=data['drive_type'])
        if data.get('engine_volume_min'):
            car_filters &= Q(car__engine_volume__gte=data['engine_volume_min'])
        if data.get('engine_volume_max'):
            car_filters &= Q(car__engine_volume__lte=data['engine_volume_max'])
        if data.get('year_min'):
            car_filters &= Q(car__year__gte=data['year_min'])
        if data.get('year_max'):
            car_filters &= Q(car__year__lte=data['year_max'])
        if data.get('mileage_min'):
            car_filters &= Q(car__mileage__gte=data['mileage_min'])
        if data.get('mileage_max'):
            car_filters &= Q(car__mileage__lte=data['mileage_max'])
        if data.get('price_min'):
            car_filters &= Q(price__gte=data['price_min'])
        if data.get('price_max'):
            car_filters &= Q(price__lte=data['price_max'])

        ads = ads.filter(car_filters)

    return render(request, 'cars/selection.html', {
        'form': form,
        'advertisements': ads
    })