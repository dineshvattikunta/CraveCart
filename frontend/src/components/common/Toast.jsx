import React from 'react';
import { useNotification } from '../../context/NotificationContext';
import { CheckCircle2, AlertCircle, Info, AlertTriangle, X } from 'lucide-react';

const Toast = () => {
  const { toasts, removeToast } = useNotification();

  if (!toasts.length) return null;

  return (
    <div style={{
      position: 'fixed',
      bottom: '24px',
      right: '24px',
      zIndex: 9999,
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
      maxWidth: '380px',
      width: 'calc(100% - 48px)',
      pointerEvents: 'none'
    }}>
      {toasts.map((toast) => {
        let Icon = CheckCircle2;
        let borderColor = 'var(--color-success)';
        let iconColor = 'var(--color-success)';

        if (toast.type === 'error') {
          Icon = AlertCircle;
          borderColor = 'var(--color-danger)';
          iconColor = 'var(--color-danger)';
        } else if (toast.type === 'warning') {
          Icon = AlertTriangle;
          borderColor = 'var(--color-warning)';
          iconColor = 'var(--color-warning)';
        } else if (toast.type === 'info') {
          Icon = Info;
          borderColor = 'var(--color-info)';
          iconColor = 'var(--color-info)';
        }

        return (
          <div
            key={toast.id}
            style={{
              pointerEvents: 'auto',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '12px',
              padding: '12px 16px',
              backgroundColor: '#ffffff',
              borderRadius: 'var(--radius-md)',
              borderLeft: `4px solid ${borderColor}`,
              boxShadow: 'var(--shadow-lg)',
              animation: 'toast-in 0.25s ease-out',
              color: 'var(--color-text-main)',
              fontSize: '0.9rem',
              fontWeight: 500,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Icon size={18} color={iconColor} style={{ flexShrink: 0 }} />
              <span>{toast.message}</span>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              style={{
                color: 'var(--color-text-light)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '2px',
                borderRadius: '4px',
              }}
              aria-label="Dismiss notification"
            >
              <X size={16} />
            </button>
          </div>
        );
      })}
      <style>{`
        @keyframes toast-in {
          from {
            transform: translateY(12px) scale(0.96);
            opacity: 0;
          }
          to {
            transform: translateY(0) scale(1);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default Toast;
