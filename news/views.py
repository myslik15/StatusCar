from django.shortcuts import render

def news_list(request):
    return render(request, 'news/news_list.html')