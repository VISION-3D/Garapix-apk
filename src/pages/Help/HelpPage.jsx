// src/pages/Help/HelpPage.jsx
import React, { useState } from 'react';
import { 
  FaQuestionCircle, 
  FaSearch, 
  FaBook, 
  FaVideo, 
  FaEnvelope,
  FaPhone,
  FaWhatsapp,
  FaFacebook,
  FaTwitter,
  FaYoutube
} from 'react-icons/fa';
import './HelpPage.css';
import BackButton from '../../components/BackButton';

const HelpPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('general');
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const faqCategories = {
    general: [
      {
        question: "Comment fonctionne l'application Garapix ?",
        answer: "Garapix utilise l'intelligence artificielle pour analyser les photos de vos plantes et identifier les maladies. Prenez une photo, notre système l'analyse et vous fournit un diagnostic avec des recommandations de traitement."
      },
      {
        question: "L'application est-elle gratuite ?",
        answer: "Oui, l'application de base est gratuite avec des fonctionnalités limitées. Une version premium offre des analyses plus avancées et des recommandations personnalisées."
      },
      {
        question: "Comment prendre une bonne photo pour l'analyse ?",
        answer: "Prenez la photo sous une bonne lumière naturelle, approchez-vous suffisamment pour voir les détails, focus sur la partie affectée, évitez les reflets et prenez plusieurs angles si nécessaire."
      }
    ],
    diagnostic: [
      {
        question: "Combien de temps prend l'analyse ?",
        answer: "L'analyse prend généralement entre 2 à 5 secondes selon la qualité de l'image et la complexité de la maladie."
      },
      {
        question: "Quelles maladies pouvez-vous identifier ?",
        answer: "Nous identifions plus de 100 maladies communes des plantes (fongiques, bactériennes, virales) ainsi que les carences nutritionnelles."
      },
      {
        question: "La précision du diagnostic est-elle garantie ?",
        answer: "Notre système a une précision moyenne de 94%, mais nous recommandons de consulter un expert pour les cas graves ou les traitements chimiques."
      }
    ],
    technical: [
      {
        question: "L'application fonctionne-t-elle hors ligne ?",
        answer: "L'analyse nécessite une connexion internet. Cependant, vous pouvez consulter votre historique et la bibliothèque hors ligne."
      },
      {
        question: "Puis-je utiliser l'application sur plusieurs appareils ?",
        answer: "Oui, connectez-vous avec le même compte sur différents appareils pour synchroniser vos données."
      },
      {
        question: "Comment supprimer mon compte ?",
        answer: "Rendez-vous dans Paramètres > Compte > Supprimer le compte. Cette action est irréversible."
      }
    ]
  };

  const tutorials = [
    {
      title: "Guide de prise de photo",
      description: "Apprenez à prendre les meilleures photos pour l'analyse",
      icon: <FaSearch />,
    
    },
    {
      title: "Comprendre les diagnostics",
      description: "Comment interpréter les résultats de l'analyse",
      icon: <FaBook />,
      
    },
    {
      title: "Traitements naturels",
      description: "Méthodes biologiques pour soigner vos plantes",
      icon: <FaVideo />,
     
    }
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Recherche dans la FAQ
      console.log('Recherche:', searchQuery);
    }
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    console.log('Formulaire contact:', contactForm);
    // Envoyer le formulaire à l'API
    alert('Message envoyé! Nous vous répondrons dans les 48h.');
    setContactForm({ name: '', email: '', subject: '', message: '' });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setContactForm(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="help-page">
      {/* En-tête */}
      <div className="help-header">
        <div className="help-header-content">
          <FaQuestionCircle className="help-main-icon" />
         
          <h1>Centre d'aide</h1>
          <p>Trouvez des réponses à vos questions ou contactez notre équipe</p>
          
          <form className="help-search" onSubmit={handleSearch}>
            <div className="search-input-wrapper">
              <FaSearch className="search-icon" />
              <input
                type="text"
                placeholder="Rechercher dans l'aide..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button type="submit">Rechercher</button>
          </form>
        </div>
      </div>

      <div className="help-content">
        
        {/* FAQ */}
        <section className="faq-section">
          <h2>Questions fréquentes</h2>
          
          <div className="faq-categories">
            <button
              className={`category-btn ${activeCategory === 'general' ? 'active' : ''}`}
              onClick={() => setActiveCategory('general')}
            >
              Général
            </button>
            <button
              className={`category-btn ${activeCategory === 'diagnostic' ? 'active' : ''}`}
              onClick={() => setActiveCategory('diagnostic')}
            >
              Diagnostic
            </button>
            <button
              className={`category-btn ${activeCategory === 'technical' ? 'active' : ''}`}
              onClick={() => setActiveCategory('technical')}
            >
              Technique
            </button>
          </div>

          <div className="faq-list">
            {faqCategories[activeCategory].map((item, index) => (
              <div key={index} className="faq-item">
                <h3>{item.question}</h3>
                <p>{item.answer}</p>
              </div>
            ))}
          </div>
        </section>

       

        {/* Contact */}
        <section className="contact-section">,
        
      <h2>Contactez-nous</h2> <br/>
          
          <div className="contact-methods">
            <div className="contact-card">
              <FaEnvelope className="contact-icon" />
              <h3>Email</h3>
              <p>garapix.id@gmail.com</p>
            </div>
          </div>

          <form className="contact-form" onSubmit={handleContactSubmit}>
            <h3>Formulaire de contact</h3>
            
            <div className="form-row">
              <div className="form-group">
                <label>Nom complet</label>
                <input
                  type="text"
                  name="name"
                  value={contactForm.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={contactForm.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="form-group">
             
            </div>

            <div className="form-group">
              <label>Message</label>
              <textarea
                name="message"
                value={contactForm.message}
                onChange={handleInputChange}
                rows="5"
                required
                placeholder="Décrivez votre problème ou votre question..."
              />
            </div>

            <button type="submit" className="btn btn-primary">
              <FaEnvelope /> Envoyer le message
            </button>
          </form>
        </section>

     
        
      </div>
    </div>
  );
};

export default HelpPage;