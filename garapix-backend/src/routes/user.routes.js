// Garapix-backend/src/routes/user.routes.js
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({ message: 'Routes utilisateur' });
});

module.exports = router;