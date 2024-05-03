import logo from "./logo.svg";
import "./App.css";
import LoginScreen from "./layouts/LoginScreen";
import { Navigate, Route, Routes } from "react-router-dom";
import ProtectRoute from "./components/ProtectRoute";
import DashboardScreen from "./layouts/DashboardScreen";
import LogScreen from "./layouts/LogScreen";
// import TawkMessengerReact from "@tawk.to/tawk-messenger-react";
import FilteredLogScreen from "./layouts/FilteredLogScreen";
import OngoingFilterScreen from "./layouts/OngoingFilterScreen";

function App() {
  function privateRote(Screens) {
    // cosnt user =
    if (localStorage.getItem("user") === null) {
      return <Navigate to="/login" replace={true} />;
    }
    return <Screens />;
  }
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={<Navigate to={"/dashboard"} replace={true} />}
        />

        <Route path="/login" Component={LoginScreen} />
        <Route element={<ProtectRoute />}>
          <Route exact path="/dashboard" element={<DashboardScreen />} />
          <Route exact path="/logs" element={<LogScreen />} />
          <Route exact path="/filtered-logs" element={<FilteredLogScreen />} />
          <Route exact path="/ongoing-logs" element={<OngoingFilterScreen />} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default App;
