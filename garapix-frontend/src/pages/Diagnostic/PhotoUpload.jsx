import React, { useState, useRef, useEffect } from 'react';
import { 
  FaCamera, 
  FaUpload, 
  FaImage, 
  FaVideo, 
  FaRedo, 
  FaCheck, 
  FaTimes,
  FaSpinner,
  FaSearch,
  FaLeaf,
  FaTree
} from 'react-icons/fa';
import './PhotoUpload.css';

// Base de données des plantes directement dans le composant
const plantsDatabase = [
  {
    id: 1,
    nomCommun: "Papayer",
    nomScientifique: "Carica papaya",
    famille: "Caricaceae",
    saison: "Toute l'année",
    description: "Plante fruitière tropicale",
    diseases: ["POURRITURE_COLLET", "OIDIUM"]
  },
  {
    id: 2,
    nomCommun: "Tomate",
    nomScientifique: "Solanum lycopersicum",
    famille: "Solanaceae",
    saison: "Saison sèche",
    description: "Plante maraîchère",
    diseases: ["MILDIOU", "ALTERNARIOSE"]
  },
  {
    id: 3,
    nomCommun: "Gombo",
    nomScientifique: "Abelmoschus esculentus",
    famille: "Malvaceae",
    saison: "Saison des pluies",
    description: "Légume très cultivé en Afrique",
    diseases: ["OIDIUM", "PUCERONS"]
  },
  {
    id: 4,
    nomCommun: "Piment",
    nomScientifique: "Capsicum frutescens",
    famille: "Solanaceae",
    saison: "Toute l'année",
    description: "Plante condimentaire",
    diseases: ["MOSAIQUE"]
  },
  {
    id: 5,
    nomCommun: "Poivron",
    nomScientifique: "Capsicum annuum",
    famille: "Solanaceae",
    saison: "Saison sèche",
    description: "Plante maraîchère",
    diseases: ["MILDIOU"]
  },
  {
    id: 6,
    nomCommun: "Aubergine",
    nomScientifique: "Solanum melongena",
    famille: "Solanaceae",
    saison: "Toute l'année",
    description: "Légume tropical",
    diseases: ["FLÉTRISSEMENT"]
  },
  {
    id: 7,
    nomCommun: "Chou",
    nomScientifique: "Brassica oleracea",
    famille: "Brassicaceae",
    saison: "Saison fraîche",
    description: "Légume-feuille",
    diseases: ["PIERIDE", "ALTERNARIOSE"]
  },
  {
    id: 8,
    nomCommun: "Laitue",
    nomScientifique: "Lactuca sativa",
    famille: "Asteraceae",
    saison: "Saison fraîche",
    description: "Légume-feuille",
    diseases: ["MILDIOU"]
  },
  {
    id: 9,
    nomCommun: "Oignon",
    nomScientifique: "Allium cepa",
    famille: "Amaryllidaceae",
    saison: "Saison sèche",
    description: "Bulbe alimentaire",
    diseases: ["POURRITURE_BULBE"]
  },
  {
    id: 10,
    nomCommun: "Ail",
    nomScientifique: "Allium sativum",
    famille: "Amaryllidaceae",
    saison: "Saison sèche",
    description: "Plante condimentaire",
    diseases: ["ROUILLE"]
  },
  {
    id: 11,
    nomCommun: "Carotte",
    nomScientifique: "Daucus carota",
    famille: "Apiaceae",
    saison: "Saison fraîche",
    description: "Racine comestible",
    diseases: ["ALTERNARIOSE"]
  },
  {
    id: 12,
    nomCommun: "Concombre",
    nomScientifique: "Cucumis sativus",
    famille: "Cucurbitaceae",
    saison: "Saison des pluies",
    description: "Légume-fruit",
    diseases: ["OIDIUM"]
  },
  {
    id: 13,
    nomCommun: "Courgette",
    nomScientifique: "Cucurbita pepo",
    famille: "Cucurbitaceae",
    saison: "Saison des pluies",
    description: "Légume-fruit",
    diseases: ["OIDIUM"]
  },
  
];

