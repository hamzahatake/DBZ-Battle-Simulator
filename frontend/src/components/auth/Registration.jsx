import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { registerUser } from '../../features/auth/authSlice'
import { useNavigate } from 'react-router-dom'

export default function Registration() {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [password_confirm, setPasswordConfirm] = useState('')
    const [first_name, setFirstName] = useState('')
    const [last_name, setLastName] = useState('')
    const [message, setMessage] = useState('')
    const [agreed, setAgreed] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()


    const handleRegister = async (e) => {
        e.preventDefault()

        if (!username || !email || !password) {
            setMessage('Fill out all fields, young warrior!')
            return
        }

        if (password !== password_confirm) {
            setMessage("Passwords don't match. Even Goten & Trunks sync better!")
            return
        }

        if (!agreed) {
            setMessage("You must agree to the terms to join the Z Fighters.")
            return
        }

        try {
            console.log('Starting registration with data:', { username, email, password: '***', password_confirm: '***', first_name, last_name })
            
            const result = await dispatch(registerUser({
                username,
                email,
                password,
                password_confirm,
                first_name,
                last_name
            }))
            
            console.log('Registration result:', result)
            
            if (result.type === 'auth/registerUser/fulfilled') {
                console.log('Registration successful:', result.payload)
                setMessage(result.payload.message || 'Registration successful! Please log in to continue.')
                // Clear form after successful registration
                setUsername('')
                setEmail('')
                setPassword('')
                setPasswordConfirm('')
                setFirstName('')
                setLastName('')
            } else if (result.type === 'auth/registerUser/rejected') {
                console.log('Registration failed:', result.payload)
                setMessage(`Registration failed: ${result.payload}`)
            }
        } catch (err) {
            console.log('Registration catch error:', err)
            console.log('Error type:', typeof err)
            console.log('Error details:', err)
            
            // Handle different types of errors
            if (typeof err === 'object' && err !== null) {
                // Handle validation errors from backend
                const errorMessages = []
                Object.keys(err).forEach(key => {
                    if (Array.isArray(err[key])) {
                        errorMessages.push(`${key}: ${err[key].join(', ')}`)
                    } else {
                        errorMessages.push(`${key}: ${err[key]}`)
                    }
                })
                setMessage(`Registration failed: ${errorMessages.join('; ')}`)
            } else {
                setMessage(`Registration failed: ${err}`)
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
                placeholder="Password (min 6 characters)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            <input
                type="password"
                placeholder="Repeat Password"
                value={password_confirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            <input
                type="text"
                placeholder="First Name (Optional)"
                value={first_name}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            <input
                type="text"
                placeholder="Last Name (Optional)"
                value={last_name}
                onChange={(e) => setLastName(e.target.value)}
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
                className="w-full bg-yellow-400 text-black font-semibold py-2 rounded-lg hover:bg-yellow-300 transition cursor-pointer"
            >
                Create Account
            </button>

            {message && (
                <p className="text-sm text-center text-red-400 mt-2">{message}</p>
            )}
        </form>
    )
}
