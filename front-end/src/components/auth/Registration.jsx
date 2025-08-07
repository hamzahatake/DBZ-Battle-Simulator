import React, { useState } from 'react'
import api from '../../auth/api'

export default function Registration() {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [repeatPassword, setRepeatPassword] = useState('')
    const [message, setMessage] = useState('')
    const [agreed, setAgreed] = useState(false)


    const handleRegister = async (e) => {
        e.preventDefault()

        if (!username || !email || !password) {
            setMessage('Fill out all fields, young warrior!')
            return
        }

        if (password !== repeatPassword) {
            setMessage("Passwords don't match. Even Goten & Trunks sync better!")
            return
        }

        if (!agreed) {
            setMessage("You must agree to the terms to join the Z Fighters.")
            return
        }

        try {
            const res = await api.post('characters/register/', { username, email, password })
            setMessage(res.data.message || 'Registration complete. Now go train!')
        } catch (err) {
            if (err.response && err.response.data) {
                const errorData = err.response.data
                const formatted = Object.entries(errorData)
                    .map(([field, msgs]) => `${field}: ${msgs.join(', ')}`)
                    .join('\n')

                setMessage(`Registration failed:\n${formatted}`)
            } else {
                setMessage('Registration failed — unknown error.')
            }
        }

    }

    return (
        <form onSubmit={handleRegister} className="space-y-4">
            <h2 className="text-2xl font-bold text-yellow-400 text-center mb-4">
                Join the Fight!
            </h2>

            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            <input
                type="password"
                placeholder="Repeat Password"
                value={repeatPassword}
                onChange={(e) => setRepeatPassword(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />

            <label className="text-sm text-slate-400">
                <input
                    type="checkbox"
                    className="mr-2"
                    checked={agreed}
                    onChange={() => setAgreed(!agreed)}
                />
                I agree to the terms and conditions
            </label>

            <button
                type="submit"
                className="w-full bg-yellow-400 text-black font-semibold py-2 rounded-lg hover:bg-yellow-300 transition"
            >
                Create Account
            </button>

            {message && (
                <p className="text-sm text-center text-red-400 mt-2">{message}</p>
            )}
        </form>
    )
}
