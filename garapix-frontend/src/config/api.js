const API_CONFIG = {
  getApiUrl() {
    // 🔥 Utilise la variable d'environnement en priorité
    if (process.env.REACT_APP_API_URL) {
      return process.env.REACT_APP_API_URL;
    }
    
    // Fallback pour le développement local
    return 'http://192.168.56.1:5000/api';
  }
};

export default API_CONFIG;