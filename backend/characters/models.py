from django.db import models
from django.contrib.auth.models import User
from django.core.validators import FileExtensionValidator

class Character(models.Model):
    # Basic Information
    name = models.CharField(max_length=100)
    form = models.CharField(max_length=100, blank=True)
    description = models.TextField(blank=True)
    saga = models.CharField(max_length=100, blank=True)
    role = models.CharField(max_length=50, blank=True)
    race = models.CharField(max_length=50, blank=True)
    
    # Stats
    card_level = models.IntegerField(default=1)
    attack = models.IntegerField(default=0)
    defense = models.IntegerField(default=0)
    speed = models.IntegerField(default=0)
    energy = models.IntegerField(default=100)
    
    # Moves and Abilities
    special_move = models.CharField(max_length=100, blank=True)
    ultimate_move = models.CharField(max_length=100, blank=True)
    strengths = models.TextField(blank=True)
    weaknesses = models.TextField(blank=True)
    
    # Images
    profile_image = models.ImageField(
        upload_to='characters/profile/',
        blank=True,
        null=True,
        validators=[FileExtensionValidator(allowed_extensions=['jpg', 'jpeg', 'png', 'webp', 'avif'])]
    )
    full_body_image = models.ImageField(
        upload_to='characters/full_body/',
        blank=True,
        null=True,
        validators=[FileExtensionValidator(allowed_extensions=['jpg', 'jpeg', 'png', 'webp', 'avif'])]
    )
    
    # Theme Colors
    primary_color = models.CharField(max_length=7, blank=True, help_text="Primary theme color (hex code, e.g., #3B82F6)")
    secondary_color = models.CharField(max_length=7, blank=True, help_text="Secondary theme color (hex code, e.g., #1E40AF)")
    gradient_direction = models.CharField(max_length=10, default='br', help_text="Gradient direction (to, br, bl, etc.)")
    
    # Status
    is_available = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['name']
    
    def __str__(self):
        return f"{self.name} ({self.form})" if self.form else self.name
    
    @property
    def profile_image_url(self):
        """Return the full URL for the profile image"""
        if self.profile_image:
            return self.profile_image.url
        return None
    
    @property
    def full_body_image_url(self):
        """Return the full URL for the full body image"""
        if self.full_body_image:
            return self.full_body_image.url
        return None
