from django.db import models
from users.models import User

class News(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    image = models.ImageField(upload_to="news_photos")
    created_at = models.DateTimeField(auto_now_add=True)
    creator = models.ForeignKey(to=User, on_delete=models.CASCADE)

    class Meta:
        verbose_name = "Новость"
        verbose_name_plural = "Новости"

    
    def __str__(self):
        return f"{self.creator} - {self.id}"
