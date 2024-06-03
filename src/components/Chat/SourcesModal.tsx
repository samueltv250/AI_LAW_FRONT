import React, { useState, CSSProperties } from 'react';
import { Card } from 'semantic-ui-react'; // Assuming you're using Semantic UI
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

export function SourcesModal({ sources, onClose, fetchDocumentContent, setShowDocument }: { sources: any, onClose: any, fetchDocumentContent: any, setShowDocument: any }) {
  // Log the sources to the console for debugging
  console.log('Sources:', sources);

  // Function to handle button click to fetch document content
  const handleFetchDocument = async (docId: any) => {
    await fetchDocumentContent(docId);
    setShowDocument(true);
  };

  // State to manage hover effect for close button
  const [isHovered, setIsHovered] = useState(false);

  const headerStyle: CSSProperties = {
    textAlign: 'center',
    fontWeight: 'bold',
    backgroundColor: '#191919',
    color: 'white',
    fontSize: '24px',
    padding: '10px 20px',
    boxShadow: '0 2px 4px rgba(255,255,255,0.1)',
    width: 'fit-content',
    margin: '20px auto', // Center horizontally
    borderRadius: '8px',
  };

  // Check if sources is an array and has at least one item
  if (!Array.isArray(sources) || sources.length === 0) {
    return (
      <div style={overlayStyle}>
        <div style={modalStyle}>
          <button
            onClick={onClose}
            style={closeButtonStyle(isHovered)}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            aria-label="Close"
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
          <div style={headerStyle}>Referencias</div>
          <p style={{ color: 'white', padding: '20px' }}>No hay referencias disponibles.</p>
        </div>
      </div>
    );
  }

  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        <button
          onClick={onClose}
          style={closeButtonStyle(isHovered)}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          aria-label="Close"
        >
          <FontAwesomeIcon icon={faTimes} />
        </button>
        <div style={headerStyle}>Referencias</div>
        <div style={{ paddingTop: '20px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {sources.map((source, index) => (
            <Card key={index} style={cardStyle}>
              <Card.Content>
                <Card.Header>
                  <div style={{ color: 'white' }}>
                    <strong>{source.final_title}</strong>
                  </div>
                </Card.Header>
                <Card.Description>
                  <p style={{ color: 'white', textAlign: 'left', padding: '10px 0' }}>
                    {source.content}
                  </p>
                </Card.Description>
                <Card.Meta style={{ textAlign: 'center' }}>
                  {source.id_text !== "google" ? (
                    <button onClick={() => handleFetchDocument(source.doc_id)} style={buttonStyle}>
                      Ver Documento
                    </button>
                  ) : (
                    <button onClick={() => window.open(source.url, '_blank')} style={buttonStyle}>
                      Ir a la fuente
                    </button>
                  )}
                </Card.Meta>
              </Card.Content>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

const overlayStyle: CSSProperties = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0,0,0,0.5)',
  zIndex: 9999,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const modalStyle: CSSProperties = {
  backgroundColor: '#202224',
  padding: '20px',
  borderRadius: '8px',
  boxShadow: '0px 4px 8px 0px rgba(255,255,255,0.2)',
  width: '80%',
  maxWidth: '800px',
  maxHeight: '90vh',
  overflowY: 'auto',
  position: 'relative',
  animation: 'fadeIn 0.3s ease-in-out'
};

const closeButtonStyle = (isHovered: boolean): CSSProperties => ({
  position: 'absolute',
  right: '20px',
  top: '20px',
  fontSize: '24px',
  fontWeight: 'bold',
  color: '#fff',
  border: 'none',
  background: isHovered ? '#ff4d4d' : '#8B0000',
  cursor: 'pointer',
  borderRadius: '50%',
  width: '40px',
  height: '40px',
  lineHeight: '40px',
  textAlign: 'center',
  transition: 'background 0.2s ease-in-out, transform 0.2s ease-in-out',
  transform: isHovered ? 'scale(1.1)' : 'scale(1)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

const cardStyle: CSSProperties = {
  backgroundColor: '#191919',
  color: 'white',
  width: '100%',
  textAlign: 'left',
  padding: '15px', // Adding padding inside the card for better spacing
  borderRadius: '5px',
};
const buttonStyle: CSSProperties = {
  backgroundColor: "#c69354", // Same background color as "Ver Documento"
  color: "#1a1a1a", // Same text color as "Ver Documento"
cursor: 'pointer',
  border: 'none',
  borderRadius: '5px',
  padding: '10px 20px',
  textDecoration: 'none',
  transition: 'background-color 0.3s ease',
  marginTop: '10px',
  display: 'inline-block',
  fontWeight: 'bold', // Thicker text
  fontFamily: 'Arial, sans-serif' // Font family that supports bold
};

const linkStyle: CSSProperties = {
  color: '#4DB6AC',
  cursor: 'pointer',
  textDecoration: 'underline',
};
