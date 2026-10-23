import React from 'react';
import {
  CheckCircle,
  Package,
  MapPin,
  Clock,
  ArrowRight,
  ShoppingBag,
  ExternalLink,
} from 'lucide-react';
import { DietaryIndicator } from '../components/common/Badge';

const OrderConfirmationPage = ({ order, onNavigate, onViewOrderDetails }) => {
  if (!order) {
    return (
      <div className="container page-container" style={{ textAlign: 'center', padding: '60px 20px' }}>
        <h2>Order Not Found</h2>
        <p style={{ color: 'var(--color-text-muted)', margin: '12px 0 24px' }}>
          We could not load confirmation details. Please check your order history.
        </p>
        <button onClick={() => onNavigate('orders')} className="btn btn-primary">
          View My Orders
        </button>
      </div>
    );
  }

  const orderDate = order.created_at ? new Date(order.created_at).toLocaleString() : new Date().toLocaleString();
  const pricing = order.pricing || {};
  const items = order.items || [];
  const address = order.delivery_address || {};
  const customer = order.customer || {};

  return (
    <div className="container page-container" style={{ maxWidth: '780px' }}>
      {/* Celebration Header */}
      <div
        style={{
          backgroundColor: '#ffffff',
          borderRadius: 'var(--radius-xl)',
          border: '1px solid var(--color-border)',
          padding: '40px 32px',
          textAlign: 'center',
          boxShadow: 'var(--shadow-sm)',
          marginBottom: '32px',
        }}
      >
        <div
          style={{
            width: '68px',
            height: '68px',
            borderRadius: '50%',
            backgroundColor: 'var(--color-success-bg)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--color-success)',
            margin: '0 auto 16px',
            boxShadow: '0 4px 12px rgba(16, 185, 129, 0.25)',
          }}
        >
          <CheckCircle size={38} />
        </div>

        <span className="badge badge-success" style={{ marginBottom: '8px' }}>
          Status: {order.status || 'Confirmed'}
        </span>

        <h1 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--color-text-main)', marginBottom: '8px' }}>
          Order Confirmed!
        </h1>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '1rem', maxWidth: '480px', margin: '0 auto 20px' }}>
          Thank you, <strong>{customer.name || 'valued customer'}</strong>! The kitchen is preparing your dishes with care.
        </p>

        {/* Order Identifier Pill */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: 'var(--color-surface-subtle)',
            padding: '8px 18px',
            borderRadius: 'var(--radius-full)',
            fontFamily: 'monospace',
            fontWeight: 700,
            fontSize: '1rem',
            color: 'var(--color-text-main)',
          }}
        >
          <span>Order ID:</span>
          <span style={{ color: 'var(--color-primary)' }}>{order.order_id}</span>
        </div>
      </div>

      {/* Order Details Card */}
      <div
        style={{
          backgroundColor: '#ffffff',
          borderRadius: 'var(--radius-xl)',
          border: '1px solid var(--color-border)',
          padding: '32px',
          boxShadow: 'var(--shadow-xs)',
          display: 'flex',
          flexDirection: 'column',
          gap: '24px',
          marginBottom: '32px',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--color-border-subtle)', paddingBottom: '16px' }}>
          <div>
            <div style={{ fontSize: '0.8125rem', color: 'var(--color-text-light)' }}>Order Placed At</div>
            <div style={{ fontWeight: 600, fontSize: '0.9375rem' }}>{orderDate}</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '0.8125rem', color: 'var(--color-text-light)' }}>Payment Method</div>
            <div style={{ fontWeight: 600, fontSize: '0.9375rem', textTransform: 'capitalize' }}>
              {(order.payment?.method || 'Cash on Delivery').replace(/_/g, ' ')}
            </div>
          </div>
        </div>

        {/* Delivery Address */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700, fontSize: '1rem', marginBottom: '8px' }}>
            <MapPin size={18} color="var(--color-primary)" />
            <span>Delivery Destination</span>
          </div>
          <p style={{ color: 'var(--color-text-body)', fontSize: '0.9375rem', lineHeight: 1.5 }}>
            {address.street}, {address.city}, {address.state} - {address.pin_code}
          </p>
          {address.instructions && (
            <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)', marginTop: '4px' }}>
              <em>Note: "{address.instructions}"</em>
            </p>
          )}
        </div>

        {/* Ordered Items Breakdown */}
        <div>
          <h4 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '14px' }}>
            Items Ordered ({items.length})
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {items.map((item, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '10px 14px',
                  backgroundColor: 'var(--color-surface-bg)',
                  borderRadius: 'var(--radius-md)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <DietaryIndicator isVegetarian={item.vegetarian} size="sm" />
                  <span style={{ fontWeight: 600, fontSize: '0.9375rem' }}>
                    {item.quantity}x {item.name}
                  </span>
                </div>
                <span style={{ fontWeight: 700, fontFamily: 'var(--font-heading)' }}>
                  ₹{item.line_total || item.unit_price * item.quantity}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Pricing Summary */}
        <div style={{ borderTop: '1px solid var(--color-border-subtle)', paddingTop: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>
            <span>Subtotal</span>
            <span>₹{pricing.subtotal?.toFixed(2)}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>
            <span>Delivery Fee</span>
            <span>{pricing.delivery_fee === 0 ? 'FREE' : `₹${pricing.delivery_fee?.toFixed(2)}`}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>
            <span>Taxes (GST)</span>
            <span>₹{pricing.tax?.toFixed(2)}</span>
          </div>
          {pricing.discount > 0 && (
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: 'var(--color-success)', fontWeight: 600 }}>
              <span>Discount Promo</span>
              <span>-₹{pricing.discount?.toFixed(2)}</span>
            </div>
          )}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: '1.25rem',
              fontWeight: 800,
              borderTop: '1.5px dashed var(--color-border)',
              paddingTop: '12px',
              marginTop: '4px',
            }}
          >
            <span>Total Paid / Payable</span>
            <span style={{ color: 'var(--color-primary)' }}>₹{pricing.total?.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
        <button
          onClick={() => onViewOrderDetails(order.order_id)}
          className="btn btn-primary"
          style={{ flex: 1 }}
        >
          Track & View Order Details <ExternalLink size={16} />
        </button>
        <button
          onClick={() => onNavigate('menu')}
          className="btn btn-secondary"
          style={{ flex: 1 }}
        >
          <ShoppingBag size={16} /> Order More Food
        </button>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;
