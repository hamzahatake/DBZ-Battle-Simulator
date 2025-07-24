import SearchBanner from "/images/SearchBanner.webp"
import SearchFilterPanel from "../character/SearchFilterPanel";
import FullBodyCharacterCard from "../character/FullBodyCharacterCard";
import { useGetCharactersQuery } from "../../features/characters/charactersSlice";
import { useState } from "react";
import { useDebounce } from "../../hooks/deBounce";

export default function CharacterList() {
    const [searchQuery, setSearchQuery] = useState("");
    const debouncedSearch = useDebounce(searchQuery, 300)
    const { data: warriors, isLoading, error } = useGetCharactersQuery({ name: debouncedSearch })

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
                <SearchFilterPanel searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            </div>

            {isLoading && <p>It's Loading</p>}
            {error && <p>Their's an error</p>}

            {/* Character Grid */}
            <div className="max-w-7xl mx-auto px-4 py-12">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                    {warriors?.length >= 1 ?
                        (warriors.slice(0, 12).map(warrior => (
                            <div key={warrior.id}>
                                <FullBodyCharacterCard warrior={warrior} />
                            </div>
                        ))) : (
                            <div className="col-span-full text-center text-yellow-400 text-lg font-semibold">
                                No characters found matching your search.
                            </div>
                        )}
                </div>
            </div>
        </div>
    );
}