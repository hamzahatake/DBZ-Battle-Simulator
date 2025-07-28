import HeroBanner from "../common/HeroBanner"
import MarqueeSeparator from "../common/MarqueeSeparator"
import ProfileCharacterCard from "../character/ProfileCharacterCard"
import CharacterDetail from "../character/CharacterDetail"
import { useGetCharactersQuery } from "../../features/characters/charactersSlice"
import { useState, useEffect } from "react"

export default function HomePage() {
    const { data: warriors, isLoading, error } = useGetCharactersQuery();
    const [selectedCharacter, setSelectedCharacter] = useState();

    useEffect(() => {
        if (warriors?.length > 0 && !selectedCharacter) {
            setSelectedCharacter(warriors[3]);
        }
    }, [warriors, selectedCharacter]);


    if (isLoading) {
        return <div className="text-center text-white mt-20">Loading Z Fighters...</div>;
    }

    if (error) {
        return <div className="text-center text-red-500 mt-20">Yamcha broke the API. Try again later.</div>;
    }

    return (
        <div>
            <HeroBanner />
            <MarqueeSeparator />
            <div className="my-20 w-full">
                <div className="gap-y-10">
                    <div className="mb-10 flex justify-center font-bold text-3xl">
                        <h2 className="text-white">Characters to Play</h2>
                    </div>
                    <div className="flex justify-center gap-8 py-4">
                        {warriors?.length >= 1 ? (
                            warriors.slice(0, 5).map(warrior => (
                                <div key={warrior.id}
                                    className={`rounded-3xl transition duration-300 transform 
                                    ${warrior.id === selectedCharacter?.id
                                            ? 'scale-110 -translate-y-2 shadow-2xl shadow-amber-50'
                                            : 'hover:shadow-md shadow'}`}>
                                    <ProfileCharacterCard fighter={warrior} onClick={() => setSelectedCharacter(warrior)} />
                                </div>
                            )))
                            : (
                                <div className="col-span-full text-center text-yellow-400 text-lg font-semibold">
                                    No characters found matching your search.
                                </div>
                            )}
                    </div>
                </div>
            </div>
            <MarqueeSeparator />
            <div>
                <CharacterDetail fighter={selectedCharacter} />
            </div>
        </div>
    )
};
