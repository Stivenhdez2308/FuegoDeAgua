import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import CatalogPage from "./pages/CatalogPage";
import CustomizerPage from "./pages/CustomizerPage";
import ForumPage from "./pages/ForumPage";
import ProfilePage from "./pages/ProfilePage";
import MyDesignsPage from "./pages/MyDesignsPage";
import VisualizeCandlePage from "./pages/VisualizeCandlePage";
import ActivityPage from "./pages/ActivityPage";
import Navbar from "./components/Navbar";
import { AuthProvider } from "./features/auth/AuthProvider";
import Login from "./features/auth/Login";
import Register from "./features/auth/Register";
import PrivateRoute from "./features/auth/PrivateRoute";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/catalog" element={<CatalogPage />} />
          <Route path="/customizer" element={<PrivateRoute><CustomizerPage /></PrivateRoute>} />
          <Route path="/forum" element={<PrivateRoute><ForumPage /></PrivateRoute>} />
          <Route path="/profile" element={<PrivateRoute><ProfilePage /></PrivateRoute>} />
          <Route path="/my-designs" element={<PrivateRoute><MyDesignsPage /></PrivateRoute>} />
          <Route path="/visualize" element={<PrivateRoute><VisualizeCandlePage /></PrivateRoute>} />
          <Route path="/activity" element={<PrivateRoute><ActivityPage /></PrivateRoute>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
