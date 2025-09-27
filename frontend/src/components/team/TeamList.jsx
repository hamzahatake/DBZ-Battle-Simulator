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

const TeamList = ({ onEditTeam }) => {
  const dispatch = useDispatch()
  const teams = useSelector(selectAllTeamsWithCharacters)
  const isEditing = useSelector(selectIsEditingTeam)

  const handleEditTeam = (teamId) => {
    dispatch(loadTeamForEdit(teamId))
    if (onEditTeam) {
      onEditTeam()
    }
  }

  const handleDeleteTeam = (teamId, teamName) => {
    if (window.confirm(`Are you sure you want to delete "${teamName}"? This action cannot be undone.`)) {
      dispatch(deleteTeam(teamId))
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  if (teams.length === 0) {
    return (
      <div className="text-center py-12">
        <FaUsers className="text-6xl text-gray-600 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-400 mb-2">No Teams Yet</h3>
        <p className="text-gray-500">
          Create your first team by selecting characters and clicking "Save Team"
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {teams.map((team, index) => (
        <motion.div
          key={team.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300 group"
        >
          {/* Team Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h3 className="text-xl font-bold text-white mb-1 group-hover:text-yellow-400 transition-colors">
                {team.name}
              </h3>
              <div className="flex items-center gap-4 text-sm text-gray-400">
                <div className="flex items-center gap-1">
                  <FaUsers className="text-xs" />
                  <span>{team.members.length}/5</span>
                </div>
                <div className="flex items-center gap-1">
                  <FaCalendarAlt className="text-xs" />
                  <span>{formatDate(team.created_at)}</span>
                </div>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={() => handleEditTeam(team.id)}
                disabled={isEditing}
                className="p-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
                title="Edit Team"
              >
                <FaEdit className="text-sm" />
              </button>
              <button
                onClick={() => handleDeleteTeam(team.id, team.name)}
                className="p-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                title="Delete Team"
              >
                <FaTrash className="text-sm" />
              </button>
            </div>
          </div>

          {/* Team Members */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-white/80">Team Members</h4>
            {team.characters && team.characters.length > 0 ? (
              <div className="space-y-2">
                {team.characters.map((character) => (
                  <div
                    key={character.id}
                    className="flex items-center gap-3 p-2 bg-gray-700/50 rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    <img
                      src={getImageUrl(character.profile_image_url)}
                      alt={character.name}
                      className="w-10 h-10 rounded-full object-cover border-2 border-gray-600"
                      onError={(e) => {
                        e.target.src = '/placeholder.png'
                      }}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-white font-medium truncate">
                        {character.name}
                      </p>
                      <p className="text-gray-400 text-sm truncate">
                        {character.form}
                      </p>
                    </div>
                    <div className="flex gap-2 text-xs">
                      <span className="bg-red-500/20 text-red-300 px-2 py-1 rounded">
                        ⚔️ {character.attack_level}
                      </span>
                      <span className="bg-blue-500/20 text-blue-300 px-2 py-1 rounded">
                        🛡️ {character.defense_level}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-sm italic">
                No character data available
              </p>
            )}
          </div>

          {/* Team Stats Summary */}
          {team.characters && team.characters.length > 0 && (
            <div className="mt-4 pt-4 border-t border-gray-700">
              <div className="flex justify-between text-sm">
                <div className="text-center">
                  <p className="text-gray-400">Total Attack</p>
                  <p className="text-red-400 font-bold">
                    {team.characters.reduce((sum, char) => sum + (char.attack_level || 0), 0)}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-gray-400">Total Defense</p>
                  <p className="text-blue-400 font-bold">
                    {team.characters.reduce((sum, char) => sum + (char.defense_level || 0), 0)}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-gray-400">Total Speed</p>
                  <p className="text-yellow-400 font-bold">
                    {team.characters.reduce((sum, char) => sum + (char.speed_level || 0), 0)}
                  </p>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      ))}
    </div>
  )
}

export default TeamList
