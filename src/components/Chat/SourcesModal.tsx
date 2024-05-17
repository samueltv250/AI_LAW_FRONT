import React from 'react';
import { Card } from 'semantic-ui-react'; // Assuming you're using Semantic UI

export function SourcesModal({ sources, onClose, fetchDocumentContent, setShowDocument }: { sources: any[], onClose: () => void, fetchDocumentContent: (docId: any) => void, setShowDocument: (show: boolean) => void }) {
  // Log the sources to the console for debugging
  console.log('Sources:', sources);

  // Function to handle button click to fetch document content
  const handleFetchDocument = async (docId: any) => {
    await fetchDocumentContent(docId);
    setShowDocument(true);
  };

  const headerStyle: React.CSSProperties = {
    position: 'fixed',
    // top: 0,
    left: '10%', // Adjusted for centering
    // padding: '10px 0',
    textAlign: 'center',
    fontWeight: 'bold',
    // background
    backgroundColor: '#353641', // Dark background for the header
    color: 'white',
    fontSize: '24px',
    width: '80%',
    boxSizing: 'border-box',
    boxShadow: '0 2px 4px rgba(255,255,255,0.1)' // Lighter shadow for dark theme
  };

  // Check if sources is an array and has at least one item
  if (!Array.isArray(sources) || sources.length === 0) {
    return <p style={{ color: 'white' }}>No sources available.</p>; // Text color adjusted for dark theme
  }

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      overflow: 'auto',
      backgroundColor: 'rgba(0,0,0,0.5)',
      zIndex: 9999
    }}>
      <div style={{
        margin: 'auto',
        width: '80%',
        border: '1px solid #555', // Darker border color
        backgroundColor: '#222', // Dark background for the card
        padding: '20px',
        textAlign: 'left',
        boxShadow: '0px 4px 8px 0px rgba(255,255,255,0.2)', // Lighter shadow for dark theme
      }}>
        <button onClick={onClose} style={{
          position: 'fixed',
          right: '20px',
          top: '20px',
          fontSize: '24px',
          fontWeight: 'bold',
          color: '#ff0000',
          border: 'none',
          background: 'transparent',
          cursor: 'pointer',
          zIndex: 10000
        }}>X</button>

        <div style={headerStyle}>Sources</div>

        <div style={{ paddingTop: '60px', display: 'flex', flexDirection: 'column', gap: '20px' }}> {/* Added gap between cards */}
        {sources.map((source, index) => (
          <Card key={index} style={{ backgroundColor: '#353641', color: 'white', width: '100%' }}> {/* Card styles for dark theme, text centered and width adjusted */}
<Card.Content>
  <Card.Header>
    <div style={{ color: 'white' }}>
      <strong>{source.final_title}</strong>
    </div>
  </Card.Header>
  <Card.Description>
    <p style={{ color: 'white' }}>
      {source.content}
    </p>
  </Card.Description>
  <Card.Meta>
    {source.id_text !== "google" ? (
      <button onClick={() => handleFetchDocument(source.doc_id)} style={{
        color: '#4DB6AC', // Teal text color for buttons
        cursor: 'pointer',
      }}>View Document</button>
    ) : (
      <a href={source.url} target="_blank" rel="noopener noreferrer" style={{
        color: '#4DB6AC', // Teal text color for links
        cursor: 'pointer',
      }}>Go to source</a>
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
