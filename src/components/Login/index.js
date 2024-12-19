import React, { useState } from 'react';
import axios from 'axios';
import "./index.css"

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:5000/api/login', { username, password });
      sessionStorage.setItem('token', response.data.token);
      onLogin(response.data.token);
    } catch (err) {
      setError('Invalid username or password.');
    }
  };

  return (
    <div className='login-container'>
      <form className="login-form" onSubmit={handleLogin}>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          required
          />
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
          />
        {error && <p className='error-msg'>{error}</p>}
        <button type="submit" className="login-btn">Login</button>
      </form>
    </div>
  );
};

export default Login;
