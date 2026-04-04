// src/services/diseaseService.js
class DiseaseService {
  constructor() {
    this.diseasesDatabase = this.createDiseasesDatabase();
  }

  createDiseasesDatabase() {
    return {
      "mildiou": {
        code: "mildiou",
        nom: "Mildiou",
        type: "fongique",
        agent: "Phytophthora infestans (tomate), Peronospora destructor (oignon)",
        description: "Maladie fongique très destructrice qui se développe par temps humide et frais.",
        symptomes: [
          "Taches huileuses puis brunes sur feuilles",
          "Duvet blanc au revers des feuilles",
          "Flétrissement rapide des plants",
          "Pourriture des fruits et tubercules"
        ],
        conditionsFavorables: "Humidité > 90%, températures 10-25°C",
        traitements: [
          {
            nom: "Traitement préventif au cuivre",
            description: "Appliquez de la bouillie bordelaise avant les périodes humides",
            produit: "Bordeaux, oxychlorure de cuivre",
            dosage: "20-30g/10L d'eau",
            frequence: "Tous les 7-10 jours par temps humide"
          },
          {
            nom: "Fongicide systémique",
            description: "En cas d'attaque déclarée, traitement curatif",
            produit: "Mancozèbe, Metalaxyl",
            dosage: "Suivre instructions fabricant",
            frequence: "2 applications à 10 jours d'intervalle"
          }
        ],
        prevention: [
          "Rotation des cultures (3 ans minimum)",
          "Éviter l'arrosage par aspersion",
          "Plants espacés pour une bonne aération",
          "Élimination des débris végétaux",
          "Utilisation de variétés résistantes"
        ],
        images: [
          "https://example.com/mildiou-tomate.jpg",
          "https://example.com/mildiou-pomme-de-terre.jpg"
        ],
        plantesAffectees: ["Solanum lycopersicum", "Allium cepa", "Solanum tuberosum"]
      },
      
      "septoriose": {
        code: "septoriose",
        nom: "Septoriose",
        type: "fongique",
        agent: "Septoria lycopersici",
        description: "Maladie fongique provoquant des taches foliaires circulaires.",
        symptomes: [
          "Taches circulaires brunes de 1-3mm",
          "Centre grisâtre avec points noirs (pycnides)",
          "Jaunissement puis chute des feuilles",
          "Affaiblissement général du plant"
        ],
        conditionsFavorables: "Humidité élevée, températures 15-27°C",
        traitements: [
          {
            nom: "Fongicide à base de soufre",
            description: "Traitement préventif et curatif",
            produit: "Soufre mouillable",
            dosage: "30-40g/10L d'eau",
            frequence: "Tous les 10-15 jours"
          }
        ],
        prevention: [
          "Élimination des feuilles basses",
          "Pas d'irrigation foliaire",
          "Rotation avec non-solanacées",
          "Plants sains certifiés"
        ],
        plantesAffectees: ["Solanum lycopersicum", "Apium graveolens"]
      },
      
      "mosaïque": {
        code: "mosaïque",
        nom: "Virus de la mosaïque",
        type: "viral",
        agent: "Cucumber mosaic virus (CMV), Tobacco mosaic virus (TMV)",
        description: "Virus provoquant un mosaïque de couleurs sur les feuilles.",
        symptomes: [
          "Mosaïque jaune/verte sur feuilles",
          "Déformation et boursouflure des feuilles",
          "Nanisme des plants",
          "Réduction drastique de production"
        ],
        conditionsFavorables: "Présence de pucerons vecteurs, outils contaminés",
        traitements: [],
        prevention: [
          "Utilisation de plants sains certifiés",
          "Lutte contre les pucerons (insecticides, plantes répulsives)",
          "Désinfection des outils entre chaque plant",
          "Élimination immédiate des plants infectés",
          "Variétés résistantes si disponibles"
        ],
        plantesAffectees: ["Capsicum annuum", "Cucumis sativus", "Solanum lycopersicum"]
      },
      
      "oïdium": {
        code: "oïdium",
        nom: "Oïdium",
        type: "fongique",
        agent: "Erysiphe spp., Sphaerotheca spp.",
        description: "Maladie fongique caractérisée par un feutrage blanc poudreux.",
        symptomes: [
          "Feutrage blanc farineux sur feuilles",
          "Feuilles qui se recroquevillent",
          "Jaunissement puis nécrose",
          "Réduction de la photosynthèse"
        ],
        conditionsFavorables: "Nuits fraîches et jours chauds, humidité modérée",
        traitements: [
          {
            nom: "Traitement au soufre",
            description: "Efficace en préventif et curatif précoce",
            produit: "Soufre en poudre ou mouillable",
            dosage: "15-25g/10L d'eau",
            frequence: "Tous les 7-10 jours"
          },
          {
            nom: "Bicarbonate de soude",
            description: "Traitement maison préventif",
            produit: "Bicarbonate de sodium",
            dosage: "5g/L d'eau + 5mL de savon noir",
            frequence: "Tous les 5-7 jours"
          }
        ],
        prevention: [
          "Bon espacement entre plants",
          "Éviter les excès d'azote",
          "Arrosage au pied sans mouiller le feuillage",
          "Variétés résistantes",
          "Suppression des parties atteintes"
        ],
        plantesAffectees: ["Cucumis sativus", "Cucurbita pepo", "Lactuca sativa"]
      },
      
      "alternariose": {
        code: "alternariose",
        nom: "Alternariose",
        type: "fongique",
        agent: "Alternaria spp.",
        description: "Maladie fongique causant des taches foliaires concentriques.",
        symptomes: [
          "Taches brunes avec cercles concentriques",
          "Lésions angulaires limitées par les nervures",
          "Feuilles jaunissent et tombent",
          "Pourriture des racines (carottes)"
        ],
        conditionsFavorables: "Alternance humidité/sécheresse, températures 20-30°C",
        traitements: [
          {
            nom: "Fongicide de contact",
            description: "Traitement préventif efficace",
            produit: "Mancozèbe, Chlorothalonil",
            dosage: "Suivre instructions fabricant",
            frequence: "Tous les 10-14 jours"
          }
        ],
        prevention: [
          "Rotation des cultures (2-3 ans)",
          "Élimination des débris végétaux",
          "Plants sains",
          "Éviter le stress hydrique"
        ],
        plantesAffectees: ["Daucus carota", "Solanum lycopersicum"]
      },
      
      "ringspot": {
        code: "ringspot",
        nom: "Papaya ringspot virus (PRSV)",
        type: "viral",
        agent: "Papaya ringspot virus",
        description: "Virus très destructeur du papayer, transmis par pucerons.",
        symptomes: [
          "Anneaux chlorotiques sur feuilles et fruits",
          "Mosaïque et déformation des jeunes feuilles",
          "Nanisme sévère de l'arbre",
          "Chute prématurée des fruits"
        ],
        conditionsFavorables: "Présence de pucerons vecteurs",
        traitements: [],
        prevention: [
          "Utilisation de variétés transgéniques résistantes (Rainbow, SunUp)",
          "Élimination immédiate des plants infectés",
          "Lutte intensive contre les pucerons",
          "Barrières physiques (filets anti-insectes)",
          "Plants sains issus de culture in vitro"
        ],
        plantesAffectees: ["Carica papaya"]
      }
    };
  }

