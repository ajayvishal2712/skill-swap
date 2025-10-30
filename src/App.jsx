// App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard/dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
     <Route path="/" element={<Navigate to="/signup" />} />
<Route path="/signup" element={<SignUp />} />
<Route path="/login" element={<Login />} />
<Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
<Route path="*" element={<Navigate to="/login" />} />

        
      </Routes>
    </Router>
  );
}

export default App;

