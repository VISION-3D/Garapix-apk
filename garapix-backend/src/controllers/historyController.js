// src/controllers/historyController.js
const HistoryService = require('../services/history.service');

// Journaliser une action
exports.logAction = async (req, res) => {
  try {
    const historyEntry = await HistoryService.logAction(req.userId, req.body);
    res.status(201).json({
      success: true,
      data: historyEntry
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Erreur lors de la journalisation'
    });
  }
};

// Récupérer l'historique
exports.getHistory = async (req, res) => {
  try {
    const { plantType, action, startDate, endDate, limit, page } = req.query;
    
    const filters = {
      plantType,
      action,
      startDate,
      endDate,
      limit: parseInt(limit) || 50,
      page: parseInt(page) || 1
    };

    const result = await HistoryService.getUserHistory(req.userId, filters);
    res.json({
      success: true,
      ...result
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Erreur lors de la récupération de l\'historique'
    });
  }
};

// Récupérer les statistiques
exports.getStatistics = async (req, res) => {
  try {
    const statistics = await HistoryService.getUserStatistics(req.userId);
    res.json({
      success: true,
      data: statistics
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Erreur lors de la récupération des statistiques'
    });
  }
};

// Ajouter une photo
exports.addPhoto = async (req, res) => {
  try {
    const { cropId } = req.params;
    const crop = await HistoryService.addCropPhoto(req.userId, cropId, req.body);
    res.json({
      success: true,
      data: crop
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Erreur lors de l\'ajout de la photo'
    });
  }
};

// Ajouter une note
exports.addNote = async (req, res) => {
  try {
    const { cropId } = req.params;
    const crop = await HistoryService.addCropNote(req.userId, cropId, req.body);
    res.json({
      success: true,
      data: crop
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Erreur lors de l\'ajout de la note'
    });
  }
};

// Enregistrer une récolte
exports.recordHarvest = async (req, res) => {
  try {
    const { cropId } = req.params;
    const crop = await HistoryService.recordHarvest(req.userId, cropId, req.body);
    res.json({
      success: true,
      data: crop
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Erreur lors de l\'enregistrement de la récolte'
    });
  }
};