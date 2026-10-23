import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  Clock,
  CheckCircle2,
  Package,
  MapPin,
  Phone,
  Mail,
  CreditCard,
  ChefHat,
  Bike,
  Home,
} from 'lucide-react';
import api from '../services/api';
import { DietaryIndicator } from '../components/common/Badge';

const TIMELINE_STEPS = [
  { key: 'placed', label: 'Order Placed', icon: Package, description: 'Order received & confirmed in system' },
  { key: 'kitchen', label: 'Kitchen Preparing', icon: ChefHat, description: 'Chef is preparing your fresh meal' },
  { key: 'delivery', label: 'Out for Delivery', icon: Bike, description: 'Rider is on the way to your destination' },
  { key: 'delivered', label: 'Delivered', icon: Home, description: 'Enjoy your delicious feast!' },
];

const OrderDetailsPage = ({ orderId, onBack, onNavigate }) => {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    async function fetchOrder() {
      try {
        setLoading(true);
        const res = await api.getOrderById(orderId);
        if (isMounted && res.data) {
          setOrder(res.data);
        }
      } catch (err) {
        if (isMounted) setError(err.message || 'Failed to fetch order details');
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    if (orderId) {
      fetchOrder();
    }
    return () => { isMounted = false; };
  }, [orderId]);

  if (loading) {
    return (
      <div className="container page-container">
        <div className="skeleton" style={{ height: '300px', borderRadius: 'var(--radius-xl)' }} />
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="container page-container" style={{ textAlign: 'center', padding: '60px 20px' }}>
        <h2>Order Not Found</h2>
        <p style={{ color: 'var(--color-text-muted)', margin: '12px 0 24px' }}>
          {error || `Order "${orderId}" could not be retrieved from the database.`}
        </p>
        <button onClick={onBack} className="btn btn-primary">
          Return to Orders
        </button>
      </div>
    );
  }

  const items = order.items || [];
  const pricing = order.pricing || {};
  const customer = order.customer || {};
  const address = order.delivery_address || {};
  const createdDate = order.created_at ? new Date(order.created_at).toLocaleString() : 'Recent';

  return (
    <div className="container page-container" style={{ maxWidth: '860px' }}>
      <button
        onClick={onBack}
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
        Back to All Orders
      </button>

      {/* Top Details Card */}
      <div
        style={{
          backgroundColor: '#ffffff',
          borderRadius: 'var(--radius-xl)',
          border: '1px solid var(--color-border)',
          padding: '32px',
          boxShadow: 'var(--shadow-sm)',
          marginBottom: '32px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px', marginBottom: '24px' }}>
          <div>
            <div style={{ fontSize: '0.8125rem', color: 'var(--color-text-light)', textTransform: 'uppercase', fontWeight: 700 }}>
              Live Order Tracking
            </div>
            <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--color-text-main)', marginTop: '4px' }}>
              Order {order.order_id}
            </h1>
            <div style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', marginTop: '4px' }}>
              Placed on {createdDate}
            </div>
          </div>

          <span className="badge badge-success" style={{ fontSize: '0.875rem', padding: '6px 14px' }}>
            Status: {order.status || 'Confirmed'}
          </span>
        </div>

        {/* Status Timeline */}
        <div
          style={{
            backgroundColor: 'var(--color-surface-bg)',
            borderRadius: 'var(--radius-lg)',
            padding: '24px',
            marginBottom: '28px',
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '16px',
            }}
            className="timeline-grid"
          >
            {TIMELINE_STEPS.map((step, idx) => {
              const isCompleted = idx === 0; // In demo, initial state is confirmed/placed
              const isCurrent = idx === 1; // kitchen preparing
              const Icon = step.icon;

              return (
                <div key={step.key} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', position: 'relative' }}>
                  <div
                    style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '50%',
                      backgroundColor: isCompleted ? 'var(--color-success)' : isCurrent ? 'var(--color-primary)' : '#e5e7eb',
                      color: isCompleted || isCurrent ? '#ffffff' : '#9ca3af',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '10px',
                      boxShadow: isCurrent ? '0 4px 12px rgba(230, 57, 70, 0.35)' : 'none',
                    }}
                  >
                    <Icon size={20} />
                  </div>
                  <div style={{ fontSize: '0.875rem', fontWeight: 700, color: isCurrent ? 'var(--color-primary)' : 'var(--color-text-main)' }}>
                    {step.label}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '2px' }}>
                    {step.description}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Customer & Delivery Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '24px',
            borderTop: '1px solid var(--color-border-subtle)',
            paddingTop: '24px',
          }}
          className="order-info-columns"
        >
          <div>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--color-text-main)', marginBottom: '12px' }}>
              Customer Details
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.875rem', color: 'var(--color-text-body)' }}>
              <div><strong>Name:</strong> {customer.name}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Phone size={14} color="var(--color-text-light)" /> {customer.phone}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Mail size={14} color="var(--color-text-light)" /> {customer.email}
              </div>
            </div>
          </div>

          <div>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--color-text-main)', marginBottom: '12px' }}>
              Delivery Destination
            </h4>
            <div style={{ display: 'flex', gap: '8px', fontSize: '0.875rem', color: 'var(--color-text-body)', lineHeight: 1.5 }}>
              <MapPin size={16} color="var(--color-primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>
                {address.street}, {address.city}, {address.state} - {address.pin_code}
                {address.instructions && (
                  <div style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)', marginTop: '4px' }}>
                    Instructions: "{address.instructions}"
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Items & Bill Breakdown Card */}
      <div
        style={{
          backgroundColor: '#ffffff',
          borderRadius: 'var(--radius-xl)',
          border: '1px solid var(--color-border)',
          padding: '32px',
          boxShadow: 'var(--shadow-sm)',
        }}
      >
        <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '20px' }}>
          Ordered Items & Breakdown
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '24px' }}>
          {items.map((item, idx) => (
            <div
              key={idx}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingBottom: '12px',
                borderBottom: '1px solid var(--color-border-subtle)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <DietaryIndicator isVegetarian={item.vegetarian} size="sm" />
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.9375rem' }}>{item.name}</div>
                  <div style={{ fontSize: '0.8125rem', color: 'var(--color-text-light)' }}>
                    ₹{item.unit_price} x {item.quantity}
                  </div>
                </div>
              </div>

              <div style={{ fontWeight: 700, fontSize: '1.05rem', fontFamily: 'var(--font-heading)' }}>
                ₹{item.line_total || item.unit_price * item.quantity}
              </div>
            </div>
          ))}
        </div>

        {/* Pricing Summary */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '360px', marginLeft: 'auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>
            <span>Subtotal</span>
            <span>₹{pricing.subtotal?.toFixed(2)}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>
            <span>Delivery Fee</span>
            <span>{pricing.delivery_fee === 0 ? 'FREE' : `₹${pricing.delivery_fee?.toFixed(2)}`}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>
            <span>GST (5%)</span>
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
              marginTop: '6px',
            }}
          >
            <span>Total Payable</span>
            <span style={{ color: 'var(--color-primary)' }}>₹{pricing.total?.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .timeline-grid {
            grid-template-columns: 1fr 1fr !important;
          }
          .order-info-columns {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};

export default OrderDetailsPage;
