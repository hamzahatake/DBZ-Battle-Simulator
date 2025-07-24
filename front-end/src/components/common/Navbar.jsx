import { Link } from "react-router-dom";

export default function Navbar() {
    return (
        <nav className="absolute top-0 left-0 w-full z-50 px-6 py-4 text-white">
            <div className="flex justify-between items-center max-w-7xl mx-auto">

                {/* Logo or Title */}
                <Link to="/" className="text-xl font-bold tracking-wide">
                    DBZ Battles
                </Link>

                {/* Navigation Links */}
                <ul className="hidden md:flex gap-10 font-light text-sm tracking-wide">
                    <li>
                        <Link to="/" className="hover:text-yellow-400 transition-colors duration-200">Home</Link>
                    </li>
                    <li>
                        <Link to="/characters" className="hover:text-yellow-400 transition-colors duration-200">Characters</Link>
                    </li>
                    <li>
                        <Link to="/team" className="hover:text-yellow-400 transition-colors duration-200">Team</Link>
                    </li>
                    <li>
                        <Link to="/battle" className="hover:text-yellow-400 transition-colors duration-200">Battle</Link>
                    </li>
                    <li>
                        <Link to="/about" className="hover:text-yellow-400 transition-colors duration-200">About This Project</Link>
                    </li>
                </ul>

                {/* Authentication */}
                <div className="flex gap-3">
                    <Link
                        to="/auth"
                        className="bg-white text-blue-600 font-semibold px-4 py-2 rounded-3xl hover:bg-blue-100 transition"
                    >
                        Log In
                    </Link>
                </div>
            </div>
        </nav>
    );
}
