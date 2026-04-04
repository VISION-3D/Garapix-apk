// src/routes/search.routes.js
const express = require('express');
const router = express.Router();
const PlantDisease = require('../models/PlantDisease');
const Plant = require('../models/Plant');
const Treatment = require('../models/Treatment');
const Article = require('../models/Article');
const { authenticate } = require('../middleware/auth');

// Recherche globale
router.get('/', authenticate, async (req, res) => {
  try {
    const { q, category, type, severity, sortBy } = req.query;
    
    if (!q) {
      return res.status(400).json({ error: 'Terme de recherche requis' });
    }

    const searchRegex = new RegExp(q, 'i');
    const results = {
      plants: [],
      diseases: [],
      treatments: [],
      articles: []
    };

    // Recherche dans les plantes
    if (!category || category === 'all' || category === 'plants') {
      results.plants = await Plant.find({
        $or: [
          { name: searchRegex },
          { scientificName: searchRegex },
          { description: searchRegex },
          { commonNames: searchRegex }
        ]
      }).limit(10);
    }

    // Recherche dans les maladies
    if (!category || category === 'all' || category === 'diseases') {
      const diseaseQuery = {
        $or: [
          { name: searchRegex },
          { scientificName: searchRegex },
          { description: searchRegex },
          { symptoms: searchRegex },
          { affectedPlants: searchRegex }
        ]
      };

      if (type && type !== 'all') {
        diseaseQuery.type = type;
      }

      if (severity && severity !== 'all') {
        diseaseQuery.severity = severity;
      }

      results.diseases = await PlantDisease.find(diseaseQuery).limit(10);
    }

    // Recherche dans les traitements
    if (!category || category === 'all' || category === 'treatments') {
      const treatmentQuery = {
        $or: [
          { name: searchRegex },
          { description: searchRegex },
          { activeIngredients: searchRegex },
          { targetDiseases: searchRegex }
        ]
      };

      if (type && type !== 'all') {
        treatmentQuery.type = type;
      }

      results.treatments = await Treatment.find(treatmentQuery).limit(10);
    }

    // Recherche dans les articles
    if (!category || category === 'all' || category === 'articles') {
      results.articles = await Article.find({
        $or: [
          { title: searchRegex },
          { content: searchRegex },
          { tags: searchRegex }
        ],
        published: true
      })
      .select('title excerpt category readTime publishedAt')
      .limit(10);
    }

    // Trier les résultats
    const sortResults = (array, sortBy) => {
      switch (sortBy) {
        case 'name':
          return array.sort((a, b) => a.name.localeCompare(b.name));
        case 'date':
          return array.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        case 'popularity':
          return array.sort((a, b) => (b.viewCount || 0) - (a.viewCount || 0));
        default:
          return array;
      }
    };

    // Appliquer le tri à chaque catégorie
    Object.keys(results).forEach(key => {
      results[key] = sortResults(results[key], sortBy);
    });

    res.json(results);

  } catch (error) {
    console.error('Erreur lors de la recherche:', error);
    res.status(500).json({ error: 'Erreur serveur lors de la recherche' });
  }
});

// Recherche autocomplete
router.get('/autocomplete', authenticate, async (req, res) => {
  try {
    const { q } = req.query;
    
    if (!q) {
      return res.json([]);
    }

    const searchRegex = new RegExp(q, 'i');

    const [plants, diseases, treatments] = await Promise.all([
      Plant.find({ name: searchRegex })
        .select('name scientificName')
        .limit(5),
      PlantDisease.find({ name: searchRegex })
        .select('name type')
        .limit(5),
      Treatment.find({ name: searchRegex })
        .select('name type')
        .limit(5)
    ]);

    const suggestions = [
      ...plants.map(p => ({ 
        type: 'plant', 
        name: p.name,
        scientificName: p.scientificName 
      })),
      ...diseases.map(d => ({ 
        type: 'disease', 
        name: d.name,
        category: d.type 
      })),
      ...treatments.map(t => ({ 
        type: 'treatment', 
        name: t.name,
        category: t.type 
      }))
    ];

    res.json(suggestions.slice(0, 10));
  } catch (error) {
    console.error('Erreur autocomplete:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

module.exports = router;