from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User

# Register your models here.
@admin.register(User)
class CustomUserAdmin(UserAdmin):
    """Custom User Admin with additional fields"""
    
    # Add custom fields to the fieldsets
    fieldsets = UserAdmin.fieldsets + (
        ('Profile Information', {
            'fields': ('display_name', 'avatar', 'bio')
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )
    
    # Add custom fields to the add_fieldsets
    add_fieldsets = UserAdmin.add_fieldsets + (
        ('Profile Information', {
            'fields': ('display_name', 'avatar', 'bio')
        }),
    )
    
    # Fields to display in the list view
    list_display = ('username', 'email', 'first_name', 'last_name', 'display_name', 'is_staff', 'date_joined')
    list_filter = ('is_staff', 'is_superuser', 'is_active', 'date_joined')
    search_fields = ('username', 'first_name', 'last_name', 'email', 'display_name')
    ordering = ('-date_joined',)
    
    # Make timestamps read-only
    readonly_fields = ('created_at', 'updated_at', 'date_joined')
