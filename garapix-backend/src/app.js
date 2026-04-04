// Garapix-backend/src/app.js

const express = require('express');
const cors = require('cors');
const path = require('path');
const authRoutes = require('./routes/auth.routes');
const diagnosticRoutes = require('./routes/diagnostic.routes');
const plantRoutes = require('./routes/plant.routes');
const userRoutes = require('./routes/user.routes');

const app = express();

// Middleware
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:5000'],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes de test
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Serveur Garapix en ligne',
    timestamp: new Date(),
    routes: {
      auth: '/api/auth',
      diagnostic: '/api/diagnostic',
      plants: '/api/plants'
    }
  });
});

// Routes API
app.use('/api/auth', authRoutes);
app.use('/api/diagnostic', diagnosticRoutes);
app.use('/api/plants', plantRoutes);
app.use('/api/users', userRoutes);

// Route de test pour l'historique
app.get('/api/diagnostic/test', (req, res) => {
  res.json({ 
    message: 'Route diagnostic fonctionnelle',
    timestamp: new Date()
  });
});

// Gestion des erreurs 404
app.use('/api/*', (req, res) => {
  res.status(404).json({ 
    error: 'Route API non trouvée',
    path: req.originalUrl,
    method: req.method
  });
});

// Middleware de gestion des erreurs
app.use((err, req, res, next) => {
  console.error('Erreur serveur:', err.stack);
  res.status(500).json({ 
    error: 'Erreur interne du serveur',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

module.exports = app;