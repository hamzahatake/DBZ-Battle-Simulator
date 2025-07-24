import GokuUI_FullBody from "/images/GokuUI_FullBody.png";
import StatBar from "../common/StatBar";
import FightingDetails from "../common/FightingDetails";

export default function CharacterDetail() {
    return (
        <div className="text-white px-6 py-20 bg-gradient-to-br from-gray-900 via-blue-950 to-indigo-900 relative overflow-hidden">

            {/* 🔮 Shimmer Layer */}
            <div className="absolute inset-0 pointer-events-none z-0 opacity-30 group-hover:opacity-50 transition duration-500 blur-2xl"
                 style={{ background: 'radial-gradient(circle at center, rgba(255,255,255,0.08), transparent 60%)' }}>
            </div>

            <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12 items-center z-10 relative">

                {/* LEFT: Lore & Info */}
                <div className="space-y-8 text-left px-2 lg:px-6">
                    <h2 className="text-4xl md:text-5xl font-extrabold text-blue-400 leading-tight drop-shadow-[0_0_10px_rgba(96,165,250,0.4)]">
                        Goku Ultra Instinct
                    </h2>
                    <hr className="border-blue-800 w-3/4" />

                    <p className="text-blue-100 text-base leading-relaxed tracking-wide">
                        The Saiyan raised on Earth.
                        <br /><br />
                        A fearless warrior with an unbreakable spirit. Goku thrives in battle, growing stronger with every challenge.
                        Master of powerful techniques like Kamehameha and Kaioken, he’s your go-to for high damage and clutch comebacks.
                    </p>
                </div>

                {/* CENTER: Character Image */}
                <div className="flex justify-center px-2">
                    <img
                        src={GokuUI_FullBody}
                        alt="Goku Ultra Instinct"
                        className="h-[70vh] object-contain drop-shadow-[0_10px_25px_rgba(255,255,255,0.15)]"
                    />
                </div>

                {/* RIGHT: Abilities + Stats */}
                <div className="space-y-10 text-left px-2 lg:px-6">
                    <div className="space-y-4 bg-gray-800/70 backdrop-blur-md p-5 rounded-xl shadow-md text-sm">
                        <FightingDetails label="Type" value="Melee / Energy" />
                        <FightingDetails label="Special Move" value="Super Kamehameha" />
                        <FightingDetails label="Ultimate" value="Ultra Instinct Blast" />
                        <FightingDetails label="Strengths" value="High agility, instant reaction, power spikes" />
                        <FightingDetails label="Weaknesses" value="Energy drain, inconsistent early-game" />
                    </div>

                    <div className="space-y-4">
                        <StatBar label="Attack" value={95} />
                        <StatBar label="Defense" value={82} />
                        <StatBar label="Speed" value={97} />
                        <StatBar label="Energy" value={100} />
                    </div>
                </div>
            </div>
        </div>
    );
}
