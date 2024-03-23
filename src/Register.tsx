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
  const [language, setLanguage] = useState<'EN' | 'ES'>('ES');

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
      const error = await response.json(); // Assuming the server responds with JSON containing an error message
      window.alert(`Registration failed: ${error.message || 'Unknown error'}`);
  
    }
  };
  const serviceInfoES = (
    <div>
      <p>Acceda a las bases de datos más completas de leyes de Panamá, organizadas por un agente de IA especialmente diseñado. Nuestro servicio ofrece un motor de búsqueda avanzado que permite buscar por palabra clave o significado en cada ley, decreto, fallo o documento legal publicado en Panamá. Será dirigido a una versión curada y actualizada diariamente por el agente de IA PanamaAIQ. Pregunte sobre leyes y reciba respuestas con fuentes para total transparencia, ideal para empresas que requieren numerosas consultas legales diarias o desean comprender mejor el panorama legal panameño.</p>
    </div>
  );

  const serviceInfoEN = (
    <div>
      <p>Gain access to the most complete databases of Panama's laws, organized by a specially designed AI agent. Our service provides an advanced search engine that allows you to conduct keyword or meaning-based searches on every law, decree, ruling, or legal document published in Panama. You'll be directed to a curated version that is updated daily by the PanamaAIQ AI agent. Ask questions about laws and get answers with sources for full transparency, ideal for companies requiring numerous daily legal consultations or wanting to better understand Panama's legal landscape.</p>
    </div>
  );
  return (
    <div className="register-page">
      
    <div className="content-container">
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
      <div className="info-container">
        <div className="language-tabs">
          <button onClick={() => setLanguage('ES')}>ES</button>
          <button onClick={() => setLanguage('EN')}>EN</button>
        </div>
        <div className="service-info">
          {language === 'ES' ? serviceInfoES : serviceInfoEN}
        </div>
      </div>
 

    </div>
  </div>
  
  );
};

export default Register;