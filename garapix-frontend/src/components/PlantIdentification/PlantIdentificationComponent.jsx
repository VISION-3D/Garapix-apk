import React, { useState, useRef } from 'react';
import { 
  FaLeaf, 
  FaSpinner, 
  FaSearch, 
  FaCheck, 
  FaTimes, 
  FaExclamationTriangle,
  FaChartLine,
  FaDatabase,
  FaCloud
} from 'react-icons/fa';
import HybridPlantIdentification from '../../services/hybridPlantIdentification';
import './PlantIdentification.css';

const PlantIdentificationComponent = ({ onPlantIdentified, initialImage = null }) => {
  const [image, setImage] = useState(initialImage);
  const [preview, setPreview] = useState(null);
  const [isIdentifying, setIsIdentifying] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  
  const fileInputRef = useRef(null);

  // Charger les statistiques
  const loadStats = () => {
    const stats = HybridPlantIdentification.getServiceStats();
    setStats(stats);
  };

  // Gérer la sélection d'image
  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError('Veuillez sélectionner une image valide');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError('L\'image est trop volumineuse (max 5MB)');
      return;
    }

    setImage(file);
    setError(null);
    setResult(null);

    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target.result);
    reader.readAsDataURL(file);
  };

  // Identifier la plante
  const identifyPlant = async () => {
    if (!image) {
      setError('Veuillez d\'abord sélectionner une image');
      return;
    }

    setIsIdentifying(true);
    setError(null);

    try {
      const result = await HybridPlantIdentification.identifyPlant(image);
      setResult(result);
      
      if (result.success && onPlantIdentified) {
        onPlantIdentified(result);
      }
      
      loadStats();
    } catch (err) {
      setError(`Erreur d'identification: ${err.message}`);
    } finally {
      setIsIdentifying(false);
    }
  };

  // Identifier plusieurs plantes
  const identifyMultiplePlants = async () => {
    if (!image) return;

    setIsIdentifying(true);
    try {
      const result = await HybridPlantIdentification.identifyMultiplePlants(image, 3);
      setResult({ ...result, isMultiple: true });
      loadStats();
    } catch (err) {
      setError(err.message);
    } finally {
      setIsIdentifying(false);
    }
  };

  // Réinitialiser
  const reset = () => {
    setImage(null);
    setPreview(null);
    setResult(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Charger les stats au montage
  React.useEffect(() => {
    loadStats();
  }, []);

  return (
    <div className="plant-identification-container">
      <div className="identification-header">
        <h3>
          <FaLeaf /> Identification de Plante
        </h3>
        <button 
          className="btn btn-outline"
          onClick={loadStats}
          title="Actualiser les statistiques"
        >
          <FaDatabase /> Stats
        </button>
      </div>

      {/* Zone d'upload */}
      <div className="upload-section">
        {!preview ? (
          <div 
            className="upload-zone"
            onClick={() => fileInputRef.current?.click()}
          >
            <div className="upload-icon">
              <FaLeaf />
            </div>
            <p>Cliquez pour sélectionner une photo de plante</p>
            <small>Formats: JPG, PNG, GIF (max 5MB)</small>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageSelect}
              style={{ display: 'none' }}
            />
          </div>
        ) : (
          <div className="image-preview-section">
            <div className="preview-header">
              <h5>Image sélectionnée</h5>
              <button 
                className="btn btn-outline"
                onClick={reset}
              >
                <FaTimes /> Changer
              </button>
            </div>
            <div className="image-preview">
              <img src={preview} alt="Aperçu plante" />
            </div>
          </div>
        )}
      </div>

      {/* Boutons d'action */}
      {preview && !isIdentifying && (
        <div className="action-buttons">
          <button
            className="btn btn-primary"
            onClick={identifyPlant}
            disabled={isIdentifying}
          >
            <FaSearch /> Identifier la plante
          </button>
          <button
            className="btn btn-secondary"
            onClick={identifyMultiplePlants}
            disabled={isIdentifying}
          >
            <FaChartLine /> Identifier plusieurs plantes
          </button>
        </div>
      )}

      {/* En cours d'identification */}
      {isIdentifying && (
        <div className="identifying-overlay">
          <FaSpinner className="spinner" />
          <p>Identification en cours...</p>
          <small>Utilisation de PlantNet API et Google Vision</small>
        </div>
      )}

      {/* Résultats */}
      {result && (
        <div className={`results-section ${result.isMultiple ? 'multiple-results' : ''}`}>
          <div className="results-header">
            <h4>
              {result.success ? <FaCheck className="success-icon" /> : <FaTimes className="error-icon" />}
              Résultats
            </h4>
            <span className="source-badge">
              <FaCloud /> {result.strategy}
            </span>
          </div>

          {result.isMultiple ? (
            <div className="multiple-results">
              <h5>Plantes détectées :</h5>
              <div className="plants-grid">
                {result.plants.map((plant, index) => (
                  <div key={index} className="plant-card">
                    <div className="plant-confidence">
                      {plant.confidence.toFixed(0)}%
                    </div>
                    <h6>{plant.name}</h6>
                    {plant.scientificName && (
                      <p className="scientific-name">{plant.scientificName}</p>
                    )}
                    {plant.family && (
                      <p className="plant-family">Famille: {plant.family}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="single-result">
              <div className="plant-identity">
                <h5>{result.plantName}</h5>
                {result.scientificName && (
                  <p className="scientific-name">{result.scientificName}</p>
                )}
                <div className="confidence-meter">
                  <div 
                    className="confidence-fill"
                    style={{ width: `${result.confidence}%` }}
                  />
                  <span className="confidence-text">
                    Confiance: {result.confidence.toFixed(1)}%
                  </span>
                </div>
              </div>

              {result.isFallback && (
                <div className="fallback-warning">
                  <FaExclamationTriangle />
                  <p>Identification basée sur un modèle local. Pour plus de précision, connectez les API.</p>
                </div>
              )}

              {showDetails && result.data && (
                <div className="details-section">
                  <pre>{JSON.stringify(result.data, null, 2)}</pre>
                </div>
              )}

              <button
                className="btn btn-outline"
                onClick={() => setShowDetails(!showDetails)}
              >
                {showDetails ? 'Masquer les détails' : 'Afficher les détails'}
              </button>
            </div>
          )}
        </div>
      )}

      {/* Erreurs */}
      {error && (
        <div className="error-message">
          <FaTimes /> {error}
        </div>
      )}

      {/* Statistiques d'usage */}
      {stats && (
        <div className="stats-section">
          <h5>
            <FaChartLine /> Statistiques d'usage
          </h5>
          <div className="stats-grid">
            <div className="stat-card">
              <h6>PlantNet API</h6>
              <div className="stat-value">{stats.plantnet.used}/{stats.plantnet.limit}</div>
              <div className="stat-progress">
                <div 
                  className="progress-fill"
                  style={{ width: `${(stats.plantnet.used / stats.plantnet.limit) * 100}%` }}
                />
              </div>
              <small>Requêtes aujourd'hui</small>
            </div>
            <div className="stat-card">
              <h6>Google Vision</h6>
              <div className="stat-value">{stats.googlevision.used}/{stats.googlevision.limit}</div>
              <div className="stat-progress">
                <div 
                  className="progress-fill"
                  style={{ width: `${(stats.googlevision.used / stats.googlevision.limit) * 100}%` }}
                />
              </div>
              <small>Requêtes ce mois</small>
            </div>
            <div className="stat-card">
              <h6>Cache</h6>
              <div className="stat-value">{stats.cacheSize}</div>
              <small>Résultats en cache</small>
            </div>
          </div>
        </div>
      )}

      {/* Instructions */}
      <div className="instructions">
        <h5>Comment obtenir de meilleurs résultats :</h5>
        <ul>
          <li>Photographiez la plante sous une bonne lumière</li>
          <li>Focus sur les feuilles, fleurs ou fruits</li>
          <li>Évitez les photos floues ou sombres</li>
          <li>Pour une précision maximale, connectez vos propres clés API</li>
        </ul>
      </div>
    </div>
  );
};

export default PlantIdentificationComponent;