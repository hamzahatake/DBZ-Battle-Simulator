export default function Registration() {
    return (
        <form className="space-y-4">
            <h2 className="text-2xl font-bold text-yellow-400 text-center mb-4">
                Join the Fight!
            </h2>

            <input
                type="text"
                placeholder="Name"
                className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            <input
                type="text"
                placeholder="Username"
                className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            <input
                type="email"
                placeholder="Email"
                className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            <input
                type="password"
                placeholder="Password"
                className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            <input
                type="password"
                placeholder="Repeat Password"
                className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />

            <label className="text-sm text-slate-400">
                <input type="checkbox" className="mr-2" />
                I agree to the terms and conditions
            </label>

            <button
                type="submit"
                className="w-full bg-yellow-400 text-black font-semibold py-2 rounded-lg hover:bg-yellow-300 transition"
            >
                Create Account
            </button>
        </form>
    );
}
