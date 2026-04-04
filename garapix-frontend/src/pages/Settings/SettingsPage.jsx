import React, { useState, useEffect } from 'react';
import { useUser } from '../../context/UserContext';
import { 
  FaSave, 
  FaBell, 
  FaGlobe, 
  FaLock, 
  FaEye, 
  FaEyeSlash,
  FaMoon,
  FaSun
} from 'react-icons/fa';
import BackButton from '../../components/BackButton';
import './SettingsPage.css';

const SettingsPage = () => {
  const { user, updateProfile } = useUser();
  const [settings, setSettings] = useState({
    notifications: {
      email: true,
      push: true,
      diagnosticResults: true,
      weeklyTips: false
    },
    privacy: {
      profileVisible: true,
      shareDiagnostics: false,
      locationTracking: false
    },
    preferences: {
      language: 'fr',
      theme: 'light',
      fontSize: 'medium'
    }
  });
  const [password, setPassword] = useState({
    current: '',
    new: '',
    confirm: ''
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });
  const [saving, setSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState('');

  // Charger les préférences depuis localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    const savedLang = localStorage.getItem('language') || 'fr';
    const savedFontSize = localStorage.getItem('fontSize') || 'medium';
    setSettings(prev => ({
      ...prev,
      preferences: {
        language: savedLang,
        theme: savedTheme,
        fontSize: savedFontSize
      }
    }));
  }, []);

  // Appliquer le thème au body
  useEffect(() => {
    if (settings.preferences.theme === 'dark') {
      document.body.classList.add('dark-theme');
      document.body.classList.remove('light-theme');
    } else {
      document.body.classList.add('light-theme');
      document.body.classList.remove('dark-theme');
    }
    localStorage.setItem('theme', settings.preferences.theme);
  }, [settings.preferences.theme]);

  // Sauvegarder la langue
  useEffect(() => {
    localStorage.setItem('language', settings.preferences.language);
  }, [settings.preferences.language]);

  // Sauvegarder et appliquer la taille de police
  useEffect(() => {
    localStorage.setItem('fontSize', settings.preferences.fontSize);
    const root = document.documentElement;
    if (settings.preferences.fontSize === 'small') {
      root.style.fontSize = '14px';
    } else if (settings.preferences.fontSize === 'medium') {
      root.style.fontSize = '16px';
    } else if (settings.preferences.fontSize === 'large') {
      root.style.fontSize = '18px';
    }
  }, [settings.preferences.fontSize]);

  const handleSettingChange = (category, key, value) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: value
      }
    }));
  };

  const handleSaveSettings = async () => {
    setSaving(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSaveStatus('Paramètres sauvegardés avec succès!');
      setTimeout(() => setSaveStatus(''), 3000);
    } catch (error) {
      setSaveStatus('Erreur lors de la sauvegarde');
    } finally {
      setSaving(false);
    }
  };

  const handlePasswordChange = async () => {
    if (password.new !== password.confirm) {
      setSaveStatus('Les mots de passe ne correspondent pas');
      return;
    }
    if (password.new.length < 6) {
      setSaveStatus('Le mot de passe doit contenir au moins 6 caractères');
      return;
    }
    setSaving(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSaveStatus('Mot de passe changé avec succès!');
      setPassword({ current: '', new: '', confirm: '' });
      setTimeout(() => setSaveStatus(''), 3000);
    } catch (error) {
      setSaveStatus('Erreur lors du changement de mot de passe');
    } finally {
      setSaving(false);
    }
  };

  // Traductions
  const translations = {
    fr: {
      preferences: "Préférences",
      language: "Langue",
      theme: "Thème",
      fontSize: "Taille du texte",
      light: "Clair",
      dark: "Sombre",
      small: "Petit",
      medium: "Moyen",
      large: "Grand"
    },
    en: {
      preferences: "Preferences",
      language: "Language",
      theme: "Theme",
      fontSize: "Font size",
      light: "Light",
      dark: "Dark",
      small: "Small",
      medium: "Medium",
      large: "Large"
    },
    es: {
      preferences: "Preferencias",
      language: "Idioma",
      theme: "Tema",
      fontSize: "Tamaño de fuente",
      light: "Claro",
      dark: "Oscuro",
      small: "Pequeño",
      medium: "Mediano",
      large: "Grande"
    },
    de: {
      preferences: "Einstellungen",
      language: "Sprache",
      theme: "Thema",
      fontSize: "Schriftgröße",
      light: "Hell",
      dark: "Dunkel",
      small: "Klein",
      medium: "Mittel",
      large: "Groß"
    }
  };

  const t = translations[settings.preferences.language] || translations.fr;

  return (
    <div className="settings-page">
      <div className="settings-header">
        <h1 className="page-title">Paramètres</h1>
      </div>

      {saveStatus && (
        <div className={`save-status ${saveStatus.includes('succès') ? 'success' : 'error'}`}>
          {saveStatus}
        </div>
      )}

      <div className="settings-grid">
        {/* Notifications */}
        <div className="settings-card">
          <div className="settings-card-header">
            <FaBell className="settings-icon" />
            <h2>Notifications</h2>
          </div>
          <div className="settings-group">
            {Object.entries(settings.notifications).map(([key, value]) => (
              <div key={key} className="setting-item">
                <div className="setting-info">
                  <h3>{key === 'email' ? 'Email' : key === 'push' ? 'Push' : key === 'diagnosticResults' ? 'Résultats' : 'Conseils'}</h3>
                  <p>Recevoir des notifications {key === 'email' ? 'par email' : key === 'push' ? 'sur l\'appareil' : key === 'diagnosticResults' ? 'de diagnostic' : 'hebdomadaires'}</p>
                </div>
                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={value}
                    onChange={(e) => handleSettingChange('notifications', key, e.target.checked)}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Confidentialité */}
        <div className="settings-card">
          <div className="settings-card-header">
            <FaLock className="settings-icon" />
            <h2>Confidentialité</h2>
          </div>
          <div className="settings-group">
            <div className="setting-item">
              <div className="setting-info">
                <h3>Profil visible</h3>
                <p>Rendre votre profil public</p>
              </div>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={settings.privacy.profileVisible}
                  onChange={(e) => handleSettingChange('privacy', 'profileVisible', e.target.checked)}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>
            <div className="setting-item">
              <div className="setting-info">
                <h3>Partager les diagnostics</h3>
                <p>Partager vos diagnostics anonymement</p>
              </div>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={settings.privacy.shareDiagnostics}
                  onChange={(e) => handleSettingChange('privacy', 'shareDiagnostics', e.target.checked)}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>
            <div className="setting-item">
              <div className="setting-info">
                <h3>Suivi de localisation</h3>
                <p>Utiliser votre position</p>
              </div>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={settings.privacy.locationTracking}
                  onChange={(e) => handleSettingChange('privacy', 'locationTracking', e.target.checked)}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>
          </div>
        </div>

        {/* Préférences */}
        <div className="settings-card">
          <div className="settings-card-header">
            <FaGlobe className="settings-icon" />
            <h2>{t.preferences}</h2>
          </div>
          <div className="settings-group">
            <div className="setting-item">
              <div className="setting-info">
                <h3>{t.language}</h3>
                <p>Langue de l'interface</p>
              </div>
              <select
                className="settings-select"
                value={settings.preferences.language}
                onChange={(e) => handleSettingChange('preferences', 'language', e.target.value)}
              >
                <option value="fr">Français</option>
                <option value="en">English</option>
                <option value="es">Español</option>
                <option value="de">Deutsch</option>
              </select>
            </div>

            <div className="setting-item">
              <div className="setting-info">
                <h3>{t.theme}</h3>
                <p>Apparence de l'interface</p>
              </div>
              <div className="theme-selector">
                <button
                  className={`theme-btn ${settings.preferences.theme === 'light' ? 'active' : ''}`}
                  onClick={() => handleSettingChange('preferences', 'theme', 'light')}
                >
                  <FaSun /> {t.light}
                </button>
                <button
                  className={`theme-btn ${settings.preferences.theme === 'dark' ? 'active' : ''}`}
                  onClick={() => handleSettingChange('preferences', 'theme', 'dark')}
                >
                  <FaMoon /> {t.dark}
                </button>
              </div>
            </div>

            <div className="setting-item">
              <div className="setting-info">
                <h3>{t.fontSize}</h3>
                <p>Taille de la police</p>
              </div>
              <select
                className="settings-select"
                value={settings.preferences.fontSize}
                onChange={(e) => handleSettingChange('preferences', 'fontSize', e.target.value)}
              >
                <option value="small">{t.small}</option>
                <option value="medium">{t.medium}</option>
                <option value="large">{t.large}</option>
              </select>
            </div>
          </div>
        </div>

        {/* Changement de mot de passe */}
        <div className="settings-card">
          <div className="settings-card-header">
            <FaLock className="settings-icon" />
            <h2>Changer le mot de passe</h2>
          </div>
          <div className="password-section">
            <div className="form-group">
              <label>Mot de passe actuel</label>
              <div className="password-input">
                <input
                  type={showPasswords.current ? "text" : "password"}
                  value={password.current}
                  onChange={(e) => setPassword(prev => ({ ...prev, current: e.target.value }))}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPasswords(prev => ({ ...prev, current: !prev.current }))}
                >
                  {showPasswords.current ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>
            <div className="form-group">
              <label>Nouveau mot de passe</label>
              <div className="password-input">
                <input
                  type={showPasswords.new ? "text" : "password"}
                  value={password.new}
                  onChange={(e) => setPassword(prev => ({ ...prev, new: e.target.value }))}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPasswords(prev => ({ ...prev, new: !prev.new }))}
                >
                  {showPasswords.new ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>
            <div className="form-group">
              <label>Confirmer</label>
              <div className="password-input">
                <input
                  type={showPasswords.confirm ? "text" : "password"}
                  value={password.confirm}
                  onChange={(e) => setPassword(prev => ({ ...prev, confirm: e.target.value }))}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPasswords(prev => ({ ...prev, confirm: !prev.confirm }))}
                >
                  {showPasswords.confirm ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>
            <button
              className="btn btn-primary"
              onClick={handlePasswordChange}
              disabled={saving || !password.current || !password.new || !password.confirm}
            >
              {saving ? 'Changement...' : 'Changer le mot de passe'}
            </button>
          </div>
        </div>
      </div>

      <div className="settings-actions">
        <button
          className="btn btn-primary save-btn"
          onClick={handleSaveSettings}
          disabled={saving}
        >
        </button>
      </div>

      <div className="footer-copyright">
        <p>© 2025 Garapix - Identification des maladies des plantes</p>
        <p>Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}</p>
      </div>
    </div>
  );
};

export default SettingsPage;