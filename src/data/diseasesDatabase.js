// src/data/diseasesDatabase.js
export const diseasesDatabase = [
  {
    id: '1',
    name: 'Mildiou',
    scientificName: 'Phytophthora infestans',
    type: 'fungal',
    description: 'Maladie cryptogamique très redoutée qui affecte principalement les tomates et les pommes de terre.',
    symptoms: [
      'Taches brunes huileuses sur les feuilles',
      'Pourriture grise des fruits',
      'Flétrissement des tiges',
      'Présence de mycélium blanc au revers des feuilles'
    ],
    affectedPlants: ['Tomate', 'Pomme de terre', 'Aubergine'],
    severity: 'high',
    treatments: [
      {
        name: 'Bouillie bordelaise',
        description: 'Pulvérisation préventive à base de sulfate de cuivre',
        type: 'chemical',
        effectiveness: 'high',
        frequency: 'Toutes les 2 semaines'
      },
      {
        name: 'Rotation des cultures',
        description: 'Ne pas cultiver de Solanacées au même endroit pendant 3 ans',
        type: 'cultural',
        effectiveness: 'medium'
      }
    ],
    preventionTips: [
      'Éviter l\'arrosage par aspersion',
      'Assurer une bonne circulation d\'air',
      'Pailler le sol',
      'Utiliser des variétés résistantes'
    ],
    seasonality: ['printemps', 'été'],
    image: '/api/placeholder/400/300'
  },
  {
    id: '2',
    name: 'Oïdium',
    scientificName: 'Erysiphe spp.',
    type: 'fungal',
    description: 'Maladie fongique qui forme un feutrage blanc sur les feuilles et les tiges.',
    symptoms: [
      'Poudre blanche sur les feuilles',
      'Jaunissement et dessèchement',
      'Courbure des feuilles',
      'Ralentissement de la croissance'
    ],
    affectedPlants: ['Rosier', 'Concombre', 'Courgette', 'Vigne'],
    severity: 'medium',
    treatments: [
      {
        name: 'Soufre mouillable',
        description: 'Pulvérisation de soufre en poudre',
        type: 'organic',
        effectiveness: 'high',
        frequency: '1 fois par semaine'
      },
      {
        name: 'Bicarbonate de soude',
        description: 'Solution de bicarbonate (10g/L) avec du savon noir',
        type: 'natural',
        effectiveness: 'medium'
      }
    ],
    preventionTips: [
      'Éviter les excès d\'azote',
      'Tailler pour aérer la plante',
      'Arroser au pied sans mouiller le feuillage'
    ],
    seasonality: ['été', 'automne'],
    image: '/api/placeholder/400/300'
  },
  {
    id: '3',
    name: 'Rouille',
    scientificName: 'Puccinia spp.',
    type: 'fungal',
    description: 'Maladie caractérisée par des pustules orangées ou brunes sur les feuilles.',
    symptoms: [
      'Pustules oranges sur la face inférieure des feuilles',
      'Taches jaunes sur la face supérieure',
      'Chute prématurée des feuilles',
      'Affaiblissement de la plante'
    ],
    affectedPlants: ['Rosier', 'Haricot', 'Blé', 'Poireau'],
    severity: 'medium',
    treatments: [
      {
        name: 'Fongicide systémique',
        description: 'Traitement curatif à action systémique',
        type: 'chemical',
        effectiveness: 'high'
      },
      {
        name: 'Décoction de prêle',
        description: 'Pulvérisation préventive riche en silice',
        type: 'natural',
        effectiveness: 'medium'
      }
    ],
    preventionTips: [
      'Éliminer les feuilles tombées',
      'Éviter l\'humidité stagnante',
      'Espacer les plants'
    ],
    seasonality: ['printemps', 'été'],
    image: '/api/placeholder/400/300'
  },
  {
    id: '4',
    name: 'Taches noires du rosier',
    scientificName: 'Diplocarpon rosae',
    type: 'fungal',
    description: 'Maladie fongique spécifique aux rosiers, caractérisée par des taches noires circulaires.',
    symptoms: [
      'Taches noires circulaires sur les feuilles',
      'Jaunissement autour des taches',
      'Chute prématurée des feuilles',
      'Affaiblissement du rosier'
    ],
    affectedPlants: ['Rosier'],
    severity: 'medium',
    treatments: [
      {
        name: 'Fongicide à base de myclobutanil',
        description: 'Traitement curatif et préventif',
        type: 'chemical',
        effectiveness: 'high'
      },
      {
        name: 'Purín d\'ortie',
        description: 'Renforce les défenses naturelles de la plante',
        type: 'natural',
        effectiveness: 'low'
      }
    ],
    preventionTips: [
      'Arroser le pied sans mouiller les feuilles',
      'Tailler régulièrement',
      'Nettoyer les feuilles mortes'
    ],
    seasonality: ['été', 'automne'],
    image: '/api/placeholder/400/300'
  },
  {
    id: '5',
    name: 'Pucerons',
    scientificName: 'Aphididae',
    type: 'pest',
    description: 'Petits insectes suceurs de sève qui affaiblissent les plantes et transmettent des virus.',
    symptoms: [
      'Colonies d\'insectes verts, noirs ou bruns',
      'Feuilles recroquevillées',
      'Miellat collant sur les feuilles',
      'Fumagine (champignon noir)'
    ],
    affectedPlants: ['Rosier', 'Tomate', 'Haricot', 'Arbres fruitiers'],
    severity: 'medium',
    treatments: [
      {
        name: 'Savon noir insecticide',
        description: 'Pulvérisation de solution de savon noir',
        type: 'organic',
        effectiveness: 'high',
        frequency: '2 fois par semaine'
      },
      {
        name: 'Coccinelles',
        description: 'Introduction de prédateurs naturels',
        type: 'biological',
        effectiveness: 'high'
      }
    ],
    preventionTips: [
      'Favoriser les auxiliaires (coccinelles, syrphes)',
      'Planter des plantes répulsives (lavande, menthe)',
      'Éviter les excès d\'azote'
    ],
    seasonality: ['printemps', 'été'],
    image: '/api/placeholder/400/300'
  },
  {
    id: '6',
    name: 'Carence en azote',
    scientificName: 'N',
    type: 'nutrient',
    description: 'Déficience en azote, élément essentiel pour la croissance des plantes.',
    symptoms: [
      'Feuilles jaunes (chlorose) commençant par les plus vieilles',
      'Croissance ralentie',
      'Feuilles petites et minces',
      'Tiges fines et faibles'
    ],
    affectedPlants: ['Toutes les plantes', 'Particulièrement légumes feuilles'],
    severity: 'medium',
    treatments: [
      {
        name: 'Engrais azoté',
        description: 'Apport d\'engrais riche en azote (NPK 20-10-10)',
        type: 'chemical',
        effectiveness: 'high'
      },
      {
        name: 'Compost ou fumier',
        description: 'Apport de matière organique',
        type: 'organic',
        effectiveness: 'medium'
      }
    ],
    preventionTips: [
      'Rotation des cultures avec légumineuses',
      'Paillage avec matière organique',
      'Apports réguliers de compost'
    ],
    seasonality: ['toute l\'année'],
    image: '/api/placeholder/400/300'
  }
];

export default diseasesDatabase;