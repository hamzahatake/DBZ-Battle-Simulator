import DraggableTeamSlot from "../team/DraggableTeamSlot";
import SavedTeamPanel from "../team/SavedTeamPanel";
import StartBattleButton from "../team/StartBattleButton";
import TeamSummary from "../team/TeamSummary";

export default function TeamBuilderPage() {
    return (
        <div className="w-full min-h-screen bg-gray-900 text-white pt-20 px-4">
            <h1 className="text-3xl font-bold text-yellow-400 mb-10 text-center">
                Build Your Team
            </h1>

            {/* Team Slots and Saved Panel */}
            <div className="flex flex-col lg:flex-row gap-8 justify-center items-start max-w-7xl mx-auto w-full">
                {/* Left Column: Team Slots */}
                <div className="flex flex-wrap justify-center gap-6 lg:w-2/3">
                    {[...Array(5)].map((_, index) => (
                        <DraggableTeamSlot key={index} index={index} />
                    ))}
                </div>

                {/* Right Column: Saved Teams Panel */}
                <div className="w-full lg:w-1/3">
                    <SavedTeamPanel />
                </div>
            </div>

            {/* Summary & Start Battle Button */}
            <div className="mt-10 max-w-5xl mx-auto px-4">
                <TeamSummary />
                <div className="flex justify-center mt-6">
                    <StartBattleButton />
                </div>
            </div>
        </div>
    );
}
