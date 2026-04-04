// src/services/diagnosticService.js
import axios from 'axios';
import { getToken } from './authService';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

class DiagnosticService {
  // Sauvegarder un diagnostic
  async saveDiagnostic(diagnosticData) {
    try {
      const token = getToken();
      if (!token) {
        throw new Error('Utilisateur non authentifié');
      }

      const response = await axios.post(`${API_URL}/diagnostics`, diagnosticData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      return response.data;
    } catch (error) {
      console.error('Erreur lors de la sauvegarde du diagnostic:', error);
      
      // Fallback sur localStorage si le backend échoue
      return this.saveToLocalStorage(diagnosticData);
    }
  }

  // Récupérer l'historique des diagnostics
  async getDiagnosticsHistory(limit = 50, page = 1) {
    try {
      const token = getToken();
      if (!token) {
        return this.getFromLocalStorage();
      }

      const response = await axios.get(`${API_URL}/diagnostics/history`, {
        headers: {
          'Authorization': `Bearer ${token}`
        },
        params: { limit, page }
      });

      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération de l\'historique:', error);
      return this.getFromLocalStorage();
    }
  }

  // Récupérer les statistiques
  async getStatistics(period = 'week') {
    try {
      const token = getToken();
      if (!token) {
        return this.getLocalStats();
      }

      const response = await axios.get(`${API_URL}/diagnostics/stats`, {
        headers: {
          'Authorization': `Bearer ${token}`
        },
        params: { period }
      });

      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des statistiques:', error);
      return this.getLocalStats();
    }
  }

  // Fallback: Sauvegarder dans localStorage
  saveToLocalStorage(diagnosticData) {
    try {
      const diagnostics = this.getFromLocalStorage();
      const newDiagnostic = {
        ...diagnosticData,
        id: Date.now().toString(),
        timestamp: new Date().toISOString(),
        status: 'saved'
      };

      diagnostics.unshift(newDiagnostic);
      
      // Garder seulement les 100 derniers diagnostics
      const limitedDiagnostics = diagnostics.slice(0, 100);
      
      localStorage.setItem('garapix_diagnostics', JSON.stringify(limitedDiagnostics));
      
      // Mettre à jour les statistiques
      this.updateLocalStats(newDiagnostic);
      
      console.log('✅ Diagnostic sauvegardé localement');
      return newDiagnostic;
    } catch (error) {
      console.error('Erreur lors de la sauvegarde locale:', error);
      throw error;
    }
  }

  // Fallback: Récupérer depuis localStorage
  getFromLocalStorage() {
    try {
      const diagnostics = localStorage.getItem('garapix_diagnostics');
      return diagnostics ? JSON.parse(diagnostics) : [];
    } catch (error) {
      console.error('Erreur lors de la récupération locale:', error);
      return [];
    }
  }

  // Mettre à jour les statistiques locales
  updateLocalStats(diagnostic) {
    try {
      const stats = this.getLocalStats();
      
      // Mettre à jour les compteurs
      stats.totalDiagnostics += 1;
      
      if (diagnostic.diseases && diagnostic.diseases.length > 0) {
        stats.diseasesDetected += diagnostic.diseases.length;
      }
      
      // Mettre à jour la liste des plantes
      if (diagnostic.plantName && !stats.plantsAnalyzed.includes(diagnostic.plantName)) {
        stats.plantsAnalyzed.push(diagnostic.plantName);
      }
      
      // Mettre à jour les traitements
      if (diagnostic.treatments) {
        stats.treatmentsRecommended += diagnostic.treatments.length;
      }
      
      // Mettre à jour la sévérité moyenne
      if (diagnostic.severity) {
        const severityMap = { low: 1, medium: 2, high: 3, critical: 4 };
        const totalSeverity = stats.averageSeverity * (stats.totalDiagnostics - 1) + severityMap[diagnostic.severity];
        stats.averageSeverity = totalSeverity / stats.totalDiagnostics;
      }
      
      // Mettre à jour le taux de réussite
      if (diagnostic.confidence) {
        const totalConfidence = stats.successRate * (stats.totalDiagnostics - 1) + diagnostic.confidence;
        stats.successRate = totalConfidence / stats.totalDiagnostics;
      }
      
      localStorage.setItem('garapix_stats', JSON.stringify(stats));
    } catch (error) {
      console.error('Erreur lors de la mise à jour des statistiques:', error);
    }
  }

  // Obtenir les statistiques locales
  getLocalStats() {
    try {
      const stats = localStorage.getItem('garapix_stats');
      if (stats) {
        return JSON.parse(stats);
      }
      
      // Statistiques par défaut
      return {
        totalDiagnostics: 0,
        successRate: 0,
        plantsAnalyzed: [],
        diseasesDetected: 0,
        averageSeverity: 0,
        treatmentsRecommended: 0,
        responseTime: 0,
        mostCommonDisease: null,
        diagnosticsByDay: [],
        diseaseDistribution: {},
        severityLevels: { low: 0, medium: 0, high: 0, critical: 0 }
      };
    } catch (error) {
      console.error('Erreur lors de la récupération des statistiques:', error);
      return this.getDefaultStats();
    }
  }

  getDefaultStats() {
    return {
      totalDiagnostics: 0,
      successRate: 0,
      plantsAnalyzed: [],
      diseasesDetected: 0,
      averageSeverity: 0,
      treatmentsRecommended: 0,
      responseTime: 0,
      mostCommonDisease: null,
      diagnosticsByDay: [],
      diseaseDistribution: {},
      severityLevels: { low: 0, medium: 0, high: 0, critical: 0 }
    };
  }

  // Exporter les données
  async exportData(format = 'csv') {
    try {
      const diagnostics = this.getFromLocalStorage();
      const stats = this.getLocalStats();
      
      const exportData = {
        diagnostics,
        statistics: stats,
        exportedAt: new Date().toISOString(),
        version: '1.0'
      };
      
      if (format === 'csv') {
        return this.convertToCSV(exportData);
      } else {
        return JSON.stringify(exportData, null, 2);
      }
    } catch (error) {
      console.error('Erreur lors de l\'export:', error);
      throw error;
    }
  }

  convertToCSV(data) {
    // Convertir les diagnostics en CSV
    let csv = 'Date,Plante,Confiance,Maladies,Sévérité,Traitements\n';
    
    data.diagnostics.forEach(d => {
      const date = new Date(d.timestamp).toLocaleDateString();
      const plant = d.plantName || 'Inconnue';
      const confidence = d.confidence ? `${d.confidence}%` : 'N/A';
      const diseases = d.diseases ? d.diseases.map(d => d.name).join('; ') : 'Aucune';
      const severity = d.severity || 'Inconnue';
      const treatments = d.treatments ? d.treatments.length : 0;
      
      csv += `"${date}","${plant}","${confidence}","${diseases}","${severity}","${treatments}"\n`;
    });
    
    return csv;
  }
}

export default new DiagnosticService();