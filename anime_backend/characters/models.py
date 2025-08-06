from django.db import models

class Character(models.Model):
    name = models.CharField(max_length=100, blank=True, null=True)
    form = models.CharField(max_length=100, blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    saga = models.CharField(max_length=100, blank=True, null=True)
    role = models.CharField(max_length=50, blank=True, null=True)
    type = models.CharField(max_length=50, blank=True, null=True)
    level = models.IntegerField(default=0)
    attack_level = models.IntegerField(default=0)
    defense_level = models.IntegerField(default=0)
    speed_level = models.IntegerField(default=0)
    energy_level = models.IntegerField(default=0)
    special_move = models.CharField(max_length=256, blank=True, null=True)
    ultimate_move = models.CharField(max_length=256, blank=True, null=True)
    strengths = models.CharField(max_length=256, blank=True, null=True)
    weaknesses = models.CharField(max_length=256, blank=True, null=True)
    image_full_body = models.ImageField(upload_to='characters/full_body', blank=False, null=True)
    image_profile = models.ImageField(upload_to='characters/profile', blank=False, null=True)

    def __str__(self):
        return f"{self.name} - {self.saga} ({self.role}) "
