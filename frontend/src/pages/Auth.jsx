import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/Auth.css';

const Auth = ({ onAuthSuccess }) => {  
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ username: '', password: '' });

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    setFormData({ username: '', password: '' });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = isLogin ? 'http://localhost:5000/api/login' : 'http://localhost:5000/api/signup';
    try {
      const response = await axios.post(url, formData);
      const { message, token } = response.data; // Destructure token and message
  
      if (isLogin) {
        localStorage.setItem('token', token); // Store token in localStorage
        toast.success(`${message}, Logging you in...`);
      } else {
        toast.success(`${message}, You can now log in!`);
      }
  
      setTimeout(() => {
        onAuthSuccess(); // Redirect or perform your action
      }, 1000); // Delay for 1 second
    } catch (error) {
      if (error.response) {
        toast.error(`Error: ${error.response.data.error}`);
      } else {
        console.error('Error:', error.message);
        toast.error('An error occurred. Please try again.');
      }
    }
  };
  

  return (
    <div className="auth-container">
      <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder='Username'
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder='Password'
            required
          />
        </div>
        <button type="submit" className="auth-button">
          {isLogin ? 'Login' : 'Sign Up'}
        </button>
      </form>
      <p className="toggle-link" onClick={toggleAuthMode}>
        {isLogin ? 'Don\'t have an account? Sign Up' : 'Already have an account? Login'}
      </p>
      <ToastContainer 
        position="top-right" 
        autoClose={5000} 
        hideProgressBar={false} 
        newestOnTop={false} 
        closeOnClick 
        rtl={false} 
        pauseOnFocusLoss 
        draggable 
        pauseOnHover 
      />
    </div>
  );
};

export default Auth;