import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { motion, AnimatePresence } from 'framer-motion'
import { FaTimes, FaSave, FaEdit, FaTrash } from 'react-icons/fa'
import { 
  createTeam, 
  updateTeam, 
  deleteTeam, 
  selectIsEditingTeam, 
  selectEditingTeamId,
  selectCurrentTeamBeingEdited,
  selectCurrentTeamCharacters,
  selectTeamSize,
  clearError
} from '../../features/teams/teamsSlice'

const TeamSaveModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch()
  const isEditing = useSelector(selectIsEditingTeam)
  const editingTeamId = useSelector(selectEditingTeamId)
  const editingTeam = useSelector(selectCurrentTeamBeingEdited)
  const currentTeamCharacters = useSelector(selectCurrentTeamCharacters)
  const teamSize = useSelector(selectTeamSize)
  const error = useSelector((state) => state.teams.error)
  
  const [teamName, setTeamName] = useState('')
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  // Initialize team name when editing
  useEffect(() => {
    if (isEditing && editingTeam) {
      setTeamName(editingTeam.name)
    } else {
      setTeamName('')
    }
  }, [isEditing, editingTeam])

  // Clear error when modal opens
  useEffect(() => {
    if (isOpen) {
      dispatch(clearError())
    }
  }, [isOpen, dispatch])

  const handleSave = () => {
    if (!teamName.trim()) {
      return
    }

    if (teamSize === 0) {
      return
    }

    const members = currentTeamCharacters.map(char => char.id)

    if (isEditing && editingTeamId) {
      dispatch(updateTeam({
        id: editingTeamId,
        name: teamName.trim(),
        members
      }))
    } else {
      dispatch(createTeam({
        name: teamName.trim(),
        members
      }))
    }

    onClose()
  }

  const handleDelete = () => {
    if (editingTeamId) {
      dispatch(deleteTeam(editingTeamId))
      onClose()
    }
  }

  const handleClose = () => {
    setTeamName('')
    setShowDeleteConfirm(false)
    dispatch(clearError())
    onClose()
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={handleClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 w-full max-w-md border border-white/20"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">
              {isEditing ? 'Edit Team' : 'Save Team'}
            </h2>
            <button
              onClick={handleClose}
              className="text-white/70 hover:text-white transition-colors"
            >
              <FaTimes className="text-xl" />
            </button>
          </div>

          {/* Team Name Input */}
          <div className="mb-6">
            <label className="block text-white/80 text-sm font-medium mb-2">
              Team Name
            </label>
            <input
              type="text"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              placeholder="Enter team name..."
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400"
              maxLength={50}
            />
          </div>

          {/* Team Preview */}
          <div className="mb-6">
            <label className="block text-white/80 text-sm font-medium mb-2">
              Team Members ({teamSize}/5)
            </label>
            <div className="bg-gray-700 rounded-lg p-4 min-h-[100px]">
              {currentTeamCharacters.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {currentTeamCharacters.map((character) => (
                    <div
                      key={character.id}
                      className="flex items-center gap-2 bg-gray-600 rounded-lg px-3 py-2 text-sm"
                    >
                      <img
                        src={character.profile_image_url ? `http://localhost:8000${character.profile_image_url}` : '/placeholder.png'}
                        alt={character.name}
                        className="w-6 h-6 rounded-full object-cover"
                      />
                      <span className="text-white">{character.name}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-400 text-center py-4">
                  No characters selected
                </p>
              )}
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg">
              <p className="text-red-300 text-sm">{error}</p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3">
            {isEditing && (
              <button
                onClick={() => setShowDeleteConfirm(true)}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors font-medium"
              >
                <FaTrash />
                Delete
              </button>
            )}
            
            <button
              onClick={handleSave}
              disabled={!teamName.trim() || teamSize === 0}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-white rounded-lg transition-all font-medium"
            >
              {isEditing ? <FaEdit /> : <FaSave />}
              {isEditing ? 'Update Team' : 'Save Team'}
            </button>
          </div>
        </motion.div>

        {/* Delete Confirmation Modal */}
        <AnimatePresence>
          {showDeleteConfirm && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-60 flex items-center justify-center p-4"
              onClick={() => setShowDeleteConfirm(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 w-full max-w-sm border border-red-500/50"
                onClick={(e) => e.stopPropagation()}
              >
                <h3 className="text-xl font-bold text-white mb-4">Delete Team</h3>
                <p className="text-white/80 mb-6">
                  Are you sure you want to delete "{editingTeam?.name}"? This action cannot be undone.
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowDeleteConfirm(false)}
                    className="flex-1 px-4 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDelete}
                    className="flex-1 px-4 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors font-medium"
                  >
                    Delete
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  )
}

export default TeamSaveModal
