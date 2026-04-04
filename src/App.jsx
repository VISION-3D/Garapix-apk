// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import { Toaster } from 'react-hot-toast';

import HomePage from './pages/HomePage/HomePage';
import DiagnosticPage from './pages/Diagnostic/DiagnosticPage';
import LibraryPage from './pages/Library/LibraryPage';
import ProfilePage from './pages/Profile/ProfilePage';
import SettingsPage from './pages/Settings/SettingsPage';
import NotificationsPage from './pages/Notifications/NotificationsPage';
import HelpPage from './pages/Help/HelpPage';
import SearchPage from './pages/Search/SearchPage';
import BottomNavStyled from './components/BottomNavStyled';
import './index.css';
import './App.css';

// Layout pour toutes les pages (inclut la navigation)
const MainLayout = ({ children }) => (
  <>
    {children}
    <BottomNavStyled />
  </>
);

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          {/* Page d'accueil publique */}
          <Route path="/" element={<HomePage />} />

          {/* Toutes les autres pages sont accessibles directement */}
          <Route
            path="/diagnostic"
            element={
              <MainLayout>
                <DiagnosticPage />
              </MainLayout>
            }
          />
          <Route
            path="/library"
            element={
              <MainLayout>
                <LibraryPage />
              </MainLayout>
            }
          />
          <Route
            path="/profile"
            element={
              <MainLayout>
                <ProfilePage />
              </MainLayout>
            }
          />
          <Route
            path="/settings"
            element={
              <MainLayout>
                <SettingsPage />
              </MainLayout>
            }
          />
          <Route
            path="/notifications"
            element={
              <MainLayout>
                <NotificationsPage />
              </MainLayout>
            }
          />
          <Route
            path="/help"
            element={
              <MainLayout>
                <HelpPage />
              </MainLayout>
            }
          />
          <Route
            path="/search"
            element={
              <MainLayout>
                <SearchPage />
              </MainLayout>
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