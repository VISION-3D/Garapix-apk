require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const axios = require('axios');
const FormData = require('form-data');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({ origin: '*', credentials: true }));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Connexion MongoDB Atlas
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ Connecté à MongoDB Atlas'))
.catch(err => console.error('❌ Erreur MongoDB:', err));

// Modèle User
const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  resetToken: String,
  resetTokenExpiry: Date,
  createdAt: { type: Date, default: Date.now }
});

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.comparePassword = async function(password) {
  return bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', userSchema);

// Middleware d'authentification
const authenticate = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) return res.status(401).json({ error: 'Accès non autorisé' });
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId).select('-password');
    if (!user) return res.status(401).json({ error: 'Utilisateur non trouvé' });
    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Token invalide ou expiré' });
  }
};
// ===== Base Plantes et Maladies =====
const plantsDatabase = [
  {
    id: 1,
    nomCommun: "Tomate",
    maladies: [
      { nom: "Mildiou", symptomes: ["taches brunes", "feuilles flétries"], traitement: "Fongicide bio" },
      { nom: "Oïdium", symptomes: ["poudre blanche"], traitement: "Soufre" }
    ],
    images: ["https://via.placeholder.com/200x150"]
  },
  // ajoute tes 26 plantes et 78 maladies ici...
];

// ===== Routes d'authentification =====
app.post('/api/auth/register', async (req, res) => {
  try {
    const { prenom, nom, email, password } = req.body;
    if (!prenom || !nom || !email || !password) return res.status(400).json({ error: 'Tous les champs sont requis' });

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ error: 'Email déjà utilisé' });

    const user = new User({ firstName: prenom, lastName: nom, email, password });
    await user.save();

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.status(201).json({ message: 'Inscription réussie', token, user: { id: user._id, prenom, nom, email } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: 'Email et mot de passe requis' });

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ error: 'Email ou mot de passe incorrect' });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(401).json({ error: 'Email ou mot de passe incorrect' });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ message: 'Connexion réussie', token, user: { id: user._id, prenom: user.firstName, nom: user.lastName, email } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

app.get('/api/auth/profile', authenticate, (req, res) => {
  res.json(req.user);
});

app.post('/api/auth/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: 'Utilisateur non trouvé' });

    const resetToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '15m' });
    user.resetToken = resetToken;
    user.resetTokenExpiry = Date.now() + 15*60*1000;
    await user.save();

    console.log(`🔐 Token de réinitialisation pour ${email}: ${resetToken}`);
    res.json({ message: 'Token de réinitialisation généré. Vérifiez la console.' });
  } catch (err) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

