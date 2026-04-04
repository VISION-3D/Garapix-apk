// src/services/historyService.js
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

class HistoryService {
  // Journaliser une action
  static async logAction(actionData) {
    try {
      const response = await axios.post(`${API_URL}/history/log`, actionData);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la journalisation:', error);
      throw error;
    }
  }

  // Récupérer l'historique
  static async getHistory(filters = {}) {
    try {
      const params = new URLSearchParams();
      
      Object.keys(filters).forEach(key => {
        if (filters[key] !== undefined && filters[key] !== null) {
          params.append(key, filters[key]);
        }
      });
      
      const response = await axios.get(`${API_URL}/history?${params.toString()}`);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération de l\'historique:', error);
      throw error;
    }
  }

  // Récupérer les statistiques
  static async getStatistics() {
    try {
      const response = await axios.get(`${API_URL}/history/statistics`);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des statistiques:', error);
      throw error;
    }
  }

  // Journaliser un diagnostic
  static async logDiagnostic(plantType, diagnosisResult) {
    try {
      return await this.logAction({
        action: 'diagnostic',
        title: 'Diagnostic effectué',
        plantType,
        description: `Diagnostic de ${plantType} avec ${diagnosisResult.diseases.length} maladie(s) détectée(s)`,
        details: {
          diseases: diagnosisResult.diseases.map(d => ({
            name: d.name,
            confidence: d.confidence,
            severity: d.severity
          })),
          confidence: diagnosisResult.confidence,
          imageUrl: diagnosisResult.imageUrl
        }
      });
    } catch (error) {
      console.error('Erreur lors de la journalisation du diagnostic:', error);
      throw error;
    }
  }

  // Journaliser un traitement
  static async logTreatment(plantType, treatmentData) {
    try {
      return await this.logAction({
        action: 'treatment',
        title: 'Traitement appliqué',
        plantType,
        description: `Traitement "${treatmentData.name}" appliqué sur ${plantType}`,
        details: {
          treatment: treatmentData.name,
          type: treatmentData.type,
          disease: treatmentData.disease,
          quantity: treatmentData.quantity
        }
      });
    } catch (error) {
      console.error('Erreur lors de la journalisation du traitement:', error);
      throw error;
    }
  }
}

export default HistoryService;