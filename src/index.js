import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './App.css';
import { Chart, registerables } from 'chart.js';

// Enregistrer tous les composants de Chart.js
Chart.register(...registerables);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);