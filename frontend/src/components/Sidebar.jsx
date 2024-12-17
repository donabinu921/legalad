import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaHome, FaFileAlt, FaFileSignature, FaSignOutAlt, FaChevronLeft, FaChevronRight} from 'react-icons/fa';
import '../styles/Sidebar.css';

const Sidebar = ( {onLogout} ) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate()

  const handleToggle = () => {
    setIsCollapsed(!isCollapsed);
    document.querySelector('.content').classList.toggle('collapsed', !isCollapsed);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
  console.log('Token removed:', localStorage.getItem('token')); // Should be null
  onLogout();
  navigate('/auth');
  };

  return (
    <div className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      <ul>
        <li className={`tab ${location.pathname === '/home' ? 'active' : ''}`}>
          <Link to="/home">
            <FaHome className='icon' />
            {!isCollapsed && <span>Home</span>}
          </Link>
        </li>
        <li className={`tab ${location.pathname.startsWith('/document-drafter') ? 'active' : ''}`}>
          <Link to="/document-drafter">
            <FaFileAlt className='icon' />
            {!isCollapsed && <span>Document Drafter</span>}
          </Link>
        </li>
        <li className={`tab ${location.pathname.startsWith('/document-analyser') ? 'active' : ''}`}>
          <Link to="/document-analyser">
            <FaFileSignature className='icon' />
            {!isCollapsed && <span>Document Analyser</span>}
          </Link>
        </li>      
      </ul>
      <div className='logtoggle'>
      <button className="logout-button" onClick={handleLogout}>
            <FaSignOutAlt className='icon' />
      </button>
      <button className="toggle-button" onClick={handleToggle}>
        {isCollapsed ? <FaChevronRight/> : <FaChevronLeft/>}
      </button>
      </div>
    </div>
  );
};

export default Sidebar;