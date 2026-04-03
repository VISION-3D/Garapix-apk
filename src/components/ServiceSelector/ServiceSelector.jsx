// src/components/ServiceSelector/ServiceSelector.jsx
import React, { useState, useEffect } from 'react';
import { 
  FaLeaf, 
  FaGoogle, 
  FaRobot, 
  FaCheck, 
  FaBolt,
  FaChartLine,
  FaDatabase,
  FaCogs,
  FaRocket,
  FaMagic
} from 'react-icons/fa';
import './ServiceSelector.css';

const ServiceSelector = ({ onServiceSelect, selectedService: externalSelectedService, disabled = false }) => {
  const [internalSelectedService, setInternalSelectedService] = useState(externalSelectedService || 'hybrid');
  const [hoveredService, setHoveredService] = useState(null);

  const services = [
    {
      id: 'plantnet',
      name: 'PlantNet API',
      tagline: 'Spécialisé plantes',
      icon: <FaLeaf />,
      color: '#4CAF50',
      gradient: 'linear-gradient(135deg, #4CAF50, #2E7D32)',
      features: [
        'Base de données botanique',
        'Précision élevée plantes',
        'Reconnaissance feuilles/fleurs',
        'Communauté scientifique'
      ],
      description: 'Service spécialisé dans l\'identification des plantes avec une base de données botanique mondiale.',
      accuracy: '95%',
      speed: '2-3 sec'
    },
    {
      id: 'googlevision',
      name: 'Google Vision',
      tagline: 'Analyse générale',
      icon: <FaGoogle />,
      color: '#4285F4',
      gradient: 'linear-gradient(135deg, #4285F4, #0D47A1)',
      features: [
        'IA Google avancée',
        'Analyse multi-objets',
        'Détection contexte',
        'API robuste'
      ],
      description: 'Service généraliste d\'analyse d\'images avec l\'IA avancée de Google.',
      accuracy: '85%',
      speed: '1-2 sec'
    },
    {
      id: 'hybrid',
      name: 'Hybride',
      tagline: 'Combinaison IA',
      icon: <FaRobot />,
      color: '#9C27B0',
      gradient: 'linear-gradient(135deg, #9C27B0, #6A1B9A)',
      features: [
        'Combinaison intelligente',
        'Meilleure précision',
        'Analyse approfondie',
        'Adaptatif'
      ],
      description: 'Combine PlantNet et Google Vision pour une identification optimale avec l\'intelligence artificielle.',
      accuracy: '98%',
      speed: '3-4 sec'
    }
  ];

  // Synchroniser avec la prop externe si elle change
  useEffect(() => {
    if (externalSelectedService) {
      setInternalSelectedService(externalSelectedService);
    }
  }, [externalSelectedService]);

  const handleServiceClick = (serviceId) => {
    if (disabled) return;
    
    setInternalSelectedService(serviceId);
    if (onServiceSelect) {
      onServiceSelect(serviceId);
    }
  };

  const selectedServiceData = services.find(s => s.id === internalSelectedService);

  return (
    <div className="service-selector-premium">
      <div className="service-selector-header">
        <div className="header-content">
          <FaMagic className="header-icon" />
          <div>
            <h2>Identification par IA</h2>
            <p className="header-subtitle">
              Choisissez un service d'identification d'image pour détecter automatiquement la plante
            </p>
          </div>
        </div>
        {disabled && (
          <div className="disabled-overlay">
            <div className="loader"></div>
            <span>Identification en cours...</span>
          </div>
        )}
      </div>

      <div className="services-grid">
        {services.map((service) => (
          <div
            key={service.id}
            className={`service-card ${internalSelectedService === service.id ? 'selected' : ''} ${disabled ? 'disabled' : ''}`}
            onClick={() => handleServiceClick(service.id)}
            onMouseEnter={() => setHoveredService(service.id)}
            onMouseLeave={() => setHoveredService(null)}
            style={{
              '--service-color': service.color,
              '--service-gradient': service.gradient
            }}
          >
            {/* Indicateur de sélection */}
            {internalSelectedService === service.id && (
              <div className="selected-badge">
                <FaCheck /> Sélectionné
              </div>
            )}

            {/* En-tête de la carte */}
            <div className="service-card-header">
              <div 
                className="service-icon-container"
                style={{ background: service.gradient }}
              >
                {service.icon}
              </div>
              <div className="service-title">
                <h3>{service.name}</h3>
                <span className="service-tagline">{service.tagline}</span>
              </div>
            </div>

            {/* Stats de performance */}
            <div className="service-stats">
              <div className="stat-item">
                <FaChartLine className="stat-icon" />
                <div className="stat-info">
                  <span className="stat-label">Précision</span>
                  <span className="stat-value">{service.accuracy}</span>
                </div>
              </div>
              <div className="stat-item">
                <FaBolt className="stat-icon" />
                <div className="stat-info">
                  <span className="stat-label">Vitesse</span>
                  <span className="stat-value">{service.speed}</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <p className="service-description">{service.description}</p>

            {/* Liste des fonctionnalités */}
            <div className="service-features">
              <h4>Fonctionnalités :</h4>
              <ul>
                {service.features.map((feature, index) => (
                  <li key={index}>
                    <FaCheck className="feature-check" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Badge de recommandation pour Hybride */}
            {service.id === 'hybrid' && (
              <div className="recommended-badge">
                <FaRocket className="badge-icon" />
                <span>Recommandé</span>
              </div>
            )}

            {/* Overlay au survol */}
            {hoveredService === service.id && !disabled && (
              <div className="hover-overlay">
                <div className="hover-content">
                  <FaCogs className="hover-icon" />
                  <span>Sélectionner ce service</span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Panel d'informations du service sélectionné */}
      {selectedServiceData && (
        <div className="selected-service-panel">
          <div className="panel-header">
            <div className="panel-title">
              {selectedServiceData.icon}
              <h3>Service sélectionné : {selectedServiceData.name}</h3>
            </div>
            <div 
              className="panel-badge"
              style={{ background: selectedServiceData.gradient }}
            >
              {selectedServiceData.tagline}
            </div>
          </div>
          
          <div className="panel-content">
            <div className="panel-stats">
              <div className="panel-stat">
                <strong>Précision estimée :</strong>
                <span className="highlight-stat">{selectedServiceData.accuracy}</span>
              </div>
              <div className="panel-stat">
                <strong>Temps d'analyse :</strong>
                <span className="highlight-stat">{selectedServiceData.speed}</span>
              </div>
              <div className="panel-stat">
                <strong>Type d'analyse :</strong>
                <span className="highlight-stat">
                  {selectedServiceData.id === 'plantnet' && 'Botanique spécialisée'}
                  {selectedServiceData.id === 'googlevision' && 'Générale avancée'}
                  {selectedServiceData.id === 'hybrid' && 'Intelligente hybride'}
                </span>
              </div>
            </div>

            <div className="panel-description">
              <h4>Comment ça fonctionne ?</h4>
              <p>
                {selectedServiceData.id === 'plantnet' && 
                  'PlantNet compare votre image avec une base de données botanique mondiale de millions de plantes pour une identification précise.'}
                {selectedServiceData.id === 'googlevision' && 
                  'Google Vision utilise des modèles d\'IA avancés pour analyser le contenu de l\'image et identifier les objets, y compris les plantes.'}
                {selectedServiceData.id === 'hybrid' && 
                  'Notre système hybride combine PlantNet pour la précision botanique et Google Vision pour l\'analyse contextuelle, offrant les meilleurs résultats.'}
              </p>
            </div>

            <div className="panel-tips">
              <h4>
                <FaDatabase className="tips-icon" />
                Conseils pour une meilleure identification
              </h4>
              <ul>
                <li>Prenez la photo sous une bonne lumière naturelle</li>
                <li>Focus sur les feuilles, fleurs ou fruits</li>
                <li>Évitez les arrière-plans complexes</li>
                <li>Plusieurs angles augmentent la précision</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceSelector;