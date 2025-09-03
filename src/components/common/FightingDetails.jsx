export default function FightingDetails({ warrior }) {
    return (
        <div className="flex flex-col space-y-2">
            <span className="text-yellow-400 font-semibold">Type: <span className="text-slate-300">{warrior?.type}</span></span>{" "}
            <span className="text-yellow-400 font-semibold">Role: <span className="text-slate-300">{warrior?.role}</span></span>{" "}
            <span className="text-yellow-400 font-semibold">Special: <span className="text-slate-300">{warrior?.special_move}</span></span>{" "}
            <span className="text-yellow-400 font-semibold">Ultimate: <span className="text-slate-300">{warrior?.ultimate_move}</span></span>{" "}
            <span className="text-yellow-400 font-semibold">Strength: <span className="text-slate-300">{warrior?.strengths}</span></span>{" "}
            <span className="text-yellow-400 font-semibold">Weakness: <span className="text-slate-300">{warrior?.weaknesses}</span></span>{" "}
        </div>
    );
}
