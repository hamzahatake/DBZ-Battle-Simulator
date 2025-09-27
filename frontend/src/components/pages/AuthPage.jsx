import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Auth from "../../assets/Auth.webp";
import Login from "../auth/Login";
import Registration from "../auth/Registration";

export default function AuthPage() {
    const [showRegister, setShowRegister] = useState(false);

    return (
        <div className="relative h-screen w-full overflow-hidden bg-gray-900 text-white">

            <div className="absolute top-0 left-0 w-full z-50 px-6 py-4 text-white ">
                <Link to="/" className="text-xl font-bold tracking-wide text-white">
                    DBZ Battles
                </Link>
            </div>

            {/* Artwork Panel */}
            <motion.div
                key={`artwork-${showRegister ? "right" : "left"}`}
                initial={{ x: showRegister ? 0 : 0 }}
                animate={{ x: showRegister ? "100%" : "0%" }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className="absolute top-0 left-0 w-full md:w-1/2 h-full z-10"
            >
                <img
                    src={Auth}
                    alt="DBZ Artwork"
                    className="w-full h-full object-cover object-top"
                />

                {/* Register Button */}
                {!showRegister && (
                    <button
                        onClick={() => setShowRegister(true)}
                        className="absolute bottom-6 right-6 bg-yellow-400 text-black font-bold py-2 px-4 rounded-xl 
                            shadow-lg hover:bg-yellow-300 transition cursor-pointer"
                    >
                        Register →
                    </button>
                )}
            </motion.div>

            {/* Login Form */}
            <AnimatePresence>
                {!showRegister && (
                    <motion.div
                        key="login"
                        initial={{ x: "100%" }}
                        animate={{ x: "0%" }}
                        exit={{ x: "100%" }}
                        transition={{ duration: 0.6, ease: "easeInOut" }}
                        className="absolute top-0 right-0 md:w-1/2 w-full h-full z-20 flex items-center justify-center p-8 md:p-12 lg:p-16 bg-gray-900">
                        <Login />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Registration Form */}
            <AnimatePresence>
                {showRegister && (
                    <motion.div
                        key="register"
                        initial={{ x: "-100%" }}
                        animate={{ x: "0%" }}
                        exit={{ x: "-100%" }}
                        transition={{ duration: 0.6, ease: "easeInOut" }}
                        className="absolute top-0 left-0 md:w-1/2 w-full h-full z-30 flex items-center justify-center p-8 md:p-12 lg:p-16 bg-gray-800"
                    >
                        <div className="w-full">
                            <Registration />

                            {/* Back to Login */}
                            <button
                                onClick={() => setShowRegister(false)}
                                className="absolute bottom-6 right-6 bg-yellow-400 text-black font-bold py-2 px-4 rounded-xl
                                    shadow-lg hover:bg-yellow-300 transition cursor-pointer"
                            >
                                ← Back to Login
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
