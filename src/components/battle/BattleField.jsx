const BattleField = ({ teamA = [], teamB = [] }) => {
    return (
        <div className="grid grid-cols-2 gap-6 w-full">
            {/* Team A */}
            <div className="flex flex-col items-center gap-4 bg-gray-800 rounded-2xl p-4 shadow-lg">
                <h2 className="text-xl font-semibold text-yellow-400">Team A</h2>
                <div className="grid grid-cols-2 gap-4">
                    {teamA.map((character, index) => (
                        <div
                            key={index}
                            className="w-24 h-32 bg-gray-700 rounded-xl flex items-center justify-center text-sm text-white shadow"
                        >
                            {character.name}
                        </div>
                    ))}
                </div>
            </div>

            {/* Team B */}
            <div className="flex flex-col items-center gap-4 bg-gray-800 rounded-2xl p-4 shadow-lg">
                <h2 className="text-xl font-semibold text-yellow-400">Team B</h2>
                <div className="grid grid-cols-2 gap-4">
                    {teamB.map((character, index) => (
                        <div
                            key={index}
                            className="w-24 h-32 bg-gray-700 rounded-xl flex items-center justify-center text-sm text-white shadow"
                        >
                            {character.name}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BattleField;