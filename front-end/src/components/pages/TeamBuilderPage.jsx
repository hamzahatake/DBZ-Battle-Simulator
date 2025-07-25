import Add from "/images/Plus.png";

export default function TeamBuilderPage() {
    const teamSlots = [
        { name: "GOKU", image: GokuUI_FullBody },
        null,
        null,
        null,
        null,
    ];

    return (
        <div className="w-full px-4 pt-20 bg-gray-900 text-white min-h-screen">
            <h1 className="text-3xl font-bold text-yellow-400 mb-10 text-center">
                Build Your Team
            </h1>

            <div className="flex justify-center gap-6 flex-wrap">
                {teamSlots.map((member, index) => (
                    <div
                        key={index}
                        className="w-64 h-[65vh] sm:h-[70vh] lg:h-[75vh] relative rounded-2xl shadow-2xl bg-gradient-to-br from-gray-800 via-blue-800 to-indigo-500
                            group overflow-hidden transition-all duration-300 hover:scale-105 cursor-pointer"
                    >
                        {member ? (
                            <>
                                <img
                                    src={member?.image}
                                    alt={member.name}
                                    className="w-full h-full object-cover object-top opacity-60 group-hover:opacity-100 transition-opacity duration-300"
                                />
                                <p className="absolute top-2 left-2 text-cyan-300 font-extrabold text-lg tracking-wider uppercase drop-shadow-[0_0_6px_rgba(255,255,255,0.7)]
                                group-hover:opacity-5 transition-opacity duration-300">
                                    {member.name}
                                </p>
                            </>
                        ) : (
                            <div className="flex items-center justify-center w-full h-full bg-gray-800 border-2 border-dashed border-yellow-400 rounded-2xl">
                                <img
                                    src={Add}
                                    alt="Add a character"
                                    className="w-20 h-20 hover:scale-125 transition-transform duration-300 ease-in-out"
                                />
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
