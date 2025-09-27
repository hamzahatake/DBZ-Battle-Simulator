from django.contrib import admin
from .models import ImageAsset

@admin.register(ImageAsset)
class ImageAssetAdmin(admin.ModelAdmin):
    list_display = ['name', 'category', 'character_name', 'is_active', 'created_at']
    list_filter = ['category', 'is_active', 'created_at']
    search_fields = ['name', 'character_name', 'description']
    list_editable = ['is_active']
    ordering = ['category', 'name']
    
    fieldsets = (
        ('Basic Information', {
            'fields': ('name', 'category', 'description', 'is_active')
        }),
        ('Character Details', {
            'fields': ('character_name',),
            'description': 'Enter the exact character name as specified in CHARACTER_DETAILS.md'
        }),
        ('Image File', {
            'fields': ('image_file',),
            'description': 'Upload image file. For characters, use profile or full_body category.'
        }),
    )
    
    def get_queryset(self, request):
        return super().get_queryset(request).select_related()