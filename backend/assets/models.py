from django.db import models
from django.core.validators import FileExtensionValidator

class ImageAsset(models.Model):
    CATEGORY_CHOICES = [
        ('character_profile', 'Character Profile'),
        ('character_full_body', 'Character Full Body'),
        ('ui_element', 'UI Element'),
        ('banner', 'Banner'),
        ('icon', 'Icon'),
    ]
    
    name = models.CharField(max_length=100, unique=True)
    category = models.CharField(max_length=30, choices=CATEGORY_CHOICES)
    description = models.TextField(blank=True)
    image_file = models.ImageField(
        upload_to='images/',
        validators=[FileExtensionValidator(allowed_extensions=['jpg', 'jpeg', 'png', 'webp', 'avif'])]
    )
    character_name = models.CharField(max_length=100, blank=True, null=True)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['category', 'name']
    
    def __str__(self):
        return f"{self.name} ({self.category})"
    
    @property
    def image_url(self):
        """Return the full URL for the image"""
        if self.image_file:
            return self.image_file.url
        return None