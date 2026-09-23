import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { api } from '../services/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    restoreSession();
  }, []);

  async function restoreSession() {
    try {
      const token = await AsyncStorage.getItem('ascent_token');
      if (!token) return;
      const me = await api.me();
      setUser(me);
    } catch {
      await AsyncStorage.removeItem('ascent_token');
      setUser(null);
    } finally {
      setLoading(false);
    }
  }

  async function login(email, password) {
    const data = await api.login({ email, password });
    await AsyncStorage.setItem('ascent_token', data.token);
    setUser(data.user);
  }

  async function register(payload) {
    const data = await api.register(payload);
    await AsyncStorage.setItem('ascent_token', data.token);
    setUser(data.user);
  }

  async function logout() {
    await AsyncStorage.removeItem('ascent_token');
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
