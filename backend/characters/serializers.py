from rest_framework import serializers
from .models import Character

class CharacterSerializer(serializers.ModelSerializer):
    profile_image_url = serializers.ReadOnlyField()
    full_body_image_url = serializers.ReadOnlyField()
    
    class Meta:
        model = Character
        fields = '__all__'
        read_only_fields = ['created_at', 'updated_at', 'profile_image_url', 'full_body_image_url']

class CharacterListSerializer(serializers.ModelSerializer):
    profile_image_url = serializers.ReadOnlyField()
    full_body_image_url = serializers.ReadOnlyField()
    
    class Meta:
        model = Character
        fields = [
            'id', 'name', 'form', 'description', 'saga', 'role', 'race',
            'card_level', 'attack', 'defense', 'speed', 'energy',
            'special_move', 'ultimate_move', 'strengths', 'weaknesses',
            'profile_image_url', 'full_body_image_url', 'is_available'
        ]
