import { NavLink, useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Goku from "../../../public/images/profile/Goku Ultra Instinct.jpg"

const navItems = [
    { path: "/", label: "Home" },
    { path: "/characters", label: "Characters" },
    { path: "/team", label: "Team" },
    { path: "/battle", label: "Battle" },
    { path: "/about", label: "About This Project" },
];

export default function Navbar() {
    const location = useLocation();
    const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });
    const containerRef = useRef(null);
    const itemRefs = useRef({});

    // TEMP: Replace this with your actual user auth logic later
    const user = {
        isLoggedIn: true,
        avatar: "https://via.placeholder.com/40", // Placeholder user image
    };


    useEffect(() => {
        const updateIndicator = () => {
            const currentEl = itemRefs.current[location.pathname];
            const containerEl = containerRef.current;

            if (currentEl && containerEl) {
                const itemRect = currentEl.getBoundingClientRect();
                const containerRect = containerEl.getBoundingClientRect();

                setIndicatorStyle({
                    left: itemRect.left - containerRect.left,
                    width: itemRect.width,
                });
            }
        };

        requestAnimationFrame(updateIndicator);
        window.addEventListener("resize", updateIndicator);
        return () => window.removeEventListener("resize", updateIndicator);
    }, [location.pathname]);

    return (
        <nav className="absolute top-0 left-0 w-full z-50 px-6 py-4 text-white">
            <div className="flex justify-between items-center max-w-7xl mx-auto">
                {/* Logo */}
                <NavLink to="/" className="text-xl font-bold tracking-wide">
                    DBZ Battles
                </NavLink>

                {/* Nav Links with Animated Underline */}
                <div className="relative hidden md:block" ref={containerRef}>
                    <ul className="flex gap-10 font-light text-sm tracking-wide">
                        {navItems.map((item) => (
                            <li key={item.path}>
                                <NavLink
                                    to={item.path}
                                    ref={(el) => (itemRefs.current[item.path] = el)}
                                    className={({ isActive }) =>
                                        isActive
                                            ? "text-white pb-1"
                                            : "text-white hover:text-yellow-400 transition-colors duration-200"
                                    }
                                >
                                    {item.label}
                                </NavLink>
                            </li>
                        ))}
                    </ul>

                    {/* Animated Underline */}
                    <motion.div
                        className="absolute bottom-0 h-[2px] bg-yellow-500"
                        animate={{ left: indicatorStyle.left, width: indicatorStyle.width }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                </div>

                {/* Auth */}
                <div className="flex gap-3">
                    {!user.isLoggedIn ? (
                        <NavLink
                            to="/auth"
                            className="bg-white text-blue-600 font-semibold px-4 py-2 rounded-3xl hover:bg-blue-100 transition"
                        >
                            Log In
                        </NavLink>
                    ) : (
                        <NavLink to="/user">
                            <img
                                src={Goku}
                                alt="User"
                                className="w-10 h-10 rounded-full border-2 border-yellow-500 hover:scale-105 transition-transform"
                            />
                        </NavLink>
                    )}
                </div>
            </div>
        </nav>
    );
}
