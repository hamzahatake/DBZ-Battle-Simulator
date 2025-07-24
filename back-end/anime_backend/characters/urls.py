from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CharacterViewSet

router = DefaultRouter()
router.register('characters', CharacterViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
