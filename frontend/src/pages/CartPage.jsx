import React, { useState } from 'react';
import {
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ArrowRight,
  ArrowLeft,
  Tag,
  CheckCircle2,
  ShieldCheck,
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { DietaryIndicator } from '../components/common/Badge';
import EmptyState from '../components/common/EmptyState';

const CartPage = ({ onNavigate }) => {
  const {
    items,
    updateQuantity,
    removeFromCart,
    clearCart,
    subtotal,
    deliveryFee,
    tax,
    discountAmount,
    grandTotal,
    promoCode,
    applyPromoCode,
  } = useCart();

  const [inputCoupon, setInputCoupon] = useState(promoCode || '');

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    applyPromoCode(inputCoupon);
  };

  if (items.length === 0) {
    return (
      <div className="container page-container">
        <EmptyState
          icon={ShoppingBag}
          title="Your Shopping Cart is Empty"
          description="You haven't added any delicacies to your cart yet. Explore our freshly prepared menu and treat your tastebuds!"
          actionLabel="Explore Menu"
          onAction={() => onNavigate('menu')}
        />
      </div>
    );
  }

  return (
    <div className="container page-container">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '28px' }}>
        <div>
          <h1 style={{ fontSize: '2.2rem', fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--color-text-main)' }}>
            Shopping Cart
          </h1>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9375rem', marginTop: '4px' }}>
            Review your selected dishes before proceeding to secure checkout.
          </p>
        </div>
        <button
          onClick={clearCart}
          style={{
            fontSize: '0.8125rem',
            color: 'var(--color-danger)',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
          }}
        >
          <Trash2 size={14} />
          Clear Cart
        </button>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1.4fr 0.9fr',
          gap: '36px',
          alignItems: 'start',
        }}
        className="cart-layout-grid"
      >
        {/* Left: Items List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {items.map((item) => (
            <div
              key={item.id}
              style={{
                backgroundColor: '#ffffff',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--color-border)',
                padding: '20px',
                display: 'flex',
                gap: '16px',
                alignItems: 'center',
                boxShadow: 'var(--shadow-xs)',
              }}
            >
              <img
                src={item.image}
                alt={item.name}
                style={{
                  width: '84px',
                  height: '84px',
                  borderRadius: 'var(--radius-md)',
                  objectFit: 'cover',
                  flexShrink: 0,
                }}
              />

              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                  <DietaryIndicator isVegetarian={item.vegetarian} size="sm" />
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-text-light)' }}>
                    {item.category}
                  </span>
                </div>
                <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--color-text-main)', marginBottom: '4px' }}>
                  {item.name}
                </h4>
                <div style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
                  ₹{item.price} each
                </div>
              </div>

              {/* Quantity Controls */}
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  backgroundColor: 'var(--color-surface-subtle)',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--color-border)',
                  padding: '2px',
                }}
              >
                <button
                  type="button"
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  style={{ width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  aria-label="Decrease quantity"
                >
                  <Minus size={14} />
                </button>
                <span style={{ minWidth: '32px', textAlign: 'center', fontWeight: 700, fontSize: '0.9375rem' }}>
                  {item.quantity}
                </span>
                <button
                  type="button"
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  style={{ width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  aria-label="Increase quantity"
                >
                  <Plus size={14} />
                </button>
              </div>

              {/* Line Total */}
              <div style={{ textAlign: 'right', minWidth: '90px' }}>
                <div style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--color-text-main)', fontFamily: 'var(--font-heading)' }}>
                  ₹{item.price * item.quantity}
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  style={{
                    fontSize: '0.75rem',
                    color: 'var(--color-text-light)',
                    marginTop: '4px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '2px',
                  }}
                >
                  <Trash2 size={12} /> Remove
                </button>
              </div>
            </div>
          ))}

          <div style={{ display: 'flex', justifyContent: 'flex-start', marginTop: '12px' }}>
            <button
              onClick={() => onNavigate('menu')}
              className="btn btn-secondary"
            >
              <ArrowLeft size={16} /> Continue Ordering
            </button>
          </div>
        </div>

        {/* Right: Order Summary Card */}
        <div
          style={{
            backgroundColor: '#ffffff',
            borderRadius: 'var(--radius-xl)',
            border: '1px solid var(--color-border)',
            padding: '28px',
            boxShadow: 'var(--shadow-sm)',
            position: 'sticky',
            top: 'calc(var(--header-height) + 24px)',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
          }}
        >
          <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-text-main)' }}>
            Order Summary
          </h3>

          {/* Coupon Code Input */}
          <form onSubmit={handleApplyCoupon} style={{ display: 'flex', gap: '8px' }}>
            <div style={{ position: 'relative', flex: 1 }}>
              <input
                type="text"
                placeholder="Promo Code (e.g. CRAVE20)"
                value={inputCoupon}
                onChange={(e) => setInputCoupon(e.target.value)}
                style={{
                  width: '100%',
                  padding: '9px 12px 9px 34px',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--color-border)',
                  fontSize: '0.875rem',
                  textTransform: 'uppercase',
                }}
              />
              <Tag size={16} color="var(--color-text-light)" style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }} />
            </div>
            <button type="submit" className="btn btn-secondary btn-sm">
              Apply
            </button>
          </form>

          {promoCode && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                backgroundColor: 'var(--color-success-bg)',
                padding: '8px 12px',
                borderRadius: 'var(--radius-sm)',
                fontSize: '0.8125rem',
                color: 'var(--color-success)',
                fontWeight: 600,
              }}
            >
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <CheckCircle2 size={16} />
                Promo <strong>{promoCode}</strong> Active
              </span>
              <button
                onClick={() => {
                  applyPromoCode('');
                  setInputCoupon('');
                }}
                style={{ color: 'var(--color-danger)', fontSize: '0.75rem' }}
              >
                Remove
              </button>
            </div>
          )}

          {/* Price Breakdown */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', borderTop: '1px solid var(--color-border-subtle)', paddingTop: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9375rem', color: 'var(--color-text-body)' }}>
              <span>Item Subtotal</span>
              <span style={{ fontWeight: 600 }}>₹{subtotal.toFixed(2)}</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9375rem', color: 'var(--color-text-body)' }}>
              <span>Delivery Fee</span>
              <span style={{ fontWeight: 600, color: deliveryFee === 0 ? 'var(--color-success)' : 'inherit' }}>
                {deliveryFee === 0 ? 'FREE' : `₹${deliveryFee.toFixed(2)}`}
              </span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9375rem', color: 'var(--color-text-body)' }}>
              <span>Restaurant GST (5%)</span>
              <span style={{ fontWeight: 600 }}>₹{tax.toFixed(2)}</span>
            </div>

            {discountAmount > 0 && (
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9375rem', color: 'var(--color-success)', fontWeight: 600 }}>
                <span>Discount Promo</span>
                <span>-₹{discountAmount.toFixed(2)}</span>
              </div>
            )}

            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '1.25rem',
                fontWeight: 800,
                color: 'var(--color-text-main)',
                borderTop: '1.5px dashed var(--color-border)',
                paddingTop: '14px',
                marginTop: '4px',
              }}
            >
              <span>Total Payable</span>
              <span style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-primary)' }}>
                ₹{grandTotal.toFixed(2)}
              </span>
            </div>
          </div>

          {/* Checkout CTA */}
          <button
            onClick={() => onNavigate('checkout')}
            className="btn btn-primary btn-lg"
            style={{ width: '100%', marginTop: '6px' }}
          >
            Proceed to Checkout <ArrowRight size={18} />
          </button>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', fontSize: '0.75rem', color: 'var(--color-text-light)' }}>
            <ShieldCheck size={14} color="var(--color-success)" />
            Verified Secure Transparent Checkout
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .cart-layout-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};

export default CartPage;
