import GokuUI_Profile from "/images/GokuUI_Profile.jpg";

export default function ProfileCharacterCard() {
    return (
        <div className="p-2">
            <div className="relative w-60 h-72 rounded-3xl overflow-hidden bg-gray-800 shadow-2xl group cursor-pointer transition-transform duration-300 hover:scale-105">

                {/* Character Image */}
                <img
                    src={GokuUI_Profile}
                    alt="Goku"
                    className="w-full h-full object-cover brightness-100 group-hover:brightness-50 transition duration-300"
                />

                {/* Overlay */}
                <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/80 via-black/50 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="text-center">
                        <h2 className="text-yellow-400 font-bold text-xl tracking-wide drop-shadow">
                            Goku
                        </h2>
                        <p className="text-slate-200 text-sm italic">Ultra Instinct</p>
                    </div>
                </div>

            </div>
        </div>

    );
}

