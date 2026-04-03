// src/components/Header.jsx
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import {
  FaBell,
  FaSearch,
  FaUserCircle,
  FaCog,
  FaQuestionCircle,
  FaMoon,
  FaSun
} from 'react-icons/fa';
import './Header.css';

const Header = () => {
  const { user, logout } = useUser();
  const location = useLocation();
  const navigate = useNavigate();

  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [darkMode, setDarkMode] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 480);

  // Détection du resize pour mobile
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 480);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Charger les notifications (simulées)
  useEffect(() => {
    const mockNotifications = [
      { id: 1, title: 'Nouveau diagnostic', message: 'Votre analyse est terminée', read: false, timestamp: '2024-01-15T10:30:00' },
      { id: 2, title: 'Rappel', message: 'Traitez vos tomates', read: false, timestamp: '2024-01-14T14:20:00' },
      { id: 3, title: 'Conseil', message: 'Arrosez vos plantes', read: true, timestamp: '2024-01-13T09:15:00' }
    ];
    setNotifications(mockNotifications);
    setUnreadCount(mockNotifications.filter(n => !n.read).length);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle('dark-mode');
  };

  const markNotificationAsRead = (id) => {
    setNotifications(prev =>
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
    setUnreadCount(prev => Math.max(0, prev - 1));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    setUnreadCount(0);
  };

  const deleteNotification = (id) => {
    const wasUnread = notifications.find(n => n.id === id && !n.read);
    setNotifications(prev => prev.filter(n => n.id !== id));
    if (wasUnread) setUnreadCount(prev => Math.max(0, prev - 1));
  };

  return (
    <header className="app-header">
    <div className="logo" onClick={() => navigate('/')}>
  <img
    src="/logo.png"
    alt="Garapix"
    className="logo-img"
  />
</div>



      {/* Recherche */}
      <div className="header-center">
        {isMobile ? (
          <button className="search-btn-mobile" onClick={() => navigate('/search')}>
            <FaSearch />
          </button>
        ) : (
          <form className="search-container" onSubmit={handleSearch}>
            <div className="search-input-wrapper">
              <FaSearch className="search-icon" />
              <input
                type="text"
                className="search-input"
                placeholder="Rechercher plantes, maladies, traitements..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
            </div>
            <button type="submit" className="search-button">Rechercher</button>
          </form>
        )}
      </div>

      {/* Actions */}
      <div className="header-right">
        {/* Mode sombre */}
        <button className="action-btn" onClick={toggleDarkMode} title={darkMode ? 'Mode clair' : 'Mode sombre'}>
          {darkMode ? <FaSun /> : <FaMoon />}
        </button>

        {/* Aide */}
        <button className="action-btn" onClick={() => navigate('/help')} title="Aide">
          <FaQuestionCircle />
        </button>

        {/* Notifications */}
        <div className="notification-container">
          <button
            className="action-btn notification-btn"
            onClick={() => setShowNotifications(!showNotifications)}
            title="Notifications"
          >
            <FaBell />
            {unreadCount > 0 && <span className="notification-badge">{unreadCount}</span>}
          </button>

          {showNotifications && (
            <div className="notification-dropdown">
              <div className="notification-header">
                <h3>Notifications</h3>
                <button className="mark-all-read" onClick={markAllAsRead} disabled={unreadCount === 0}>
                  Tout marquer comme lu
                </button>
              </div>
              <div className="notification-list">
                {notifications.length === 0 ? <p>Aucune notification</p> : notifications.map(n => (
                  <div key={n.id} className={`notification-item ${!n.read ? 'unread' : ''}`} onClick={() => markNotificationAsRead(n.id)}>
                    <div className="notification-content">
                      <div className="notification-title">{n.title}{!n.read && <span className="unread-dot" />}</div>
                      <div className="notification-message">{n.message}</div>
                      <div className="notification-time">{new Date(n.timestamp).toLocaleDateString('fr-FR')}</div>
                    </div>
                    <button className="delete-notification" onClick={e => { e.stopPropagation(); deleteNotification(n.id); }}>×</button>
                  </div>
                ))}
              </div>
              <div className="notification-footer">
                <button className="view-all" onClick={() => { navigate('/notifications'); setShowNotifications(false); }}>Voir toutes</button>
              </div>
            </div>
          )}
        </div>

        {/* Paramètres */}
        <button className="action-btn" onClick={() => navigate('/settings')} title="Paramètres">
          <FaCog />
        </button>

        {/* Menu utilisateur */}
        <div className="user-menu-container">
          <button className="user-btn" onClick={() => setShowUserMenu(!showUserMenu)}>
            <FaUserCircle className="user-icon" />
           
          </button>
          {showUserMenu && (
            <div className="user-dropdown">
             
              <div className="dropdown-divider" />
              <button className="dropdown-item" onClick={() => { navigate('/profile'); setShowUserMenu(false); }}>Mon profil</button>
              <button className="dropdown-item" onClick={() => { navigate('/settings'); setShowUserMenu(false); }}>Paramètres</button>
              <div className="dropdown-divider" />
              <button className="dropdown-item logout-item" onClick={() => { logout(); navigate('/login'); }}>Déconnexion</button>
            </div>
          )}
        </div>
      </div>
    
  </header>
  
  );
};

export default Header;
