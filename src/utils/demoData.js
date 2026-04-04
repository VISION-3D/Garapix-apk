// src/utils/demoData.js
export const createDemoData = () => {
  const hasData = localStorage.getItem('garapix_diagnostics');
  if (hasData) return; // Ne pas créer si des données existent déjà

  const demoDiagnostics = [
    {
      id: '1',
      plantName: 'Tomate',
      plantScientific: 'Solanum lycopersicum',
      imageUrl: 'https://images.unsplash.com/photo-1598880940089-74b6f62c6f56',
      diseases: [
        { name: 'Mildiou', confidence: 92, severity: 'high' },
        { name: 'Oïdium', confidence: 78, severity: 'medium' }
      ],
      confidence: 85,
      severity: 'high',
      treatments: [
        { name: 'Bouillie bordelaise', type: 'chemical' },
        { name: 'Rotation des cultures', type: 'cultural' }
      ],
      timestamp: new Date(Date.now() - 86400000 * 2).toISOString(), // Il y a 2 jours
      notes: 'Taches huileuses sur les feuilles inférieures'
    },
    {
      id: '2',
      plantName: 'Rosier',
      plantScientific: 'Rosa spp.',
      imageUrl: 'https://images.unsplash.com/photo-1562690868-60bbe7293e94',
      diseases: [
        { name: 'Black spot', confidence: 88, severity: 'medium' }
      ],
      confidence: 88,
      severity: 'medium',
      treatments: [
        { name: 'Fongicide spécifique', type: 'chemical' },
        { name: 'Élagage des feuilles atteintes', type: 'cultural' }
      ],
      timestamp: new Date(Date.now() - 86400000 * 5).toISOString(), // Il y a 5 jours
      notes: 'Taches noires sur les feuilles, défoliation partielle'
    },
    {
      id: '3',
      plantName: 'Manguier',
      plantScientific: 'Mangifera indica',
      imageUrl: 'https://images.unsplash.com/photo-1568702846914-96b305d2aaeb',
      diseases: [
        { name: 'Anthracnose', confidence: 82, severity: 'medium' }
      ],
      confidence: 82,
      severity: 'medium',
      treatments: [
        { name: 'Fongicide au cuivre', type: 'chemical' },
        { name: 'Élimination des fruits atteints', type: 'cultural' }
      ],
      timestamp: new Date(Date.now() - 86400000 * 8).toISOString(), // Il y a 8 jours
      notes: 'Taches brunes sur les feuilles et fruits'
    },
    {
      id: '4',
      plantName: 'Blé',
      plantScientific: 'Triticum spp.',
      imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b',
      diseases: [],
      confidence: 95,
      severity: 'low',
      treatments: [],
      timestamp: new Date(Date.now() - 86400000 * 12).toISOString(), // Il y a 12 jours
      notes: 'Plante saine, croissance normale'
    },
    {
      id: '5',
      plantName: 'Caféier',
      plantScientific: 'Coffea arabica',
      imageUrl: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31',
      diseases: [
        { name: 'Rouille', confidence: 91, severity: 'high' },
        { name: 'Pucerons', confidence: 76, severity: 'medium' }
      ],
      confidence: 84,
      severity: 'high',
      treatments: [
        { name: 'Soufre mouillable', type: 'organic' },
        { name: 'Savon insecticide', type: 'organic' }
      ],
      timestamp: new Date(Date.now() - 86400000 * 15).toISOString(), // Il y a 15 jours
      notes: 'Pustules orangées sur feuilles, présence d\'insectes'
    }
  ];

  localStorage.setItem('garapix_diagnostics', JSON.stringify(demoDiagnostics));

  // Créer des statistiques de démonstration
  const demoStats = {
    totalDiagnostics: 5,
    successRate: 86.8,
    plantsAnalyzed: ['Tomate', 'Rosier', 'Manguier', 'Blé', 'Caféier'],
    diseasesDetected: 7,
    averageSeverity: 2.4,
    treatmentsRecommended: 8,
    responseTime: 2.3,
    mostCommonDisease: { name: 'Mildiou', count: 2 },
    diagnosticsByDay: [
      { date: new Date(Date.now() - 86400000 * 15).toLocaleDateString(), count: 1 },
      { date: new Date(Date.now() - 86400000 * 12).toLocaleDateString(), count: 1 },
      { date: new Date(Date.now() - 86400000 * 8).toLocaleDateString(), count: 1 },
      { date: new Date(Date.now() - 86400000 * 5).toLocaleDateString(), count: 1 },
      { date: new Date(Date.now() - 86400000 * 2).toLocaleDateString(), count: 1 }
    ]
  };

  localStorage.setItem('garapix_stats', JSON.stringify(demoStats));

  console.log('✅ Données de démonstration créées');
};

// Ajouter dans App.jsx
import { createDemoData } from './utils/demoData';

// Appeler au démarrage
createDemoData();