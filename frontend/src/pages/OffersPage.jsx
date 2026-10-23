import React, { useState } from 'react';
import { Tag, Sparkles, Copy, Check, ArrowRight, Percent, Gift } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useNotification } from '../context/NotificationContext';

const OFFERS = [
  {
    code: 'CRAVE20',
    title: 'Flat 20% Off Your Entire Order',
    discount: '20% OFF',
    description: 'Enjoy 20% off all chef-prepared dishes up to a maximum savings of ₹150. Valid on all cuisines.',
    category: 'Universal Coupon',
    minOrder: '₹299',
    expiry: 'Valid all week',
    badge: 'Trending',
  },
  {
    code: 'FIRSTFREE',
    title: 'Free Express Doorstep Delivery',
    discount: 'FREE DELIVERY',
    description: 'Get 100% free delivery on any order size. Save ₹40 on instant door delivery.',
    category: 'Delivery Perk',
    minOrder: 'No minimum',
    expiry: 'Limited time',
    badge: 'Popular',
  },
  {
    code: 'BIRYANI25',
    title: 'Biryani Fiesta Weekend Special',
    discount: 'SPECIAL',
    description: 'Authentic Hyderabadi & Awadhi Dum Biryanis prepared with slow saffron basmati.',
    category: 'Cuisine Deal',
    targetCategory: 'Biryani',
    minOrder: '₹399',
    expiry: 'Fridays - Sundays',
    badge: 'Weekend',
  },
  {
    code: 'BURGERBOOM',
    title: 'Gourmet Burger & Beverage Combo',
    discount: 'COMBO',
    description: 'Order any artisanal brioche burger and get refreshing Alphonso mango lassi or iced chai.',
    category: 'Combo Offer',
    targetCategory: 'Burgers',
    minOrder: '₹349',
    expiry: 'Daily Deal',
    badge: 'Chef Special',
  },
];

const OffersPage = ({ onNavigate }) => {
  const { applyPromoCode } = useCart();
  const { notify } = useNotification();
  const [copiedCode, setCopiedCode] = useState(null);

  const handleCopy = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    applyPromoCode(code);
    notify(`Coupon ${code} copied & applied to your bag!`, 'success');
    setTimeout(() => setCopiedCode(null), 2500);
  };

  return (
    <div className="container page-container">
      {/* Header */}
      <div style={{ marginBottom: '36px', textAlign: 'center', maxWidth: '640px', margin: '0 auto 36px' }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 14px',
            backgroundColor: 'rgba(230, 57, 70, 0.08)',
            borderRadius: 'var(--radius-full)',
            color: 'var(--color-primary)',
            fontSize: '0.85rem',
            fontWeight: 700,
            marginBottom: '12px',
          }}
        >
          <Gift size={16} />
          <span>Exclusive Gastronomic Promotions</span>
        </div>
        <h1 style={{ fontSize: '2.4rem', fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--color-text-main)' }}>
          Deals & Promotional Codes
        </h1>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '1rem', marginTop: '6px' }}>
          Apply coupons during checkout or click below to automatically apply discounts to your shopping bag.
        </p>
      </div>

      {/* Offers Cards Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '24px',
        }}
      >
        {OFFERS.map((offer) => {
          const isCopied = copiedCode === offer.code;

          return (
            <div
              key={offer.code}
              style={{
                backgroundColor: '#ffffff',
                borderRadius: 'var(--radius-xl)',
                border: '1.5px solid var(--color-border)',
                padding: '28px',
                boxShadow: 'var(--shadow-sm)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: '20px',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Badge Strip */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span className="badge badge-primary" style={{ fontWeight: 700 }}>
                  {offer.category}
                </span>
                <span className="badge badge-bestseller">
                  {offer.badge}
                </span>
              </div>

              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-text-main)', marginBottom: '8px' }}>
                  {offer.title}
                </h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--color-text-body)', lineHeight: 1.5, marginBottom: '14px' }}>
                  {offer.description}
                </p>
                <div style={{ display: 'flex', gap: '16px', fontSize: '0.8125rem', color: 'var(--color-text-muted)' }}>
                  <span>Min Order: <strong>{offer.minOrder}</strong></span>
                  <span>•</span>
                  <span>{offer.expiry}</span>
                </div>
              </div>

              {/* Coupon Code Pill & Copy Action */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '8px 12px',
                  backgroundColor: 'var(--color-surface-subtle)',
                  borderRadius: 'var(--radius-md)',
                  border: '1.5px dashed var(--color-border-active)',
                }}
              >
                <div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--color-text-light)', display: 'block' }}>COUPON CODE</span>
                  <span style={{ fontFamily: 'monospace', fontWeight: 800, fontSize: '1.1rem', color: 'var(--color-primary)' }}>
                    {offer.code}
                  </span>
                </div>

                <button
                  onClick={() => handleCopy(offer.code)}
                  className="btn btn-sm"
                  style={{
                    backgroundColor: isCopied ? 'var(--color-success)' : 'var(--color-primary)',
                    color: '#ffffff',
                    gap: '4px',
                  }}
                >
                  {isCopied ? <Check size={14} /> : <Copy size={14} />}
                  {isCopied ? 'Applied!' : 'Apply Code'}
                </button>
              </div>

              {offer.targetCategory && (
                <button
                  onClick={() => onNavigate('menu', { category: offer.targetCategory })}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    color: 'var(--color-primary)',
                  }}
                >
                  Explore {offer.targetCategory} Menu <ArrowRight size={14} />
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OffersPage;