  // Obtenir les détails d'une maladie
  getDiseaseDetails(diseaseCode) {
    return this.diseasesDatabase[diseaseCode] || null;
  }

  // Obtenir les maladies d'une plante
  getPlantDiseases(plantScientificName) {
    const diseases = [];
    
    for (const [code, disease] of Object.entries(this.diseasesDatabase)) {
      if (disease.plantesAffectees.includes(plantScientificName)) {
        diseases.push({
          code,
          ...disease
        });
      }
    }
    
    return diseases;
  }

  // Diagnostiquer une maladie basée sur les symptômes
  diagnoseFromSymptoms(symptoms, plantScientificName) {
    const plantDiseases = this.getPlantDiseases(plantScientificName);
    const matches = [];
    
    for (const disease of plantDiseases) {
      let matchScore = 0;
      const diseaseSymptoms = disease.symptomes.map(s => s.toLowerCase());
      
      for (const symptom of symptoms) {
        const symptomLower = symptom.toLowerCase();
        for (const diseaseSymptom of diseaseSymptoms) {
          if (diseaseSymptom.includes(symptomLower) || symptomLower.includes(diseaseSymptom)) {
            matchScore++;
          }
        }
      }
      
      if (matchScore > 0) {
        matches.push({
          disease,
          matchScore,
          confidence: Math.min(matchScore / disease.symptomes.length, 0.95)
        });
      }
    }
    
    // Trier par score de correspondance
    matches.sort((a, b) => b.matchScore - a.matchScore);
    
    return matches;
  }

  // Générer un plan de traitement
  generateTreatmentPlan(diseaseCode, severity = 'modérée') {
    const disease = this.getDiseaseDetails(diseaseCode);
    if (!disease) return null;
    
    const plan = {
      maladie: disease.nom,
      agent: disease.agent,
      type: disease.type,
      actions: []
    };
    
    // Actions immédiates
    if (severity === 'élevée') {
      plan.actions.push({
        type: 'urgence',
        description: 'Isoler ou détruire les plants gravement atteints',
        delai: 'immédiat'
      });
    }
    
    // Traitements
    if (disease.traitements && disease.traitements.length > 0) {
      plan.actions.push({
        type: 'traitement',
        traitements: disease.traitements,
        delai: 'dès que possible'
      });
    }
    
    // Prévention
    if (disease.prevention && disease.prevention.length > 0) {
      plan.actions.push({
        type: 'prévention',
        mesures: disease.prevention,
        delai: 'continuel'
      });
    }
    
    // Suivi
    plan.actions.push({
      type: 'suivi',
      description: 'Surveiller l\'évolution pendant 15 jours',
      delai: 'à partir du traitement'
    });
    
    return plan;
  }
}

export default new DiseaseService();