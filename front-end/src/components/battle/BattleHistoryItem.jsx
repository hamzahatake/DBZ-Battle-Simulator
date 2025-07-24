const BattleHistoryItem = ({ battle, onClick }) => {
    return (
        <div
            onClick={onClick}
            className="bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-2xl p-4 shadow-md transition cursor-pointer flex justify-between items-center gap-4"
        >
            {/* Left side info */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 flex-wrap">
                <div>
                    <h3 className="text-yellow-400 font-bold text-lg">
                        {battle.winner} Won
                    </h3>
                    <p className="text-sm text-white/80">
                        {battle.turns} Turns • {new Date(battle.date).toLocaleDateString()}
                    </p>
                </div>
                {battle.mvp && (
                    <span className="text-xs text-yellow-300 bg-gray-700 px-2 py-1 rounded-full font-semibold">
                        MVP: {battle.mvp}
                    </span>
                )}
            </div>

            {/* Right side button/icon */}
            <button className="text-yellow-400 hover:text-yellow-300 font-semibold text-sm border border-yellow-400 px-3 py-1 rounded-xl transition">
                View
            </button>
        </div>
    );
};

export default BattleHistoryItem;
