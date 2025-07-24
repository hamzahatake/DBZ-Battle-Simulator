const BattleTurnLog = ({ turnNumber = 1, actions = [] }) => {
    return (
        <div className="bg-gray-800 rounded-xl p-4 mb-4 shadow-md border border-gray-700">
            <h3 className="text-lg font-bold text-yellow-300 mb-2">Turn {turnNumber}</h3>

            <ul className="space-y-1 text-sm text-white">
                {actions.map((action, index) => (
                    <li
                        key={index}
                        className={`p-2 rounded-lg ${action.type === "critical"
                                ? "bg-red-500/20 text-red-400"
                                : action.type === "miss"
                                    ? "text-gray-400 italic"
                                    : "bg-gray-700/50"
                            }`}
                    >
                        {action.message}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BattleTurnLog;
