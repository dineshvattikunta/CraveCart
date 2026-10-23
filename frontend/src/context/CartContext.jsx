import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { useNotification } from './NotificationContext';

const CartContext = createContext();

const STORAGE_KEY = 'cravecart_cart_v1';
const PROMO_STORAGE_KEY = 'cravecart_promo_v1';

export const CartProvider = ({ children }) => {
  const { notify } = useNotification();

  const [items, setItems] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error('Error reading cart from localStorage', e);
      return [];
    }
  });

  const [promoCode, setPromoCode] = useState(() => {
    try {
      return localStorage.getItem(PROMO_STORAGE_KEY) || '';
    } catch {
      return '';
    }
  });

  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.error('Error saving cart to localStorage', e);
    }
  }, [items]);

  useEffect(() => {
    try {
      if (promoCode) {
        localStorage.setItem(PROMO_STORAGE_KEY, promoCode);
      } else {
        localStorage.removeItem(PROMO_STORAGE_KEY);
      }
    } catch (e) {
      console.error('Error saving promo to localStorage', e);
    }
  }, [promoCode]);

  const addToCart = (product, qty = 1) => {
    const productId = product.id || product._id || product.slug;
    setItems((prev) => {
      const existing = prev.find((item) => item.id === productId);
      if (existing) {
        notify(`Updated quantity for "${product.name}"`, 'info');
        return prev.map((item) =>
          item.id === productId ? { ...item, quantity: item.quantity + qty } : item
        );
      } else {
        notify(`Added "${product.name}" to cart!`, 'success');
        return [
          ...prev,
          {
            id: productId,
            name: product.name,
            price: Number(product.price),
            original_price: product.original_price ? Number(product.original_price) : null,
            image: product.image,
            category: product.category,
            vegetarian: product.vegetarian,
            quantity: qty,
          },
        ];
      }
    });
  };

  const updateQuantity = (productId, newQty) => {
    if (newQty <= 0) {
      removeFromCart(productId);
      return;
    }
    setItems((prev) =>
      prev.map((item) => (item.id === productId ? { ...item, quantity: newQty } : item))
    );
  };

  const removeFromCart = (productId) => {
    const itemToRemove = items.find((i) => i.id === productId);
    setItems((prev) => prev.filter((item) => item.id !== productId));
    if (itemToRemove) {
      notify(`Removed "${itemToRemove.name}" from cart`, 'info');
    }
  };

  const clearCart = () => {
    setItems([]);
    setPromoCode('');
    try {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(PROMO_STORAGE_KEY);
    } catch (e) {
      console.error(e);
    }
  };

  const applyPromoCode = (code) => {
    const cleanCode = (code || '').trim().toUpperCase();
    if (!cleanCode) {
      setPromoCode('');
      notify('Promo code removed', 'info');
      return true;
    }
    if (cleanCode === 'CRAVE20' || cleanCode === 'FIRSTFREE') {
      setPromoCode(cleanCode);
      notify(`Promo code ${cleanCode} applied successfully!`, 'success');
      return true;
    } else {
      notify('Invalid coupon code. Try CRAVE20 for 20% off!', 'warning');
      return false;
    }
  };

  // Calculations
  const calculations = useMemo(() => {
    const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const totalCount = items.reduce((acc, item) => acc + item.quantity, 0);

    const deliveryFee = subtotal === 0 ? 0 : subtotal >= 499 ? 0 : 40;
    const tax = subtotal === 0 ? 0 : Math.round(subtotal * 0.05 * 100) / 100;

    let discountAmount = 0;
    if (promoCode === 'CRAVE20') {
      discountAmount = Math.min(Math.round(subtotal * 0.2 * 100) / 100, 150);
    } else if (promoCode === 'FIRSTFREE') {
      discountAmount = deliveryFee;
    }

    const grandTotal = Math.max(0, Math.round((subtotal + deliveryFee + tax - discountAmount) * 100) / 100);

    return {
      subtotal,
      deliveryFee,
      tax,
      discountAmount,
      grandTotal,
      totalCount,
    };
  }, [items, promoCode]);

  const value = {
    items,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    promoCode,
    applyPromoCode,
    isCartDrawerOpen,
    setIsCartDrawerOpen,
    ...calculations,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
