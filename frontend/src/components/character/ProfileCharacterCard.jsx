import { getImageUrl } from "../../services/api";

export default function ProfileCharacterCard({ fighter, onClick }) {
    return (
        <div className="relative w-60 h-72 rounded-3xl overflow-hidden bg-gray-800 shadow-2xl group cursor-pointer 
        transition-transform duration-300" onClick={onClick}>

            {/* Character Image */}
            <img
                src={getImageUrl(fighter?.profile_image_url)}
                alt={fighter?.name || "Character"}
                className="w-full h-full object-cover brightness-100 group-hover:brightness-50 transition duration-300"
            />

            {/* Overlay */}
            <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/80 via-black/50 to-transparent 
            p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="text-center">
                    <h2 className="text-yellow-400 font-bold text-xl tracking-wide drop-shadow">
                        {fighter?.name}
                    </h2>
                    <p className="text-slate-200 text-sm italic">{fighter?.form}</p>
                </div>
            </div>
        </div>

    );
}

