import Goku from "../../../public/images/profile/Goku Ultra Instinct.jpg"
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../auth/authSlice";

export default function UserProfile() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout())
        navigate("/")
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-900 to-black text-white p-6 pt-20">
            {/* Profile Header */}
            <div className="flex items-center gap-6 mb-10">
                <img
                    src={Goku}
                    alt="User Avatar"
                    className="w-24 h-24 rounded-full border-4 border-purple-500 shadow-lg"
                />
                <div>
                    <h1 className="text-3xl font-bold">Goku</h1>
                    <button className="mt-2 px-4 py-1 text-sm bg-purple-600 hover:bg-purple-700 rounded-lg">
                        Edit Profile
                    </button>
                </div>

                {/* Logout Button */}
                <div
                    onClick={handleLogout}
                    className="flex justify-end mb-4">
                    <button
                        className="px-4 py-2 text-sm bg-red-600 hover:bg-red-700 rounded-lg shadow-md"
                    >
                        Log Out
                    </button>
                </div>

            </div>

            {/* User Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
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

            {/* Saved Teams */}
            <div className="mb-10">
                <h2 className="text-2xl font-bold mb-4">Saved Teams</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3].map(team => (
                        <div key={team} className="bg-white/10 backdrop-blur p-4 rounded-xl shadow-md">
                            <h3 className="text-lg font-semibold mb-2">Team {team}</h3>
                            <div className="flex flex-wrap gap-2">
                                {/* Character avatars (placeholder) */}
                                {[1, 2, 3, 4, 5].map(char => (
                                    <img
                                        key={char}
                                        src="https://via.placeholder.com/50"
                                        alt="Character"
                                        className="w-12 h-12 rounded-lg"
                                    />
                                ))}
                            </div>
                            <div className="flex gap-2 mt-4">
                                <button className="px-3 py-1 text-sm bg-purple-600 rounded hover:bg-purple-700">View</button>
                                <button className="px-3 py-1 text-sm bg-red-600 rounded hover:bg-red-700">Delete</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Battle History */}
            <div>
                <h2 className="text-2xl font-bold mb-4">Battle History</h2>
                <ul className="space-y-4">
                    {[1, 2, 3].map(battle => (
                        <li key={battle} className="bg-white/10 backdrop-blur p-4 rounded-xl shadow-md">
                            <p className="text-lg">
                                <span className="font-semibold">Battle {battle}:</span> Team A defeated Team B in 5 rounds.
                            </p>
                            <p className="text-sm text-gray-300">Date: 2025-08-06</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
