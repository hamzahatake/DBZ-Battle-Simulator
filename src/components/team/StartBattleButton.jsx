import React from 'react'
import { motion } from 'framer-motion'

const StartBattleButton = ({ onClick, disabled }) => {
    return (
        <motion.button
            whileHover={!disabled ? { scale: 1.05 } : {}}
            whileTap={!disabled ? { scale: 0.95 } : {}}
            onClick={onClick}
            disabled={disabled}
            className={`
        px-6 py-3 rounded-xl font-bold tracking-wide text-white
        transition-all duration-300 text-lg relative
        ${disabled
                    ? 'bg-gray-600 cursor-not-allowed opacity-60'
                    : 'bg-gradient-to-r from-red-500 via-pink-500 to-purple-600 shadow-md hover:shadow-xl'
                }
      `}
        >
            {/* Button Label */}
            Start Battle

            {/* Pulse Aura Animation (if enabled) */}
            {!disabled && (
                <span
                    className="absolute inset-0 rounded-xl blur-md opacity-40 animate-pulse bg-gradient-to-r from-red-500 via-pink-500 to-purple-600 z-[-1]"
                ></span>
            )}
        </motion.button>
    )
}

export default StartBattleButton
