// src/routes/history.routes.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Diagnosis = require('../models/Diagnosis');

router.get('/journal', auth, async (req, res) => {
  try {
    const { plantType, actionType, startDate, endDate, search } = req.query;
    const userId = req.userId;

    // Construire la requête
    const query = { user: userId };
    
    if (plantType) {
      query.plantType = plantType;
    }
    
    if (startDate && endDate) {
      query.createdAt = {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      };
    }
    
    if (search) {
      query.$or = [
        { plantType: { $regex: search, $options: 'i' } },
        { notes: { $regex: search, $options: 'i' } },
        { 'diseases.disease.name': { $regex: search, $options: 'i' } }
      ];
    }

    // Récupérer les diagnostics
    const activities = await Diagnosis.find(query)
      .populate('diseases.disease')
      .sort({ createdAt: -1 })
      .limit(50);

    // Statistiques
    const plantTypes = await Diagnosis.distinct('plantType', { user: userId });
    const totalActivities = await Diagnosis.countDocuments({ user: userId });
    const lastActivity = await Diagnosis.findOne({ user: userId })
      .sort({ createdAt: -1 })
      .select('createdAt');

    // Formater les activités
    const formattedActivities = activities.map(diagnosis => ({
      id: diagnosis._id,
      date: diagnosis.createdAt,
      plantType: diagnosis.plantType,
      action: 'diagnostic',
      disease: diagnosis.diseases[0]?.disease?.name,
      severity: diagnosis.diseases[0]?.severity,
      image: diagnosis.imageUrl,
      notes: diagnosis.notes,
      status: diagnosis.status === 'analyzed' ? 'completed' : 'pending'
    }));

    res.json({
      activities: formattedActivities,
      stats: {
        totalActivities,
        plantTypesCount: plantTypes.filter(p => p).length,
        lastActivity: lastActivity?.createdAt
      }
    });

  } catch (error) {
    console.error('Erreur journal:', error);
    res.status(500).json({ error: 'Erreur lors de la récupération du journal' });
  }
});