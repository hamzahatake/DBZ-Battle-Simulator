import { useState } from "react"
import { useDispatch } from "react-redux"
import { login } from "../../auth/authSlice"

export default function Login() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()

    const handleLogin = (e) => {
        e.preventDefault()
        dispatch(login({ username, password }))
            .unwrap()
            .then((res) => console.log('Login Success:', res))
            .catch((err) => console.error('Login Failed:', err))

    }

    return (
        <form onSubmit={handleLogin} className="space-y-4">
            <h2 className="text-2xl font-bold text-yellow-400 text-center mb-4">
                Welcome Back!
            </h2>

            {/* Tracking Username/Email */}
            <input
                type="text"
                placeholder="Email or Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />

            {/* Tracking password */}
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />

            <div className="flex justify-between items-center text-sm text-slate-400">
                <label>
                    <input type="checkbox" className="mr-2" />
                    Remember Me
                </label>
                <a href="#" className="hover:underline">
                    Forgot Password?
                </a>
            </div>

            {/* Button triggers dispatch of login action */}
            <button
                type="submit"
                className="w-full bg-yellow-400 text-black font-semibold py-2 rounded-lg hover:bg-yellow-300 transition"
            >
                Sign In
            </button>
        </form>
    )
}
