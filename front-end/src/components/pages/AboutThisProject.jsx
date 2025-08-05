export default function AboutThisProject() {
    return (
        <div className="min-h-screen bg-gray-900 text-slate-100 px-6 py-12 flex flex-col items-center">
            {/* Page Title */}
            <h1 className="text-4xl md:text-5xl font-bold text-yellow-400 mb-6 animate-pulse">
                About This Simulator
            </h1>

            {/* Introduction Box */}
            <div className="max-w-4xl bg-gray-800 p-6 rounded-2xl shadow-2xl">
                <p className="text-lg text-slate-300 leading-relaxed mb-6">
                    Welcome to the <span className="text-yellow-300 font-semibold">Anime Character Battle Simulator</span>, a fan-made web app built by an otaku and full-stack developer.
                    This project lets you build teams of your favorite DBZ characters, simulate turn-based battles, and enjoy an animated interface inspired by classic anime games.
                </p>

                {/* Developer Section */}
                <div className="mb-6">
                    <h2 className="text-2xl font-semibold text-yellow-400 mb-2">Built by a Developer Who Loves:</h2>
                    <ul className="list-disc list-inside text-slate-300 space-y-1">
                        <li>🔥 Epic anime battles</li>
                        <li>🎨 Smooth animations and UI polish</li>
                        <li>💡 Designing apps with purpose and personality</li>
                    </ul>
                </div>

                {/* Tech Stack */}
                <div className="mb-6">
                    <h2 className="text-2xl font-semibold text-yellow-400 mb-2">Tech Stack:</h2>
                    <p className="text-slate-300">
                        This app is powered by <span className="font-semibold text-white">React, Redux Toolkit, RTK Query</span> for frontend logic, and
                        a custom <span className="font-semibold text-white">Django REST API</span> for backend data. Animations are handled using
                        <span className="font-semibold text-white"> Framer Motion</span>, and styling is built with <span className="font-semibold text-white">Tailwind CSS</span>.
                    </p>
                </div>

                {/* Motivation */}
                <div className="mb-6">
                    <h2 className="text-2xl font-semibold text-yellow-400 mb-2">Why I Built This</h2>
                    <p className="text-slate-300">
                        I wanted to create a project that brings together my love for anime and my passion for interactive full-stack development. This simulator combines fun gameplay logic with real-world technologies I use professionally.
                    </p>
                </div>

                {/* Home & Portfolio Link*/}
                <div className="flex justify-center gap-4 mt-10">
                    <a
                        href="/"
                        className="bg-gray-700 text-white font-semibold py-2 px-6 rounded-full hover:bg-gray-600 transition-all duration-300"
                    >
                        Home
                    </a>
                    <a
                        href="https://portfolio-seven-gamma-62.vercel.app"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-yellow-400 text-black font-semibold py-2 px-6 rounded-full hover:bg-yellow-300 transition-all duration-300"
                    >
                        Portfolio
                    </a>
                </div>

            </div>
        </div>
    );
};

