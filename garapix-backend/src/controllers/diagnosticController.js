// src/controllers/diagnosticController.js
const Diagnosis = require('../models/Diagnosis');
const PlantDisease = require('../models/PlantDisease');
const cloudinaryService = require('../services/cloudinary.service');
const tfService = require('../services/tf.service');

// Upload d'image et diagnostic
exports.uploadAndDiagnose = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'Aucune image fournie' });
    }

    const userId = req.userId;
    const { plantType, notes, location } = req.body;

    // Upload de l'image sur Cloudinary
    const uploadResult = await cloudinaryService.uploadImage(req.file.path);

    // Simulation de l'analyse avec TensorFlow
    const analysisResult = await tfService.analyzeImage(uploadResult.secure_url);

    // Récupérer les maladies correspondantes
    const diseasesWithDetails = await Promise.all(
      analysisResult.diseases.map(async (disease) => {
        let diseaseDoc = await PlantDisease.findOne({ 
          name: { $regex: new RegExp(disease.name, 'i') } 
        });

        if (!diseaseDoc) {
          diseaseDoc = new PlantDisease({
            name: disease.name,
            type: disease.type,
            severity: disease.severity,
            description: `Maladie identifiée: ${disease.name}`,
            symptoms: ['Symptômes non spécifiés'],
            affectedPlants: [plantType || 'Plante non spécifiée'],
            treatments: [
              {
                name: 'Traitement recommandé',
                description: 'Consultez un spécialiste pour un traitement approprié',
                type: 'organic',
                effectiveness: 'medium'
              }
            ],
            preventionTips: ['Maintenir de bonnes conditions de culture']
          });
          await diseaseDoc.save();
        }

        return {
          disease: diseaseDoc._id,
          confidence: disease.confidence,
          severity: disease.severity
        };
      })
    );

    // Créer un nouveau diagnostic
    const diagnosis = new Diagnosis({
      user: userId,
      imageUrl: uploadResult.secure_url,
      plantType: plantType || 'Non spécifié',
      diseases: diseasesWithDetails,
      location: location ? JSON.parse(location) : undefined,
      notes: notes || '',
      status: 'analyzed',
      analyzedAt: new Date(),
      cloudinaryId: uploadResult.public_id,
      timestamp: new Date() // Heure exacte de l'analyse
    });

    await diagnosis.save();

    // Formater la réponse pour le frontend
    const formattedDiagnosis = {
      _id: diagnosis._id,
      user: diagnosis.user,
      imageUrl: diagnosis.imageUrl,
      plantType: diagnosis.plantType,
      diseases: await Promise.all(diagnosis.diseases.map(async (d) => {
        const diseaseDoc = await PlantDisease.findById(d.disease).lean();
        return {
          disease: diseaseDoc,
          confidence: d.confidence,
          severity: d.severity
        };
      })),
      notes: diagnosis.notes,
      status: diagnosis.status,
      createdAt: diagnosis.createdAt,
      analyzedAt: diagnosis.analyzedAt,
      timestamp: diagnosis.timestamp
    };

    res.status(201).json({
      message: 'Diagnostic effectué avec succès',
      diagnosis: formattedDiagnosis,
      recommendations: analysisResult.recommendations
    });
  } catch (error) {
    console.error('Erreur lors du diagnostic:', error);
    res.status(500).json({ error: 'Erreur lors de l\'analyse de l\'image' });
  }
};

