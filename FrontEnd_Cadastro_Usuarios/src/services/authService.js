import api from './api';
import { jwtDecode } from 'jwt-decode';

export const login = async (credentials) => {
  const response = await api.post("/login", credentials);
  const token = response.data.token;
  localStorage.setItem('token', token);
  return token;
};

export const logout = () => {
  localStorage.removeItem('token');
};

export const getToken = () => {
  return localStorage.getItem('token');
};

export const isAuthenticated = () => {
  return !!getToken(); // retorna true se houver token
};

export const authHeader = () => {
  const token = getToken();
  if (token) {
    return { Authorization: `Bearer ${token}` };
  }
  return {};
};

export function getDecodedToken() {
  const token = localStorage.getItem('token');
  if (!token) return null;

  try {
    return jwtDecode(token);
  } catch (err) {
    console.error('Erro ao decodificar JWT:', err);
    return null;
  }
}

export function isTokenExpired() {
  const decoded = getDecodedToken();
  if (!decoded || !decoded.exp) return true;

  const now = Date.now() / 1000;
  return decoded.exp < now;
}