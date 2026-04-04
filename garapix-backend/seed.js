const mongoose = require('mongoose');
require('dotenv').config();
const PlantDisease = require('./src/models/PlantDisease');

const diseases = [
  {
    name: 'Mildiou',
    scientificName: 'Phytophthora infestans',
    type: 'fungal',
    description: 'Maladie fongique qui affecte les tomates et les pommes de terre',
    symptoms: ['Taches brunes sur les feuilles', 'Pourriture des fruits', 'Feuilles flétries'],
    affectedPlants: ['Tomate', 'Pomme de terre'],
    severity: 'high',
    treatments: [
      {
        name: 'Fongicide à base de cuivre',
        description: 'Application de bouillie bordelaise',
        type: 'chemical'
      },
      {
        name: 'Rotation des cultures',
        description: 'Ne pas planter la même famille de plantes au même endroit',
        type: 'cultural'
      }
    ],
    preventionTips: [
      'Éviter l\'arrosage des feuilles',
      'Assurer une bonne circulation d\'air',
      'Utiliser des variétés résistantes'
    ]
  },
  {
    name: 'Oïdium',
    scientificName: 'Erysiphe spp.',
    type: 'fungal',
    description: 'Champignon blanc poudreux sur les feuilles',
    symptoms: ['Taches blanches poudreuses', 'Feuilles jaunissantes', 'Croissance réduite'],
    affectedPlants: ['Concombre', 'Courge', 'Rosier'],
    severity: 'medium',
    treatments: [
      {
        name: 'Bicarbonate de soude',
        description: 'Solution de bicarbonate et de savon',
        type: 'organic'
      },
      {
        name: 'Soufre',
        description: 'Poudre de soufre appliquée sur les feuilles',
        type: 'chemical'
      }
    ],
    preventionTips: [
      'Planter dans des endroits ensoleillés',
      'Éviter l\'excès d\'azote',
      'Tailler pour améliorer la circulation d\'air'
    ]
  }
];

async function seedDatabase() {
  try {
    // Connexion à MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/garapix', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log('✅ Connecté à MongoDB');
    
    // Nettoyer la collection
    await PlantDisease.deleteMany({});
    console.log('🗑️  Collection PlantDisease nettoyée');
    
    // Insérer les maladies
    await PlantDisease.insertMany(diseases);
    console.log(`🌱 ${diseases.length} maladies insérées dans la base de données`);
    
    // Afficher les maladies insérées
    const count = await PlantDisease.countDocuments();
    console.log(`📊 Total de maladies dans la base : ${count}`);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Erreur lors du seeding:', error);
    process.exit(1);
  }
}

seedDatabase();