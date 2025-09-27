from django.contrib import admin
from .models import Battle, BattleTurn

class BattleTurnInline(admin.TabularInline):
    model = BattleTurn
    extra = 0
    readonly_fields = ['created_at']

@admin.register(Battle)
class BattleAdmin(admin.ModelAdmin):
    list_display = ['character1', 'character2', 'status', 'winner', 'created_at']
    list_filter = ['status', 'created_at']
    search_fields = ['character1__name', 'character2__name']
    readonly_fields = ['created_at', 'completed_at']
    inlines = [BattleTurnInline]
    ordering = ['-created_at']

@admin.register(BattleTurn)
class BattleTurnAdmin(admin.ModelAdmin):
    list_display = ['battle', 'turn_number', 'attacker', 'defender', 'damage_dealt', 'defender_health_after']
    list_filter = ['battle', 'turn_number']
    readonly_fields = ['created_at']
    ordering = ['battle', 'turn_number']