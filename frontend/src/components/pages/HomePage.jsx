import { FaChevronLeft, FaChevronRight } from "react-icons/fa"
import { motion, AnimatePresence } from "framer-motion"
import HeroBanner from "../common/HeroBanner"
import MarqueeSeparator from "../common/MarqueeSeparator"
import ProfileCharacterCard from "../character/ProfileCharacterCard"
import CharacterDetail from "../character/CharacterDetail"
import TeamPreview from "../team/TeamPreview"
import { useGetCharactersQuery } from "../../features/characters/charactersSlice"
import { useState, useEffect, useMemo } from "react"
import { useSelector, useDispatch } from "react-redux"
import { loadUserTeam } from "../../features/teams/teamsSlice"

export default function HomePage() {
    const dispatch = useDispatch();
    const { user, isAuthenticated } = useSelector(state => state.auth);
    const { data: warriors = [], isLoading, error } = useGetCharactersQuery();
    const [selectedCharacter, setSelectedCharacter] = useState();

    useEffect(() => {
        if (warriors?.length > 0 && !selectedCharacter) {
            setSelectedCharacter(warriors[0]);
        }
    }, [warriors, selectedCharacter]);

    // Load user's team when they're authenticated
    useEffect(() => {
        if (isAuthenticated && user) {
            dispatch(loadUserTeam(user.id));
        }
    }, [isAuthenticated, user, dispatch]);

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

                    <div className="relative w-full">
                        {/* Left Arrow */}
                        <button
                            className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-transparent text-white hover:text-yellow-400 p-2"
                            onClick={() => {
                                document.getElementById('carousel').scrollBy({ left: -300, behavior: 'smooth' })
                            }}
                        >
                            <FaChevronLeft size={24} />
                        </button>

                        {/* Scrollable Carousel */}
                        <div
                            id="carousel"
                            className="flex gap-8 overflow-x-auto scroll-smooth px-8 py-8 snap-x snap-mandatory hide-scrollbar">
                            {warriors?.length ? (
                                warriors.map(warrior => (
                                    <div
                                        key={warrior.id}
                                        className={`snap-start rounded-4xl transition duration-300 transform 
                                            ${warrior.id === selectedCharacter?.id
                                                ? 'scale-110 -translate-y-4 opacity-100'
                                                : 'hover:shadow-md opacity-50'}`
                                        }>
                                        <ProfileCharacterCard
                                            fighter={warrior}
                                            onClick={() => setSelectedCharacter(warrior)} />
                                    </div>
                                ))
                            ) : (
                                <div className="col-span-full text-center text-yellow-400 text-lg font-semibold">
                                    No characters found matching your search.
                                </div>
                            )}
                        </div>

                        {/* Right Arrow */}
                        <button
                            className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-transparent text-white hover:text-yellow-400 p-2"
                            onClick={() => {
                                document.getElementById('carousel').scrollBy({ left: 300, behavior: 'smooth' })
                            }}
                        >
                            <FaChevronRight size={24} />
                        </button>
                    </div>
                </div>
            </div>

            <MarqueeSeparator />
            <AnimatePresence mode="wait">
                <motion.div
                    key={selectedCharacter?.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                >
                    <CharacterDetail fighter={selectedCharacter} />
                </motion.div>
            </AnimatePresence>
            
            {/* Team Preview */}
            <TeamPreview />
        </div>
    )
}
