import React, { useState, useEffect } from "react";
import * as mobilenet from "@tensorflow-models/mobilenet";
import "@tensorflow/tfjs";
import { 
  FaSearch, 
  FaEye, 
  FaImage, 
  FaSpinner,
  FaSave,
  FaHistory,
  FaClipboardList
} from "react-icons/fa";
import { useDiagnostic } from "../context/DiagnosticContext";
import "./PlantAnalyzer.css";

const PlantAnalyzer = () => {
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [predictions, setPredictions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [notes, setNotes] = useState("");
  const [showHistory, setShowHistory] = useState(false);

  const { 
    currentDiagnostic, 
    addDiagnostic, 
    diagnosticHistory,
    clearCurrentDiagnostic 
  } = useDiagnostic();

  // Restaurer le dernier diagnostic au chargement
  useEffect(() => {
    if (currentDiagnostic?.imageUrl) {
      setPreview(currentDiagnostic.imageUrl);
      setPredictions(currentDiagnostic.predictions || []);
      setNotes(currentDiagnostic.notes || "");
    }
  }, [currentDiagnostic]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Vérifier la taille (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert("L'image est trop volumineuse (max 5MB)");
      return;
    }

    setImageFile(file);
    setPredictions([]);

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const analyzeImage = async () => {
    if (!preview) {
      alert("Veuillez d'abord sélectionner une image");
      return;
    }

    setLoading(true);
    setPredictions([]);

    try {
      const img = new Image();
      img.src = preview;
      await new Promise((res) => (img.onload = res));

      const model = await mobilenet.load();
      const results = await model.classify(img);

      const filtered = results.filter(r => r.probability > 0.5);
      setPredictions(filtered);

      // Sauvegarder le diagnostic
      const diagnosticData = {
        imageUrl: preview,
        plantType: filtered[0]?.className || "Plante inconnue",
        predictions: filtered,
        diseases: filtered.map(p => ({
          name: p.className,
          confidence: p.probability,
          severity: p.probability > 0.8 ? "high" : "medium",
          type: "detected"
        })),
        notes: notes,
        analyzedAt: new Date().toISOString(),
        confidence: Math.max(...filtered.map(p => p.probability * 100), 0)
      };

      await addDiagnostic(diagnosticData);

      alert("✅ Diagnostic sauvegardé dans votre journal !");

    } catch (err) {
      console.error(err);
      alert("Erreur lors de l'analyse IA");
    } finally {
      setLoading(false);
    }
  };

  const saveCurrentDiagnostic = () => {
    if (!preview) {
      alert("Aucune image à sauvegarder");
      return;
    }

    const diagnosticData = {
      imageUrl: preview,
      plantType: predictions[0]?.className || "Plante inconnue",
      predictions: predictions,
      notes: notes,
      analyzedAt: new Date().toISOString()
    };

    addDiagnostic(diagnosticData);
    alert("✅ Diagnostic sauvegardé !");
  };

  const loadFromHistory = (diagnostic) => {
    setPreview(diagnostic.imageUrl);
    setPredictions(diagnostic.predictions || []);
    setNotes(diagnostic.notes || "");
    setShowHistory(false);
  };

  const clearAnalysis = () => {
    setImageFile(null);
    setPreview(null);
    setPredictions([]);
    setNotes("");
    clearCurrentDiagnostic();
  };

  const openGoogleLens = () => {
    if (preview) {
      // Ouvrir Google Lens avec l'image
      const link = document.createElement('a');
      link.href = preview;
      link.download = `garapix_plant_${Date.now()}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Ouvrir Google Lens après un court délai
      setTimeout(() => {
        window.open("https://lens.google.com", "_blank");
        alert("1. L'image a été téléchargée\n2. Ouvrez Google Lens\n3. Importez l'image téléchargée");
      }, 500);
    } else {
      window.open("https://lens.google.com", "_blank");
    }
  };

  return (
    <div className="plant-analyzer-container">
      <div className="analyzer-header">
        <h2>
          <FaSearch /> Analyse de Plantes
        </h2>
        <div className="header-actions">
          <button 
            className="btn btn-outline btn-sm"
            onClick={() => setShowHistory(!showHistory)}
          >
            <FaHistory /> Historique ({diagnosticHistory.length})
          </button>
        </div>
      </div>

      {/* Historique latéral */}
      {showHistory && (
        <div className="history-sidebar">
          <div className="history-header">
            <h4>Historique des analyses</h4>
            <button 
              className="btn btn-sm btn-outline"
              onClick={() => setShowHistory(false)}
            >
              ✕
            </button>
          </div>
          <div className="history-list">
            {diagnosticHistory.slice(0, 10).map((diagnostic, index) => (
              <div 
                key={index} 
                className="history-item"
                onClick={() => loadFromHistory(diagnostic)}
              >
                <img 
                  src={diagnostic.imageUrl} 
                  alt="Historique"
                  className="history-thumbnail"
                />
                <div className="history-info">
                  <p className="history-plant">
                    {diagnostic.plantType || "Plante inconnue"}
                  </p>
                  <p className="history-date">
                    {new Date(diagnostic.timestamp).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="analyzer-content">
        {/* Section image */}
        <div className="image-section">
          <div className="upload-area">
            {!preview ? (
              <>
                <div className="upload-prompt">
                  <FaImage className="upload-icon" />
                  <p>Cliquez pour sélectionner une image</p>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="file-input"
                    id="image-upload"
                  />
                  <label htmlFor="image-upload" className="btn btn-outline">
                    Parcourir les fichiers
                  </label>
                  <p className="upload-hint">
                    Formats: JPG, PNG, WebP (max 5MB)
                  </p>
                </div>
              </>
            ) : (
              <div className="image-preview-container">
                <img 
                  src={preview} 
                  alt="Prévisualisation" 
                  className="preview-image"
                />
                <div className="preview-actions">
                  <button 
                    className="btn btn-sm btn-outline"
                    onClick={clearAnalysis}
                  >
                    Changer d'image
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Notes */}
        <div className="notes-section">
          <label>Notes complémentaires</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Ajoutez des observations, symptômes, traitements..."
            rows="3"
          />
        </div>

        {/* Boutons d'action */}
        <div className="action-buttons">
          <button
            className="btn btn-primary"
            disabled={!preview || loading}
            onClick={analyzeImage}
          >
            {loading ? (
              <>
                <FaSpinner className="spinner" /> Analyse en cours...
              </>
            ) : (
              "Analyser avec IA"
            )}
          </button>

          <button
            className="btn btn-secondary"
            onClick={saveCurrentDiagnostic}
            disabled={!preview}
          >
            <FaSave /> Sauvegarder
          </button>

          <button
            className="btn btn-outline"
            onClick={openGoogleLens}
          >
            <FaEye /> Ouvrir avec Google Lens
          </button>
        </div>

        {/* Résultats */}
        {predictions.length > 0 && (
          <div className="results-section">
            <div className="results-header">
              <h4>
                <FaClipboardList /> Résultats de l'analyse
              </h4>
              <span className="confidence-badge">
                Confiance: {Math.max(...predictions.map(p => p.probability * 100), 0).toFixed(1)}%
              </span>
            </div>
            
            <div className="results-grid">
              {predictions.map((prediction, index) => (
                <div key={index} className="result-card">
                  <div className="result-header">
                    <h5>{prediction.className}</h5>
                    <span className="confidence">
                      {(prediction.probability * 100).toFixed(1)}%
                    </span>
                  </div>
                  <div className="progress-bar">
                    <div 
                      className="progress-fill"
                      style={{ width: `${prediction.probability * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="diagnostic-actions">
              <button className="btn btn-outline btn-sm">
                Ajouter au journal
              </button>
              <button className="btn btn-outline btn-sm">
                Voir les maladies associées
              </button>
            </div>
          </div>
        )}

        {/* État actuel */}
        {currentDiagnostic && !preview && (
          <div className="current-diagnostic">
            <h4>Dernier diagnostic</h4>
            <div className="current-info">
              <p><strong>Plante:</strong> {currentDiagnostic.plantType}</p>
              <p><strong>Date:</strong> {currentDiagnostic.createdAt}</p>
              <button 
                className="btn btn-sm btn-outline"
                onClick={() => loadFromHistory(currentDiagnostic)}
              >
                Charger cette analyse
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlantAnalyzer;