import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { FaSave, FaEdit, FaTimes } from "react-icons/fa";
import { useGetCharactersQuery } from "../../features/characters/charactersSlice";
import { 
  selectCurrentTeamCharacters, 
  loadUserTeam, 
  selectIsEditingTeam,
  selectCurrentTeamBeingEdited,
  cancelTeamEdit,
  startNewTeam
} from "../../features/teams/teamsSlice";
import TeamSlot from "../team/TeamSlot";
import StartBattleButton from "../team/StartBattleButton";
import TeamSummary from "../team/TeamSummary";
import TeamSaveModal from "../team/TeamSaveModal";
import SavedTeamsSidebar from "../team/SavedTeamsSidebar";
import { useNavigate } from "react-router-dom";

export default function TeamBuilderPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { data: warriors, isLoading, error } = useGetCharactersQuery();
    const selectedTeam = useSelector(selectCurrentTeamCharacters);
    const user = useSelector((state) => state.auth.user);
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const isEditing = useSelector(selectIsEditingTeam);
    const editingTeam = useSelector(selectCurrentTeamBeingEdited);
    
    const [showSaveModal, setShowSaveModal] = useState(false);

    // Load user's team when they're authenticated
    useEffect(() => {
        if (isAuthenticated && user) {
            dispatch(loadUserTeam(user.id));
        }
    }, [isAuthenticated, user, dispatch]);

    // Debug logging
    console.log('TeamBuilderPage - selectedTeam:', selectedTeam);
    console.log('TeamBuilderPage - warriors:', warriors);
    console.log('TeamBuilderPage - isLoading:', isLoading);
    console.log('TeamBuilderPage - error:', error);
    console.log('TeamBuilderPage - isAuthenticated:', isAuthenticated);
    console.log('TeamBuilderPage - user:', user);
    console.log('TeamBuilderPage - isEditing:', isEditing);
    console.log('TeamBuilderPage - editingTeam:', editingTeam);

    const handleSaveTeam = () => {
        setShowSaveModal(true);
    };

    const handleCancelEdit = () => {
        dispatch(cancelTeamEdit());
    };

    const handleStartNewTeam = () => {
        dispatch(startNewTeam());
    };


    // Show loading state
    if (isLoading) {
        return (
            <div className="w-full min-h-screen bg-gray-900 text-white pt-20 px-4 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400 mx-auto mb-4"></div>
                    <p className="text-gray-400">Loading characters...</p>
                </div>
            </div>
        );
    }

    // Show error state
    if (error) {
        return (
            <div className="w-full min-h-screen bg-gray-900 text-white pt-20 px-4 flex items-center justify-center">
                <div className="text-center">
                    <p className="text-red-400 mb-4">Error loading characters: {error.message || 'Unknown error'}</p>
                    <button 
                        onClick={() => window.location.reload()} 
                        className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg transition-colors"
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full min-h-screen bg-gray-900 text-white pt-20 px-4">
            {/* Header */}
            <div className="max-w-7xl mx-auto mb-10">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-3xl font-bold text-yellow-400">
                            {isEditing ? `Edit Team: ${editingTeam?.name}` : 'Team'}
                        </h1>
                        {isEditing && (
                            <p className="text-gray-400 text-sm mt-1">
                                Modify your team members and save changes
                            </p>
                        )}
                    </div>
                    
                    <div className="flex gap-3">
                        {isEditing && (
                            <motion.button
                                onClick={handleCancelEdit}
                                className="flex items-center gap-2 px-4 py-2 bg-gray-600 hover:bg-gray-500 text-white rounded-lg transition-colors"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <FaTimes />
                                Cancel Edit
                            </motion.button>
                        )}
                        
                        <motion.button
                            onClick={handleSaveTeam}
                            disabled={selectedTeam.length === 0}
                            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-white rounded-lg transition-all font-medium"
                            whileHover={{ scale: selectedTeam.length > 0 ? 1.05 : 1 }}
                            whileTap={{ scale: selectedTeam.length > 0 ? 0.95 : 1 }}
                        >
                            {isEditing ? <FaEdit /> : <FaSave />}
                            {isEditing ? 'Update Team' : 'Save Team'}
                        </motion.button>
                    </div>
                </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-8 justify-center items-start w-full">
                {/* Team Slots */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full lg:w-2/3">
                    {Array.from({ length: 5 }).map((_, idx) => (
                        <TeamSlot
                            key={idx}
                            character={selectedTeam[idx] || null}
                        />
                    ))
                    }
                </div>
                
                {/* Saved Teams Sidebar */}
                <div className="w-full lg:w-1/3">
                    <SavedTeamsSidebar />
                </div>
            </div>

            {/* Debug Info */}
            <div className="mt-8 text-center">
                <div className="bg-gray-800/50 rounded-lg p-6 max-w-4xl mx-auto">
                    <h3 className="text-xl font-semibold text-white mb-4">Debug Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm mb-4">
                        <div className="text-left">
                            <p className="text-gray-400">Loading: <span className="text-white">{isLoading ? 'Yes' : 'No'}</span></p>
                            <p className="text-gray-400">Error: <span className="text-white">{error ? error.message || 'None' : 'None'}</span></p>
                            <p className="text-gray-400">Warriors Count: <span className="text-white">{warriors?.length || 0}</span></p>
                            <p className="text-gray-400">Selected Team: <span className="text-white">{selectedTeam?.length || 0}</span></p>
                        </div>
                        <div className="text-left">
                            <p className="text-gray-400">Authenticated: <span className="text-white">{isAuthenticated ? 'Yes' : 'No'}</span></p>
                            <p className="text-gray-400">User: <span className="text-white">{user?.username || 'None'}</span></p>
                            <p className="text-gray-400">Editing: <span className="text-white">{isEditing ? 'Yes' : 'No'}</span></p>
                            <p className="text-gray-400">Editing Team: <span className="text-white">{editingTeam?.name || 'None'}</span></p>
                        </div>
                    </div>
                    <div className="flex gap-4 justify-center">
                        <button 
                            onClick={() => window.location.reload()} 
                            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
                        >
                            Reload Page
                        </button>
                        <button 
                            onClick={() => dispatch(startNewTeam())} 
                            className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors"
                        >
                            Start New Team
                        </button>
                    </div>
                </div>
            </div>

            {/* Help Text */}
            {selectedTeam.length === 0 && (
                <div className="mt-8 text-center">
                    <div className="bg-gray-800/50 rounded-lg p-6 max-w-2xl mx-auto">
                        <h3 className="text-xl font-semibold text-white mb-2">Build Your Team</h3>
                        <p className="text-gray-400 mb-4">
                            Select characters from the Characters page to build your team. You can choose up to 5 characters.
                        </p>
                        <a 
                            href="/characters"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white rounded-lg transition-all font-medium"
                        >
                            Go to Characters
                        </a>
                    </div>
                </div>
            )}

            {/* Summary + Start */}
            <div className="mt-10 max-w-5xl mx-auto px-4">
                <TeamSummary team={selectedTeam} />
                <div className="flex justify-center mt-6">
                    <StartBattleButton 
                        disabled={selectedTeam.length === 0}
                        onClick={() => {
                            // TODO: Implement battle start logic
                            console.log('Starting battle with team:', selectedTeam);
                        }}
                    />
                </div>
            </div>
            
            {/* Team Save Modal */}
            <TeamSaveModal 
                isOpen={showSaveModal} 
                onClose={() => setShowSaveModal(false)} 
            />
        </div>
    );
}
