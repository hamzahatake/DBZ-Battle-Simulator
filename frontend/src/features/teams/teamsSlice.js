import { createSlice, createEntityAdapter, nanoid } from '@reduxjs/toolkit'

// Create entity adapter for teams
const teamsAdapter = createEntityAdapter({
  selectId: (team) => team.id,
  sortComparer: (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime() // Newest first
})

const initialState = teamsAdapter.getInitialState({
  // Current team being built/edited (temporary state)
  currentTeam: [], // Array of selected character IDs (max 5)
  currentTeamId: null, // ID of team being edited (null for new team)
  
  // User-specific teams (for future multi-user support)
  userTeams: {}, // Object to store teams per user: { userId: [teamIds] }
  
  // UI state
  isLoading: false,
  error: null,
  maxTeamSize: 5,
  isTeamPreviewMinimized: false,
  
  // Team management state
  isEditing: false,
  editingTeamId: null
})

const teamsSlice = createSlice({
  name: 'teams',
  initialState,
  reducers: {
    // Add character to current team (user-specific)
    addCharacterToTeam: (state, action) => {
      const { characterId, userId } = action.payload
      
      if (!userId || (typeof userId !== 'number' && typeof userId !== 'string')) return // Don't add if no user ID
      
      // Ensure userTeams exists
      if (!state.userTeams) {
        state.userTeams = {}
      }
      
      // Initialize user team if it doesn't exist
      if (!state.userTeams[userId]) {
        state.userTeams[userId] = []
      }
      
      const userTeam = state.userTeams[userId]
      
      // Check if team is full
      if (userTeam.length >= state.maxTeamSize) {
        return // Don't add if team is full
      }
      
      // Check if character is already selected
      if (userTeam.includes(characterId)) {
        return // Don't add if already selected
      }
      
      // Add character to user's team
      userTeam.push(characterId)
      
      // Update current team if this is the active user
      state.currentTeam = userTeam
    },
    
    // Remove character from current team (user-specific)
    removeCharacterFromTeam: (state, action) => {
      const { characterId, userId } = action.payload
      
      if (!userId || (typeof userId !== 'number' && typeof userId !== 'string')) return // Don't remove if no user ID
      
      // Ensure userTeams exists
      if (!state.userTeams) {
        state.userTeams = {}
      }
      
      if (state.userTeams[userId]) {
        state.userTeams[userId] = state.userTeams[userId].filter(id => id !== characterId)
        
        // Update current team if this is the active user
        state.currentTeam = state.userTeams[userId]
      }
    },
    
    // Reset current team selection (user-specific)
    resetCurrentTeam: (state, action) => {
      const userId = action.payload
      
      if (!userId || (typeof userId !== 'number' && typeof userId !== 'string')) return // Don't reset if no user ID
      
      // Ensure userTeams exists
      if (!state.userTeams) {
        state.userTeams = {}
      }
      
      if (state.userTeams[userId]) {
        state.userTeams[userId] = []
        state.currentTeam = []
      }
    },
    
    // Set entire current team (useful for loading from localStorage)
    setCurrentTeam: (state, action) => {
      const { team, userId } = action.payload
      
      if (!userId || (typeof userId !== 'number' && typeof userId !== 'string')) return // Don't set if no user ID
      
      // Ensure userTeams exists
      if (!state.userTeams) {
        state.userTeams = {}
      }
      
      if (Array.isArray(team) && team.length <= state.maxTeamSize) {
        state.userTeams[userId] = team
        state.currentTeam = team
      }
    },
    
    // Load user's team when they log in
    loadUserTeam: (state, action) => {
      const userId = action.payload
      
      // Safety check for userId
      if (!userId || (typeof userId !== 'number' && typeof userId !== 'string')) {
        state.currentTeam = []
        return
      }
      
      // Ensure userTeams exists
      if (!state.userTeams) {
        state.userTeams = {}
      }
      
      if (state.userTeams[userId]) {
        state.currentTeam = state.userTeams[userId]
      } else {
        state.currentTeam = []
      }
    },
    
    // Clear team data when user logs out
    clearUserTeam: (state) => {
      state.currentTeam = []
    },
    
    // Clear any errors
    clearError: (state) => {
      state.error = null
    },
    
    // Toggle TeamPreview minimize state
    toggleTeamPreviewMinimize: (state) => {
      state.isTeamPreviewMinimized = !state.isTeamPreviewMinimized
    },
    
    // Set TeamPreview minimize state
    setTeamPreviewMinimize: (state, action) => {
      state.isTeamPreviewMinimized = action.payload
    },
    
    // === TEAM MANAGEMENT CRUD OPERATIONS ===
    
    // Create a new team
    createTeam: (state, action) => {
      const { name, members, userId = 'default' } = action.payload
      
      if (!name || !members || members.length === 0) {
        state.error = 'Team name and at least one member are required'
        return
      }
      
      if (members.length > state.maxTeamSize) {
        state.error = `Team cannot have more than ${state.maxTeamSize} members`
        return
      }
      
      const newTeam = {
        id: nanoid(),
        name: name.trim(),
        members: [...members], // Copy array
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        userId: userId
      }
      
      teamsAdapter.addOne(state, newTeam)
      
      // Add team to user's teams
      if (!state.userTeams[userId]) {
        state.userTeams[userId] = []
      }
      state.userTeams[userId].push(newTeam.id)
      
      // Clear current team after saving
      state.currentTeam = []
      state.currentTeamId = null
      state.isEditing = false
      state.editingTeamId = null
      state.error = null
    },
    
    // Update an existing team
    updateTeam: (state, action) => {
      const { id, name, members } = action.payload
      
      if (!id) {
        state.error = 'Team ID is required for update'
        return
      }
      
      if (!name || !members || members.length === 0) {
        state.error = 'Team name and at least one member are required'
        return
      }
      
      if (members.length > state.maxTeamSize) {
        state.error = `Team cannot have more than ${state.maxTeamSize} members`
        return
      }
      
      const existingTeam = state.entities[id]
      if (!existingTeam) {
        state.error = 'Team not found'
        return
      }
      
      teamsAdapter.updateOne(state, {
        id,
        changes: {
          name: name.trim(),
          members: [...members],
          updated_at: new Date().toISOString()
        }
      })
      
      // Clear current team after updating
      state.currentTeam = []
      state.currentTeamId = null
      state.isEditing = false
      state.editingTeamId = null
      state.error = null
    },
    
    // Delete a team
    deleteTeam: (state, action) => {
      const teamId = action.payload
      
      if (!teamId) {
        state.error = 'Team ID is required for deletion'
        return
      }
      
      const team = state.entities[teamId]
      if (!team) {
        state.error = 'Team not found'
        return
      }
      
      // Remove from user's teams
      if (state.userTeams[team.userId]) {
        state.userTeams[team.userId] = state.userTeams[team.userId].filter(id => id !== teamId)
      }
      
      // Remove from entities
      teamsAdapter.removeOne(state, teamId)
      
      // Clear current team if it was the deleted team
      if (state.currentTeamId === teamId) {
        state.currentTeam = []
        state.currentTeamId = null
        state.isEditing = false
        state.editingTeamId = null
      }
      
      state.error = null
    },
    
    // Load a team for editing
    loadTeamForEdit: (state, action) => {
      const teamId = action.payload
      
      if (!teamId) {
        state.error = 'Team ID is required'
        return
      }
      
      const team = state.entities[teamId]
      if (!team) {
        state.error = 'Team not found'
        return
      }
      
      state.currentTeam = [...team.members]
      state.currentTeamId = teamId
      state.isEditing = true
      state.editingTeamId = teamId
      state.error = null
    },
    
    // Start creating a new team
    startNewTeam: (state) => {
      state.currentTeam = []
      state.currentTeamId = null
      state.isEditing = false
      state.editingTeamId = null
      state.error = null
    },
    
    // Cancel team editing
    cancelTeamEdit: (state) => {
      state.currentTeam = []
      state.currentTeamId = null
      state.isEditing = false
      state.editingTeamId = null
      state.error = null
    },
    
    // Set loading state
    setLoading: (state, action) => {
      state.isLoading = action.payload
    }
  },
  extraReducers: (builder) => {
    // Handle async actions here if needed in the future
  }
})

// Export actions
export const {
  addCharacterToTeam,
  removeCharacterFromTeam,
  resetCurrentTeam,
  setCurrentTeam,
  loadUserTeam,
  clearUserTeam,
  clearError,
  setLoading,
  toggleTeamPreviewMinimize,
  setTeamPreviewMinimize,
  // Team management actions
  createTeam,
  updateTeam,
  deleteTeam,
  loadTeamForEdit,
  startNewTeam,
  cancelTeamEdit
} = teamsSlice.actions

// Export selectors
export const {
  selectAll: selectAllTeams,
  selectById: selectTeamById,
  selectIds: selectTeamIds
} = teamsAdapter.getSelectors(state => state.teams)

// Custom selectors
export const selectCurrentTeam = (state) => state.teams.currentTeam || []
export const selectCurrentTeamCharacters = (state) => {
  const currentTeamIds = state.teams.currentTeam || []
  
  // Try to find characters data from any getCharacters query
  let characters = []
  const queries = state.charactersApi?.queries || {}
  
  // Look for any getCharacters query
  for (const [key, query] of Object.entries(queries)) {
    if (key.startsWith('getCharacters(') && query.data) {
      characters = query.data
      break
    }
  }
  
  // Debug logging
  console.log('selectCurrentTeamCharacters - currentTeamIds:', currentTeamIds);
  console.log('selectCurrentTeamCharacters - characters count:', characters.length);
  console.log('selectCurrentTeamCharacters - charactersApi queries:', Object.keys(queries));
  console.log('selectCurrentTeamCharacters - state.teams:', state.teams);
  console.log('selectCurrentTeamCharacters - state.charactersApi:', state.charactersApi);
  
  const filteredCharacters = characters.filter(char => currentTeamIds.includes(char.id))
  console.log('selectCurrentTeamCharacters - filteredCharacters:', filteredCharacters);
  
  return filteredCharacters
}
export const selectIsTeamFull = (state) => (state.teams.currentTeam || []).length >= state.teams.maxTeamSize
export const selectTeamSize = (state) => (state.teams.currentTeam || []).length
export const selectIsCharacterSelected = (characterId) => (state) => 
  (state.teams.currentTeam || []).includes(characterId)
export const selectCanAddCharacter = (characterId) => (state) => {
  const currentTeam = state.teams.currentTeam || []
  const isSelected = currentTeam.includes(characterId)
  const isTeamFull = currentTeam.length >= state.teams.maxTeamSize
  return !isSelected && !isTeamFull
}
export const selectIsTeamPreviewMinimized = (state) => state.teams.isTeamPreviewMinimized

// === TEAM MANAGEMENT SELECTORS ===

// Get all saved teams
export const selectAllSavedTeams = (state) => {
  const teams = selectAllTeams(state)
  if (!teams || !Array.isArray(teams)) {
    return []
  }
  return teams.filter(team => team.id !== 'current') // Filter out temporary teams
}

// Get teams for a specific user
export const selectUserTeams = (userId) => (state) => {
  const userTeamIds = state.teams.userTeams[userId] || []
  return userTeamIds.map(id => state.teams.entities[id]).filter(Boolean)
}

// Get current team being edited
export const selectCurrentTeamBeingEdited = (state) => {
  if (!state.teams.currentTeamId) return null
  return state.teams.entities[state.teams.currentTeamId]
}

// Check if currently editing a team
export const selectIsEditingTeam = (state) => state.teams.isEditing

// Get editing team ID
export const selectEditingTeamId = (state) => state.teams.editingTeamId

// Get team by ID with character details
export const selectTeamWithCharacters = (teamId) => (state) => {
  const team = state.teams.entities[teamId]
  if (!team) return null
  
  // Try to find characters data from any getCharacters query
  let characters = []
  const queries = state.charactersApi?.queries || {}
  
  for (const [key, query] of Object.entries(queries)) {
    if (key.startsWith('getCharacters(') && query.data) {
      characters = query.data
      break
    }
  }
  
  // Safety check for team.members
  if (!team.members || !Array.isArray(team.members)) {
    return {
      ...team,
      characters: []
    }
  }
  
  const teamCharacters = characters.filter(char => team.members.includes(char.id))
  
  return {
    ...team,
    characters: teamCharacters
  }
}

// Get all teams with character details
export const selectAllTeamsWithCharacters = (state) => {
  const teams = selectAllSavedTeams(state)
  if (!teams || !Array.isArray(teams)) {
    return []
  }
  return teams.map(team => selectTeamWithCharacters(team.id)(state)).filter(Boolean)
}

// Export reducer
export default teamsSlice.reducer
