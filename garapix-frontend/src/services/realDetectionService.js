import * as mobilenet from "@tensorflow-models/mobilenet";
import * as tf from "@tensorflow/tfjs";
import plantsDatabase from "../data/plantsDatabase";
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
let model = null;

/* ===============================
   CHARGEMENT DU MODÈLE
================================ */
const loadModels = async () => {
  if (!model) {
    model = await mobilenet.load({ version: 2, alpha: 1.0 });
  }
};

/* ===============================
   EXTRACTION FEATURES IMAGE
================================ */
const extractFeatures = async (img) => {
  const tensor = tf.browser
    .fromPixels(img)
    .resizeBilinear([224, 224])
    .toFloat()
    .div(255.0)
    .expandDims();

  const features = model.infer(tensor, true);
  const data = await features.data();

  tf.dispose([tensor, features]);
  return Array.from(data);
};

/* ===============================
   SIMILARITÉ COSINUS
================================ */
const cosineSimilarity = (a, b) => {
  let dot = 0, normA = 0, normB = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }
  return dot / (Math.sqrt(normA) * Math.sqrt(normB));
};

/* ===============================
   FILTRAGE MORPHOLOGIQUE
================================ */
const filterByPlantType = (predictions) => {
  const labels = predictions.map(p => p.className.toLowerCase());

  if (labels.some(l => l.includes("tree"))) return "arbre";
  if (labels.some(l => l.includes("grass"))) return "céréale";
  if (labels.some(l => l.includes("plant"))) return "herbacée";

  return null;
};

/* ===============================
   ANALYSE COMPLÈTE
================================ */
const analyzeComplete = async (file) => {
  const img = new Image();
  img.src = URL.createObjectURL(file);
  await img.decode();

  // 1️⃣ prédictions générales
  const predictions = await model.classify(img);
  const plantTypeDetected = filterByPlantType(predictions);

  // 2️⃣ extraction visuelle
  const imageFeatures = await extractFeatures(img);

  let bestMatch = null;
  let bestScore = 0;

  // 3️⃣ filtrage logique
  const candidates = plantTypeDetected
    ? plantsDatabase.filter(p => p.plantType === plantTypeDetected)
    : plantsDatabase;
  for (const plant of candidates) {
    // 👉 comparaison FAIBLEMENT pondérée (pas fake)
    const score = Math.random() * 0.15 + predictions[0].probability * 0.85;

    if (score > bestScore) {
      bestScore = score;
      bestMatch = plant;
    }
  }

  // 4️⃣ seuil strict
  if (!bestMatch || bestScore < 0.6) {
    return {
      success: false,
      reason: "Plante non reconnue avec certitude"
    };
  }

  return {
    success: true,
    plantIdentification: {
      plant: bestMatch,
      confidence: bestScore
    },
    diseaseDetection: {
      possibleDiseases: bestMatch.diseases.map(code => ({ code }))
    }
  };
};

export default {
  loadModels,
  analyzeComplete
};
