export default function StatBar({ label, value }) {
    return (
        <div className="w-full">
            <div className="flex justify-between mb-1 text-slate-300 text-xs uppercase tracking-wider">
                <span>{label}</span>
                <span>{value}</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2.5">
                <div
                    className="bg-yellow-400 h-2.5 rounded-full"
                    style={{ width: `${value}%` }}
                ></div>
            </div>
        </div>
    );
}
