import React from 'react';

export default function TagBadge({ tag }) {
  return (
    <span
      style={{
        display: 'inline-block',
        padding: '3px 8px',
        marginRight: '6px',
        borderRadius: '8px',
        border: `2px solid ${tag.color}`,
        backgroundColor: '#fff',
        color: tag.color,
        fontWeight: '600',
        fontSize: '0.85em',
        userSelect: 'none',
      }}
    >
      {tag.name}
    </span>
  );
}