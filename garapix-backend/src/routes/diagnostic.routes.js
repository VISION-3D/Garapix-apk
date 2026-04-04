// Garapix-backend/src/routes/diagnostic.routes.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');

// Importer les contrôleurs (créez-les si inexistants)
const diagnosticController = {
  uploadAndDiagnose: async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: 'Aucune image fournie' });
      }
      
      // Simulation pour le moment
      res.json({
        message: 'Diagnostic simulé',
        diagnosis: {
          _id: 'simulated_' + Date.now(),
          imageUrl: 'https://via.placeholder.com/300',
          plantType: req.body.plantType || 'Inconnu',
          diseases: [
            {
              disease: {
                _id: '1',
                name: 'Mildiou',
                description: 'Maladie fongique courante'
              },
              confidence: 0.85,
              severity: 'medium'
            }
          ],
          status: 'analyzed',
          createdAt: new Date()
        }
      });
    } catch (error) {
      res.status(500).json({ error: 'Erreur lors du diagnostic' });
    }
  },

  getDiagnosisHistory: async (req, res) => {
    try {
      // Données simulées pour tester
      const mockDiagnoses = [
        {
          _id: '1',
          imageUrl: 'https://via.placeholder.com/300',
          plantType: 'Tomate',
          diseases: [
            {
              disease: {
                _id: '1',
                name: 'Mildiou',
                description: 'Maladie fongique affectant les tomates'
              },
              confidence: 0.92,
              severity: 'high'
            }
          ],
          status: 'resolved',
          notes: 'Traitement avec fongicide',
          createdAt: new Date(Date.now() - 86400000) // Hier
        },
        {
          _id: '2',
          imageUrl: 'https://via.placeholder.com/300',
          plantType: 'Rosier',
          diseases: [
            {
              disease: {
                _id: '2',
                name: 'Oïdium',
                description: 'Champignon blanc sur les feuilles'
              },
              confidence: 0.78,
              severity: 'medium'
            }
          ],
          status: 'treated',
          notes: 'Traitement en cours',
          createdAt: new Date(Date.now() - 172800000) // Avant-hier
        }
      ];

      res.json({
        diagnoses: mockDiagnoses,
        pagination: {
          total: 2,
          page: 1,
          limit: 10,
          pages: 1
        },
        stats: {
          totalDiagnoses: 2,
          avgConfidence: 0.85,
          diseasesBySeverity: [0.5, 0.5]
        }
      });
    } catch (error) {
      res.status(500).json({ error: 'Erreur serveur' });
    }
  },

  getDiagnosisById: async (req, res) => {
    try {
      const { id } = req.params;
      res.json({
        _id: id,
        imageUrl: 'https://via.placeholder.com/300',
        plantType: 'Plante de test',
        diseases: [],
        status: 'analyzed',
        createdAt: new Date()
      });
    } catch (error) {
      res.status(500).json({ error: 'Erreur serveur' });
    }
  },

  updateDiagnosis: async (req, res) => {
    try {
      const { id } = req.params;
      res.json({
        message: 'Diagnostic mis à jour',
        diagnosis: {
          _id: id,
          ...req.body
        }
      });
    } catch (error) {
      res.status(500).json({ error: 'Erreur serveur' });
    }
  },

  deleteDiagnosis: async (req, res) => {
    try {
      const { id } = req.params;
      res.json({
        message: 'Diagnostic supprimé'
      });
    } catch (error) {
      res.status(500).json({ error: 'Erreur serveur' });
    }
  },

  getStatistics: async (req, res) => {
    try {
      res.json({
        monthlyStats: [
          {
            _id: { year: 2024, month: 1 },
            count: 5,
            diseases: ['Mildiou', 'Oïdium']
          }
        ],
        frequentDiseases: [
          {
            _id: '1',
            count: 3,
            avgConfidence: 0.85,
            avgSeverity: 2.5,
            diseaseDetails: [{
              name: 'Mildiou',
              description: 'Maladie fongique'
            }]
          }
        ]
      });
    } catch (error) {
      res.status(500).json({ error: 'Erreur serveur' });
    }
  }
};

// Routes
router.post('/upload', auth, upload.single('image'), diagnosticController.uploadAndDiagnose);
router.get('/history', auth, diagnosticController.getDiagnosisHistory);
router.get('/statistics', auth, diagnosticController.getStatistics);
router.put('/:id', auth, diagnosticController.updateDiagnosis);
router.delete('/:id', auth, diagnosticController.deleteDiagnosis);
router.get('/:id', auth, diagnosticController.getDiagnosisById);

module.exports = router;