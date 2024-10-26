import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../utils/firebase';
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import '../styles/Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // Check if the user is logged in on component mount
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });
    return unsubscribe; // Cleanup subscription on unmount
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log('Logged in successfully');
      navigate('/');
    } catch (error) {
      console.error('Error logging in', error);
      alert(error.message);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log('Logged out successfully');
      setIsLoggedIn(false);
    } catch (error) {
      console.error('Error logging out', error);
      alert('Failed to log out.');
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '100px' }}>
      {isLoggedIn ? (
        <div className="logged-in">
          <h2>Welcome!</h2>
          <button onClick={handleLogout}>Sign out</button>
        </div>
      ) : (
        <form onSubmit={handleLogin} className="login-form">
          <div className="header">
            <h2>Login</h2>
            <span 
              className="sign-up" 
              onClick={() => navigate('/signup')}
            >
              Sign up
            </span>
          </div>
          <div>
            <label htmlFor="email">Your email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="password">Your password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Login</button>
        </form>
      )}
    </div>
  );
};

export default Login;
