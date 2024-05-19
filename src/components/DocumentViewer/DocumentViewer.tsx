// import React from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faTimes } from '@fortawesome/free-solid-svg-icons';

// interface DocumentViewerProps {
//   content: string;
//   onClose: () => void; // Define the type for onClose as a function that returns void
// }

// function DocumentViewer({ content, onClose }: DocumentViewerProps) {
//   // Decode Unicode escape sequences and remove specific double quotes
//   const decodeAndCleanContent = (str: string) => {
//     // Decode Unicode escape sequences
//     let decoded = str.replace(/\\u[\dA-F]{4}/gi, (match) => {
//       return String.fromCharCode(parseInt(match.replace(/\\u/g, ''), 16));
//     });

//     // Remove escaped double quotes and trim double quotes at the start and end
//     decoded = decoded.replace(/\\"/g, '');
//     decoded = decoded.replace(/^"|"$/g, '');

//     return decoded;
//   };

//   const cleanedContent = decodeAndCleanContent(content);

//   return (
//     <div style={overlayStyle}>
//       <div style={contentStyle}>
//         <div style={closeButtonContainerStyle}>
//           <button onClick={onClose} style={closeButtonStyle} aria-label="Close">
//             <FontAwesomeIcon icon={faTimes} />
//           </button>
//         </div>
//         <div dangerouslySetInnerHTML={{ __html: cleanedContent }} />
//       </div>
//     </div>
//   );
// }

// const overlayStyle: React.CSSProperties = {
//   position: 'fixed',
//   top: 0,
//   left: 0,
//   right: 0,
//   bottom: 0,
//   backgroundColor: 'rgba(0, 0, 0, 0.7)',
//   display: 'flex',
//   alignItems: 'center',
//   justifyContent: 'center',
//   zIndex: 1000,
// };

// const contentStyle: React.CSSProperties = {
//   position: 'relative',
//   width: '80%',
//   maxHeight: '90vh',
//   overflowY: 'auto',
//   backgroundColor: '#353641', // Dark background for the content area
//   padding: '20px',
//   borderRadius: '8px',
//   fontFamily: 'Arial, sans-serif',
//   lineHeight: '1.6',
//   color: '#eee', // Light text color for readability in dark mode
// };

// const closeButtonContainerStyle: React.CSSProperties = {
//   position: 'sticky',
//   top: '10px',
//   display: 'flex',
//   justifyContent: 'flex-end',
// };

// const closeButtonStyle: React.CSSProperties = {
//   fontSize: '24px',
//   color: '#fff', // White icon color for visibility
//   border: 'none',
//   background: '#ff0000', // Red background for the button
//   cursor: 'pointer',
//   borderRadius: '50%', // Make the close button circular
//   width: '40px',
//   height: '40px',
//   display: 'flex',
//   alignItems: 'center',
//   justifyContent: 'center',
//   transition: 'background-color 0.3s ease',
// };

// const closeButtonHoverStyle: React.CSSProperties = {
//   backgroundColor: '#ff4d4d', // Light red background for hover effect
// };

// export default DocumentViewer;
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

interface DocumentViewerProps {
  content: string;
  onClose: () => void; // Define the type for onClose as a function that returns void
}

function DocumentViewer({ content, onClose }: DocumentViewerProps) {
  // Decode Unicode escape sequences and remove specific double quotes
  const decodeAndCleanContent = (str: string) => {
    // Decode Unicode escape sequences
    let decoded = str.replace(/\\u[\dA-F]{4}/gi, (match) => {
      return String.fromCharCode(parseInt(match.replace(/\\u/g, ''), 16));
    });

    // Remove escaped double quotes and trim double quotes at the start and end
    decoded = decoded.replace(/\\"/g, '');
    decoded = decoded.replace(/^"|"$/g, '');

    return decoded;
  };

  const cleanedContent = decodeAndCleanContent(content);

  return (
    <div style={overlayStyle}>
      <div style={contentStyle}>
        <div style={closeButtonContainerStyle}>
          <button onClick={onClose} style={closeButtonStyle} aria-label="Close">
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>
        <div dangerouslySetInnerHTML={{ __html: cleanedContent }} />
      </div>
    </div>
  );
}

const overlayStyle: React.CSSProperties = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.7)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 1000,
};

const contentStyle: React.CSSProperties = {
  position: 'relative',
  width: '80%',
  maxHeight: '90vh',
  overflowY: 'auto',
  backgroundColor: '#fff', // White background for the content area
  padding: '20px',
  borderRadius: '8px',
  fontFamily: 'Arial, sans-serif',
  lineHeight: '1.6',
  color: '#000', // Black text color for readability
};

const closeButtonContainerStyle: React.CSSProperties = {
  position: 'sticky',
  top: '10px',
  display: 'flex',
  justifyContent: 'flex-end',
};

const closeButtonStyle: React.CSSProperties = {
  fontSize: '24px',
  color: '#fff', // White icon color for visibility
  border: 'none',
  background: '#ff0000', // Red background for the button
  cursor: 'pointer',
  borderRadius: '50%', // Make the close button circular
  width: '40px',
  height: '40px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'background-color 0.3s ease',
};

const closeButtonHoverStyle: React.CSSProperties = {
  backgroundColor: '#ff4d4d', // Light red background for hover effect
};

export default DocumentViewer;
