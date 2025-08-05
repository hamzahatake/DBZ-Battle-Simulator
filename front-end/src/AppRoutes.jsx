import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/common/Navbar";
import HomePage from "./components/pages/HomePage";
import CharacterList from "./components/pages/CharacterListPage";
import TeamBuilderPage from "./components/pages/TeamBuilderPage";
import BattlePage from "./components/pages/BattlePage";
import AboutThisProject from "./components/pages/AboutThisProject";
import AuthForm from "./components/pages/AuthPage";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

export default function AppRoutes() {
  const location = useLocation();
  const dispatch = useDispatch();
  const savedTeams = useSelector((state) => state.teams.savedTeams);
  const hideNavbar = ["/about", "/auth"].includes(location.pathname);

  return (
    <>
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/characters" element={<CharacterList />} />
        <Route path="/team" element={<TeamBuilderPage />} />
        <Route path="/battle" element={<BattlePage />} />
        <Route path="/about" element={<AboutThisProject />} />
        <Route path="/auth" element={<AuthForm />} />
      </Routes>
    </>
  );
}
