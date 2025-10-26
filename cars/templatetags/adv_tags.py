from django import template
from cars.models import Advertisement

register = template.Library()


@register.simple_tag()
def tag_adv():
    return Advertisement.objects.all()