// Dictionnaire des maladies
const diseaseDictionary = {
  "POURRITURE_COLLET": "Pourriture du collet",
  "OIDIUM": "Oïdium",
  "MILDIOU": "Mildiou",
  "ALTERNARIOSE": "Alternariose",
  "PUCERONS": "Pucerons",
  "MOSAIQUE": "Virus de la mosaïque",
  "FLÉTRISSEMENT": "Flétrissement bactérien",
  "PIERIDE": "Piéride du chou",
  "POURRITURE_BULBE": "Pourriture des bulbes",
  "ROUILLE": "Rouille",
  "FUSARIOSE": "Fusariose",
  "ANTHRACNOSE": "Anthracnose",
  "CERCOSPORIOSE": "Cercosporiose",
  "SIGATOKA": "Sigatoka",
  "CHANCRE": "Chancre des agrumes",
  "PYRICULARIOSE": "Pyriculariose du riz",
  "CHARBON": "Charbon du sorgho",
  "BACTERIOSE": "Bactériose du cotonnier",
  "MOSAIQUE_MANIOC": "Mosaïque du manioc",
  "POURRITURE_CŒUR": "Pourriture du cœur",
  "PHYTOPHTHORA": "Phytophthora",
  "POURRITURE_TUBERCULE": "Pourriture des tubercules",
  "POURRITURE_RACINES": "Pourriture des racines",
  "POURRITURE_RHIZOME": "Pourriture des rhizomes",
  "VIROSE": "Virose"
};

