import React, { useState, useEffect, useRef } from 'react';
import {
  FaSpinner,
  FaSearch,
  FaLeaf,
  FaCamera,
  FaUpload,
  FaDatabase,
  FaShieldAlt,
  FaCheckCircle,
  FaInfoCircle,
  FaArrowRight,
  FaExternalLinkAlt,
  FaTimesCircle,
  FaCloudUploadAlt,
  FaMobileAlt,
  FaSeedling,
  FaTree,
  FaBook,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaTint,
  FaSun,
  FaThermometerHalf,
  FaAppleAlt,
  FaUtensils,
  FaChevronDown,
  FaChevronRight,
  FaGraduationCap
} from 'react-icons/fa';
import PlantService from '../../services/plantService';
import './DiagnosticReal.css';
import {
  Camera,
  Smartphone,
  X,
  Sparkles
} from "lucide-react";

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
const url = `${API_URL}/api/identify/plant`;
const DiagnosticReal = () => {
  // États principaux
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('identification');
  const [expandedSections, setExpandedSections] = useState({});

  // Résultats et données
  const [plantInfo, setPlantInfo] = useState(null);
  const [detectedDiseases, setDetectedDiseases] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [stats, setStats] = useState(null);

  // État de l'analyse
  const [analysisStep, setAnalysisStep] = useState('idle');
  const [cameraActive, setCameraActive] = useState(false);
  const [stream, setStream] = useState(null);
  const [cameraError, setCameraError] = useState(null);
  const [cameraPermission, setCameraPermission] = useState('prompt');

  // Résultats IA
  const [diagnosticIA, setDiagnosticIA] = useState(null);

  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);


  const API_KEY = "2b10bVVlILNw5L7AndKoLh6fge";

