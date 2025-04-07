import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaHome, FaFileAlt, FaFileSignature, FaRobot, FaSignOutAlt, FaChevronLeft, FaChevronRight, FaSearch } from 'react-icons/fa';

const Sidebar = ({ onLogout }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleToggle = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleLogout = () => {
    onLogout();
    navigate('/auth');
  };

  return (
    <div
      className={`flex flex-col h-screen bg-white shadow-md transition-all duration-300 ease-in-out`}
      style={{ minWidth: isCollapsed ? '80px' : '300px' }} // Ensures minimum size for collapsed state
    >
      <ul className="flex-grow space-y-2 p-3">
        {[
          { path: '/home', label: 'Home', icon: <FaHome /> },
          { path: '/document-drafter', label: 'Document Drafter', icon: <FaFileAlt /> },
          { path: '/document-analyser', label: 'Document Analyser', icon: <FaFileSignature /> },
          { path: '/chatbot', label: 'Legal Chatbot', icon: <FaRobot /> },
          // { path: '/law-lookup', label: 'Legal Lookup', icon: <FaSearch /> },
        ].map((tab) => (
          <li
            key={tab.path}
            className={`flex items-center p-3 rounded-md ${
              location.pathname.startsWith(tab.path)
                ? 'bg-blue-500 text-white'
                : 'bg-blue-100 text-blue-500'
            }`}
          >
            <Link to={tab.path} className="flex items-center w-full">
              <div className="text-xl flex items-center justify-center w-12">
                {tab.icon}
              </div>
              <span
                className={`transition-all duration-300 ease-in-out ${isCollapsed ? 'opacity-0' : 'opacity-100'}`}
                style={{
                  visibility: isCollapsed ? 'hidden' : 'visible',
                  transition: 'opacity 0.3s, visibility 0.3s', // Ensure smooth fade and visibility
                }}
              >
                {!isCollapsed && <span className="ml-3 font-medium">{tab.label}</span>}
              </span>
            </Link>
          </li>
        ))}
      </ul>
      <div className="flex flex-col items-center p-3 space-y-2">
        <button
          className="flex items-center justify-center w-full p-3 rounded-md bg-blue-100 text-blue-500"
          onClick={handleLogout}
        >
          <FaSignOutAlt className="text-xl" />
          <span
            className={`transition-all duration-300 ease-in-out ${isCollapsed ? 'opacity-0' : 'opacity-100'}`}
            style={{
              visibility: isCollapsed ? 'hidden' : 'visible',
              transition: 'opacity 0.3s, visibility 0.3s',
            }}
          >
            {!isCollapsed && <span className="ml-3 font-medium">Logout</span>}
          </span>
        </button>
        <button
          className="flex items-center justify-center w-full p-3 rounded-md bg-blue-100 text-blue-500"
          onClick={handleToggle}
        >
          {isCollapsed ? <FaChevronRight className="text-xl" /> : <FaChevronLeft className="text-xl" />}
          <span
            className={`transition-all duration-300 ease-in-out ${isCollapsed ? 'opacity-0' : 'opacity-100'}`}
            style={{
              visibility: isCollapsed ? 'hidden' : 'visible',
              transition: 'opacity 0.3s, visibility 0.3s',
            }}
          >
            {!isCollapsed && <span className="ml-3 font-medium">Collapse</span>}
          </span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;