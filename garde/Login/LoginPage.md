import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import { FaLeaf, FaUser, FaLock, FaEnvelope, FaEye, FaEyeSlash } from 'react-icons/fa';
import toast from 'react-hot-toast';
import './LoginPage.css';

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState({ strength: 0, text: '', level: '' });
  const [formData, setFormData] = useState({
    prenom: '',
    nom: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const { login, register } = useUser();
  const navigate = useNavigate();

  // Au chargement, récupérer l'email sauvegardé si présent
  useEffect(() => {
    const savedEmail = localStorage.getItem('rememberedEmail');
    if (savedEmail) {
      setFormData(prev => ({ ...prev, email: savedEmail }));
      setRememberMe(true);
    }
  }, []);

  // Évaluation de la force du mot de passe
  const evaluatePasswordStrength = (password) => {
    if (!password) return { strength: 0, text: '', level: '' };
    
    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    
    if (strength <= 1) return { strength: 25, text: 'Faible', level: 'weak' };
    if (strength <= 2) return { strength: 50, text: 'Moyen', level: 'medium' };
    if (strength <= 3) return { strength: 75, text: 'Fort', level: 'strong' };
    return { strength: 100, text: 'Très fort', level: 'strong' };
  };

  useEffect(() => {
    if (!isLogin) {
      setPasswordStrength(evaluatePasswordStrength(formData.password));
    }
  }, [formData.password, isLogin]);

  const validateForm = () => {
    const newErrors = {};

    if (!isLogin) {
      if (!formData.prenom.trim()) newErrors.prenom = 'Le prénom est requis';
      if (!formData.nom.trim()) newErrors.nom = 'Le nom est requis';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'L\'email est requis';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email invalide';
    }

    if (!formData.password) {
      newErrors.password = 'Le mot de passe est requis';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Le mot de passe doit contenir au moins 8 caractères';
    }

    if (!isLogin && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Les mots de passe ne correspondent pas';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);

    try {
      if (isLogin) {
        const result = await login(formData.email, formData.password, rememberMe);
        if (result.success) {
          // Gérer le "Se souvenir de moi"
          if (rememberMe) {
            localStorage.setItem('rememberedEmail', formData.email);
          } else {
            localStorage.removeItem('rememberedEmail');
          }
          navigate('/');
        }
      } else {
        const userData = {
          prenom: formData.prenom,
          nom: formData.nom,
          email: formData.email,
          password: formData.password
        };
        const result = await register(userData);
        if (result.success) {
          navigate('/');
        }
      }
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const resetForm = () => {
    setFormData({ 
      prenom: '', 
      nom: '', 
      email: localStorage.getItem('rememberedEmail') || '', 
      password: '', 
      confirmPassword: '' 
    });
    setErrors({});
    setShowPassword(false);
    setShowConfirmPassword(false);
    setPasswordStrength({ strength: 0, text: '', level: '' });
  };

  const toggleFormMode = () => {
    setIsLogin(!isLogin);
    resetForm();
    // En changeant de mode, on conserve l'état de rememberMe (qui peut être true si email stocké)
  };

  const handleForgotPassword = () => {
    toast('Fonctionnalité de réinitialisation de mot de passe bientôt disponible !');
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
            <div className="logo-header">
              </div>
  <div className="logo-large">
  <div className="logo-glow-container">
    <img src="/logo1.png" alt="Garapix Logo" className="logo-image" />
    <div className="wave-ring wave1"></div>
    <div className="wave-ring wave2"></div>
    <div className="wave-ring wave3"></div>
  </div>
  <h1 className="logo-text">Garapix</h1>
</div>
          <p>IDENTIFICATION DES MALADIES D'UNE PLANTE À PARTIR D'IMAGES</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          {!isLogin && (
            <>
              <div className="form-group">
                <label className="form-label"><FaUser className="icon" /> Prénom</label>
                <input
                  type="text"
                  name="prenom"
                  value={formData.prenom}
                  onChange={handleChange}
                  className={`form-control ${errors.prenom ? 'error' : ''}`}
                  placeholder="Votre prénom"
                  disabled={loading}
                  autoComplete="given-name"
                />
                {errors.prenom && <span className="error-message">{errors.prenom}</span>}
              </div>
              <div className="form-group">
                <label className="form-label"><FaUser className="icon" /> Nom</label>
                <input
                  type="text"
                  name="nom"
                  value={formData.nom}
                  onChange={handleChange}
                  className={`form-control ${errors.nom ? 'error' : ''}`}
                  placeholder="Votre nom"
                  disabled={loading}
                  autoComplete="family-name"
                />
                {errors.nom && <span className="error-message">{errors.nom}</span>}
              </div>
            </>
          )}

          <div className="form-group">
            <label className="form-label"><FaEnvelope className="icon" /> Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`form-control ${errors.email ? 'error' : ''}`}
              placeholder="Entrez votre email"
              disabled={loading}
              autoComplete="email"
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label className="form-label"><FaLock className="icon" /> Mot de passe</label>
            <div className="password-input-container">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`form-control ${errors.password ? 'error' : ''}`}
                placeholder="Entrez votre mot de passe"
                disabled={loading}
                autoComplete={isLogin ? "current-password" : "new-password"}
              />
              <button
                type="button"
                className="password-toggle-btn"
                onClick={() => setShowPassword(!showPassword)}
                disabled={loading}
                aria-label={showPassword ? "Masquer" : "Afficher"}
                title={showPassword ? "Masquer" : "Afficher"}
              >
                {showPassword ? <FaEyeSlash className="eye-icon" /> : <FaEye className="eye-icon" />}
              </button>
            </div>
            {errors.password && <span className="error-message">{errors.password}</span>}
            {!isLogin && formData.password && (
              <>
                <div className={`password-strength ${passwordStrength.level}`}>
                  <div className="password-strength-bar" style={{ width: `${passwordStrength.strength}%` }} />
                </div>
                <div className="password-strength-text">
                  Force du mot de passe: {passwordStrength.text}
                </div>
              </>
            )}
          </div>

          {/* Case à cocher "Se souvenir de moi" (connexion uniquement) */}
          {isLogin && (
            <div className="remember-me">
              <input
                type="checkbox"
                id="rememberMe"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                disabled={loading}
              />
              <label htmlFor="rememberMe">Se souvenir de moi</label>
            </div>
          )}

          {/* Lien mot de passe oublié */}
          {isLogin && (
            <div className="forgot-password">
              <button 
                type="button" 
                className="forgot-password-link" 
                onClick={handleForgotPassword}
                disabled={loading}
              >
                Mot de passe oublié ?
              </button>
            </div>
          )}

          {!isLogin && (
            <div className="form-group">
              <label className="form-label"><FaLock className="icon" /> Confirmer</label>
              <div className="password-input-container">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`form-control ${errors.confirmPassword ? 'error' : ''}`}
                  placeholder="Confirmez votre mot de passe"
                  disabled={loading}
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  className="password-toggle-btn"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  disabled={loading}
                  aria-label={showConfirmPassword ? "Masquer" : "Afficher"}
                  title={showConfirmPassword ? "Masquer" : "Afficher"}
                >
                  {showConfirmPassword ? <FaEyeSlash className="eye-icon" /> : <FaEye className="eye-icon" />}
                </button>
              </div>
              {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
            </div>
          )}

          <button type="submit" className="btn btn-primary login-button" disabled={loading}>
            {loading ? 'Chargement...' : isLogin ? 'Se connecter' : 'S\'inscrire'}
          </button>
        </form>

        <div className="login-footer">
          <p>
            {isLogin ? 'Pas encore de compte ?' : 'Déjà un compte ?'}
            <button type="button" className="switch-button" onClick={toggleFormMode} disabled={loading}>
              {isLogin ? 'S\'inscrire' : 'Se connecter'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;