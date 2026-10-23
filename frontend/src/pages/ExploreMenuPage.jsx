import React, { useState, useEffect } from 'react';
import {
  Search,
  Filter,
  X,
  SlidersHorizontal,
  ArrowUpDown,
  Check,
  RotateCcw,
} from 'lucide-react';
import api from '../services/api';
import ProductCard from '../components/common/ProductCard';
import { ProductGridSkeleton } from '../components/common/LoadingSkeleton';
import EmptyState from '../components/common/EmptyState';
import { DietaryIndicator } from '../components/common/Badge';

const CATEGORIES = [
  'All',
  'Burgers',
  'Pizza',
  'Indian',
  'Biryani',
  'Asian',
  'Desserts',
  'Healthy',
  'Beverages',
];

const ExploreMenuPage = ({ initialCategory = 'All', initialSearch = '', onSelectProduct }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [isVegOnly, setIsVegOnly] = useState(false);
  const [priceRange, setPriceRange] = useState('all'); // 'all', 'under250', '250to450', 'above450'
  const [sortBy, setSortBy] = useState('featured'); // 'featured', 'price_asc', 'price_desc', 'rating', 'prep_time'
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(1);
  const [showMobileFilter, setShowMobileFilter] = useState(false);

  useEffect(() => {
    if (initialCategory) {
      setSelectedCategory(initialCategory);
    }
  }, [initialCategory]);

  useEffect(() => {
    if (initialSearch !== undefined) {
      setSearch(initialSearch);
    }
  }, [initialSearch]);

  const loadProducts = async () => {
    try {
      setLoading(true);
      let min_price = undefined;
      let max_price = undefined;

      if (priceRange === 'under250') {
        max_price = 250;
      } else if (priceRange === '250to450') {
        min_price = 250;
        max_price = 450;
      } else if (priceRange === 'above450') {
        min_price = 450;
      }

      const params = {
        category: selectedCategory === 'All' ? undefined : selectedCategory,
        q: search.trim() || undefined,
        vegetarian: isVegOnly ? 'true' : undefined,
        min_price,
        max_price,
        sort: sortBy,
        page,
        limit: 50,
      };

      const res = await api.getProducts(params);
      if (res.data) {
        setProducts(res.data);
        setTotalCount(res.total || res.data.length);
      }
    } catch (err) {
      console.error('Error loading menu products:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, [selectedCategory, search, isVegOnly, priceRange, sortBy, page]);

  const clearAllFilters = () => {
    setSelectedCategory('All');
    setSearch('');
    setIsVegOnly(false);
    setPriceRange('all');
    setSortBy('featured');
    setPage(1);
  };

  const hasActiveFilters =
    selectedCategory !== 'All' || search !== '' || isVegOnly || priceRange !== 'all' || sortBy !== 'featured';

  return (
    <div className="container page-container">
      {/* Page Header */}
      <div style={{ marginBottom: '28px' }}>
        <h1 style={{ fontSize: '2.2rem', fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--color-text-main)' }}>
          Explore Our Menu
        </h1>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '1rem', marginTop: '4px' }}>
          Browse artisan dishes freshly prepared on order and delivered to your doorstep.
        </p>
      </div>

      {/* Main Grid: Filters Sidebar + Products Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '260px 1fr',
          gap: '32px',
          alignItems: 'start',
        }}
        className="menu-layout-grid"
      >
        {/* ----------------- Filter Sidebar ----------------- */}
        <aside
          style={{
            backgroundColor: '#ffffff',
            borderRadius: 'var(--radius-xl)',
            border: '1px solid var(--color-border)',
            padding: '24px',
            boxShadow: 'var(--shadow-xs)',
            position: 'sticky',
            top: 'calc(var(--header-height) + 24px)',
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
          }}
          className="filters-sidebar"
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700, fontSize: '1.05rem' }}>
              <SlidersHorizontal size={18} color="var(--color-primary)" />
              <span>Filters</span>
            </div>
            {hasActiveFilters && (
              <button
                onClick={clearAllFilters}
                style={{
                  fontSize: '0.8125rem',
                  color: 'var(--color-primary)',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                }}
              >
                <RotateCcw size={13} />
                Reset
              </button>
            )}
          </div>

          {/* Search Field */}
          <div>
            <label style={{ fontSize: '0.8125rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-text-light)', display: 'block', marginBottom: '8px' }}>
              Search Dishes
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type="text"
                placeholder="e.g. Biryani, Burger..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px 12px 8px 34px',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--color-border)',
                  fontSize: '0.875rem',
                }}
              />
              <Search size={15} color="var(--color-text-light)" style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }} />
              {search && (
                <button
                  onClick={() => setSearch('')}
                  style={{ position: 'absolute', right: '8px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-light)' }}
                >
                  <X size={14} />
                </button>
              )}
            </div>
          </div>

          {/* Vegetarian Only Switch */}
          <div
            onClick={() => setIsVegOnly(!isVegOnly)}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '10px 12px',
              backgroundColor: isVegOnly ? 'var(--color-success-bg)' : 'var(--color-surface-subtle)',
              border: `1px solid ${isVegOnly ? 'rgba(16, 185, 129, 0.3)' : 'transparent'}`,
              borderRadius: 'var(--radius-md)',
              cursor: 'pointer',
              userSelect: 'none',
              transition: 'all var(--transition-fast)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <DietaryIndicator isVegetarian={true} size="md" />
              <span style={{ fontSize: '0.875rem', fontWeight: 600, color: isVegOnly ? 'var(--color-veg)' : 'var(--color-text-main)' }}>
                Pure Veg Only
              </span>
            </div>
            <div
              style={{
                width: '38px',
                height: '22px',
                backgroundColor: isVegOnly ? 'var(--color-veg)' : '#d1d5db',
                borderRadius: '999px',
                position: 'relative',
                transition: 'background-color 0.2s ease',
              }}
            >
              <div
                style={{
                  width: '16px',
                  height: '16px',
                  backgroundColor: '#ffffff',
                  borderRadius: '50%',
                  position: 'absolute',
                  top: '3px',
                  left: isVegOnly ? '19px' : '3px',
                  transition: 'left 0.2s ease',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
                }}
              />
            </div>
          </div>

          {/* Categories Filter */}
          <div>
            <label style={{ fontSize: '0.8125rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-text-light)', display: 'block', marginBottom: '10px' }}>
              Cuisine / Category
            </label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {CATEGORIES.map((cat) => {
                const isSelected = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '8px 12px',
                      borderRadius: 'var(--radius-sm)',
                      fontSize: '0.875rem',
                      fontWeight: isSelected ? 700 : 500,
                      color: isSelected ? 'var(--color-primary)' : 'var(--color-text-body)',
                      backgroundColor: isSelected ? 'var(--color-primary-light)' : 'transparent',
                      textAlign: 'left',
                    }}
                  >
                    <span>{cat}</span>
                    {isSelected && <Check size={16} color="var(--color-primary)" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Price Range Filter */}
          <div>
            <label style={{ fontSize: '0.8125rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-text-light)', display: 'block', marginBottom: '10px' }}>
              Price Range
            </label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {[
                { id: 'all', label: 'All Prices' },
                { id: 'under250', label: 'Under ₹250' },
                { id: '250to450', label: '₹250 — ₹450' },
                { id: 'above450', label: 'Above ₹450' },
              ].map((tier) => (
                <label
                  key={tier.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: '0.875rem',
                    cursor: 'pointer',
                    padding: '4px 0',
                    color: priceRange === tier.id ? 'var(--color-text-main)' : 'var(--color-text-body)',
                    fontWeight: priceRange === tier.id ? 600 : 400,
                  }}
                >
                  <input
                    type="radio"
                    name="priceRange"
                    value={tier.id}
                    checked={priceRange === tier.id}
                    onChange={() => setPriceRange(tier.id)}
                    style={{ accentColor: 'var(--color-primary)' }}
                  />
                  <span>{tier.label}</span>
                </label>
              ))}
            </div>
          </div>
        </aside>

        {/* ----------------- Products Results Area ----------------- */}
        <div>
          {/* Top Sort & Summary Bar */}
          <div
            style={{
              backgroundColor: '#ffffff',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--color-border)',
              padding: '14px 20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '24px',
              flexWrap: 'wrap',
              gap: '12px',
            }}
          >
            <div style={{ fontSize: '0.9375rem', color: 'var(--color-text-muted)' }}>
              Showing <strong style={{ color: 'var(--color-text-main)' }}>{products.length}</strong> delicious items
            </div>

            {/* Sort Dropdown */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ArrowUpDown size={16} color="var(--color-text-muted)" />
              <label style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-text-main)' }}>
                Sort:
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                style={{
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '6px 10px',
                  fontSize: '0.875rem',
                  backgroundColor: '#ffffff',
                  color: 'var(--color-text-main)',
                  fontWeight: 500,
                  cursor: 'pointer',
                }}
              >
                <option value="featured">Featured & Bestseller</option>
                <option value="rating">Highest Rated</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
                <option value="prep_time">Fastest Preparation</option>
              </select>
            </div>
          </div>

          {/* Active Filter Badges */}
          {hasActiveFilters && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '20px' }}>
              {selectedCategory !== 'All' && (
                <span className="badge badge-secondary" style={{ padding: '6px 12px', fontSize: '0.8125rem' }}>
                  Category: {selectedCategory}
                  <button onClick={() => setSelectedCategory('All')} style={{ marginLeft: '4px' }}>
                    <X size={14} />
                  </button>
                </span>
              )}
              {isVegOnly && (
                <span className="badge badge-success" style={{ padding: '6px 12px', fontSize: '0.8125rem' }}>
                  Pure Veg
                  <button onClick={() => setIsVegOnly(false)} style={{ marginLeft: '4px' }}>
                    <X size={14} />
                  </button>
                </span>
              )}
              {priceRange !== 'all' && (
                <span className="badge badge-secondary" style={{ padding: '6px 12px', fontSize: '0.8125rem' }}>
                  Price: {priceRange}
                  <button onClick={() => setPriceRange('all')} style={{ marginLeft: '4px' }}>
                    <X size={14} />
                  </button>
                </span>
              )}
              {search && (
                <span className="badge badge-secondary" style={{ padding: '6px 12px', fontSize: '0.8125rem' }}>
                  Search: "{search}"
                  <button onClick={() => setSearch('')} style={{ marginLeft: '4px' }}>
                    <X size={14} />
                  </button>
                </span>
              )}
            </div>
          )}

          {/* Product Grid */}
          {loading ? (
            <ProductGridSkeleton count={8} />
          ) : products.length === 0 ? (
            <EmptyState
              title="No dishes found"
              description="No menu items matched your selected filters or search query. Try clearing your filters."
              actionLabel="Reset All Filters"
              onAction={clearAllFilters}
            />
          ) : (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
                gap: '24px',
              }}
            >
              {products.map((product) => (
                <ProductCard
                  key={product.id || product.slug}
                  product={product}
                  onSelectProduct={onSelectProduct}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .menu-layout-grid {
            grid-template-columns: 1fr !important;
          }
          .filters-sidebar {
            position: static !important;
          }
        }
      `}</style>
    </div>
  );
};

export default ExploreMenuPage;