const PhotoUpload = ({ onPhotoTaken, onUpload, loading = false, onPlantSelect }) => {
  const [mode, setMode] = useState('upload');
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const [stream, setStream] = useState(null);
  const [error, setError] = useState(null);
  const [countdown, setCountdown] = useState(0);
  const [searchPlant, setSearchPlant] = useState('');
  const [selectedPlant, setSelectedPlant] = useState(null);
  const [suggestedPlants, setSuggestedPlants] = useState([]);
  
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);
  const countdownRef = useRef(null);
  const searchRef = useRef(null);

  // Filtrer les plantes selon la recherche
  useEffect(() => {
    if (searchPlant.trim() === '') {
      setSuggestedPlants([]);
      return;
    }

    const query = searchPlant.toLowerCase();
    const filtered = plantsDatabase.filter(plant =>
      plant.nomCommun.toLowerCase().includes(query) ||
      plant.nomScientifique.toLowerCase().includes(query)
    ).slice(0, 5);

    setSuggestedPlants(filtered);
  }, [searchPlant]);

  // Initialiser la caméra
  const initializeCamera = async () => {
    try {
      setError(null);
      const constraints = {
        video: {
          facingMode: 'environment',
          width: { ideal: 1920 },
          height: { ideal: 1080 }
        }
      };

      const mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
      setStream(mediaStream);
      
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        setIsCameraActive(true);
      }
    } catch (err) {
      console.error('Erreur d\'accès à la caméra:', err);
      setError('Impossible d\'accéder à la caméra. Vérifiez vos permissions.');
    }
  };

  // Arrêter la caméra
  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    setIsCameraActive(false);
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  };

  // Prendre une photo
  const capturePhoto = () => {
    if (!isCameraActive || !videoRef.current) return;

    setCountdown(3);
    
    countdownRef.current = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(countdownRef.current);
          const canvas = canvasRef.current;
          const video = videoRef.current;
          
          if (canvas && video) {
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            
            const ctx = canvas.getContext('2d');
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            
            const imageDataUrl = canvas.toDataURL('image/jpeg', 0.9);
            setCapturedImage(imageDataUrl);
            
            // Identifier automatiquement la plante la plus probable
            identifyPlantFromImage();
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // Identification automatique de la plante (simulation)
  const identifyPlantFromImage = () => {
    // Pour la démo, sélectionner une plante aléatoire
    const randomPlant = plantsDatabase[Math.floor(Math.random() * plantsDatabase.length)];
    setSelectedPlant(randomPlant);
    
    // Notifier le parent
    if (onPlantSelect) {
      onPlantSelect(randomPlant);
    }
  };

  // Sélectionner une plante manuellement
  const handlePlantSelect = (plant) => {
    setSelectedPlant(plant);
    setSearchPlant(plant.nomCommun);
    setSuggestedPlants([]);
    
    if (onPlantSelect) {
      onPlantSelect(plant);
    }
  };

  // Reprendre une photo
  const retakePhoto = () => {
    setCapturedImage(null);
    setCountdown(0);
    setSelectedPlant(null);
  };

  // Confirmer la photo
  const confirmPhoto = () => {
    if (capturedImage && onPhotoTaken) {
      fetch(capturedImage)
        .then(res => res.blob())
        .then(blob => {
          const file = new File([blob], 'capture.jpg', { type: 'image/jpeg' });
          const plantInfo = selectedPlant ? {
            plant: selectedPlant,
            plantName: selectedPlant.nomCommun,
            plantScientific: selectedPlant.nomScientifique
          } : null;
          
          onPhotoTaken(file, capturedImage, plantInfo);
        });
    }
    stopCamera();
    setCapturedImage(null);
  };

  // Gérer le changement de fichier
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.match('image.*')) {
      setError('Veuillez sélectionner une image valide');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setError('L\'image est trop volumineuse (max 10MB)');
      return;
    }

    setError(null);
    
    const reader = new FileReader();
    reader.onload = (e) => {
      // Identifier automatiquement la plante
      const randomPlant = plantsDatabase[Math.floor(Math.random() * plantsDatabase.length)];
      setSelectedPlant(randomPlant);
      
      if (onUpload) {
        const plantInfo = {
          plant: randomPlant,
          plantName: randomPlant.nomCommun,
          plantScientific: randomPlant.nomScientifique
        };
        onUpload(file, e.target.result, plantInfo);
      }
    };
    reader.readAsDataURL(file);
  };

  // Basculer entre les modes
  const switchToCamera = () => {
    setMode('camera');
    initializeCamera();
  };

  const switchToUpload = () => {
    stopCamera();
    setMode('upload');
    setCapturedImage(null);
    setCountdown(0);
    setSelectedPlant(null);
  };

  // Nettoyer à la destruction du composant
  useEffect(() => {
    return () => {
      stopCamera();
      if (countdownRef.current) {
        clearInterval(countdownRef.current);
      }
    };
  }, []);

  return (
    <div className="photo-upload-container">
      <h3 className="photo-upload-title">
        <FaCamera /> Capture & Identification
      </h3>
      
      {/* Sélecteur de mode */}
      <div className="mode-selector">
        <button
          type="button"
          className={`mode-btn ${mode === 'upload' ? 'active' : ''}`}
          onClick={switchToUpload}
          disabled={loading}
        >
          <FaUpload className="mode-icon" />
          <span>Importer</span>
        </button>
        <button
          type="button"
          className={`mode-btn ${mode === 'camera' ? 'active' : ''}`}
          onClick={switchToCamera}
          disabled={loading}
        >
          <FaCamera className="mode-icon" />
          <span>Caméra</span>
        </button>
      </div>

      {/* Zone d'erreur */}
      {error && (
        <div className="error-message">
          <FaTimes className="error-icon" />
          {error}
        </div>
      )}

      {/* Mode Upload */}
      {mode === 'upload' && (
        <div className="upload-section">
          <div 
            className="upload-zone"
            onClick={() => !loading && fileInputRef.current?.click()}
          >
            {loading ? (
              <div className="loading-overlay">
                <FaSpinner className="spinner" />
                <p>Traitement de l'image...</p>
              </div>
            ) : (
              <>
                <FaImage className="upload-icon" />
                <p>Cliquez pour sélectionner une image</p>
                <p className="upload-hint">Formats supportés: JPG, PNG (max 10MB)</p>
              </>
            )}
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            style={{ display: 'none' }}
            disabled={loading}
          />
        </div>
      )}

      {/* Mode Caméra */}
      {mode === 'camera' && (
        <div className="camera-section">
          {!capturedImage ? (
            <>
              {/* Vue caméra */}
              <div className="camera-preview">
                {isCameraActive ? (
                  <>
                    <video
                      ref={videoRef}
                      className="camera-video"
                      autoPlay
                      playsInline
                      muted
                    />
                    
                    {/* Compte à rebours */}
                    {countdown > 0 && (
                      <div className="countdown-overlay">
                        <div className="countdown-circle">
                          <span className="countdown-number">{countdown}</span>
                        </div>
                      </div>
                    )}

                    {/* Contrôles caméra */}
                    <div className="camera-controls">
                      <button
                        type="button"
                        className="capture-btn"
                        onClick={capturePhoto}
                        disabled={countdown > 0 || loading}
                      >
                        <FaCamera className="capture-icon" />
                      </button>
                      <button
                        type="button"
                        className="camera-switch-btn"
                        onClick={initializeCamera}
                        disabled={loading}
                        title="Redémarrer la caméra"
                      >
                        <FaRedo />
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="camera-inactive">
                    <FaVideo className="camera-off-icon" />
                    <p>Caméra non disponible</p>
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={initializeCamera}
                      disabled={loading}
                    >
                      Activer la caméra
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            /* Aperçu de la photo capturée */
            <div className="capture-preview">
              <div className="preview-image-container">
                <img 
                  src={capturedImage} 
                  alt="Capture" 
                  className="preview-image"
                />
              </div>
              
              {/* Identification de la plante */}
              <div className="plant-identification">
                <h4>
                  <FaLeaf /> Identification de la plante
                </h4>
                
                {selectedPlant ? (
                  <div className="identified-plant">
                    <div className="plant-info">
                      <h5>{selectedPlant.nomCommun}</h5>
                      <p className="scientific-name">
                        {selectedPlant.nomScientifique}
                      </p>
                      <div className="plant-details">
                        <span className="plant-detail">
                          <strong>Famille:</strong> {selectedPlant.famille}
                        </span>
                        <span className="plant-detail">
                          <strong>Saison:</strong> {selectedPlant.saison}
                        </span>
                      </div>
                      {selectedPlant.diseases.length > 0 && (
                        <div className="plant-diseases">
                          <strong>Maladies courantes:</strong>
                          <div className="disease-tags">
                            {selectedPlant.diseases.map(disease => (
                              <span key={disease} className="disease-tag">
                                {diseaseDictionary[disease] || disease}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="plant-search-container">
                    <div className="search-input-wrapper">
                      <FaSearch className="search-icon" />
                      <input
                        type="text"
                        className="plant-search-input"
                        placeholder="Rechercher une plante..."
                        value={searchPlant}
                        onChange={(e) => setSearchPlant(e.target.value)}
                        ref={searchRef}
                      />
                    </div>
                    
                    {/* Suggestions */}
                    {suggestedPlants.length > 0 && (
                      <div className="plant-suggestions">
                        {suggestedPlants.map(plant => (
                          <div
                            key={plant.id}
                            className="plant-suggestion"
                            onClick={() => handlePlantSelect(plant)}
                          >
                            <FaTree className="suggestion-icon" />
                            <div className="suggestion-info">
                              <strong>{plant.nomCommun}</strong>
                              <small>{plant.nomScientifique}</small>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
              
              <div className="preview-controls">
                <button
                  type="button"
                  className="btn btn-secondary preview-btn"
                  onClick={retakePhoto}
                  disabled={loading}
                >
                  <FaRedo /> Reprendre
                </button>
                <button
                  type="button"
                  className="btn btn-primary preview-btn"
                  onClick={confirmPhoto}
                  disabled={loading}
                >
                  <FaCheck /> Confirmer & Analyser
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Instructions */}
      <div className="instructions">
        <h4>Conseils pour une meilleure identification :</h4>
        <ul>
          <li>Prenez la photo sous une bonne lumière naturelle</li>
          <li>Approchez-vous suffisamment pour voir les détails</li>
          <li>Focus sur la partie affectée de la plante</li>
          <li>Évitez les reflets et ombres fortes</li>
          <li>Prenez plusieurs angles si nécessaire</li>
        </ul>
      </div>

      {/* Canvas caché pour la capture */}
      <canvas ref={canvasRef} style={{ display: 'none' }} />
    </div>
  );
};

export default PhotoUpload;