const BattleSummary = ({ winner, turns, mvp, onRestart, onViewHistory }) => {
    return (
        <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl shadow-2xl p-6 text-center border border-yellow-400/30 w-full">
            <h2 className="text-2xl font-extrabold text-yellow-400 mb-4">
                {winner ? `${winner} Wins!` : "Draw!"}
            </h2>

            <div className="text-white space-y-2 text-sm sm:text-base">
                <p><span className="text-yellow-300 font-semibold">Total Turns:</span> {turns}</p>
                {mvp && (
                    <p>
                        <span className="text-yellow-300 font-semibold">MVP:</span> {mvp}
                    </p>
                )}
            </div>

            <div className="mt-6 flex justify-center gap-4 flex-wrap">
                <button
                    onClick={onRestart}
                    className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-black rounded-xl font-semibold shadow-md transition"
                >
                    Battle Again
                </button>

                <button
                    onClick={onViewHistory}
                    className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-xl font-semibold shadow-md transition"
                >
                    View History
                </button>
            </div>
        </div>
    );
};

export default BattleSummary;
