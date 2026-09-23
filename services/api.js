import AsyncStorage from '@react-native-async-storage/async-storage';

export const API_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:4000/api';

async function request(path, options = {}) {
  const token = await AsyncStorage.getItem('ascent_token');

  console.log('TOKEN ASCENT:', token ? 'EXISTE' : 'NO EXISTE');

  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {}),
    },
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const error = new Error(data.message || data.error || 'Error de servidor');
    error.status = response.status;
    throw error;
  }

  return data;
}

export const api = {
  register: (payload) => request('/auth/register', { method: 'POST', body: JSON.stringify(payload) }),
  login: (payload) => request('/auth/login', { method: 'POST', body: JSON.stringify(payload) }),
  me: () => request('/users/me'),
  feed: () => request('/posts/feed'),
  createPost: (payload) => request('/posts', { method: 'POST', body: JSON.stringify(payload) }),
  likePost: (id) => request(`/posts/${id}/like`, { method: 'POST' }),
  activities: () => request('/activities/me'),
  createActivity: (payload) => request('/activities', { method: 'POST', body: JSON.stringify(payload) }),
  goals: () => request('/goals/me'),
  communities: () => request('/communities'),
  notifications: () => request('/notifications'),
};
