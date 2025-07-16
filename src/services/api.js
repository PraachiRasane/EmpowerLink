import axios from 'axios';

// Configure base URL from environment variable
const BASE_URL = import.meta.env.VITE_BASE_URL || 'http://localhost:8000';

// Create axios instance
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Authentication API
export const authAPI = {
  login: async (username, password) => {
    const response = await api.post('/login', { username, password });
    const { access_token, user } = response.data;
    localStorage.setItem('token', access_token);
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  getMe: async () => {
    const response = await api.get('/users/me');
    return response.data;
  },

  // Check if user is authenticated by making a request to /users/me
  isAuthenticated: async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return false;
      
      await api.get('/users/me');
      return true;
    } catch (error) {
      return false;
    }
  },
};

// Users API
export const usersAPI = {
  getAll: async () => {
    const response = await api.get('/users');
    return response.data;
  },
};

// Communities API
export const communitiesAPI = {
  getAll: async () => {
    const response = await api.get('/communities');
    return response.data;
  },

  join: async (communityId) => {
    const response = await api.post(`/communities/${communityId}/join`);
    return response.data;
  },

  leave: async (communityId) => {
    const response = await api.delete(`/communities/${communityId}/leave`);
    return response.data;
  },
};

// Messages API
export const messagesAPI = {
  getDirectMessages: async (receiverId) => {
    const response = await api.get('/messages', { params: { receiver_id: receiverId } });
    return response.data;
  },

  getCommunityMessages: async (communityId) => {
    const response = await api.get('/messages', { params: { community_id: communityId } });
    return response.data;
  },

  sendMessage: async (content, receiverId = null, communityId = null) => {
    const response = await api.post('/messages', {
      content,
      receiver_id: receiverId,
      community_id: communityId,
    });
    return response.data;
  },
};

// Beneficiaries API
export const beneficiariesAPI = {
  getAll: async (city = null, category = null) => {
    const params = {};
    if (city && city !== 'All') params.city = city;
    if (category && category !== 'All') params.category = category;
    
    const response = await api.get('/beneficiaries', { params });
    return response.data;
  },
};

// Ventures API
export const venturesAPI = {
  getAll: async (city = null, status = null) => {
    const params = {};
    if (city && city !== 'All') params.city = city;
    if (status && status !== 'All') params.status = status;
    
    const response = await api.get('/ventures', { params });
    return response.data;
  },
};

// Stories API
export const storiesAPI = {
  getAll: async (city = null) => {
    const params = {};
    if (city && city !== 'All') params.city = city;
    
    const response = await api.get('/stories', { params });
    return response.data;
  },

  like: async (storyId) => {
    const response = await api.post(`/stories/${storyId}/like`);
    return response.data;
  },
};

// Follow-ups API
export const followUpsAPI = {
  getAll: async (city = null, status = null) => {
    const params = {};
    if (city && city !== 'All') params.city = city;
    if (status && status !== 'All') params.status = status;
    
    const response = await api.get('/follow-ups', { params });
    return response.data;
  },
};

// Dashboard API
export const dashboardAPI = {
  getStats: async () => {
    const response = await api.get('/dashboard');
    return response.data;
  },
};

// Health check
export const healthAPI = {
  check: async () => {
    const response = await api.get('/health');
    return response.data;
  },
};

export default api; 