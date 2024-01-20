import React, { useState } from 'react';
import './Login.css'; // Import a CSS file

interface LoginProps {
  onLogin: () => void;
  onRegister: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin, onRegister }) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleLogin = async () => {
    const response = await fetch('http://127.0.0.1:5040/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username: email, password })
    });

    if (response.ok) {
      const data = await response.json();
      const token = data.access_token;
      localStorage.setItem('token', token);
      onLogin();
    } else {
      console.error('Login failed');
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <div>
        <div className="input-group">
          <label>Email:</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
        </div>
        <div className="input-group">
          <label>Password:</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
        </div>
        <button onClick={handleLogin} className="submit-btn">Login</button>
      </div>
      <button onClick={onRegister} className="register-btn">Go to Register</button>
    </div>
  );
};

export default Login;