// src/pages/Settings/PlantTechnicalSheet.jsx
import React, { useState, useEffect } from 'react';
import { 
  FaLeaf, 
  FaClipboardList, 
  FaCalendarAlt, 
  FaTint, 
  FaSun, 
  FaTemperatureHigh,
  FaSeedling,
  FaChartLine,
  FaEdit,
  FaSave
} from 'react-icons/fa';
import './PlantTechnicalSheet.css';

const PlantTechnicalSheet = ({ plantId, onClose, onSave }) => {
  const [plant, setPlant] = useState(null);
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    scientificName: '',
    family: '',
    description: '',
    growingConditions: {
      sunlight: '',
      water: '',
      soil: '',
      temperature: '',
      humidity: '',
      ph: ''
    },
    plantingSeason: '',
    harvestTime: '',
    notes: ''
  });

  // Charger les données de la plante
  useEffect(() => {
    const loadPlantData = async () => {
      if (!plantId) return;
      
      setLoading(true);
      try {
        // Simulation de chargement des données
        const mockPlant = {
          id: plantId,
          name: 'Tomate',
          scientificName: 'Solanum lycopersicum',
          family: 'Solanaceae',
          description: 'Plante potagère annuelle de la famille des Solanacées, originaire d\'Amérique du Sud. Cultivée pour ses fruits comestibles.',
          image: '/api/placeholder/400/300',
          growingConditions: {
            sunlight: 'Plein soleil (6-8 heures/jour)',
            water: 'Régulier, garder le sol humide mais non détrempé',
            soil: 'Riche, bien drainé, pH 6.0-6.8',
            temperature: '15-30°C',
            humidity: '50-70%',
            ph: '6.0-6.8'
          },
          plantingSeason: 'Printemps (après les dernières gelées)',
          harvestTime: '60-80 jours après plantation',
          companionPlants: ['Basilic', 'Carotte', 'Œillet d\'Inde'],
          commonPests: ['Pucerons', 'Aleurodes', 'Mineuses'],
          commonDiseases: ['Mildiou', 'Oïdium', 'Alternariose'],
          maintenanceLevel: 'Moyen',
          createdAt: '2024-01-15'
        };
        
        setPlant(mockPlant);
        setFormData({
          name: mockPlant.name,
          scientificName: mockPlant.scientificName,
          family: mockPlant.family,
          description: mockPlant.description,
          growingConditions: mockPlant.growingConditions,
          plantingSeason: mockPlant.plantingSeason,
          harvestTime: mockPlant.harvestTime,
          notes: ''
        });
      } catch (error) {
        console.error('Erreur lors du chargement de la fiche technique:', error);
      } finally {
        setLoading(false);
      }
    };

    loadPlantData();
  }, [plantId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleGrowingConditionChange = (key, value) => {
    setFormData(prev => ({
      ...prev,
      growingConditions: {
        ...prev.growingConditions,
        [key]: value
      }
    }));
  };

  const handleSave = () => {
    if (onSave) {
      onSave(formData);
    }
    setEditing(false);
  };

  if (loading) {
    return (
      <div className="plant-sheet-loading">
        <div className="spinner"></div>
        <p>Chargement de la fiche technique...</p>
      </div>
    );
  }

  if (!plant && !editing) {
    return (
      <div className="no-plant-selected">
        <FaLeaf className="empty-icon" />
        <h3>Aucune plante sélectionnée</h3>
        <p>Sélectionnez une plante pour voir sa fiche technique</p>
      </div>
    );
  }

  return (
    <div className="plant-technical-sheet">
      <div className="sheet-header">
        <div className="header-left">
          <FaLeaf className="sheet-icon" />
          <div>
            <h2>Fiche Technique de Plante</h2>
            {plant && (
              <p className="sheet-subtitle">
                Informations détaillées sur {plant.name}
              </p>
            )}
          </div>
        </div>
        <div className="header-actions">
          {editing ? (
            <>
              <button 
                className="btn btn-secondary"
                onClick={() => setEditing(false)}
              >
                Annuler
              </button>
              <button 
                className="btn btn-primary"
                onClick={handleSave}
              >
                <FaSave /> Enregistrer
              </button>
            </>
          ) : (
            <>
              <button 
                className="btn btn-outline"
                onClick={() => setEditing(true)}
              >
                <FaEdit /> Modifier
              </button>
              {onClose && (
                <button 
                  className="btn btn-secondary"
                  onClick={onClose}
                >
                  Fermer
                </button>
              )}
            </>
          )}
        </div>
      </div>

      <div className="sheet-content">
        {/* Informations générales */}
        <div className="info-section">
          <h3>
            <FaClipboardList /> Informations Générales
          </h3>
          <div className="info-grid">
            <div className="info-item">
              <label>Nom commun</label>
              {editing ? (
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="form-control"
                />
              ) : (
                <p className="info-value">{plant?.name}</p>
              )}
            </div>

            <div className="info-item">
              <label>Nom scientifique</label>
              {editing ? (
                <input
                  type="text"
                  name="scientificName"
                  value={formData.scientificName}
                  onChange={handleInputChange}
                  className="form-control"
                />
              ) : (
                <p className="info-value">{plant?.scientificName}</p>
              )}
            </div>

            <div className="info-item">
              <label>Famille</label>
              {editing ? (
                <input
                  type="text"
                  name="family"
                  value={formData.family}
                  onChange={handleInputChange}
                  className="form-control"
                />
              ) : (
                <p className="info-value">{plant?.family}</p>
              )}
            </div>

            <div className="info-item">
              <label>Niveau d'entretien</label>
              <p className="info-value">
                <span className={`maintenance-badge ${plant?.maintenanceLevel}`}>
                  {plant?.maintenanceLevel === 'easy' && 'Facile'}
                  {plant?.maintenanceLevel === 'medium' && 'Moyen'}
                  {plant?.maintenanceLevel === 'difficult' && 'Difficile'}
                </span>
              </p>
            </div>
          </div>

          <div className="info-item full-width">
            <label>Description</label>
            {editing ? (
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="form-control"
                rows="4"
              />
            ) : (
              <p className="info-value">{plant?.description}</p>
            )}
          </div>
        </div>

        {/* Conditions de culture */}
        <div className="info-section">
          <h3>
            <FaSeedling /> Conditions de Culture
          </h3>
          <div className="conditions-grid">
            <div className="condition-item">
              <div className="condition-icon">
                <FaSun />
              </div>
              <div className="condition-content">
                <label>Lumière</label>
                {editing ? (
                  <input
                    type="text"
                    value={formData.growingConditions.sunlight}
                    onChange={(e) => handleGrowingConditionChange('sunlight', e.target.value)}
                    className="form-control"
                  />
                ) : (
                  <p>{plant?.growingConditions.sunlight}</p>
                )}
              </div>
            </div>

            <div className="condition-item">
              <div className="condition-icon">
                <FaTint />
              </div>
              <div className="condition-content">
                <label>Arrosage</label>
                {editing ? (
                  <input
                    type="text"
                    value={formData.growingConditions.water}
                    onChange={(e) => handleGrowingConditionChange('water', e.target.value)}
                    className="form-control"
                  />
                ) : (
                  <p>{plant?.growingConditions.water}</p>
                )}
              </div>
            </div>

            <div className="condition-item">
              <div className="condition-icon">
                <FaChartLine />
              </div>
              <div className="condition-content">
                <label>Sol</label>
                {editing ? (
                  <input
                    type="text"
                    value={formData.growingConditions.soil}
                    onChange={(e) => handleGrowingConditionChange('soil', e.target.value)}
                    className="form-control"
                  />
                ) : (
                  <p>{plant?.growingConditions.soil}</p>
                )}
              </div>
            </div>

            <div className="condition-item">
              <div className="condition-icon">
                <FaTemperatureHigh />
              </div>
              <div className="condition-content">
                <label>Température</label>
                {editing ? (
                  <input
                    type="text"
                    value={formData.growingConditions.temperature}
                    onChange={(e) => handleGrowingConditionChange('temperature', e.target.value)}
                    className="form-control"
                  />
                ) : (
                  <p>{plant?.growingConditions.temperature}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Calendrier */}
        <div className="info-section">
          <h3>
            <FaCalendarAlt /> Calendrier de Culture
          </h3>
          <div className="calendar-info">
            <div className="calendar-item">
              <label>Saison de plantation</label>
              {editing ? (
                <input
                  type="text"
                  name="plantingSeason"
                  value={formData.plantingSeason}
                  onChange={handleInputChange}
                  className="form-control"
                />
              ) : (
                <p>{plant?.plantingSeason}</p>
              )}
            </div>

            <div className="calendar-item">
              <label>Temps jusqu'à récolte</label>
              {editing ? (
                <input
                  type="text"
                  name="harvestTime"
                  value={formData.harvestTime}
                  onChange={handleInputChange}
                  className="form-control"
                />
              ) : (
                <p>{plant?.harvestTime}</p>
              )}
            </div>
          </div>
        </div>

        {/* Plantes compagnes et problèmes courants */}
        <div className="info-section">
          <h3>Plantes Compagnes et Problèmes Courants</h3>
          <div className="companion-pests-grid">
            <div className="companion-plants">
              <h4>Plantes compagnes</h4>
              <ul>
                {plant?.companionPlants?.map((companion, index) => (
                  <li key={index}>{companion}</li>
                ))}
              </ul>
            </div>

            <div className="common-pests">
              <h4>Ravageurs courants</h4>
              <ul>
                {plant?.commonPests?.map((pest, index) => (
                  <li key={index}>{pest}</li>
                ))}
              </ul>
            </div>

            <div className="common-diseases">
              <h4>Maladies courantes</h4>
              <ul>
                {plant?.commonDiseases?.map((disease, index) => (
                  <li key={index}>{disease}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Notes personnelles */}
        {editing && (
          <div className="info-section">
            <h3>Notes Personnelles</h3>
            <div className="notes-section">
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
                className="form-control"
                placeholder="Ajoutez vos notes personnelles sur cette plante..."
                rows="4"
              />
            </div>
          </div>
        )}
      </div>

      {/* Pied de page */}
      <div className="sheet-footer">
        <p className="sheet-date">
          Fiche créée le: {plant?.createdAt ? new Date(plant.createdAt).toLocaleDateString('fr-FR') : 'Non disponible'}
        </p>
        <div className="footer-actions">
          <button className="btn btn-outline">
            Exporter la fiche
          </button>
          <button className="btn btn-outline">
            Imprimer
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlantTechnicalSheet;