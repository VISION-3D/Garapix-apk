import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Home,
  Leaf,
  BookOpen,
  Settings,
  Bell,
  HelpCircle,
  LogOut,
  Search
} from "lucide-react";

export default function BottomNavStyled() {
  const navigate = useNavigate();
  const location = useLocation();
  const [search, setSearch] = useState("");
  const [searchExpanded, setSearchExpanded] = useState(false);
  const searchRef = useRef(null);

  const navItems = [
    { label: "Home", icon: <Home size={16} />, path: "/" },
    { label: "Diagn...", icon: <Leaf size={16} />, path: "/diagnostic" },
    { label: "Bibli...", icon: <BookOpen size={16} />, path: "/library" },
    { label: "Param...", icon: <Settings size={16} />, path: "/settings" },
    { label: "Notif...", icon: <Bell size={16} />, path: "/notifications" },
    { label: "Aide", icon: <HelpCircle size={16} />, path: "/help" },
    { label: "Décon...", icon: <LogOut size={16} />, path: "/", action: () => navigate("/") }
  ];

  const handleSearch = () => {
    if (search.trim()) {
      navigate(`/search?q=${search}`);
      setSearchExpanded(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchExpanded(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Barre de recherche intelligente */}
      <div ref={searchRef} style={styles.searchContainer}>
        <div style={styles.searchInner}>
          <button
            style={styles.searchIconButton}
            onClick={() => setSearchExpanded(!searchExpanded)}
          >
            <Search size={20} color={searchExpanded ? "#22c55e" : "#888"} />
          </button>
          {searchExpanded && (
            <>
              <input
                type="text"
                placeholder="Recherche intelligente…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={handleKeyDown}
                style={styles.searchInput}
                autoFocus
              />
              <button onClick={handleSearch} style={styles.searchBtn}>
                <Search size={18} />
              </button>
            </>
          )}
        </div>
      </div>

      {/* Navigation */}
      <div style={styles.navContainer}>
        {navItems.map((item, index) => {
          const active = isActive(item.path);
          return (
            <button
              key={index}
              onClick={() => (item.action ? item.action() : navigate(item.path))}
              style={{
                ...styles.navBtn,
                color: active ? "#22c55e" : "#888",
                transform: active ? "translateY(-4px)" : "none"
              }}
            >
              <span style={{
                ...styles.iconWrapper,
                filter: active ? "drop-shadow(0 0 8px rgba(34,197,94,0.7))" : "none"
              }}>
                {item.icon}
              </span>
              <span style={styles.label}>{item.label}</span>
              {active && <div style={styles.activeIndicator} />}
            </button>
          );
        })}
      </div>
    </>
  );
}

const styles = {
  searchContainer: {
    position: "fixed",
    top: 50,
    left: 0,
    right: 0,
    height: 30,
    zIndex: 100,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    pointerEvents: "none",
    padding: "0 16px",
  },
  searchInner: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    background: "rgba(255,255,255,0.7)",
    backdropFilter: "blur(12px)",
    borderRadius: 40,
    padding: "4px 4px 4px 12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    border: "1px solid rgba(0,0,0,0.05)",
    pointerEvents: "auto",
    width: "auto",
    transition: "width 0.3s ease, background 0.2s",
    maxWidth: 600,
  },


searchContainer: {
  position: "fixed",
  top: 30,
  left: 0,
  right: 0,
  height: 60,
  zIndex: 100,
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end", // ← alignement à droite
  pointerEvents: "none",
  padding: "0 16px",
},








  searchIconButton: {
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: 8,
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "background 0.2s",
    ':hover': {
      background: "rgba(0,0,0,0.05)"
    }
  },
  searchInput: {
    flex: 1,
    padding: "10px 0",
    border: "none",
    fontSize: 15,
    outline: "none",
    background: "transparent",
    minWidth: 200,
  },
  searchBtn: {
    padding: "8px 16px",
    borderRadius: 30,
    border: "none",
    background: "linear-gradient(135deg,#16a34a,#22c55e)",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    boxShadow: "0 4px 12px rgba(34,197,94,0.4)",
  },

  /* 🌿 Nav */
  navContainer: {
    position: "fixed",
    bottom: 0,
    left: 0,
    right: 0,
    height: 155,
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    backdropFilter: "blur(20px)",
    background: "rgba(255,255,255,0.75)",
    borderTop: "1px solid rgba(0,0,0,0.05)",
    boxShadow: "0 -10px 30px rgba(0,0,0,0.05)",
    zIndex: 50
  },
navContainer: {
  position: "fixed",
  bottom: 0,
  left: 0,
  right: 0,
  height: 105,
  display: "flex",
  justifyContent: "space-around",
  alignItems: "flex-start", // ← alignement en haut
  backdropFilter: "blur(20px)",
  background: "rgba(255,255,255,0.75)",
  borderTop: "1px solid rgba(0,0,0,0.05)",
  boxShadow: "0 -10px 30px rgba(0,0,0,0.05)",
  zIndex: 50,
  paddingTop: "8px", // ← espace en haut
},
navBtn: {
  flex: 1,
  height: "100%",
  border: "none",
  background: "none",
  fontSize: 12,
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start", // ← aligne le contenu en haut du bouton
  alignItems: "center",
  cursor: "pointer",
  gap: 4,
  transition: "all 0.3s ease",
  position: "relative",
  paddingTop: 0, // ← pas de padding supplémentaire
},
  iconWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  label: {
    fontSize: 11,
    fontWeight: 500
  },
  activeIndicator: {
    position: "",
    bottom: 6,
    width: 6,
    height: 6,
    borderRadius: "30%",
    background: "#22c55e",
    boxShadow: "0 0 10px rgba(34,197,94,0.8)"
  }
};