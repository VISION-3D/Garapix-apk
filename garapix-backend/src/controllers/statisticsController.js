// src/controllers/statisticsController.js
exports.getStatistics = async (req, res) => {
  try {
    const { startDate, endDate, timeRange } = req.query;
    const userId = req.userId;

    // Dates par défaut
    const start = startDate ? new Date(startDate) : new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    const end = endDate ? new Date(endDate) : new Date();

    // Vérifier si l'utilisateur a des données
    const hasData = await Diagnosis.countDocuments({ user: userId }) > 0;

    if (!hasData) {
      return res.json(getEmptyStatistics(timeRange));
    }

    // ... reste du code existant ...

  } catch (error) {
    console.error('Erreur dans getStatistics:', error);
    res.status(500).json({ error: 'Erreur lors de la récupération des statistiques' });
  }
};

// Fonction pour retourner des statistiques vides
const getEmptyStatistics = (timeRange) => {
  const defaultLabels = timeRange === 'week' 
    ? ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim']
    : timeRange === 'month'
    ? Array.from({length: 30}, (_, i) => `J${i+1}`)
    : ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun', 'Jul', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc'];

  return {
    dailyDiagnoses: {
      labels: defaultLabels,
      data: defaultLabels.map(() => 0)
    },
    diseaseDistribution: {
      labels: ['Aucune donnée'],
      data: [100]
    },
    severityLevels: {
      labels: ['Faible', 'Moyen', 'Élevé'],
      data: [0, 0, 0]
    },
    plantTypes: {
      labels: ['Aucune'],
      data: [100]
    },
    treatmentsApplied: {
      labels: ['Aucun'],
      data: [100]
    },
    successRate: {
      labels: defaultLabels.slice(0, 6),
      data: defaultLabels.slice(0, 6).map(() => 0)
    },
    summary: {
      totalDiagnoses: 0,
      successRate: 0,
      mostCommonDisease: 'Aucune',
      averageSeverity: 'Faible',
      monthlyGrowth: 0,
      diseasesDetected: 0,
      plantsAnalyzed: 0,
      treatmentsRecommended: 0,
      accuracyRate: 0,
      avgResponseTime: 0
    },
    detailedData: []
  };
};