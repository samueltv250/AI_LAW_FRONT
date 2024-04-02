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
      <p>Acceda a las <strong>bases de datos más completas de leyes de Panamá</strong>, organizadas por un agente de IA especialmente diseñado. Nuestro servicio ofrece un <strong>motor de búsqueda avanzado</strong> que permite buscar por palabra clave o significado en cada ley, decreto, fallo o documento legal publicado en Panamá. Será dirigido a una versión curada y actualizada diariamente por el agente de IA PanamaAIQ.</p>
      <p>Haga preguntas legales a nuestro avanzado agente de consulta IA y obtenga respuestas con informes sobre las fuentes utilizadas para una total transparencia al instante, ideal para empresas que requieren numerosas consultas legales diarias o desean comprender mejor el panorama legal panameño.</p>      <div className="price-details">
        <h3>Detalles de Precios</h3>
        <p><strong>Membresía para empresas:</strong> $750 al mes por <strong>1000 tokens</strong>. Los tokens se reponen a 1000 con cada pago exitoso. Cada consulta legal consume ~2 tokens y proporciona una respuesta completa con enlaces a todas las fuentes.</p>
        <p>Una vez iniciada la sesión, encontrará un botón para suscribirse mediante PayPal, facilitando la activación de su membresía de manera autónoma.</p>
        <p>Para preguntas contactenos: <a href="mailto:support@panamaaiq.com">support@panamaaiq.com</a></p>

      </div>
    </div>
  );
  
  const serviceInfoEN = (
    <div>
      <p>Gain access to the <strong>most complete databases of Panama's laws</strong>, organized by a specially designed AI agent. Our service provides an <strong>advanced search engine</strong> that allows you to conduct keyword or meaning-based searches on every law, decree, ruling, or legal document published in Panama.</p>
      <p>Ask legal questions to our advanced AI Query agent and get answers with reports on sources used for full transparency in an instant, ideal for companies requiring numerous daily legal consultations or wanting to better understand Panama's legal landscape.</p>
      <div className="price-details">
        <h3>Pricing Details</h3>
        <p><strong>Membership for companies:</strong> $750 per month for <strong>1000 tokens</strong>. Tokens are refilled back to 1000 upon each successful payment. Each legal consultation consumes ~2 tokens and provides a comprehensive answer with links to all sources.</p>
        <p>Upon logging in, you will find a button to subscribe via PayPal, enabling you to autonomously activate your membership.</p>
        <p>For question contact us at: <a href="mailto:support@panamaaiq.com">support@panamaaiq.com</a></p>

      </div>
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