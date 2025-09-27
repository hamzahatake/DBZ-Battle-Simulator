import { Link } from "react-router-dom";
import { UIIcon } from "./ImageComponent";

export default function HeroBanner() {
    return (
        <div className="relative w-full min-h-screen flex items-center justify-center px-6 text-white overflow-hidden">
            {/* Background Image */}
            <UIIcon
                iconName="hero"
                alt="Hero Background"
                className="absolute inset-0 w-full h-full object-cover object-center"
            />
                
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/80 z-0" />

            {/* Content */}
            <div className="text-center max-w-3xl z-10 animate-fade-in-up">
                <p className="text-sm uppercase tracking-widest text-yellow-400 mb-3">
                    Now Live
                </p>

                <div className="relative inline-block">
                    <h1 className="text-5xl md:text-6xl font-extrabold leading-tight tracking-tight text-white drop-shadow-glow">
                        ASSEMBLE YOUR <br /> ULTIMATE DBZ TEAM
                    </h1>
                </div>

                <p className="text-lg text-gray-300 mt-6 mb-8">
                    Step into the DBZ universe and summon legendary warriors to your squad.
                    Discover their unique powers and prepare for strategic, turn-based battles.
                </p>

                <div className="flex justify-center gap-6 flex-wrap">
                    <Link to="/characters" className="bg-yellow-400 text-black px-6 py-2 rounded-xl font-semibold shadow-md hover:scale-105 hover:bg-yellow-300 transition-all">
                        Browse Characters
                    </Link>
                    <Link to="/team" className="bg-gray-800 border border-yellow-400 text-yellow-300 px-6 py-2 rounded-xl font-semibold shadow-md hover:scale-105 hover:bg-gray-700 transition-all">
                        Start Building Team
                    </Link>
                </div>
            </div>
        </div>
    );
}
