/**
 * CraveCart API Client
 * Automatically connects to relative /api or configured API host
 */

const API_BASE = '/api';

async function request(endpoint, options = {}) {
  const url = `${API_BASE}${endpoint}`;
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);
    const data = await response.json();

    if (!response.ok) {
      const errorMsg = data?.error || data?.message || `HTTP Error ${response.status}`;
      throw new Error(errorMsg);
    }

    return data;
  } catch (error) {
    console.error(`API Error [${endpoint}]:`, error);
    throw error;
  }
}

export const api = {
  // Health
  checkHealth: () => request('/health'),

  // Products
  getProducts: (params = {}) => {
    const query = new URLSearchParams();
    if (params.category && params.category !== 'all') query.append('category', params.category);
    if (params.q) query.append('q', params.q);
    if (params.vegetarian !== undefined && params.vegetarian !== null && params.vegetarian !== '') {
      query.append('vegetarian', params.vegetarian);
    }
    if (params.min_price) query.append('min_price', params.min_price);
    if (params.max_price) query.append('max_price', params.max_price);
    if (params.sort) query.append('sort', params.sort);
    if (params.page) query.append('page', params.page);
    if (params.limit) query.append('limit', params.limit);
    if (params.featured) query.append('featured', 'true');

    const queryString = query.toString();
    return request(`/products${queryString ? `?${queryString}` : ''}`);
  },

  getFeaturedProducts: (limit = 8) => request(`/products/featured?limit=${limit}`),

  getProduct: (identifier) => request(`/products/${encodeURIComponent(identifier)}`),

  // Categories
  getCategories: () => request('/categories'),

  // Orders
  createOrder: (orderPayload) => request('/orders', {
    method: 'POST',
    body: JSON.stringify(orderPayload),
  }),

  getOrders: (email) => {
    const query = email ? `?email=${encodeURIComponent(email)}` : '';
    return request(`/orders${query}`);
  },

  getOrderById: (orderId) => request(`/orders/${encodeURIComponent(orderId)}`),
};

export default api;
