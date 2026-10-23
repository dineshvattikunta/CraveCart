import React, { useState, useEffect } from 'react';
import {
  ArrowRight,
  Sparkles,
  Flame,
  Clock,
  Star,
  CheckCircle,
  Tag,
  ShieldCheck,
  ChevronRight,
  TrendingUp,
} from 'lucide-react';
import api from '../services/api';
import ProductCard from '../components/common/ProductCard';
import { ProductGridSkeleton } from '../components/common/LoadingSkeleton';

const CATEGORY_TILES = [
  { name: 'Burgers', slug: 'Burgers', icon: '🍔', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=400&q=80' },
  { name: 'Pizza', slug: 'Pizza', icon: '🍕', image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=400&q=80' },
  { name: 'Indian', slug: 'Indian', icon: '🥘', image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=400&q=80' },
  { name: 'Biryani', slug: 'Biryani', icon: '🍚', image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=400&q=80' },
  { name: 'Asian', slug: 'Asian', icon: '🍜', image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=400&q=80' },
  { name: 'Desserts', slug: 'Desserts', icon: '🍰', image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=400&q=80' },
  { name: 'Healthy', slug: 'Healthy', icon: '🥗', image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=400&q=80' },
  { name: 'Beverages', slug: 'Beverages', icon: '🥤', image: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=400&q=80' },
];

const HomePage = ({ onNavigate, onSelectProduct }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    let isMounted = true;
    async function loadData() {
      try {
        setLoading(true);
        const res = await api.getProducts({ limit: 40 });
        if (isMounted && res.data) {
          setProducts(res.data);
        }
      } catch (err) {
        console.error('Failed to load homepage products:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    loadData();
    return () => { isMounted = false; };
  }, []);

  // Filter tabs for featured section
  const filteredProducts = products.filter((p) => {
    if (activeTab === 'all') return true;
    if (activeTab === 'bestseller') return p.is_bestseller || p.rating >= 4.9;
    if (activeTab === 'veg') return p.vegetarian === true;
    if (activeTab === 'specials') return p.featured === true;
    return true;
  });

  const mostOrdered = products.filter((p) => p.is_bestseller).slice(0, 4);
  const under199 = products.filter((p) => p.price <= 249).slice(0, 4);
  const chefFavorites = products.filter((p) => p.rating >= 4.85).slice(0, 4);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '56px' }}>
      {/* -----------------------------------------------------------------
          1. HERO SECTION (Bazaar Pro Editorial Food Commerce)
          ----------------------------------------------------------------- */}
      <section
        style={{
          background: 'linear-gradient(135deg, #fdfbf7 0%, #f4efe6 100%)',
          borderBottom: '1px solid var(--color-border)',
          padding: '60px 0 70px',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <div
          className="container"
          style={{
            display: 'grid',
            gridTemplateColumns: '1.1fr 0.9fr',
            gap: '40px',
            alignItems: 'center',
          }}
        >
          {/* Hero Left Content */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
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
                width: 'fit-content',
              }}
            >
              <Sparkles size={16} />
              <span>Premium Gourmet Food Ordering</span>
            </div>

            <h1
              style={{
                fontSize: 'clamp(2.4rem, 5vw, 3.8rem)',
                fontWeight: 800,
                lineHeight: 1.1,
                letterSpacing: '-0.03em',
                color: 'var(--color-text-main)',
              }}
            >
              Good food. <br />
              <span style={{ color: 'var(--color-primary)' }}>Great mood.</span>
            </h1>

            <p
              style={{
                fontSize: 'clamp(1rem, 1.8vw, 1.15rem)',
                lineHeight: 1.6,
                color: 'var(--color-text-body)',
                maxWidth: '520px',
              }}
            >
              Discover your favourites, explore new flavours, and get delicious, piping-hot food delivered straight to your door.
            </p>

            <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', alignItems: 'center' }}>
              <button
                onClick={() => onNavigate('menu')}
                className="btn btn-primary btn-lg"
              >
                Explore Menu <ArrowRight size={18} />
              </button>
              <button
                onClick={() => onNavigate('offers')}
                className="btn btn-secondary btn-lg"
              >
                <Tag size={18} color="var(--color-primary)" />
                View Offers
              </button>
            </div>

            {/* Quick stats pills */}
            <div
              style={{
                display: 'flex',
                gap: '24px',
                paddingTop: '16px',
                borderTop: '1px solid rgba(0, 0, 0, 0.06)',
                flexWrap: 'wrap',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: 'var(--color-success)' }} />
                <span style={{ fontSize: '0.875rem', fontWeight: 600 }}>⚡ 30 Min Delivery</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Star size={14} fill="#f59e0b" color="#f59e0b" />
                <span style={{ fontSize: '0.875rem', fontWeight: 600 }}>4.9 Average Rating</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CheckCircle size={14} color="var(--color-primary)" />
                <span style={{ fontSize: '0.875rem', fontWeight: 600 }}>100% Fresh Ingredients</span>
              </div>
            </div>
          </div>

          {/* Hero Right Composition */}
          <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
            <div
              style={{
                position: 'relative',
                width: '100%',
                maxWidth: '460px',
                aspectRatio: '1/1',
                borderRadius: 'var(--radius-xl)',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-xl)',
                border: '6px solid #ffffff',
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1000&q=80"
                alt="Culinary Gastronomy Platter"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />

              {/* Floating Badge Card 1 */}
              <div
                style={{
                  position: 'absolute',
                  top: '20px',
                  left: '20px',
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  backdropFilter: 'blur(8px)',
                  padding: '10px 16px',
                  borderRadius: 'var(--radius-lg)',
                  boxShadow: 'var(--shadow-lg)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                }}
              >
                <div
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--color-primary-light)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--color-primary)',
                  }}
                >
                  <Flame size={18} />
                </div>
                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Hot Pick</div>
                  <div style={{ fontSize: '0.875rem', fontWeight: 700 }}>Dum Biryani & Kebabs</div>
                </div>
              </div>

              {/* Floating Badge Card 2 */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '20px',
                  right: '20px',
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  backdropFilter: 'blur(8px)',
                  padding: '10px 16px',
                  borderRadius: 'var(--radius-lg)',
                  boxShadow: 'var(--shadow-lg)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                }}
              >
                <div
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--color-success-bg)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--color-success)',
                  }}
                >
                  <Clock size={18} />
                </div>
                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Express Prep</div>
                  <div style={{ fontSize: '0.875rem', fontWeight: 700 }}>Under 25 mins</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* -----------------------------------------------------------------
          2. CATEGORY NAVIGATION TILES
          ----------------------------------------------------------------- */}
      <section className="container">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
          <div>
            <h2 style={{ fontSize: '1.75rem', fontWeight: 800, letterSpacing: '-0.02em' }}>
              Explore by Cuisine
            </h2>
            <p style={{ fontSize: '0.9375rem', color: 'var(--color-text-muted)', marginTop: '4px' }}>
              Hand-picked recipes cooked fresh across our signature cuisines
            </p>
          </div>
          <button
            onClick={() => onNavigate('menu')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              fontSize: '0.9rem',
              fontWeight: 700,
              color: 'var(--color-primary)',
            }}
          >
            All Categories <ChevronRight size={18} />
          </button>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))',
            gap: '16px',
          }}
        >
          {CATEGORY_TILES.map((cat) => (
            <div
              key={cat.slug}
              onClick={() => onNavigate('menu', { category: cat.slug })}
              style={{
                backgroundColor: '#ffffff',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--color-border)',
                padding: '16px 10px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                gap: '10px',
                cursor: 'pointer',
                transition: 'all var(--transition-normal)',
                boxShadow: 'var(--shadow-xs)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.borderColor = 'var(--color-primary)';
                e.currentTarget.style.boxShadow = 'var(--shadow-md)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = 'var(--color-border)';
                e.currentTarget.style.boxShadow = 'var(--shadow-xs)';
              }}
            >
              <div
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  overflow: 'hidden',
                  backgroundColor: 'var(--color-surface-bg)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: 'var(--shadow-xs)',
                }}
              >
                <img
                  src={cat.image}
                  alt={cat.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <span style={{ fontSize: '0.9375rem', fontWeight: 700, color: 'var(--color-text-main)' }}>
                {cat.name}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* -----------------------------------------------------------------
          3. PROMOTIONAL EDITORIAL BANNERS
          ----------------------------------------------------------------- */}
      <section className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '24px',
          }}
        >
          {/* Banner 1: Biryani */}
          <div
            onClick={() => onNavigate('menu', { category: 'Biryani' })}
            style={{
              borderRadius: 'var(--radius-xl)',
              overflow: 'hidden',
              position: 'relative',
              minHeight: '220px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              padding: '32px',
              background: 'linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.7)), url(https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80) center/cover',
              color: '#ffffff',
              boxShadow: 'var(--shadow-md)',
              transition: 'transform var(--transition-normal)',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.01)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          >
            <div style={{ maxWidth: '300px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <span className="badge badge-bestseller" style={{ width: 'fit-content' }}>
                Weekend Special
              </span>
              <h3 style={{ fontSize: '1.6rem', color: '#ffffff', fontWeight: 800 }}>
                Royal Dum Biryani Feast
              </h3>
              <p style={{ fontSize: '0.875rem', color: '#e5e7eb' }}>
                Layered with saffron, browned onions and tender cuts. Flat 25% Off.
              </p>
              <div style={{ marginTop: '8px', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 700, fontSize: '0.875rem' }}>
                Order Now <ArrowRight size={16} />
              </div>
            </div>
          </div>

          {/* Banner 2: Pizza */}
          <div
            onClick={() => onNavigate('menu', { category: 'Pizza' })}
            style={{
              borderRadius: 'var(--radius-xl)',
              overflow: 'hidden',
              position: 'relative',
              minHeight: '220px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              padding: '32px',
              background: 'linear-gradient(rgba(0, 0, 0, 0.55), rgba(0, 0, 0, 0.7)), url(https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80) center/cover',
              color: '#ffffff',
              boxShadow: 'var(--shadow-md)',
              transition: 'transform var(--transition-normal)',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.01)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          >
            <div style={{ maxWidth: '300px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <span className="badge badge-primary" style={{ width: 'fit-content', backgroundColor: '#e63946', color: '#ffffff' }}>
                Artisanal Italian
              </span>
              <h3 style={{ fontSize: '1.6rem', color: '#ffffff', fontWeight: 800 }}>
                Wood-Fired Crusts
              </h3>
              <p style={{ fontSize: '0.875rem', color: '#e5e7eb' }}>
                San Marzano sauce, fresh fior di latte, and hot honey drizzle.
              </p>
              <div style={{ marginTop: '8px', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 700, fontSize: '0.875rem' }}>
                Explore Pizzas <ArrowRight size={16} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* -----------------------------------------------------------------
          4. FEATURED FOOD COLLECTION WITH TABS
          ----------------------------------------------------------------- */}
      <section className="container">
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            marginBottom: '32px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <h2 style={{ fontSize: '1.75rem', fontWeight: 800, letterSpacing: '-0.02em' }}>
                Featured Dishes
              </h2>
              <p style={{ fontSize: '0.9375rem', color: 'var(--color-text-muted)', marginTop: '4px' }}>
                Top-rated dishes prepared freshly with premium ingredients
              </p>
            </div>

            {/* Filter Tabs */}
            <div
              style={{
                display: 'inline-flex',
                backgroundColor: '#ffffff',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-full)',
                padding: '4px',
                boxShadow: 'var(--shadow-xs)',
              }}
            >
              {[
                { id: 'all', label: 'All Items' },
                { id: 'bestseller', label: 'Bestsellers 🔥' },
                { id: 'specials', label: "Chef's Specials" },
                { id: 'veg', label: 'Pure Veg 🥗' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    padding: '8px 16px',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    backgroundColor: activeTab === tab.id ? 'var(--color-primary)' : 'transparent',
                    color: activeTab === tab.id ? '#ffffff' : 'var(--color-text-body)',
                    transition: 'all var(--transition-fast)',
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {loading ? (
          <ProductGridSkeleton count={8} />
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
              gap: '24px',
            }}
          >
            {filteredProducts.slice(0, 8).map((product) => (
              <ProductCard
                key={product.id || product.slug}
                product={product}
                onSelectProduct={onSelectProduct}
              />
            ))}
          </div>
        )}

        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '36px' }}>
          <button
            onClick={() => onNavigate('menu')}
            className="btn btn-secondary btn-lg"
          >
            View Full Menu ({products.length} Items) <ArrowRight size={18} />
          </button>
        </div>
      </section>

      {/* -----------------------------------------------------------------
          5. POPULAR & RECOMMENDED ITEMS SECTIONS
          ----------------------------------------------------------------- */}
      {/* Most Ordered */}
      {mostOrdered.length > 0 && (
        <section className="container">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px' }}>
            <TrendingUp size={22} color="var(--color-primary)" />
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Most Ordered by Foodies</h2>
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
              gap: '24px',
            }}
          >
            {mostOrdered.map((product) => (
              <ProductCard
                key={product.id || product.slug}
                product={product}
                onSelectProduct={onSelectProduct}
              />
            ))}
          </div>
        </section>
      )}

      {/* Quick Bites & Sips Under ₹249 */}
      {under199.length > 0 && (
        <section
          style={{
            backgroundColor: 'var(--color-surface-warm)',
            borderTop: '1px solid var(--color-border)',
            borderBottom: '1px solid var(--color-border)',
            padding: '48px 0',
          }}
        >
          <div className="container">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
              <div>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Pocket-Friendly Delights (Under ₹250)</h2>
                <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
                  Satisfying shakes, refreshing lassis, artisanal chai & quick bites
                </p>
              </div>
              <button
                onClick={() => onNavigate('menu', { max_price: 250 })}
                style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--color-primary)', display: 'flex', alignItems: 'center' }}
              >
                See All <ChevronRight size={16} />
              </button>
            </div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
                gap: '24px',
              }}
            >
              {under199.map((product) => (
                <ProductCard
                  key={product.id || product.slug}
                  product={product}
                  onSelectProduct={onSelectProduct}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      <style>{`
        @media (max-width: 900px) {
          section > .container {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};

export default HomePage;
