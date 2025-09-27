from django.contrib import admin
from .models import Character

@admin.register(Character)
class CharacterAdmin(admin.ModelAdmin):
    list_display = ['name', 'form', 'race', 'card_level', 'attack', 'defense', 'speed', 'energy', 'is_available']
    list_filter = ['race', 'role', 'saga', 'is_available']
    search_fields = ['name', 'form', 'description', 'special_move', 'ultimate_move']
    list_editable = ['card_level', 'attack', 'defense', 'speed', 'energy', 'is_available']
    ordering = ['name']
    
    fieldsets = (
        ('Basic Information', {
            'fields': ('name', 'form', 'description', 'saga', 'role', 'race')
        }),
        ('Stats', {
            'fields': ('card_level', 'attack', 'defense', 'speed', 'energy')
        }),
        ('Moves & Abilities', {
            'fields': ('special_move', 'ultimate_move', 'strengths', 'weaknesses')
        }),
        ('Images', {
            'fields': ('profile_image', 'full_body_image'),
            'description': 'Upload character images. Profile images are used for character selection, full body images for detailed views.'
        }),
        ('Status', {
            'fields': ('is_available',)
        }),
    )
    
    readonly_fields = ['created_at', 'updated_at']