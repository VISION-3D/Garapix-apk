const API_CONFIG = {
  // Détecte automatiquement l'hôte
  getBaseUrl() {
    // Si nous sommes en développement et sur le même réseau
    if (window.location.hostname === 'localhost' || 
        window.location.hostname === '127.0.0.1' ||
        window.location.hostname === '192.168.56.1') {
      return 'http://192.168.56.1:5000';
    }
    // En production, utilisez l'URL de production
    return window.location.origin.replace(':3000', ':5000');
  },
  
  getApiUrl() {
    return `${this.getBaseUrl()}/api`;
  }
};

export default API_CONFIG;