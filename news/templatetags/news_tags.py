from django import template
from news.models import News

register = template.Library()


@register.simple_tag()
def news_tag():
    return News.objects.all()