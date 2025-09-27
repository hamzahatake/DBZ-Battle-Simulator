import SearchFilterPanel from "../character/SearchFilterPanel";
import FullBodyCharacterCard from "../character/FullBodyCharacterCard";
import TeamPreview from "../team/TeamPreview";
import { useGetCharactersQuery } from "../../features/characters/charactersSlice";
import { useState, useEffect } from "react";
import { useDebounce } from "../../hooks/deBounce";
import { UIIcon } from "../common/ImageComponent";
import { useSelector, useDispatch } from "react-redux";
import { loadUserTeam } from "../../features/teams/teamsSlice";

export default function CharacterList() {
    const dispatch = useDispatch();
    const { user, isAuthenticated } = useSelector(state => state.auth);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedSaga, setSelectedSaga] = useState("");
    const [selectedRole, setSelectedRole] = useState("");
    const [selectedLevel, setSelectedLevel] = useState("");

    const debouncedSearch = useDebounce(searchQuery, 300)
    const { data: warriors, isLoading, error } = useGetCharactersQuery({ name: debouncedSearch })

    // Load user's team when they're authenticated
    useEffect(() => {
        if (isAuthenticated && user) {
            dispatch(loadUserTeam(user.id));
        }
    }, [isAuthenticated, user, dispatch]);

    const filteredWarriors = warriors?.filter(warrior => {
        const matchesName = warrior.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesSaga = selectedSaga === "" || warrior.saga.toLowerCase() === selectedSaga.toLowerCase();
        const matchesRole = selectedRole === "" || warrior.role.toLowerCase() === selectedRole.toLowerCase();
        const matchesLevel =
            selectedLevel === "" ||
            (selectedLevel === "under 25" && warrior.level <= 25) ||
            (selectedLevel === "26 - 50" && warrior.level > 25 && warrior.level <= 50) ||
            (selectedLevel === "50+" && warrior.level > 50);

        return matchesName && matchesSaga && matchesRole && matchesLevel;
    });

    return (
        <div className="min-h-screen bg-gray-900 text-white">
            {/* Hero Background Section */}
            <div className="relative w-full h-[40vh] flex items-center justify-center px-4 overflow-hidden">
                {/* Background Image */}
                <UIIcon
                    iconName="search"
                    alt="Background"
                    className="absolute inset-0 w-full h-full object-cover object-center"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/50" />
            </div>

            {/* Search Filters */}
            <div className="mt-[-3rem] z-30 relative">
                <SearchFilterPanel searchQuery={searchQuery} setSearchQuery={setSearchQuery}
                    selectedSaga={selectedSaga} setSelectedSaga={setSelectedSaga}
                    selectedRole={selectedRole} setSelectedRole={setSelectedRole}
                    selectedLevel={selectedLevel} setSelectedLevel={setSelectedLevel} />
            </div>

            {isLoading && <p>It's Loading</p>}
            {error && <p>Their's an error</p>}

            {/* Character Grid */}
            <div className="max-w-7xl mx-auto px-4 py-12">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredWarriors?.length >= 1 ?
                        (filteredWarriors.map(warrior => (
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
            
            {/* Team Preview */}
            <TeamPreview />
        </div>
    );
}