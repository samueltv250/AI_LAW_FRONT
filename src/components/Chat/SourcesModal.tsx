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

  // Check if sources is an array and has at least one item
  if (!Array.isArray(sources) || sources.length === 0) {
    return <p>No sources available.</p>;
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
        border: '1px solid #888', 
        backgroundColor: '#fefefe', 
        padding: '20px',
        textAlign: 'left',
        boxShadow: '0px 4px 8px 0px rgba(0,0,0,0.2)',
      }}>
        <button onClick={onClose} style={{
          position: 'fixed', // Change from 'absolute' to 'fixed'
          right: '20px', 
          top: '20px', 
          fontSize: '24px', 
          fontWeight: 'bold',
          color: '#ff0000',
          border: 'none',
          background: 'transparent',
          cursor: 'pointer',
          zIndex: 10000 // Ensure the button is above other elements
        }}>X</button>
  
        <h2>Sources</h2>
        {sources.map((source, index) => (
          <Card key={index}>
            <Card.Content>
              <Card.Header>
                <strong>{source.final_title}</strong>
              </Card.Header>
              <Card.Description>
                {source.content}
              </Card.Description>
              <Card.Description>
                {source.similarity}
              </Card.Description>
              <Card.Meta>
                {source.id_text !== "google" ? (
                  <button onClick={() => handleFetchDocument(source.doc_id)} style={{
                    color: 'blue',
                    cursor: 'pointer',
                  }}>View Document</button>
                ) : (
                  <a href={source.url} target="_blank" rel="noopener noreferrer" style={{
                    color: 'blue',
                    cursor: 'pointer',
                  }}>Go to source</a>
                )}
              </Card.Meta>
            </Card.Content>
          </Card>
        ))}
      </div>
    </div>
  );
}
