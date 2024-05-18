import React, { CSSProperties } from 'react';

const LandingPage = ({ onLoginClick, onRegisterClick }: { onLoginClick: () => void, onRegisterClick: () => void }) => {
  const styles: { [key: string]: CSSProperties } = {
    body: {
      fontFamily: 'Arial, sans-serif',
      lineHeight: '1.6',
      backgroundColor: '#121212',
      color: '#e0e0e0',
      margin: 0,
      padding: 0,
    },
    strong: {
      fontWeight: 'bold',
      color: '#0037ff',
    },
    landingPage: {
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      background: '#f1f0f0',
      color: '#000',
    },
    pageHeader: {
      textAlign: 'center',
      padding: '1em',
      background: '#282c34',
      color: '#ffffff',
    },
    pageHeaderH1: {
      fontSize: '36px',
      margin: 0,
      padding: '0.5em 0',
    },
    pageHeaderP: {
      fontSize: '18px',
    },
    content: {
      flex: 1,
      padding: '20px',
      overflowY: 'auto',
      backgroundColor: '#ffffff',
      color: '#000000',
    },
    sectionTitle: {
      fontSize: '24px',
      borderBottom: '2px solid #007bff',
      paddingBottom: '5px',
      marginBottom: '15px',
    },
    offerSection: {
      marginBottom: '20px',
    },
    pricingSection: {
      marginBottom: '20px',
    },
    localStorageSection: {
      marginBottom: '20px',
    },
    demoSection: {
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
      margin: '20px 0',
    },
    button: {
      width: '150px',
      padding: '10px',
      background: '#007bff',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      margin: '10px',
      transition: 'background-color 0.3s ease',
    },
    buttonHover: {
      backgroundColor: '#0056b3',
    },
    emailLink: {
      color: '#007bff',
    },
    pageFooter: {
      fontSize: '14px',
      textAlign: 'center',
      padding: '1em',
      background: '#282c34',
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
    (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#0056b3';
  };

  const handleMouseOut = (e: React.MouseEvent<HTMLButtonElement>) => {
    (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#007bff';
  };

  // Check for small screen sizes
  const isSmallScreen = window.innerWidth <= 768;

  return (
    <div style={styles.landingPage}>
      <header style={isSmallScreen ? { ...styles.pageHeader, ...styles.pageHeaderSmall } : styles.pageHeader}>
        <h1 style={isSmallScreen ? { ...styles.pageHeaderH1, ...styles.pageHeaderSmall } : styles.pageHeaderH1}>
          Panamá AI Query
        </h1>
        <p style={isSmallScreen ? { ...styles.pageHeaderP, ...styles.pageHeaderPSmall } : styles.pageHeaderP}>
          Chatea con la base de datos legales más completa de Panamá.
        </p>
      </header>
      <main style={isSmallScreen ? { ...styles.content, ...styles.mediaQuerySmall } : styles.content}>
        <section style={styles.offerSection}>
          <h3 style={isSmallScreen ? { ...styles.sectionTitle, ...styles.sectionTitleSmall } : styles.sectionTitle}>
            ¿Qué Ofrecemos?
          </h3>
          <p>
            Acceso a la <strong style={styles.strong}>base de datos de leyes de Panamá más completa</strong>, organizada
            por un agente de inteligencia artificial diseñado específicamente. Nuestro servicio proporciona un{' '}
            <strong style={styles.strong}>motor de búsqueda avanzado</strong> que permite realizar búsquedas por palabra
            clave o por significado en cada ley, fallo, decreto, resolución o documento legal publicado en Panamá.
          </p>
          <p>
            Formula preguntas legales a nuestro avanzado <strong style={styles.strong}>Agente de consultas AI</strong> y
            obtén respuestas con informes sobre las fuentes utilizadas para total transparencia de manera instantánea,
            ideal para empresas que requieren numerosas consultas legales diarias o que desean comprender mejor el
            panorama legal de Panamá.
          </p>
          <p>
            Además, nuestra inteligencia artificial se encarga de{' '}
            <strong style={styles.strong}>actualizar las leyes cuando una modifica otra</strong>, asegurando que la base
            de datos esté completa y actualizada.
          </p>
        </section>
        <section style={styles.pricingSection}>
          <h3 style={isSmallScreen ? { ...styles.sectionTitle, ...styles.sectionTitleSmall } : styles.sectionTitle}>
            Detalles de Precios para Cuentas Empresariales
          </h3>
          <p>
            <strong style={styles.strong}>Membresía Empresarial:</strong> $1000 por mes. Incluye 2000 tokens cada mes.
            Cada búsqueda utilizando el motor de búsqueda legal avanzado cuesta 0.1 token.
          </p>
          <p>
            Las cuentas empresariales garantizan que sus datos solo serán vistos por usted y se almacenarán únicamente
            en su dispositivo, sin utilizarse para mejorar el sistema.
          </p>
          <p>Todas las membresías empresariales incluyen acceso ilimitado al motor de búsqueda legal.</p>
          <p>Dependiendo de las necesidades de la empresa también podemos crear planes personalizados.</p>
        </section>
        <section style={styles.pricingSection}>
          <h3 style={isSmallScreen ? { ...styles.sectionTitle, ...styles.sectionTitleSmall } : styles.sectionTitle}>
            Detalles de Precios para Cuentas Individuales
          </h3>
          <p>
            <strong style={styles.strong}>Membresía Individual:</strong> Compra mínima de $50 en tokens. Cada token
            corresponde a aproximadamente una consulta al bot de QA. Las consultas y respuestas serán utilizadas para
            mejorar el sistema cuando se usen cuentas no empresariales.
          </p>
          <p>
            Cada consulta legal consume aproximadamente 1 token y proporciona una respuesta completa con enlaces a todas
            las fuentes. Puede consumir mucho menos que un token si la pregunta no es muy compleja
          </p>
          <p>Todas las membresías individuales incluyen acceso ilimitado al motor de búsqueda legal.</p>
        </section>
        <section style={styles.pricingSection}>
          <h3 style={isSmallScreen ? { ...styles.sectionTitle, ...styles.sectionTitleSmall } : styles.sectionTitle}>
            Activación de Cuenta
          </h3>
          <p>
            Al iniciar sesión, encontrarás un botón para suscribirte mediante PayPal, lo que te permitirá activar tu
            membresía de forma autónoma.
          </p>
          <p>
            Para preguntas o para activar una cuenta a través de transacción bancaria contáctanos en:{' '}
            <a style={styles.emailLink} href="mailto:support@panamaaiq.com">
              support@panamaaiq.com
            </a>
          </p>
        </section>
        <section style={styles.localStorageSection}>
          <h3 style={isSmallScreen ? { ...styles.sectionTitle, ...styles.sectionTitleSmall } : styles.sectionTitle}>
            Almacenamiento Local
          </h3>
          <p>Por razones de seguridad, todos los datos se almacenan localmente en tu navegador.</p>
        </section>
        <div style={styles.actionButtons}>
          <button onClick={onLoginClick} style={styles.button} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
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
        <section style={styles.demoSection}>
          <h3 style={isSmallScreen ? { ...styles.sectionTitle, ...styles.sectionTitleSmall } : styles.sectionTitle}>
            Demo del Sistema
          </h3>
          <div
            style={isSmallScreen ? { ...styles.responsiveVideoWrapper, ...styles.responsiveVideoWrapperSmall } : styles.responsiveVideoWrapper}
          >
            <iframe
              style={styles.responsiveVideo}
              src="https://www.youtube.com/embed/aLLkkhw6dvs"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </section>
      </main>
      <footer style={isSmallScreen ? { ...styles.pageFooter, ...styles.mediaQuerySmall } : styles.pageFooter}>
        <p>
          Contacta con nosotros para activar una cuenta:{' '}
          <a style={styles.emailLink} href="mailto:support@panamaaiq.com">
            support@panamaaiq.com
          </a>
        </p>
        <p>Panamá AI Query - Derechos Reservados</p>
      </footer>
    </div>
  );
};

export default LandingPage;
