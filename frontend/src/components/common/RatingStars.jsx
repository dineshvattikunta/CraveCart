import React from 'react';
import { Star } from 'lucide-react';

const RatingStars = ({ rating = 4.5, reviewCount, size = 14 }) => {
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '3px',
          backgroundColor: '#fef3c7',
          color: '#92400e',
          padding: '2px 6px',
          borderRadius: '4px',
          fontSize: '0.75rem',
          fontWeight: 700,
        }}
      >
        <Star size={size} fill="#f59e0b" color="#f59e0b" />
        <span>{rating?.toFixed(1) || '4.5'}</span>
      </div>
      {reviewCount !== undefined && reviewCount !== null && (
        <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
          ({reviewCount})
        </span>
      )}
    </div>
  );
};

export default RatingStars;
