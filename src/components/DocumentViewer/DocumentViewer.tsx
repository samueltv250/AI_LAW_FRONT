import React from 'react';
import he from 'he'; // You need to install 'he' library for decoding HTML entities

interface DocumentViewerProps {
  content: string;
  onClose: () => void;
}
function DocumentViewer({ content, onClose }: DocumentViewerProps) {
  const decodeHtmlEntities = (text: string) => he.decode(text);

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
    }}>
      <div style={{
        position: 'relative',
        width: '80%',
        maxHeight: '90vh',
        overflowY: 'auto',
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      }}>
        <button onClick={onClose} style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          fontSize: '24px',
          lineHeight: '24px',
          color: '#333',
          border: 'none',
          background: 'transparent',
          cursor: 'pointer',
        }}>
          &times;
        </button>
        <div dangerouslySetInnerHTML={{ __html: decodeHtmlEntities(content) }} />
      </div>
    </div>
  );
}
export default DocumentViewer;
