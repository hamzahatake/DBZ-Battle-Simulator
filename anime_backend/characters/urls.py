from .views import CharacterViewSet
from django.urls import path, include
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('characters', CharacterViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
