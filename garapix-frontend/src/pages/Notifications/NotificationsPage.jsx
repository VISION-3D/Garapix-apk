// src/pages/Notifications/NotificationsPage.jsx
import React, { useState, useEffect } from 'react';
import { 
  FaBell, 
  FaTrash, 
  FaEnvelope, 
  FaCheck, 
  FaExclamationTriangle,
  FaInfoCircle,
  FaCalendar,
  FaFilter
} from 'react-icons/fa';
import './NotificationsPage.css';
// Ajouter en haut de la page Notifications
import BackButton from '../../components/BackButton';

// Modifier l'en-tête
<div className="notifications-header">
  <BackButton 
    text="Retour"
    variant="secondary"
    className="notifications-back-btn"
  />
  <div>
    <h1>
      <FaBell className="header-icon" />
      Notifications
    </h1>
    
  </div>
</div>

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState([]);
  const [filter, setFilter] = useState('all'); // 'all', 'unread', 'read'
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications = async () => {
    try {
      // Simulation - remplacer par appel API réel
      const mockNotifications = [
        
      ];
      
      setNotifications(mockNotifications);
    } catch (error) {
      console.error('Erreur lors du chargement des notifications:', error);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = (id) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, read: true }))
    );
  };

  const deleteNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  const getFilteredNotifications = () => {
    switch (filter) {
      case 'unread':
        return notifications.filter(n => !n.read);
      case 'read':
        return notifications.filter(n => n.read);
      default:
        return notifications;
    }
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'diagnostic':
        return <FaCheck className="icon-diagnostic" />;
      case 'reminder':
        return <FaCalendar className="icon-reminder" />;
      case 'alert':
        return <FaExclamationTriangle className="icon-alert" />;
      case 'error':
        return <FaExclamationTriangle className="icon-error" />;
      default:
        return <FaInfoCircle className="icon-info" />;
    }
  };

  const getNotificationColor = (type) => {
    switch (type) {
      case 'diagnostic':
        return 'var(--success-color)';
      case 'reminder':
        return 'var(--secondary-color)';
      case 'alert':
        return 'var(--warning-color)';
      case 'error':
        return 'var(--error-color)';
      default:
        return 'var(--primary-color)';
    }
  };

  if (loading) {
    return (
      <div className="notifications-loading">
        <div className="spinner"></div>
        <p>Chargement des notifications...</p>
      </div>
    );
  }

  const filteredNotifications = getFilteredNotifications();
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="notifications-page">
      <div className="notifications-header">
        <h1>
          <FaBell className="header-icon" />
          Notifications
        </h1>
        <div className="notifications-stats">
          <span className="total-count">{notifications.length} notifications</span>
          {unreadCount > 0 && (
            <span className="unread-count">{unreadCount} non lues</span>
          )}
        </div>
      </div>

      <div className="notifications-controls">
        <div className="filter-buttons">
          <button
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            Toutes
          </button>
          <button
            className={`filter-btn ${filter === 'unread' ? 'active' : ''}`}
            onClick={() => setFilter('unread')}
          >
            Non lues
          </button>
          <button
            className={`filter-btn ${filter === 'read' ? 'active' : ''}`}
            onClick={() => setFilter('read')}
          >
            Lues
          </button>
        </div>

        <div className="action-buttons">
          {unreadCount > 0 && (
            <button
              className="btn btn-secondary"
              onClick={markAllAsRead}
            >
              <FaCheck /> Tout marquer comme lu
            </button>
          )}
          {notifications.length > 0 && (
            <button
              className="btn btn-danger"
              onClick={clearAll}
            >
              <FaTrash /> Tout supprimer
            </button>
          )}
        </div>
      </div>

      {filteredNotifications.length === 0 ? (
        <div className="empty-notifications">
          <FaBell className="empty-icon" />
          <h3>Aucune notification</h3>
          <p>Vous n'avez aucune notification pour le moment</p>
        </div>
      ) : (
        <div className="notifications-list">
          {filteredNotifications.map(notification => (
            <div 
              key={notification.id} 
              className={`notification-card ${!notification.read ? 'unread' : ''}`}
              style={{ borderLeftColor: getNotificationColor(notification.type) }}
            >
              <div className="notification-icon">
                {getNotificationIcon(notification.type)}
              </div>
              
              <div className="notification-content">
                <div className="notification-header">
                  <h3 className="notification-title">{notification.title}</h3>
                  <span className="notification-time">
                    {new Date(notification.timestamp).toLocaleDateString('fr-FR', {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </span>
                </div>
                
                <p className="notification-message">{notification.message}</p>
                
                <div className="notification-footer">
                  <span className={`notification-type ${notification.type}`}>
                    {notification.type === 'diagnostic' && 'Diagnostic'}
                    {notification.type === 'reminder' && 'Rappel'}
                    {notification.type === 'alert' && 'Alerte'}
                    {notification.type === 'error' && 'Erreur'}
                    {notification.type === 'tip' && 'Conseil'}
                    {notification.type === 'update' && 'Mise à jour'}
                  </span>
                  
                  <div className="notification-actions">
                    {!notification.read && (
                      <button
                        className="btn-mark-read"
                        onClick={() => markAsRead(notification.id)}
                        title="Marquer comme lu"
                      >
                        <FaCheck />
                      </button>
                    )}
                    <button
                      className="btn-delete"
                      onClick={() => deleteNotification(notification.id)}
                      title="Supprimer"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NotificationsPage;