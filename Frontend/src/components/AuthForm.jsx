import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios'; // Make sure to import axios
import '../styles/AuthForm.css'; // This import should now work correctly

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  
  // State for form inputs
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  
  // State for handling errors from the backend
  const [error, setError] = useState('');

  // The base URL of your Spring Boot API
  const API_URL = 'http://localhost:8081/api/auth';

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission
    setError(''); // Clear any previous errors

    try {
      if (isLogin) {
        // --- LOGIN LOGIC ---
        // Send a POST request to the login endpoint
        const response = await axios.post(`${API_URL}/login`, { email, password });
        
        console.log('Login successful:', response.data);
        navigate("/dashboard");
        // After a successful login, you would typically redirect the user
        // to a new page, like a dashboard.
        // For example:
        // window.location.href = '/dashboard';

      } else {
        // --- SIGN UP LOGIC ---
        // Send a POST request to the register endpoint
        const response = await axios.post(`${API_URL}/register`, { name, email, password });

        console.log('Signup successful:', response.data);
        alert('Signup Successful! Please login to continue.');
        
        // Switch to the login form after a successful registration
        setIsLogin(true);
        // Clear the form fields
        setName('');
        setEmail('');
        setPassword('');
      }
    } catch (err) {
      // If the API returns an error, display it to the user
      const errorMessage = err.response ? err.response.data : 'An error occurred. Please try again.';
      console.error('Authentication error:', errorMessage);
      setError(String(errorMessage)); // Ensure error is a string
    }
  };

  return (
    <>
      {/* Login/Signup box */}
      <div className="auth-container">
        {/* Changed the div to a form and added the onSubmit handler */}
        <form className="auth-box" onSubmit={handleSubmit}>
          <h1 className="auth-title">{isLogin ? 'LOGIN' : 'SIGN UP'}</h1>
          <p className="auth-subtitle">
            {isLogin ? 'Welcome Back!!!!' : 'Start Your Journey With Us!!!!'}
          </p>

          {!isLogin && (
            <div className="input-group">
              <label>Enter Name</label>
              {/* Added value and onChange to control the input */}
              <input 
                type="text" 
                placeholder="Your Name" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                required 
              />
            </div>
          )}
          <div className="input-group">
            <label>Enter Email</label>
            <input 
              type="email" 
              placeholder="Your Email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>
          <div className="input-group">
            <label>Enter Password</label>
            <input 
              type="password" 
              placeholder="Your Password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Display error message if it exists */}
          {error && <p className="error-message" style={{color: 'red', textAlign: 'center'}}>{error}</p>}

          {/* Added type="submit" to the button */}
          <button type="submit" className="auth-button">
            {isLogin ? 'Login' : 'Sign Up'}
          </button>

          <p 
            className="toggle-form" 
            onClick={() => {
              setIsLogin(!isLogin);
              setError(''); // Clear errors when toggling form
            }}
          >
            {isLogin ? "Don't have an account? Sign Up" : 'Already a user? Login'}
          </p>
        </form>
      </div>
    </>
  );
};

export default AuthForm;