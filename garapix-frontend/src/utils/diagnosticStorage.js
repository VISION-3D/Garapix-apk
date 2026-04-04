// src/utils/diagnosticStorage.js

// Clés pour le localStorage
const DIAGNOSTIC_HISTORY_KEY = 'garapix_diagnostic_history';
const CURRENT_DIAGNOSTIC_KEY = 'garapix_current_diagnostic';
const JOURNAL_ENTRIES_KEY = 'garapix_journal_entries';

// Initialiser les données si elles n'existent pas
const initializeStorage = () => {
  if (!localStorage.getItem(DIAGNOSTIC_HISTORY_KEY)) {
    localStorage.setItem(DIAGNOSTIC_HISTORY_KEY, JSON.stringify([]));
  }
  if (!localStorage.getItem(JOURNAL_ENTRIES_KEY)) {
    localStorage.setItem(JOURNAL_ENTRIES_KEY, JSON.stringify([]));
  }
};

// Sauvegarder un diagnostic
export const saveDiagnostic = (diagnosticData) => {
  initializeStorage();
  
  try {
    // Ajouter un timestamp et un ID unique
    const diagnostic = {
      ...diagnosticData,
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      createdAt: new Date().toLocaleDateString('fr-FR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    };

    // Sauvegarder comme diagnostic courant
    localStorage.setItem(CURRENT_DIAGNOSTIC_KEY, JSON.stringify(diagnostic));
    
    // Ajouter à l'historique
    const history = getDiagnosticHistory();
    history.unshift(diagnostic);
    
    // Garder seulement les 50 derniers diagnostics
    const limitedHistory = history.slice(0, 50);
    localStorage.setItem(DIAGNOSTIC_HISTORY_KEY, JSON.stringify(limitedHistory));
    
    // Ajouter au journal
    addToJournal(diagnostic);
    
    console.log('✅ Diagnostic sauvegardé:', diagnostic);
    return diagnostic;
    
  } catch (error) {
    console.error('❌ Erreur lors de la sauvegarde:', error);
    return null;
  }
};

// Récupérer le diagnostic courant
export const getCurrentDiagnostic = () => {
  try {
    const diagnostic = localStorage.getItem(CURRENT_DIAGNOSTIC_KEY);
    return diagnostic ? JSON.parse(diagnostic) : null;
  } catch (error) {
    console.error('❌ Erreur lors de la récupération:', error);
    return null;
  }
};

// Récupérer l'historique des diagnostics
export const getDiagnosticHistory = () => {
  initializeStorage();
  try {
    const history = localStorage.getItem(DIAGNOSTIC_HISTORY_KEY);
    return history ? JSON.parse(history) : [];
  } catch (error) {
    console.error('❌ Erreur lors de la récupération de l\'historique:', error);
    return [];
  }
};

// Ajouter au journal
const addToJournal = (diagnostic) => {
  try {
    const journalEntries = getJournalEntries();
    
    // Vérifier si une entrée similaire existe déjà (même jour, même plante)
    const today = new Date().toDateString();
    const existingEntryIndex = journalEntries.findIndex(entry => 
      new Date(entry.date).toDateString() === today &&
      entry.plantName === diagnostic.plantName
    );
    
    if (existingEntryIndex !== -1) {
      // Mettre à jour l'entrée existante
      journalEntries[existingEntryIndex] = {
        ...journalEntries[existingEntryIndex],
        ...diagnostic,
        updatedAt: new Date().toISOString()
      };
    } else {
      // Créer une nouvelle entrée
      const journalEntry = {
        id: diagnostic.id,
        date: new Date().toISOString(),
        plantName: diagnostic.plantName || 'Plante inconnue',
        imageUrl: diagnostic.imageUrl,
        diseases: diagnostic.diseases || [],
        confidence: diagnostic.confidence || 0,
        notes: diagnostic.notes || '',
        treatments: diagnostic.treatments || []
      };
      journalEntries.unshift(journalEntry);
    }
    
    // Limiter à 100 entrées
    const limitedEntries = journalEntries.slice(0, 100);
    localStorage.setItem(JOURNAL_ENTRIES_KEY, JSON.stringify(limitedEntries));
    
  } catch (error) {
    console.error('❌ Erreur lors de l\'ajout au journal:', error);
  }
};

// Récupérer les entrées du journal
export const getJournalEntries = () => {
  initializeStorage();
  try {
    const entries = localStorage.getItem(JOURNAL_ENTRIES_KEY);
    return entries ? JSON.parse(entries) : [];
  } catch (error) {
    console.error('❌ Erreur lors de la récupération du journal:', error);
    return [];
  }
};

// Sauvegarder des notes supplémentaires
export const saveJournalNotes = (diagnosticId, notes) => {
  try {
    const entries = getJournalEntries();
    const entryIndex = entries.findIndex(entry => entry.id === diagnosticId);
    
    if (entryIndex !== -1) {
      entries[entryIndex].notes = notes;
      entries[entryIndex].updatedAt = new Date().toISOString();
      localStorage.setItem(JOURNAL_ENTRIES_KEY, JSON.stringify(entries));
      return true;
    }
    return false;
  } catch (error) {
    console.error('❌ Erreur lors de la sauvegarde des notes:', error);
    return false;
  }
};

// Sauvegarder des traitements appliqués
export const saveTreatmentApplied = (diagnosticId, treatment) => {
  try {
    const entries = getJournalEntries();
    const entryIndex = entries.findIndex(entry => entry.id === diagnosticId);
    
    if (entryIndex !== -1) {
      if (!entries[entryIndex].treatments) {
        entries[entryIndex].treatments = [];
      }
      entries[entryIndex].treatments.push({
        ...treatment,
        date: new Date().toISOString(),
        applied: true
      });
      localStorage.setItem(JOURNAL_ENTRIES_KEY, JSON.stringify(entries));
      return true;
    }
    return false;
  } catch (error) {
    console.error('❌ Erreur lors de la sauvegarde du traitement:', error);
    return false;
  }
};

// Exporter l'historique
export const exportHistory = () => {
  try {
    const history = getDiagnosticHistory();
    const journal = getJournalEntries();
    
    const exportData = {
      version: '1.0',
      exportedAt: new Date().toISOString(),
      diagnostics: history,
      journal: journal
    };
    
    const dataStr = JSON.stringify(exportData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `garapix_backup_${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
    
    return true;
  } catch (error) {
    console.error('❌ Erreur lors de l\'export:', error);
    return false;
  }
};

// Importer l'historique
export const importHistory = (jsonData) => {
  try {
    const data = JSON.parse(jsonData);
    
    if (data.diagnostics && Array.isArray(data.diagnostics)) {
      localStorage.setItem(DIAGNOSTIC_HISTORY_KEY, JSON.stringify(data.diagnostics));
    }
    
    if (data.journal && Array.isArray(data.journal)) {
      localStorage.setItem(JOURNAL_ENTRIES_KEY, JSON.stringify(data.journal));
    }
    
    return true;
  } catch (error) {
    console.error('❌ Erreur lors de l\'import:', error);
    return false;
  }
};

// Effacer toutes les données
export const clearAllData = () => {
  try {
    localStorage.removeItem(DIAGNOSTIC_HISTORY_KEY);
    localStorage.removeItem(CURRENT_DIAGNOSTIC_KEY);
    localStorage.removeItem(JOURNAL_ENTRIES_KEY);
    return true;
  } catch (error) {
    console.error('❌ Erreur lors de la suppression:', error);
    return false;
  }
};