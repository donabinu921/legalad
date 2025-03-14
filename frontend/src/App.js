import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import DocDrafter from './pages/DocDrafter';
import DocAnalyser from './pages/DocAnalyser';
import LegChatbot from './pages/LegChatbot';
import Will from './components/Will';
import Divorce from './components/Divorce';
import Lease from './components/Lease';
import Nda from './components/Nda';
import Auth from './pages/Auth';
import './App.css';
import Partnership from './components/Partnership';
import LawLookup from './pages/LawLookup';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    // Load authentication state from localStorage
    return localStorage.getItem('isAuthenticated') === 'true';
  });

  // Update localStorage whenever isAuthenticated changes
  useEffect(() => {
    localStorage.setItem('isAuthenticated', isAuthenticated);
  }, [isAuthenticated]);

  const handleAuthSuccess = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('isAuthenticated');
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
                <Route path="/chatbot" element={<LegChatbot />} />
                <Route path="*" element={<Navigate to="/home" />} />
                <Route path="/will" element={<Will />} />
                <Route path="/divorce-agreement" element={<Divorce />} />
                <Route path="/lease-agreement" element={<Lease />} />
                <Route path="/nda" element={<Nda />} />
                <Route path='/partnership' element={<Partnership />} />
                <Route path ="/law-lookup" element={<LawLookup />} />
              </>
            )}
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;