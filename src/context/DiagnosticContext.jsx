// src/context/DiagnosticContext.jsx
import React, { createContext, useState, useContext, useCallback } from 'react';
import { uploadImageForDiagnosis } from '../services/diagnosticService';
import toast from 'react-hot-toast';

const DiagnosticContext = createContext();

export const useDiagnostic = () => {
  const context = useContext(DiagnosticContext);
  if (!context) {
    throw new Error('useDiagnostic doit être utilisé dans un DiagnosticProvider');
  }
  return context;
};

export const DiagnosticProvider = ({ children }) => {
  const [diagnosticResults, setDiagnosticResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [recentDiagnoses, setRecentDiagnoses] = useState([]);

  const analyzeImage = useCallback(async (imageData, plantType = '', notes = '') => {
    try {
      setLoading(true);
      
      let fileToUpload;
      
      if (imageData instanceof File) {
        fileToUpload = imageData;
      } else if (typeof imageData === 'string') {
        // Convertir DataURL en Blob
        const response = await fetch(imageData);
        const blob = await response.blob();
        fileToUpload = new File([blob], 'capture.jpg', { type: 'image/jpeg' });
      } else {
        throw new Error('Format d\'image non supporté');
      }

      const result = await uploadImageForDiagnosis(fileToUpload, plantType, notes);
      
      setDiagnosticResults(result);
      setRecentDiagnoses(prev => [result.diagnosis, ...prev.slice(0, 4)]);
      
      toast.success('Analyse terminée avec succès !');
      return result;
    } catch (error) {
      console.error('Erreur lors de l\'analyse:', error);
      
      // Gestion spécifique des erreurs
      if (error.response?.status === 404) {
        toast.error('Service d\'analyse non disponible. Veuillez réessayer plus tard.');
      } else if (error.response?.status === 413) {
        toast.error('Image trop volumineuse. Taille maximale: 5MB');
      } else if (error.response?.status === 415) {
        toast.error('Format d\'image non supporté. Utilisez JPG, PNG ou GIF');
      } else {
        toast.error(error.response?.data?.error || 'Erreur lors de l\'analyse');
      }
      
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  const clearResults = useCallback(() => {
    setDiagnosticResults(null);
  }, []);

  const value = {
    diagnosticResults,
    loading,
    recentDiagnoses,
    analyzeImage,
    clearResults
  };

  return (
    <DiagnosticContext.Provider value={value}>
      {children}
    </DiagnosticContext.Provider>
  );
};