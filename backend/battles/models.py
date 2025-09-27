from django.db import models
from django.conf import settings
from characters.models import Character

class Battle(models.Model):
    BATTLE_STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('in_progress', 'In Progress'),
        ('completed', 'Completed'),
        ('cancelled', 'Cancelled'),
    ]
    
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='battles')
    character1 = models.ForeignKey(Character, on_delete=models.CASCADE, related_name='battles_as_character1')
    character2 = models.ForeignKey(Character, on_delete=models.CASCADE, related_name='battles_as_character2')
    
    status = models.CharField(max_length=20, choices=BATTLE_STATUS_CHOICES, default='pending')
    winner = models.ForeignKey(Character, on_delete=models.CASCADE, related_name='victories', null=True, blank=True)
    
    battle_log = models.JSONField(default=list, blank=True)
    battle_summary = models.JSONField(default=dict, blank=True)
    
    created_at = models.DateTimeField(auto_now_add=True)
    completed_at = models.DateTimeField(null=True, blank=True)
    
    class Meta:
        ordering = ['-created_at']
    
    def __str__(self):
        return f"{self.character1.name} vs {self.character2.name}"

class BattleTurn(models.Model):
    battle = models.ForeignKey(Battle, on_delete=models.CASCADE, related_name='turns')
    turn_number = models.IntegerField()
    attacker = models.ForeignKey(Character, on_delete=models.CASCADE, related_name='attacks')
    defender = models.ForeignKey(Character, on_delete=models.CASCADE, related_name='defenses')
    
    damage_dealt = models.IntegerField(default=0)
    defender_health_after = models.IntegerField()
    
    turn_log = models.JSONField(default=dict)
    
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['turn_number']
    
    def __str__(self):
        return f"Turn {self.turn_number}: {self.attacker.name} attacks {self.defender.name}"
