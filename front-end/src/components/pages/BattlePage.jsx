import React, { useState } from "react";
import {
    BattleController,
    BattleField,
    BattleHistoryList,
    BattleLog,
    BattleSummary,
    BattleTurnLog,
    HistoryFilterBar,
} from "../battle";

// Temporary mock data
const mockBattles = [];

export default function BattlePage() {
    const [filters, setFilters] = useState({ search: "", sort: "recent" });
    const [selectedBattle, setSelectedBattle] = useState(null);
    const [battleState, setBattleState] = useState("idle");
    

    return (
        <div className="min-h-screen pt-24 bg-gray-950 text-white px-4 py-6 flex flex-col gap-6">
            {/* Controller + Battlefield */}
            <div className="grid lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1"><BattleController /></div>
                <div className="lg:col-span-2"><BattleField /></div>
            </div>

            {/* Logs */}
            <div className="grid lg:grid-cols-2 gap-6">
                <BattleTurnLog />
                <BattleLog />
            </div>

            {/* Summary */}
            {battleState === "summary" && (
                <div className="mt-6"><BattleSummary /></div>
            )}

            {/* History */}
            <div className="mt-8">
                <h2 className="text-2xl font-semibold mb-2">Battle History</h2>
                <HistoryFilterBar filters={filters} setFilters={setFilters} />
                <BattleHistoryList
                    battles={mockBattles}
                    onBattleClick={(battle) => setSelectedBattle(battle)}
                />
            </div>
        </div>
    );
}
