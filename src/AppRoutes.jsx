import { Routes, Route, Navigate, useLocation } from "react-router-dom"
import Navbar from "./components/common/Navbar"
import HomePage from "./components/pages/HomePage"
import CharacterList from "./components/pages/CharacterListPage"
import TeamBuilderPage from "./components/pages/TeamBuilderPage"
import BattlePage from "./components/pages/BattlePage"
import AboutThisProject from "./components/pages/AboutThisProject"
import UserProfile from "./components/auth/UserProfile"
import AuthPage from "./components/pages/AuthPage"
import { useSelector } from "react-redux"

export default function AppRoutes() {
  const location = useLocation()
  const hideNavbar = ["/about", "/auth"].includes(location.pathname)
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)

  return (
    <>
      {!hideNavbar && <Navbar />}
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/characters" element={<CharacterList />} />
        <Route path="/about" element={<AboutThisProject />} />
        <Route path="/auth" element={<AuthPage />} />

        {/* Protected routes — only logged-in warriors allowed */}
        <Route path="/team" element={
          isAuthenticated ? (<TeamBuilderPage />)
            : (<Navigate to="/auth" replace />)} />

        <Route path="/battle" element={
          isAuthenticated ? (<BattlePage />)
            : (<Navigate to="/auth" replace />)} />

        <Route path="/user" element={
          isAuthenticated ? (<HomePage />)
            : (<Navigate to="/" replace />)} />

        {/* Catch-all redirect */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  )
}
