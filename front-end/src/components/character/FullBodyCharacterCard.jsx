import GokuUI_FullBody from "/images/GokuUI_FullBody.png"
import Attack from "/images/Attack.png"
import Defence from "/images/Defence.png"

export default function FullBodyCharacterCard({ warrior }) {
    return (
        <div className="p-3">
            <div className="relative w-72 rounded-3xl shadow-2xl
            bg-gradient-to-br from-gray-800 via-blue-800 to-indigo-500
            group transform transition-all duration-300 hover:scale-105 cursor-pointer">

                {/* Image */}
                <img
                    src={warrior.image}
                    alt={warrior.name}
                    className="w-full h-3/5 object-cover object-top transition-transform duration-500 group-hover:scale-110"
                />

                {/* Content */}
                <div className="flex justify-between items-start p-4 bg-gray-900 h-2/5 text-white">
                    {/* Left: Character Info */}
                    <div className="flex flex-col gap-1">
                        <p className="text-yellow-300 text-xs font-semibold uppercase tracking-wide">Level 86</p>
                        <h2 className="text-2xl font-bold leading-snug text-white">
                            {warrior.name} <span className="text-sm font-light text-yellow-100 ml-1">{warrior.race}</span>
                        </h2>
                        <p className="text-sm text-gray-300 tracking-wide italic">Ultra Instinct</p>
                    </div>

                    {/* Right: Stats */}
                    <div className="flex flex-col gap-1 items-center text-sm text-blue-100">
                        <div className="flex flex-col items-center">
                            <img src={Attack} alt="Attack" className="w-8 h-8 mb-1" />
                            <p>{warrior.attack}</p>
                        </div>
                        <div className="flex flex-col items-center">
                            <img src={Defence} alt="Defense" className="w-8 h-8 mb-1" />
                            <p>{warrior.defense}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}