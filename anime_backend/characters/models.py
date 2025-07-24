from django.db import models

class Character(models.Model):
    name = models.CharField(max_length=100)
    saga = models.CharField(max_length=100)
    role = models.CharField(max_length=50)
    attack = models.IntegerField()
    defense = models.IntegerField()
    speed = models.IntegerField()
    image_url = models.ImageField(upload_to='characters/')

    def __str__(self):
        return f"{self.name} - {self.saga} ({self.role}) "
