import StatBar from "../common/StatBar";
import FightingDetails from "../common/FightingDetails";
import { CharacterImage } from "../common/ImageComponent";

export default function CharacterDetail({ fighter }) {
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
                        {fighter?.name} {fighter?.form}
                    </h2>
                    <hr className="border-blue-800 w-3/4" />

                    <p className="text-blue-100 text-base leading-relaxed tracking-wide">
                        {fighter?.description}
                    </p>
                </div>

                {/* CENTER: Character Image */}
                <div className="flex justify-center px-2">
                    <CharacterImage
                        character={fighter}
                        type="full_body"
                        alt={fighter?.name}
                        className="h-[70vh] object-contain drop-shadow-[0_10px_25px_rgba(255,255,255,0.15)]"
                    />
                </div>

                {/* RIGHT: Abilities + Stats */}
                <div className="space-y-10 text-left px-2 lg:px-6">
                    <div className="space-y-4 bg-gray-800/70 backdrop-blur-md p-5 rounded-xl shadow-md text-sm">
                        <FightingDetails warrior={fighter} />
                    </div>

                    <div className="space-y-4">
                        <StatBar warrior={fighter} />
                    </div>
                </div>
            </div>
        </div>
    );
}
