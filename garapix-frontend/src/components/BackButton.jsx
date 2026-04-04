// src/components/BackButton.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaHome, FaChevronLeft } from 'react-icons/fa';
import './BackButton.css';

const BackButton = ({ 
  to = null, 
  text = 'Retour', 
  variant = 'primary',
  icon = 'arrow',
  onClick = null,
  className = ''
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else if (to) {
      navigate(to);
    } else {
      navigate(-1);
    }
  };

  const getIcon = () => {
    switch (icon) {
      case 'home':
        return <FaHome />;
      case 'chevron':
        return <FaChevronLeft />;
      case 'arrow':
      default:
        return <FaArrowLeft />;
    }
  };

  const getVariantClass = () => {
    switch (variant) {
      case 'secondary':
        return 'back-btn-secondary';
      case 'outline':
        return 'back-btn-outline';
      case 'text':
        return 'back-btn-text';
      case 'primary':
      default:
        return 'back-btn-primary';
    }
  };

  return (
    <button
      className={`back-button ${getVariantClass()} ${className}`}
      onClick={handleClick}
      aria-label={`Retour ${text !== 'Retour' ? `à ${text}` : ''}`}
    >
      <span className="back-button-icon">
        {getIcon()}
      </span>
      <span className="back-button-text">
        {text}
      </span>
    </button>
  );
};

export default BackButton;