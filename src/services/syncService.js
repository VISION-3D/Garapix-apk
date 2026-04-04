// src/services/syncService.js
import diagnosticService from './diagnosticService';

class SyncService {
  constructor() {
    this.offlineQueue = [];
    this.isSyncing = false;
    this.init();
  }

  init() {
    // Charger la file d'attente hors ligne
    this.loadOfflineQueue();
    
    // Vérifier la connexion
    window.addEventListener('online', () => this.syncOfflineData());
    window.addEventListener('offline', () => this.handleOffline());
    
    // Synchroniser périodiquement
    setInterval(() => this.syncOfflineData(), 30000); // Toutes les 30 secondes
  }

  // Sauvegarder un diagnostic (avec gestion hors ligne)
  async saveDiagnosticWithSync(diagnosticData) {
    try {
      // Sauvegarder localement d'abord
      const localDiagnostic = diagnosticService.saveToLocalStorage(diagnosticData);
      
      // Tenter de sauvegarder sur le serveur
      if (navigator.onLine) {
        await diagnosticService.saveDiagnostic(diagnosticData);
        console.log('✅ Diagnostic synchronisé avec le serveur');
      } else {
        // Ajouter à la file d'attente hors ligne
        this.addToOfflineQueue(diagnosticData);
        console.log('📱 Diagnostic sauvegardé localement (hors ligne)');
      }
      
      return localDiagnostic;
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
      throw error;
    }
  }

  // Ajouter à la file d'attente hors ligne
  addToOfflineQueue(diagnosticData) {
    const queueItem = {
      id: Date.now().toString(),
      data: diagnosticData,
      timestamp: new Date().toISOString(),
      retryCount: 0
    };
    
    this.offlineQueue.push(queueItem);
    this.saveOfflineQueue();
  }

  // Synchroniser les données hors ligne
  async syncOfflineData() {
    if (!navigator.onLine || this.isSyncing || this.offlineQueue.length === 0) {
      return;
    }

    this.isSyncing = true;
    console.log(`🔄 Synchronisation de ${this.offlineQueue.length} diagnostics...`);

    const successfulSyncs = [];
    const failedSyncs = [];

    for (const item of [...this.offlineQueue]) {
      try {
        await diagnosticService.saveDiagnostic(item.data);
        successfulSyncs.push(item.id);
      } catch (error) {
        item.retryCount += 1;
        
        // Supprimer après 3 tentatives échouées
        if (item.retryCount >= 3) {
          console.warn(`⚠️ Échec après 3 tentatives, suppression: ${item.id}`);
          failedSyncs.push(item.id);
        }
      }
    }

    // Supprimer les éléments synchronisés avec succès
    this.offlineQueue = this.offlineQueue.filter(item => 
      !successfulSyncs.includes(item.id) && !failedSyncs.includes(item.id)
    );

    this.saveOfflineQueue();
    this.isSyncing = false;

    if (successfulSyncs.length > 0) {
      console.log(`✅ ${successfulSyncs.length} diagnostics synchronisés`);
      
      // Rafraîchir les données locales
      diagnosticService.getFromLocalStorage();
    }
  }

  // Sauvegarder la file d'attente
  saveOfflineQueue() {
    try {
      localStorage.setItem('garapix_offline_queue', JSON.stringify(this.offlineQueue));
    } catch (error) {
      console.error('Erreur lors de la sauvegarde de la file d\'attente:', error);
    }
  }

  // Charger la file d'attente
  loadOfflineQueue() {
    try {
      const queue = localStorage.getItem('garapix_offline_queue');
      this.offlineQueue = queue ? JSON.parse(queue) : [];
    } catch (error) {
      console.error('Erreur lors du chargement de la file d\'attente:', error);
      this.offlineQueue = [];
    }
  }

  // Gérer la perte de connexion
  handleOffline() {
    console.log('📴 Mode hors ligne activé - Sauvegarde locale uniquement');
    
    // Afficher une notification
    if (this.offlineQueue.length > 0) {
      console.log(`📱 ${this.offlineQueue.length} diagnostics en attente de synchronisation`);
    }
  }

  // Obtenir l'état de synchronisation
  getSyncStatus() {
    return {
      isOnline: navigator.onLine,
      isSyncing: this.isSyncing,
      offlineQueueLength: this.offlineQueue.length,
      lastSync: localStorage.getItem('garapix_last_sync') || null
    };
  }
}

export default new SyncService();