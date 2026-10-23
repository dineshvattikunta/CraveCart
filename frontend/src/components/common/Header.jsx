import React, { useState } from 'react';
import {
  MapPin,
  Search,
  ShoppingBag,
  Heart,
  User,
  Menu as MenuIcon,
  X,
  ChevronDown,
  Sparkles,
  Compass,
  Tag,
  Clock,
  ArrowRight,
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';

const LOCATIONS = [
  'Indiranagar, Bengaluru',
  'Koramangala, Bengaluru',
  'Bandra West, Mumbai',
  'Connaught Place, New Delhi',
  'Hitech City, Hyderabad',
  'Anna Nagar, Chennai',
];

const Header = ({ currentRoute, onNavigate, searchQuery, onSearchChange, onSearchSubmit }) => {
  const { totalCount, setIsCartDrawerOpen } = useCart();
  const { wishlist } = useWishlist();

  const [selectedLocation, setSelectedLocation] = useState(LOCATIONS[0]);
  const [isLocationDropdownOpen, setIsLocationDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [localSearch, setLocalSearch] = useState(searchQuery || '');

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (onSearchSubmit) {
      onSearchSubmit(localSearch);
    }
    if (onNavigate) {
      onNavigate('menu');
    }
  };

  const navLinks = [
    { id: 'home', label: 'Home', icon: null },
    { id: 'menu', label: 'Explore Menu', icon: Compass },
    { id: 'offers', label: 'Offers', icon: Tag },
    { id: 'orders', label: 'My Orders', icon: Clock },
  ];

  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 1000, backgroundColor: '#ffffff' }}>
      {/* ----------------- Top Announcement Bar ----------------- */}
      <div
        style={{
          backgroundColor: 'var(--color-text-main)',
          color: '#f9fafb',
          fontSize: '0.8125rem',
          padding: '8px var(--container-padding)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          letterSpacing: '0.01em',
        }}
      >
        <Sparkles size={14} color="#f59e0b" />
        <span>Fresh flavours, delivered to your doorstep.</span>
        <span style={{ opacity: 0.4 }}>•</span>
        <span style={{ color: '#fef08a', fontWeight: 600 }}>
          Free Delivery over ₹499 with code <strong>CRAVE20</strong>
        </span>
      </div>

      {/* ----------------- Main Navigation Header ----------------- */}
      <div
        style={{
          borderBottom: '1px solid var(--color-border)',
          backgroundColor: '#ffffff',
          boxShadow: 'var(--shadow-xs)',
        }}
      >
        <div
          className="container"
          style={{
            height: 'var(--header-height)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '20px',
          }}
        >
          {/* Brand Logo & Location */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <div
              onClick={() => onNavigate('home')}
              style={{
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                userSelect: 'none',
              }}
            >
              <div
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--color-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffffff',
                  boxShadow: '0 4px 10px rgba(230, 57, 70, 0.3)',
                }}
              >
                <ShoppingBag size={20} />
              </div>
              <div>
                <span
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1.45rem',
                    fontWeight: 800,
                    letterSpacing: '-0.02em',
                    color: 'var(--color-text-main)',
                  }}
                >
                  Crave<span style={{ color: 'var(--color-primary)' }}>Cart</span>
                </span>
              </div>
            </div>

            {/* Delivery Location Selector */}
            <div style={{ position: 'relative' }} className="hide-on-mobile">
              <button
                type="button"
                onClick={() => setIsLocationDropdownOpen(!isLocationDropdownOpen)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '6px 12px',
                  backgroundColor: 'var(--color-surface-subtle)',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.8125rem',
                  fontWeight: 600,
                  color: 'var(--color-text-body)',
                }}
              >
                <MapPin size={14} color="var(--color-primary)" />
                <span style={{ maxWidth: '160px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {selectedLocation}
                </span>
                <ChevronDown size={14} />
              </button>

              {isLocationDropdownOpen && (
                <div
                  style={{
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    marginTop: '8px',
                    width: '240px',
                    backgroundColor: '#ffffff',
                    borderRadius: 'var(--radius-lg)',
                    boxShadow: 'var(--shadow-xl)',
                    border: '1px solid var(--color-border)',
                    padding: '8px',
                    zIndex: 100,
                  }}
                >
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-text-light)', padding: '6px 10px', textTransform: 'uppercase' }}>
                    Select Delivery Zone
                  </div>
                  {LOCATIONS.map((loc) => (
                    <div
                      key={loc}
                      onClick={() => {
                        setSelectedLocation(loc);
                        setIsLocationDropdownOpen(false);
                      }}
                      style={{
                        padding: '8px 10px',
                        fontSize: '0.875rem',
                        borderRadius: 'var(--radius-sm)',
                        cursor: 'pointer',
                        color: selectedLocation === loc ? 'var(--color-primary)' : 'var(--color-text-body)',
                        backgroundColor: selectedLocation === loc ? 'var(--color-primary-light)' : 'transparent',
                        fontWeight: selectedLocation === loc ? 600 : 400,
                      }}
                    >
                      {loc}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Search Bar - Center */}
          <form
            onSubmit={handleSearchSubmit}
            style={{
              flex: 1,
              maxWidth: '440px',
              position: 'relative',
            }}
            className="hide-on-mobile"
          >
            <input
              type="text"
              placeholder="Search dishes, burgers, biryanis..."
              value={localSearch}
              onChange={(e) => {
                setLocalSearch(e.target.value);
                if (onSearchChange) onSearchChange(e.target.value);
              }}
              style={{
                width: '100%',
                padding: '10px 42px 10px 38px',
                borderRadius: 'var(--radius-full)',
                border: '1.5px solid var(--color-border)',
                backgroundColor: 'var(--color-surface-bg)',
                fontSize: '0.875rem',
                outline: 'none',
                transition: 'all var(--transition-fast)',
              }}
              onFocus={(e) => {
                e.target.style.borderColor = 'var(--color-primary)';
                e.target.style.backgroundColor = '#ffffff';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'var(--color-border)';
                e.target.style.backgroundColor = 'var(--color-surface-bg)';
              }}
            />
            <Search
              size={17}
              color="var(--color-text-light)"
              style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }}
            />
            {localSearch && (
              <button
                type="button"
                onClick={() => {
                  setLocalSearch('');
                  if (onSearchChange) onSearchChange('');
                }}
                style={{
                  position: 'absolute',
                  right: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'var(--color-text-light)',
                  padding: '2px',
                }}
              >
                <X size={15} />
              </button>
            )}
          </form>

          {/* Nav Links & Actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <nav style={{ display: 'flex', alignItems: 'center', gap: '4px' }} className="hide-on-mobile">
              {navLinks.map((link) => {
                const isActive = currentRoute === link.id;
                return (
                  <button
                    key={link.id}
                    onClick={() => onNavigate(link.id)}
                    style={{
                      padding: '8px 14px',
                      borderRadius: 'var(--radius-md)',
                      fontSize: '0.9rem',
                      fontWeight: isActive ? 700 : 500,
                      color: isActive ? 'var(--color-primary)' : 'var(--color-text-body)',
                      backgroundColor: isActive ? 'var(--color-primary-light)' : 'transparent',
                    }}
                  >
                    {link.label}
                  </button>
                );
              })}
            </nav>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              {/* Wishlist Link */}
              <button
                onClick={() => onNavigate('wishlist')}
                style={{
                  position: 'relative',
                  width: '40px',
                  height: '40px',
                  borderRadius: 'var(--radius-full)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: currentRoute === 'wishlist' ? 'var(--color-primary-light)' : 'var(--color-surface-subtle)',
                  color: currentRoute === 'wishlist' ? 'var(--color-primary)' : 'var(--color-text-main)',
                }}
                aria-label="Wishlist"
                title="Wishlist"
              >
                <Heart size={19} fill={wishlist.length > 0 ? 'var(--color-primary)' : 'none'} color={wishlist.length > 0 ? 'var(--color-primary)' : 'currentColor'} />
                {wishlist.length > 0 && (
                  <span
                    style={{
                      position: 'absolute',
                      top: '-2px',
                      right: '-2px',
                      minWidth: '18px',
                      height: '18px',
                      borderRadius: '999px',
                      backgroundColor: 'var(--color-primary)',
                      color: '#ffffff',
                      fontSize: '0.6875rem',
                      fontWeight: 700,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: '0 4px',
                      boxShadow: '0 2px 4px rgba(230, 57, 70, 0.4)',
                    }}
                  >
                    {wishlist.length}
                  </span>
                )}
              </button>

              {/* Cart Trigger */}
              <button
                onClick={() => setIsCartDrawerOpen(true)}
                style={{
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '8px 16px',
                  borderRadius: 'var(--radius-full)',
                  backgroundColor: 'var(--color-primary)',
                  color: '#ffffff',
                  boxShadow: '0 4px 12px rgba(230, 57, 70, 0.3)',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                }}
                aria-label="Shopping Cart"
              >
                <ShoppingBag size={18} />
                <span className="hide-on-mobile">Cart</span>
                <span
                  style={{
                    backgroundColor: '#ffffff',
                    color: 'var(--color-primary)',
                    minWidth: '20px',
                    height: '20px',
                    borderRadius: '999px',
                    fontSize: '0.75rem',
                    fontWeight: 800,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '0 5px',
                  }}
                >
                  {totalCount}
                </span>
              </button>

              {/* Mobile Menu Toggle Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                style={{
                  display: 'none',
                  padding: '8px',
                  color: 'var(--color-text-main)',
                }}
                className="show-on-mobile"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X size={24} /> : <MenuIcon size={24} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            top: 'calc(var(--announcement-height) + var(--header-height))',
            backgroundColor: '#ffffff',
            zIndex: 999,
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            overflowY: 'auto',
          }}
        >
          {/* Mobile Search */}
          <form onSubmit={handleSearchSubmit} style={{ position: 'relative' }}>
            <input
              type="text"
              placeholder="Search food items..."
              value={localSearch}
              onChange={(e) => {
                setLocalSearch(e.target.value);
                if (onSearchChange) onSearchChange(e.target.value);
              }}
              style={{
                width: '100%',
                padding: '12px 14px 12px 38px',
                borderRadius: 'var(--radius-md)',
                border: '1.5px solid var(--color-border)',
                fontSize: '0.9375rem',
              }}
            />
            <Search size={18} color="var(--color-text-light)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
          </form>

          {/* Location on Mobile */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 0', borderBottom: '1px solid var(--color-border-subtle)' }}>
            <MapPin size={18} color="var(--color-primary)" />
            <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>{selectedLocation}</span>
          </div>

          {/* Navigation Links */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => {
                  onNavigate(link.id);
                  setIsMobileMenuOpen(false);
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px 16px',
                  borderRadius: 'var(--radius-md)',
                  fontSize: '1rem',
                  fontWeight: currentRoute === link.id ? 700 : 500,
                  backgroundColor: currentRoute === link.id ? 'var(--color-primary-light)' : 'var(--color-surface-subtle)',
                  color: currentRoute === link.id ? 'var(--color-primary)' : 'var(--color-text-main)',
                }}
              >
                <span>{link.label}</span>
                <ArrowRight size={16} />
              </button>
            ))}
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 900px) {
          .hide-on-mobile { display: none !important; }
          .show-on-mobile { display: flex !important; }
        }
        @media (min-width: 901px) {
          .show-on-mobile { display: none !important; }
        }
      `}</style>
    </header>
  );
};

export default Header;