// Récupérer l'historique des diagnostics pour une plante spécifique
exports.getPlantHistory = async (req, res) => {
  try {
    const userId = req.userId;
    const { plantType } = req.params;
    const { limit = 10, page = 1 } = req.query;

    const skip = (page - 1) * limit;

    // Construire le filtre
    const filter = { 
      user: userId,
      plantType: { $regex: new RegExp(plantType, 'i') } // Recherche insensible à la casse
    };

    const diagnoses = await Diagnosis.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit))
      .populate('diseases.disease')
      .lean();

    // Formater les données pour le frontend
    const formattedDiagnoses = diagnoses.map(diagnosis => ({
      _id: diagnosis._id,
      plantType: diagnosis.plantType,
      imageUrl: diagnosis.imageUrl,
      timestamp: diagnosis.createdAt,
      formattedTime: new Date(diagnosis.createdAt).toLocaleString('fr-FR', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      }),
      diseases: diagnosis.diseases.map(d => ({
        name: d.disease?.name || 'Maladie inconnue',
        confidence: d.confidence,
        severity: d.severity,
        description: d.disease?.description
      })),
      status: diagnosis.status,
      notes: diagnosis.notes
    }));

    const total = await Diagnosis.countDocuments(filter);

    // Calculer les statistiques pour cette plante
    const stats = await Diagnosis.aggregate([
      { $match: filter },
      {
        $group: {
          _id: null,
          totalAnalyses: { $sum: 1 },
          uniqueDiseases: { $addToSet: '$diseases.disease' },
          avgConfidence: { $avg: { $avg: '$diseases.confidence' } },
          severityDistribution: {
            $push: {
              $cond: [
                { $eq: ['$diseases.severity', 'high'] },
                'high',
                { $cond: [
                  { $eq: ['$diseases.severity', 'medium'] },
                  'medium',
                  'low'
                ]}
              ]
            }
          }
        }
      }
    ]);

    res.json({
      plantType,
      diagnoses: formattedDiagnoses,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(total / limit)
      },
      stats: stats[0] ? {
        totalAnalyses: stats[0].totalAnalyses,
        uniqueDiseases: stats[0].uniqueDiseases.length,
        avgConfidence: Math.round((stats[0].avgConfidence || 0) * 100),
        severityDistribution: {
          high: stats[0].severityDistribution.filter(s => s === 'high').length,
          medium: stats[0].severityDistribution.filter(s => s === 'medium').length,
          low: stats[0].severityDistribution.filter(s => s === 'low').length
        }
      } : {
        totalAnalyses: 0,
        uniqueDiseases: 0,
        avgConfidence: 0,
        severityDistribution: { high: 0, medium: 0, low: 0 }
      }
    });
  } catch (error) {
    console.error('Erreur lors de la récupération de l\'historique de la plante:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

// Récupérer uniquement les plantes que l'utilisateur a diagnostiquées
exports.getAnalyzedPlants = async (req, res) => {
  try {
    const userId = req.userId;

    // Vérifier si l'utilisateur a fait des diagnostics
    const totalDiagnoses = await Diagnosis.countDocuments({ user: userId });
    
    if (totalDiagnoses === 0) {
      return res.json({
        plants: [],
        message: 'Aucune plante diagnostiquée. Effectuez votre première analyse pour commencer.'
      });
    }

    // Récupérer uniquement les plantes UNIQUES que l'utilisateur a diagnostiquées
    const plants = await Diagnosis.aggregate([
      { $match: { user: userId } },
      { $sort: { createdAt: -1 } },
      {
        $group: {
          _id: '$plantType',
          plantType: { $first: '$plantType' },
          totalAnalyses: { $sum: 1 },
          lastAnalysis: { $first: '$createdAt' },
          lastImage: { $first: '$imageUrl' },
          firstDiagnosis: { $first: '$createdAt' }
        }
      },
      { $sort: { lastAnalysis: -1 } }
    ]);

    // Formater les résultats
    const formattedPlants = plants.map(plant => ({
      plantType: plant.plantType || 'Plante non identifiée',
      totalAnalyses: plant.totalAnalyses,
      lastAnalysis: plant.lastAnalysis,
      lastImage: plant.lastImage,
      firstDiagnosis: plant.firstDiagnosis,
      formattedLastAnalysis: new Date(plant.lastAnalysis).toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      formattedFirstDiagnosis: new Date(plant.firstDiagnosis).toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      })
    }));

    // Calculer les statistiques globales
    const allDiagnoses = await Diagnosis.find({ user: userId })
      .populate('diseases.disease');

    const stats = {
      totalDiagnoses,
      uniquePlants: formattedPlants.length,
      totalDiseasesIdentified: new Set(
        allDiagnoses.flatMap(d => d.diseases.map(disease => disease.disease?._id))
      ).size,
      firstDiagnosisDate: allDiagnoses.length > 0 
        ? new Date(Math.min(...allDiagnoses.map(d => new Date(d.createdAt))))
        : null
    };

    res.json({
      plants: formattedPlants,
      stats,
      message: `Vous avez diagnostiqué ${stats.uniquePlants} plante${stats.uniquePlants > 1 ? 's' : ''} unique${stats.uniquePlants > 1 ? 's' : ''}`
    });
  } catch (error) {
    console.error('Erreur lors de la récupération des plantes analysées:', error);
    res.status(500).json({ 
      error: 'Erreur serveur',
      details: error.message 
    });
  }
};

