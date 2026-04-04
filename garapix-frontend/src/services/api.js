import axios from 'axios';
import API_CONFIG from '../config/api';

// Créer une instance axios configurée
const api = axios.create({
  baseURL: API_CONFIG.getApiUrl(),
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  timeout: 15000, // 15 secondes timeout
  withCredentials: true // Important pour les cookies/sessions
});

// Intercepteur pour les requêtes
api.interceptors.request.use(
  (config) => {
    console.log(`📤 Requête ${config.method?.toUpperCase()} vers ${config.url}`);
    
    // Ajouter le token si disponible
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    console.error('❌ Erreur de requête:', error);
    return Promise.reject(error);
  }
);

// Intercepteur pour les réponses
api.interceptors.response.use(
  (response) => {
    console.log(`✅ Réponse ${response.status} de ${response.config.url}`);
    return response;
  },
  (error) => {
    console.error('❌ Erreur de réponse:', {
      url: error.config?.url,
      method: error.config?.method,
      status: error.response?.status,
      message: error.message
    });
    
    // Gestion des erreurs spécifiques
    if (error.code === 'ECONNABORTED') {
      console.error('⏱️ Timeout de la requête');
    }
    
    if (!error.response) {
      console.error('🌐 Pas de réponse du serveur - Vérifiez que le backend est démarré');
    }
    
    return Promise.reject(error);
  }
);

export default api;