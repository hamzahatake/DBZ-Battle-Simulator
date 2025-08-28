export default function StatBar({ warrior }) {
    if (!warrior) return null;

    const stats = [
        { label: "Attack", key: "attack_level", color: "bg-red-500" },
        { label: "Defense", key: "defense_level", color: "bg-blue-500" },
        { label: "Speed", key: "speed_level", color: "bg-green-500" },
        { label: "Energy", key: "energy_level", color: "bg-yellow-400" },
    ];

    return (
        <div className="w-full space-y-4">
            {stats.map((stat) => (
                <div key={stat.key}>
                    <div className="flex justify-between text-slate-300 text-xs uppercase tracking-wider mb-1">
                        <span>{stat.label}</span>
                        <span>{warrior?.[stat.key] ?? 'N/A'}</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2.5">
                        <div
                            className={`${stat.color} h-2 rounded-full transition-all duration-500`}
                            style={{ width: `${(warrior?.[stat.key] ?? 0)}%` }}
                        ></div>
                    </div>
                </div>))}
        </div>
    );
}
