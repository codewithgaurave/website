/**
 * Centralized API Configuration for ZomoCook Website
 * Automatically switches between local dev and live production backend (https://api.zomocook.in)
 */

export const getApiBaseUrl = (): string => {
  if (process.env.NEXT_PUBLIC_API_URL) {
    return process.env.NEXT_PUBLIC_API_URL.replace(/\/+$/, '');
  }

  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname;
    if (hostname === 'localhost' || hostname === '127.0.0.1') {
      return 'http://localhost:5001';
    }
  }

  // Default production backend
  return 'https://api.zomocook.in';
};

export default getApiBaseUrl;
