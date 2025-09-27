import { useSelector, useDispatch } from "react-redux"
import { motion } from "framer-motion"
import { FaCheck, FaPlus, FaTimes } from "react-icons/fa"
import { addCharacterToTeam, removeCharacterFromTeam, selectIsCharacterSelected, selectCanAddCharacter, selectIsTeamFull } from "../../features/teams/teamsSlice"
import { CharacterImage, UIIcon } from "../common/ImageComponent"

export default function FullBodyCharacterCard({ warrior }) {
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.auth);
    const isSelected = useSelector(selectIsCharacterSelected(warrior.id));
    const canAdd = useSelector(selectCanAddCharacter(warrior.id));
    const isTeamFull = useSelector(selectIsTeamFull);

    const handleCharacterToggle = () => {
        if (!user) return; // Don't allow selection if not logged in
        
        if (isSelected) {
            dispatch(removeCharacterFromTeam({ characterId: warrior.id, userId: user.id }));
        } else if (canAdd) {
            dispatch(addCharacterToTeam({ characterId: warrior.id, userId: user.id }));
        }
    };

    return (
        <motion.div 
            className="p-3"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
        >
            <motion.div 
                className={`relative w-72 h-[500px] rounded-3xl shadow-2xl
                    bg-gradient-to-br from-gray-800 via-blue-800 to-indigo-500
                    group transform transition-all duration-300 hover:scale-105 cursor-pointer
                    ${isSelected ? 'ring-4 ring-yellow-400 ring-opacity-75 shadow-yellow-400/50' : ''}
                    ${!canAdd && !isSelected ? 'opacity-60 grayscale' : ''}`}
                animate={{
                    scale: isSelected ? 1.05 : 1,
                    boxShadow: isSelected ? '0 0 30px rgba(255, 255, 0, 0.3)' : '0 10px 25px rgba(0, 0, 0, 0.3)'
                }}
                transition={{ duration: 0.3 }}
            >
                {/* Selection Button */}
                <motion.button
                    onClick={handleCharacterToggle}
                    disabled={!canAdd && !isSelected}
                    className={`absolute top-3 right-3 z-10 w-10 h-10 rounded-full font-bold text-lg flex items-center justify-center shadow-lg transition-all duration-300
                        ${isSelected 
                            ? 'bg-green-500 text-white hover:bg-green-600' 
                            : canAdd 
                                ? 'bg-yellow-400 text-gray-900 hover:bg-yellow-500 hover:scale-110' 
                                : 'bg-gray-500 text-gray-300 cursor-not-allowed'
                        }`}
                    whileHover={canAdd || isSelected ? { scale: 1.1 } : {}}
                    whileTap={canAdd || isSelected ? { scale: 0.95 } : {}}
                >
                    {isSelected ? <FaCheck /> : <FaPlus />}
                </motion.button>

                {/* Selection Overlay */}
                {isSelected && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="absolute inset-0 bg-green-500/20 rounded-3xl border-2 border-green-400"
                    />
                )}

                {/* Team Full Overlay */}
                {isTeamFull && !isSelected && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="absolute inset-0 bg-black/50 rounded-3xl flex items-center justify-center"
                    >
                        <div className="text-center text-white">
                            <FaTimes className="text-4xl mx-auto mb-2 text-red-400" />
                            <p className="text-sm font-bold">Team Full</p>
                        </div>
                    </motion.div>
                )}

                {/* Image */}
                <div className="h-[70%] flex items-center justify-center">
                    <CharacterImage
                        character={warrior}
                        type="full_body"
                        alt={warrior.name}
                        className="h-full object-contain transition-transform duration-500 group-hover:scale-110" />
                </div>

                {/* Content */}
                <div className="flex justify-between items-start p-4 bg-gray-900 h-[30%] text-white">
                    {/* Left: Character Info */}
                    <div className="flex flex-col gap-1 overflow-hidden w-[60%]">
                        <p className="text-yellow-300 text-xs font-semibold uppercase tracking-wide truncate">
                            Level {warrior?.level}
                        </p>
                        <h2 className="text-lg font-bold leading-snug text-white truncate">
                            {warrior.name}
                            <span className="text-sm font-light text-yellow-100 ml-1">{warrior.race}</span>
                        </h2>
                        <p className="text-sm text-gray-300 tracking-wide italic truncate">{warrior.form}</p>
                    </div>

                    {/* Right: Stats */}
                    <div className="flex flex-col gap-1 items-center text-sm text-blue-100 w-[40%]">
                        <div className="flex flex-col items-center">
                            <UIIcon iconName="attack" alt="Attack" className="w-6 h-6 mb-1" />
                            <p>{warrior.attack_level}</p>
                        </div>
                        <div className="flex flex-col items-center">
                            <UIIcon iconName="defense" alt="Defense" className="w-6 h-6 mb-1" />
                            <p>{warrior.defense_level}</p>
                        </div>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}