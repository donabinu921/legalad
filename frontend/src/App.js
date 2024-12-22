import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import DocDrafter from './pages/DocDrafter';
import DocAnalyser from './pages/DocAnalyser';
import LegChatbot from './pages/LegChatbot';
import Will from './components/Will';
import Auth from './pages/Auth'; // Login/Signup component
import './App.css';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Function to simulate login/signup success
  const handleAuthSuccess = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <Router basename="/legalad">
      <div className="app">
        {isAuthenticated && <Sidebar onLogout={handleLogout} />}
        <div className="content">
          <Routes>
            {!isAuthenticated ? (
              <>
                <Route path="/auth" element={<Auth onAuthSuccess={handleAuthSuccess} />} />
                <Route path="*" element={<Navigate to="/auth" />} />
              </>
            ) : (
              <>
                <Route path="/" element={<Navigate to="/home" />} />
                <Route path="/home" element={<Home />} />
                <Route path="/document-drafter" element={<DocDrafter />} />
                <Route path="/document-analyser" element={<DocAnalyser />} />
                <Route path="*" element={<Navigate to="/home" />} />
                <Route path="/will" element={<Will />} />
              </>
            )}
          </Routes>
          {isAuthenticated && <LegChatbot />}
        </div>
      </div>
    </Router>
  );
};

export default App;
