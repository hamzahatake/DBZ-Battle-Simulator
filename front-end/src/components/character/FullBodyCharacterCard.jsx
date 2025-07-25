import Attack from "/images/Attack.png"
import Defence from "/images/Defence.png"

export default function FullBodyCharacterCard({ warrior }) {
    return (
        <div className="p-3">
            <div className="relative w-72 h-[500px] rounded-3xl shadow-2xl
    bg-gradient-to-br from-gray-800 via-blue-800 to-indigo-500
    group transform transition-all duration-300 hover:scale-105 cursor-pointer">

                {/* Image */}
                <div className="h-[70%] flex items-center justify-center">
                    <img
                        src={warrior.image_full_body}
                        alt={warrior.name}
                        className="h-full object-contain transition-transform duration-500 group-hover:scale-110"
                    />
                </div>

                {/* Content */}
                <div className="flex justify-between items-start p-4 bg-gray-900 h-[30%] text-white">
                    {/* Left: Character Info */}
                    <div className="flex flex-col gap-1 overflow-hidden w-[60%]">
                        <p className="text-yellow-300 text-xs font-semibold uppercase tracking-wide truncate">
                            Level {warrior?.level}
                        </p>
                        <h2 className="text-lg font-bold leading-snug text-white truncate">
                            {warrior.name}
                            <span className="text-sm font-light text-yellow-100 ml-1">{warrior.race}</span>
                        </h2>
                        <p className="text-sm text-gray-300 tracking-wide italic truncate">{warrior.form}</p>
                    </div>

                    {/* Right: Stats */}
                    <div className="flex flex-col gap-1 items-center text-sm text-blue-100 w-[40%]">
                        <div className="flex flex-col items-center">
                            <img src={Attack} alt="Attack" className="w-6 h-6 mb-1" />
                            <p>{warrior.attack_level}</p>
                        </div>
                        <div className="flex flex-col items-center">
                            <img src={Defence} alt="Defense" className="w-6 h-6 mb-1" />
                            <p>{warrior.defense_level}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}