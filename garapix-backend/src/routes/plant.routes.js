// Garapix-backend/src/routes/plant.routes.js
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    plants: [
      { _id: '1', name: 'Tomate', scientificName: 'Solanum lycopersicum' },
      { _id: '2', name: 'Rosier', scientificName: 'Rosa spp.' }
    ]
  });
});

module.exports = router;