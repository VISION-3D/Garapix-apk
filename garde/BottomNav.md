// src/components/BottomNavStyled.jsx
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
  Search
} from "lucide-react";

export default function BottomNavStyled() {
  const navigate = useNavigate();
  const location = useLocation();
  const [search, setSearch] = useState("");

  const navItems = [
    { label: "Home", icon: <Home size={22} />, path: "/" },
    { label: "Diagno...", icon: <Leaf size={22} />, path: "/diagnostic" },
    { label: "Biblio...", icon: <BookOpen size={22} />, path: "/library" },
    { label: "Param...", icon: <Settings size={22} />, path: "/settings" },
    { label: "Notif...", icon: <Bell size={22} />, path: "/notifications" },
    { label: "Aide", icon: <HelpCircle size={22} />, path: "/help" },
    { label: "Décon...", icon: <LogOut size={22} />, path: "/", action: () => navigate("/") }
  ];

  const handleSearch = () => {
    if (search.trim()) {
      navigate(`/search?q=${search}`);
    }
  };

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* 🔍 Barre de recherche moderne */}
      <div style={styles.searchContainer}>
        <input
          type="text"
          placeholder="Recherche intelligente…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          style={styles.searchInput}
        />
        <button onClick={handleSearch} style={styles.searchBtn}>
          <Search size={18} />
        </button>
      </div>

      {/* 🌿 Navigation futuriste */}
      <div style={styles.navContainer}>
        {navItems.map((item, index) => {
          const active = isActive(item.path);

          return (
            <button
              key={index}
              onClick={() =>
                item.action ? item.action() : navigate(item.path)
              }
              style={{
                ...styles.navBtn,
                color: active ? "#22c55e" : "#888",
                transform: active ? "translateY(-4px)" : "none"
              }}
            >
              <span
                style={{
                  ...styles.iconWrapper,
                  filter: active
                    ? "drop-shadow(0 0 8px rgba(34,197,94,0.7))"
                    : "none"
                }}
              >
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
  /* 🔍 Search */
  searchContainer: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    padding: "10px 16px",
    backdropFilter: "blur(12px)",
    background: "rgba(255,255,255,0.7)",
    display: "flex",
    gap: 8,
    zIndex: 50,
    borderBottom: "1px solid rgba(0,0,0,0.05)"
  },
  searchInput: {
    flex: 1,
    padding: "10px 14px",
    borderRadius: 12,
    border: "1px solid rgba(0,0,0,0.08)",
    fontSize: 15,
    outline: "none",
    background: "rgba(255,255,255,0.9)"
  },
  searchBtn: {
    padding: "10px 14px",
    borderRadius: 12,
    border: "none",
    background: "linear-gradient(135deg,#16a34a,#22c55e)",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    boxShadow: "0 4px 12px rgba(34,197,94,0.4)"
  },

  /* 🌿 Nav */
  navContainer: {
    position: "fixed",
    bottom: 0,
    left: 0,
    right: 0,
    height: 70,
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    backdropFilter: "blur(20px)",
    background: "rgba(255,255,255,0.75)",
    borderTop: "1px solid rgba(0,0,0,0.05)",
    boxShadow: "0 -10px 30px rgba(0,0,0,0.05)",
    zIndex: 50
  },
  navBtn: {
    flex: 1,
    height: "100%",
    border: "none",
    background: "none",
    fontSize: 12,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    gap: 4,
    transition: "all 0.3s ease",
    position: "relative"
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
    position: "absolute",
    bottom: 6,
    width: 6,
    height: 6,
    borderRadius: "50%",
    background: "#22c55e",
    boxShadow: "0 0 10px rgba(34,197,94,0.8)"
  }
};