app.post('/api/auth/reset-password', async (req, res) => {
  try {
    const { token, newPassword } = req.body;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);
    if (!user) return res.status(404).json({ error: 'Utilisateur non trouvé' });
    if (user.resetToken !== token || user.resetTokenExpiry < Date.now()) {
      return res.status(400).json({ error: 'Token invalide ou expiré' });
    }

    user.password = newPassword;
    user.resetToken = null;
    user.resetTokenExpiry = null;
    await user.save();

    res.json({ message: 'Mot de passe réinitialisé avec succès' });
  } catch (err) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// ===== Routes publiques pour les plantes =====
app.get('/api/plants', (req, res) => {
  res.json({ plants: plantsDatabase, total: plantsDatabase.length });
});

app.get('/api/plants/:id', (req, res) => {
  const plant = plantsDatabase.find(p => p.id == req.params.id);
  if (!plant) return res.status(404).json({ error: 'Plante non trouvée' });
  res.json(plant);
});

// ===== ROUTES DIAGNOSTIC =====

// 1️⃣ Identifier la plante via PlantNet (avec fallback local)
app.post('/api/identify/plant', async (req, res) => {
  try {
    const { imageBase64 } = req.body;
    if (!imageBase64) return res.status(400).json({ error: 'Image requise' });

    // Tentative d'appel à PlantNet
    let plantnetResult = null;
    let useFallback = false;

    try {
      const imageBuffer = Buffer.from(imageBase64, 'base64');
      const form = new FormData();
      form.append('images', imageBuffer, { filename: 'image.jpg', contentType: 'image/jpeg' });

      const plantnetUrl = `https://my-api.plantnet.org/v2/identify/all?api-key=${process.env.PLANTNET_API_KEY}`;
      const response = await axios.post(plantnetUrl, form, { headers: form.getHeaders() });
      plantnetResult = response.data;
      console.log('✅ PlantNet success');
    } catch (err) {
      console.warn('⚠️ PlantNet error, using fallback:', err.message);
      useFallback = true;
    }

    // Si PlantNet a échoué, on utilise la base locale
    if (useFallback || !plantnetResult || !plantnetResult.results || plantnetResult.results.length === 0) {
      // Simuler une identification en prenant une plante aléatoire de la base
      const randomIndex = Math.floor(Math.random() * plantsDatabase.length);
      const randomPlant = plantsDatabase[randomIndex];
      const fakeResult = {
        results: [
          {
            species: {
              scientificName: randomPlant.nomScientifique,
              commonName: randomPlant.nomCommun,
              family: { scientificName: randomPlant.famille }
            },
            score: 0.85 + Math.random() * 0.1,
            images: [{ url: randomPlant.images?.[0] || '' }]
          }
        ]
      };
      return res.json({ results: fakeResult.results, fallback: true });
    }

    res.json({ results: plantnetResult.results });
  } catch (err) {
    console.error('❌ PlantNet error:', err.message);
    if (err.response) console.error('Data:', err.response.data);
    res.status(500).json({ error: 'Impossible d\'identifier la plante', details: err.message });
  }
});

// 2️⃣ Diagnostiquer maladie (sans dépendre de PlantDoc)
app.post('/api/diagnose/plant', authenticate, async (req, res) => {
  try {
    const { imageBase64, plantName } = req.body;
    if (!imageBase64 || !plantName) {
      return res.status(400).json({ error: 'Image et nom de plante requis' });
    }

    // Recherche de la plante dans la base locale
    const plant = plantsDatabase.find(p => p.nomCommun.toLowerCase() === plantName.toLowerCase());
    let matchedDisease = null;

    if (plant && plant.maladies && plant.maladies.length > 0) {
      matchedDisease = plant.maladies[0]; // première maladie par défaut
    }

    res.json({
      plantName,
      plantDocPrediction: { disease: 'Non disponible (service externe indisponible)', confidence: 0 },
      matchedDisease: matchedDisease || { nom: 'Aucune maladie référencée', traitement: 'Consultez un expert' }
    });
  } catch (err) {
    console.error('❌ Diagnostic error:', err.message);
    res.status(500).json({ error: 'Impossible de diagnostiquer la plante' });
  }
});

// ===== Health Check =====
app.get('/api/health', (req, res) => res.json({ status: 'OK', timestamp: new Date() }));

// ===== Gestion des erreurs 404 =====
app.use('/api/*', (req, res) => {
  res.status(404).json({ error: 'Route API non trouvée' });
});

// ===== Démarrage serveur =====
app.listen(PORT, () => {
  console.log(`🚀 GarapiX backend en ligne sur port ${PORT}`);
  console.log(`📡 Routes disponibles:`);
  console.log(`   POST /api/auth/register`);
  console.log(`   POST /api/auth/login`);
  console.log(`   GET  /api/auth/profile (protégé)`);
  console.log(`   POST /api/auth/forgot-password`);
  console.log(`   POST /api/auth/reset-password`);
  console.log(`   GET  /api/plants`);
  console.log(`   GET  /api/plants/:id`);
  console.log(`   POST /api/identify/plant (nécessite clé PlantNet)`);
  console.log(`   POST /api/diagnose/plant (protégé)`);
  console.log(`   GET  /api/health`);
});