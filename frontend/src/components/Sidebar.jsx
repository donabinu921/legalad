import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaFileAlt, FaFileSignature, FaRobot } from 'react-icons/fa';
import '../styles/Sidebar.css';

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();

  const handleToggle = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      <ul>
        <li className={`tab ${location.pathname === '/home' ? 'active' : ''}`}>
          <FaHome className='icon' />
          {!isCollapsed && <Link to="/home">Home</Link>}
        </li>
        <li className={`tab ${location.pathname.startsWith('/document-drafter') ? 'active' : ''}`}>
          <FaFileAlt className='icon' />
          {!isCollapsed && <Link to="/document-drafter">Document Drafter</Link>}
        </li>
        <li className={`tab ${location.pathname.startsWith('/document-analyser') ? 'active' : ''}`}>
          <FaFileSignature className='icon' />
          {!isCollapsed && <Link to="/document-analyser">Document Analyser</Link>}
        </li>
        {/* <li className={`tab ${location.pathname.startsWith('/legal-chatbot') ? 'active' : ''}`}>
          <FaRobot className='icon' />
          {!isCollapsed && <Link to="/legal-chatbot">Legal Chatbot</Link>}
        </li> */}
      </ul>

      {/* Toggle button */}
      <div className='toggle-button' onClick={handleToggle}>
        {isCollapsed ? '>' : '<'}
      </div>
    </div>
  );
};

export default Sidebar;
