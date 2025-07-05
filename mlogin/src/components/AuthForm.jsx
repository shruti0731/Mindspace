import React, { useState } from 'react';
import '../styles/AuthForm.css';

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <>
      {/* Login/Signup box */}
      <div className="auth-container">
        <div className="auth-box">
          <h1 className="auth-title">{isLogin ? 'LOGIN' : 'SIGN UP'}</h1>
          <p className="auth-subtitle">
            {isLogin ? 'Welcome Back!!!!' : 'Start Your Journey With Us!!!!'}
          </p>

          {!isLogin && (
            <div className="input-group">
              <label>Enter Name</label>
              <input type="text" placeholder="Your Name" />
            </div>
          )}
          <div className="input-group">
            <label>Enter Email</label>
            <input type="email" placeholder="Your Email" />
          </div>
          <div className="input-group">
            <label>Enter Password</label>
            <input type="password" placeholder="Your Password" />
          </div>

          <button className="auth-button">{isLogin ? 'Login' : 'Sign Up'}</button>

          <p className="toggle-form" onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? "Don't have an account? Sign Up" : 'Already a user? Login'}
          </p>
        </div>
      </div>
    </>
  );
};

export default AuthForm;
