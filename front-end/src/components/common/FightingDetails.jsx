export default function FightingDetails({ label, value }) {
    return (
        <div>
            <span className="text-yellow-400 font-semibold">{label}:</span>{" "}
            <span className="text-slate-300">{value}</span>
        </div>
    );
}
