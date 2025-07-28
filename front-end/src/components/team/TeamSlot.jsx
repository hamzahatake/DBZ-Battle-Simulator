import React from 'react'
import { motion } from 'framer-motion'

const TeamSlot = ({ character, onRemove }) => {
    return (
        <motion.div
            className={`w-full h-52 rounded-2xl overflow-hidden border-2 
        transition-all duration-300 ease-in-out cursor-pointer 
        flex items-center justify-center relative group
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
                <span className="text-gray-400 text-sm font-medium tracking-wide">
                    Drop Character Here
                </span>
            )}

            {/* Filled Slot */}
            {character && (
                <>
                    <img
                        src={character.image || '/placeholder.png'}
                        alt={character.name}
                        className="h-full w-auto object-contain transition-transform duration-200 group-hover:scale-105"
                    />

                    {/* Overlay Info Panel */}
                    <div className="absolute bottom-0 left-0 right-0 bg-black/70 px-3 py-2 text-xs text-white">
                        <div className="font-semibold text-sm truncate">{character.name}</div>
                        <div className="flex gap-2 text-[10px] opacity-80 mt-1">
                            <span>⚔️ {character.attack}</span>
                            <span>🛡️ {character.defense}</span>
                            <span>💨 {character.speed}</span>
                        </div>
                    </div>

                    {/* Remove Hint */}
                    <div className="absolute top-2 right-2 text-red-400 text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        Click to remove
                    </div>
                </>
            )}
        </motion.div>
    )
}

export default TeamSlot
