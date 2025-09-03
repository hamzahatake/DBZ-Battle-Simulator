import React from 'react'
import { motion } from 'framer-motion'

const TeamSummary = ({ team }) => {
    if (!team || team.length === 0) {
        return (
            <motion.div
                className="w-full p-6 rounded-xl bg-black/20 border border-gray-700 text-center text-sm text-gray-400"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
            >
                No characters selected yet.
            </motion.div>
        )
    }

    const totalStats = team.reduce(
        (totals, char) => ({
            attack: totals.attack + char.attack,
            defense: totals.defense + char.defense,
            speed: totals.speed + char.speed,
        }),
        { attack: 0, defense: 0, speed: 0 }
    )

    return (
        <motion.div
            className="w-full p-6 rounded-2xl bg-gradient-to-br from-[#1c1c1c] to-[#292929] border border-[#3c3c3c] shadow-inner text-white"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4 }}
        >
            {/* Title */}
            <div className="text-lg font-bold tracking-wide mb-4 text-center uppercase text-white/90">
                Team Summary
            </div>

            {/* Stat Grid */}
            <div className="grid grid-cols-3 gap-4 text-center text-sm font-medium">
                <div className="flex flex-col items-center gap-1">
                    <span className="text-red-400 text-lg">⚔️</span>
                    <span>Attack</span>
                    <span className="text-white font-semibold text-base">{totalStats.attack}</span>
                </div>

                <div className="flex flex-col items-center gap-1">
                    <span className="text-blue-400 text-lg">🛡️</span>
                    <span>Defense</span>
                    <span className="text-white font-semibold text-base">{totalStats.defense}</span>
                </div>

                <div className="flex flex-col items-center gap-1">
                    <span className="text-yellow-300 text-lg">💨</span>
                    <span>Speed</span>
                    <span className="text-white font-semibold text-base">{totalStats.speed}</span>
                </div>
            </div>

            {/* Team Size Info */}
            <div className="mt-4 text-center text-xs text-gray-400">
                {team.length} / 5 characters selected
            </div>
        </motion.div>
    )
}

export default TeamSummary
