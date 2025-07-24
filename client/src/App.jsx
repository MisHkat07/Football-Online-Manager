import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LoginRegister from "./pages/LoginRegister";
import MyTeam from "./pages/MyTeam";
import TransferMarket from "./pages/TransferMarket";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import "./App.css";
import videoBackground from "./assets/images/mixkit-player-dribbling-in-a-one-on-one-in-a-soccer-43484-hd-ready.mp4";

const App = () => {
  const token = localStorage.getItem("token");

  return (
    <>
      <video
        autoPlay
        loop
        muted
        playsInline
        src={videoBackground}
        className="video-bg"
      ></video>

      <Router>
        <Routes>
          <Route
            path="*"
            element={
              <ProtectedRoute>
                <Navbar />
                <Routes>
                  <Route path="/" element={<MyTeam />} />
                  <Route path="/market" element={<TransferMarket />} />
                </Routes>
              </ProtectedRoute>
            }
          />
          <Route
            path="/auth"
            element={token ? <Navigate to="/" /> : <LoginRegister />}
          />
        </Routes>
      </Router>
    </>
  );
};

export default App;
