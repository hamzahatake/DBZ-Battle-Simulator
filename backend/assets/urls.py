from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ImageAssetViewSet, get_image_urls

router = DefaultRouter()
router.register(r'', ImageAssetViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('image-urls/', get_image_urls, name='image-urls'),
]
