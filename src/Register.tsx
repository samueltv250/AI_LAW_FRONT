import React, { useState, FormEvent } from 'react';
import './Register.css'; // Import the same CSS file

interface RegisterProps {
  onLogin: () => void;
  onRegister: () => void;
}

const Register: React.FC<RegisterProps> = ({ onLogin, onRegister }) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');

  const handleRegister = async (event: FormEvent) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      window.alert('Passwords do not match');
      return;
    }

    const response = await fetch('/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username: email, password, firstName, lastName }) // Include firstName and lastName
    });

    if (response.ok) {
      const data = await response.json();
      window.alert('Registration successful: ' + data.message);
      onRegister();
    } else {
      window.alert('Registration failed');
    }
  };

  return (
    <div className="register-container">
      <h2 className="centered-title">Register</h2>

        <div className="input-group">
          <label>First Name:</label>
          <input 
            type="text" 
            value={firstName} 
            onChange={(e) => setFirstName(e.target.value)} 
            required 
          />
        </div>
        <div className="input-group">
          <label>Last Name:</label>
          <input 
            type="text" 
            value={lastName} 
            onChange={(e) => setLastName(e.target.value)} 
            required 
          />
        </div>
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
        <div className="input-group">
          <label>Confirm Password:</label>
          <input 
            type="password" 
            value={confirmPassword} 
            onChange={(e) => setConfirmPassword(e.target.value)} 
            required 
          />
        </div>
        <button onClick={handleRegister} className="submit-btn">Register</button>
      <button onClick={onLogin} className="login-btn">Go to Login</button>
    </div>
  );
};

export default Register;