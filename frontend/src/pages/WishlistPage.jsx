import React from 'react';
import { Heart, ShoppingBag, ArrowRight } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import ProductCard from '../components/common/ProductCard';
import EmptyState from '../components/common/EmptyState';

const WishlistPage = ({ onNavigate, onSelectProduct }) => {
  const { wishlist } = useWishlist();

  if (wishlist.length === 0) {
    return (
      <div className="container page-container">
        <EmptyState
          icon={Heart}
          title="Your Wishlist is Empty"
          description="Save dishes you love by clicking the heart icon on any product card, so you can easily order them next time."
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
            Saved Favourites ({wishlist.length})
          </h1>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9375rem', marginTop: '4px' }}>
            Your curated collection of beloved gourmet meals.
          </p>
        </div>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
          gap: '24px',
        }}
      >
        {wishlist.map((product) => (
          <ProductCard
            key={product.id || product.slug}
            product={product}
            onSelectProduct={onSelectProduct}
          />
        ))}
      </div>
    </div>
  );
};

export default WishlistPage;
