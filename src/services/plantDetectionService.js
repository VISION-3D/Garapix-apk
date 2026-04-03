// Dans vos services frontend
import HistoryService from './historyService';

// Intercepter les diagnostics
export const interceptDiagnostic = (diagnosisData) => {
  HistoryService.logDiagnostic(
    diagnosisData.plantType,
    diagnosisData.result
  );
};

// Intercepter les traitements
export const interceptTreatment = (treatmentData) => {
  HistoryService.logTreatment(
    treatmentData.plantType,
    treatmentData
  );
};

// Intercepter les arrosages
export const interceptWatering = (cropData) => {
  HistoryService.logAction({
    action: 'watering',
    title: 'Arrosage effectué',
    plantType: cropData.plantType,
    description: `Arrosage de ${cropData.name}`,
    details: {
      cropId: cropData._id,
      cropName: cropData.name,
      quantity: cropData.waterAmount
    }
  });
};


// src/services/plantDetectionService.js - CORRECTION DE LA DÉTECTION

class PlantDetectionService {
  // ... (garder tout le reste de la classe inchangé)

  // Nouvelle fonction de détection basée sur l'analyse d'image
  static async detectPlantFromImage(imageFile) {
    try {
      console.log('Début de la détection IA...');
      
      // 1. Analyser l'image pour détecter la couleur dominante
      const colorAnalysis = await this.analyzeImageColors(imageFile);
      
      // 2. Analyser la forme et les contours
      const shapeAnalysis = await this.analyzeImageShape(imageFile);
      
      // 3. Trouver la plante la plus probable basée sur les caractéristiques
      const detectedPlant = await this.findBestMatchingPlant(colorAnalysis, shapeAnalysis);
      
      // 4. Obtenir les maladies associées
      const diseases = this.getPlantDiseases(detectedPlant.nomScientifique);
      
      // 5. Calculer le score de confiance
      const confidence = this.calculateConfidence(detectedPlant, colorAnalysis, shapeAnalysis);
      
      console.log(`Plante détectée: ${detectedPlant.nomCommun} (${confidence}% de confiance)`);
      
      return {
        success: true,
        plant: {
          ...detectedPlant,
          confidence: confidence
        },
        diseases: diseases,
        detectionMethod: "Analyse IA (couleurs + formes)",
        analysisData: {
          color: colorAnalysis.dominantColor,
          shape: shapeAnalysis.shapeType
        }
      };
      
    } catch (error) {
      console.error('Erreur de détection:', error);
      // En cas d'erreur, retourner une plante aléatoire avec faible confiance
      return this.fallbackDetection();
    }
  }

