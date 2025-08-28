const BattleLog = ({ logEntries = [] }) => {
    return (
        <div className="bg-gray-800 rounded-2xl p-4 shadow-lg w-full max-h-64 overflow-y-auto border border-yellow-400/20">
            <h2 className="text-lg font-bold text-yellow-400 mb-2">Battle Log</h2>
            <ul className="space-y-2 text-sm font-medium text-white">
                {logEntries.length === 0 ? (
                    <li className="text-gray-400 italic">No actions yet...</li>
                ) : (
                    logEntries.map((entry, index) => (
                        <li
                            key={index}
                            className={`p-2 rounded-lg ${entry.type === "critical"
                                    ? "bg-red-500/20 text-red-400"
                                    : entry.type === "miss"
                                        ? "text-gray-400 italic"
                                        : "bg-gray-700/50"
                                }`}
                        >
                            {entry.message}
                        </li>
                    ))
                )}
            </ul>
        </div>
    );
};

export default BattleLog;
