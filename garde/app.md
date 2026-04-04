// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import { Toaster } from 'react-hot-toast';

// Pages publiques
import HomePage from './pages/HomePage/HomePage';

// Pages protégées
import DiagnosticPage from './pages/Diagnostic/DiagnosticPage';
import LibraryPage from './pages/Library/LibraryPage';
import ProfilePage from './pages/Profile/ProfilePage';
import SettingsPage from './pages/Settings/SettingsPage';
import NotificationsPage from './pages/Notifications/NotificationsPage';
import HelpPage from './pages/Help/HelpPage';
import SearchPage from './pages/Search/SearchPage';
// Composant de route privée
import PrivateRoute from './components/PrivateRoute';

// Navigation (s'affiche uniquement si connecté)
import BottomNavStyled from './components/BottomNavStyled';

import './App.css';

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          {/* Pages publiques */}
          <Route path="/" element={<HomePage />} />
          {/* Pages protégées */}
          <Route
            path="/diagnostic"
            element={
              <PrivateRoute>
                <DiagnosticPage />
                <BottomNavStyled />
              </PrivateRoute>
            }
          />
          <Route
            path="/library"
            element={
              <PrivateRoute>
                <LibraryPage />
                <BottomNavStyled />
              </PrivateRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <ProfilePage />
                <BottomNavStyled />
              </PrivateRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <PrivateRoute>
                <SettingsPage />
                <BottomNavStyled />
              </PrivateRoute>
            }
          />
          <Route
            path="/notifications"
            element={
              <PrivateRoute>
                <NotificationsPage />
                <BottomNavStyled />
              </PrivateRoute>
            }
          />
          <Route
            path="/help"
            element={
              <PrivateRoute>
                <HelpPage />
                <BottomNavStyled />
              </PrivateRoute>
            }
          />
          <Route
            path="/search"
            element={
              <PrivateRoute>
                <SearchPage />
                <BottomNavStyled />
              </PrivateRoute>
            }
          />

          {/* Redirection par défaut */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <Toaster position="top-right" />
      </Router>
    </UserProvider>
  );
}

export default App;