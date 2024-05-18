import React, { useState } from 'react';
import './Login.css'; // Import a CSS file
import  {  useAuth } from "./store/store";
import Avatar from "./components/Avatar/Avatar";
interface LoginProps {
  onLogin: () => void;
  onRegister: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin, onRegister }) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [avatar, name, setUser] = useAuth((state) => [
    state.user.avatar,
    state.user.name,
    state.setUser,
  ]);
  const handleLogin = async () => {
    const response = await fetch('http://127.0.0.1:5090/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username: email, password })
    });

    if (response.ok) {
      const data = await response.json();
      const token = data.access_token;
      const user = data.user;
      const first_name =  user.first_name;
      const last_name = user.last_name;
      const tokens = JSON.stringify(data.tokens);
      

      localStorage.setItem('token', token);
      localStorage.setItem('first_name', first_name);
      localStorage.setItem('last_name', last_name);
      localStorage.setItem('full_name', `${first_name} ${last_name}`);
      localStorage.setItem('email', email);
      localStorage.setItem('tokens', tokens);
      localStorage.setItem('selectedItem', "Demanda");
      setUser({
        avatar,
        name: localStorage.getItem('full_name') || '',
        email: localStorage.getItem('email') || '',
        tokens: localStorage.getItem('tokens') || '',

      });
      onLogin();
    } else {
      const errorData = await response.json(); // Assuming the error message is in JSON format
      window.alert(`Login failed: ${errorData.message || 'Unknown error'}`); // Show the error message or a default one
  
    }
  };

  return (
    <div className="login-container">
      <div className="avatar-container">

              <Avatar
          className="avatar  h-20 w-20 ring-2 rounded-full object-cover ring-gray-300 p-1 dark:ring-gray-500"
          src={avatar}
        >
        </Avatar>
        </div>
      <h2 className="centered-title">Login</h2>
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
      <button onClick={onRegister} className="register-btn">Ir a Registrarse</button>
    </div>
  );
};

export default Login;