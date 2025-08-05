import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetCharactersQuery } from "../../features/characters/charactersSlice";
import { loadSelectedTeamFromStorage } from "../../features/team/teamSlice";
import TeamSlot from "../team/TeamSlot";
import SavedTeamPanel from "../team/SavedTeamPanel";
import StartBattleButton from "../team/StartBattleButton";
import TeamSummary from "../team/TeamSummary";

export default function TeamBuilderPage() {
    const dispatch = useDispatch();
    const { data: warriors, isLoading, error } = useGetCharactersQuery();
    const selectedTeam = useSelector((state) => state.teams.selectedTeam);

    return (
        <div className="w-full min-h-screen bg-gray-900 text-white pt-20 px-4">
            <h1 className="text-3xl font-bold text-yellow-400 mb-10 text-center">
                Build Your Team
            </h1>

            <div className="flex flex-col lg:flex-row gap-8 justify-center items-start w-full">
                {/* Team Slots */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full lg:w-2/3">
                    {Array.from({ length: 5 }).map((_, idx) => (
                        <TeamSlot
                            key={idx}
                            character={selectedTeam[idx] || null}
                        />
                    ))
                    }
                </div>

                {/* Saved Teams */}
                <div className="w-full lg:w-1/3">
                    <SavedTeamPanel warrior={warriors} />
                </div>
            </div>

            {/* Summary + Start */}
            <div className="mt-10 max-w-5xl mx-auto px-4">
                <TeamSummary />
                <div className="flex justify-center mt-6">
                    <StartBattleButton />
                </div>
            </div>
        </div>
    );
}
