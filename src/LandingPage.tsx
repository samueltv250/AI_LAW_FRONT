import React from 'react';
import './LandingPage.css'; // Ensure this CSS file is correctly linked in your project

const LandingPage = ({ onLoginClick, onRegisterClick }: { onLoginClick: () => void, onRegisterClick: () => void }) => {
  return (
    <div className="landing-page dark-theme">
      <header className="page-header">
        <h1>Panamá AI Query</h1>
        <p>Chatea con la base de datos legales más completa de Panamá.</p>
      </header>
      <main className="content">
        <section className="offer-section">
          <h3 className="section-title">¿Qué Ofrecemos?</h3>
          <p>Acceso a la <strong>base de datos de leyes de Panamá más completa</strong>, organizada por un agente de inteligencia artificial diseñado específicamente. Nuestro servicio proporciona un <strong>motor de búsqueda avanzado</strong> que permite realizar búsquedas por palabra clave o por significado en cada ley, fallo, decreto, resolución o documento legal publicado en Panamá.</p>
          <p>Formula preguntas legales a nuestro avanzado <strong>Agente de consultas AI</strong> y obtén respuestas con informes sobre las fuentes utilizadas para total transparencia de manera instantánea, ideal para empresas que requieren numerosas consultas legales diarias o que desean comprender mejor el panorama legal de Panamá.</p>
        </section>
        <section className="pricing-section">
          <h3 className="section-title">Detalles de Precios</h3>
          <p><strong>Membresía para empresas:</strong> $1000 por mes por <strong>1000 tokens</strong>. Los tokens se reponen a 1000 con cada pago exitoso. </p>
          <p>Cada consulta legal consume aproximadamente 1 token y proporciona una respuesta completa con enlaces a todas las fuentes.</p>
          <p>Todas las membresias incluyen acceso ilimitado al motor de búsqueda</p>
          <p>Dependiendo de las necesidades de la empresa tambien podemos crear planes personalizados</p>

        </section>

        <section className="pricing-section">
          <h3 className="section-title">Activacion de Cuenta</h3>
          <p>Al iniciar sesión, encontrarás un botón para suscribirte mediante PayPal, lo que te permitirá activar tu membresía de forma autónoma.</p>

          <p>Para preguntas o para activar una cuenta atravez de transaccion bancaria contáctanos en: <a className="email-link" href="mailto:support@panamaaiq.com">support@panamaaiq.com</a></p>
        </section>
        <section className="local-storage-section">
          <h3 className="section-title">Almacenamiento Local</h3>
          <p>Por razones de seguridad, todos los datos se almacenan localmente en tu navegador.</p>
        </section>
        <div className="action-buttons">
          <button onClick={onLoginClick} className="submit-btn">Login</button>
          <button onClick={onRegisterClick} className="submit-btn">Registrarse</button>
        </div>
        <section className="local-storage-section">
          {/* <h3 className="section-title">Demo</h3>
          <p>Por razones de seguridad, todos los datos se almacenan localmente en tu navegador.</p> */}

          <h3 className="section-title">Demo del systema</h3>
          <div className="responsive-video-wrapper">
            <iframe 
              className="responsive-video"
              src="https://www.youtube.com/embed/aLLkkhw6dvs" // Replace [YourVideoID] with the actual ID
              title="YouTube video player" 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen>
            </iframe>
          </div>

        </section>

      </main>
     
      <footer className="page-footer">
        <p>Contacta con nosotros para activar una cuenta: <a className="email-link" href="mailto:support@panamaaiq.com">support@panamaaiq.com</a></p>
        <p>Panamá AI Query - Derechos Reservados</p>
      </footer>
    </div>
  );
};

export default LandingPage;
