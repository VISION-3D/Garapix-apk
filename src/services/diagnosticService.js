// src/services/diagnosticService.js
import axios from 'axios';
import API_CONFIG from '../config/api';

const api = axios.create({
  baseURL: API_CONFIG.API_URL,
});

// Intercepteur pour ajouter le token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const uploadImageForDiagnosis = async (imageFile, plantType = '', notes = '') => {
  try {
    const formData = new FormData();
    formData.append('image', imageFile);
    if (plantType) formData.append('plantType', plantType);
    if (notes) formData.append('notes', notes);

    const response = await api.post('/diagnostic/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    
    return response.data;
  } catch (error) {
    console.error('Erreur lors de l\'upload:', error);
    throw error;
  }
};

export const getDiagnosisHistory = async (params = {}) => {
  try {
    const response = await api.get('/diagnostic/history', { params });
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération de l\'historique:', error);
    throw error;
  }
};

export const getDiagnosisById = async (id) => {
  try {
    const response = await api.get(`/diagnostic/${id}`);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération du diagnostic:', error);
    throw error;
  }
};

export const updateDiagnosis = async (id, updates) => {
  try {
    const response = await api.put(`/diagnostic/${id}`, updates);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la mise à jour du diagnostic:', error);
    throw error;
  }
};

export const deleteDiagnosis = async (id) => {
  try {
    const response = await api.delete(`/diagnostic/${id}`);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la suppression du diagnostic:', error);
    throw error;
  }
};

export const getStatistics = async () => {
  try {
    const response = await api.get('/diagnostic/statistics');
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des statistiques:', error);
    throw error;
  }
};

export default {
  uploadImageForDiagnosis,
  getDiagnosisHistory,
  getDiagnosisById,
  updateDiagnosis,
  deleteDiagnosis,
  getStatistics
};