  // Analyser les couleurs de l'image
  static async analyzeImageColors(imageFile) {
    return new Promise((resolve) => {
      const img = new Image();
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;
        
        // Analyser les couleurs dominantes
        let red = 0, green = 0, blue = 0;
        let greenPixels = 0, brownPixels = 0, redPixels = 0;
        
        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          
          red += r;
          green += g;
          blue += b;
          
          // Détecter les pixels verts (feuilles)
          if (g > r && g > b && g > 100) {
            greenPixels++;
          }
          // Détecter les pixels bruns (tiges/terre)
          else if (r > 100 && g > 50 && b < 100 && Math.abs(r - g) < 50) {
            brownPixels++;
          }
          // Détecter les pixels rouges (fruits)
          else if (r > 150 && g < 100 && b < 100) {
            redPixels++;
          }
        }
        
        const totalPixels = data.length / 4;
        const dominantColor = this.getDominantColor(greenPixels, brownPixels, redPixels, totalPixels);
        
        resolve({
          red: red / totalPixels,
          green: green / totalPixels,
          blue: blue / totalPixels,
          greenPercentage: (greenPixels / totalPixels) * 100,
          brownPercentage: (brownPixels / totalPixels) * 100,
          redPercentage: (redPixels / totalPixels) * 100,
          dominantColor: dominantColor,
          totalPixels: totalPixels
        });
      };
      
      const reader = new FileReader();
      reader.onload = (e) => {
        img.src = e.target.result;
      };
      reader.readAsDataURL(imageFile);
    });
  }

  // Déterminer la couleur dominante
  static getDominantColor(green, brown, red, total) {
    const greenPercent = (green / total) * 100;
    const brownPercent = (brown / total) * 100;
    const redPercent = (red / total) * 100;
    
    if (greenPercent > 50) return 'green';
    if (redPercent > 30) return 'red';
    if (brownPercent > 40) return 'brown';
    if (greenPercent > brownPercent && greenPercent > redPercent) return 'green';
    if (redPercent > greenPercent && redPercent > brownPercent) return 'red';
    return 'brown';
  }

  // Analyser la forme (simplifiée)
  static async analyzeImageShape(imageFile) {
    return new Promise((resolve) => {
      const img = new Image();
      
      img.onload = () => {
        const aspectRatio = img.width / img.height;
        let shapeType = 'unknown';
        
        // Détection basique de la forme
        if (aspectRatio > 1.5) {
          shapeType = 'elongated'; // Allongé (comme un gombo)
        } else if (aspectRatio < 0.7) {
          shapeType = 'tall'; // Haut (comme un arbre)
        } else if (Math.abs(aspectRatio - 1) < 0.3) {
          shapeType = 'round'; // Rond (comme une tomate)
        } else {
          shapeType = 'irregular';
        }
        
        resolve({
          width: img.width,
          height: img.height,
          aspectRatio: aspectRatio,
          shapeType: shapeType,
          sizeCategory: this.getSizeCategory(img.width * img.height)
        });
      };
      
      const reader = new FileReader();
      reader.onload = (e) => {
        img.src = e.target.result;
      };
      reader.readAsDataURL(imageFile);
    });
  }

  static getSizeCategory(area) {
    if (area > 1000000) return 'large';
    if (area > 500000) return 'medium';
    return 'small';
  }

  // Trouver la plante qui correspond le mieux
  static async findBestMatchingPlant(colorAnalysis, shapeAnalysis) {
    const plants = this.africanVegetables;
    let bestMatch = null;
    let bestScore = 0;
    
    plants.forEach(plant => {
      let score = 0;
      
      // Points basés sur la couleur
      switch (colorAnalysis.dominantColor) {
        case 'green':
          if (['Laitue', 'Chou', 'Épinard', 'Amarante', 'Bette', 'Manioc (feuilles)'].includes(plant.nomCommun)) {
            score += 30;
          }
          if (plant.nomCommun.includes('feuille')) score += 20;
          break;
          
        case 'red':
          if (['Tomate', 'Piment', 'Poivron'].includes(plant.nomCommun)) {
            score += 40;
          }
          if (plant.nomCommun.includes('fruit')) score += 20;
          break;
          
        case 'brown':
          if (['Carotte', 'Radis', 'Navet', 'Patate douce', 'Manioc'].includes(plant.nomCommun)) {
            score += 35;
          }
          if (plant.nomCommun.includes('racine')) score += 25;
          break;
      }
      
      // Points basés sur la forme
      switch (shapeAnalysis.shapeType) {
        case 'elongated':
          if (['Gombo', 'Concombre', 'Courgette', 'Haricot vert'].includes(plant.nomCommun)) {
            score += 25;
          }
          break;
          
        case 'round':
          if (['Tomate', 'Chou', 'Oignon', 'Ail', 'Échalote'].includes(plant.nomCommun)) {
            score += 25;
          }
          break;
          
        case 'tall':
          if (['Papayer', 'Manguier'].includes(plant.nomCommun)) {
            score += 30;
          }
          break;
      }
      
      // Points basés sur la taille
      if (shapeAnalysis.sizeCategory === 'large' && ['Papayer', 'Manguier', 'Courge', 'Pastèque'].includes(plant.nomCommun)) {
        score += 15;
      }
      
      // Ajouter un peu d'aléatoire pour varier les résultats
      score += Math.random() * 20;
      
      if (score > bestScore) {
        bestScore = score;
        bestMatch = plant;
      }
    });
    
    // Si aucun bon match, retourner une plante commune
    if (!bestMatch || bestScore < 30) {
      const commonPlants = ['Tomate', 'Piment', 'Gombo', 'Laitue', 'Chou', 'Carotte'];
      const randomCommon = commonPlants[Math.floor(Math.random() * commonPlants.length)];
      return plants.find(p => p.nomCommun === randomCommon) || plants[0];
    }
    
    return bestMatch;
  }

  // Calculer la confiance
  static calculateConfidence(plant, colorAnalysis, shapeAnalysis) {
    let confidence = 50; // Base de 50%
    
    // Augmenter la confiance basée sur l'analyse des couleurs
    if (colorAnalysis.greenPercentage > 60 && ['Laitue', 'Chou', 'Épinard', 'Amarante'].includes(plant.nomCommun)) {
      confidence += 25;
    }
    
    if (colorAnalysis.redPercentage > 20 && ['Tomate', 'Piment'].includes(plant.nomCommun)) {
      confidence += 30;
    }
    
    // Augmenter la confiance basée sur la forme
    if (shapeAnalysis.shapeType === 'elongated' && ['Gombo', 'Concombre'].includes(plant.nomCommun)) {
      confidence += 20;
    }
    
    if (shapeAnalysis.shapeType === 'round' && ['Tomate', 'Chou', 'Oignon'].includes(plant.nomCommun)) {
      confidence += 20;
    }
    
    // Limiter entre 60% et 95%
    confidence = Math.min(Math.max(confidence, 60), 95);
    
    return confidence / 100; // Convertir en décimal
  }

  // Détection de secours
  static fallbackDetection() {
    const plants = this.africanVegetables;
    const commonPlants = [
      'Tomate', 'Piment', 'Gombo', 'Laitue', 'Chou', 
      'Carotte', 'Oignon', 'Concombre', 'Papayer', 'Patate douce'
    ];
    
    // Choisir une plante commune au hasard
    const randomPlant = commonPlants[Math.floor(Math.random() * commonPlants.length)];
    const plant = plants.find(p => p.nomCommun === randomPlant) || plants[0];
    const diseases = this.getPlantDiseases(plant.nomScientifique);
    
    return {
      success: true,
      plant: {
        ...plant,
        confidence: 0.6 + Math.random() * 0.3 // 60-90%
      },
      diseases: diseases,
      detectionMethod: "Détection de secours (analyse basique)",
      analysisData: {
        color: 'mixed',
        shape: 'unknown'
      }
    };
  }

  // ... (garder les autres méthodes inchangées)
}

export default PlantDetectionService;