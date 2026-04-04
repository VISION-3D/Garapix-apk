// src/config/api.js
const API_CONFIG = {
  BASE_URL: process.env.REACT_APP_API_URL || 'http://localhost:5000',
  get API_URL() {
    return `${this.BASE_URL}/api`;
  },
  get AUTH_URL() {
    return `${this.API_URL}/auth`;
  },
  get DIAGNOSTIC_URL() {
    return `${this.API_URL}/diagnostic`;
  }
};

export default API_CONFIG;