async function analysePlante(photoFile) {
  const url = `https://my-api.plantnet.org/v2/identify/all?api-key=${API_KEY}`;

  const formData = new FormData();
  formData.append("images", photoFile);

  const response = await fetch(url, {
    method: "POST",
    body: formData
  });

  const data = await response.json();
  console.log(data);

  return data;
}

  // Charger les statistiques au démarrage
  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = () => {
    const statsData = PlantService.getStats();
    setStats(statsData);
  };

  // Nettoyage de la caméra à la destruction du composant
  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [stream]);

  // Gestionnaire pour le chargement de la vidéo
  useEffect(() => {
    if (!cameraActive || !videoRef.current || !stream) return;

    const videoElement = videoRef.current;
    
    videoElement.srcObject = stream;
    videoElement.load();
    
    videoElement.onloadedmetadata = () => {
      videoElement.play()
        .then(() => {
          console.log('✅ Vidéo en cours de lecture');
          setCameraError(null);
        })
        .catch(err => {
          console.error('❌ Erreur lecture vidéo:', err);
          setCameraError('Impossible de lancer la vidéo. Vérifiez les permissions.');
        });
    };

    videoElement.onerror = () => {
      setCameraError('Erreur lors du chargement de la vidéo');
    };

    return () => {
      videoElement.onloadedmetadata = null;
      videoElement.onerror = null;
    };
  }, [cameraActive, stream]);

  // ================= CAMÉRA =================
  const initializeCamera = async () => {
    setCameraError(null);
    
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        setCameraError('Votre navigateur ne supporte pas l\'accès à la caméra.');
        return;
      }

      // Vérifier l'état des permissions
      if (navigator.permissions && navigator.permissions.query) {
        try {
          const permissionStatus = await navigator.permissions.query({ name: 'camera' });
          setCameraPermission(permissionStatus.state);
          
          permissionStatus.onchange = () => {
            setCameraPermission(permissionStatus.state);
          };
        } catch (err) {
          console.log('API permissions non supportée pour la caméra');
        }
      }

      // Arrêter tout stream existant
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
        setStream(null);
      }

      // Essayer d'abord avec caméra arrière
      let mediaStream;
      try {
        mediaStream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: { ideal: 'environment' },
            width: { ideal: 1280 },
            height: { ideal: 720 }
          }
        });
      } catch (err) {
        console.log('Caméra arrière non disponible, essai avec caméra par défaut');
        mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
      }

      setStream(mediaStream);
      setCameraActive(true);
      setCameraPermission('granted');
      setCameraError(null);
      
    } catch (error) {
      console.error('Erreur caméra détaillée:', error);
      setCameraActive(false);
      
      if (error.name === 'NotAllowedError' || error.name === 'PermissionDeniedError') {
        setCameraError('Permission caméra refusée. Veuillez autoriser l\'accès dans les paramètres de votre navigateur.');
        setCameraPermission('denied');
      } else if (error.name === 'NotFoundError' || error.name === 'DevicesNotFoundError') {
        setCameraError('Aucune caméra trouvée sur cet appareil.');
      } else if (error.name === 'NotReadableError' || error.name === 'TrackStartError') {
        setCameraError('La caméra est déjà utilisée par une autre application.');
      } else if (error.name === 'OverconstrainedError') {
        setCameraError('Configuration caméra non supportée. Essayez avec une autre application.');
      } else {
        setCameraError(`Erreur: ${error.message || 'Cause inconnue'}`);
      }
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    setCameraActive(false);
    setCameraError(null);
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  };

  const capturePhoto = () => {
    if (!cameraActive || !videoRef.current || !videoRef.current.videoWidth) {
      setCameraError('La caméra n\'est pas prête. Attendez un instant puis réessayez.');
      return;
    }
    
    const canvas = canvasRef.current;
    const video = videoRef.current;
    
    if (canvas && video) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      
      canvas.toBlob((blob) => {
        const file = new File([blob], 'capture.jpg', { type: 'image/jpeg' });
        processImageFile(file);
        stopCamera();
      }, 'image/jpeg', 0.9);
    }
  };

  // ================= GESTION FICHIERS =================
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    processImageFile(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.match('image.*')) {
      processImageFile(file);
    }
  };

  const processImageFile = (file) => {
    if (!file.type.match('image.*')) {
      alert('Veuillez sélectionner une image valide');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      alert('L\'image est trop volumineuse (max 5MB)');
      return;
    }
    setImageFile(file);
    setPlantInfo(null);
    setDetectedDiseases([]);
    setSearchResults([]);
    setDiagnosticIA(null);
    setAnalysisStep('ready');
    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result);
    reader.readAsDataURL(file);
  };

  // Recherche de plantes
  const handleSearch = (query) => {
    console.log('handleSearch appelé avec :', query);
    setSearchQuery(query);
    if (query.length >= 2) {
      const results = PlantService.searchPlant(query);
      console.log('Résultats recherche :', results);
      setSearchResults(results.slice(0, 5));
    } else {
      setSearchResults([]);
    }
  };

  const selectPlant = (plant) => {
    console.log('selectPlant appelé avec :', plant.nomCommun);
    setPlantInfo(plant);
    setDetectedDiseases(plant.maladies || []);
    setSearchResults([]);
    setSearchQuery(plant.nomCommun);
    setAnalysisStep('plant-identified');
    setActiveTab('details');
  };

  // Fonction de normalisation pour comparer les noms scientifiques
  const normalizeString = (str) => {
    if (!str) return '';
    return str
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '');
  };

  // Analyse IA
  const analyzeWithIA = async () => {
    if (!preview) {
      alert('Veuillez d\'abord sélectionner une image');
      return;
    }
    setLoading(true);
    setDiagnosticIA(null);

    try {
      const base64Image = preview.split(',')[1];

      let identifyData = null;
      try {
    
const identifyRes = await fetch('https://garapix-apk.onrender.com/api/identify/plant', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ imageBase64: base64Image })
});
        if (!identifyRes.ok) {
          throw new Error(`Erreur PlantNet (${identifyRes.status})`);
        }

        identifyData = await identifyRes.json();
        console.log('📊 Réponse PlantNet :', identifyData);

        if (identifyData.fallback) {
          console.log('⚠️ Réponse simulée du backend (PlantNet indisponible)');
          setDiagnosticIA({
            plantNet: { species: 'Service indisponible', confidence: 'N/A' },
            plantDoc: null,
            matchedPlant: null
          });
          setLoading(false);
          return;
        }

      } catch (error) {
        console.warn('⚠️ Service indisponible en ligne :', error.message);
        setDiagnosticIA({
          plantNet: { species: 'Service indisponible', confidence: 'N/A' },
          plantDoc: null,
          matchedPlant: null
        });
        setLoading(false);
        return;
      }

      let plantName = 'Inconnue';
      let confidence = 'N/A';
      let matchedPlant = null;

      if (identifyData.results && identifyData.results.length > 0) {
        const scientificName = identifyData.results[0].species?.scientificName || '';
        confidence = identifyData.results[0].score || 'N/A';

        console.log('🔬 Nom scientifique reçu :', scientificName);

        const searchResults = PlantService.searchPlant(scientificName);
        console.log('🔍 Résultats de searchPlant :', searchResults.map(p => p.nomCommun));

        if (searchResults.length > 0) {
          matchedPlant = searchResults[0];
          plantName = matchedPlant.nomCommun;
          console.log('✅ Plante trouvée via searchPlant :', plantName);
        } else {
          console.log('Recherche par normalisation...');
          const normalizedScientific = normalizeString(scientificName);
          const allPlants = PlantService.getAllPlants();
          matchedPlant = allPlants.find(p => {
            if (!p.nomScientifique) return false;
            const normalizedPlant = normalizeString(p.nomScientifique);
            return normalizedPlant.includes(normalizedScientific) || normalizedScientific.includes(normalizedPlant);
          });
          if (matchedPlant) {
            plantName = matchedPlant.nomCommun;
            console.log('✅ Plante trouvée par normalisation :', plantName);
          } else {
            plantName = scientificName;
            console.log('❌ Aucune correspondance, nom scientifique utilisé :', plantName);
          }
        }
      }

      const token = localStorage.getItem('token');
      let plantDocResult = null;
      if (token && matchedPlant) {
        try {
          const diagnoseRes = await fetch('http://localhost:5000/api/diagnose/plant', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ imageBase64: base64Image, plantName: matchedPlant.nomCommun })
          });
          if (diagnoseRes.ok) {
            const diagnoseData = await diagnoseRes.json();
            plantDocResult = diagnoseData.matchedDisease || diagnoseData.plantDocPrediction;
          }
        } catch (e) {
          console.warn('Erreur PlantDoc:', e);
        }
      }

      setDiagnosticIA({
        plantNet: { species: plantName, confidence },
        plantDoc: plantDocResult,
        matchedPlant: matchedPlant
      });

      if (!matchedPlant) {
        alert('Aucune correspondance exacte trouvée. Vous pouvez lancer une recherche manuelle.');
      }

    } catch (error) {
      console.error('💥 Erreur analyse IA :', error);
      alert(`Erreur lors de l'analyse IA : ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Basculer les sections dépliables
  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // Réinitialiser l'analyse
  const resetAnalysis = () => {
    setImageFile(null);
    setPreview(null);
    setPlantInfo(null);
    setDetectedDiseases([]);
    setSearchResults([]);
    setSearchQuery('');
    setDiagnosticIA(null);
    setAnalysisStep('idle');
    stopCamera();
  };

  const renderExpandableSection = (title, icon, content, sectionKey) => {
    const isExpanded = expandedSections[sectionKey];
    return (
      <div className="expandable-section">
        <div className="section-header" onClick={() => toggleSection(sectionKey)}>
          <div className="header-content">
            {icon}
            <h4>{title}</h4>
          </div>
          {isExpanded ? <FaChevronDown /> : <FaChevronRight />}
        </div>
        {isExpanded && <div className="section-content">{content}</div>}
      </div>
    );
  };

  return (
    <div className="diagnostic-real">
      {/* En-tête */}
      <div className="real-stats-header modern-header">
        <h1 className="dashboard-title">
          Base de données botanique intelligente
        </h1>
        {stats && (
          <div className="stats-grid modern-stats">
            {/* Stats ici si besoin */}
          </div>
        )}
      </div>

      <div className="diagnostic-main modern-diagnostic">
        <div className="control-panel">
          <div className="upload-section glass-card">
            <div className="section-header modern-header">
              <h2>
                <Sparkles size={22} className="glow-green" />
                Identification intelligente
              </h2>
            </div>

            {!preview ? (
              <div className="upload-options">
                {/* Option caméra */}
                <div className="camera-option modern-card">
                  <h4>
                    <Smartphone size={18} />
                    Capture en temps réel
                  </h4>

                  {cameraError && (
                    <div className="camera-error-message">
                      <p>❌ {cameraError}</p>
                      {cameraPermission === 'denied' && (
                        <p className="camera-error-help">
                          Pour réinitialiser la permission, allez dans les paramètres de votre navigateur,
                          section "Confidentialité et sécurité" , "Paramètres de site" , "Caméra",
                          puis autorisez ce site.
                        </p>
                      )}
                    </div>
                  )}

                  {!cameraActive ? (
                    <button 
                      className="btn-modern-primary" 
                      onClick={initializeCamera}
                      disabled={cameraPermission === 'denied' && !cameraError}
                    >
                      <Camera size={18} />
                      {cameraPermission === 'denied' ? 'Permission refusée' : 'Activer la caméra'}
                    </button>
                  ) : (
                    <div className="camera-active">
                      <video
                        ref={videoRef}
                        className="camera-preview modern-preview"
                        autoPlay
                        playsInline
                        muted
                      />
                      <canvas ref={canvasRef} style={{ display: 'none' }} />
                      <div className="camera-controls">
                        <button
                          className="btn-modern-primary"
                          onClick={capturePhoto}
                          disabled={!stream}
                        >
                          <Camera size={18} />
                          Capturer
                        </button>
                        <button
                          className="btn-modern-outline"
                          onClick={stopCamera}
                        >
                          <X size={18} />
                          Annuler
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Option upload */}
                <div className="upload-option">
                  <h4><FaUpload /> Importer une image</h4>
                  <div
                    className="upload-zone"
                    onDrop={handleDrop}
                    onDragOver={(e) => e.preventDefault()}
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <FaCloudUploadAlt className="upload-icon" />
                    <p>Glissez-déposez une image de plante</p>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="file-input"
                      style={{ display: 'none' }}
                    />
                    <button className="btn btn-outline">
                      <FaUpload /> Parcourir les fichiers
                    </button>
                    <p className="upload-hint">
                      Formats supportés: JPG, PNG, WebP (max 5MB)
                    </p>
                  </div>
                </div>

                {/* Recherche manuelle */}
                <div className="manual-search-option">
                  <h4><FaSearch /> Rechercher une plante</h4>
                  <div className="search-container">
                    <input
                      type="text"
                      className="search-input"
                      placeholder="Rechercher par nom (ex: Papayer, Tomate...)"
                      value={searchQuery}
                      onChange={(e) => handleSearch(e.target.value)}
                    />
                    {searchResults.length > 0 && (
                      <div className="search-results">
                        {searchResults.map((plant) => (
                          <div
                            key={plant.id}
                            className="search-result-item"
                            onClick={() => selectPlant(plant)}
                          >
                            <FaSeedling className="result-icon" />
                            <div className="result-info">
                              <strong>{plant.nomCommun}</strong>
                              <small>{plant.nomScientifique}</small>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="image-preview-container">
                <div className="preview-header">
                  <h3>Image sélectionnée</h3>
                  <button className="btn btn-sm btn-outline" onClick={resetAnalysis}>
                    <FaTimesCircle /> Changer
                  </button>
                </div>
                <img src={preview} alt="Prévisualisation" className="preview-image" />
                <div className="preview-info">
                  <p><strong>Prêt pour l'identification</strong></p>
                  <p className="file-info">
                    {imageFile?.name} - {Math.round(imageFile?.size / 1024)} KB
                  </p>
                </div>

                <div className="analysis-options">
                  <button className="btn btn-success btn-large" onClick={analyzeWithIA} disabled={loading}>
                    {loading ? <FaSpinner /> : <FaLeaf />} ANALYSER
                  </button>
                  {diagnosticIA && diagnosticIA.plantNet && diagnosticIA.plantNet.species !== 'Service indisponible' && (
                    <button
                      className="btn btn-primary btn-large"
                      onClick={() => {
                        console.log('🔍 Bouton Rechercher dans la base cliqué');
                        if (diagnosticIA.matchedPlant) {
                          console.log('Plante correspondante trouvée, appel de selectPlant');
                          selectPlant(diagnosticIA.matchedPlant);
                        } else {
                          console.log('Aucune plante correspondante, recherche manuelle avec :', diagnosticIA.plantNet.species);
                          setSearchQuery(diagnosticIA.plantNet.species);
                          handleSearch(diagnosticIA.plantNet.species);
                        }
                      }}
                    >
                      <FaDatabase /> {diagnosticIA.matchedPlant ? 'Afficher les détails' : 'Rechercher dans la base'}
                    </button>
                  )}
                </div>

                {/* Résultats IA */}
                {diagnosticIA && (
                  <div className="ia-results">
                    <h2>Résultats de l'analyse</h2>
                    {diagnosticIA.plantNet && (
                      <div className="result-section">
                        {diagnosticIA.plantNet.species === 'Service indisponible' ? (
                          <>
                            <p><b>⚠️ Service en ligne indisponible</b></p>
                            <p>Veuillez utiliser la recherche manuelle ci-dessous.</p>
                          </>
                        ) : (
                          <>
                            <h4>Identification de l'espèce</h4>
                            <p><strong>Espèce identifiée :</strong> {diagnosticIA.plantNet.species}</p>
                            <p><strong>Niveau de confiance :</strong> {diagnosticIA.plantNet.confidence}</p>
                          </>
                        )}
                      </div>
                    )}
                    {diagnosticIA.plantDoc && (
                      <div className="result-section">
                        <h5>Analyse phytosanitaire</h5>
                        <p>
                          <strong>Pathologie détectée :</strong>{" "}
                          {diagnosticIA.plantDoc.disease || diagnosticIA.plantDoc.nom}
                        </p>
                        <p>
                          <strong>Recommandation de traitement :</strong>{" "}
                          {diagnosticIA.plantDoc.treatment || diagnosticIA.plantDoc.traitement}
                        </p>
                      </div>
                    )}
                  </div>
                )}

                <div className="search-after-upload">
                  <h3>Rechercher la plante manuellement</h3>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Nom de la plante (ex: Papayer, Tomate...)"
                    value={searchQuery}
                    onChange={(e) => handleSearch(e.target.value)}
                  />
                  {searchResults.length > 0 && (
                    <div className="quick-results">
                      {searchResults.map((plant) => (
                        <div
                          key={plant.id}
                          className="quick-result"
                          onClick={() => selectPlant(plant)}
                        >
                          <FaLeaf />
                          <span>{plant.nomCommun}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Guide d'utilisation */}
          <div className="guide-card">
            <h3><FaInfoCircle /> Comment identifier une plante</h3>
            <ol className="guide-steps">
              <li><strong>Prenez une photo</strong> – Utilisez la caméra ou importez une image existante</li>
              <li><strong>Analysez</strong> – Obtenez le nom de l'espèce</li>
              <li><strong>Recherchez dans notre base</strong> – Cliquez sur le bouton pour accéder aux détails</li>
            </ol>
          </div>
        </div>

        {/* Section droite - Résultats */}
        <div className="results-panel">
          <div className="results-header">
            <div className="tabs">
              <button
                className={`tab ${activeTab === 'identification' ? 'active' : ''}`}
                onClick={() => setActiveTab('identification')}
              ><FaSearch /> Identification</button>
              <button
                className={`tab ${activeTab === 'details' ? 'active' : ''}`}
                onClick={() => setActiveTab('details')}
                disabled={!plantInfo}
              ><FaLeaf /> Détails</button>
              <button
                className={`tab ${activeTab === 'diseases' ? 'active' : ''}`}
                onClick={() => setActiveTab('diseases')}
                disabled={!plantInfo}
              ><FaShieldAlt /> Maladies</button>
              <button
                className={`tab ${activeTab === 'culture' ? 'active' : ''}`}
                onClick={() => setActiveTab('culture')}
                disabled={!plantInfo}
              ><FaSeedling /> Culture</button>
            </div>
          </div>

          <div className="results-content">
            {!plantInfo ? (
              <div className="welcome-message">
                <h3 className="animated-text">Bienvenue dans Garapix</h3>
                <p className="animated-text-delay">
                  Identifiez vos plantes et accédez à une base de données complète 
                  sur leurs caractéristiques, culture, maladies et traitements.
                </p>
                <div className="feature-list">
                  <div className="feature">
                    <FaCamera className="feature-icon" />
                    <div><h5>Capture d'images</h5><p>Prenez des photos ou importez depuis votre appareil</p></div>
                  </div>
                  <div className="feature">
                    <FaDatabase className="feature-icon" />
                    <div><h5>Base de données exhaustive</h5><p>16 plantes détaillées avec toutes les informations</p></div>
                  </div>
                  <div className="feature">
                    <FaShieldAlt className="feature-icon" />
                    <div><h5>Diagnostic des maladies</h5><p>Identification et traitement des maladies courantes</p></div>
                  </div>
                  <div className="feature">
                    <FaGraduationCap className="feature-icon" />
                    <div><h5>Conseils de culture</h5><p>Instructions détaillées pour chaque plante</p></div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="plant-summary">
                <div className="summary-header">
                  <div className="plant-basic-info">
                    <h3>{plantInfo.nomCommun}</h3>
                    <p className="scientific-name">{plantInfo.nomScientifique}</p>
                    <div className="plant-tags">
                      <span className="tag family">{plantInfo.famille}</span>
                      <span className="tag origin">{plantInfo.origine}</span>
                      <span className="tag season">{plantInfo.saison}</span>
                      <span className="tag cycle">{plantInfo.cycle}</span>
                    </div>
                  </div>
                </div>
                <div className="summary-description">
                  <p>{plantInfo.description}</p>
                </div>
                <div className="summary-images">
                  {plantInfo.images?.slice(0, 2).map((img, idx) => (
                    <div key={idx} className="plant-image"><img src={img} alt={plantInfo.nomCommun} /></div>
                  ))}
                </div>
                <button className="btn btn-primary" onClick={() => setActiveTab('details')}>
                  <FaArrowRight /> Voir tous les détails
                </button>
              </div>
            )}

            {activeTab === 'details' && plantInfo && (
              <div className="details-tab">
                {/* Contenu détaillé – identique à avant */}
                <div className="plant-header">
                  <div className="plant-title">
                    <h2>{plantInfo.nomCommun}</h2>
                    <p className="subtitle">{plantInfo.nomScientifique}</p>
                  </div>
                  <div className="plant-meta">
                    <div className="meta-item"><FaTree /><div><strong>Famille</strong><p>{plantInfo.famille}</p></div></div>
                    <div className="meta-item"><FaMapMarkerAlt /><div><strong>Origine</strong><p>{plantInfo.origine}</p></div></div>
                    <div className="meta-item"><FaCalendarAlt /><div><strong>Saison</strong><p>{plantInfo.saison}</p></div></div>
                    <div className="meta-item"><FaSeedling /><div><strong>Cycle</strong><p>{plantInfo.cycle}</p></div></div>
                  </div>
                </div>

                {renderExpandableSection(
                 "Caractéristiques",
                  <FaTree />,
                  <div className="characteristics-grid">
                    <div className="char-item"><strong>Hauteur:</strong> <span>{plantInfo.caracteristiques?.hauteur}</span></div>
                    <div className="char-item"><strong>Port:</strong> <span>{plantInfo.caracteristiques?.port}</span></div>
                    <div className="char-item"><strong>Feuilles:</strong> <span>{plantInfo.caracteristiques?.feuilles}</span></div>
                    <div className="char-item"><strong>Fleurs:</strong> <span>{plantInfo.caracteristiques?.fleurs}</span></div>
                    <div className="char-item"><strong>Fruits:</strong> <span>{plantInfo.caracteristiques?.fruits}</span></div>
                    <div className="char-item"><strong>Croissance:</strong> <span>{plantInfo.caracteristiques?.croissance}</span></div>
                    <div className="char-item"><strong>Longévité:</strong> <span>{plantInfo.caracteristiques?.longevite}</span></div>
                  </div>,
                  "characteristics"
                )}

               
                  "resources"
                
              </div>
            )}

            {activeTab === "diseases" && plantInfo && (
              <div className="diseases-tab">
                <div className="diseases-header">
                  <h3>Maladies du {plantInfo.nomCommun}</h3>
                  <div className="diseases-count">{detectedDiseases.length} maladie(s) référencée(s)</div>
                </div>
                {detectedDiseases.length > 0 ? (
                  <div className="diseases-grid">
                    {detectedDiseases.map((disease, idx) => (
                      <div key={idx} className="disease-card">
                        {disease.image && (
                          <div className="disease-image-container">
                            <img 
                              src={disease.image} 
                              alt={disease.nom} 
                              className="disease-image"
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = '/images/default-disease.jpg';
                              }}
                            />
                          </div>
                        )}
                        <div className="disease-header">
                          <h4>{disease.nom}</h4>
                          <span className={`severity-badge ${disease.severity || 'medium'}`}>
                            {disease.severity === 'high' ? 'URGENT' : 'ATTENTION'}
                          </span>
                        </div>
                        <div className="disease-content">
                          <div className="disease-section"><strong>Symptômes :</strong> <p>{disease.symptoms}</p></div>
                          <div className="disease-section"><strong>Traitement :</strong> <p>{disease.traitement}</p></div>
                          <div className="disease-section"><strong>Prévention :</strong> <p>{disease.prevention}</p></div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="no-diseases">
                    <FaCheckCircle className="healthy-icon" />
                    <h4>Aucune maladie répertoriée</h4>
                    <p>Le {plantInfo.nomCommun} est généralement résistant aux maladies.</p>
                  </div>
                )}
                {plantInfo.traitements && plantInfo.traitements.length > 0 && (
                  <div className="general-treatments">
                    <h4>Traitements généraux recommandés</h4>
                  </div>
                )}
              </div>
            )}

            {activeTab === "culture" && plantInfo && plantInfo.culture && (
              <div className="culture-tab">
                <h3>Guide de Culture du {plantInfo.nomCommun}</h3>
                <div className="culture-sections">
                  <div className="culture-section">
                    <h4><FaThermometerHalf /> Conditions de culture</h4>
                    <div className="conditions-grid">
                      <div className="condition-item"><FaThermometerHalf /><div><strong>Climat:</strong><p>{plantInfo.culture.climat}</p></div></div>
                      <div className="condition-item"><FaTint /><div><strong>Besoin en eau:</strong><p>{plantInfo.culture.besoinEau}</p></div></div>
                      <div className="condition-item"><FaSun /><div><strong>Exposition:</strong><p>{plantInfo.culture.exposition}</p></div></div>
                    </div>
                  </div>
                  {plantInfo.culture.sol && (
                    <div className="culture-section">
                      <h4><FaSeedling /> Sol</h4>
                      <div className="soil-info">
                        <div className="soil-item"><strong>Type:</strong><p>{plantInfo.culture.sol.type}</p></div>
                        <div className="soil-item"><strong>pH:</strong><p>{plantInfo.culture.sol.pH}</p></div>
                        <div className="soil-item"><strong>Amendement:</strong><p>{plantInfo.culture.sol.amendement}</p></div>
                      </div>
                    </div>
                  )}
                  {plantInfo.culture.plantation && (
                    <div className="culture-section">
                      <h4><FaCalendarAlt /> Plantation</h4>
                      <div className="planting-info">
                        <div className="planting-item"><strong>Période:</strong><p>{plantInfo.culture.plantation.periode}</p></div>
                        <div className="planting-item"><strong>Espacement:</strong><p>{plantInfo.culture.plantation.espacement}</p></div>
                        <div className="planting-item"><strong>Profondeur:</strong><p>{plantInfo.culture.plantation.profondeur}</p></div>
                      </div>
                    </div>
                  )}
                  {plantInfo.culture.entretien && (
                    <div className="culture-section">
                      <h4><FaLeaf /> Entretien</h4>
                      <ul className="maintenance-list">{plantInfo.culture.entretien.map((e,i) => <li key={i}>{e}</li>)}</ul>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiagnosticReal;