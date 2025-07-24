import HeroBanner from "../common/HeroBanner"
import MarqueeSeparator from "../common/MarqueeSeparator"
import ProfileCharacterCard from "../character/ProfileCharacterCard"
import CharacterDetail from "../character/CharacterDetail"

export default function HomePage() {
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
                        <ProfileCharacterCard />
                        <ProfileCharacterCard />
                        <ProfileCharacterCard />
                        <ProfileCharacterCard />
                        <ProfileCharacterCard />
                    </div>
                </div>
            </div>
            <MarqueeSeparator />
            <div>
                <CharacterDetail />
            </div>
        </div>
    )
};
