// src/pages/Library/LibraryPage.jsx
import React, { useState, useEffect } from 'react';
import { FaSearch, FaFilter, FaLeaf, FaSeedling, FaBug, FaFlask, FaBook } from 'react-icons/fa';
import plantsDatabase from '../../data/plantsDatabase';
import DiseaseCard from './DiseaseCard';
import SearchBar from './SearchBar';
import './LibraryPage.css';

const LibraryPage = () => {
  const [plants, setPlants] = useState([]);
  const [filteredPlants, setFilteredPlants] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFamily, setSelectedFamily] = useState('all');
  const [selectedSeason, setSelectedSeason] = useState('all');
  const [selectedDisease, setSelectedDisease] = useState('all');
  const [loading, setLoading] = useState(true);
  const [activePlant, setActivePlant] = useState(null);

  // Charger les plantes depuis la base de données
  useEffect(() => {
    const loadPlants = () => {
      setLoading(true);
      try {
        // Tri par ordre alphabétique
        const sortedPlants = [...plantsDatabase].sort((a, b) => 
          a.nomCommun.localeCompare(b.nomCommun)
        );
        setPlants(sortedPlants);
        setFilteredPlants(sortedPlants);
        
        // Sélectionner la première plante par défaut
        if (sortedPlants.length > 0) {
          setActivePlant(sortedPlants[0]);
        }
      } catch (error) {
        console.error('Erreur lors du chargement des plantes:', error);
      } finally {
        setLoading(false);
      }
    };

    loadPlants();
  }, []);

  // Filtrer les plantes
  useEffect(() => {
    if (!plants.length) return;

    let filtered = plants;

    // Filtre par recherche
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(plant =>
        plant.nomCommun.toLowerCase().includes(query) ||
        plant.nomScientifique.toLowerCase().includes(query) ||
        plant.description.toLowerCase().includes(query) ||
        plant.maladies.some(m => m.nom.toLowerCase().includes(query))
      );
    }

    // Filtre par famille
    if (selectedFamily !== 'all') {
      filtered = filtered.filter(plant => plant.famille === selectedFamily);
    }

    // Filtre par saison
    if (selectedSeason !== 'all') {
      filtered = filtered.filter(plant => 
        plant.saison.toLowerCase().includes(selectedSeason.toLowerCase())
      );
    }

    // Filtre par maladie
    if (selectedDisease !== 'all') {
      filtered = filtered.filter(plant =>
        plant.maladies.some(m => m.nom === selectedDisease)
      );
    }

    setFilteredPlants(filtered);
    
    // Si la plante active n'est plus dans la liste filtrée, la changer
    if (activePlant && !filtered.some(p => p.id === activePlant.id)) {
      setActivePlant(filtered.length > 0 ? filtered[0] : null);
    }
  }, [searchQuery, selectedFamily, selectedSeason, selectedDisease, plants, activePlant]);

  // Obtenir les familles uniques pour le filtre
  const getUniqueFamilies = () => {
    const families = plants.map(plant => plant.famille);
    return ['all', ...new Set(families)].sort();
  };

  // Obtenir les saisons uniques pour le filtre
  const getUniqueSeasons = () => {
    const seasons = plants.flatMap(plant => {
      const seasonStr = plant.saison.toLowerCase();
      if (seasonStr.includes('toute')) return ['toute l\'année'];
      if (seasonStr.includes('saison sèche')) return ['saison sèche'];
      if (seasonStr.includes('saison des pluies')) return ['saison des pluies'];
      if (seasonStr.includes('saison fraîche')) return ['saison fraîche'];
      return [];
    });
    return ['all', ...new Set(seasons)].filter(s => s);
  };

  // Obtenir les maladies uniques pour le filtre
  const getUniqueDiseases = () => {
    const diseases = plants.flatMap(plant => 
      plant.maladies.map(m => m.nom)
    );
    return ['all', ...new Set(diseases)].sort();
  };

  // Statistiques
  const getStatistics = () => {
    const totalPlants = plants.length;
    const totalFamilies = getUniqueFamilies().length - 1; // Exclure "all"
    const totalDiseases = getUniqueDiseases().length - 1; // Exclure "all"
    
    let totalTreatments = 0;
    plants.forEach(plant => {
      totalTreatments += plant.traitements ? plant.traitements.length : 0;
    });

    return { totalPlants, totalFamilies, totalDiseases, totalTreatments };
  };

  const statistics = getStatistics();

  // Gérer la sélection d'une plante
  const handlePlantSelect = (plant) => {
    setActivePlant(plant);
    // Scroll vers le détail de la plante
    const detailSection = document.querySelector('.plant-detail-section');
    if (detailSection) {
      detailSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Réinitialiser les filtres
  const resetFilters = () => {
    setSearchQuery('');
    setSelectedFamily('all');
    setSelectedSeason('all');
    setSelectedDisease('all');
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Chargement de la bibliothèque des plantes...</p>
      </div>
    );
  }

  return (
    <div className="library-page">
      {/* En-tête avec statistiques */}
      <div className="library-header">
        <div className="header-content">
          <h1><FaLeaf /> Bibliothèque des Plantes</h1>
          
        </div>
        
        <div className="statistics-grid">
          <div className="stat-card">
            <FaSeedling className="stat-icon" />
            <div className="stat-content">
              <h3>{statistics.totalPlants}</h3>
              <p>Plantes répertoriées</p>
            </div>
          </div>
          
          <div className="stat-card">
            <FaLeaf className="stat-icon" />
            <div className="stat-content">
              <h3>{statistics.totalFamilies}</h3>
              <p>Familles botaniques</p>
            </div>
          </div>
          
          <div className="stat-card">
            <FaBug className="stat-icon" />
            <div className="stat-content">
              <h3>{statistics.totalDiseases}</h3>
              <p>Maladies documentées</p>
            </div>
          </div>
          
          <div className="stat-card">
            <FaFlask className="stat-icon" />
            <div className="stat-content">
              <h3>{statistics.totalTreatments}</h3>
              <p>Traitements recommandés</p>
            </div>
          </div>
        </div>
      </div>

      {/* Barre de recherche et filtres */}
      <div className="search-filters-section">
        <div className="search-container">
          <SearchBar 
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            placeholder="Rechercher une plante, maladie, traitement..."
          />
        </div>

        <div className="filters-container">
          <div className="filter-group">
            <label><FaFilter /> Famille</label>
            <select 
              value={selectedFamily} 
              onChange={(e) => setSelectedFamily(e.target.value)}
            >
              {getUniqueFamilies().map(family => (
                <option key={family} value={family}>
                  {family === 'all' ? 'Toutes les familles' : family}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label><FaFilter /> Saison</label>
            <select 
              value={selectedSeason} 
              onChange={(e) => setSelectedSeason(e.target.value)}
            >
              {getUniqueSeasons().map(season => (
                <option key={season} value={season}>
                  {season === 'all' ? 'Toutes les saisons' : season}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label><FaFilter /> Maladie</label>
            <select 
              value={selectedDisease} 
              onChange={(e) => setSelectedDisease(e.target.value)}
            >
              {getUniqueDiseases().map(disease => (
                <option key={disease} value={disease}>
                  {disease === 'all' ? 'Toutes les maladies' : disease}
                </option>
              ))}
            </select>
          </div>

          <button className="reset-filters-btn" onClick={resetFilters}>
            Réinitialiser
          </button>
        </div>

        <div className="results-info">
          <p>
            {filteredPlants.length} plante{filteredPlants.length > 1 ? 's' : ''} trouvée{filteredPlants.length > 1 ? 's' : ''}
            {searchQuery && ` pour "${searchQuery}"`}
          </p>
        </div>
      </div>

      {/* Liste des plantes et détail */}
      <div className="library-content">
        {/* Liste des plantes */}
        <div className="plants-list-section">
          <h2>Plantes</h2>
          <div className="plants-grid">
            {filteredPlants.length === 0 ? (
              <div className="no-results">
                <FaSearch className="no-results-icon" />
                <h3>Aucune plante trouvée</h3>
                <p>Essayez de modifier vos critères de recherche</p>
              </div>
            ) : (
              filteredPlants.map(plant => (
                <div 
                  key={plant.id} 
                  className={`plant-card ${activePlant?.id === plant.id ? 'active' : ''}`}
                  onClick={() => handlePlantSelect(plant)}
                >
                  <div className="plant-card-header">
                    <div className="plant-icon">
                      <FaSeedling />
                    </div>
                    <div className="plant-name">
                      <h3>{plant.nomCommun}</h3>
                      <p className="scientific-name">{plant.nomScientifique}</p>
                    </div>
                  </div>
                  
                  <div className="plant-card-body">
                    <p className="description">{plant.description.substring(0, 100)}...</p>
                    
                    <div className="plant-metadata">
                      <span className="badge family">{plant.famille}</span>
                      <span className="badge season">{plant.saison}</span>
                    </div>
                    
                    <div className="plant-diseases">
                      <p className="diseases-label">Maladies courantes:</p>
                      <div className="disease-tags">
                        {plant.maladies.slice(0, 3).map((maladie, index) => (
                          <span key={index} className="disease-tag">
                            {maladie.nom}
                          </span>
                        ))}
                        {plant.maladies.length > 3 && (
                          <span className="more-diseases">
                            +{plant.maladies.length - 3}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Détail de la plante sélectionnée */}
        {activePlant && (
          <div className="plant-detail-section">
            <div className="plant-detail-card">
              <div className="plant-detail-header">
                <div className="plant-title">
                  <h2>{activePlant.nomCommun}</h2>
                  <p className="scientific-name">{activePlant.nomScientifique}</p>
                </div>
                <div className="plant-meta">
                  <span className="meta-item">
                    <strong>Famille:</strong> {activePlant.famille}
                  </span>
                  <span className="meta-item">
                    <strong>Origine:</strong> {activePlant.origine}
                  </span>
                  <span className="meta-item">
                    <strong>Saison:</strong> {activePlant.saison}
                  </span>
                  <span className="meta-item">
                    <strong>Cycle:</strong> {activePlant.cycle}
                  </span>
                </div>
              </div>

              <div className="plant-detail-content">
                {/* Description */}
                <div className="detail-section">
                  <h3>Description</h3>
                  <p>{activePlant.description}</p>
                </div>

                {/* Caractéristiques */}
                <div className="detail-section">
                  <h3>Caractéristiques</h3>
                  <div className="characteristics-grid">
                    <div className="characteristic">
                      <strong>Hauteur:</strong> {activePlant.caracteristiques.hauteur}
                    </div>
                    <div className="characteristic">
                      <strong>Port:</strong> {activePlant.caracteristiques.port}
                    </div>
                    <div className="characteristic">
                      <strong>Feuilles:</strong> {activePlant.caracteristiques.feuilles}
                    </div>
                    <div className="characteristic">
                      <strong>Fleurs:</strong> {activePlant.caracteristiques.fleurs}
                    </div>
                    <div className="characteristic">
                      <strong>Fruits:</strong> {activePlant.caracteristiques.fruits}
                    </div>
                    <div className="characteristic">
                      <strong>Croissance:</strong> {activePlant.caracteristiques.croissance}
                    </div>
                  </div>
                </div>

                {/* Culture */}
                <div className="detail-section">
                  <h3>Guide de Culture</h3>
                  <div className="culture-info">
                    <div className="culture-item">
                      <strong>Climat:</strong> {activePlant.culture.climat}
                    </div>
                    <div className="culture-item">
                      <strong>Besoin en eau:</strong> {activePlant.culture.besoinEau}
                    </div>
                    <div className="culture-item">
                      <strong>Exposition:</strong> {activePlant.culture.exposition}
                    </div>
                    <div className="culture-item">
                      <strong>Type de sol:</strong> {activePlant.culture.sol.type}
                    </div>
                    <div className="culture-item">
                      <strong>pH optimal:</strong> {activePlant.culture.sol.pH}
                    </div>
                    <div className="culture-item">
                      <strong>Période de plantation:</strong> {activePlant.culture.plantation.periode}
                    </div>
                  </div>
                  <h4>Entretien:</h4>
                  <ul className="entretien-list">
                    {activePlant.culture.entretien.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>

                {/* Maladies et traitements */}
                <div className="detail-section">
                  <h3>Maladies et Traitements</h3>
                  <div className="diseases-container">
                    {activePlant.maladies.map((maladie, index) => (
                      <DiseaseCard 
                        key={index}
                        maladie={maladie}
                        plantName={activePlant.nomCommun}
                      />
                    ))}
                  </div>

                  {activePlant.traitements && activePlant.traitements.length > 0 && (
                    <>
                      <h4>Traitements recommandés:</h4>
                      <div className="treatments-list">
                        {activePlant.traitements.map((traitement, index) => (
                          <div key={index} className="treatment-item">
                            {traitement}
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>

                {/* Récolte */}
                <div className="detail-section">
                  <h3>Récolte et Conservation</h3>
                  <div className="harvest-info">
                    <div className="harvest-item">
                      <strong>Période:</strong> {activePlant.recolte.periode}
                    </div>
                    <div className="harvest-item">
                      <strong>Signes de maturité:</strong> {activePlant.recolte.signes}
                    </div>
                    <div className="harvest-item">
                      <strong>Conservation:</strong> {activePlant.recolte.conservation}
                    </div>
                    {activePlant.recolte.rendement && (
                      <div className="harvest-item">
                        <strong>Rendement:</strong> {activePlant.recolte.rendement}
                      </div>
                    )}
                  </div>
                </div>

                {/* Valeur nutritionnelle */}
                <div className="detail-section">
                  <h3>Valeur Nutritionnelle</h3>
                  <div className="nutrition-grid">
                    <div className="nutrition-item">
                      <strong>Calories:</strong> {activePlant.valeurNutritionnelle.calories}
                    </div>
                    <div className="nutrition-item">
                      <strong>Vitamines:</strong> {activePlant.valeurNutritionnelle.vitamines}
                    </div>
                    <div className="nutrition-item">
                      <strong>Minéraux:</strong> {activePlant.valeurNutritionnelle.mineraux}
                    </div>
                    {activePlant.valeurNutritionnelle.fibres && (
                      <div className="nutrition-item">
                        <strong>Fibres:</strong> {activePlant.valeurNutritionnelle.fibres}
                      </div>
                    )}
                  </div>
                </div>

                {/* Utilisations */}
                <div className="detail-section">
                  <h3>Utilisations</h3>
                  <div className="uses-list">
                    {activePlant.utilisations.map((utilisation, index) => (
                      <div key={index} className="use-item">
                        {utilisation}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Conseils */}
                <div className="detail-section">
                  <h3>Conseils Pratiques</h3>
                  <ul className="tips-list">
                    {activePlant.conseils.map((conseil, index) => (
                      <li key={index}>{conseil}</li>
                    ))}
                  </ul>
                </div>

                {/* Liens ressources */}
                {activePlant.liensGoogle && activePlant.liensGoogle.length > 0 && (
                  <div className="detail-section">
  <h3>Ressources supplémentaires</h3>
  <div className="resources-list">
    {activePlant.liensGoogle.map((lien, index) => (
      <a key={index} href={lien.url} target="_blank" rel="noopener noreferrer" className="resource-link">
        <FaBook />
        <div>
          <strong>{lien.titre}</strong>
          <span className="resource-type">{lien.type}</span>
        </div>
      </a>
    ))}
  </div>
</div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LibraryPage;