import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  Heart,
  Plus,
  Minus,
  ShoppingBag,
  Clock,
  Flame,
  ShieldCheck,
  Share2,
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { DietaryIndicator, BestsellerBadge, DiscountBadge, PrepTimeBadge } from '../components/common/Badge';
import RatingStars from '../components/common/RatingStars';
import ProductCard from '../components/common/ProductCard';
import api from '../services/api';

const ProductDetailPage = ({ product, onBack, onSelectProduct, onNavigate }) => {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const [quantity, setQuantity] = useState(1);
  const [relatedProducts, setRelatedProducts] = useState([]);

  const productId = product.id || product._id || product.slug;
  const inWishlist = isInWishlist(productId);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setQuantity(1);

    // Fetch related products from same category
    if (product.category) {
      api.getProducts({ category: product.category, limit: 4 })
        .then((res) => {
          if (res.data) {
            setRelatedProducts(res.data.filter((p) => (p.id || p.slug) !== productId));
          }
        })
        .catch((err) => console.error(err));
    }
  }, [product]);

  const discountPercent = product.original_price
    ? Math.round(((product.original_price - product.price) / product.original_price) * 100)
    : 0;

  return (
    <div className="container page-container">
      {/* Back navigation button */}
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
        Back to Menu
      </button>

      {/* Main Product Showcase Card */}
      <div
        style={{
          backgroundColor: '#ffffff',
          borderRadius: 'var(--radius-xl)',
          border: '1px solid var(--color-border)',
          boxShadow: 'var(--shadow-sm)',
          overflow: 'hidden',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '40px',
          padding: '36px',
          marginBottom: '56px',
        }}
        className="product-detail-layout"
      >
        {/* Left: Product Image */}
        <div style={{ position: 'relative' }}>
          <div
            style={{
              width: '100%',
              aspectRatio: '4/3',
              borderRadius: 'var(--radius-lg)',
              overflow: 'hidden',
              boxShadow: 'var(--shadow-md)',
              backgroundColor: '#f3f4f6',
            }}
          >
            <img
              src={product.image}
              alt={product.name}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>

          {/* Quick Badges */}
          <div
            style={{
              position: 'absolute',
              top: '16px',
              left: '16px',
              display: 'flex',
              gap: '8px',
            }}
          >
            {product.is_bestseller && <BestsellerBadge />}
            {discountPercent > 0 && <DiscountBadge discountPercent={discountPercent} />}
          </div>
        </div>

        {/* Right: Product Details & Actions */}
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            {/* Category & Diet Symbol */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
              <span
                style={{
                  fontSize: '0.8125rem',
                  textTransform: 'uppercase',
                  fontWeight: 800,
                  color: 'var(--color-primary)',
                  letterSpacing: '0.05em',
                }}
              >
                {product.category}
              </span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: product.vegetarian ? 'var(--color-veg)' : 'var(--color-non-veg)' }}>
                  {product.vegetarian ? 'Pure Vegetarian' : 'Non-Vegetarian'}
                </span>
                <DietaryIndicator isVegetarian={product.vegetarian} size="lg" />
              </div>
            </div>

            {/* Title */}
            <h1
              style={{
                fontSize: 'clamp(1.75rem, 3vw, 2.25rem)',
                fontWeight: 800,
                color: 'var(--color-text-main)',
                lineHeight: 1.2,
                marginBottom: '12px',
              }}
            >
              {product.name}
            </h1>

            {/* Rating, Prep Time & Calories */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap', marginBottom: '20px' }}>
              <RatingStars rating={product.rating} reviewCount={product.review_count} size={16} />
              {product.preparation_time && <PrepTimeBadge time={product.preparation_time} />}
              {product.calories && (
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '0.8125rem', color: 'var(--color-text-muted)', fontWeight: 500 }}>
                  <Flame size={14} color="#f59e0b" />
                  {product.calories}
                </span>
              )}
            </div>

            {/* Price Row */}
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', marginBottom: '20px' }}>
              <span
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '2rem',
                  fontWeight: 800,
                  color: 'var(--color-text-main)',
                }}
              >
                ₹{product.price}
              </span>
              {product.original_price && (
                <span
                  style={{
                    fontSize: '1.1rem',
                    color: 'var(--color-text-light)',
                    textDecoration: 'line-through',
                  }}
                >
                  ₹{product.original_price}
                </span>
              )}
              {discountPercent > 0 && (
                <span className="badge badge-primary">
                  Save {discountPercent}%
                </span>
              )}
            </div>

            {/* Description */}
            <p style={{ fontSize: '1rem', lineHeight: 1.6, color: 'var(--color-text-body)', marginBottom: '28px' }}>
              {product.description}
            </p>

            {/* Tags */}
            {product.tags && product.tags.length > 0 && (
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '28px' }}>
                {product.tags.map((tag) => (
                  <span key={tag} className="badge badge-secondary" style={{ padding: '4px 10px' }}>
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Action Area: Stepper + Add to Cart + Wishlist */}
          <div
            style={{
              paddingTop: '20px',
              borderTop: '1px solid var(--color-border)',
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              flexWrap: 'wrap',
            }}
          >
            {/* Quantity Selector */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                backgroundColor: 'var(--color-surface-subtle)',
                borderRadius: 'var(--radius-md)',
                padding: '4px',
                border: '1px solid var(--color-border)',
              }}
            >
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                style={{ width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                aria-label="Decrease quantity"
              >
                <Minus size={16} />
              </button>
              <span
                style={{
                  minWidth: '36px',
                  textAlign: 'center',
                  fontWeight: 700,
                  fontSize: '1rem',
                }}
              >
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity((q) => q + 1)}
                style={{ width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                aria-label="Increase quantity"
              >
                <Plus size={16} />
              </button>
            </div>

            {/* Add to Cart CTA */}
            <button
              onClick={() => addToCart(product, quantity)}
              className="btn btn-primary btn-lg"
              style={{ flex: 1, minWidth: '180px' }}
            >
              <ShoppingBag size={20} />
              Add to Bag (₹{product.price * quantity})
            </button>

            {/* Wishlist Button */}
            <button
              type="button"
              onClick={() => toggleWishlist(product)}
              className="btn btn-secondary btn-icon"
              style={{
                width: '48px',
                height: '48px',
                color: inWishlist ? 'var(--color-primary)' : 'var(--color-text-body)',
              }}
              title={inWishlist ? 'Remove from wishlist' : 'Save to wishlist'}
            >
              <Heart size={22} fill={inWishlist ? 'var(--color-primary)' : 'none'} />
            </button>
          </div>
        </div>
      </div>

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <section>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 800 }}>
              More from {product.category}
            </h3>
            <button
              onClick={() => onNavigate('menu', { category: product.category })}
              style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--color-primary)' }}
            >
              View All
            </button>
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
              gap: '24px',
            }}
          >
            {relatedProducts.map((rel) => (
              <ProductCard
                key={rel.id || rel.slug}
                product={rel}
                onSelectProduct={onSelectProduct}
              />
            ))}
          </div>
        </section>
      )}

      <style>{`
        @media (max-width: 860px) {
          .product-detail-layout {
            grid-template-columns: 1fr !important;
            padding: 20px !important;
          }
        }
      `}</style>
    </div>
  );
};

export default ProductDetailPage;
