import React from 'react';
import { useNavigate } from 'react-router-dom';
import heroImage from '../../assets/images/heros.jpg';
import ParticlesBackground from '../../components/ParticlesBackground'; // import du nouveau composant
import './HomePage.css';

const HomePage = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate('/diagnostic');
  };

  return (
    <div
      className="home-page"
      style={{ backgroundImage: `url(${heroImage})` }}
    >
      <ParticlesBackground />
      <div className="hero-section">
        <div className="logo-circle">
          <img src="/logo1.png" alt="GarapiX Logo" className="hero-logo" />
        </div>
<h1 className="hero-title">Bienvenue sur</h1>
<div className="hero-logo-text">
  Garapi<span className="orange-x">X</span>
</div>

        <p>Identifiez vos plantes et découvrez des informations fiables en un clin d'œil !</p>
        <button className="start-btn" onClick={handleStart}>
          Commencer
        </button>
      </div>
    </div>
  );
};

export default HomePage;