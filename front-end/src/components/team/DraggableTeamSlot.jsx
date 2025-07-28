import React from 'react';
import { motion } from 'framer-motion';

const DraggableTeamSlot = ({ character, onRemove }) => {
    return (
        <motion.div
            drag
            dragElastic={0.15}
            dragSnapToOrigin
            dragTransition={{ bounceStiffness: 500, bounceDamping: 25 }}
            whileDrag={{
                scale: 1.03,
                boxShadow: '0 0 10px rgba(255,255,255,0.25)',
            }}
            whileHover={{ scale: 1.015 }}
            whileTap={{ scale: 0.97 }}
            className={`relative w-full h-52 rounded-2xl overflow-hidden border-2 cursor-grab 
                transition-transform duration-200 ease-out group select-none will-change-transform
                ${character
                    ? 'border-transparent bg-gradient-to-br from-[#1e1e1e] to-[#2b2b2b] shadow-sm'
                    : 'border-dashed border-gray-600 bg-[#0d0d0d]'
                }`}
            onClick={() => character && onRemove(character.id)}
        >
            {!character ? (
                <span className="text-gray-400 text-sm font-medium tracking-wide flex justify-center items-center h-full">
                    Drop Character Here
                </span>
            ) : (
                <>
                    <img
                        src={character.image || '/placeholder.png'}
                        alt={character.name}
                        loading="lazy"
                        className="h-full w-auto object-contain transition-transform duration-200 group-hover:scale-105 will-change-transform"
                    />

                    {/* Stats Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 bg-black/70 px-3 py-2 text-xs text-white">
                        <div className="font-semibold text-sm truncate">{character.name}</div>
                        <div className="flex gap-2 text-[10px] opacity-80 mt-1">
                            <span>⚔️ {character.attack}</span>
                            <span>🛡️ {character.defense}</span>
                            <span>💨 {character.speed}</span>
                        </div>
                    </div>

                    {/* Remove hint */}
                    <div className="absolute top-2 right-2 text-red-400 text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-150">
                        Click to remove
                    </div>
                </>
            )}
        </motion.div>
    );
};

export default React.memo(DraggableTeamSlot);
