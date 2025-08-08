from .models import Character
from .serializers import CharacterSerializers, RegistrationSerializers, ProfileViewSerializers
from rest_framework import viewsets, filters
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

class CharacterViewSet(viewsets.ModelViewSet):
    permission_classes = [AllowAny]

    queryset = Character.objects.all()
    serializer_class = CharacterSerializers
    filter_backends = [filters.OrderingFilter]
    ordering_fields = ['name', 'attack_level', 'defense_level', 'speed_level']
    ordering = ['name']

class ProfileView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        serializer = ProfileViewSerializers(request.user)
        return Response(serializer.data)


class RegisterView(APIView):
    def post(self, request):
        serializer = RegistrationSerializers(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Registration successful'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)