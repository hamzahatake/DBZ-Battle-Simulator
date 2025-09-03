import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./AppRoutes";
import { SelectingCharacter } from "./context/selectedCharacters";


import { Provider } from "react-redux";
import { store, persistor } from "./app/store";
import { PersistGate } from "redux-persist/integration/react";

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <SelectingCharacter>
            <AppRoutes />
          </SelectingCharacter>
        </Router>
      </PersistGate>
    </Provider>
  );
}
