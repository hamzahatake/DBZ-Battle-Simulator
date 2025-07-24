import SearchBanner from "/images/SearchBanner.webp"
import SearchFilterPanel from "../character/SearchFilterPanel";
import FullBodyCharacterCard from "../character/FullBodyCharacterCard";

export default function CharacterList() {
    const characters = Array(5).fill({ character: FullBodyCharacterCard });

    return (
        <div className="min-h-screen bg-gray-900 text-white">
            {/* Hero Background Section */}
            <div className="relative w-full h-[40vh] flex items-center justify-center px-4 overflow-hidden">
                {/* Background Image */}
                <img
                    src={SearchBanner}
                    alt="Background"
                    className="absolute inset-0 w-full h-[90vh] object-cover object-center"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/50" />
            </div>

            {/* Search Filters */}
            <div className="mt-[-3rem] z-30 relative">
                <SearchFilterPanel />
            </div>

            {/* Character Grid */}
            <div className="max-w-7xl mx-auto px-4 py-12">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                    {characters.map((warrior, index) => (
                        <div key={index}>
                            {warrior?.character && <warrior.character />}
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
}