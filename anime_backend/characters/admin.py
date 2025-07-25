from django.contrib import admin
from .models import Character

@admin.register(Character)
class CharacterAdmin(admin.ModelAdmin):
    list_display = ('name', 'form', 'role', 'attack_level', 'defense_level', 'speed_level')
