from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.utils import timezone
from .models import Battle, BattleTurn
from .serializers import BattleSerializer, BattleCreateSerializer, BattleTurnSerializer
from characters.models import Character

class BattleViewSet(viewsets.ModelViewSet):
    queryset = Battle.objects.all()
    serializer_class = BattleSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        return Battle.objects.filter(user=self.request.user)
    
    def get_serializer_class(self):
        if self.action == 'create':
            return BattleCreateSerializer
        return BattleSerializer
    
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        battle = serializer.save()
        
        # Start the battle simulation
        self.simulate_battle(battle)
        
        return Response(BattleSerializer(battle).data, status=status.HTTP_201_CREATED)
    
    def simulate_battle(self, battle):
        """Simple battle simulation logic"""
        char1 = battle.character1
        char2 = battle.character2
        
        char1_health = char1.health
        char2_health = char2.health
        
        battle_log = []
        turn_number = 1
        
        battle.status = 'in_progress'
        battle.save()
        
        while char1_health > 0 and char2_health > 0:
            # Character 1 attacks Character 2
            damage = max(1, char1.attack - char2.defense)
            char2_health = max(0, char2_health - damage)
            
            turn_log = {
                'turn': turn_number,
                'attacker': char1.name,
                'defender': char2.name,
                'damage': damage,
                'defender_health_after': char2_health
            }
            
            BattleTurn.objects.create(
                battle=battle,
                turn_number=turn_number,
                attacker=char1,
                defender=char2,
                damage_dealt=damage,
                defender_health_after=char2_health,
                turn_log=turn_log
            )
            
            battle_log.append(turn_log)
            turn_number += 1
            
            if char2_health <= 0:
                break
            
            # Character 2 attacks Character 1
            damage = max(1, char2.attack - char1.defense)
            char1_health = max(0, char1_health - damage)
            
            turn_log = {
                'turn': turn_number,
                'attacker': char2.name,
                'defender': char1.name,
                'damage': damage,
                'defender_health_after': char1_health
            }
            
            BattleTurn.objects.create(
                battle=battle,
                turn_number=turn_number,
                attacker=char2,
                defender=char1,
                damage_dealt=damage,
                defender_health_after=char1_health,
                turn_log=turn_log
            )
            
            battle_log.append(turn_log)
            turn_number += 1
        
        # Determine winner
        if char1_health > 0:
            battle.winner = char1
        else:
            battle.winner = char2
        
        battle.status = 'completed'
        battle.completed_at = timezone.now()
        battle.battle_log = battle_log
        battle.battle_summary = {
            'total_turns': turn_number - 1,
            'winner': battle.winner.name,
            'final_health': {
                char1.name: char1_health,
                char2.name: char2_health
            }
        }
        battle.save()
    
    @action(detail=True, methods=['get'])
    def history(self, request, pk=None):
        """Get battle history for a specific character"""
        battle = self.get_object()
        turns = battle.turns.all()
        serializer = BattleTurnSerializer(turns, many=True)
        return Response(serializer.data)