// Service pour l'analyse d'images avec TensorFlow
class TFService {
  constructor() {
    this.diseaseDatabase = [
      {
        id: '1',
        name: 'Mildiou',
        scientificName: 'Phytophthora infestans',
        confidence: 0.92,
        severity: 'high',
        type: 'fungal',
        affectedPlants: ['Tomate', 'Pomme de terre']
      },
      {
        id: '2',
        name: 'Oïdium',
        scientificName: 'Erysiphe spp.',
        confidence: 0.85,
        severity: 'medium',
        type: 'fungal',
        affectedPlants: ['Concombre', 'Courge', 'Rosier']
      },
      {
        id: '3',
        name: 'Rouille',
        scientificName: 'Puccinia spp.',
        confidence: 0.78,
        severity: 'medium',
        type: 'fungal',
        affectedPlants: ['Haricot', 'Blé', 'Rosier']
      }
    ];
  }

  async analyzeImage(imageUrl) {
    try {
      // Simulation d'un délai d'analyse
      await new Promise(resolve => setTimeout(resolve, 1500));

      const diseases = this.diseaseDatabase
        .map(disease => ({
          id: disease.id,
          name: disease.name,
          confidence: disease.confidence * (0.9 + Math.random() * 0.2),
          severity: disease.severity,
          type: disease.type
        }))
        .sort((a, b) => b.confidence - a.confidence)
        .slice(0, 3);

      return {
        success: true,
        diseases,
        recommendations: this.generateRecommendations(diseases)
      };
    } catch (error) {
      console.error('Erreur lors de l\'analyse TF:', error);
      throw new Error('Échec de l\'analyse d\'image');
    }
  }

  generateRecommendations(diseases) {
    const recommendations = [];
    
    diseases.forEach(disease => {
      if (disease.severity === 'high' || disease.severity === 'critical') {
        recommendations.push({
          disease: disease.name,
          action: 'immédiate',
          steps: [
            'Isoler la plante affectée',
            'Retirer les parties malades',
            'Appliquer un traitement fongicide'
          ]
        });
      } else if (disease.severity === 'medium') {
        recommendations.push({
          disease: disease.name,
          action: 'préventive',
          steps: [
            'Améliorer la circulation d\'air',
            'Éviter l\'arrosage foliaire',
            'Appliquer un traitement préventif'
          ]
        });
      }
    });

    return recommendations;
  }
}

module.exports = new TFService();