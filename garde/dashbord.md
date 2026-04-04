/* ====== TITRE ====== */
.dashboard-title {
  display: flex;
  align-items: center;
  gap: 14px;
  font-size: 2.2rem;
  font-weight: 700;
  letter-spacing: 0.5px;
  margin-bottom: 28px;
}

/* ====== CARTE ====== */
.stat-card {
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(14px);
  border-radius: 18px;
  padding: 22px;
  display: flex;
  align-items: center;
  gap: 18px;
  transition: all 0.35s ease;
  border: 1px solid rgba(255, 255, 255, 0.15);
}

.stat-card:hover {
  transform: translateY(-6px) scale(1.02);
  box-shadow: 0 20px 45px rgba(0, 0, 0, 0.4);
  background: rgba(255, 255, 255, 0.12);
}

/* ====== CONTENU ====== */
.stat-content {
  display: flex;
  flex-direction: column;
}

.stat-value {
  font-size: 1.9rem;
  font-weight: 800;
  line-height: 1;
}

.stat-label {
  font-size: 0.95rem;
  opacity: 0.85;
  margin-top: 6px;
  letter-spacing: 0.4px;
}

/* Guide d'utilisation - Style Premium avec Vert */
.guide-card {
  background: linear-gradient(135deg, #1a3a1a, #0d240d);
  border-radius: 16px;
  padding: 24px;
  margin-top: 25px;
  color: white;
  position: relative;
  overflow: hidden;
  box-shadow: 
    0 10px 30px rgba(0, 40, 0, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(46, 125, 50, 0.3);
}

.guide-card:before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #2e7d32, #4caf50, #66bb6a);
}

.guide-card h3 {
  display: flex;
  align-items: center;
  gap: 12px;
  color: #c8e6c9;
  font-size: 1.4rem;
  margin-bottom: 20px;
  font-weight: 600;
}

.guide-card h3 svg {
  color: #4caf50;
  font-size: 1.6rem;
}

.guide-steps {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.guide-steps li {
  counter-increment: step-counter;
  padding-left: 60px;
  position: relative;
  padding-bottom: 20px;
  border-bottom: 1px solid rgba(76, 175, 80, 0.2);
}

.guide-steps li:last-child {
  border-bottom: none;
  padding-bottom: 0;
}

.guide-steps li:before {
  content: counter(step-counter);
  position: absolute;
  left: 0;
  top: 0;
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #2e7d32, #4caf50);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 1.2rem;
  box-shadow: 0 4px 12px rgba(46, 125, 50, 0.4);
}

.guide-steps li strong {
  display: block;
  font-size: 1.1rem;
  color: #e8f5e9;
  margin-bottom: 6px;
  font-weight: 500;
}

.guide-steps li p {
  color: #a5d6a7;
  margin: 0;
  line-height: 1.5;
  font-size: 0.95rem;
}

/* Panneau de résultats - Style Premium Vert */
.results-panel {
  background: linear-gradient(135deg, #ffffff, #f1f8e9);
  border-radius: 20px;
  box-shadow: 
    0 15px 35px rgba(46, 125, 50, 0.1),
    0 5px 15px rgba(76, 175, 80, 0.05);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border: 1px solid #c8e6c9;
}

.results-header {
  background: linear-gradient(135deg, #e8f5e9, #c8e6c9);
  border-bottom: 2px solid #a5d6a7;
  padding: 20px 30px;
}

.tabs-container {
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}

.tabs {
  display: inline-flex;
  gap: 4px;
  background: #e8f5e9;
  padding: 4px;
  border-radius: 12px;
  min-width: 100%;
  border: 1px solid #c8e6c9;
}

.tab {
  padding: 14px 24px;
  border: none;
  background: transparent;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 500;
  color: #2e7d32;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  white-space: nowrap;
  position: relative;
  font-size: 0.95rem;
}

.tab:hover:not(.active):not(:disabled) {
  background: rgba(76, 175, 80, 0.1);
  color: #1b5e20;
  transform: translateY(-1px);
}

.tab.active {
  background: linear-gradient(135deg, #2e7d32, #4caf50);
  color: white;
  box-shadow: 
    0 4px 6px -1px rgba(46, 125, 50, 0.3),
    0 2px 4px -1px rgba(76, 175, 80, 0.2);
}

.tab.active:before {
  content: '';
  position: absolute;
  bottom: -1px;
  left: 50%;
  transform: translateX(-50%);
  width: 20px;
  height: 3px;
  background: linear-gradient(90deg, #4caf50, #81c784);
  border-radius: 2px;
}

.tab:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.tab svg {
  font-size: 1.1rem;
}

.results-content {
  flex: 1;
  padding: 30px;
  overflow-y: auto;
  background: linear-gradient(135deg, #ffffff, #f9fbe7);
}

/* Onglet Identification - Style Premium Vert */
.identification-tab {
  min-height: 500px;
}

.welcome-message {
  text-align: center;
   left: 68;
  right: 10;
  padding: 80px;
  background: linear-gradient(135deg, #e8f5e9, #f1f8e9);
  border-radius: 16px;
  border: 2px solid #c8e6c9;
  box-shadow: 0 10px 30px rgba(46, 125, 50, 0.1);
}

.welcome-icon {
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #2e7d32, #4caf50);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 25px;
  font-size: 2.5rem;
  color: white;
  box-shadow: 0 10px 25px rgba(46, 125, 50, 0.3);
}

.welcome-message h3 {
  
  color: #1b5e20;
  font-size: 1.8rem;
  margin-bottom: 15px;
  font-weight: 700;
}

.welcome-message p {
  
  color: #2e7d32;
  max-width: 600px;
  margin: 0 auto 40px;

  line-height: 1.6;
  font-size: 1.05rem;
}

.feature-list {
  
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 12px;
  max-width: 1900px;
  margin: 0 auto;
}


.feature:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 30px rgba(46, 125, 50, 0.2);
  border-color: #4caf50;
}

.feature-icon {
  font-size: 1.8rem;
  color: #2e7d32;
  flex-shrink: 0;
}

.feature h5 {
  color: #1b5e20;
  margin-bottom: 8px;
  font-weight: 600;
  font-size: 1.1rem;
}



/* Résumé de la plante */
.plant-summary {
  background: white;
  border-radius: 16px;
  padding: 30px;
  border: 2px solid #c8e6c9;
  box-shadow: 0 10px 30px rgba(46, 125, 50, 0.1);
}

.summary-header {
  margin-bottom: 25px;
}

.plant-basic-info h3 {
  color: #1b5e20;
  font-size: 2rem;
  margin-bottom: 5px;
  font-weight: 700;
}

.scientific-name {
  color: #4caf50;
  font-style: italic;
  font-size: 1.1rem;
  margin-bottom: 20px;
  display: block;
}

.plant-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.tag {
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 500;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  border: 1px solid;
}

.tag.family {
  background: linear-gradient(135deg, #e8f5e9, #c8e6c9);
  color: #1b5e20;
  border-color: #81c784;
}

.tag.origin {
  background: linear-gradient(135deg, #f1f8e9, #dcedc8);
  color: #33691e;
  border-color: #aed581;
}

.tag.season {
  background: linear-gradient(135deg, #f9fbe7, #f0f4c3);
  color: #827717;
  border-color: #d4e157;
}

.tag.cycle {
  background: linear-gradient(135deg, #e8f5e9, #c8e6c9);
  color: #1b5e20;
  border-color: #81c784;
}

.summary-description {
  color: #2e7d32;
  line-height: 1.7;
  margin-bottom: 25px;
  font-size: 1.05rem;
  padding-bottom: 25px;
  border-bottom: 2px solid #c8e6c9;
}

.summary-images {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.plant-image {
  border-radius: 12px;
  overflow: hidden;
  height: 200px;
  position: relative;
  border: 2px solid #c8e6c9;
}

.plant-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.plant-image:hover img {
  transform: scale(1.05);
}

/* Onglet Détails - Style Premium Vert */
.details-tab {
  background: rgb(240, 245, 239);
  border-radius: 16px;
  overflow: hidden;
}

.plant-header {
  background: linear-gradient(135deg, #ffffff 0%, #ffffff 100%);
  color: rgb(228, 228, 228);
  padding: 40px 30px;
  position: relative;
  overflow: hidden;
}

.plant-header::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="none"><path fill="rgba(255,255,255,0.05)" d="M0,0 L100,0 L100,100 Z" /></svg>');
  background-size: cover;
}

.plant-title {
  position: relative;
  z-index: 1;
}

.plant-title h2 {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 8px;
  color: rgb(15, 11, 11);
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.plant-title .subtitle {
  font-size: 1.2rem;
  opacity: 0.9;
  font-style: italic;
  margin-bottom: 30px;
}

.plant-meta {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  position: relative;
  z-index: 1;
}

.meta-item {
  background: rgba(19, 188, 7, 0.15);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 15px;
  border: 1px solid rgba(3, 255, 58, 0.902);
  transition: all 0.3s ease;
}

.meta-item:hover {
  background: rgba(14, 65, 2, 0.941);
  transform: translateY(-2px);
}

.meta-item svg {
  font-size: 1.8rem;
  color: #294d2b;
  opacity: 0.9;
}

.meta-item div {
  flex: 1;
}

.meta-item strong {
  display: block;
  font-size: 0.9rem;
  opacity: 0.8;
  margin-bottom: 5px;
  font-weight: 500;
}

.meta-item p {
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0;
}

/* Sections extensibles */
.expandable-section {
  background: linear-gradient(135deg, #06b532, #04a62c);
  border-radius: 12px;
  border: 2px solid #00ac06;
  margin-bottom: 15px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(46, 125, 50, 0.1);
}

.section-header {
  padding: 20px 25px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  transition: all 0.3s ease;
  background: linear-gradient(135deg, #f1f8e9, #e8f5e9);
}

.section-header:hover {
  background: linear-gradient(135deg, #e8f5e9, #c8e6c9);
}

.section-title {
  display: flex;
  align-items: center;
  gap: 12px;
  color: #a5dba8;
  font-weight: 600;
  font-size: 1.1rem;
}

.section-title svg {
  color: #2e7d32;
}

.section-content {
  padding: 0 25px 25px;
  border-top: 2px solid #c8e6c9;
}

/* Grilles */
.characteristics-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 15px;
}

.char-item {
  display: flex;
  justify-content: space-between;
  padding: 12px 15px;
  background: linear-gradient(135deg, #f1f8e9, #e8f5e9);
  border-radius: 8px;
  border: 1px solid #c8e6c9;
}

.char-item strong {
  color: #2e7d32;
  font-weight: 500;
}

.char-item span {
  color: #1b5e20;
  font-weight: 600;
}

.nutrition-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
}

.nutri-item {
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 15px;
  background: linear-gradient(135deg, #e8f5e9, #c8e6c9);
  border-radius: 8px;
  border: 1px solid #a5d6a7;
}

.nutri-item strong {
  color: #1b5e20;
  font-weight: 500;
  font-size: 0.9rem;
}

.nutri-item span {
  color: #2e7d32;
  font-weight: 600;
  font-size: 1.1rem;
}

/* Listes */
.uses-list, .tips-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 12px;
}

.uses-list li, .tips-list li {
  padding: 12px 15px;
  background: linear-gradient(135deg, #f1f8e9, #e8f5e9);
  border-radius: 8px;
  border-left: 4px solid #4caf50;
  color: #2e7d32;
  line-height: 1.5;
}

.uses-list li:before {
  content: "🌿";
  margin-right: 10px;
  color: #2e7d32;
}

.tips-list li:before {
  content: "✅";
  margin-right: 10px;
  color: #4caf50;
}

.harvest-info {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}

.harvest-item {
  background: linear-gradient(135deg, #f9fbe7, #f0f4c3);
  padding: 20px;
  border-radius: 10px;
  border: 1px solid #d4e157;
}

.harvest-item strong {
  display: block;
  color: #827717;
  margin-bottom: 8px;
  font-weight: 500;
}

.harvest-item span {
  color: #5d4037;
  line-height: 1.5;
}

/* Boutons */
.btn {
  padding: 14px 28px;
  border: none;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.btn-primary {
  background: linear-gradient(135deg, #2e7d32, #4caf50);
  color: white;
  box-shadow: 0 4px 15px rgba(46, 125, 50, 0.4);
  border: 2px solid #81c784;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(46, 125, 50, 0.6);
  background: linear-gradient(135deg, #1b5e20, #2e7d32);
}

.btn-primary:active {
  transform: translateY(0);
}

/* Responsive */
@media (max-width: 1024px) {
  .guide-steps {
    gap: 15px;
  }
  
  .guide-steps li {
    padding-left: 50px;
  }
  
  .guide-steps li:before {
    width: 35px;
    height: 35px;
  }
  
  .tabs {
    display: flex;
    overflow-x: auto;
  }
  
  .tab {
    padding: 12px 20px;
    font-size: 0.9rem;
  }
  
  .feature-list {
    grid-template-columns: 1fr;
  }
  
  .plant-meta {
    grid-template-columns: 1fr 1fr;
  }
  
  .characteristics-grid,
  .nutrition-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .guide-card {
    padding: 20px;
  }
  
  .results-content {
    padding: 20px;
  }
  
  .plant-header {
    padding: 20px;
  }
  
  .plant-title h2 {
    font-size: 1.8rem;
  }
  
  .plant-meta {
    grid-template-columns: 1fr;
  }
  
  .meta-item {
    padding: 12px;
  }
  
  .btn {
    padding: 12px 20px;
    font-size: 0.9rem;
  }
}

/* Animations */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.expandable-section {
  animation: fadeIn 0.4s ease-out;
}

.tab-content {
  animation: fadeIn 0.3s ease-out;
}

/* Scrollbar personnalisée verte */
.results-content::-webkit-scrollbar {
  width: 8px;
}

.results-content::-webkit-scrollbar-track {
  background: linear-gradient(135deg, #e8f5e9, #c8e6c9);
  border-radius: 4px;
}

.results-content::-webkit-scrollbar-thumb {
  background: linear-gradient(135deg, #2e7d32, #4caf50);
  border-radius: 4px;
  border: 1px solid #c8e6c9;
}

.results-content::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(135deg, #1b5e20, #2e7d32);
}

/* Effets supplémentaires verts */
.tab.active svg {
  color: white;
}

.feature:hover .feature-icon {
  transform: scale(1.2);
  transition: transform 0.3s ease;
}

/* Effets de surbrillance verte */
.highlight-green {
  position: relative;
}

.highlight-green:after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, #4caf50, #81c784);
  border-radius: 1px;
}

/* Badges verts */
.stat-badge {
  background: linear-gradient(135deg, #2e7d32, #4caf50);
  color: white;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 500;
  display: inline-block;
  box-shadow: 0 3px 10px rgba(46, 125, 50, 0.3);
}

/* Toggle des sections extensibles */
.section-toggle {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background: linear-gradient(135deg, #c8e6c9, #a5d6a7);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  border: 1px solid #81c784;
}

.section-header:hover .section-toggle {
  background: linear-gradient(135deg, #a5d6a7, #81c784);
}

.toggle-icon {
  color: #1b5e20;
  font-size: 0.9rem;
  transition: transform 0.3s ease;
}

.section-toggle:active {
  transform: scale(0.95);
}

/* Effets de gradient vert sur les bordures */
.gradient-border {
  position: relative;
  border-radius: 16px;
  background: linear-gradient(135deg, #ffffff, #f1f8e9);
  padding: 20px;
}

.gradient-border:before {
  content: '';
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  background: linear-gradient(135deg, #2e7d32, #4caf50, #81c784);
  border-radius: 18px;
  z-index: -1;
}

/* Texte vert spécial */
.text-green-glow {
  text-shadow: 0 0 10px rgba(76, 175, 80, 0.5);
}

/* Icônes vertes animées */
.icon-green-pulse {
  animation: pulse-green 2s infinite;
}

@keyframes pulse-green {
  0% {
    box-shadow: 0 0 0 0 rgba(76, 175, 80, 0.7);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(76, 175, 80, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(76, 175, 80, 0);
  }
}

/* Effet de feuille flottante */
.leaf-effect {
  position: relative;
  overflow: hidden;
}

.leaf-effect:before {
  content: '🍃';
  position: absolute;
  font-size: 2rem;
  opacity: 0.1;
  animation: float-leaf 20s linear infinite;
}

@keyframes float-leaf {
  0% {
    transform: translate(-50px, -50px) rotate(0deg);
  }
  100% {
    transform: translate(100vw, 100vh) rotate(360deg);
  }
}

/* Styles pour l'onglet Maladies */
.diseases-tab {
  padding: 4px;
}

.diseases-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 2px solid #eef2f7;
}

.diseases-header h3 {
  color: #1e293b;
  font-size: 1.8rem;
  font-weight: 700;
}

.diseases-count {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 8px 16px;
  border-radius: 20px;
  font-weight: 600;
  font-size: 0.9rem;
}

.diseases-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 24px;
  margin-bottom: 40px;
}

.disease-card {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 6px 25px rgba(0, 0, 0, 0.1);
  border: 1px solid #eef2f7;
  transition: all 0.3s ease;
}

.disease-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 35px rgba(0, 0, 0, 0.15);
}

.disease-header {
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  padding: 20px;
  border-bottom: 1px solid #e2e8f0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.disease-header h4 {
  color: #1e293b;
  font-size: 1.3rem;
  font-weight: 600;
  margin: 0;
}

.severity-badge {
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.severity-badge.high {
  background: linear-gradient(135deg, #f56565 0%, #c53030 100%);
  color: white;
  box-shadow: 0 4px 15px rgba(245, 101, 101, 0.3);
}

.severity-badge.medium {
  background: linear-gradient(135deg, #ed8936 0%, #dd6b20 100%);
  color: white;
  box-shadow: 0 4px 15px rgba(237, 137, 54, 0.3);
}

.severity-badge.low {
  background: linear-gradient(135deg, #48bb78 0%, #38a169 100%);
  color: white;
  box-shadow: 0 4px 15px rgba(72, 187, 120, 0.3);
}

.disease-content {
  padding: 24px;
}

.disease-section {
  margin-bottom: 20px;
}

.disease-section:last-child {
  margin-bottom: 0;
}

.disease-section strong {
  display: block;
  color: #667eea;
  font-size: 1rem;
  margin-bottom: 8px;
  font-weight: 600;
}

.disease-section p {
  color: #475569;
  line-height: 1.6;
  margin: 0;
  padding-left: 16px;
  border-left: 3px solid #e2e8f0;
  padding-top: 4px;
  padding-bottom: 4px;
}

.no-diseases {
  text-align: center;
  padding: 60px 40px;
  background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
  border-radius: 16px;
  border: 2px dashed #7dd3fc;
  margin-bottom: 30px;
}

.healthy-icon {
  font-size: 4rem;
  color: #10b981;
  margin-bottom: 20px;
}

.no-diseases h4 {
  color: #047857;
  font-size: 1.5rem;
  margin-bottom: 15px;
  font-weight: 600;
}

.no-diseases p {
  color: #0c4a6e;
  max-width: 500px;
  margin: 0 auto;
  line-height: 1.6;
}

.general-treatments {
  background: white;
  border-radius: 16px;

  margin-top: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  border: 1px solid #eef2f7;
  width: 100%; /* prend toute la carte */
  box-sizing: border-box;
}

.general-treatments h4 {
  justify-content: center;   /* si le titre utilise flex (gap), centre l'alignement */
}
.general-treatments h4 {
  color: #1e293b;
  font-size: 1.3rem;
  margin-top: 0;
  margin-bottom: 20px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 10px;
}

.treatment-list {
  list-style: none;
  padding: 10;
  margin: 10;
  display: grid;
  gap: 35px;
}

.treatment-list li {
  padding: 6px 16px 16px 40px; /* espace normal pour l'icône */
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  border-radius: 10px;
  border-left: 4px solid #48bb78;
  color: #1e293b;
  position: relative;
  transition: all 0.3s ease;
  text-align: justify; /* texte bien justifié */
}

.treatment-list li:hover {
  transform: translateX(5px);
  background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%);
}

.treatment-list li:before {
  content: "💊";
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 1rem;
}

