// API Base URL - Change this to your backend URL
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

// Helper: Get stored token
const getAccessToken = () => localStorage.getItem('access_token');

// Authenticated fetch
const authFetch = async (endpoint, options = {}) => {
    const token = getAccessToken();
    const headers = {
        'Content-Type': 'application/json',
        ...options.headers,
    };
    
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }
    
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers,
    });
    
    if (response.status === 401) {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        window.location.href = '/login';
    }
    
    return response;
};

export const api = {
    // Authentication
    login: async (username, password) => {
        const response = await fetch(`${API_BASE_URL}/token/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });
        return response.json();
    },
    
    register: async (userData) => {
        const response = await fetch(`${API_BASE_URL}/register/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData)
        });
        return response.json();
    },
    
    // Tracking
    trackParcel: async (trackingId) => {
        const response = await fetch(`${API_BASE_URL}/track/${trackingId}/`);
        return response.json();
    },
    
    // Contact
    submitContact: async (formData) => {
        const response = await fetch(`${API_BASE_URL}/contact/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });
        return response.json();
    },
    
    // Delivery Request
    requestDelivery: async (deliveryData) => {
        const response = await fetch(`${API_BASE_URL}/delivery/request/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(deliveryData)
        });
        return response.json();
    },
    
    // Admin
    getAdminStats: async () => {
        const response = await authFetch('/admin/stats/');
        return response.json();
    },
    
    getAllParcels: async () => {
        const response = await authFetch('/admin/parcels/');
        return response.json();
    }
};

export default api;