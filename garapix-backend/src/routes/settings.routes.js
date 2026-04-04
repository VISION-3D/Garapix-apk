// src/routes/settings.routes.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');

// Récupérer les paramètres de l'utilisateur
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('preferences notifications');
    
    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'Utilisateur non trouvé'
      });
    }

    res.json({
      success: true,
      settings: {
        notifications: user.notifications || {
          email: true,
          push: true,
          diagnosticResults: true,
          weeklyTips: false,
          reminders: true
        },
        preferences: user.preferences || {
          language: 'fr',
          theme: 'light',
          fontSize: 'medium',
          timezone: 'Europe/Paris',
          measurementUnit: 'metric'
        },
        privacy: {
          profileVisible: true,
          shareDiagnostics: false,
          locationTracking: false,
          dataCollection: true
        }
      }
    });

  } catch (error) {
    console.error('Erreur lors de la récupération des paramètres:', error);
    res.status(500).json({
      success: false,
      error: 'Erreur serveur'
    });
  }
});

// Mettre à jour les paramètres
router.put('/', auth, async (req, res) => {
  try {
    const { notifications, preferences, privacy } = req.body;
    
    const updateData = {};
    
    if (notifications) {
      updateData.notifications = notifications;
    }
    
    if (preferences) {
      updateData.preferences = preferences;
    }
    
    // Note: Les paramètres de confidentialité seraient stockés dans un champ séparé
    // Pour l'instant, nous les ajoutons aux préférences
    if (privacy) {
      updateData.preferences = {
        ...updateData.preferences,
        ...privacy
      };
    }

    const user = await User.findByIdAndUpdate(
      req.userId,
      { $set: updateData },
      { new: true, runValidators: true }
    ).select('preferences notifications');

    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'Utilisateur non trouvé'
      });
    }

    res.json({
      success: true,
      message: 'Paramètres mis à jour avec succès',
      settings: {
        notifications: user.notifications,
        preferences: user.preferences
      }
    });

  } catch (error) {
    console.error('Erreur lors de la mise à jour des paramètres:', error);
    res.status(500).json({
      success: false,
      error: 'Erreur lors de la mise à jour des paramètres'
    });
  }
});

// Changer le mot de passe
router.put('/password', auth, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        error: 'Les deux mots de passe sont requis'
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        error: 'Le nouveau mot de passe doit contenir au moins 6 caractères'
      });
    }

    const user = await User.findById(req.userId);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'Utilisateur non trouvé'
      });
    }

    // Vérifier l'ancien mot de passe
    const isPasswordValid = await user.comparePassword(currentPassword);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        error: 'Mot de passe actuel incorrect'
      });
    }

    // Mettre à jour le mot de passe
    user.password = newPassword;
    await user.save();

    res.json({
      success: true,
      message: 'Mot de passe changé avec succès'
    });

  } catch (error) {
    console.error('Erreur lors du changement de mot de passe:', error);
    res.status(500).json({
      success: false,
      error: 'Erreur lors du changement de mot de passe'
    });
  }
});

// Exporter les données utilisateur
router.get('/export-data', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId)
      .select('-password')
      .populate({
        path: 'diagnoses',
        select: '-__v',
        options: { limit: 100 }
      });

    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'Utilisateur non trouvé'
      });
    }

    const exportData = {
      user: user.toObject(),
      exportDate: new Date().toISOString(),
      dataTypes: ['profile', 'diagnoses', 'preferences'],
      format: 'json'
    };

    // Dans un environnement réel, vous pourriez générer un fichier
    res.json({
      success: true,
      message: 'Données prêtes pour export',
      data: exportData
    });

  } catch (error) {
    console.error('Erreur lors de l\'export des données:', error);
    res.status(500).json({
      success: false,
      error: 'Erreur lors de l\'export des données'
    });
  }
});

// Supprimer le compte
router.delete('/account', auth, async (req, res) => {
  try {
    const { confirmPassword } = req.body;

    if (!confirmPassword) {
      return res.status(400).json({
        success: false,
        error: 'Confirmation du mot de passe requise'
      });
    }

    const user = await User.findById(req.userId);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'Utilisateur non trouvé'
      });
    }

    // Vérifier le mot de passe
    const isPasswordValid = await user.comparePassword(confirmPassword);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        error: 'Mot de passe incorrect'
      });
    }

    // Marquer l'utilisateur comme supprimé (soft delete)
    user.deletedAt = new Date();
    user.isActive = false;
    await user.save();

    res.json({
      success: true,
      message: 'Compte supprimé avec succès'
    });

  } catch (error) {
    console.error('Erreur lors de la suppression du compte:', error);
    res.status(500).json({
      success: false,
      error: 'Erreur lors de la suppression du compte'
    });
  }
});

module.exports = router;