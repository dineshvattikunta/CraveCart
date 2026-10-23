import React, { useState, useEffect } from 'react';
import {
  Clock,
  Search,
  ExternalLink,
  ShoppingBag,
  Package,
  Calendar,
  AlertCircle,
  RefreshCw,
} from 'lucide-react';
import api from '../services/api';
import EmptyState from '../components/common/EmptyState';
import { DietaryIndicator } from '../components/common/Badge';

const OrdersPage = ({ onNavigate, onViewOrderDetails }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchEmail, setSearchEmail] = useState('');
  const [activeFilterEmail, setActiveFilterEmail] = useState('');

  const fetchOrders = async (email = '') => {
    try {
      setLoading(true);
      const res = await api.getOrders(email);
      if (res.data) {
        setOrders(res.data);
      }
    } catch (err) {
      console.error('Failed to fetch orders:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders(activeFilterEmail);
  }, [activeFilterEmail]);

  const handleSearch = (e) => {
    e.preventDefault();
    setActiveFilterEmail(searchEmail.trim());
  };

  const handleReset = () => {
    setSearchEmail('');
    setActiveFilterEmail('');
  };

  return (
    <div className="container page-container">
      {/* Page Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '28px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '2.2rem', fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--color-text-main)' }}>
            My Orders
          </h1>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9375rem', marginTop: '4px' }}>
            Track live preparation status and view your past gastronomic orders.
          </p>
        </div>

        <button
          onClick={() => fetchOrders(activeFilterEmail)}
          className="btn btn-secondary btn-sm"
          style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
        >
          <RefreshCw size={14} /> Refresh Orders
        </button>
      </div>

      {/* Honest Academic Notice */}
      <div
        style={{
          backgroundColor: '#eff6ff',
          border: '1px solid #bfdbfe',
          borderRadius: 'var(--radius-lg)',
          padding: '12px 18px',
          marginBottom: '24px',
          fontSize: '0.85rem',
          color: '#1e40af',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
        }}
      >
        <AlertCircle size={18} style={{ flexShrink: 0 }} />
        <span>
          <strong>Academic Demo Notice:</strong> Customer authentication is simulated. You can view all recently placed MongoDB demo orders or filter by customer email address below.
        </span>
      </div>

      {/* Lookup Bar by Email */}
      <form
        onSubmit={handleSearch}
        style={{
          display: 'flex',
          gap: '12px',
          marginBottom: '28px',
          maxWidth: '540px',
        }}
      >
        <div style={{ position: 'relative', flex: 1 }}>
          <input
            type="email"
            placeholder="Filter orders by customer email (e.g. rahul@example.com)"
            value={searchEmail}
            onChange={(e) => setSearchEmail(e.target.value)}
            style={{
              width: '100%',
              padding: '10px 14px 10px 38px',
              borderRadius: 'var(--radius-md)',
              border: '1.5px solid var(--color-border)',
              fontSize: '0.9rem',
            }}
          />
          <Search size={16} color="var(--color-text-light)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
        </div>
        <button type="submit" className="btn btn-primary btn-sm">
          Filter
        </button>
        {activeFilterEmail && (
          <button type="button" onClick={handleReset} className="btn btn-secondary btn-sm">
            Show All
          </button>
        )}
      </form>

      {/* Orders List */}
      {loading ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {[1, 2, 3].map((i) => (
            <div key={i} className="skeleton" style={{ height: '140px', borderRadius: 'var(--radius-xl)' }} />
          ))}
        </div>
      ) : orders.length === 0 ? (
        <EmptyState
          icon={Package}
          title={activeFilterEmail ? `No orders found for "${activeFilterEmail}"` : 'No orders recorded yet'}
          description="Explore our authentic menu, add your favourite dishes, and place your first demo order!"
          actionLabel="Explore Menu"
          onAction={() => onNavigate('menu')}
        />
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {orders.map((ord) => {
            const formattedDate = ord.created_at ? new Date(ord.created_at).toLocaleDateString('en-IN', {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            }) : 'Recent';

            const itemsCount = ord.items?.length || 0;
            const itemsSummary = ord.items?.map((i) => `${i.quantity}x ${i.name}`).join(', ');

            return (
              <div
                key={ord.order_id || ord.id}
                style={{
                  backgroundColor: '#ffffff',
                  borderRadius: 'var(--radius-xl)',
                  border: '1px solid var(--color-border)',
                  padding: '24px',
                  boxShadow: 'var(--shadow-xs)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px',
                  transition: 'all var(--transition-fast)',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.boxShadow = 'var(--shadow-md)')}
                onMouseLeave={(e) => (e.currentTarget.style.boxShadow = 'var(--shadow-xs)')}
              >
                {/* Order Top Bar */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div
                      style={{
                        padding: '4px 10px',
                        backgroundColor: 'var(--color-primary-light)',
                        borderRadius: 'var(--radius-sm)',
                        fontFamily: 'monospace',
                        fontWeight: 700,
                        fontSize: '0.9rem',
                        color: 'var(--color-primary)',
                      }}
                    >
                      {ord.order_id}
                    </div>
                    <span className="badge badge-success">
                      {ord.status || 'Confirmed'}
                    </span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8125rem', color: 'var(--color-text-light)' }}>
                    <Calendar size={14} />
                    <span>{formattedDate}</span>
                  </div>
                </div>

                {/* Items & Customer Summary */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px' }}>
                  <div style={{ flex: 1, minWidth: '240px' }}>
                    <div style={{ fontSize: '0.9375rem', fontWeight: 600, color: 'var(--color-text-main)', marginBottom: '4px' }}>
                      {itemsSummary || `${itemsCount} food items`}
                    </div>
                    <div style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)' }}>
                      Customer: <strong>{ord.customer?.name}</strong> • {ord.delivery_address?.city || 'Bengaluru'}
                    </div>
                  </div>

                  {/* Total & Action */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '0.75rem', color: 'var(--color-text-light)', textTransform: 'uppercase', fontWeight: 600 }}>
                        Total Amount
                      </div>
                      <div style={{ fontSize: '1.3rem', fontWeight: 800, fontFamily: 'var(--font-heading)', color: 'var(--color-text-main)' }}>
                        ₹{ord.pricing?.total?.toFixed(2) || '0.00'}
                      </div>
                    </div>

                    <button
                      onClick={() => onViewOrderDetails(ord.order_id)}
                      className="btn btn-secondary btn-sm"
                      style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
                    >
                      View Details <ExternalLink size={14} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default OrdersPage;
