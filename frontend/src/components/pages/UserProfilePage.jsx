import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { motion } from 'framer-motion'
import { FaEdit, FaSave, FaTimes, FaTrophy, FaFistRaised, FaCalendar, FaUser, FaCamera, FaUpload } from 'react-icons/fa'
import { logoutUser } from '../../features/auth/authSlice'
import { clearUserTeam } from '../../features/teams/teamsSlice'
import { useNavigate } from 'react-router-dom'

export default function UserProfilePage() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { user, token, isAuthenticated } = useSelector(state => state.auth)
    
    const [isEditing, setIsEditing] = useState(false)
    const [editData, setEditData] = useState({
        first_name: '',
        last_name: '',
        email: ''
    })
    const [battleHistory, setBattleHistory] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [message, setMessage] = useState('')
    const [profileImage, setProfileImage] = useState(null)
    const [profileImagePreview, setProfileImagePreview] = useState(null)
    const fileInputRef = useRef(null)

    // Initialize edit data when user data loads
    useEffect(() => {
        if (user) {
            setEditData({
                first_name: user.first_name || '',
                last_name: user.last_name || '',
                email: user.email || ''
            })
        }
    }, [user])

    // Redirect if not authenticated
    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/auth')
        }
    }, [isAuthenticated, navigate])

    // Fetch battle history
    useEffect(() => {
        if (isAuthenticated && token) {
            fetchBattleHistory()
        }
    }, [isAuthenticated, token])

    const fetchBattleHistory = async () => {
        try {
            setIsLoading(true)
            const response = await fetch('http://localhost:8000/api/battles/', {
                headers: {
                    'Authorization': `Token ${token}`,
                    'Content-Type': 'application/json',
                },
            })
            
            if (response.ok) {
                const data = await response.json()
                const battles = data.results || data
                setBattleHistory(Array.isArray(battles) ? battles : [])
            }
        } catch (error) {
            console.error('Error fetching battle history:', error)
        } finally {
            setIsLoading(false)
        }
    }

    const handleEdit = () => {
        setIsEditing(true)
        setMessage('')
    }

    const handleCancel = () => {
        setIsEditing(false)
        setEditData({
            first_name: user.first_name || '',
            last_name: user.last_name || '',
            email: user.email || ''
        })
        setMessage('')
    }

    const handleSave = async () => {
        try {
            setIsLoading(true)
            const response = await fetch('http://localhost:8000/api/users/profile/update/', {
                method: 'PATCH',
                headers: {
                    'Authorization': `Token ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(editData),
            })

            if (response.ok) {
                const updatedUser = await response.json()
                setMessage('Profile updated successfully!')
                setIsEditing(false)
                // Update the user in the store
                dispatch({ type: 'auth/setCredentials', payload: { token, user: updatedUser } })
            } else {
                const error = await response.json()
                setMessage(`Error: ${JSON.stringify(error)}`)
            }
        } catch (error) {
            setMessage(`Error updating profile: ${error.message}`)
        } finally {
            setIsLoading(false)
        }
    }

    const handleLogout = () => {
        dispatch(logoutUser())
        dispatch(clearUserTeam())
        navigate('/')
    }

    const handleInputChange = (field, value) => {
        setEditData(prev => ({
            ...prev,
            [field]: value
        }))
    }

    const handleImageChange = (event) => {
        const file = event.target.files[0]
        if (file) {
            // Validate file type
            const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp']
            if (!allowedTypes.includes(file.type)) {
                setMessage('Please select a valid image file (JPEG, PNG, GIF, or WebP)')
                return
            }
            
            // Validate file size (max 5MB)
            if (file.size > 5 * 1024 * 1024) {
                setMessage('Image size must be less than 5MB')
                return
            }
            
            setProfileImage(file)
            
            // Create preview
            const reader = new FileReader()
            reader.onload = (e) => {
                setProfileImagePreview(e.target.result)
            }
            reader.readAsDataURL(file)
        }
    }

    const handleImageUpload = async () => {
        if (!profileImage) return
        
        try {
            setIsLoading(true)
            const formData = new FormData()
            formData.append('avatar', profileImage)
            
            const response = await fetch('http://localhost:8000/api/users/profile/update/', {
                method: 'PATCH',
                headers: {
                    'Authorization': `Token ${token}`,
                },
                body: formData,
            })
            
            if (response.ok) {
                const updatedUser = await response.json()
                setMessage('Profile picture updated successfully!')
                setProfileImage(null)
                setProfileImagePreview(null)
                // Update the user in the store
                dispatch({ type: 'auth/setCredentials', payload: { token, user: updatedUser } })
            } else {
                const error = await response.json()
                setMessage(`Error: ${JSON.stringify(error)}`)
            }
        } catch (error) {
            setMessage(`Error uploading image: ${error.message}`)
        } finally {
            setIsLoading(false)
        }
    }

    const getImageUrl = (imagePath) => {
        if (!imagePath) return null
        if (imagePath.startsWith('http')) return imagePath
        return `http://localhost:8000${imagePath}`
    }

    if (!isAuthenticated) {
        return <div className="text-center text-white mt-20">Please log in to view your profile.</div>
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900 text-white p-6 pt-20">
            <div className="max-w-6xl mx-auto">
                {/* Profile Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gradient-to-r from-blue-800/40 to-purple-800/40 backdrop-blur-sm rounded-3xl p-8 mb-8 shadow-2xl"
                >
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        {/* Profile Info */}
                        <div className="flex items-center gap-6">
                            <div className="relative group">
                                <div className="w-32 h-32 rounded-full overflow-hidden bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-4xl font-bold text-black shadow-2xl">
                                    {profileImagePreview ? (
                                        <img 
                                            src={profileImagePreview} 
                                            alt="Profile Preview" 
                                            className="w-full h-full object-cover"
                                        />
                                    ) : user?.avatar_url ? (
                                        <img 
                                            src={getImageUrl(user.avatar_url)} 
                                            alt="Profile" 
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <FaUser />
                                    )}
                                </div>
                                
                                {/* Camera overlay on hover */}
                                <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer"
                                     onClick={() => fileInputRef.current?.click()}>
                                    <FaCamera className="text-white text-2xl" />
                                </div>
                                
                                {/* Online status indicator */}
                                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-gray-900"></div>
                                
                                {/* Hidden file input */}
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="hidden"
                                />
                            </div>
                            <div>
                                {isEditing ? (
                                    <div className="space-y-3">
                                        <input
                                            type="text"
                                            value={editData.first_name}
                                            onChange={(e) => handleInputChange('first_name', e.target.value)}
                                            placeholder="First Name"
                                            className="bg-transparent border-b border-blue-400 text-2xl font-bold focus:outline-none focus:border-blue-300 px-2 py-1"
                                        />
                                        <input
                                            type="text"
                                            value={editData.last_name}
                                            onChange={(e) => handleInputChange('last_name', e.target.value)}
                                            placeholder="Last Name"
                                            className="bg-transparent border-b border-blue-400 text-2xl font-bold focus:outline-none focus:border-blue-300 px-2 py-1"
                                        />
                                    </div>
                                ) : (
                                    <h1 className="text-3xl font-bold text-white">
                                        {user.first_name && user.last_name 
                                            ? `${user.first_name} ${user.last_name}`
                                            : user.username || 'Z Fighter'
                                        }
                                    </h1>
                                )}
                                <p className="text-blue-300 text-lg">@{user.username}</p>
                                {isEditing ? (
                                    <input
                                        type="email"
                                        value={editData.email}
                                        onChange={(e) => handleInputChange('email', e.target.value)}
                                        placeholder="Email"
                                        className="bg-transparent border-b border-blue-400 text-blue-300 focus:outline-none focus:border-blue-300 px-2 py-1 mt-2"
                                    />
                                ) : (
                                    <p className="text-blue-300">{user.email}</p>
                                )}
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-wrap gap-3">
                            {/* Profile Picture Upload Button */}
                            {profileImage && (
                                <button
                                    onClick={handleImageUpload}
                                    disabled={isLoading}
                                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50"
                                >
                                    <FaUpload />
                                    {isLoading ? 'Uploading...' : 'Upload Photo'}
                                </button>
                            )}
                            
                            {isEditing ? (
                                <>
                                    <button
                                        onClick={handleSave}
                                        disabled={isLoading}
                                        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50"
                                    >
                                        <FaSave />
                                        {isLoading ? 'Saving...' : 'Save'}
                                    </button>
                                    <button
                                        onClick={handleCancel}
                                        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
                                    >
                                        <FaTimes />
                                        Cancel
                                    </button>
                                </>
                            ) : (
                                <button
                                    onClick={handleEdit}
                                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
                                >
                                    <FaEdit />
                                    Edit Profile
                                </button>
                            )}
                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
                            >
                                Logout
                            </button>
                        </div>
                    </div>

                    {/* Message */}
                    {message && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`mt-4 p-3 rounded-lg ${
                                message.includes('Error') ? 'bg-red-500/20 text-red-300' : 'bg-green-500/20 text-green-300'
                            }`}
                        >
                            {message}
                        </motion.div>
                    )}
                </motion.div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center shadow-xl"
                    >
                        <FaFistRaised className="text-4xl text-yellow-400 mx-auto mb-3" />
                        <h3 className="text-xl font-bold mb-2">Total Battles</h3>
                        <p className="text-3xl font-bold text-yellow-400">{Array.isArray(battleHistory) ? battleHistory.length : 0}</p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center shadow-xl"
                    >
                        <FaTrophy className="text-4xl text-yellow-400 mx-auto mb-3" />
                        <h3 className="text-xl font-bold mb-2">Battles Won</h3>
                        <p className="text-3xl font-bold text-yellow-400">
                            {Array.isArray(battleHistory) ? battleHistory.filter(battle => battle.winner).length : 0}
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center shadow-xl"
                    >
                        <FaCalendar className="text-4xl text-yellow-400 mx-auto mb-3" />
                        <h3 className="text-xl font-bold mb-2">Member Since</h3>
                        <p className="text-lg text-blue-300">
                            {new Date(user.date_joined).toLocaleDateString()}
                        </p>
                    </motion.div>
                </div>

                {/* Battle History */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 shadow-xl"
                >
                    <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                        <FaFistRaised className="text-yellow-400" />
                        Battle History
                    </h2>

                    {isLoading ? (
                        <div className="text-center py-8">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400 mx-auto"></div>
                            <p className="mt-4 text-blue-300">Loading battle history...</p>
                        </div>
                    ) : Array.isArray(battleHistory) && battleHistory.length > 0 ? (
                        <div className="space-y-4">
                            {battleHistory.map((battle, index) => (
                                <motion.div
                                    key={battle.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="bg-white/5 rounded-xl p-4 border border-white/10 hover:bg-white/10 transition-colors"
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <div className="text-center">
                                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
                                                    {battle.character1?.name?.charAt(0) || '?'}
                                                </div>
                                                <p className="text-sm text-blue-300 mt-1">{battle.character1?.name || 'Unknown'}</p>
                                            </div>
                                            <div className="text-center">
                                                <div className="text-2xl font-bold text-yellow-400">VS</div>
                                            </div>
                                            <div className="text-center">
                                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-500 to-orange-600 flex items-center justify-center text-white font-bold">
                                                    {battle.character2?.name?.charAt(0) || '?'}
                                                </div>
                                                <p className="text-sm text-red-300 mt-1">{battle.character2?.name || 'Unknown'}</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className={`px-3 py-1 rounded-full text-sm font-bold ${
                                                battle.status === 'completed' 
                                                    ? 'bg-green-500/20 text-green-300' 
                                                    : 'bg-yellow-500/20 text-yellow-300'
                                            }`}>
                                                {battle.status === 'completed' ? 'Completed' : 'In Progress'}
                                            </div>
                                            {battle.winner && (
                                                <p className="text-sm text-yellow-400 mt-1">
                                                    Winner: {battle.winner.name}
                                                </p>
                                            )}
                                            <p className="text-xs text-gray-400 mt-1">
                                                {new Date(battle.created_at).toLocaleDateString()}
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-8">
                            <FaFistRaised className="text-6xl text-gray-600 mx-auto mb-4" />
                            <h3 className="text-xl font-bold text-gray-400 mb-2">No Battles Yet</h3>
                            <p className="text-gray-500">Start your first battle to see your history here!</p>
                            <button
                                onClick={() => navigate('/battle')}
                                className="mt-4 px-6 py-2 bg-yellow-500 hover:bg-yellow-600 text-black font-bold rounded-lg transition-colors"
                            >
                                Start Battle
                            </button>
                        </div>
                    )}
                </motion.div>
            </div>
        </div>
    )
}
