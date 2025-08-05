import { BrowserRouter as Router } from "react-router-dom"
import AppRoutes from "./AppRoutes"
import { SelectingCharacter } from "./context/selectedCharacters";

export default function App() {
  return (
    <Router>
      <SelectingCharacter>
        <AppRoutes />
      </SelectingCharacter>
    </Router>
  );
}