// Récupérer le journal complet des analyses
exports.getAnalysisJournal = async (req, res) => {
  try {
    const userId = req.userId;
    const { startDate, endDate, plantType, severity } = req.query;

    // Construire le filtre
    const filter = { user: userId };

    if (startDate || endDate) {
      filter.createdAt = {};
      if (startDate) {
        filter.createdAt.$gte = new Date(startDate);
      }
      if (endDate) {
        filter.createdAt.$lte = new Date(endDate);
      }
    }

    if (plantType) {
      filter.plantType = { $regex: new RegExp(plantType, 'i') };
    }

    if (severity) {
      filter['diseases.severity'] = severity;
    }

    const journalEntries = await Diagnosis.find(filter)
      .sort({ createdAt: -1 })
      .populate('diseases.disease')
      .lean();

    // Formater les entrées du journal
    const formattedJournal = journalEntries.map(entry => {
      const primaryDisease = entry.diseases[0];
      const diseaseDoc = primaryDisease?.disease;

      return {
        id: entry._id,
        date: new Date(entry.createdAt).toLocaleDateString('fr-FR'),
        time: new Date(entry.createdAt).toLocaleTimeString('fr-FR', {
          hour: '2-digit',
          minute: '2-digit'
        }),
        datetime: entry.createdAt,
        plantType: entry.plantType,
        imageUrl: entry.imageUrl,
        disease: diseaseDoc?.name || 'Non identifié',
        confidence: primaryDisease?.confidence ? Math.round(primaryDisease.confidence * 100) : 0,
        severity: primaryDisease?.severity || 'unknown',
        status: entry.status,
        notes: entry.notes,
        location: entry.location
      };
    });

    // Calculer les statistiques du journal
    const statistics = {
      totalEntries: formattedJournal.length,
      plantsAnalyzed: [...new Set(formattedJournal.map(entry => entry.plantType))].length,
      diseasesIdentified: [...new Set(formattedJournal.filter(entry => entry.disease !== 'Non identifié').map(entry => entry.disease))].length,
      severityBreakdown: {
        high: formattedJournal.filter(entry => entry.severity === 'high').length,
        medium: formattedJournal.filter(entry => entry.severity === 'medium').length,
        low: formattedJournal.filter(entry => entry.severity === 'low').length
      },
      timeline: formattedJournal.reduce((acc, entry) => {
        const date = entry.date;
        if (!acc[date]) {
          acc[date] = 0;
        }
        acc[date]++;
        return acc;
      }, {})
    };

    res.json({
      journal: formattedJournal,
      statistics,
      filters: {
        startDate,
        endDate,
        plantType,
        severity
      }
    });
  } catch (error) {
    console.error('Erreur lors de la récupération du journal:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

// Récupérer les détails d'une analyse spécifique
exports.getAnalysisDetails = async (req, res) => {
  try {
    const userId = req.userId;
    const { id } = req.params;

    const analysis = await Diagnosis.findOne({
      _id: id,
      user: userId
    }).populate('diseases.disease').lean();

    if (!analysis) {
      return res.status(404).json({ error: 'Analyse non trouvée' });
    }

    // Formater les détails pour le frontend
    const formattedAnalysis = {
      id: analysis._id,
      plantType: analysis.plantType,
      imageUrl: analysis.imageUrl,
      timestamp: analysis.createdAt,
      formattedTimestamp: new Date(analysis.createdAt).toLocaleString('fr-FR', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      diseases: analysis.diseases.map(d => ({
        name: d.disease?.name || 'Maladie inconnue',
        scientificName: d.disease?.scientificName,
        confidence: Math.round((d.confidence || 0) * 100),
        severity: d.severity,
        description: d.disease?.description,
        symptoms: d.disease?.symptoms || [],
        treatments: d.disease?.treatments || [],
        preventionTips: d.disease?.preventionTips || []
      })),
      notes: analysis.notes,
      status: analysis.status,
      location: analysis.location,
      analyzedAt: analysis.analyzedAt
    };

    res.json(formattedAnalysis);
  } catch (error) {
    console.error('Erreur lors de la récupération des détails:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};