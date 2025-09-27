// localStorage persistence for teams
export const TEAMS_STORAGE_KEY = 'dbz-teams'

// Load teams from localStorage
export const loadTeamsFromStorage = () => {
  try {
    const stored = localStorage.getItem(TEAMS_STORAGE_KEY)
    if (stored) {
      const parsed = JSON.parse(stored)
      console.log('Loaded teams from localStorage:', parsed)
      return parsed
    }
  } catch (error) {
    console.error('Error loading teams from localStorage:', error)
  }
  return undefined
}

// Save teams to localStorage
export const saveTeamsToStorage = (teamsState) => {
  try {
    // Only save the essential team data, not UI state
    const dataToSave = {
      ids: teamsState.ids,
      entities: teamsState.entities,
      userTeams: teamsState.userTeams,
      maxTeamSize: teamsState.maxTeamSize
    }
    
    localStorage.setItem(TEAMS_STORAGE_KEY, JSON.stringify(dataToSave))
    console.log('Saved teams to localStorage:', dataToSave)
  } catch (error) {
    console.error('Error saving teams to localStorage:', error)
  }
}

// Clear teams from localStorage
export const clearTeamsFromStorage = () => {
  try {
    localStorage.removeItem(TEAMS_STORAGE_KEY)
    console.log('Cleared teams from localStorage')
  } catch (error) {
    console.error('Error clearing teams from localStorage:', error)
  }
}

// Middleware to automatically save teams to localStorage
export const teamsPersistenceMiddleware = (store) => (next) => (action) => {
  const result = next(action)
  
  // Only save on team-related actions
  const teamActions = [
    'teams/createTeam',
    'teams/updateTeam', 
    'teams/deleteTeam',
    'teams/addCharacterToTeam',
    'teams/removeCharacterFromTeam',
    'teams/resetCurrentTeam',
    'teams/setCurrentTeam',
    'teams/loadTeamForEdit',
    'teams/startNewTeam',
    'teams/cancelTeamEdit'
  ]
  
  if (teamActions.includes(action.type)) {
    const state = store.getState()
    saveTeamsToStorage(state.teams)
  }
  
  return result
}
