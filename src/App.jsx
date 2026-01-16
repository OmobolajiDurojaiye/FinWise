import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import TaxCalculator from "./pages/TaxCalculator";
import Simulator from "./pages/Simulator";
import Settings from "./pages/Settings";
import WelcomeModal from "./components/WelcomeModal";
import { useAppContext } from "./context/AppContext";

function App() {
  const { user, setUserName } = useAppContext();
  const showModal = !user.name;

  return (
    <>
      <WelcomeModal show={showModal} onSave={setUserName} />
      {!showModal && (
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="tax-calculator" element={<TaxCalculator />} />
            <Route path="simulator" element={<Simulator />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Routes>
      )}
    </>
  );
}

export default App;
