// src/components/SidebarNav.jsx
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Home,
  Leaf,
  BookOpen,
  Settings,
  Bell,
  HelpCircle,
  LogOut,
  Search,
  Menu,
  X
} from "lucide-react";
import "./SidebarNav.css";

export default function SidebarNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const [search, setSearch] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: "Accueil", icon: <Home size={22} />, path: "/" },
    { label: "Diagnostic IA", icon: <Leaf size={22} />, path: "/diagnostic" },
    { label: "Bibliothèque", icon: <BookOpen size={22} />, path: "/library" },
    { label: "Paramètres", icon: <Settings size={22} />, path: "/settings" },
    { label: "Notifications", icon: <Bell size={22} />, path: "/notifications" },
    { label: "Aide", icon: <HelpCircle size={22} />, path: "/help" },
    { label: "Déconnexion", icon: <LogOut size={22} />, path: "/", action: () => navigate("/") }
  ];

  const handleSearch = () => {
    if (search.trim()) {
      navigate(`/search?q=${search}`);
    }
  };

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Barre de recherche en haut (commune) */}
      <div className="search-bar">
        <button 
          className="mobile-menu-toggle" 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        <div className="search-container">
          <input
            type="text"
            placeholder="Recherche intelligente…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
          <button onClick={handleSearch}>
            <Search size={18} />
          </button>
        </div>
      </div>

      {/* Sidebar pour desktop */}
      <aside className={`sidebar ${mobileMenuOpen ? "mobile-open" : ""}`}>
        <div className="sidebar-header">
  <img src="/logo1.png" alt="" className="logo-image" />
</div>
        <nav className="sidebar-nav">
          {navItems.map((item, index) => (
            <button
              key={index}
              className={`nav-item ${isActive(item.path) ? "active" : ""}`}
              onClick={() => {
                if (item.action) item.action();
                else navigate(item.path);
                setMobileMenuOpen(false);
              }}
            >
              <span className="icon">{item.icon}</span>
              <span className="label">{item.label}</span>
            </button>
          ))}
        </nav>
      </aside>

      {/* Overlay pour mobile quand le menu est ouvert */}
      {mobileMenuOpen && (
        <div className="sidebar-overlay" onClick={() => setMobileMenuOpen(false)} />
      )}
    </>
  );
}

css


/* src/components/SidebarNav.css */

:root {
  --sidebar-width: 260px;
  --header-height: 64px;
  --primary: #2e7d32;
  --primary-light: #4caf50;
  --bg: #f9fafc;
  --text: #2c3e50;
  --text-light: #7b8a9b;
  --sidebar-bg: #ffffff;
  --sidebar-hover: rgba(0, 0, 0, 0.05);
  --sidebar-active: rgba(46, 125, 50, 0.1);
}

/* Barre de recherche */
.search-bar{
  padding: 190px;
  max-width: 1500px;
  margin: 0 auto;
  min-height: 13vh;
}
.search-bar {
  display: flex;
  align-items: center;
  padding: env(safe-area-inset-top) 16px 0 16px;
  background: white;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: calc(var(--header-height) + env(safe-area-inset-top));
  z-index: 100;
  box-sizing: content-box;
}

.mobile-menu-toggle {
  display: none;
  background: none;
  border: none;
  color: var(--text);
  cursor: pointer;
  padding: 8px 12px;
  margin-right: auto;
  border-radius: 8px;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.mobile-menu-toggle:hover {
  background: rgba(0, 0, 0, 0.05);
}

.search-container {
  flex: 1;
  display: flex;
  align-items: center;
  max-width: 600px;
  margin: 0 auto;
}

.search-container input {
  flex: 1;
  padding: 10px 16px;
  border-radius: 40px 0 0 40px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-right: none;
  font-size: 15px;
  outline: none;
  background: white;
  transition: border-color 0.2s;
}

.search-container input:focus {
  border-color: var(--primary);
}

.search-container button {
  padding: 10px 20px;
  border-radius: 0 40px 40px 0;
  border: 1px solid var(--primary);
  background: var(--primary);
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s;
  height: 100%;
}

.search-container button:hover {
  background: var(--primary-light);
}

/* Sidebar (style DeepSeek) */
.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  width: var(--sidebar-width);
  height: 100vh;
  background: var(--sidebar-bg);
  border-right: 1px solid rgba(0, 0, 0, 0.05);
  padding-top: calc(var(--header-height) + env(safe-area-inset-top));
  display: flex;
  flex-direction: column;
  z-index: 90;
  transition: transform 0.3s ease;
}

