import React, { useState } from 'react';
import {
  ShieldCheck,
  CreditCard,
  Banknote,
  Smartphone,
  ArrowLeft,
  Lock,
  AlertCircle,
  Truck,
  CheckCircle,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useCart } from '../context/CartContext';
import { useNotification } from '../context/NotificationContext';
import api from '../services/api';

const CheckoutPage = ({ onNavigate, onOrderSuccess }) => {
  const {
    items,
    subtotal,
    deliveryFee,
    tax,
    discountAmount,
    grandTotal,
    promoCode,
    clearCart,
  } = useCart();

  const { notify } = useNotification();

  // Form Fields
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    street: '',
    city: 'Bengaluru',
    state: 'Karnataka',
    pin_code: '',
    instructions: '',
  });

  const [paymentMethod, setPaymentMethod] = useState('cash_on_delivery');
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState(null);

  if (items.length === 0) {
    return (
      <div className="container page-container" style={{ textAlign: 'center', padding: '60px 20px' }}>
        <h2>Your bag is empty</h2>
        <p style={{ color: 'var(--color-text-muted)', margin: '12px 0 24px' }}>
          Please add dishes from our menu before proceeding to checkout.
        </p>
        <button onClick={() => onNavigate('menu')} className="btn btn-primary">
          Browse Menu
        </button>
      </div>
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required';
    }

    const cleanPhone = formData.phone.replace(/\D/g, '');
    if (!cleanPhone || cleanPhone.length < 10) {
      newErrors.phone = 'Valid 10-digit mobile number required';
    }

    if (!formData.email.trim() || !formData.email.includes('@')) {
      newErrors.email = 'Valid email address required for order updates';
    }

    if (!formData.street.trim()) {
      newErrors.street = 'Street address & flat/house number required';
    }

    if (!formData.city.trim()) {
      newErrors.city = 'City is required';
    }

    if (!formData.pin_code.trim() || formData.pin_code.length < 5) {
      newErrors.pin_code = 'Valid postal PIN code required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError(null);

    if (!validateForm()) {
      notify('Please fill in all required delivery details correctly', 'warning');
      return;
    }

    setIsSubmitting(true);

    try {
      // Build order payload matching backend requirements
      const payload = {
        customer: {
          name: formData.name.trim(),
          phone: formData.phone.trim(),
          email: formData.email.trim(),
        },
        delivery_address: {
          street: formData.street.trim(),
          city: formData.city.trim(),
          state: formData.state.trim(),
          pin_code: formData.pin_code.trim(),
          instructions: formData.instructions.trim(),
        },
        items: items.map((i) => ({
          product_id: i.id,
          quantity: i.quantity,
        })),
        payment_method: paymentMethod,
        promo_code: promoCode || undefined,
      };

      const res = await api.createOrder(payload);

      if (res.success && res.data) {
        // Trigger celebratory confetti
        try {
          confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 },
          });
        } catch {}

        // Clear cart ONLY AFTER successful backend database order persistence
        clearCart();
        notify('Order placed successfully! Delicious food is on the way.', 'success');

        if (onOrderSuccess) {
          onOrderSuccess(res.data);
        }
      } else {
        throw new Error(res.error || 'Failed to place order');
      }
    } catch (err) {
      console.error('Order submission error:', err);
      const errMsg = err.message || 'Could not place your order. Please try again.';
      setApiError(errMsg);
      notify(errMsg, 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container page-container">
      {/* Back to Cart link */}
      <button
        onClick={() => onNavigate('cart')}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          color: 'var(--color-text-body)',
          fontWeight: 600,
          fontSize: '0.9375rem',
          marginBottom: '28px',
          padding: '6px 0',
        }}
      >
        <ArrowLeft size={18} />
        Back to Bag
      </button>

      <div style={{ marginBottom: '28px' }}>
        <h1 style={{ fontSize: '2.2rem', fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--color-text-main)' }}>
          Checkout & Delivery
        </h1>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9375rem', marginTop: '4px' }}>
          Enter your delivery destination and select a convenient payment method.
        </p>
      </div>

      {apiError && (
        <div
          style={{
            backgroundColor: 'var(--color-danger-bg)',
            border: '1px solid var(--color-danger)',
            borderRadius: 'var(--radius-md)',
            padding: '14px 18px',
            color: 'var(--color-danger)',
            fontSize: '0.9rem',
            marginBottom: '24px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
          }}
        >
          <AlertCircle size={20} />
          <span>{apiError}</span>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.4fr 0.9fr',
            gap: '36px',
            alignItems: 'start',
          }}
          className="checkout-layout-grid"
        >
          {/* Left Form: Contact & Delivery Address */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
            {/* Step 1: Customer Details */}
            <div
              style={{
                backgroundColor: '#ffffff',
                borderRadius: 'var(--radius-xl)',
                border: '1px solid var(--color-border)',
                padding: '28px',
                boxShadow: 'var(--shadow-xs)',
              }}
            >
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span
                  style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--color-primary)',
                    color: '#ffffff',
                    fontSize: '0.875rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                  }}
                >
                  1
                </span>
                Customer Information
              </h3>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }} className="form-row-2">
                <div className="form-group" style={{ gridColumn: 'span 2' }}>
                  <label className="form-label">Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Rahul Sharma"
                    className="form-input"
                  />
                  {errors.name && <span className="form-error">{errors.name}</span>}
                </div>

                <div className="form-group">
                  <label className="form-label">Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="10-digit mobile number"
                    className="form-input"
                  />
                  {errors.phone && <span className="form-error">{errors.phone}</span>}
                </div>

                <div className="form-group">
                  <label className="form-label">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="name@example.com"
                    className="form-input"
                  />
                  {errors.email && <span className="form-error">{errors.email}</span>}
                </div>
              </div>
            </div>

            {/* Step 2: Delivery Address */}
            <div
              style={{
                backgroundColor: '#ffffff',
                borderRadius: 'var(--radius-xl)',
                border: '1px solid var(--color-border)',
                padding: '28px',
                boxShadow: 'var(--shadow-xs)',
              }}
            >
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span
                  style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--color-primary)',
                    color: '#ffffff',
                    fontSize: '0.875rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                  }}
                >
                  2
                </span>
                Delivery Destination
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div className="form-group">
                  <label className="form-label">Street Address & Flat / House / Landmark *</label>
                  <input
                    type="text"
                    name="street"
                    value={formData.street}
                    onChange={handleChange}
                    placeholder="e.g. Flat 302, Green Glen Layout, 100 Feet Road"
                    className="form-input"
                  />
                  {errors.street && <span className="form-error">{errors.street}</span>}
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '14px' }} className="form-row-3">
                  <div className="form-group">
                    <label className="form-label">City *</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      placeholder="e.g. Bengaluru"
                      className="form-input"
                    />
                    {errors.city && <span className="form-error">{errors.city}</span>}
                  </div>

                  <div className="form-group">
                    <label className="form-label">State</label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      placeholder="e.g. Karnataka"
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">PIN Code *</label>
                    <input
                      type="text"
                      name="pin_code"
                      value={formData.pin_code}
                      onChange={handleChange}
                      placeholder="e.g. 560038"
                      className="form-input"
                    />
                    {errors.pin_code && <span className="form-error">{errors.pin_code}</span>}
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Delivery Instructions (Optional)</label>
                  <textarea
                    name="instructions"
                    value={formData.instructions}
                    onChange={handleChange}
                    placeholder="e.g. Ring the doorbell twice, please do not call upon arrival"
                    rows={2}
                    className="form-textarea"
                  />
                </div>
              </div>
            </div>

            {/* Step 3: Payment Method */}
            <div
              style={{
                backgroundColor: '#ffffff',
                borderRadius: 'var(--radius-xl)',
                border: '1px solid var(--color-border)',
                padding: '28px',
                boxShadow: 'var(--shadow-xs)',
              }}
            >
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span
                  style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--color-primary)',
                    color: '#ffffff',
                    fontSize: '0.875rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                  }}
                >
                  3
                </span>
                Payment Method (University Project Demo)
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {/* Option 1: Cash on Delivery */}
                <label
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '14px',
                    padding: '16px',
                    borderRadius: 'var(--radius-md)',
                    border: `1.5px solid ${paymentMethod === 'cash_on_delivery' ? 'var(--color-primary)' : 'var(--color-border)'}`,
                    backgroundColor: paymentMethod === 'cash_on_delivery' ? 'var(--color-primary-light)' : '#ffffff',
                    cursor: 'pointer',
                    transition: 'all var(--transition-fast)',
                  }}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cash_on_delivery"
                    checked={paymentMethod === 'cash_on_delivery'}
                    onChange={() => setPaymentMethod('cash_on_delivery')}
                    style={{ accentColor: 'var(--color-primary)' }}
                  />
                  <Banknote size={22} color="var(--color-primary)" />
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>Cash on Delivery (Recommended Demo)</div>
                    <div style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)' }}>
                      Pay safely in cash or UPI when your order is delivered to your doorstep.
                    </div>
                  </div>
                </label>

                {/* Option 2: Demo UPI */}
                <label
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '14px',
                    padding: '16px',
                    borderRadius: 'var(--radius-md)',
                    border: `1.5px solid ${paymentMethod === 'demo_upi' ? 'var(--color-primary)' : 'var(--color-border)'}`,
                    backgroundColor: paymentMethod === 'demo_upi' ? 'var(--color-primary-light)' : '#ffffff',
                    cursor: 'pointer',
                    transition: 'all var(--transition-fast)',
                  }}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="demo_upi"
                    checked={paymentMethod === 'demo_upi'}
                    onChange={() => setPaymentMethod('demo_upi')}
                    style={{ accentColor: 'var(--color-primary)' }}
                  />
                  <Smartphone size={22} color="var(--color-primary)" />
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>Demo UPI (Instant Approval)</div>
                    <div style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)' }}>
                      Simulates immediate Google Pay / PhonePe transaction confirmation.
                    </div>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Right Summary Sidebar */}
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
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800 }}>Order Recap</h3>

            {/* Items Summary list */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '220px', overflowY: 'auto' }}>
              {items.map((item) => (
                <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
                  <span style={{ color: 'var(--color-text-body)' }}>
                    {item.quantity}x {item.name}
                  </span>
                  <span style={{ fontWeight: 600 }}>₹{item.price * item.quantity}</span>
                </div>
              ))}
            </div>

            {/* Price breakdown */}
            <div style={{ borderTop: '1px solid var(--color-border-subtle)', paddingTop: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>
                <span>Subtotal</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>
                <span>Delivery</span>
                <span>{deliveryFee === 0 ? 'FREE' : `₹${deliveryFee.toFixed(2)}`}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>
                <span>GST (5%)</span>
                <span>₹{tax.toFixed(2)}</span>
              </div>
              {discountAmount > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: 'var(--color-success)', fontWeight: 600 }}>
                  <span>Discount</span>
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
                  paddingTop: '12px',
                  marginTop: '4px',
                }}
              >
                <span>Total Amount</span>
                <span style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-primary)' }}>
                  ₹{grandTotal.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Place Order CTA Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn btn-primary btn-lg"
              style={{ width: '100%', marginTop: '8px' }}
            >
              {isSubmitting ? (
                <span>Placing Order in Database...</span>
              ) : (
                <span>Place Order (₹{grandTotal.toFixed(2)})</span>
              )}
            </button>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', fontSize: '0.75rem', color: 'var(--color-text-light)' }}>
              <Lock size={13} color="var(--color-success)" />
              Persists securely into MongoDB backend
            </div>
          </div>
        </div>
      </form>

      <style>{`
        @media (max-width: 860px) {
          .checkout-layout-grid {
            grid-template-columns: 1fr !important;
          }
          .form-row-2, .form-row-3 {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};

export default CheckoutPage;
