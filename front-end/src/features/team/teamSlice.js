import { createSlice } from "@reduxjs/toolkit";

export const teamSlice = createSlice({
    name: 'teamSlice',
    initialState: {
        selectedTeam: [],
        savedTeams: []
    },
    reducers: {
        addCharacterToTeam: (state, action) => {
            const exist = state.selectedTeam.some(character => character.id === action.payload.id);
            if (!exist && state.selectedTeam.length < 5) {
                state.selectedTeam = [...state.selectedTeam, action.payload];
            }
        }, 
        removeCharacterFromTeam: (state, action) => {
            state.selectedTeam = state.selectedTeam.filter(character => character.id !== action.payload.id);
        },
        resetTeam: (state) => {
            state.selectedTeam = [];
        },
        saveTeam: (state, action) => {
            const newTeam = {
                id: Date.now(),
                name: action.payload,
                members: [...state.selectedTeam],
                createdAt: Date.now()
            };
            state.savedTeams = [...state.savedTeams, newTeam];
            state.selectedTeam = [];
        },
        deleteTeam: (state, action) => {
            state.savedTeams = state.savedTeams.filter(team => team.id !== action.payload.id);
        },
        updateTeam: (state, action) => {
            const index = state.savedTeams.findIndex(t => t.id === action.payload.id);
            if (index !== -1) {
                state.savedTeams[index] = action.payload;
            }
        },
        loadSavedTeamsFromStorage: (state, action) => {
            state.savedTeams = action.payload || [];
        }
    }
});

export const {
    addCharacterToTeam,
    removeCharacterFromTeam,
    resetTeam,
    saveTeam,
    deleteTeam,
    updateTeam,
    loadSavedTeamsFromStorage
} = teamSlice.actions;

export default teamSlice.reducer;
