import React from 'react';
import { Utensils, Home, Compass } from 'lucide-react';

const NotFoundPage = ({ onNavigate }) => {
  return (
    <div className="container page-container" style={{ textAlign: 'center', padding: '80px 20px' }}>
      <div
        style={{
          width: '80px',
          height: '80px',
          borderRadius: '50%',
          backgroundColor: 'var(--color-primary-light)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--color-primary)',
          margin: '0 auto 24px',
        }}
      >
        <Utensils size={40} />
      </div>

      <span
        style={{
          fontFamily: 'monospace',
          fontSize: '1rem',
          fontWeight: 800,
          color: 'var(--color-primary)',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
        }}
      >
        404 — Dish Not Found
      </span>

      <h1
        style={{
          fontSize: 'clamp(2rem, 4vw, 2.75rem)',
          fontWeight: 800,
          color: 'var(--color-text-main)',
          marginTop: '8px',
          marginBottom: '12px',
        }}
      >
        Oops! This recipe isn't on our menu.
      </h1>

      <p
        style={{
          color: 'var(--color-text-muted)',
          fontSize: '1.05rem',
          maxWidth: '480px',
          margin: '0 auto 32px',
          lineHeight: 1.6,
        }}
      >
        The page you are looking for might have been moved, removed, or perhaps the kitchen ran out of ingredients.
      </p>

      <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
        <button onClick={() => onNavigate('home')} className="btn btn-primary btn-lg">
          <Home size={18} /> Return Home
        </button>
        <button onClick={() => onNavigate('menu')} className="btn btn-secondary btn-lg">
          <Compass size={18} /> Browse Menu
        </button>
      </div>
    </div>
  );
};

export default NotFoundPage;
