import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

api.interceptors.request.use((config) => {
  try {
    const persistedState = localStorage.getItem('persist:root');
    if (persistedState) {
      const parsed = JSON.parse(persistedState);
      const auth = JSON.parse(parsed.auth);
      if (auth?.token) {
        config.headers.Authorization = `Bearer ${auth.token}`;
      }
    }
  } catch (e) {
    // ignore parse errors
  }
  return config;
});

export default api;
