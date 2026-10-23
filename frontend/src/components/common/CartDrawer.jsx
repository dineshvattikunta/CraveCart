import React from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { DietaryIndicator } from './Badge';

const CartDrawer = ({ onNavigate }) => {
  const {
    items,
    isCartDrawerOpen,
    setIsCartDrawerOpen,
    updateQuantity,
    removeFromCart,
    subtotal,
    deliveryFee,
    totalCount,
    grandTotal,
  } = useCart();

  if (!isCartDrawerOpen) return null;

  const freeDeliveryThreshold = 499;
  const amountToFreeDelivery = Math.max(0, freeDeliveryThreshold - subtotal);
  const deliveryProgress = Math.min(100, Math.round((subtotal / freeDeliveryThreshold) * 100));

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9000,
        display: 'flex',
        justifyContent: 'flex-end',
      }}
    >
      {/* Backdrop */}
      <div
        onClick={() => setIsCartDrawerOpen(false)}
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: 'rgba(17, 24, 39, 0.45)',
          backdropFilter: 'blur(3px)',
          animation: 'fade-in 0.2s ease',
        }}
      />

      {/* Drawer Panel */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '420px',
          height: '100%',
          backgroundColor: '#ffffff',
          boxShadow: 'var(--shadow-xl)',
          display: 'flex',
          flexDirection: 'column',
          zIndex: 9001,
          animation: 'slide-left 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {/* Drawer Header */}
        <div
          style={{
            padding: '20px 24px',
            borderBottom: '1px solid var(--color-border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ShoppingBag size={22} color="var(--color-primary)" />
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700 }}>Your Bag</h3>
            <span className="badge badge-primary">{totalCount} items</span>
          </div>
          <button
            onClick={() => setIsCartDrawerOpen(false)}
            style={{
              padding: '6px',
              borderRadius: 'var(--radius-sm)',
              color: 'var(--color-text-muted)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            aria-label="Close cart"
          >
            <X size={20} />
          </button>
        </div>

        {/* Free Delivery Banner */}
        <div
          style={{
            padding: '12px 24px',
            backgroundColor: subtotal >= freeDeliveryThreshold ? 'var(--color-success-bg)' : '#fff8ed',
            borderBottom: '1px solid var(--color-border-subtle)',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: '0.8125rem',
              fontWeight: 600,
              color: subtotal >= freeDeliveryThreshold ? 'var(--color-success)' : '#b45309',
              marginBottom: '6px',
            }}
          >
            {subtotal >= freeDeliveryThreshold ? (
              <span>🎉 Free delivery unlocked!</span>
            ) : (
              <span>Add ₹{amountToFreeDelivery} more for Free Delivery</span>
            )}
            <span>{deliveryProgress}%</span>
          </div>
          <div
            style={{
              height: '5px',
              backgroundColor: '#e5e7eb',
              borderRadius: '999px',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                width: `${deliveryProgress}%`,
                height: '100%',
                backgroundColor: subtotal >= freeDeliveryThreshold ? 'var(--color-success)' : '#f59e0b',
                transition: 'width 0.3s ease',
              }}
            />
          </div>
        </div>

        {/* Drawer Body - Items List */}
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '16px 24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
          }}
        >
          {items.length === 0 ? (
            <div
              style={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                gap: '12px',
                color: 'var(--color-text-muted)',
              }}
            >
              <ShoppingBag size={48} strokeWidth={1.5} color="var(--color-border-active)" />
              <p style={{ fontWeight: 600, fontSize: '1rem', color: 'var(--color-text-main)' }}>
                Your cart is empty
              </p>
              <p style={{ fontSize: '0.875rem' }}>
                Looks like you haven't added anything to your cart yet.
              </p>
              <button
                onClick={() => {
                  setIsCartDrawerOpen(false);
                  if (onNavigate) onNavigate('menu');
                }}
                className="btn btn-outline btn-sm"
                style={{ marginTop: '8px' }}
              >
                Browse Menu
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                style={{
                  display: 'flex',
                  gap: '12px',
                  paddingBottom: '16px',
                  borderBottom: '1px solid var(--color-border-subtle)',
                  alignItems: 'center',
                }}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: 'var(--radius-md)',
                    objectFit: 'cover',
                    flexShrink: 0,
                  }}
                />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '2px' }}>
                    <DietaryIndicator isVegetarian={item.vegetarian} size="sm" />
                    <h5
                      style={{
                        fontSize: '0.9375rem',
                        fontWeight: 600,
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      {item.name}
                    </h5>
                  </div>
                  <div style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--color-text-main)' }}>
                    ₹{item.price * item.quantity}
                    <span style={{ fontSize: '0.75rem', fontWeight: 400, color: 'var(--color-text-light)', marginLeft: '6px' }}>
                      (₹{item.price} each)
                    </span>
                  </div>

                  {/* Quantity Stepper & Remove */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '6px' }}>
                    <div
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        backgroundColor: 'var(--color-surface-subtle)',
                        borderRadius: 'var(--radius-sm)',
                        padding: '2px',
                      }}
                    >
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        style={{ width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                      >
                        <Minus size={12} />
                      </button>
                      <span style={{ minWidth: '20px', textAlign: 'center', fontSize: '0.8125rem', fontWeight: 600 }}>
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        style={{ width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                      >
                        <Plus size={12} />
                      </button>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      style={{ color: 'var(--color-text-light)', display: 'flex', alignItems: 'center' }}
                      title="Remove"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer */}
        {items.length > 0 && (
          <div
            style={{
              padding: '20px 24px',
              borderTop: '1px solid var(--color-border)',
              backgroundColor: 'var(--color-surface-warm)',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9375rem', color: 'var(--color-text-body)' }}>
              <span>Subtotal</span>
              <span style={{ fontWeight: 600 }}>₹{subtotal}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9375rem', color: 'var(--color-text-body)' }}>
              <span>Delivery Fee</span>
              <span style={{ fontWeight: 600, color: deliveryFee === 0 ? 'var(--color-success)' : 'inherit' }}>
                {deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}
              </span>
            </div>

            <div style={{ display: 'flex', gap: '10px', marginTop: '6px' }}>
              <button
                onClick={() => {
                  setIsCartDrawerOpen(false);
                  if (onNavigate) onNavigate('cart');
                }}
                className="btn btn-secondary"
                style={{ flex: 1 }}
              >
                View Cart
              </button>
              <button
                onClick={() => {
                  setIsCartDrawerOpen(false);
                  if (onNavigate) onNavigate('checkout');
                }}
                className="btn btn-primary"
                style={{ flex: 1 }}
              >
                Checkout <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes slide-left {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default CartDrawer;
