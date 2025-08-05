import TeamSlot from "../team/TeamSlot";
import SavedTeamPanel from "../team/SavedTeamPanel";
import StartBattleButton from "../team/StartBattleButton";
import TeamSummary from "../team/TeamSummary";
import { useGetCharactersQuery } from "../../features/characters/charactersSlice";
import { useSelectedCharacter } from "../../context/selectedCharacters";

export default function TeamBuilderPage() {
    const { data: warriors, isLoading, error } = useGetCharactersQuery();
    const { selectedCharacter, setSelectedCharacter } = useSelectedCharacter();

    const handleRemoveFromTeam = (indexToRemove) => {
        setSelectedCharacter(prev => {
            const copy = [...prev];
            copy.splice(indexToRemove, 1);
            return copy;
        });
    };

    return (
        <div className="w-full min-h-screen bg-gray-900 text-white pt-20 px-4">
            <h1 className="text-3xl font-bold text-yellow-400 mb-10 text-center">
                Build Your Team
            </h1>

            {/* Main Layout: Team Slots + Saved Panel */}
            <div className="flex flex-col lg:flex-row gap-8 justify-center items-start w-full">
                {/* Left: Team Slots (Grid 3x2) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full lg:w-2/3">
                    {Array.from({ length: 5 }).map((_, idx) => (
                        <TeamSlot
                            key={idx}
                            character={selectedCharacter[idx]}
                            onRemove={handleRemoveFromTeam}
                        />
                    ))}
                </div>

                {/* Right: Saved Team Panel */}
                <div className="w-full lg:w-1/3">
                    <SavedTeamPanel warrior={warriors} />
                </div>
            </div>

            {/* Summary + Start Battle */}
            <div className="mt-10 max-w-5xl mx-auto px-4">
                <TeamSummary />
                <div className="flex justify-center mt-6">
                    <StartBattleButton />
                </div>
            </div>
        </div>
    );
}
