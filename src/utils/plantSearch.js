// src/utils/plantSearch.js

// Fonction de distance de Levenshtein pour la recherche floue
export function levenshteinDistance(a, b) {
  const matrix = [];
  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }
  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }
  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        );
      }
    }
  }
  return matrix[b.length][a.length];
}

// Fonction de similarité (0 à 1)
export function similarity(s1, s2) {
  const longer = s1.length > s2.length ? s1 : s2;
  const shorter = s1.length > s2.length ? s2 : s1;
  if (longer.length === 0) return 1.0;
  const distance = levenshteinDistance(longer, shorter);
  return (longer.length - distance) / longer.length;
}

// Recherche floue dans la base de plantes
export function fuzzySearchPlant(query, plants, threshold = 0.6) {
  if (!query || !plants || plants.length === 0) return null;
  
  const cleanQuery = query.toLowerCase().trim();
  let bestMatch = null;
  let bestScore = 0;
  
  for (const plant of plants) {
    // Recherche dans le nom commun
    const score1 = similarity(cleanQuery, plant.nomCommun.toLowerCase());
    
    // Recherche dans le nom scientifique
    const score2 = similarity(cleanQuery, plant.nomScientifique.toLowerCase());
    
    // Recherche dans la famille
    const score3 = similarity(cleanQuery, plant.famille.toLowerCase());
    
    // Prendre le meilleur score
    const score = Math.max(score1, score2, score3);
    
    if (score > bestScore) {
      bestScore = score;
      bestMatch = plant;
    }
  }
  
  return bestScore >= threshold ? { plant: bestMatch, score: bestScore } : null;
}

// Deviner la plante à partir du nom de fichier
export function guessPlantFromFileName(filename) {
  const lower = filename.toLowerCase();
  
  const plantKeywords = [
    { keyword: 'tomate', plant: 'Tomate' },
    { keyword: 'tomato', plant: 'Tomate' },
    { keyword: 'mais', plant: 'Maïs' },
    { keyword: 'corn', plant: 'Maïs' },
    { keyword: 'riz', plant: 'Riz' },
    { keyword: 'rice', plant: 'Riz' },
    { keyword: 'blé', plant: 'Blé' },
    { keyword: 'wheat', plant: 'Blé' },
    { keyword: 'manguier', plant: 'Manguier' },
    { keyword: 'mango', plant: 'Manguier' },
    { keyword: 'bananier', plant: 'Bananier' },
    { keyword: 'banana', plant: 'Bananier' },
    { keyword: 'caféier', plant: 'Caféier' },
    { keyword: 'coffee', plant: 'Caféier' },
    { keyword: 'piment', plant: 'Piment' },
    { keyword: 'pepper', plant: 'Piment' },
    { keyword: 'aubergine', plant: 'Aubergine' },
    { keyword: 'eggplant', plant: 'Aubergine' },
    { keyword: 'poivron', plant: 'Poivron' },
    { keyword: 'bell pepper', plant: 'Poivron' },
    { keyword: 'chou', plant: 'Chou' },
    { keyword: 'cabbage', plant: 'Chou' },
    { keyword: 'carotte', plant: 'Carotte' },
    { keyword: 'carrot', plant: 'Carotte' },
    { keyword: 'oignon', plant: 'Oignon' },
    { keyword: 'onion', plant: 'Oignon' },
    { keyword: 'pomme de terre', plant: 'Pomme de terre' },
    { keyword: 'potato', plant: 'Pomme de terre' }
  ];
  
  for (const { keyword, plant } of plantKeywords) {
    if (lower.includes(keyword)) {
      return plant;
    }
  }
  
  return null;
}

// Trouver la plante la plus probable en fonction des maladies courantes
export function findPlantByCommonDiseases(diseaseNames, plants) {
  const diseaseMap = diseaseNames.map(d => d.toLowerCase());
  
  const scoredPlants = plants.map(plant => {
    let score = 0;
    if (plant.diseases) {
      plant.diseases.forEach(diseaseCode => {
        if (diseaseMap.includes(diseaseCode.toLowerCase())) {
          score += 1;
        }
      });
    }
    return { plant, score };
  });
  
  scoredPlants.sort((a, b) => b.score - a.score);
  return scoredPlants[0]?.score > 0 ? scoredPlants[0].plant : null;
}

// Formater le nom de plante pour la recherche
export function formatPlantNameForSearch(name) {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Supprimer les accents
    .replace(/[^a-z0-9\s]/g, '')     // Garder seulement lettres, chiffres et espaces
    .trim();
}

// Vérifier si deux noms de plantes sont similaires
export function arePlantsSimilar(name1, name2, threshold = 0.8) {
  const cleanName1 = formatPlantNameForSearch(name1);
  const cleanName2 = formatPlantNameForSearch(name2);
  
  // Vérifier l'inclusion
  if (cleanName1.includes(cleanName2) || cleanName2.includes(cleanName1)) {
    return true;
  }
  
  // Vérifier la similarité
  const sim = similarity(cleanName1, cleanName2);
  return sim >= threshold;
}