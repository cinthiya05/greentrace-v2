import axios from 'axios';

const API = axios.create({
  baseURL: 'http://127.0.0.1:5000/api',
});

// Admin dashboard
export const fetchAdminOverview = () => API.get('/admin/overview');

// Graph page
export const fetchGraphData = (userId) => API.get(`/get_graph_data/${userId}`);

// Submit activity
export const submitActivity = (data) => API.post('/submit_activity', data);

// Calculate carbon footprint
export const calculateFootprint = (data) => API.post('/calculate_footprint', data);
// Get GreenTrace suggestions
export const fetchSuggestions = (data) => API.post('/get_suggestions', data);

// Auth endpoints (optional if used)
export const login = (data) => API.post('/login', data);
export const register = (data) => API.post('/register', data);

export default API;
