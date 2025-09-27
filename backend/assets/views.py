from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.http import JsonResponse
from django.conf import settings
import os
from .models import ImageAsset
from .serializers import ImageAssetSerializer, ImageAssetListSerializer, CharacterImagesSerializer

class ImageAssetViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = ImageAsset.objects.filter(is_active=True)
    serializer_class = ImageAssetSerializer
    permission_classes = []  # Allow public read access
    
    def get_serializer_class(self):
        if self.action == 'list':
            return ImageAssetListSerializer
        return ImageAssetSerializer
    
    @action(detail=False, methods=['get'])
    def by_category(self, request):
        """Get images filtered by category"""
        category = request.query_params.get('category')
        if category:
            images = self.get_queryset().filter(category=category)
            serializer = self.get_serializer(images, many=True)
            return Response(serializer.data)
        return Response({'error': 'Category parameter required'}, status=status.HTTP_400_BAD_REQUEST)
    
    @action(detail=False, methods=['get'])
    def character_images(self, request):
        """Get all images for a specific character"""
        character_name = request.query_params.get('character')
        if not character_name:
            return Response({'error': 'Character parameter required'}, status=status.HTTP_400_BAD_REQUEST)
        
        profile_images = self.get_queryset().filter(
            character_name__icontains=character_name,
            category='character_profile'
        )
        full_body_images = self.get_queryset().filter(
            character_name__icontains=character_name,
            category='character_full_body'
        )
        
        serializer = CharacterImagesSerializer({
            'character_name': character_name,
            'profile_images': profile_images,
            'full_body_images': full_body_images
        })
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def ui_elements(self, request):
        """Get UI elements and banners"""
        ui_images = self.get_queryset().filter(category__in=['ui_element', 'banner', 'icon'])
        serializer = self.get_serializer(ui_images, many=True)
        return Response(serializer.data)

def get_image_urls(request):
    """Simple endpoint to get all image URLs organized by category"""
    from django.http import JsonResponse
    images = ImageAsset.objects.filter(is_active=True)
    
    # Organize images by category
    organized_images = {}
    for image in images:
        category = image.category
        if category not in organized_images:
            organized_images[category] = []
        
        organized_images[category].append({
            'name': image.name,
            'url': image.image_url,
            'character_name': image.character_name
        })
    
    return JsonResponse(organized_images)