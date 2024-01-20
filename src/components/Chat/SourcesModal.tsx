import React from 'react';

export function SourcesModal({ sources, onClose }) {
  // Log the sources to the console for debugging
  console.log('Sources:', sources);

  // Check if sources is an array and has at least one item
  if (!Array.isArray(sources) || sources.length === 0) {
    return <p>No sources available.</p>;
  }

  return (
    <div>
      <h2>Sources</h2>
      {sources.map((source, index) => (
        <div key={index}>
          <h3>{source.final_title}</h3>
          <p>{source.content}</p>
          <a href={source.url} target="_blank" rel="noopener noreferrer">Go to source</a>
        </div>
      ))}
      <button onClick={onClose}>Close</button>
    </div>
  );
}