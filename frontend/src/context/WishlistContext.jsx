import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNotification } from './NotificationContext';

const WishlistContext = createContext();

const STORAGE_KEY = 'cravecart_wishlist_v1';

export const WishlistProvider = ({ children }) => {
  const { notify } = useNotification();

  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error('Error reading wishlist from localStorage', e);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(wishlist));
    } catch (e) {
      console.error('Error saving wishlist to localStorage', e);
    }
  }, [wishlist]);

  const toggleWishlist = (product) => {
    const productId = product.id || product._id || product.slug;
    setWishlist((prev) => {
      const exists = prev.some((item) => (item.id || item._id || item.slug) === productId);
      if (exists) {
        notify(`Removed "${product.name}" from wishlist`, 'info');
        return prev.filter((item) => (item.id || item._id || item.slug) !== productId);
      } else {
        notify(`Saved "${product.name}" to wishlist!`, 'success');
        return [...prev, product];
      }
    });
  };

  const isInWishlist = (productId) => {
    return wishlist.some((item) => (item.id || item._id || item.slug) === productId);
  };

  return (
    <WishlistContext.Provider value={{ wishlist, toggleWishlist, isInWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};
