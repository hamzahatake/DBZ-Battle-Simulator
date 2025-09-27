import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { motion, AnimatePresence } from 'framer-motion'
import { FaTimes, FaUsers, FaChevronDown, FaChevronUp } from 'react-icons/fa'
import { removeCharacterFromTeam, selectCurrentTeamCharacters, selectTeamSize, selectIsTeamFull, selectIsTeamPreviewMinimized, toggleTeamPreviewMinimize } from '../../features/teams/teamsSlice'
import { getImageUrl } from '../../services/api'

export default function TeamPreview() {
    const dispatch = useDispatch()
    const selectedCharacters = useSelector(selectCurrentTeamCharacters)
    const teamSize = useSelector(selectTeamSize)
    const isTeamFull = useSelector(selectIsTeamFull)
    const user = useSelector((state) => state.auth.user)
    const isMinimized = useSelector(selectIsTeamPreviewMinimized)

    // Debug logging
    console.log('TeamPreview - selectedCharacters:', selectedCharacters);
    console.log('TeamPreview - teamSize:', teamSize);

    const handleRemoveCharacter = (characterId) => {
        if (user?.id) {
            dispatch(removeCharacterFromTeam({ characterId, userId: user.id }))
        }
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50"
        >
            <div className="bg-gradient-to-r from-blue-900/90 to-purple-900/90 backdrop-blur-md rounded-2xl p-4 shadow-2xl border border-white/20">
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                        <FaUsers className="text-yellow-400 text-xl" />
                        <h3 className="text-white font-bold text-lg">Your Team</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-bold ${isTeamFull ? 'bg-green-500/20 text-green-300' : 'bg-yellow-500/20 text-yellow-300'
                            }`}>
                            {teamSize}/5
                        </span>
                    </div>

                    {/* Minimize Button */}
                    <motion.button
                        onClick={() => dispatch(toggleTeamPreviewMinimize())}
                        className="text-white/70 hover:text-white transition-colors duration-200 p-1 rounded-full hover:bg-white/10"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        {isMinimized ? <FaChevronUp /> : <FaChevronDown />}
                    </motion.button>
                </div>

                {/* Collapsible Content */}
                <AnimatePresence>
                    {!isMinimized && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                        >
                            {/* Team Members */}
                            <div className="flex gap-3">
                                <AnimatePresence>
                                    {selectedCharacters.map((character, index) => (
                                        <motion.div
                                            key={character.id}
                                            initial={{ opacity: 0, scale: 0.8, x: -20 }}
                                            animate={{ opacity: 1, scale: 1, x: 0 }}
                                            exit={{ opacity: 0, scale: 0.8, x: 20 }}
                                            transition={{
                                                duration: 0.3,
                                                delay: index * 0.1
                                            }}
                                            className="relative group"
                                        >
                                            {/* Character Card */}
                                            <div className="relative w-16 h-20 bg-gradient-to-br from-gray-700 to-gray-900 rounded-lg overflow-hidden shadow-lg">
                                                {/* Character Image */}
                                                <img
                                                    src={getImageUrl(character.profile_image_url)}
                                                    alt={character.name}
                                                    className="w-full h-full object-cover"
                                                    onError={(e) => {
                                                        console.log('Profile image failed to load:', character.profile_image_url);
                                                        e.target.src = '/placeholder.png'; // Fallback image
                                                    }}
                                                />

                                                {/* Remove Button */}
                                                <motion.button
                                                    onClick={() => handleRemoveCharacter(character.id)}
                                                    className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-600"
                                                    whileHover={{ scale: 1.1 }}
                                                    whileTap={{ scale: 0.9 }}
                                                >
                                                    <FaTimes />
                                                </motion.button>

                                                {/* Character Name */}
                                                <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white text-xs p-1 text-center truncate">
                                                    {character.name}
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>

                                {/* Empty Slots */}
                                {Array.from({ length: 5 - teamSize }).map((_, index) => (
                                    <motion.div
                                        key={`empty-${index}`}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="w-16 h-20 bg-gray-800/50 border-2 border-dashed border-gray-600 rounded-lg flex items-center justify-center"
                                    >
                                        <div className="text-gray-500 text-xs text-center">
                                            <div className="w-8 h-8 border border-gray-500 rounded-full flex items-center justify-center mb-1">
                                                <span className="text-gray-500">?</span>
                                            </div>
                                            <span>Empty</span>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Team Status */}
                            <div className="mt-3 text-center">
                                {teamSize === 0 ? (
                                    <p className="text-gray-400 text-sm">No characters selected yet</p>
                                ) : isTeamFull ? (
                                    <motion.p
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="text-green-400 text-sm font-bold"
                                    >
                                        ✓ Team Complete! Ready for battle!
                                    </motion.p>
                                ) : (
                                    <p className="text-yellow-400 text-sm">
                                        Select {5 - teamSize} more character{5 - teamSize !== 1 ? 's' : ''}
                                    </p>
                                )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    )
}
