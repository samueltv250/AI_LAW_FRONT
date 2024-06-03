import React, { CSSProperties } from 'react';

const BetaAnnouncement = () => {
  const styles: { [key: string]: CSSProperties } = {
    section: {
      marginBottom: '40px',
      padding: '20px',
      border: '1px solid #c69354',
      borderRadius: '5px',
      backgroundColor: '#e2d5c9',
    },
    sectionTitle: {
      fontSize: '24px',
      fontWeight: 'bold',
      marginBottom: '10px',
      color: '#c69354',
    },
    paragraph: {
      fontSize: '16px',
      lineHeight: '1.6',
      color: '#202224',
    },
    emailLink: {
      color: '#c69354',
      textDecoration: 'none',
    },
  };

  return (
    <section style={styles.section}>
      <h3 style={styles.sectionTitle}>Anuncio Beta</h3>
      <p style={styles.paragraph}>
        La aplicación está actualmente en <strong>beta</strong>. Esto significa que todavía estoy trabajando continuamente en mejoras. ¡Estoy emocionado de anunciar que pronto lanzaré un redactor de documentos con IA!
      </p>
      <p style={styles.paragraph}>
        Agradezco cualquier comentario o solicitud de características que puedan tener. Por favor, envíenlos a mi equipo de soporte a{' '}
        <a style={styles.emailLink} href="mailto:support@panamaaiq.com">support@panamaaiq.com</a>.
      </p>
    </section>
  );
};

