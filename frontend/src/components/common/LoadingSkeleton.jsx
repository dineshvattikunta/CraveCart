import React from 'react';

export const ProductCardSkeleton = () => {
  return (
    <div
      style={{
        backgroundColor: '#ffffff',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--color-border)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div className="skeleton" style={{ width: '100%', aspectRatio: '4/3' }} />
      <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div className="skeleton" style={{ width: '60px', height: '16px' }} />
          <div className="skeleton" style={{ width: '40px', height: '16px' }} />
        </div>
        <div className="skeleton" style={{ width: '85%', height: '20px' }} />
        <div className="skeleton" style={{ width: '100%', height: '14px' }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px' }}>
          <div className="skeleton" style={{ width: '70px', height: '24px' }} />
          <div className="skeleton" style={{ width: '80px', height: '34px', borderRadius: 'var(--radius-md)' }} />
        </div>
      </div>
    </div>
  );
};

export const ProductGridSkeleton = ({ count = 8 }) => {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
        gap: '24px',
      }}
    >
      {Array.from({ length: count }).map((_, index) => (
        <ProductCardSkeleton key={index} />
      ))}
    </div>
  );
};
