import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom';

const TeamSlot = ({ character, onRemove }) => {
    return (
        <motion.div
            className={`relative w-72 h-[500px] rounded-3xl shadow-2xl border-2 
        transition-all duration-300 ease-in-out cursor-pointer 
        flex items-center justify-center group
        ${character
                    ? 'border-transparent bg-gradient-to-br from-[#1f1f1f] to-[#2a2a2a] shadow-lg hover:shadow-2xl'
                    : 'border-dashed border-gray-600 hover:border-white bg-[#0c0c0c]'
                }`}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => character && onRemove(character.id)}
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
                    <img
                        src={character.image_full_body || '/placeholder.png'}
                        alt={character.name}
                        className="h-full w-auto object-contain transition-transform duration-200 group-hover:scale-105"
                    />

                    {/* Info Glass Panel */}
                    <div className="absolute bottom-0 left-0 right-0 backdrop-blur-md bg-black/40 px-4 py-3 text-white rounded-b-3xl">
                        <div className="text-lg font-bold leading-snug text-white truncate">
                            {character.name}
                            <span className="text-sm text-gray-300 tracking-wide italic truncate">
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
                        onClick={() => onRemove()}
                        className="absolute top-2 right-2 text-xs text-red-500 bg-red-500/10 px-2 py-1 
        rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer">
                        Remove
                    </button>
                </>
            )}
        </motion.div>
    )
}

export default TeamSlot
