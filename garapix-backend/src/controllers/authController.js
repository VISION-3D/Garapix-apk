const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Générer un token JWT
const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET || 'garapix_secret_key_dev', {
    expiresIn: '7d'
  });
};

// Validation manuelle
const validateRegister = (username, email, password) => {
  const errors = [];
  
  if (!username || username.length < 3) {
    errors.push({ field: 'username', message: 'Le nom d\'utilisateur doit contenir au moins 3 caractères' });
  }
  
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.push({ field: 'email', message: 'Veuillez fournir un email valide' });
  }
  
  if (!password || password.length < 6) {
    errors.push({ field: 'password', message: 'Le mot de passe doit contenir au moins 6 caractères' });
  }
  
  return errors;
};

// Inscription
const register = async (req, res) => {
  try {
    const { username, email, password, fullName } = req.body;

    // Validation manuelle
    const validationErrors = validateRegister(username, email, password);
    if (validationErrors.length > 0) {
      return res.status(400).json({ errors: validationErrors });
    }

    // Vérifier si l'utilisateur existe déjà
    const existingUser = await User.findOne({ 
      $or: [{ email }, { username }] 
    });

    if (existingUser) {
      return res.status(400).json({
        error: 'Un utilisateur avec cet email ou nom d\'utilisateur existe déjà'
      });
    }

    // Créer un nouvel utilisateur
    const user = new User({
      username,
      email,
      password,
      fullName
    });

    await user.save();

    // Générer le token
    const token = generateToken(user._id);

    // Retourner les informations utilisateur
    const userResponse = user.toObject();
    delete userResponse.password;

    res.status(201).json({
      message: 'Inscription réussie',
      token,
      user: userResponse
    });
  } catch (error) {
    console.error('Erreur lors de l\'inscription:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

// Connexion
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email et mot de passe requis' });
    }

    // Trouver l'utilisateur
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Email ou mot de passe incorrect' });
    }

    // Vérifier le mot de passe
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Email ou mot de passe incorrect' });
    }

    // Générer le token
    const token = generateToken(user._id);

    // Retourner les informations utilisateur
    const userResponse = user.toObject();
    delete userResponse.password;

    res.json({
      message: 'Connexion réussie',
      token,
      user: userResponse
    });
  } catch (error) {
    console.error('Erreur lors de la connexion:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

// Récupérer le profil utilisateur
const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password');
    if (!user) {
      return res.status(404).json({ error: 'Utilisateur non trouvé' });
    }
    res.json(user);
  } catch (error) {
    console.error('Erreur lors de la récupération du profil:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

// Mettre à jour le profil
const updateProfile = async (req, res) => {
  try {
    const updates = req.body;
    
    if (updates.password) {
      delete updates.password;
    }

    const user = await User.findByIdAndUpdate(
      req.userId,
      { $set: updates },
      { new: true, runValidators: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({ error: 'Utilisateur non trouvé' });
    }

    res.json({
      message: 'Profil mis à jour avec succès',
      user
    });
  } catch (error) {
    console.error('Erreur lors de la mise à jour du profil:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

module.exports = {
  register,
  login,
  getProfile,
  updateProfile
};