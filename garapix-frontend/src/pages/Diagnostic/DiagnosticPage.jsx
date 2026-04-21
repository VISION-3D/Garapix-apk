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
import { useCamera } from '../hooks/useCamera';

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

  // Résultats IA
  const [diagnosticIA, setDiagnosticIA] = useState(null);
  const [cameraError, setCameraError] = useState(null);

  const fileInputRef = useRef(null);

  // Hook caméra Capacitor
  const { takePhoto } = useCamera();

  // Charger les statistiques au démarrage
  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = () => {
    const statsData = PlantService.getStats();
    setStats(statsData);
  };

  // ================= GESTION PHOTO (Capacitor) =================
  const handleTakePhoto = async () => {
  try {
    setCameraError(null);
    const image = await takePhoto();
    
    console.log('Image retournée:', image);
    
    let file;
    
    // Gérer les différents formats retournés par Capacitor
    if (image.base64String) {
      // Convertir Base64 en Blob
      const byteCharacters = atob(image.base64String);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: 'image/jpeg' });
      file = new File([blob], 'photo.jpg', { type: 'image/jpeg' });
      console.log('Fichier créé depuis base64, taille:', file.size);
    } 
    else if (image.dataUrl) {
      // Convertir DataUrl en Blob
      const response = await fetch(image.dataUrl);
      const blob = await response.blob();
      file = new File([blob], 'photo.jpg', { type: 'image/jpeg' });
      console.log('Fichier créé depuis dataUrl, taille:', file.size);
    }
    else if (image.webPath) {
      // Convertir webPath en Blob
      const response = await fetch(image.webPath);
      const blob = await response.blob();
      file = new File([blob], 'photo.jpg', { type: 'image/jpeg' });
      console.log('Fichier créé depuis webPath, taille:', file.size);
    }
    else {
      throw new Error('Format d\'image non supporté');
    }
    
    if (file.size < 1000) {
      throw new Error('L\'image est trop petite, réessayez');
    }
    
    processImageFile(file);
    
  } catch (error) {
    console.error('Erreur caméra détaillée:', error);
    setCameraError(error.message || 'Impossible d\'accéder à la caméra');
    alert('Erreur: ' + error.message);
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
                {/* Option caméra - Version Capacitor */}
                <div className="camera-option modern-card">
                  <h4>
                    <Smartphone size={18} />
                    Capture en temps réel
                  </h4>

                  {cameraError && (
                    <div className="camera-error-message">
                      <p>❌ {cameraError}</p>
                    </div>
                  )}

                  <button 
                    className="btn-modern-primary" 
                    onClick={handleTakePhoto}
                  >
                    <Camera size={18} />
                    Prendre une photo
                  </button>
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
      
      <h3 className="animated-text">Bienvenue sur Garapix</h3>
      <p className="animated-text-delay">
        La solution intelligente pour identifier vos plantes et diagnostiquer leurs maladies en quelques secondes
      </p>
      <div className="feature-list">
        <div className="feature">
          <FaCamera className="feature-icon" />
          <div>
            <h5>📸 Scan intelligent</h5>
            <p>Prenez une photo et laissez notre IA identifier instantanément votre plante</p>
          </div>
        </div>
        <div className="feature">
          <FaDatabase className="feature-icon" />
          <div>
            <h5>🌿 Encyclopédie vivante</h5>
            <p>Plus de 25 espèces documentées avec fiches détaillées et mises à jour</p>
          </div>
        </div>
        <div className="feature">
          <FaShieldAlt className="feature-icon" />
          <div>
            <h5>🩺 Diagnostic précis</h5>
            <p>Détectez plus de 90 pathologies et obtenez des traitements adaptés</p>
          </div>
        </div>
        <div className="feature">
          <FaGraduationCap className="feature-icon" />
          <div>
            <h5>🌱 Guide cultural</h5>
            <p>Conseils experts pour cultiver et entretenir vos plantes comme un professionnel</p>
          </div>
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

                {plantInfo.valeurNutritionnelle && renderExpandableSection(
                  "Valeur Nutritionnelle",
                  <FaAppleAlt />,
                  <div className="nutrition-grid">
                    <div className="nutri-item"><strong>Calories:</strong> <span>{plantInfo.valeurNutritionnelle.calories}</span></div>
                    {plantInfo.valeurNutritionnelle.vitamines && <div className="nutri-item"><strong>Vitamines:</strong> <span>{plantInfo.valeurNutritionnelle.vitamines}</span></div>}
                    {plantInfo.valeurNutritionnelle.mineraux && <div className="nutri-item"><strong>Minéraux:</strong> <span>{plantInfo.valeurNutritionnelle.mineraux}</span></div>}
                    {plantInfo.valeurNutritionnelle.fibres && <div className="nutri-item"><strong>Fibres:</strong> <span>{plantInfo.valeurNutritionnelle.fibres}</span></div>}
                  </div>,
                  "nutrition"
                )}

                {plantInfo.utilisations && renderExpandableSection(
                  "Utilisations",
                  <FaUtensils />,
                  <ul className="uses-list">{plantInfo.utilisations.map((u,i) => <li key={i}>{u}</li>)}</ul>,
                  "uses"
                )}

                {plantInfo.recolte && renderExpandableSection(
                  "Récolte",
                  <FaCalendarAlt />,
                  <div className="harvest-info">
                    <div className="harvest-item"><strong>Période:</strong> <span>{plantInfo.recolte.periode}</span></div>
                    <div className="harvest-item"><strong>Signes:</strong> <span>{plantInfo.recolte.signes}</span></div>
                    <div className="harvest-item"><strong>Conservation:</strong> <span>{plantInfo.recolte.conservation}</span></div>
                    {plantInfo.recolte.rendement && <div className="harvest-item"><strong>Rendement:</strong> <span>{plantInfo.recolte.rendement}</span></div>}
                  </div>,
                  "harvest"
                )}

                {plantInfo.conseils && renderExpandableSection(
                  "Conseils Pratiques",
                  <FaInfoCircle />,
                  <ul className="tips-list">{plantInfo.conseils.map((c,i) => <li key={i}>{c}</li>)}</ul>,
                  "tips"
                )}

                {plantInfo.liensGoogle && renderExpandableSection(
                  "Ressources Complémentaires",
                  <FaExternalLinkAlt />,
                  <div className="resources-list">
                    {plantInfo.liensGoogle.map((link,i) => (
                      <a key={i} href={link.url} target="_blank" rel="noopener noreferrer" className="resource-link">
                        <div className="resource-type">{link.type}</div>
                        <div className="resource-title">{link.titre}</div>
                        <FaExternalLinkAlt className="link-icon" />
                      </a>
                    ))}
                  </div>,
                  "resources"
                )}
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
                    <ul className="treatment-list">{plantInfo.traitements.map((t,i) => <li key={i}>{t}</li>)}</ul>
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


/*cd Garapix-frontend
npm run build
npx cap copy
npx cap sync
npx cap open android*/