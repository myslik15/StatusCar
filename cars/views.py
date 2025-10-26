from django.shortcuts import render

def car(request):
    return render(request, 'cars/car.html')

def advertisement(request):
    return render(request, 'cars/advertisement.html')

def selection(request):
    return render(request, 'cars/selection.html')
