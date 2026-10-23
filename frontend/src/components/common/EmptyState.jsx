import React from 'react';
import { UtensilsCrossed } from 'lucide-react';

const EmptyState = ({
  icon: Icon = UtensilsCrossed,
  title = 'No items found',
  description = 'Try adjusting your filters or search term to discover delicious food.',
  actionLabel,
  onAction,
}) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '64px 20px',
        backgroundColor: '#ffffff',
        borderRadius: 'var(--radius-xl)',
        border: '1px dashed var(--color-border)',
        margin: '20px 0',
      }}
    >
      <div
        style={{
          width: '72px',
          height: '72px',
          borderRadius: '50%',
          backgroundColor: 'var(--color-primary-light)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--color-primary)',
          marginBottom: '16px',
        }}
      >
        <Icon size={36} />
      </div>
      <h3 style={{ fontSize: '1.25rem', marginBottom: '8px' }}>{title}</h3>
      <p style={{ maxWidth: '420px', color: 'var(--color-text-muted)', marginBottom: actionLabel ? '24px' : '0' }}>
        {description}
      </p>
      {actionLabel && onAction && (
        <button onClick={onAction} className="btn btn-primary">
          {actionLabel}
        </button>
      )}
    </div>
  );
};

export default EmptyState;
