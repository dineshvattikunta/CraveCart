import React, { useState, useEffect } from 'react';
import { NotificationProvider } from './context/NotificationContext';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import CartDrawer from './components/common/CartDrawer';
import Toast from './components/common/Toast';

// Pages
import HomePage from './pages/HomePage';
import ExploreMenuPage from './pages/ExploreMenuPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderConfirmationPage from './pages/OrderConfirmationPage';
import OrdersPage from './pages/OrdersPage';
import OrderDetailsPage from './pages/OrderDetailsPage';
import WishlistPage from './pages/WishlistPage';
import OffersPage from './pages/OffersPage';
import NotFoundPage from './pages/NotFoundPage';

const AppContent = () => {
  const [currentRoute, setCurrentRoute] = useState('home');
  const [routeParams, setRouteParams] = useState({});
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [confirmedOrder, setConfirmedOrder] = useState(null);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Handle URL hash changes for deep linking & browser back button
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') || 'home';
      const [path, queryString] = hash.split('?');

      if (['home', 'menu', 'offers', 'orders', 'cart', 'checkout', 'wishlist'].includes(path)) {
        setCurrentRoute(path);
        if (queryString) {
          const params = new URLSearchParams(queryString);
          const category = params.get('category');
          if (category) {
            setRouteParams({ category });
          }
        }
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (route, params = {}) => {
    setCurrentRoute(route);
    setRouteParams(params);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Update URL hash for standard navigation
    if (['home', 'menu', 'offers', 'orders', 'cart', 'checkout', 'wishlist'].includes(route)) {
      let query = '';
      if (params.category) {
        query = `?category=${encodeURIComponent(params.category)}`;
      }
      window.location.hash = `${route}${query}`;
    }
  };

  const handleSelectProduct = (product) => {
    setSelectedProduct(product);
    setCurrentRoute('product_details');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOrderSuccess = (order) => {
    setConfirmedOrder(order);
    setCurrentRoute('order_confirmation');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleViewOrderDetails = (orderId) => {
    setSelectedOrderId(orderId);
    setCurrentRoute('order_details');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <Header
        currentRoute={currentRoute}
        onNavigate={navigateTo}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onSearchSubmit={(q) => {
          setSearchQuery(q);
          navigateTo('menu');
        }}
      />

      <main>
        {currentRoute === 'home' && (
          <HomePage
            onNavigate={navigateTo}
            onSelectProduct={handleSelectProduct}
          />
        )}

        {currentRoute === 'menu' && (
          <ExploreMenuPage
            initialCategory={routeParams.category || 'All'}
            initialSearch={searchQuery}
            onSelectProduct={handleSelectProduct}
          />
        )}

        {currentRoute === 'product_details' && selectedProduct && (
          <ProductDetailPage
            product={selectedProduct}
            onBack={() => navigateTo('menu')}
            onSelectProduct={handleSelectProduct}
            onNavigate={navigateTo}
          />
        )}

        {currentRoute === 'cart' && (
          <CartPage onNavigate={navigateTo} />
        )}

        {currentRoute === 'checkout' && (
          <CheckoutPage
            onNavigate={navigateTo}
            onOrderSuccess={handleOrderSuccess}
          />
        )}

        {currentRoute === 'order_confirmation' && (
          <OrderConfirmationPage
            order={confirmedOrder}
            onNavigate={navigateTo}
            onViewOrderDetails={handleViewOrderDetails}
          />
        )}

        {currentRoute === 'orders' && (
          <OrdersPage
            onNavigate={navigateTo}
            onViewOrderDetails={handleViewOrderDetails}
          />
        )}

        {currentRoute === 'order_details' && (
          <OrderDetailsPage
            orderId={selectedOrderId}
            onBack={() => navigateTo('orders')}
            onNavigate={navigateTo}
          />
        )}

        {currentRoute === 'wishlist' && (
          <WishlistPage
            onNavigate={navigateTo}
            onSelectProduct={handleSelectProduct}
          />
        )}

        {currentRoute === 'offers' && (
          <OffersPage onNavigate={navigateTo} />
        )}

        {currentRoute === 'not_found' && (
          <NotFoundPage onNavigate={navigateTo} />
        )}
      </main>

      <Footer onNavigate={navigateTo} />
      <CartDrawer onNavigate={navigateTo} />
      <Toast />
    </>
  );
};

function App() {
  return (
    <NotificationProvider>
      <CartProvider>
        <WishlistProvider>
          <AppContent />
        </WishlistProvider>
      </CartProvider>
    </NotificationProvider>
  );
}

export default App;
