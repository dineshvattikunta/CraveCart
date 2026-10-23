import React from 'react';
import { ShoppingBag, Heart, ShieldCheck, Truck, Headphones, Utensils } from 'lucide-react';

const Footer = ({ onNavigate }) => {
  return (
    <footer
      style={{
        backgroundColor: '#111827',
        color: '#9ca3af',
        fontSize: '0.9rem',
        marginTop: 'auto',
      }}
    >
      {/* Trust & Guarantee Strip */}
      <div
        style={{
          borderBottom: '1px solid #1f2937',
          padding: '36px 0',
          backgroundColor: '#161f30',
        }}
      >
        <div
          className="container"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '24px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div
              style={{
                width: '46px',
                height: '46px',
                borderRadius: 'var(--radius-lg)',
                backgroundColor: 'rgba(230, 57, 70, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--color-primary)',
                flexShrink: 0,
              }}
            >
              <Utensils size={22} />
            </div>
            <div>
              <h5 style={{ color: '#ffffff', fontSize: '0.95rem', fontWeight: 600 }}>Fresh Gourmet Meals</h5>
              <p style={{ fontSize: '0.8125rem', color: '#9ca3af', marginTop: '2px' }}>
                Cooked fresh on order by top culinary chefs.
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div
              style={{
                width: '46px',
                height: '46px',
                borderRadius: 'var(--radius-lg)',
                backgroundColor: 'rgba(16, 185, 129, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--color-success)',
                flexShrink: 0,
              }}
            >
              <Truck size={22} />
            </div>
            <div>
              <h5 style={{ color: '#ffffff', fontSize: '0.95rem', fontWeight: 600 }}>Swift & Hot Delivery</h5>
              <p style={{ fontSize: '0.8125rem', color: '#9ca3af', marginTop: '2px' }}>
                Insulated thermal bags keep your food steaming hot.
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div
              style={{
                width: '46px',
                height: '46px',
                borderRadius: 'var(--radius-lg)',
                backgroundColor: 'rgba(245, 158, 11, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--color-warning)',
                flexShrink: 0,
              }}
            >
              <ShieldCheck size={22} />
            </div>
            <div>
              <h5 style={{ color: '#ffffff', fontSize: '0.95rem', fontWeight: 600 }}>Verified Quality</h5>
              <p style={{ fontSize: '0.8125rem', color: '#9ca3af', marginTop: '2px' }}>
                100% hygienic kitchen standards & audits.
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div
              style={{
                width: '46px',
                height: '46px',
                borderRadius: 'var(--radius-lg)',
                backgroundColor: 'rgba(59, 130, 246, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--color-info)',
                flexShrink: 0,
              }}
            >
              <Headphones size={22} />
            </div>
            <div>
              <h5 style={{ color: '#ffffff', fontSize: '0.95rem', fontWeight: 600 }}>Customer Assistance</h5>
              <p style={{ fontSize: '0.8125rem', color: '#9ca3af', marginTop: '2px' }}>
                Friendly support ready to assist your craving.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div style={{ padding: '56px 0 36px' }}>
        <div
          className="container"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '40px',
          }}
        >
          {/* Brand Column */}
          <div style={{ gridColumn: 'span 1' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: 'var(--color-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffffff',
                }}
              >
                <ShoppingBag size={18} />
              </div>
              <span
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1.35rem',
                  fontWeight: 800,
                  color: '#ffffff',
                }}
              >
                Crave<span style={{ color: 'var(--color-primary)' }}>Cart</span>
              </span>
            </div>
            <p style={{ fontSize: '0.875rem', lineHeight: 1.6, color: '#9ca3af', marginBottom: '16px' }}>
              Crafted with culinary passion and modern engineering. Delivering artisanal burgers, authentic biryanis, hand-tossed pizzas, and wholesome bowls straight to your doorstep.
            </p>
            <div style={{ fontSize: '0.8125rem', color: '#6b7280' }}>
              University DevOps Final Project Demo.
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ color: '#ffffff', fontSize: '0.9375rem', fontWeight: 700, marginBottom: '16px', letterSpacing: '0.02em' }}>
              Navigation
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <li>
                <a href="#home" onClick={(e) => { e.preventDefault(); onNavigate('home'); }}>
                  Home
                </a>
              </li>
              <li>
                <a href="#menu" onClick={(e) => { e.preventDefault(); onNavigate('menu'); }}>
                  Explore Menu
                </a>
              </li>
              <li>
                <a href="#offers" onClick={(e) => { e.preventDefault(); onNavigate('offers'); }}>
                  Deals & Offers
                </a>
              </li>
              <li>
                <a href="#orders" onClick={(e) => { e.preventDefault(); onNavigate('orders'); }}>
                  Track Orders
                </a>
              </li>
              <li>
                <a href="#wishlist" onClick={(e) => { e.preventDefault(); onNavigate('wishlist'); }}>
                  Saved Favourites
                </a>
              </li>
            </ul>
          </div>

          {/* Cuisines */}
          <div>
            <h4 style={{ color: '#ffffff', fontSize: '0.9375rem', fontWeight: 700, marginBottom: '16px', letterSpacing: '0.02em' }}>
              Popular Cuisines
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <li>
                <a href="#menu" onClick={(e) => { e.preventDefault(); onNavigate('menu', { category: 'Biryani' }); }}>
                  Royal Biryani
                </a>
              </li>
              <li>
                <a href="#menu" onClick={(e) => { e.preventDefault(); onNavigate('menu', { category: 'Pizza' }); }}>
                  Wood-Fired Pizza
                </a>
              </li>
              <li>
                <a href="#menu" onClick={(e) => { e.preventDefault(); onNavigate('menu', { category: 'Burgers' }); }}>
                  Gourmet Burgers
                </a>
              </li>
              <li>
                <a href="#menu" onClick={(e) => { e.preventDefault(); onNavigate('menu', { category: 'Indian' }); }}>
                  North Indian Curries
                </a>
              </li>
              <li>
                <a href="#menu" onClick={(e) => { e.preventDefault(); onNavigate('menu', { category: 'Healthy' }); }}>
                  Superfood Bowls
                </a>
              </li>
            </ul>
          </div>

          {/* Support & Contact */}
          <div>
            <h4 style={{ color: '#ffffff', fontSize: '0.9375rem', fontWeight: 700, marginBottom: '16px', letterSpacing: '0.02em' }}>
              Customer Care
            </h4>
            <p style={{ fontSize: '0.875rem', color: '#9ca3af', marginBottom: '8px' }}>
              Support Hotline: <span style={{ color: '#ffffff', fontWeight: 600 }}>1800-CRAVE-CART</span>
            </p>
            <p style={{ fontSize: '0.875rem', color: '#9ca3af', marginBottom: '16px' }}>
              Email: <span style={{ color: '#ffffff' }}>support@cravecart.demo</span>
            </p>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <span className="badge" style={{ backgroundColor: '#1f2937', color: '#e5e7eb' }}>
                7 Days a Week
              </span>
              <span className="badge" style={{ backgroundColor: '#1f2937', color: '#e5e7eb' }}>
                10 AM - 12 Midnight
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Sub-footer */}
      <div
        style={{
          borderTop: '1px solid #1f2937',
          padding: '20px 0',
          fontSize: '0.8125rem',
          color: '#6b7280',
        }}
      >
        <div
          className="container"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '12px',
          }}
        >
          <div>
            © 2026 CraveCart Platform Inc. All rights reserved. Built for University DevOps & Cloud Architecture.
          </div>
          <div style={{ display: 'flex', gap: '20px' }}>
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Security Architecture</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
