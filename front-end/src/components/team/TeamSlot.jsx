import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { removeCharacterFromTeam } from '../../features/team/teamSlice';

const TeamSlot = ({ character }) => {
    const dispatch = useDispatch();
    return (
        <motion.div
            className={`relative w-72 h-[500px] rounded-3xl shadow-2xl border-2 
      transition-all duration-300 ease-in-out 
      flex items-center justify-center group
      ${character
                    ? 'border-transparent bg-gradient-to-br from-gray-800 via-blue-800 to-indigo-500 shadow-lg hover:shadow-2xl'
                    : 'border-dashed border-gray-600 hover:border-white bg-[#0c0c0c]'}
    `}
            whileHover={character ? { scale: 1.03 } : {}}
            whileTap={character ? { scale: 0.98 } : {}}
        >
            {/* Empty Slot */}
            {!character && (
                <Link to="/characters" className="text-gray-400 text-sm font-medium tracking-wide">
                    Select Your Character
                </Link>
            )}

            {/* Filled Slot */}
            {character && (
                <>
                    {/* Image */}
                    <div className="h-[70%] flex items-center justify-center">
                        <img
                            src={character.image_full_body}
                            alt={character.name}
                            className="h-full object-contain" />
                    </div>
                    {/* Info Glass Panel */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gray-900 px-4 py-3 text-white rounded-b-3xl">
                        <div className="text-lg font-bold leading-snug text-white truncate">
                            {character.name}
                            <span className="text-xs text-gray-300 ml-1 tracking-wide italic truncate">
                                {character.form}
                            </span>
                        </div>

                        <div className="flex justify-between mt-2 text-[11px] font-medium">
                            <div className="flex items-center gap-1 bg-[#1e1e1e]/60 px-2 py-1 rounded-full">
                                <span>⚔️</span>
                                <span>{character.attack_level}</span>
                            </div>
                            <div className="flex items-center gap-1 bg-[#1e1e1e]/60 px-2 py-1 rounded-full">
                                <span>🛡️</span>
                                <span>{character.defense_level}</span>
                            </div>
                            <div className="flex items-center gap-1 bg-[#1e1e1e]/60 px-2 py-1 rounded-full">
                                <span>💨</span>
                                <span>{character.speed_level}</span>
                            </div>
                        </div>
                    </div>

                    {/* Remove Hint */}
                    <button
                        onClick={(e) => {
                            dispatch(removeCharacterFromTeam(character));
                        }}
                        className="absolute top-2 right-2 text-xs text-red-300 bg-red-900 px-2 py-1 
                        rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-400 cursor-pointer">
                        Remove
                    </button>
                </>
            )}
        </motion.div>
    )
}

export default TeamSlot
