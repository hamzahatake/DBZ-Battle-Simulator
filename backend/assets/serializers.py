from rest_framework import serializers
from .models import ImageAsset

class ImageAssetSerializer(serializers.ModelSerializer):
    image_url = serializers.ReadOnlyField()
    
    class Meta:
        model = ImageAsset
        fields = '__all__'
        read_only_fields = ['created_at', 'updated_at']

class ImageAssetListSerializer(serializers.ModelSerializer):
    image_url = serializers.ReadOnlyField()
    
    class Meta:
        model = ImageAsset
        fields = ['id', 'name', 'category', 'image_url', 'character_name', 'is_active']

class CharacterImagesSerializer(serializers.Serializer):
    """Serializer for character-specific images"""
    character_name = serializers.CharField()
    profile_images = ImageAssetSerializer(many=True, read_only=True)
    full_body_images = ImageAssetSerializer(many=True, read_only=True)
