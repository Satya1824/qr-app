import Auth from "./pages/Auth";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Events from "./pages/Events";
import OnSpot from "./pages/onSpot";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/events" element={<Events />} />
        <Route path="/onspot" element={<OnSpot />} />
      </Routes>
    </>
  );
}

export default App;
