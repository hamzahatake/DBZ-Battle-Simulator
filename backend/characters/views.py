from rest_framework import viewsets, filters
from rest_framework.decorators import action
from rest_framework.response import Response
from django.db import models
from django_filters.rest_framework import DjangoFilterBackend
from .models import Character
from .serializers import CharacterSerializer, CharacterListSerializer

class CharacterViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Character.objects.filter(is_available=True)
    serializer_class = CharacterSerializer
    permission_classes = []  # Allow public read access
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['race', 'role', 'saga']
    search_fields = ['name', 'form', 'description']
    ordering_fields = ['name', 'card_level', 'attack', 'defense', 'speed', 'energy']
    ordering = ['name']
    
    def get_serializer_class(self):
        if self.action == 'list':
            return CharacterListSerializer
        return CharacterSerializer
    
    @action(detail=False, methods=['get'])
    def stats(self, request):
        """Get character statistics"""
        total_characters = self.get_queryset().count()
        avg_attack = self.get_queryset().aggregate(avg_attack=models.Avg('attack'))['avg_attack']
        avg_defense = self.get_queryset().aggregate(avg_defense=models.Avg('defense'))['avg_defense']
        
        return Response({
            'total_characters': total_characters,
            'average_attack': round(avg_attack or 0, 2),
            'average_defense': round(avg_defense or 0, 2),
        })