from .models import Character
from .serializers import CharacterSerializers
from rest_framework import viewsets, filters

class CharacterViewSet(viewsets.ModelViewSet):
    queryset = Character.objects.all()
    serializer_class = CharacterSerializers
    filter_backends = [filters.OrderingFilter]
    ordering_fields = ['name', 'attack_level', 'defense_level', 'speed_level']
    ordering = ['name']