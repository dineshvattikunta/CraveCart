import React, { useState } from 'react';
import { Heart, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { DietaryIndicator, BestsellerBadge, DiscountBadge, PrepTimeBadge } from './Badge';
import RatingStars from './RatingStars';

const FALLBACK_FOOD_IMG = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80';

const ProductCard = ({ product, onSelectProduct }) => {
  const { items, addToCart, updateQuantity } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const [imgSrc, setImgSrc] = useState(product.image || FALLBACK_FOOD_IMG);
  const [isHovered, setIsHovered] = useState(false);

  const productId = product.id || product._id || product.slug;
  const inWishlist = isInWishlist(productId);

  const cartItem = items.find((i) => i.id === productId);
  const cartQty = cartItem ? cartItem.quantity : 0;

  const discountPercent = product.original_price
    ? Math.round(((product.original_price - product.price) / product.original_price) * 100)
    : 0;

  const handleCardClick = (e) => {
    // Avoid clicking when user interacts with button or wishlist toggle
    if (e.target.closest('button')) return;
    if (onSelectProduct) {
      onSelectProduct(product);
    }
  };

  return (
    <div
      onClick={handleCardClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        backgroundColor: '#ffffff',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--color-border)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: isHovered ? 'var(--shadow-md)' : 'var(--shadow-xs)',
        transform: isHovered ? 'translateY(-3px)' : 'translateY(0)',
        transition: 'all var(--transition-normal)',
        cursor: onSelectProduct ? 'pointer' : 'default',
        position: 'relative',
      }}
    >
      {/* Food Image Container */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          aspectRatio: '4/3',
          overflow: 'hidden',
          backgroundColor: '#f3f4f6',
        }}
      >
        <img
          src={imgSrc}
          alt={product.name}
          onError={() => setImgSrc(FALLBACK_FOOD_IMG)}
          loading="lazy"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transform: isHovered ? 'scale(1.04)' : 'scale(1)',
            transition: 'transform 0.4s ease',
          }}
        />

        {/* Top Badges Overlay */}
        <div
          style={{
            position: 'absolute',
            top: '12px',
            left: '12px',
            right: '12px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            pointerEvents: 'none',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', alignItems: 'flex-start' }}>
            {product.is_bestseller && <BestsellerBadge />}
            {discountPercent > 0 && <DiscountBadge discountPercent={discountPercent} />}
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              toggleWishlist(product);
            }}
            style={{
              pointerEvents: 'auto',
              width: '34px',
              height: '34px',
              borderRadius: '50%',
              backgroundColor: '#ffffff',
              boxShadow: 'var(--shadow-sm)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: inWishlist ? 'var(--color-primary)' : 'var(--color-text-muted)',
              border: 'none',
              cursor: 'pointer',
              transition: 'transform var(--transition-fast)',
            }}
            aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            <Heart size={18} fill={inWishlist ? 'var(--color-primary)' : 'none'} />
          </button>
        </div>
      </div>

      {/* Card Content */}
      <div
        style={{
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          justifyContent: 'space-between',
          gap: '12px',
        }}
      >
        <div>
          {/* Category & Diet Symbol */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '6px',
            }}
          >
            <span
              style={{
                fontSize: '0.75rem',
                textTransform: 'uppercase',
                fontWeight: 700,
                color: 'var(--color-text-light)',
                letterSpacing: '0.05em',
              }}
            >
              {product.category}
            </span>
            <DietaryIndicator isVegetarian={product.vegetarian} size="sm" />
          </div>

          {/* Product Name */}
          <h4
            style={{
              fontSize: '1.05rem',
              fontWeight: 700,
              color: 'var(--color-text-main)',
              lineHeight: 1.3,
              marginBottom: '6px',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {product.name}
          </h4>

          {/* Rating and Prep Time */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
            <RatingStars rating={product.rating} reviewCount={product.review_count} />
            {product.preparation_time && <PrepTimeBadge time={product.preparation_time} />}
          </div>
        </div>

        {/* Price & Action Row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: '10px',
            borderTop: '1px solid var(--color-border-subtle)',
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
              <span
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1.2rem',
                  fontWeight: 800,
                  color: 'var(--color-text-main)',
                }}
              >
                ₹{product.price}
              </span>
              {product.original_price && (
                <span
                  style={{
                    fontSize: '0.8125rem',
                    color: 'var(--color-text-light)',
                    textDecoration: 'line-through',
                  }}
                >
                  ₹{product.original_price}
                </span>
              )}
            </div>
          </div>

          {/* Add to Cart / Quantity Stepper */}
          {cartQty > 0 ? (
            <div
              onClick={(e) => e.stopPropagation()}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                backgroundColor: 'var(--color-primary-light)',
                border: '1px solid var(--color-primary-tint)',
                borderRadius: 'var(--radius-md)',
                overflow: 'hidden',
                padding: '2px',
              }}
            >
              <button
                type="button"
                onClick={() => updateQuantity(productId, cartQty - 1)}
                style={{
                  width: '28px',
                  height: '28px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--color-primary)',
                  borderRadius: 'var(--radius-xs)',
                }}
                aria-label="Decrease quantity"
              >
                <Minus size={14} />
              </button>
              <span
                style={{
                  minWidth: '24px',
                  textAlign: 'center',
                  fontSize: '0.875rem',
                  fontWeight: 700,
                  color: 'var(--color-primary)',
                }}
              >
                {cartQty}
              </span>
              <button
                type="button"
                onClick={() => updateQuantity(productId, cartQty + 1)}
                style={{
                  width: '28px',
                  height: '28px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--color-primary)',
                  borderRadius: 'var(--radius-xs)',
                }}
                aria-label="Increase quantity"
              >
                <Plus size={14} />
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                addToCart(product, 1);
              }}
              className="btn btn-sm"
              style={{
                backgroundColor: 'var(--color-primary)',
                color: '#ffffff',
                gap: '4px',
                padding: '6px 12px',
                borderRadius: 'var(--radius-md)',
                fontWeight: 600,
              }}
            >
              <Plus size={15} />
              Add
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