const LandingPage = ({ onLoginClick, onRegisterClick }: { onLoginClick: () => void, onRegisterClick: () => void }) => {
  const styles: { [key: string]: CSSProperties } = {
    body: {
      fontFamily: 'Arial, sans-serif',
      lineHeight: '1.6',
      backgroundColor: '#e2d5c9',
      color: '#000',
      margin: 0,
      padding: 0,
    },
    strong: {
      fontWeight: 'bold',
      color: '#c69354',
    },
    landingPage: {
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      backgroundColor: '#e2d5c9',
      color: '#000',
    },
    pageHeader: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '1em',
      background: '#202224',
      color: '#ffffff',
      position: 'relative',
    },
    logo: {
      width: '100px',
      height: 'auto',
      marginRight: '20px',
    },
    pageHeaderContent: {
      display: 'flex',
      alignItems: 'center',
    },
    pageHeaderText: {
      display: 'flex',
      flexDirection: 'column',
    },
    pageHeaderTitle: {
      fontSize: '32px',
      fontWeight: 'bold',
      color: '#f0c674',
    },
    pageHeaderSubtitle: {
      fontSize: '18px',
      color: '#ffffff',
    },
    pageHeaderButtons: {
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
    },
    button: {
      backgroundColor: '#c69354',
      color: '#1a1a1a',
      borderRadius: '5px',
      border: 'none',
      padding: '10px 20px',
      cursor: 'pointer',
      textDecoration: 'none',
      transition: 'background-color 0.3s ease',
      fontWeight: 'bold',
      fontFamily: 'Arial, sans-serif',
    },
    buttonHover: {
      backgroundColor: '#a5783f',
      transform: 'scale(1.02)',
    },
    buttonHoverOut: {
      backgroundColor: '#a5783f',
      transform: 'scale(0.98039216)',
    },
    content: {
      flex: 1,
      padding: '20px',
      overflowY: 'auto',
      backgroundColor: '#e2d5c9',
      color: '#202224',
    },
    sectionTitle: {
      fontSize: '24px',
      borderBottom: '2px solid #c69354',
      paddingBottom: '5px',
      marginBottom: '15px',
    },
    section: {
      marginBottom: '40px',
    },
    subsectionTitle: {
      fontSize: '20px',
      marginBottom: '10px',
      position: 'relative',
      paddingBottom: '5px',
      display: 'inline-block',
    },
    subsectionTitleUnderline: {
      content: '""',
      display: 'block',
      height: '2px',
      backgroundColor: '#c69354',
      position: 'absolute',
      bottom: 0,
      left: 0,
      width: '100%',
    },
    subsection: {
      marginBottom: '20px',
    },
    responsiveVideoWrapper: {
      position: 'relative',
      paddingTop: '56.25%',
      marginBottom: '20px',
    },
    responsiveVideo: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
    },
    actionButtons: {
      textAlign: 'center',
      margin: '40px 0',
    },
    emailLink: {
      color: '#c69354',
    },
    pageFooter: {
      fontSize: '14px',
      textAlign: 'center',
      padding: '1em',
      background: '#202224',
      color: '#ffffff',
    },
    mediaQuerySmall: {
      padding: '10px',
    },
    pageHeaderSmall: {
      padding: '10px',
      fontSize: '28px',
    },
    pageHeaderPSmall: {
      fontSize: '16px',
    },
    sectionTitleSmall: {
      fontSize: '20px',
    },
    responsiveVideoWrapperSmall: {
      paddingTop: '75%',
    },
  };

  const handleMouseOver = (e: React.MouseEvent<HTMLButtonElement>) => {
    Object.assign(e.currentTarget.style, styles.buttonHover);
  };

  const handleMouseOut = (e: React.MouseEvent<HTMLButtonElement>) => {
    Object.assign(e.currentTarget.style, styles.buttonHoverOut);
  };

  const isSmallScreen = window.innerWidth <= 768;

  return (
    <div style={styles.landingPage}>
      <header style={isSmallScreen ? { ...styles.pageHeader, ...styles.pageHeaderSmall } : styles.pageHeader}>
        <div style={styles.pageHeaderContent}>
          <img src="https://raw.githubusercontent.com/samueltv250/images/main/bot.webp" alt="Logo" style={styles.logo} />
          <div style={styles.pageHeaderText}>
            <h1 style={isSmallScreen ? { ...styles.pageHeaderTitle, ...styles.pageHeaderSmall } : styles.pageHeaderTitle}>
              Panamá AI Query
            </h1>
            <p style={isSmallScreen ? { ...styles.pageHeaderSubtitle, ...styles.pageHeaderPSmall } : styles.pageHeaderSubtitle}>
              Chatea con la base de datos legales más completa de Panamá.
            </p>
          </div>
        </div>
        <div style={styles.pageHeaderButtons}>
          <button
            onClick={onLoginClick}
            style={styles.button}
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
          >
            Login
          </button>
          <button
            onClick={onRegisterClick}
            style={styles.button}
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
          >
            Registrarse
          </button>
        </div>
      </header>
      <main style={isSmallScreen ? { ...styles.content, ...styles.mediaQuerySmall } : styles.content}>
        <section style={styles.section}>
          <h3 style={isSmallScreen ? { ...styles.sectionTitle, ...styles.sectionTitleSmall, textAlign: 'left' } : { ...styles.sectionTitle, textAlign: 'left' }}>
            ¿Qué Ofrecemos?
          </h3>
          <div style={styles.subsection}>
            <h4 style={styles.subsectionTitle}>
              Base de Datos Completa
              <span style={{ ...styles.subsectionTitleUnderline, width: 'calc(100% - 20px)' }}></span>
            </h4>
            <p>
              Acceso a la <strong style={styles.strong}>base de datos de leyes de Panamá más completa</strong>, organizada por un agente de inteligencia artificial diseñado específicamente para recaudar todas las leyes de Panamá.
            </p>
            <p>
              Esta agente de inteligencia artificial se encarga de mantenider la data <strong style={styles.strong}>constantemente actualizada</strong>. Asegurandose que todos los articulos proporcionads en las consultas sean los más recientes y actualizados (si ha sido modificado o derogado).
            </p>
            <p>
            Este <strong>agente IA</strong> está constantemente actualizando la base de datos con las <strong>leyes más recientes</strong>. Según son publicadas por la <strong>Gaceta Oficial</strong> y otros medios oficiales.
            </p>
          </div>
          <div style={styles.subsection}>
            <h4 style={styles.subsectionTitle}>
              Motor de Búsqueda Avanzado
              <span style={{ ...styles.subsectionTitleUnderline, width: 'calc(100% - 20px)' }}></span>
            </h4>
            <p>
              Nuestro servicio proporciona un <strong style={styles.strong}>motor de búsqueda avanzado</strong> que permite realizar búsquedas por palabra clave o por significado en cada ley, fallo, decreto, resolución o documento legal publicado en Panamá.
            </p>
          </div>
          <div style={styles.subsection}>
            <h4 style={styles.subsectionTitle}>
              Agente de Consultas AI
              <span style={{ ...styles.subsectionTitleUnderline, width: 'calc(100% - 20px)' }}></span>
            </h4>
            <p>
              Solo tienes que hacer una consulta sobre leyes panameñas o cualquier tema especializado en Panamá, y nuestro <strong style={styles.strong}>Agente de consultas AI</strong> se encargará de buscar la información en nuestra base de datos o la deep web, proporcionándote un resumen con referencias y documentos completos.
            </p>
          </div>
        </section>

        <section style={styles.section}>
          <h3 style={isSmallScreen ? { ...styles.sectionTitle, ...styles.sectionTitleSmall, textAlign: 'left' } : { ...styles.sectionTitle, textAlign: 'left' }}>
            Demo del Sistema
          </h3>
          <div style={isSmallScreen ? { ...styles.responsiveVideoWrapper, ...styles.responsiveVideoWrapperSmall } : styles.responsiveVideoWrapper}>
            <iframe
              style={styles.responsiveVideo}
              src="https://www.youtube.com/embed/IK1SV0Zf4VI"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </section>

        
        <BetaAnnouncement />

        <div style={{ textAlign: 'center' }}>
  <div className="token-info-box" style={{ display: 'inline-block', border: '2px solid #c69354', padding: '15px', borderRadius: '12px', margin: '20px 0', backgroundColor: '#191919' }}>
    <p style={{ fontSize: '18px', color: '#c69354', margin: '5px 0' }}>
      1 Crédito = $1
    </p>
    <p style={{ fontSize: '18px', color: '#c69354', margin: '5px 0' }}>
      1 Crédito ≈ 2 Preguntas o 10 Búsquedas Avanzadas
    </p>
  </div>
</div>



        <section style={styles.section}>
          <h3 style={isSmallScreen ? { ...styles.sectionTitle, ...styles.sectionTitleSmall, textAlign: 'left' } : { ...styles.sectionTitle, textAlign: 'left' }}>
            Detalles de Precios para Cuentas Individuales
          </h3>
          <div style={styles.subsection}>
            <p>
              <strong style={styles.strong}>Membresía Individual:</strong> Compra mínima de $50 en créditos. Cada crédito cuesta 1$ y corresponde a aproximadamente dos consultas al bot de QA. Las consultas y respuestas serán utilizadas anonimamente para mejorar el sistema cuando se usen cuentas no empresariales.
            </p>
          </div>
        </section>

        <section style={styles.section}>
          <h3 style={isSmallScreen ? { ...styles.sectionTitle, ...styles.sectionTitleSmall, textAlign: 'left' } : { ...styles.sectionTitle, textAlign: 'left' }}>
            Detalles de Precios para Cuentas Empresariales
          </h3>
          <div style={styles.subsection}>
            <p>
              <strong style={styles.strong}>Membresía Empresarial:</strong> $1000 por mes. Incluye 1000 créditos cada mes. 
            </p>
            <p>
              Las cuentas empresariales garantizan que sus datos solo serán vistos por usted y se almacenarán únicamente en su dispositivo, sin utilizarse para mejorar o entrenar el sistema.
            </p>
            <p>Dependiendo de las necesidades de la empresa también podemos crear planes personalizados con integracion a databases que ya tengan.</p>
          </div>
        </section>

        <section style={styles.section}>
          <h3 style={isSmallScreen ? { ...styles.sectionTitle, ...styles.sectionTitleSmall, textAlign: 'left' } : { ...styles.sectionTitle, textAlign: 'left' }}>
            Activación de Cuenta
          </h3>
          <div style={styles.subsection}>
            <p>
              Al iniciar sesión, encontrarás un botón para suscribirte mediante PayPal, lo que te permitirá activar tu membresía de forma autónoma.
            </p>
            <p>
              Para preguntas o para activar una cuenta a través de transacción bancaria contáctanos en:{' '}
              <a style={styles.emailLink} href="mailto:support@panamaaiq.com">support@panamaaiq.com</a>
            </p>
          </div>
        </section>

        <section style={styles.section}>
          <h3 style={isSmallScreen ? { ...styles.sectionTitle, ...styles.sectionTitleSmall, textAlign: 'left' } : { ...styles.sectionTitle, textAlign: 'left' }}>
            Almacenamiento Local
          </h3>
          <div style={styles.subsection}>
            <p>Por razones de seguridad, todos los datos se almacenan localmente en tu navegador.</p>
          </div>
        </section>
      </main>

      <footer style={isSmallScreen ? { ...styles.pageFooter, ...styles.mediaQuerySmall } : styles.pageFooter}>
        <p>
          Contacta con nosotros para activar una cuenta:{' '}
          <a style={styles.emailLink} href="mailto:support@panamaaiq.com">support@panamaaiq.com</a>
        </p>
        <p>Panamá AI Query - Derechos Reservados</p>
      </footer>
    </div>
  );
};

export default LandingPage;
