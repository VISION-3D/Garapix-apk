const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({ error: 'Accès non autorisé. Token manquant.' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'garapix_secret_key_dev');
    req.userId = decoded.userId;
    
    next();
  } catch (error) {
    console.error('Erreur d\'authentification:', error);
    
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ error: 'Token invalide' });
    }
    
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Token expiré' });
    }
    
    res.status(401).json({ error: 'Accès non autorisé' });
  }
};