// src/services/diseaseDetectionService.js
class DiseaseDetectionService {
  // Base de données des maladies par plante
  static diseasesDatabase = {
    // Maladies des tomates
    'Tomate': [
      {
        name: 'Mildiou',
        scientificName: 'Phytophthora infestans',
        description: 'Maladie fongique très destructrice qui affecte les feuilles, tiges et fruits.',
        severity: 'haute',
        symptoms: [
          'Taches brunes sur les feuilles',
          'Pourriture des fruits',
          'Moisissure blanche au revers des feuilles',
          'Flétrissement rapide'
        ],
        treatments: [
          {
            name: 'Fongicide à base de cuivre',
            description: 'Appliquez tous les 7-10 jours par temps humide',
            type: 'chimique',
            effectiveness: 'haute'
          },
          {
            name: 'Rotation des cultures',
            description: 'Ne pas replanter de solanacées au même endroit pendant 3 ans',
            type: 'culturel',
            effectiveness: 'moyenne'
          }
        ],
        prevention: [
          'Éviter l\'arrosage par aspersion',
          'Assurer une bonne circulation d\'air',
          'Utiliser des variétés résistantes'
        ]
      },
      {
        name: 'Oïdium',
        scientificName: 'Oidium lycopersici',
        description: 'Champignon formant un feutrage blanc sur les feuilles.',
        severity: 'moyenne',
        symptoms: [
          'Taches blanches poudreuses sur les feuilles',
          'Jaunissement des feuilles',
          'Déformation des jeunes pousses'
        ],
        treatments: [
          {
            name: 'Soufre mouillable',
            description: 'Appliquez en traitement préventif et curatif',
            type: 'organique',
            effectiveness: 'haute'
          }
        ],
        prevention: [
          'Contrôler l\'humidité',
          'Éviter les excès d\'azote'
        ]
      }
    ],
    
    // Maladies des manguiers
    'Manguier': [
      {
        name: 'Anthracnose',
        scientificName: 'Colletotrichum gloeosporioides',
        description: 'Maladie fongique affectant les fleurs, fruits et feuilles.',
        severity: 'haute',
        symptoms: [
          'Taches noires sur les fruits',
          'Chute prématurée des fleurs',
          'Nécrose des feuilles'
        ],
        treatments: [
          {
            name: 'Fongicide systémique',
            description: 'Appliquez avant et après la floraison',
            type: 'chimique',
            effectiveness: 'haute'
          }
        ],
        prevention: [
          'Tailler pour aérer la couronne',
          'Éliminer les fruits momifiés',
          'Choisir des variétés résistantes'
        ]
      }
    ],
    
    // Maladies des papayers
    'Papayer': [
      {
        name: 'Virus de la mosaïque',
        scientificName: 'Papaya mosaic virus',
        description: 'Maladie virale provoquant une réduction de la croissance.',
        severity: 'haute',
        symptoms: [
          'Mosaïque sur les feuilles',
          'Déformation des fruits',
          'Nanisme de la plante'
        ],
        treatments: [
          {
            name: 'Arrachage des plants malades',
            description: 'Éliminez et brûlez les plants infectés',
            type: 'sanitaire',
            effectiveness: 'moyenne'
          }
        ],
        prevention: [
          'Lutte contre les pucerons vecteurs',
          'Utiliser des plants sains certifiés'
        ]
      }
    ]
  };

  static async analyzeDiseases(plantName, imageUrl) {
    try {
      // Simulation d'analyse IA
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Récupérer les maladies de la base de données
      const plantDiseases = this.diseasesDatabase[plantName] || [];
      
      // Pour la démo, retourner les maladies avec une confiance simulée
      return plantDiseases.map(disease => ({
        ...disease,
        confidence: 0.7 + Math.random() * 0.25 // 70-95% de confiance
      }));
      
    } catch (error) {
      console.error('Erreur d\'analyse des maladies:', error);
      throw error;
    }
  }
}

export default DiseaseDetectionService;