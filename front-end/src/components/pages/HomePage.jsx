import HeroBanner from "../common/HeroBanner"
import MarqueeSeparator from "../common/MarqueeSeparator"
import ProfileCharacterCard from "../character/ProfileCharacterCard"
import CharacterDetail from "../character/CharacterDetail"
import { useGetCharactersQuery } from "../../features/characters/charactersSlice"

export default function HomePage() {
    const { data: warriors, isLoading, error } = useGetCharactersQuery();

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
                                <div key={warrior.id}>
                                    <ProfileCharacterCard warrior={warrior} />
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
                <CharacterDetail warrior={warriors?.[3]} />
            </div>
        </div>
    )
};
