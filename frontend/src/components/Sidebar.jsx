// src/components/Sidebar.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaFileAlt, FaFileSignature, FaRobot } from 'react-icons/fa';
import '../styles/Sidebar.css';

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleToggle = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      <ul>
        <li className='tab'>
          <FaHome className='icon' />
          {!isCollapsed && <Link to="/">Home</Link>}
        </li>
        <li className='tab'>
          <FaFileAlt className='icon' />
          {!isCollapsed && <Link to="/document-drafter">Document Drafter</Link>}
        </li>
        <li className='tab'>
          <FaFileSignature className='icon' />
          {!isCollapsed && <Link to="/document-analyser">Document Analyser</Link>}
        </li>
        <li className='tab'>
          <FaRobot className='icon' />
          {!isCollapsed && <Link to="/legal-chatbot">Legal Chatbot</Link>}
        </li>
      </ul>

      {/* Toggle button */}
      <div className='toggle-button' onClick={handleToggle}>
        {isCollapsed ? '>' : '<'}
      </div>
    </div>
  );
};

export default Sidebar;
