from django.shortcuts import render, get_object_or_404
from .models import News

def news_list(request):
    news = News.objects.all().order_by('-created_at')
    return render(request, 'news/news_list.html', {'news': news})

def news_detail(request, news_id):
    news_item = get_object_or_404(News, id=news_id)
    
    # Получаем связанные новости (например, 3 последние)
    related_news = News.objects.exclude(id=news_id).order_by('-created_at')[:3]
    
    context = {
        'news': news_item,
        'related_news': related_news,
    }
    
    return render(request, 'news/news_detail.html', context)