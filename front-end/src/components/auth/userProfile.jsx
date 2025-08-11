const Goku = "/images/profile/Goku Ultra Instinct.jpg";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../../auth/authSlice";
import {
    useGetUserProfileQuery,
    useUpdateUserProfileMutation
} from "../../auth/userProfileSlice";

export default function UserProfile() {
    const { data: user, isLoading, error } = useGetUserProfileQuery();
    const [updateProfile, { isLoading: isSaving }] = useUpdateUserProfileMutation();

    const [editData, setEditData] = useState({
        username: "",
        name: "",
        bio: "",
        image: ""
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Populate edit fields when user data is loaded
    useEffect(() => {
        if (user) {
            setEditData({
                username: user.username || "",
                name: user.name || "",
                bio: user.bio || "",
                image: user.image || ""
            });
        }
    }, [user]);

    if (isLoading) return <p className="text-center text-gray-300">Loading profile...</p>;
    if (error) return <p className="text-center text-red-500">Error loading profile.</p>;

    const handleLogout = () => {
        dispatch(logout());
        navigate("/");
    };

    const handleEdit = (field, value) => {
        setEditData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSave = async () => {
        try {
            await updateProfile(editData).unwrap(); // Sends PUT with current editData
            alert("Profile updated successfully!");
        } catch (err) {
            alert("Error updating profile.");
        }
    };


    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-900 to-black text-white p-6 pt-20">
            {/* Profile Header */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-10 bg-purple-800/40 p-6 rounded-2xl shadow-xl">
                <div className="flex items-center gap-6">
                    <img
                        src={editData.image || Goku}
                        alt={editData.name || "Profile"}
                        className="w-28 h-28 rounded-full border-4 border-purple-500 shadow-lg object-cover"
                    />
                    <div>
                        <input
                            type="text"
                            value={editData.name}
                            onChange={(e) => handleEdit("name", e.target.value)}
                            className="bg-transparent border-b border-purple-400 text-3xl font-bold focus:outline-none focus:border-purple-300"
                            placeholder="Enter name"
                        />
                        <p className="text-sm text-gray-300 mt-1">@{editData.username}</p>
                    </div>
                </div>

                {/* Logout Button */}
                <button
                    onClick={handleLogout}
                    className="px-5 py-2 text-sm bg-red-600 hover:bg-red-700 rounded-lg shadow-md transition"
                >
                    Log Out
                </button>
            </div>

            {/* Bio Section */}
            <div className="bg-purple-800/40 p-6 rounded-2xl shadow-lg">
                <h2 className="text-lg font-semibold mb-2">Bio</h2>
                <textarea
                    value={editData.bio}
                    onChange={(e) => handleEdit("bio", e.target.value)}
                    className="w-full bg-transparent border border-purple-400 rounded-lg p-3 focus:outline-none focus:border-purple-300 resize-none"
                    rows="4"
                    placeholder="Write something about yourself..."
                />
            </div>

            {/* Save Changes Button */}
            <div className="mt-6 text-center">
                <button
                    onClick={handleSave}
                    disabled={isSaving}
                    className={`px-6 py-2 rounded-lg shadow-md transition ${isSaving
                        ? "bg-gray-500 cursor-not-allowed"
                        : "bg-green-600 hover:bg-green-700"
                        }`}
                >
                    {isSaving ? "Saving..." : "Save Changes"}
                </button>
            </div>

            {/* User Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10 mt-10">
                <div className="bg-white/10 backdrop-blur p-4 rounded-xl shadow-md">
                    <h2 className="text-lg font-semibold">Teams</h2>
                    <p className="text-2xl">5</p>
                </div>
                <div className="bg-white/10 backdrop-blur p-4 rounded-xl shadow-md">
                    <h2 className="text-lg font-semibold">Battles Won</h2>
                    <p className="text-2xl">12</p>
                </div>
                <div className="bg-white/10 backdrop-blur p-4 rounded-xl shadow-md">
                    <h2 className="text-lg font-semibold">Favorite Character</h2>
                    <p className="text-xl italic">Vegeta</p>
                </div>
            </div>
        </div>
    );
}
