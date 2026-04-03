// src/services/plantIdentificationService.js
import { fuzzySearchPlant, guessPlantFromFileName } from '../utils/plantSearch';

class PlantIdentificationService {
  constructor() {
    this.plantDatabase = []; // Sera injecté
    this.apiCallCount = {
      plantnet: parseInt(localStorage.getItem('plantnet_api_calls') || '0'),
      google: parseInt(localStorage.getItem('google_vision_calls') || '0')
    };
  }

  setPlantDatabase(plants) {
    this.plantDatabase = plants;
  }

  // Identification intelligente combinant toutes les méthodes
  async identifyPlantSmart(imageFile, userInput = '') {
    const strategies = [
      { name: 'user_input', weight: 0.3 },
      { name: 'filename_analysis', weight: 0.2 },
      { name: 'api_plantnet', weight: 0.4 },
      { name: 'api_google', weight: 0.1 }
    ];

    const results = [];
    
    // 1. Analyse de l'entrée utilisateur
    if (userInput.trim()) {
      const userResult = this.identifyFromUserInput(userInput);
      if (userResult) {
        results.push({ ...userResult, strategy: 'user_input' });
      }
    }
    
    // 2. Analyse du nom de fichier
    if (imageFile?.name) {
      const filenameResult = this.identifyFromFilename(imageFile.name);
      if (filenameResult) {
        results.push({ ...filenameResult, strategy: 'filename_analysis' });
      }
    }
    
    // 3. Tentative avec PlantNet API
    if (this.apiCallCount.plantnet < 500) {
      try {
        const plantnetResult = await this.identifyWithPlantNet(imageFile);
        if (plantnetResult) {
          results.push({ ...plantnetResult, strategy: 'api_plantnet' });
        }
      } catch (error) {
        console.warn('PlantNet API échouée:', error);
      }
    }
    
    // 4. Tentative avec Google Vision
    if (this.apiCallCount.google < 1000) {
      try {
        const googleResult = await this.identifyWithGoogleVision(imageFile);
        if (googleResult) {
          results.push({ ...googleResult, strategy: 'api_google' });
        }
      } catch (error) {
        console.warn('Google Vision échouée:', error);
      }
    }
    
    // Si aucune stratégie n'a fonctionné, utiliser une plante commune
    if (results.length === 0) {
      const commonResult = this.identifyCommonPlant();
      results.push({ ...commonResult, strategy: 'common_plant' });
    }
    
    // Fusionner et pondérer les résultats
    return this.mergeResults(results, strategies);
  }

  identifyFromUserInput(userInput) {
    const searchResult = fuzzySearchPlant(userInput, this.plantDatabase, 0.5);
    if (searchResult) {
      return {
        plant: searchResult.plant,
        confidence: Math.min(searchResult.score * 100, 95),
        source: 'Recherche utilisateur'
      };
    }
    return null;
  }

  identifyFromFilename(filename) {
    const guessedPlantName = guessPlantFromFileName(filename);
    if (guessedPlantName) {
      const searchResult = fuzzySearchPlant(guessedPlantName, this.plantDatabase, 0.6);
      if (searchResult) {
        return {
          plant: searchResult.plant,
          confidence: 70,
          source: 'Analyse du nom de fichier'
        };
      }
    }
    return null;
  }

  async identifyWithPlantNet(imageFile) {
    // Simulation de l'API PlantNet
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Dans la réalité, vous utiliseriez l'API PlantNet
    const possiblePlants = [
      { name: 'Tomate', confidence: 85, scientificName: 'Solanum lycopersicum' },
      { name: 'Piment', confidence: 72, scientificName: 'Capsicum annuum' },
      { name: 'Aubergine', confidence: 65, scientificName: 'Solanum melongena' }
    ];
    
    const bestMatch = possiblePlants[0];
    const matchedPlant = this.plantDatabase.find(p => 
      p.nomCommun === bestMatch.name || 
      p.nomScientifique === bestMatch.scientificName
    );
    
    if (matchedPlant) {
      this.apiCallCount.plantnet++;
      localStorage.setItem('plantnet_api_calls', this.apiCallCount.plantnet.toString());
      
      return {
        plant: matchedPlant,
        confidence: bestMatch.confidence,
        source: 'PlantNet API',
        alternatives: possiblePlants.slice(1)
      };
    }
    
    return null;
  }

  async identifyWithGoogleVision(imageFile) {
    // Simulation de l'API Google Vision
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const possibleLabels = [
      { description: 'Tomato plant', confidence: 88 },
      { description: 'Leaf', confidence: 76 },
      { description: 'Vegetable garden', confidence: 65 }
    ];
    
    const bestLabel = possibleLabels[0];
    
    // Chercher une correspondance approximative
    const matchedPlant = this.plantDatabase.find(p => 
      bestLabel.description.toLowerCase().includes(p.nomCommun.toLowerCase()) ||
      p.nomCommun.toLowerCase().includes(bestLabel.description.toLowerCase().split(' ')[0])
    );
    
    if (matchedPlant) {
      this.apiCallCount.google++;
      localStorage.setItem('google_vision_calls', this.apiCallCount.google.toString());
      
      return {
        plant: matchedPlant,
        confidence: bestLabel.confidence,
        source: 'Google Vision API'
      };
    }
    
    return null;
  }

  identifyCommonPlant() {
    // Retourner une plante commune par défaut
    const commonPlants = this.plantDatabase.filter(p => 
      ['Tomate', 'Maïs', 'Riz', 'Blé'].includes(p.nomCommun)
    );
    
    const randomPlant = commonPlants[Math.floor(Math.random() * commonPlants.length)];
    
    return {
      plant: randomPlant,
      confidence: 50,
      source: 'Plante commune par défaut'
    };
  }

  mergeResults(results, strategies) {
    if (results.length === 0) return null;
    
    // Grouper par plante
    const plantMap = new Map();
    
    results.forEach(result => {
      if (!result.plant) return;
      
      const plantId = result.plant.id || result.plant.nomCommun;
      const strategy = strategies.find(s => s.name === result.strategy);
      const weight = strategy ? strategy.weight : 0.1;
      
      if (!plantMap.has(plantId)) {
        plantMap.set(plantId, {
          plant: result.plant,
          confidence: result.confidence * weight,
          sources: [result.source],
          strategies: [result.strategy],
          totalWeight: weight
        });
      } else {
        const existing = plantMap.get(plantId);
        existing.confidence += result.confidence * weight;
        existing.sources.push(result.source);
        existing.strategies.push(result.strategy);
        existing.totalWeight += weight;
      }
    });
    
    // Normaliser les confiances
    const mergedResults = Array.from(plantMap.values()).map(item => ({
      ...item,
      confidence: item.confidence / item.totalWeight
    }));
    
    // Trier par confiance
    mergedResults.sort((a, b) => b.confidence - a.confidence);
    
    return {
      bestMatch: mergedResults[0],
      alternatives: mergedResults.slice(1, 4),
      totalResults: mergedResults.length
    };
  }

  getStats() {
    return {
      apiCallCount: this.apiCallCount,
      plantnetRemaining: 500 - this.apiCallCount.plantnet,
      googleRemaining: 1000 - this.apiCallCount.google,
      totalPlants: this.plantDatabase.length
    };
  }

  resetCounters() {
    this.apiCallCount = { plantnet: 0, google: 0 };
    localStorage.removeItem('plantnet_api_calls');
    localStorage.removeItem('google_vision_calls');
  }
}

export default new PlantIdentificationService();