.sidebar-header {
  padding: 20px 24px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}

.logo {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--primary);
}

.sidebar-nav {
  flex: 1;
  padding: 20px 8px;
  overflow-y: auto;
}

.nav-item {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 10px 16px;
  margin: 4px 0;
  border: none;
  background: none;
  border-radius: 8px;
  color: var(--text);
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
  text-align: left;
}

.nav-item:hover {
  background: var(--sidebar-hover);
  color: var(--primary);
}

.nav-item.active {
  background: var(--sidebar-active);
  color: var(--primary);
  font-weight: 500;
}

.nav-item .icon {
  flex-shrink: 0;
  width: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: currentColor;
}

.nav-item .label {
  flex: 1;
  margin-left: 12px;
  font-size: 0.95rem;
  color: inherit;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* Contenu principal */
.main-content {
  margin-left: var(--sidebar-width);
  padding-top: calc(var(--header-height) + env(safe-area-inset-top));
  min-height: 100vh;
  background: var(--bg);
  transition: margin-left 0.3s ease;
}

/* Responsive mobile (DeepSeek mobile) */
@media (max-width: 768px) {
  .mobile-menu-toggle {
    display: flex;
  }

  .search-container {
    margin-left: 0;
    max-width: none;
  }

  .sidebar {
    width: 85%;
    max-width: 320px;
    transform: translateX(-100%);
    box-shadow: none;
  }

  .sidebar.mobile-open {
    transform: translateX(0);
    box-shadow: 4px 0 20px rgba(0, 0, 0, 0.1);
  }

  .sidebar-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.3);
    z-index: 85;
  }

  .main-content {
    margin-left: 0;
  }
}

/* Pour les très petits écrans, réduire la taille des icônes et texte */
@media (max-width: 480px) {
  .nav-item .label {
    font-size: 0.85rem;
  }
  .nav-item .icon {
    width: 20px;
  }
}
/* Partie à modifier/a jouter dans votre CSS */

/* Sidebar sur mobile */
@media (max-width: 768px) {
  .sidebar {
    width: 280px;           /* Largeur fixe suffisante */
    max-width: 85%;         /* Au cas où */
    transform: translateX(-100%);
    box-shadow: none;
  }

  .sidebar.mobile-open {
    transform: translateX(0);
    box-shadow: 4px 0 20px rgba(0, 0, 0, 0.1);
  }

  /* S'assurer que les labels sont visibles */
  .nav-item .label {
    display: inline-block;  /* ou block */
    opacity: 1;
    font-size: 0.95rem;     /* Taille lisible */
    color: var(--text);     /* Couleur sombre */
    margin-left: 12px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  /* Optionnel : réduire la taille des icônes */
  .nav-item .icon {
    width: 22px;
  }
}

/* Si le texte est toujours trop petit sur très petits écrans */
@media (max-width: 480px) {
  .sidebar {
    width: 260px;
  }
  .nav-item .label {
    font-size: 0.85rem;
  }
}

.logo-image {
  height: 40px;          /* Ajustez selon la taille de votre logo */
  width: auto;
  display: block;
  margin: 0 auto;        /* Centré horizontalement (optionnel) */
}
.sidebar-header {
  padding: 20px 24px;
  border-bottom: 1px solid rgba(0,0,0,0.05);
  display: flex;
  align-items: center;
  justify-content: flex-start; /* Aligne le logo à gauche */
}

.logo-image {
  height: 40px;
  width: auto;
}

