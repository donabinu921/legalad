import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import DocDrafter from './pages/DocDrafter';
import DocAnalyser from './pages/DocAnalyser';
import LegChatbot from './pages/LegChatbot';
import './App.css';

const App = () => {
  return (
    <Router basename="/legalad">
      <div className="app">
        <Sidebar />
        <div className="content">
          <Routes>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/home" element={<Home />} />
            <Route path="/document-drafter" element={<DocDrafter />} />
            <Route path="/document-analyser" element={<DocAnalyser />} />
            {/* /<Route path="/legal-chatbot" element={<LegChatbot />} /> */}
          </Routes>
          <LegChatbot />
        </div>
      </div>
    </Router>
  );
}

export default App;