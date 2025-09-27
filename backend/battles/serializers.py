from rest_framework import serializers
from .models import Battle, BattleTurn
from characters.serializers import CharacterSerializer

class BattleTurnSerializer(serializers.ModelSerializer):
    attacker = CharacterSerializer(read_only=True)
    defender = CharacterSerializer(read_only=True)
    
    class Meta:
        model = BattleTurn
        fields = '__all__'

class BattleSerializer(serializers.ModelSerializer):
    character1 = CharacterSerializer(read_only=True)
    character2 = CharacterSerializer(read_only=True)
    winner = CharacterSerializer(read_only=True)
    turns = BattleTurnSerializer(many=True, read_only=True)
    
    class Meta:
        model = Battle
        fields = '__all__'
        read_only_fields = ['created_at', 'completed_at']

class BattleCreateSerializer(serializers.ModelSerializer):
    character1_id = serializers.IntegerField(write_only=True)
    character2_id = serializers.IntegerField(write_only=True)
    
    class Meta:
        model = Battle
        fields = ['character1_id', 'character2_id']
    
    def create(self, validated_data):
        battle = Battle.objects.create(
            user=self.context['request'].user,
            character1_id=validated_data['character1_id'],
            character2_id=validated_data['character2_id']
        )
        return battle
