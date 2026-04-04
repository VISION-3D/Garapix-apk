// src/pages/Library/PlantDetailPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  FaArrowLeft, 
  FaLeaf, 
  FaSun, 
  FaTint, 
  FaSeedling, 
  FaBug, 
  FaFlask, 
  FaCalendar,
  FaUtensils,
  FaBook,
  FaExternalLinkAlt,
  FaChevronDown,
  FaChevronUp
} from 'react-icons/fa';
import plantsDatabase from '../../data/plantsDatabase';
import './PlantDetailPage.css';

const PlantDetailPage = () => {
  const { plantId } = useParams();
  const navigate = useNavigate();
  const [plant, setPlant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('general');
  const [expandedSections, setExpandedSections] = useState({
    caracteristiques: true,
    culture: false,
    maladies: false,
    traitements: false,
    recolte: false,
    nutrition: false
  });

  useEffect(() => {
    const fetchPlant = () => {
      setLoading(true);
      const foundPlant = plantsDatabase.find(p => p.id === parseInt(plantId));
      
      if (foundPlant) {
        setPlant(foundPlant);
      } else {
        // Rediriger vers la page 404 ou la bibliothèque
        navigate('/library');
      }
      
      setLoading(false);
    };

    fetchPlant();
  }, [plantId, navigate]);

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const renderTabs = () => {
    const tabs = [
      { id: 'general', label: 'Général', icon: <FaLeaf /> },
      { id: 'culture', label: 'Culture', icon: <FaSeedling /> },
      { id: 'maladies', label: 'Maladies', icon: <FaBug /> },
      { id: 'traitements', label: 'Traitements', icon: <FaFlask /> },
      { id: 'nutrition', label: 'Nutrition', icon: <FaUtensils /> }
    ];

    return (
      <div className="detail-tabs">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>
    );
  };

  const renderContent = () => {
    if (!plant) return null;

    switch (activeTab) {
      case 'general':
        return (
          <div className="general-info">
            <div className="plant-header">
              <div className="plant-title">
                <h1>{plant.nomCommun}</h1>
                <h2 className="scientific-name">
                  <em>{plant.nomScientifique}</em>
                </h2>
              </div>
              
              <div className="plant-meta">
                <div className="meta-item">
                  <FaLeaf className="meta-icon" />
                  <div>
                    <span className="meta-label">Famille</span>
                    <span className="meta-value">{plant.famille}</span>
                  </div>
                </div>
                
                <div className="meta-item">
                  <FaSun className="meta-icon" />
                  <div>
                    <span className="meta-label">Saison</span>
                    <span className="meta-value">{plant.saison}</span>
                  </div>
                </div>
                
                <div className="meta-item">
                  <FaSeedling className="meta-icon" />
                  <div>
                    <span className="meta-label">Cycle</span>
                    <span className="meta-value">{plant.cycle}</span>
                  </div>
                </div>
                
                <div className="meta-item">
                  <FaCalendar className="meta-icon" />
                  <div>
                    <span className="meta-label">Origine</span>
                    <span className="meta-value">{plant.origine}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="section">
              <h3>Description</h3>
              <p className="description-text">{plant.description}</p>
            </div>

            {/* Caractéristiques */}
            <div className={`section expandable ${expandedSections.caracteristiques ? 'expanded' : ''}`}>
              <div className="section-header" onClick={() => toggleSection('caracteristiques')}>
                <h3>Caractéristiques botaniques</h3>
                {expandedSections.caracteristiques ? <FaChevronUp /> : <FaChevronDown />}
              </div>
              
              {expandedSections.caracteristiques && (
                <div className="section-content">
                  <div className="characteristics-grid">
                    <div className="char-item">
                      <span className="char-label">Hauteur</span>
                      <span className="char-value">{plant.caracteristiques.hauteur}</span>
                    </div>
                    
                    <div className="char-item">
                      <span className="char-label">Port</span>
                      <span className="char-value">{plant.caracteristiques.port}</span>
                    </div>
                    
                    <div className="char-item">
                      <span className="char-label">Feuilles</span>
                      <span className="char-value">{plant.caracteristiques.feuilles}</span>
                    </div>
                    
                    <div className="char-item">
                      <span className="char-label">Fleurs</span>
                      <span className="char-value">{plant.caracteristiques.fleurs}</span>
                    </div>
                    
                    <div className="char-item">
                      <span className="char-label">Fruits</span>
                      <span className="char-value">{plant.caracteristiques.fruits}</span>
                    </div>
                    
                    <div className="char-item">
                      <span className="char-label">Croissance</span>
                      <span className="char-value">{plant.caracteristiques.croissance}</span>
                    </div>
                    
                    <div className="char-item">
                      <span className="char-label">Longévité</span>
                      <span className="char-value">{plant.caracteristiques.longevite}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Images */}
            {plant.images && plant.images.length > 0 && (
              <div className="section">
                <h3>Galerie d'images</h3>
                <div className="image-gallery">
                  {plant.images.map((image, index) => (
                    <div key={index} className="image-item">
                      <img 
                        src={image} 
                        alt={`${plant.nomCommun} ${index + 1}`}
                        loading="lazy"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        );

      case 'culture':
        return (
          <div className="culture-info">
            <div className="section">
              <h3>Conditions de culture</h3>
              <div className="culture-conditions">
                <div className="condition-card">
                  <FaSun className="condition-icon" />
                  <div className="condition-content">
                    <h4>Climat</h4>
                    <p>{plant.culture.climat}</p>
                  </div>
                </div>
                
                <div className="condition-card">
                  <FaTint className="condition-icon" />
                  <div className="condition-content">
                    <h4>Besoins en eau</h4>
                    <p>{plant.culture.besoinEau}</p>
                  </div>
                </div>
                
                <div className="condition-card">
                  <FaSeedling className="condition-icon" />
                  <div className="condition-content">
                    <h4>Exposition</h4>
                    <p>{plant.culture.exposition}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Sol */}
            <div className="section">
              <h3>Sol</h3>
              <div className="soil-info">
                <div className="soil-detail">
                  <h4>Type de sol</h4>
                  <p>{plant.culture.sol.type}</p>
                </div>
                
                <div className="soil-detail">
                  <h4>pH recommandé</h4>
                  <p>{plant.culture.sol.pH}</p>
                </div>
                
                <div className="soil-detail">
                  <h4>Amendements</h4>
                  <p>{plant.culture.sol.amendement}</p>
                </div>
              </div>
            </div>

            {/* Plantation */}
            <div className="section">
              <h3>Plantation</h3>
              <div className="plantation-info">
                <div className="planting-detail">
                  <h4>Période</h4>
                  <p>{plant.culture.plantation.periode}</p>
                </div>
                
                <div className="planting-detail">
                  <h4>Espacement</h4>
                  <p>{plant.culture.plantation.espacement}</p>
                </div>
                
                <div className="planting-detail">
                  <h4>Profondeur</h4>
                  <p>{plant.culture.plantation.profondeur}</p>
                </div>
              </div>
            </div>

            {/* Entretien */}
            <div className="section">
              <h3>Entretien</h3>
              <div className="maintenance-list">
                {plant.culture.entretien.map((item, index) => (
                  <div key={index} className="maintenance-item">
                    <div className="maintenance-number">{index + 1}</div>
                    <p>{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'maladies':
        return (
          <div className="diseases-info">
            <div className="section">
              <h3>Maladies courantes</h3>
              <p className="section-description">
                Voici les principales maladies pouvant affecter le {plant.nomCommun.toLowerCase()}, 
                avec leurs symptômes et méthodes de traitement.
              </p>
              
              <div className="diseases-list">
                {plant.maladies.map((maladie, index) => (
                  <div key={index} className="disease-card">
                    <div className="disease-header">
                      <h4>{maladie.nom}</h4>
                      <span className="disease-severity">
                        {index === 0 ? 'Très commune' : index === 1 ? 'Commune' : 'Occasionnelle'}
                      </span>
                    </div>
                    
                    <div className="disease-symptoms">
                      <h5>Symptômes</h5>
                      <p>{maladie.symptoms}</p>
                    </div>
                    
                    <div className="disease-treatment">
                      <h5>Traitement</h5>
                      <p>{maladie.traitement}</p>
                    </div>
                    
                    <div className="disease-prevention">
                      <h5>Prévention</h5>
                      <p>{maladie.prevention}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Conseils généraux */}
            <div className="section">
              <h3>Conseils de prévention</h3>
              <div className="prevention-tips">
                {plant.conseils.map((conseil, index) => (
                  <div key={index} className="tip-card">
                    <div className="tip-number">{index + 1}</div>
                    <p>{conseil}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'traitements':
        return (
          <div className="treatments-info">
            <div className="section">
              <h3>Traitements recommandés</h3>
              <div className="treatments-list">
                {plant.traitements.map((traitement, index) => (
                  <div key={index} className="treatment-card">
                    <div className="treatment-icon">
                      <FaFlask />
                    </div>
                    <div className="treatment-content">
                      <p>{traitement}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Récolte */}
            <div className={`section expandable ${expandedSections.recolte ? 'expanded' : ''}`}>
              <div className="section-header" onClick={() => toggleSection('recolte')}>
                <h3>Récolte et conservation</h3>
                {expandedSections.recolte ? <FaChevronUp /> : <FaChevronDown />}
              </div>
              
              {expandedSections.recolte && (
                <div className="section-content">
                  <div className="harvest-info">
                    <div className="harvest-detail">
                      <h4>Période de récolte</h4>
                      <p>{plant.recolte.periode}</p>
                    </div>
                    
                    <div className="harvest-detail">
                      <h4>Signes de maturité</h4>
                      <p>{plant.recolte.signes}</p>
                    </div>
                    
                    <div className="harvest-detail">
                      <h4>Conservation</h4>
                      <p>{plant.recolte.conservation}</p>
                    </div>
                    
                    {plant.recolte.rendement && (
                      <div className="harvest-detail">
                        <h4>Rendement</h4>
                        <p>{plant.recolte.rendement}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        );

      case 'nutrition':
        return (
          <div className="nutrition-info">
            <div className="section">
              <h3>Valeur nutritionnelle</h3>
              <div className="nutrition-grid">
                <div className="nutrition-card">
                  <h4>Calories</h4>
                  <p className="nutrition-value">{plant.valeurNutritionnelle.calories}</p>
                </div>
                
                <div className="nutrition-card">
                  <h4>Fibres</h4>
                  <p className="nutrition-value">{plant.valeurNutritionnelle.fibres}</p>
                </div>
                
                {plant.valeurNutritionnelle.vitamines && (
                  <div className="nutrition-card">
                    <h4>Vitamines</h4>
                    <p className="nutrition-value">{plant.valeurNutritionnelle.vitamines}</p>
                  </div>
                )}
                
                {plant.valeurNutritionnelle.mineraux && (
                  <div className="nutrition-card">
                    <h4>Minéraux</h4>
                    <p className="nutrition-value">{plant.valeurNutritionnelle.mineraux}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Utilisations */}
            <div className="section">
              <h3>Utilisations</h3>
              <div className="uses-list">
                {plant.utilisations.map((utilisation, index) => (
                  <div key={index} className="use-card">
                    <div className="use-icon">
                      {index === 0 && <FaUtensils />}
                      {index === 1 && <FaBook />}
                      {index > 1 && <FaLeaf />}
                    </div>
                    <p>{utilisation}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Liens externes */}
            {plant.liensGoogle && plant.liensGoogle.length > 0 && (
              <div className="section">
                <h3>Ressources supplémentaires</h3>
                <div className="external-links">
                  {plant.liensGoogle.map((lien, index) => (
                    <a 
                      key={index}
                      href={lien.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="external-link"
                    >
                      <div className="link-content">
                        <div className="link-icon">
                          <FaExternalLinkAlt />
                        </div>
                        <div className="link-info">
                          <h4>{lien.titre}</h4>
                          <span className="link-type">{lien.type}</span>
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Chargement des détails de la plante...</p>
      </div>
    );
  }

  if (!plant) {
    return (
      <div className="not-found-container">
        <h2>Plante non trouvée</h2>
        <p>La plante que vous cherchez n'existe pas ou a été déplacée.</p>
        <button className="btn btn-primary" onClick={() => navigate('/library')}>
          Retour à la bibliothèque
        </button>
      </div>
    );
  }

  return (
    <div className="plant-detail-page">
      {/* Header avec navigation */}
      <div className="detail-header">
        <button className="back-btn" onClick={() => navigate('/library')}>
          <FaArrowLeft />
          <span>Retour à la bibliothèque</span>
        </button>
        
        <div className="header-actions">
          <button 
            className="btn btn-outline"
            onClick={() => window.print()}
          >
            Imprimer cette fiche
          </button>
          
          <button 
            className="btn btn-primary"
            onClick={() => navigate('/diagnostic')}
          >
            Diagnostiquer cette plante
          </button>
        </div>
      </div>

      {/* Onglets */}
      {renderTabs()}

      {/* Contenu principal */}
      <div className="detail-content">
        <div className="content-wrapper">
          {renderContent()}
        </div>
      </div>

      {/* Navigation rapide */}
      <div className="quick-nav">
        <div className="quick-nav-header">
          <h4>Navigation rapide</h4>
        </div>
        
        <div className="quick-nav-links">
          {['general', 'culture', 'maladies', 'traitements', 'nutrition'].map((tab) => (
            <button
              key={tab}
              className={`quick-nav-link ${activeTab === tab ? 'active' : ''}`}
              onClick={() => {
                setActiveTab(tab);
                window.scrollTo(0, 0);
              }}
            >
              {tab === 'general' && 'Général'}
              {tab === 'culture' && 'Culture'}
              {tab === 'maladies' && 'Maladies'}
              {tab === 'traitements' && 'Traitements'}
              {tab === 'nutrition' && 'Nutrition'}
            </button>
          ))}
        </div>
        
        <div className="quick-nav-footer">
          <button 
            className="btn btn-secondary"
            onClick={() => navigate('/library')}
          >
            Voir toutes les plantes
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlantDetailPage;