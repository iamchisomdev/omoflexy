const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Helper function to handle API responses
const handleResponse = async (response) => {
  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong');
  }
  
  return data;
};

// Product API (unchanged)
export const productAPI = {
  getAllProducts: async () => {
    const response = await fetch(`${API_URL}/products`);
    const data = await response.json();
    return data;
  },
  // Search products by query string (backend should support `?q=` or similar)
  searchProducts: async (query) => {
    const response = await fetch(`${API_URL}/products?q=${encodeURIComponent(query)}`);
    const data = await response.json();
    return data;
  },
  getProduct: async (id) => {
    const response = await fetch(`${API_URL}/products/${id}`);
    const data = await response.json();
    // Handle case where data might be { data: {...} } or direct object
    return Array.isArray(data) ? data[0] : (data?.data || data?.product || data);
  },
  createProduct: async (productData) => {
    const response = await fetch(`${API_URL}/products`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(productData),
    });
    const data = await response.json();
    return data;
  },
  updateProduct: async (id, productData) => {
    const response = await fetch(`${API_URL}/products/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(productData),
    });
    const data = await response.json();
    return data;
  },
  deleteProduct: async (id) => {
    const response = await fetch(`${API_URL}/products/${id}`, {
      method: 'DELETE',
    });
    const data = await response.json();
    return data;
  },
};

// Auth API (updated for session + redirects)
export const authAPI = {
  // Login
  login: async (email, password, navigate) => {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
      credentials: 'include', // important for session cookie
    });

    // Read response body first so we can decide whether to navigate
    const data = await response.json().catch(() => ({}));

    if (response.ok) {
      if (navigate) navigate('/dashboard'); // redirect after successful login
      return data;
    }

    // Non-OK: throw with server message (preserves previous behavior)
    throw new Error(data.message || 'Something went wrong');
  },

  // Logout
  logout: async (navigate) => {
    const response = await fetch(`${API_URL}/auth/logout`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    });

    const data = await handleResponse(response);

    if (response.ok && navigate) {
      navigate('/login'); // redirect to login after logout
    }

    return data;
  },

};
