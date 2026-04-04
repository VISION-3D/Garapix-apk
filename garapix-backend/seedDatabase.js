// Garapix-backend/seedDatabase.js
const mongoose = require('mongoose');
const User = require('./src/models/User');
const PlantDisease = require('./src/models/PlantDisease');
const Diagnosis = require('./src/models/Diagnosis');
const Plant = require('./src/models/Plant');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/garapix';

// Données des plantes (les 16 espèces)
const plantsData = [
  {
    name: 'Papayer',
    scientificName: 'Carica papaya',
    family: 'Caricaceae',
    description: 'Arbre fruitier tropical à croissance rapide',
    diseases: ['POURRITURE_COLLET', 'OIDIUM'],
    cultivationTips: 'Sol bien drainé, plein soleil',
    harvestTime: '8-10 mois',
    waterNeeds: 'Élevé',
    sunExposure: 'Plein soleil'
  },
  {
    name: 'Tomate',
    scientificName: 'Solanum lycopersicum',
    family: 'Solanaceae',
    description: 'Plante maraîchère très cultivée',
    diseases: ['MILDIOU', 'ALTERNARIOSE'],
    cultivationTips: 'Tuteurage nécessaire, rotation des cultures',
    harvestTime: '60-90 jours',
    waterNeeds: 'Moyen',
    sunExposure: 'Plein soleil'
  },
  // Ajoutez les 14 autres plantes ici...
];

// Données des maladies
const diseasesData = [
  {
    name: 'Mildiou',
    scientificName: 'Phytophthora infestans',
    type: 'fungal',
    description: 'Maladie fongique qui affecte les tomates et pommes de terre',
    symptoms: ['Taches huileuses sur feuilles', 'Pourriture brune des fruits'],
    affectedPlants: ['Tomate', 'Pomme de terre', 'Poivron'],
    severity: 'high',
    treatments: [
      {
        name: 'Bouillie bordelaise',
        description: 'Pulvériser toutes les 2 semaines',
        type: 'chemical',
        effectiveness: 'high'
      },
      {
        name: 'Rotation des cultures',
        description: 'Éviter de planter au même endroit pendant 3 ans',
        type: 'cultural',
        effectiveness: 'medium'
      }
    ],
    preventionTips: ['Éviter l\'humidité sur les feuilles', 'Bon espacement des plants']
  },
  {
    name: 'Oïdium',
    scientificName: 'Erysiphe spp.',
    type: 'fungal',
    description: 'Champignon formant un feutrage blanc sur les feuilles',
    symptoms: ['Poudre blanche sur feuilles', 'Déformation des feuilles'],
    affectedPlants: ['Concombre', 'Courgette', 'Rosier', 'Gombo'],
    severity: 'medium',
    treatments: [
      {
        name: 'Soufre mouillable',
        description: 'Pulvériser sur les feuilles atteintes',
        type: 'organic',
        effectiveness: 'high'
      },
      {
        name: 'Bicarbonate de soude',
        description: '10g/L d\'eau avec du savon noir',
        type: 'organic',
        effectiveness: 'medium'
      }
    ],
    preventionTips: ['Bon espacement', 'Éviter l\'arrosage foliaire']
  },
  // Ajoutez d'autres maladies...
];

// Données de diagnostic de test
const createTestDiagnoses = (userId) => {
  const diagnoses = [];
  const plants = ['Tomate', 'Papayer', 'Gombo', 'Piment', 'Concombre'];
  const diseases = ['Mildiou', 'Oïdium', 'Rouille', 'Anthracnose', 'Pourriture'];
  const severities = ['low', 'medium', 'high'];
  
  // Créer 50 diagnostics sur les 30 derniers jours
  for (let i = 0; i < 50; i++) {
    const date = new Date();
    date.setDate(date.getDate() - Math.floor(Math.random() * 30));
    
    diagnoses.push({
      user: userId,
      imageUrl: `https://picsum.photos/seed/${i}/800/600`,
      plantType: plants[Math.floor(Math.random() * plants.length)],
      diseases: [{
        disease: null, // À remplacer par un ID réel
        confidence: 0.7 + Math.random() * 0.25,
        severity: severities[Math.floor(Math.random() * severities.length)]
      }],
      status: Math.random() > 0.2 ? 'analyzed' : 'pending',
      notes: 'Diagnostic automatique de test',
      createdAt: date,
      analyzedAt: Math.random() > 0.1 ? date : null
    });
  }
  
  return diagnoses;
};

// Fonction principale
const seedDatabase = async () => {
  try {
    console.log('🌱 Connexion à MongoDB...');
    await mongoose.connect(MONGODB_URI);
    
    console.log('🗑️ Nettoyage de la base de données...');
    await User.deleteMany({});
    await PlantDisease.deleteMany({});
    await Diagnosis.deleteMany({});
    await Plant.deleteMany({});
    
    console.log('👤 Création d\'un utilisateur test...');
    const testUser = new User({
      username: 'testuser',
      email: 'test@garapix.com',
      password: 'password123',
      fullName: 'Utilisateur Test',
      role: 'user'
    });
    await testUser.save();
    
    console.log('🌿 Ajout des plantes...');
    const plants = await Plant.insertMany(plantsData);
    
    console.log('🦠 Ajout des maladies...');
    const diseases = await PlantDisease.insertMany(diseasesData);
    
    console.log('📊 Création des diagnostics de test...');
    const testDiagnoses = createTestDiagnoses(testUser._id);
    
    // Associer des maladies réelles aux diagnostics
    const diagnosesWithRealDiseases = testDiagnoses.map(diagnosis => ({
      ...diagnosis,
      diseases: diagnosis.diseases.map(d => ({
        ...d,
        disease: diseases[Math.floor(Math.random() * diseases.length)]._id
      }))
    }));
    
    await Diagnosis.insertMany(diagnosesWithRealDiseases);
    
    console.log('✅ Base de données initialisée avec succès !');
    console.log(`👤 Utilisateur: ${testUser.email} / password123`);
    console.log(`🌿 Plantes: ${plants.length} espèces`);
    console.log(`🦠 Maladies: ${diseases.length} types`);
    console.log(`📊 Diagnostics: ${diagnosesWithRealDiseases.length} entrées`);
    
    mongoose.disconnect();
    process.exit(0);
    
  } catch (error) {
    console.error('❌ Erreur lors de l\'initialisation:', error);
    process.exit(1);
  }
};

seedDatabase();