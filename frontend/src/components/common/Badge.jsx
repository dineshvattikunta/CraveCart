import React from 'react';
import { Clock, Zap, Flame, Award } from 'lucide-react';

export const DietaryIndicator = ({ isVegetarian, size = 'md' }) => {
  const outerSize = size === 'sm' ? 14 : size === 'lg' ? 20 : 16;
  const innerSize = size === 'sm' ? 6 : size === 'lg' ? 8 : 7;

  return (
    <div
      title={isVegetarian ? 'Vegetarian' : 'Non-Vegetarian'}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: `${outerSize}px`,
        height: `${outerSize}px`,
        border: `1.5px solid ${isVegetarian ? 'var(--color-veg)' : 'var(--color-non-veg)'}`,
        borderRadius: '3px',
        backgroundColor: '#ffffff',
        flexShrink: 0,
      }}
    >
      {isVegetarian ? (
        <span
          style={{
            width: `${innerSize}px`,
            height: `${innerSize}px`,
            borderRadius: '50%',
            backgroundColor: 'var(--color-veg)',
          }}
        />
      ) : (
        <span
          style={{
            width: 0,
            height: 0,
            borderLeft: `${innerSize / 2}px solid transparent`,
            borderRight: `${innerSize / 2}px solid transparent`,
            borderBottom: `${innerSize}px solid var(--color-non-veg)`,
          }}
        />
      )}
    </div>
  );
};

export const BestsellerBadge = () => (
  <span
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: '4px',
      padding: '3px 8px',
      fontSize: '0.7rem',
      fontWeight: 700,
      letterSpacing: '0.03em',
      borderRadius: 'var(--radius-full)',
      background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
      color: '#ffffff',
      boxShadow: '0 2px 6px rgba(245, 158, 11, 0.3)',
      textTransform: 'uppercase',
    }}
  >
    <Award size={12} />
    Bestseller
  </span>
);

export const DiscountBadge = ({ discountPercent }) => {
  if (!discountPercent || discountPercent <= 0) return null;
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '3px',
        padding: '3px 8px',
        fontSize: '0.7rem',
        fontWeight: 700,
        borderRadius: 'var(--radius-full)',
        backgroundColor: 'var(--color-primary-light)',
        color: 'var(--color-primary)',
      }}
    >
      <Zap size={11} />
      {discountPercent}% OFF
    </span>
  );
};

export const PrepTimeBadge = ({ time }) => {
  if (!time) return null;
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '4px',
        fontSize: '0.75rem',
        fontWeight: 500,
        color: 'var(--color-text-muted)',
      }}
    >
      <Clock size={13} />
      {time}
    </span>
  );
};
