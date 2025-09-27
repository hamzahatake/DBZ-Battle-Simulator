import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { motion } from 'framer-motion'
import { FaEdit, FaTrash, FaUsers, FaCalendarAlt } from 'react-icons/fa'
import { 
  selectAllTeamsWithCharacters, 
  loadTeamForEdit, 
  deleteTeam,
  selectIsEditingTeam 
} from '../../features/teams/teamsSlice'
import { getImageUrl } from '../../services/api'

const SavedTeamsSidebar = () => {
  const dispatch = useDispatch()
  const teams = useSelector(selectAllTeamsWithCharacters) || []
  const isEditing = useSelector(selectIsEditingTeam)

  const handleEditTeam = (teamId) => {
    dispatch(loadTeamForEdit(teamId))
  }

  const handleDeleteTeam = (teamId, teamName) => {
    if (window.confirm(`Are you sure you want to delete "${teamName}"? This action cannot be undone.`)) {
      dispatch(deleteTeam(teamId))
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    })
  }

  if (teams.length === 0) {
    return (
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border border-white/10">
        <div className="text-center">
          <FaUsers className="text-4xl text-gray-600 mx-auto mb-3" />
          <h3 className="text-lg font-semibold text-gray-400 mb-2">No Saved Teams</h3>
          <p className="text-gray-500 text-sm">
            Create your first team by selecting characters and clicking "Save Team"
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border border-white/10">
      <div className="flex items-center gap-2 mb-4">
        <FaUsers className="text-yellow-400 text-lg" />
        <h3 className="text-xl font-bold text-white">Saved Teams</h3>
        <span className="bg-yellow-500/20 text-yellow-300 px-2 py-1 rounded-full text-xs font-bold">
          {teams.length}
        </span>
      </div>

      <div className="space-y-3 max-h-96 overflow-y-auto">
        {teams.map((team, index) => (
          <motion.div
            key={team.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-gray-700/50 rounded-lg p-4 hover:bg-gray-700 transition-colors group"
          >
            {/* Team Header */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1 min-w-0">
                <h4 className="text-white font-medium truncate group-hover:text-yellow-400 transition-colors">
                  {team.name || 'Unnamed Team'}
                </h4>
                <div className="flex items-center gap-3 text-xs text-gray-400 mt-1">
                  <div className="flex items-center gap-1">
                    <FaUsers className="text-xs" />
                    <span>{(team.members || []).length}/5</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <FaCalendarAlt className="text-xs" />
                    <span>{team.created_at ? formatDate(team.created_at) : 'Unknown'}</span>
                  </div>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => handleEditTeam(team.id)}
                  disabled={isEditing}
                  className="p-1.5 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded transition-colors"
                  title="Edit Team"
                >
                  <FaEdit className="text-xs" />
                </button>
                <button
                  onClick={() => handleDeleteTeam(team.id, team.name)}
                  className="p-1.5 bg-red-600 hover:bg-red-700 text-white rounded transition-colors"
                  title="Delete Team"
                >
                  <FaTrash className="text-xs" />
                </button>
              </div>
            </div>

            {/* Team Members Preview */}
            <div className="space-y-2">
              {team.characters && Array.isArray(team.characters) && team.characters.length > 0 ? (
                <div className="flex flex-wrap gap-1">
                  {team.characters.slice(0, 3).map((character) => (
                    <div
                      key={character?.id || Math.random()}
                      className="flex items-center gap-1 bg-gray-600/50 rounded px-2 py-1 text-xs"
                    >
                      <img
                        src={getImageUrl(character?.profile_image_url)}
                        alt={character?.name || 'Character'}
                        className="w-4 h-4 rounded-full object-cover"
                        onError={(e) => {
                          e.target.src = '/placeholder.png'
                        }}
                      />
                      <span className="text-white truncate max-w-16">
                        {character?.name || 'Unknown'}
                      </span>
                    </div>
                  ))}
                  {team.characters.length > 3 && (
                    <div className="flex items-center justify-center bg-gray-600/50 rounded px-2 py-1 text-xs text-gray-300">
                      +{team.characters.length - 3}
                    </div>
                  )}
                </div>
              ) : (
                <p className="text-gray-500 text-xs italic">
                  No character data available
                </p>
              )}
            </div>

            {/* Quick Stats */}
            {team.characters && Array.isArray(team.characters) && team.characters.length > 0 && (
              <div className="mt-3 pt-3 border-t border-gray-600">
                <div className="flex justify-between text-xs">
                  <div className="text-center">
                    <p className="text-gray-400">ATK</p>
                    <p className="text-red-400 font-bold">
                      {team.characters.reduce((sum, char) => sum + (char?.attack_level || 0), 0)}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-gray-400">DEF</p>
                    <p className="text-blue-400 font-bold">
                      {team.characters.reduce((sum, char) => sum + (char?.defense_level || 0), 0)}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-gray-400">SPD</p>
                    <p className="text-yellow-400 font-bold">
                      {team.characters.reduce((sum, char) => sum + (char?.speed_level || 0), 0)}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </div>

    </div>
  )
}

export default SavedTeamsSidebar
