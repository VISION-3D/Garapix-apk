// src/routes/notification.routes.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Notification = require('../models/Notification');

// Récupérer toutes les notifications
router.get('/', auth, async (req, res) => {
  try {
    const { page = 1, limit = 20, unreadOnly = false } = req.query;
    const skip = (page - 1) * limit;

    const query = { user: req.userId };
    
    if (unreadOnly === 'true') {
      query.read = false;
    }

    const [notifications, total] = await Promise.all([
      Notification.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limit)),
      Notification.countDocuments(query)
    ]);

    const unreadCount = await Notification.countDocuments({
      user: req.userId,
      read: false
    });

    res.json({
      success: true,
      notifications,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(total / limit)
      },
      unreadCount,
      stats: {
        total,
        unread: unreadCount,
        read: total - unreadCount
      }
    });

  } catch (error) {
    console.error('Erreur lors de la récupération des notifications:', error);
    res.status(500).json({
      success: false,
      error: 'Erreur serveur'
    });
  }
});

// Marquer une notification comme lue
router.put('/:id/read', auth, async (req, res) => {
  try {
    const notification = await Notification.findOneAndUpdate(
      { 
        _id: req.params.id, 
        user: req.userId 
      },
      { 
        read: true,
        readAt: new Date()
      },
      { new: true }
    );

    if (!notification) {
      return res.status(404).json({
        success: false,
        error: 'Notification non trouvée'
      });
    }

    const unreadCount = await Notification.countDocuments({
      user: req.userId,
      read: false
    });

    res.json({
      success: true,
      message: 'Notification marquée comme lue',
      notification,
      unreadCount
    });

  } catch (error) {
    console.error('Erreur lors du marquage de la notification:', error);
    res.status(500).json({
      success: false,
      error: 'Erreur serveur'
    });
  }
});

// Marquer toutes les notifications comme lues
router.put('/mark-all-read', auth, async (req, res) => {
  try {
    const result = await Notification.updateMany(
      { 
        user: req.userId,
        read: false 
      },
      { 
        read: true,
        readAt: new Date()
      }
    );

    res.json({
      success: true,
      message: `${result.modifiedCount} notifications marquées comme lues`,
      modifiedCount: result.modifiedCount
    });

  } catch (error) {
    console.error('Erreur lors du marquage des notifications:', error);
    res.status(500).json({
      success: false,
      error: 'Erreur serveur'
    });
  }
});

// Supprimer une notification
router.delete('/:id', auth, async (req, res) => {
  try {
    const notification = await Notification.findOneAndDelete({
      _id: req.params.id,
      user: req.userId
    });

    if (!notification) {
      return res.status(404).json({
        success: false,
        error: 'Notification non trouvée'
      });
    }

    const unreadCount = await Notification.countDocuments({
      user: req.userId,
      read: false
    });

    res.json({
      success: true,
      message: 'Notification supprimée',
      notificationId: req.params.id,
      unreadCount
    });

  } catch (error) {
    console.error('Erreur lors de la suppression de la notification:', error);
    res.status(500).json({
      success: false,
      error: 'Erreur serveur'
    });
  }
});

// Supprimer toutes les notifications
router.delete('/', auth, async (req, res) => {
  try {
    const { readOnly = false } = req.query;

    const query = { user: req.userId };
    
    if (readOnly === 'true') {
      query.read = true;
    }

    const result = await Notification.deleteMany(query);

    res.json({
      success: true,
      message: `${result.deletedCount} notifications supprimées`,
      deletedCount: result.deletedCount
    });

  } catch (error) {
    console.error('Erreur lors de la suppression des notifications:', error);
    res.status(500).json({
      success: false,
      error: 'Erreur serveur'
    });
  }
});

// Créer une notification de test
router.post('/test', auth, async (req, res) => {
  try {
    const { type = 'info', title, message } = req.body;

    const notification = new Notification({
      user: req.userId,
      title: title || 'Notification de test',
      message: message || 'Ceci est une notification de test pour vérifier le système',
      type: type,
      action: '/test',
      read: false
    });

    await notification.save();

    res.json({
      success: true,
      message: 'Notification de test créée',
      notification
    });

  } catch (error) {
    console.error('Erreur lors de la création de la notification test:', error);
    res.status(500).json({
      success: false,
      error: 'Erreur serveur'
    });
  }
});

// Récupérer les statistiques des notifications
router.get('/stats', auth, async (req, res) => {
  try {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const stats = await Notification.aggregate([
      {
        $match: {
          user: req.userId,
          createdAt: { $gte: thirtyDaysAgo }
        }
      },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$createdAt" }
          },
          count: { $sum: 1 },
          unread: {
            $sum: { $cond: [{ $eq: ["$read", false] }, 1, 0] }
          }
        }
      },
      {
        $sort: { _id: 1 }
      }
    ]);

    const typeDistribution = await Notification.aggregate([
      {
        $match: { user: req.userId }
      },
      {
        $group: {
          _id: "$type",
          count: { $sum: 1 }
        }
      }
    ]);

    res.json({
      success: true,
      dailyStats: stats,
      typeDistribution,
      summary: {
        totalLast30Days: stats.reduce((sum, day) => sum + day.count, 0),
        averagePerDay: stats.length > 0 
          ? Math.round(stats.reduce((sum, day) => sum + day.count, 0) / stats.length) 
          : 0
      }
    });

  } catch (error) {
    console.error('Erreur lors de la récupération des stats:', error);
    res.status(500).json({
      success: false,
      error: 'Erreur serveur'
    });
  }
});

module.exports = router;