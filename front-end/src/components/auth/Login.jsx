export default function Login() {
    return (
        <form className="space-y-4">
            <h2 className="text-2xl font-bold text-yellow-400 text-center mb-4">
                Welcome Back!
            </h2>

            <input
                type="text"
                placeholder="Email or Username"
                className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />

            <input
                type="password"
                placeholder="Password"
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

            <button
                type="submit"
                className="w-full bg-yellow-400 text-black font-semibold py-2 rounded-lg hover:bg-yellow-300 transition"
            >
                Sign In
            </button>
        </form>
    );
}
