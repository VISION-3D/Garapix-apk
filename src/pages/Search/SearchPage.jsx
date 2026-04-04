// src/pages/Search/SearchPage.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  FaSearch, 
  FaFilter, 
  FaTimes,
  FaLeaf,
  FaBug,
  FaFlask,
  FaBook,
  FaSeedling,
  FaStar,
  FaCalendar,
  FaThermometerHalf,
  FaSun,
  FaTint,
  FaSortAmountDown,
  FaExternalLinkAlt,
  FaHistory,
  FaFire,
  FaGoogle,
  FaDatabase,
  FaGlobe,
  FaLayerGroup,
  FaArrowRight,
  FaInfoCircle,
  FaExclamationTriangle,
  FaCheckCircle,
  FaCaretDown,
  FaCaretUp,
  FaTree,
  FaSpinner,
  FaEye,
  FaRecycle,
  FaUsers,
  FaSync,
  FaShieldAlt,
  FaEyeSlash

} from 'react-icons/fa';

import axios from 'axios';
import debounce from 'lodash/debounce';
import BackButton from '../../components/BackButton';
import './SearchPage.css';
import toast from 'react-hot-toast';

// Configuration Google CSE (Custom Search Engine)
const GOOGLE_CSE_ID = process.env.REACT_APP_GOOGLE_CSE_ID || 'd49b0b4f632a84e23';
const GOOGLE_API_KEY = process.env.REACT_APP_GOOGLE_API_KEY || 'AIzaSyB_wLd4tE7Gm8x6L3r6zW8v9qJXbQ1Y2Z3';

// Base de données des plantes
const plantsDatabase = [
 {
        id: 1,
        nomCommun: "Papayer ",
        nomScientifique: "Carica papaya",
        famille: "Caricaceae",
        origine: "Mexique, Amérique centrale",
        saison: "Toute l'année",
        cycle: "Vivace (5-7 ans)",
        description: "Arbre fruitier tropical à croissance rapide produisant des fruits riches en papaïne, une enzyme digestive aux propriétés médicinales.",
        caracteristiques: {
          hauteur: "3-8 mètres",
          port: "Arbre dressé à tige unique creuse",
          feuilles: "Grandes, palmées (50-70 cm), profondément lobées, pétiole long",
          fleurs: "Blanches, odorantes, dioïques (mâles et femelles sur pieds séparés)",
          fruits: "Baies ovales de 15-45 cm, orange à maturité, nombreuses graines noires",
          croissance: "Très rapide (fruits en 8-10 mois)",
          longevite: "4-7 ans"
        },
        culture: {
          climat: "Tropical humide (20-30°C), sensible au froid",
          besoinEau: "Élevé (arrosage régulier, 3-4 fois/semaine en saison sèche)",
          exposition: "Plein soleil (minimum 6h/jour)",
          sol: {
            type: "Riche, profond, bien drainé, légèrement acide",
            pH: "5.5-7.0",
            amendement: "Compost, fumier bien décomposé, cendres de bois"
          },
          plantation: {
            periode: "Début saison des pluies (avril-juin)",
            espacement: "2.5-3 m entre plants",
            profondeur: "Même niveau que le conteneur, collet au-dessus du sol"
          },
          entretien: [
            "Paillage épais (30 cm) pour conserver l'humidité",
            "Fertilisation mensuelle avec NPK 10-10-10",
            "Taille des branches basses et feuilles jaunies",
            "Protection contre le vent fort"
          ]
        },
        maladies: [
          {
            nom: "Virus de la mosaïque",
            symptoms: "Mosaïque jaune sur feuilles, déformation, nanisme",
            traitement: "Élimination immédiate plants atteints, lutte biologique contre pucerons",
            prevention: "Plants certifiés sains, rotation des cultures",
            severity: "high"
          },
          {
            nom: "Pourriture du collet",
            symptoms: "Noircissement base tige, flétrissement soudain, odeur nauséabonde",
            traitement: "Fongicides à base de cuivre (bouillie bordelaise)",
            prevention: "Bon drainage, éviter excès d'eau, sol bien aéré",
            severity: "high"
          },
          {
            nom: "Anthracnose",
            symptoms: "Taches noires circulaires sur feuilles et fruits, pourriture",
            traitement: "Fongicides systémiques (Mancozèbe)",
            prevention: "Aération, élimination débris, rotation",
            severity: "medium"
          }
        ],
        traitements: [
          "Bouillie bordelaise en prévention (15g/L)",
          "Insecticide biologique (néem) contre pucerons",
          "Rotation tous les 3 ans avec légumineuses",
          "Purin d'ortie en fertilisant foliaire"
        ],
        recolte: {
          periode: "8-10 mois après plantation",
          signes: "Fruit jaune-orange, légèrement souple au toucher, stries jaunes",
          conservation: "7-10 jours à température ambiante, 2-3 semaines au frais",
          rendement: "30-100 kg/arbre/an selon variété"
        },
        valeurNutritionnelle: {
          calories: "43 kcal/100g",
          vitamines: "Vitamine C (61mg/100g), A (950 UI), B9 (38μg)",
          mineraux: "Potassium (182mg), magnésium (21mg), calcium (24mg)",
          fibres: "2-3g/100g",
          enzymes: "Papaïne (digestive), chymopapaïne"
        },
        utilisations: [
          "Fruit frais, salades de fruits",
          "Jus, smoothies, cocktails",
          "Papaïne (enzyme digestive et attendrissante viande)",
          "Cosmétique (masques, crèmes)",
          "Feuilles en infusion (antipaludéen traditionnel)"
        ],
        conseils: [
          "Planter en zone protégée du vent (brise-vent)",
          "Éviter l'excès d'azote qui favorise les maladies",
          "Supprimer les fruits malformés ou trop nombreux",
          "Maintenir une humidité constante sans excès"
        ],
        images: [
          "https://images.unsplash.com/photo-1526318472351-c75fcf070305?w=800&h=600&fit=crop&auto=format",
          "https://images.unsplash.com/photo-1648744516162-47494804741f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODd8fHBhcGF5YXxlbnwwfHwwfHx8MA%3D%3D"
        ],
        liensGoogle: [
          {
            titre: "Fiche technique complète Papayer - FAO",
            url: "https://www.fao.org/3/ac684f/ac684f06.htm",
            type: "Officiel"
          },
          {
            titre: "Culture du papayer - Agriculture.gouv",
            url: "https://agriculture.gouv.fr/culture-papayer",
            type: "Gouvernemental"
          },
          {
            titre: "Maladies du papayer - CIRAD",
            url: "https://www.cirad.fr/ressources/publications-scientifiques/maladies-papayer",
            type: "Scientifique"
          }
        ]
      },



      
      {
        id: 2,
        nomCommun: "Tomate",
        nomScientifique: "Solanum lycopersicum",
        famille: "Solanaceae",
        origine: "Pérou, Équateur",
        saison: "Saison sèche (décembre-mai)",
        cycle: "Annuel",
        description: "Plante herbacée cultivée pour ses fruits charnus, riches en lycopène antioxydant, base de nombreuses cuisines mondiales.",
        caracteristiques: {
          hauteur: "1-2 mètres",
          port: "Tige dressée ou rampante",
          feuilles: "Composées, imparipennées, poilues, fortement odorantes",
          fleurs: "Jaunes, en grappes, autofertiles",
          fruits: "Baies de formes variées, rouges à maturité",
          croissance: "Rapide (fruits en 60-90 jours)",
          longevite: "6-8 mois"
        },
        culture: {
          climat: "Tempéré à tropical (18-30°C)",
          besoinEau: "Moyen à élevé (irrigation goutte-à-goutte recommandée)",
          exposition: "Plein soleil (minimum 8h/jour)",
          sol: {
            type: "Profond, riche, bien drainé, frais",
            pH: "5.5-7.0",
            amendement: "Compost bien mûr, fumier décomposé"
          },
          plantation: {
            periode: "Début saison sèche (novembre-décembre)",
            espacement: "50-70 cm entre plants, 80 cm entre rangs",
            profondeur: "Enterrer jusqu'aux premières feuilles"
          },
          entretien: [
            "Tuteurage obligatoire pour variétés indéterminées",
            "Pincement des gourmands",
            "Paillage pour éviter maladies du sol",
            "Fertilisation équilibrée NPK 5-10-10"
          ]
        },
        maladies: [
          {
            nom: "Mildiou (Phytophthora infestans)",
            symptoms: "Taches huileuses sur feuilles, pourriture brune des fruits",
            traitement: "Fongicides systémiques (Métalaxyl)",
            prevention: "Rotation, variétés résistantes, éviter humidité foliaire",
            severity: "high"
          },
          {
            nom: "Alternariose (Alternaria solani)",
            symptoms: "Taches concentriques brunes sur feuilles",
            traitement: "Fongicides à base de cuivre",
            prevention: "Rotation, élimination débris, bonne aération",
            severity: "medium"
          },
          {
            nom: "Oïdium (Leveillula taurica)",
            symptoms: "Poudre blanche sur feuilles",
            traitement: "Soufre mouillable, bicarbonate de potassium",
            prevention: "Espacement suffisant, arrosage au sol",
            severity: "medium"
          }
        ],
        traitements: [
          "Bouillie bordelaise préventive",
          "Purins d'ortie et de prêle",
          "Rotation de 4 ans minimum",
          "Solarisation du sol"
        ],
        recolte: {
          periode: "60-90 jours après plantation",
          signes: "Fruits fermes, couleur uniforme, se détachent facilement",
          conservation: "1-2 semaines au frais, 2-3 jours à température ambiante",
          rendement: "3-10 kg/m² selon variété"
        },
        valeurNutritionnelle: {
          calories: "18 kcal/100g",
          vitamines: "Vitamine C (14mg), A (833 UI), K (7.9μg)",
          mineraux: "Potassium (237mg), magnésium (11mg)",
          antioxydants: "Lycopène (2573μg), bêta-carotène",
          fibres: "1.2g/100g"
        },
        utilisations: [
          "Consommation fraîche (salades)",
          "Cuisine (sauces, coulis, soupes)",
          "Conserves, concentrés",
          "Jus, cocktails"
        ],
        conseils: [
          "Arroser au pied sans mouiller le feuillage",
          "Tailler pour améliorer aération et maturation",
          "Associer avec basilic, œillet d'Inde",
          "Éviter excès d'azote qui favorise maladies"
        ],
        images: [
          "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=800&h=600&fit=crop&auto=format",
          "https://images.unsplash.com/photo-1686278895718-26a2331d7297?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzA1fHx0b21hdGV8ZW58MHx8MHx8fDA%3D"
        ],
        liensGoogle: [
          {
            titre: "Guide culture tomate - INRAE",
            url: "https://www.inrae.fr/actualites/culture-tomate",
            type: "Scientifique"
          },
          {
            titre: "Maladies de la tomate - ANSES",
            url: "https://www.anses.fr/fr/content/maladies-tomate",
            type: "Officiel"
          }
        ]
      },
     

  // 🌱 MARAÎCHÈRES
  {
    id: 2,
    nomCommun: "Gombo",
    nomScientifique: "Abelmoschus esculentus",
    famille: "Malvaceae",
    origine: "Afrique de l'Ouest, Éthiopie",
    saison: "Saison des pluies (avril à septembre)",
    cycle: "Annuel (4-6 mois)",
    description: "Plante potagère tropicale cultivée pour ses fruits verts en forme de capsule, riches en mucilage utilisé comme épaississant.",
    caracteristiques: {
      hauteur: "1-2 mètres",
      port: "Plante dressée, parfois ramifiée",
      feuilles: "Grandes, palmées (10-30 cm), vert foncé, légèrement poilues",
      fleurs: "Jaunes avec centre pourpre, grandes (5-8 cm), solitaires",
      fruits: "Capsules vertes allongées (10-20 cm), anguleuses, pubescentes",
      croissance: "Rapide (fruits en 50-60 jours)",
      longevite: "Annuelle"
    },
    culture: {
      climat: "Tropical chaud (25-35°C), très sensible au froid",
      besoinEau: "Modéré (arrosage régulier mais sans excès)",
      exposition: "Plein soleil (minimum 8h/jour)",
      sol: {
        type: "Riche, profond, bien drainé, limoneux à sableux",
        pH: "6.0-6.8",
        amendement: "Fumier bien décomposé, compost riche"
      },
      plantation: {
        periode: "Avril-juin (quand sol > 20°C)",
        espacement: "40-60 cm entre plants, 70-90 cm entre rangs",
        profondeur: "2-3 cm"
      },
      entretien: [
        "Désherbage régulier",
        "Buttage des pieds pour soutien",
        "Fertilisation azotée modérée",
        "Rotation avec céréales ou légumineuses"
      ]
    },
    maladies: [
      {
        nom: "Mildiou du gombo",
        symptoms: "Taches jaunes sur feuilles, feutrage blanc au revers, dessèchement",
        traitement: "Fongicides systémiques, élimination parties atteintes",
        prevention: "Rotation 3 ans, bon espacement, aération",
        severity: "medium"
      },
      {
        nom: "Flétrissement bactérien",
        symptoms: "Flétrissement soudain, tiges brunes internes, mort rapide",
        traitement: "Peu efficace, arrachage et destruction",
        prevention: "Semences saines, sol bien drainé, rotation longue",
        severity: "high"
      },
      {
        nom: "Pourriture des racines",
        symptoms: "Jaunissement, croissance réduite, pourriture racinaire",
        traitement: "Fongicides (métalaxyl), drainage amélioré",
        prevention: "Éviter sols lourds, rotation, semis tardif",
        severity: "medium"
      }
    ],
    traitements: [
      "Bouillie bordelaise préventive",
      "Insecticide au neem contre aleurodes",
      "Purin de prêle contre mildiou",
      "Paillage pour limiter maladies sol"
    ],
    recolte: {
      periode: "50-65 jours après semis",
      signes: "Gousses jeunes (8-10 cm), tendres, cassantes",
      conservation: "2-3 jours frais, peut être congelé après blanchiment",
      rendement: "10-20 t/ha selon variété"
    },
    valeurNutritionnelle: {
      calories: "33 kcal/100g",
      vitamines: "Vitamine C (21mg), K (40μg), B9 (88μg)",
      mineraux: "Calcium (81mg), magnésium (57mg), potassium (299mg)",
      fibres: "3.2g/100g",
      mucilage: "Très riche, propriétés émollientes"
    },
    utilisations: [
      "Sauces épaissies (gombo sauce)",
      "Conserves, marinades",
      "Plats mijotés, soupes",
      "Graines torréfiées (substitut café)",
      "Jeunes feuilles en légume"
    ],
    conseils: [
      "Récolter tous les 2-3 jours pour stimuler production",
      "Ne pas laisser les gousses vieillir (deviennent fibreuses)",
      "Semer en poquets de 3-4 graines, éclaircir",
      "Protéger du vent qui casse les tiges"
    ],
    images: [
      "https://images.unsplash.com/photo-1558408525-1092038389ae?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Z29tYm98ZW58MHx8MHx8fDA%3D",
      "https://images.unsplash.com/photo-1640147062904-d104ba4a78fc?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Z29tYm98ZW58MHx8MHx8fDA%3D"
    ],
    liensGoogle: [
      {
        titre: "Culture du gombo - Guide complet FAO",
        url: "https://www.fao.org/3/x6900f/x6900f06.htm",
        type: "Officiel"
      },
      {
        titre: "Maladies du gombo - INRA",
        url: "https://www.inrae.fr/actualites/maladies-gombo",
        type: "Scientifique"
      }
    ]
  },

  {
    id: 3,
    nomCommun: "Piment",
    nomScientifique: "Capsicum spp.",
    famille: "Solanaceae",
    origine: "Amérique centrale, Mexique",
    saison: "Saison sèche (novembre à avril)",
    cycle: "Annuel (5-8 mois)",
    description: "Plante potagère produisant des fruits aux saveurs piquantes à très piquantes, riche en capsaïcine aux propriétés médicinales.",
    caracteristiques: {
      hauteur: "0.5-1.5 mètres",
      port: "Buissonnant, dressé ou étalé selon variété",
      feuilles: "Alternes, simples, ovales-lancéolées, vert moyen",
      fleurs: "Petites, blanches, étoilées, solitaires ou en grappes",
      fruits: "Baies creuses de formes variées, vert puis rouge/jaune/orange",
      croissance: "Moyenne (fruits en 70-90 jours)",
      longevite: "Annuel, parfois vivace sous climat doux"
    },
    culture: {
      climat: "Chaud (20-30°C), très sensible au gel",
      besoinEau: "Modéré (éviter humidité excessive)",
      exposition: "Plein soleil (minimum 6h/jour)",
      sol: {
        type: "Léger, riche, bien drainé, aéré",
        pH: "5.5-7.0",
        amendement: "Compost bien mûr, cendres de bois"
      },
      plantation: {
        periode: "Octobre-décembre (après pluies)",
        espacement: "40-60 cm entre plants, 60-80 cm entre rangs",
        profondeur: "0.5 cm (semis superficiel)"
      },
      entretien: [
        "Tuteurage pour variétés hautes",
        "Paillage pour conserver humidité",
        "Fertilisation phosphopotassique",
        "Élimination premières fleurs pour fortifier plante"
      ]
    },
    maladies: [
      {
        nom: "Anthracnose du piment",
        symptoms: "Taches circulaires enfoncées sur fruits, pourriture sèche",
        traitement: "Fongicides (azoxystrobine), élimination fruits atteints",
        prevention: "Rotation, semences traitées, aération",
        severity: "high"
      },
      {
        nom: "Flétrissement fusarien",
        symptoms: "Jaunissement unilatéral, flétrissement irréversible",
        traitement: "Aucun traitement efficace",
        prevention: "Variétés résistantes, rotation 4-5 ans, sol bien drainé",
        severity: "high"
      },
      {
        nom: "Mosaïque du tabac",
        symptoms: "Mosaïque sur feuilles, déformation, nanisme",
        traitement: "Élimination plantes atteintes",
        prevention: "Désinfection outils, lutte pucerons, variétés résistantes",
        severity: "medium"
      }
    ],
    traitements: [
      "Traitement semences (fongicide)",
      "Insecticides systémiques contre thrips",
      "Purin d'ortie en fertilisant",
      "Filets anti-insectes contre virus"
    ],
    recolte: {
      periode: "70-120 jours selon variété",
      signes: "Fruits fermes, couleur vive (rouge, jaune selon maturité)",
      conservation: "2-3 semaines frais, séchage pour conservation longue",
      rendement: "15-30 t/ha selon variété et soins"
    },
    valeurNutritionnelle: {
      calories: "40 kcal/100g",
      vitamines: "Vitamine C (144mg), A (952 UI), B6 (0.5mg)",
      mineraux: "Potassium (322mg), manganèse (0.2mg)",
      capsaïcine: "Variable (0-2% selon variété)",
      fibres: "1.5g/100g"
    },
    utilisations: [
      "Condiment frais ou séché",
      "Sauces piquantes (sauce piment)",
      "Conserves, marinades",
      "Médicament traditionnel (analgésique)",
      "Répulsif naturel (capsaïcine)"
    ],
    conseils: [
      "Récolter avec ciseaux pour ne pas abîmer plante",
      "Laisser quelques fruits mûrir complètement pour graines",
      "Arroser au pied sans mouiller feuillage",
      "Tailler apex pour favoriser ramification"
    ],
    images: [
      "https://images.unsplash.com/photo-1546860255-95536c19724e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cGltZW50fGVufDB8fDB8fHww ",
      " https://images.unsplash.com/photo-1518006959466-0db0b6b4c1d0?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHBpbWVudHxlbnwwfHwwfHx8MA%3D%3D"
    ],
    liensGoogle: [
      {
        titre: "Culture du piment - Guide technique",
        url: "https://www.agriculture.gouv.fr/culture-piment",
        type: "Gouvernemental"
      },
      {
        titre: "Maladies du piment - CIRAD",
        url: "https://www.cirad.fr/actualites/toutes-les-actualites/articles/2020/maladies-piment",
        type: "Scientifique"
      }
    ]
  },

  {
    id: 4,
    nomCommun: "Oignon",
    nomScientifique: "Allium cepa",
    famille: "Amaryllidaceae",
    origine: "Asie centrale",
    saison: "Saison sèche fraîche",
    cycle: "Bisannuel cultivé en annuel (4-6 mois)",
    description: "Plante potagère bulbeuse cultivée pour son bulbe comestible riche en composés sulfurés aux propriétés médicinales.",
    caracteristiques: {
      hauteur: "30-60 cm",
      port: "Plante dressée à feuilles creuses",
      feuilles: "Cylindriques, creuses, vert bleuté, base engainante",
      fleurs: "Ombelle sphérique blanc-verdâtre sur hampe florale",
      bulbe: "Tunique extérieure sèche (blanche, jaune, rouge), chair juteuse",
      croissance: "Lente (bulbes en 3-6 mois)",
      longevite: "Bisannuel"
    },
    culture: {
      climat: "Tempéré à subtropical (15-25°C), tolérant au froid",
      besoinEau: "Élevé en croissance végétative, réduit en maturation",
      exposition: "Plein soleil (minimum 6h/jour)",
      sol: {
        type: "Léger, sableux, bien drainé, riche en matière organique",
        pH: "6.0-7.0",
        amendement: "Fumier bien décomposé, cendres (potassium)"
      },
      plantation: {
        periode: "Octobre-décembre (bulbes) ou semis direct",
        espacement: "10-15 cm sur ligne, 30-40 cm entre rangs",
        profondeur: "2-3 cm (semis), bulbes affleurant"
      },
      entretien: [
        "Désherbage minutieux (racines superficielles)",
        "Arrosage régulier jusqu'à formation bulbe",
        "Arrêt arrosage 2-3 semaines avant récolte",
        "Buttage léger pour blanchiment"
      ]
    },
    maladies: [
      {
        nom: "Mildiou de l'oignon",
        symptoms: "Taches ovales grisâtres sur feuilles, pourriture bulbes",
        traitement: "Fongicides (métalaxyl, mancozèbe)",
        prevention: "Rotation 4-5 ans, espacement, variétés résistantes",
        severity: "high"
      },
      {
        nom: "Pourriture blanche (Sclerotium)",
        symptoms: "Feutrage blanc à base, flétrissement, sclérotes noirs",
        traitement: "Fongicides (iprodione), solarisation sol",
        prevention: "Drainage, pH > 7.0, rotation longue",
        severity: "high"
      },
      {
        nom: "Thrips",
        symptoms: "Feuilles argentées, ponctuations blanches, croissance réduite",
        traitement: "Insecticides systémiques, lutte biologique",
        prevention: "Filets anti-insectes, plantes pièges",
        severity: "medium"
      }
    ],
    traitements: [
      "Traitement bulbes avant plantation (fongicide)",
      "Purin de tanaisie contre thrips",
      "Rotation avec céréales",
      "Paillage pour limiter maladies sol"
    ],
    recolte: {
      periode: "4-6 mois après plantation",
      signes: "Feuilles jaunies et couchées, collet sec",
      conservation: "2-8 mois selon variété et conditions",
      rendement: "20-50 t/ha selon conditions"
    },
    valeurNutritionnelle: {
      calories: "40 kcal/100g",
      vitamines: "Vitamine C (7mg), B6 (0.1mg), B9 (19μg)",
      mineraux: "Potassium (146mg), phosphore (29mg), calcium (23mg)",
      composésSoufrés: "Alliine, allicin (antibactérien)",
      fibres: "1.7g/100g"
    },
    utilisations: [
      "Condiment frais ou cuit",
      "Conserves, marinades",
      "Médicament traditionnel (expectorant)",
      "Antiseptique naturel",
      "Base sauces, soupes"
    ],
    conseils: [
      "Ne pas planter trop profondément",
      "Éviter excès azote (favorise feuilles au détriment bulbes)",
      "Arracher par temps sec",
      "Sécher 2-3 semaines à l'ombre avant stockage"
    ],
    images: [
      "https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8T2lnbm9ufGVufDB8fDB8fHww",
      "https://images.unsplash.com/photo-1687365301009-af603af2a8a9?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDJ8fE9pZ25vbnxlbnwwfHwwfHx8MA%3D%3D"
    ],
    liensGoogle: [
      {
        titre: "Culture de l'oignon - FAO",
        url: "https://www.fao.org/3/y4355f/y4355f04.htm",
        type: "Officiel"
      },
      {
        titre: "Maladies oignon - INRAE",
        url: "https://www.inrae.fr/actualites/maladies-oignon",
        type: "Scientifique"
      }
    ]
  },

  {
    id: 5,
    nomCommun: "Aubergine africaine",
    nomScientifique: "Solanum aethiopicum",
    famille: "Solanaceae",
    origine: "Afrique tropicale",
    saison: "Saison des pluies",
    cycle: "Annuel (6-8 mois)",
    description: "Plante potagère africaine produisant des petits fruits amers très appréciés en cuisine traditionnelle, riche en antioxydants.",
    caracteristiques: {
      hauteur: "0.5-1.5 mètres",
      port: "Buissonnant, parfois épineux",
      feuilles: "Alternes, ovales à lancéolées, parfois lobées, vert foncé",
      fleurs: "Blanches, étoilées, en grappes",
      fruits: "Baies rondes ou ovales (2-5 cm), rouge-orange à maturité",
      croissance: "Moyenne (fruits en 60-80 jours)",
      longevite: "Annuel"
    },
    culture: {
      climat: "Tropical chaud (22-32°C), sensible au froid",
      besoinEau: "Modéré à élevé (arrosage régulier)",
      exposition: "Plein soleil à mi-ombre",
      sol: {
        type: "Riche, profond, bien drainé",
        pH: "5.5-6.8",
        amendement: "Fumier, compost, cendres"
      },
      plantation: {
        periode: "Avril-juin",
        espacement: "50-70 cm entre plants, 80-100 cm entre rangs",
        profondeur: "1-2 cm"
      },
      entretien: [
        "Tuteurage pour plantes hautes",
        "Paillage pour conserver humidité",
        "Fertilisation équilibrée",
        "Ébourgeonnage pour fruits plus gros"
      ]
    },
    maladies: [
      {
        nom: "Flétrissement bactérien",
        symptoms: "Flétrissement soudain, brunissement vascularie",
        traitement: "Arrachage destruction, désinfection sol",
        prevention: "Rotation, plants sains, drainage",
        severity: "high"
      },
      {
        nom: "Mildiou",
        symptoms: "Taches huileuses feuilles, feutrage blanc revers",
        traitement: "Fongicides cuivre, élimination parties atteintes",
        prevention: "Espacement, aération, rotation",
        severity: "medium"
      },
      {
        nom: "Aleurodes",
        symptoms: "Moucherons blancs sous feuilles, miellat, fumagine",
        traitement: "Insecticides systémiques, pièges jaunes",
        prevention: "Filets anti-insectes, plantes répulsives",
        severity: "low"
      }
    ],
    traitements: [
      "Bouillie bordelaise préventive",
      "Insecticide au neem",
      "Rotation avec légumineuses",
      "Purin d'ortie en fertilisant"
    ],
    recolte: {
      periode: "60-90 jours après plantation",
      signes: "Fruits fermes, couleur vive selon variété",
      conservation: "1-2 semaines frais",
      rendement: "15-25 t/ha"
    },
    valeurNutritionnelle: {
      calories: "25 kcal/100g",
      vitamines: "Vitamine C (12mg), A (123 UI), B6 (0.1mg)",
      mineraux: "Potassium (229mg), magnésium (14mg), calcium (9mg)",
      antioxydants: "Flavonoïdes, caroténoïdes",
      fibres: "3g/100g"
    },
    utilisations: [
      "Plats mijotés (sauce feuilles et fruits)",
      "Conserves, marinades",
      "Médicament traditionnel (antidiabétique)",
      "Feuilles en légume (variétés à feuilles)"
    ],
    conseils: [
      "Récolter fruits jeunes moins amers",
      "Éliminer premières fleurs pour fortifier plante",
      "Tailler apex pour favoriser ramification",
      "Protéger du vent fort"
    ],
    images: [
      "https://media.istockphoto.com/id/456061133/fr/photo/aubergine-bio-papier-peint.webp?a=1&b=1&s=612x612&w=0&k=20&c=WEwE7AGaA0F1f6vO1sjqipy3ylOvswDmXYm3pV3LtaA=",
      "https://images.unsplash.com/photo-1659261111792-66709e46d53d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8QXViZXJnaW5lJTIwYWZyaWNhaW5lfGVufDB8fDB8fHww"
    ],
    liensGoogle: [
      {
        titre: "Aubergine africaine - CIRAD",
        url: "https://www.cirad.fr/les-regions/afrique/aubergine-africaine",
        type: "Scientifique"
      },
      {
        titre: "Culture Solanum aethiopicum - FAO",
        url: "https://www.fao.org/traditional-crops/solanum/fr/",
        type: "Officiel"
      }
    ]
  },

  {
    id: 6,
    nomCommun: "Concombre",
    nomScientifique: "Cucumis sativus",
    famille: "Cucurbitaceae",
    origine: "Inde",
    saison: "Saison des pluies (mars à septembre)",
    cycle: "Annuel (2-4 mois)",
    description: "Plante potagère rampante ou grimpante cultivée pour ses fruits charnus riches en eau, rafraîchissants et diurétiques.",
    caracteristiques: {
      hauteur: "Tiges rampantes 1-3 m",
      port: "Plante rampante ou grimpante",
      feuilles: "Grandes, palmées (10-20 cm), rugueuses, vert foncé",
      fleurs: "Jaunes, unisexuées (plante monoïque)",
      fruits: "Baies allongées (15-30 cm), vertes à épines molles",
      croissance: "Très rapide (fruits en 40-50 jours)",
      longevite: "Annuel"
    },
    culture: {
      climat: "Chaud (25-35°C), sensible au froid",
      besoinEau: "Très élevé (arrosage quotidien en saison chaude)",
      exposition: "Plein soleil (minimum 6h/jour)",
      sol: {
        type: "Léger, riche, profond, bien drainé",
        pH: "6.0-7.0",
        amendement: "Fumier bien décomposé, compost"
      },
      plantation: {
        periode: "Mars-août selon région",
        espacement: "40-60 cm sur ligne, 1-1.5 m entre rangs",
        profondeur: "2-3 cm"
      },
      entretien: [
        "Palissage pour gain de place et fruits droits",
        "Paillage pour maintenir humidité",
        "Fertilisation riche en potassium",
        "Taille pour limiter végétation excessive"
      ]
    },
    maladies: [
      {
        nom: "Oïdium",
        symptoms: "Feutrage blanc farineux sur feuilles, dessèchement",
        traitement: "Soufre mouillable, bicarbonate de soude",
        prevention: "Aération, espacement, rotation",
        severity: "medium"
      },
      {
        nom: "Mildiou",
        symptoms: "Taches anguleuses jaunes, feutrage blanc violacé revers",
        traitement: "Fongicides cuivre (bouillie bordelaise)",
        prevention: "Arrosage au pied, rotation 3-4 ans",
        severity: "high"
      },
      {
        nom: "Pourriture grise (Botrytis)",
        symptoms: "Pourriture molle grise sur fruits, moisissure",
        traitement: "Fongicides spécifiques, amélioration aération",
        prevention: "Éviter blessures fruits, bon espacement",
        severity: "medium"
      }
    ],
    traitements: [
      "Bouillie bordelaise préventive",
      "Décoction de prêle contre mildiou",
      "Insecticide biologique contre aleurodes",
      "Rotation avec solanacées"
    ],
    recolte: {
      periode: "50-70 jours après semis",
      signes: "Fruits fermes, vert moyen, avant jaunissement",
      conservation: "7-10 jours au frais",
      rendement: "20-40 t/ha selon variété"
    },
    valeurNutritionnelle: {
      calories: "15 kcal/100g",
      vitamines: "Vitamine K (16μg), C (2.8mg)",
      mineraux: "Potassium (147mg), magnésium (13mg)",
      eau: "95%",
      fibres: "0.5g/100g"
    },
    utilisations: [
      "Consommation fraîche (salades)",
      "Conserves (cornichons)",
      "Soins beauté (masques hydratants)",
      "Jus détoxifiants",
      "Légume cuit (rare)"
    ],
    conseils: [
      "Récolter jeunes pour stimuler nouvelle production",
      "Arroser régulièrement (éviter stress hydrique)",
      "Palisser pour éviter contact sol (limite maladies)",
      "Pincer tige principale après 5-6 feuilles"
    ],
    images: [
      "https://images.unsplash.com/photo-1449300079323-02e209d9d3a6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y29uY29tYnJlfGVufDB8fDB8fHww",
      "https://images.unsplash.com/photo-1518568403628-df55701ade9e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGNvbmNvbWJyZXxlbnwwfHwwfHx8MA%3D%3D"
    ],
    liensGoogle: [
      {
        titre: "Culture concombre - Agriculture.gouv",
        url: "https://agriculture.gouv.fr/concombre-culture",
        type: "Gouvernemental"
      },
      {
        titre: "Maladies concombre - INRA",
        url: "https://www.inra.fr/actualites/maladies-concombre",
        type: "Scientifique"
      }
    ]
  },

  {
    id: 7,
    nomCommun: "Chou",
    nomScientifique: "Brassica oleracea",
    famille: "Brassicaceae",
    origine: "Europe méditerranéenne",
    saison: "Saison fraîche (octobre à mars)",
    cycle: "Bisannuel (5-10 mois)",
    description: "Plante potagère formant une pomme serrée de feuilles, riche en vitamines et composés sulfurés anticancéreux.",
    caracteristiques: {
      hauteur: "30-60 cm",
      port: "Plante dressée formant pomme",
      feuilles: "Grandes, charnues, en rosette serrée, vert glauque",
      fleurs: "Jaunes, en grappes, 4 pétales en croix",
      pomme: "Tête compacte de feuilles imbriquées",
      croissance: "Lente (pomme en 3-6 mois)",
      longevite: "Bisannuel"
    },
    culture: {
      climat: "Frais à tempéré (15-20°C), tolère léger gel",
      besoinEau: "Élevé (sol toujours frais)",
      exposition: "Plein soleil (minimum 6h/jour)",
      sol: {
        type: "Lourd, argileux, riche, profond, frais",
        pH: "6.0-7.5",
        amendement: "Fumier bien décomposé, compost"
      },
      plantation: {
        periode: "Août-novembre pour récolte hivernale",
        espacement: "40-60 cm dans tous sens",
        profondeur: "Collet affleurant"
      },
      entretien: [
        "Binage régulier",
        "Buttage pour favoriser enracinement",
        "Fertilisation azotée modérée",
        "Arrosage au pied sans mouiller feuilles"
      ]
    },
    maladies: [
      {
        nom: "Hernie du chou",
        symptoms: "Galles sur racines, flétrissement, mort plantes",
        traitement: "Chaux pour remonter pH, fongicides",
        prevention: "Rotation 7 ans, plants sains, sol bien drainé",
        severity: "high"
      },
      {
        nom: "Mildiou du chou",
        symptoms: "Taches jaunes feuilles, feutrage blanc dessous",
        traitement: "Fongicides cuivre, élimination feuilles atteintes",
        prevention: "Rotation, espacement, aération",
        severity: "medium"
      },
      {
        nom: "Piéride du chou",
        symptoms: "Chenilles vertes dévorant feuilles, défoliation",
        traitement: "Bacillus thuringiensis, insecticides",
        prevention: "Filets anti-insectes, plantes répulsives",
        severity: "medium"
      }
    ],
    traitements: [
      "Traitement semis (fongicide)",
      "Bacillus thuringiensis contre chenilles",
      "Purin de tanaisie contre piérides",
      "Chaulage contre hernie"
    ],
    recolte: {
      periode: "3-6 mois après plantation",
      signes: "Pomme ferme, compacte, bien formée",
      conservation: "2-3 mois en cave fraîche",
      rendement: "20-50 t/ha"
    },
    valeurNutritionnelle: {
      calories: "25 kcal/100g",
      vitamines: "Vitamine C (36mg), K (76μg), B9 (43μg)",
      mineraux: "Potassium (170mg), calcium (40mg), soufre",
      glucosinolates: "Composés anticancéreux",
      fibres: "2.5g/100g"
    },
    utilisations: [
      "Consommation fraîche (cru, cuit)",
      "Choucroute (fermentation)",
      "Soupes, potées",
      "Feuilles en farci",
      "Jus détox"
    ],
    conseils: [
      "Planter profondément pour tige solide",
      "Éviter excès azote (favorise maladies)",
      "Protéger des pigeons avec filets",
      "Récolter avant montée à graines"
    ],
    images: [
      "https://images.unsplash.com/photo-1603049404411-13c2ca81a316?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGNob3V8ZW58MHx8MHx8fDA%3D",
      "https://images.unsplash.com/photo-1486328228599-85db4443971f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Y2hvdXxlbnwwfHwwfHx8MA%3D%3D"
    ],
    liensGoogle: [
      {
        titre: "Culture chou - Guide technique",
        url: "https://agriculture.gouv.fr/culture-chou",
        type: "Gouvernemental"
      },
      {
        titre: "Maladies chou - INRAE",
        url: "https://www.inrae.fr/actualites/maladies-chou",
        type: "Scientifique"
      }
    ]
  },

  {
    id: 8,
    nomCommun: "Laitue",
    nomScientifique: "Lactuca sativa",
    famille: "Asteraceae",
    origine: "Bassin méditerranéen",
    saison: "Saison fraîche",
    cycle: "Annuel (2-4 mois)",
    description: "Plante potagère à feuilles tendres consommées en salade, riche en eau et en vitamines, à croissance rapide.",
    caracteristiques: {
      hauteur: "15-30 cm",
      port: "Rosette de feuilles",
      feuilles: "Tendres, vertes à rouges, lisses ou frisées",
      fleurs: "Jaunes, petites, en capitules, montée à graines",
      pomme: "Plus ou moins serrée selon variété",
      croissance: "Très rapide (30-60 jours)",
      longevite: "Annuel"
    },
    culture: {
      climat: "Frais (15-20°C), sensible à chaleur excessive",
      besoinEau: "Élevé (sol toujours frais)",
      exposition: "Mi-ombre en été, plein soleil en saison fraîche",
      sol: {
        type: "Léger, riche, frais, bien drainé",
        pH: "6.0-7.0",
        amendement: "Compost bien mûr, engrais organique"
      },
      plantation: {
        periode: "Toute l'année selon climat",
        espacement: "25-30 cm dans tous sens",
        profondeur: "Superficiel (collet affleurant)"
      },
      entretien: [
        "Arrosage régulier sans mouiller feuilles",
        "Paillage pour maintenir fraîcheur",
        "Fertilisation azotée légère",
        "Désherbage minutieux"
      ]
    },
    maladies: [
      {
        nom: "Mildiou de la laitue",
        symptoms: "Taches jaunes feuilles, feutrage blanc dessous",
        traitement: "Fongicides cuivre, élimination plantes atteintes",
        prevention: "Rotation, espacement, arrosage au goutte-à-goutte",
        severity: "medium"
      },
      {
        nom: "Botrytis (pourriture grise)",
        symptoms: "Pourriture molle grise base plante",
        traitement: "Fongicides, amélioration aération",
        prevention: "Éviter densité excessive, bon drainage",
        severity: "medium"
      },
      {
        nom: "Sclérotinia",
        symptoms: "Pourriture blanche cotonneuse, sclérotes noirs",
        traitement: "Fongicides, solarisation sol",
        prevention: "Rotation longue, drainage, aération",
        severity: "high"
      }
    ],
    traitements: [
      "Purin de prêle préventif",
      "Rotation avec céréales",
      "Paillage pour éviter éclaboussures",
      "Traitement semences fongicide"
    ],
    recolte: {
      periode: "30-60 jours après plantation",
      signes: "Feuilles tendres, pomme bien formée (selon variété)",
      conservation: "3-7 jours au frais",
      rendement: "15-30 t/ha"
    },
    valeurNutritionnelle: {
      calories: "15 kcal/100g",
      vitamines: "Vitamine K (102μg), A (740 UI), B9 (38μg)",
      mineraux: "Potassium (194mg), calcium (36mg)",
      eau: "95%",
      fibres: "1.3g/100g"
    },
    utilisations: [
      "Salades fraîches",
      "Sandwiches, burgers",
      "Wraps, feuilles de substitution",
      "Jus verts",
      "Garniture"
    ],
    conseils: [
      "Récolter tôt le matin pour fraîcheur",
      "Échelonner semis pour récolte continue",
      "Protéger du soleil brûlant",
      "Ne pas planter trop profondément"
    ],
    images: [
      "https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bGFpdHVlfGVufDB8fDB8fHww",
      "https://images.unsplash.com/photo-1598998255396-9c0289d33304?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGxhaXR1ZXxlbnwwfHwwfHx8MA%3D%3D"
    ],
    liensGoogle: [
      {
        titre: "Culture laitue - Agriculture.gouv",
        url: "https://agriculture.gouv.fr/laitue-culture",
        type: "Gouvernemental"
      },
      {
        titre: "Maladies laitue - INRA",
        url: "https://www.inra.fr/actualites/maladies-laitue",
        type: "Scientifique"
      }
    ]
  },

  {
    id: 9,
    nomCommun: "Pastèque",
    nomScientifique: "Citrullus lanatus",
    famille: "Cucurbitaceae",
    origine: "Afrique tropicale",
    saison: "Saison chaude (mars à août)",
    cycle: "Annuel (3-5 mois)",
    description: "Plante rampante produisant de gros fruits sphériques très riches en eau, rafraîchissants, cultivée en saison chaude.",
    caracteristiques: {
      hauteur: "Tiges rampantes 2-5 m",
      port: "Plante rampante vigoureuse",
      feuilles: "Grandes, profondément découpées, vert grisâtre, poilues",
      fleurs: "Jaunes, unisexuées (plante monoïque)",
      fruits: "Baies sphériques ou oblongues (2-20 kg), vert foncé rayé",
      croissance: "Rapide (fruits en 70-90 jours)",
      longevite: "Annuel"
    },
    culture: {
      climat: "Très chaud (25-35°C), pas de froid",
      besoinEau: "Élevé surtout floraison et grossissement fruits",
      exposition: "Plein soleil (minimum 8h/jour)",
      sol: {
        type: "Sableux, profond, bien drainé, riche",
        pH: "5.5-6.8",
        amendement: "Fumier bien décomposé, compost, cendres"
      },
      plantation: {
        periode: "Mars-juin selon région",
        espacement: "1-2 m sur ligne, 2-3 m entre rangs",
        profondeur: "2-3 cm"
      },
      entretien: [
        "Paillage épais pour maintenir humidité",
        "Fertilisation riche en potassium",
        "Taille pour limiter végétation si nécessaire",
        "Protection jeunes fruits du contact sol"
      ]
    },
    maladies: [
      {
        nom: "Fusariose",
        symptoms: "Flétrissement soudain, nécrose racines et tige",
        traitement: "Fongicides systémiques, arrachage plantes atteintes",
        prevention: "Variétés résistantes, rotation 5-7 ans, sol bien drainé",
        severity: "high"
      },
      {
        nom: "Anthracnose",
        symptoms: "Taches noires circulaires feuilles et fruits",
        traitement: "Fongicides (mancozèbe, chlorothalonil)",
        prevention: "Rotation, élimination débris, aération",
        severity: "medium"
      },
      {
        nom: "Mildiou",
        symptoms: "Taches anguleuses feuilles, feutrage blanc revers",
        traitement: "Fongicides cuivre, élimination parties atteintes",
        prevention: "Rotation, espacement, arrosage au pied",
        severity: "medium"
      }
    ],
    traitements: [
      "Bouillie bordelaise préventive",
      "Traitement semences fongicide",
      "Rotation avec céréales",
      "Paillage limitant maladies sol"
    ],
    recolte: {
      periode: "80-100 jours après semis",
      signes: "Petite feuille près pédoncule sèche, son creux, tache sol jaune",
      conservation: "2-3 semaines frais, plusieurs mois en climat sec",
      rendement: "20-50 t/ha"
    },
    valeurNutritionnelle: {
      calories: "30 kcal/100g",
      vitamines: "Vitamine C (8mg), A (569 UI), B6 (0.1mg)",
      mineraux: "Potassium (112mg), magnésium (10mg)",
      eau: "91%",
      lycopène: "Antioxydant (rouge)",
      fibres: "0.4g/100g"
    },
    utilisations: [
      "Consommation fraîche",
      "Jus, smoothies",
      "Sorbets, glaces",
      "Salades de fruits",
      "Cosmétique (rafraîchissant)"
    ],
    conseils: [
      "Ne pas arroser excessivement en fin maturation (éclatement)",
      "Tourner fruits régulièrement pour forme uniforme",
      "Récolter tôt matin pour fraîcheur",
      "Limiter à 2-3 fruits par plante pour grosseur"
    ],
    images: [
      "https://images.unsplash.com/photo-1675346980561-66d6231f8bf7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzF8fHBhc3QlQzMlQThxdWV8ZW58MHx8MHx8fDA%3D",
      "https://images.unsplash.com/photo-1720239278431-bf2a0c838180?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzR8fHBhc3QlQzMlQThxdWV8ZW58MHx8MHx8fDA%3D"
    ],
    liensGoogle: [
      {
        titre: "Culture pastèque - FAO",
        url: "https://www.fao.org/3/x6900f/x6900f07.htm",
        type: "Officiel"
      },
      {
        titre: "Maladies pastèque - CIRAD",
        url: "https://www.cirad.fr/actualites/maladies-pasteque",
        type: "Scientifique"
      }
    ]
  },

  {
    id: 10,
    nomCommun: "Melon",
    nomScientifique: "Cucumis melo",
    famille: "Cucurbitaceae",
    origine: "Afrique intertropicale",
    saison: "Saison chaude (février à juillet)",
    cycle: "Annuel (3-4 mois)",
    description: "Plante rampante produisant des fruits parfumés à chair orangée ou verte, riche en vitamines et antioxydants.",
    caracteristiques: {
      hauteur: "Tiges rampantes 1-3 m",
      port: "Plante rampante moins vigoureuse que pastèque",
      feuilles: "Arrondies, légèrement lobées, vert moyen, rugueuses",
      fleurs: "Jaunes, unisexuées (plante monoïque)",
      fruits: "Baies sphériques ou ovales (0.5-4 kg), écorce lisse ou réticulée",
      croissance: "Rapide (fruits en 70-85 jours)",
      longevite: "Annuel"
    },
    culture: {
      climat: "Chaud (25-30°C), besoin de chaleur pour sucre",
      besoinEau: "Modéré à élevé, réduire en fin maturation",
      exposition: "Plein soleil (minimum 8h/jour)",
      sol: {
        type: "Léger, sableux, profond, bien drainé, riche",
        pH: "6.0-7.0",
        amendement: "Fumier bien décomposé, compost, cendres"
      },
      plantation: {
        periode: "Février-avril selon région",
        espacement: "80-100 cm sur ligne, 1.5-2 m entre rangs",
        profondeur: "2-3 cm"
      },
      entretien: [
        "Paillage pour maintenir chaleur sol",
        "Fertilisation riche en potassium",
        "Taille après 3-4 feuilles puis après fruits",
        "Suppression fruits en excès"
      ]
    },
    maladies: [
      {
        nom: "Oïdium",
        symptoms: "Feutrage blanc farineux feuilles et tiges",
        traitement: "Soufre, bicarbonate soude, fongicides spécifiques",
        prevention: "Aération, espacement, variétés résistantes",
        severity: "medium"
      },
      {
        nom: "Flétrissement fusarien",
        symptoms: "Flétrissement progression bas vers haut",
        traitement: "Fongicides systémiques, arrachage plantes atteintes",
        prevention: "Greffage sur courges résistantes, rotation",
        severity: "high"
      },
      {
        nom: "Mildiou",
        symptoms: "Taches anguleuses feuilles, feutrage violacé revers",
        traitement: "Fongicides cuivre, élimination parties atteintes",
        prevention: "Rotation, arrosage au pied, bon espacement",
        severity: "medium"
      }
    ],
    traitements: [
      "Bouillie bordelaise préventive",
      "Soufre contre oïdium",
      "Greffage pour résistance maladies",
      "Rotation avec solanacées"
    ],
    recolte: {
      periode: "75-90 jours après semis",
      signes: "Changement couleur écorce, parfum, craquellement pédoncule",
      conservation: "1-3 semaines selon variété",
      rendement: "15-35 t/ha"
    },
    valeurNutritionnelle: {
      calories: "34 kcal/100g",
      vitamines: "Vitamine C (36mg), A (338 UI), B9 (21μg)",
      mineraux: "Potassium (267mg), magnésium (12mg)",
      eau: "90%",
      fibres: "0.9g/100g"
    },
    utilisations: [
      "Consommation fraîche",
      "Salades de fruits",
      "Sorbets, glaces",
      "Jus, cocktails",
      "Entrée (melon jambon)"
    ],
    conseils: [
      "Réduire arrosage 1-2 semaines avant récolte pour sucre",
      "Poser fruits sur tuile pour maturation uniforme",
      "Ne pas récolter trop tôt (pas de maturation après cueillette)",
      "Pollinisation manuelle si besoin"
    ],
    images: [
      "https://images.unsplash.com/photo-1661193320145-2252cbfa7755?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8bWVsb258ZW58MHx8MHx8fDA%3D",
      "https://images.unsplash.com/photo-1605963223191-3e4c512a28e2?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NzB8fG1lbG9ufGVufDB8fDB8fHww"
    ],
    liensGoogle: [
      {
        titre: "Culture melon - Guide technique",
        url: "https://agriculture.gouv.fr/melon-culture",
        type: "Gouvernemental"
      },
      {
        titre: "Maladies melon - INRA",
        url: "https://www.inra.fr/actualites/maladies-melon",
        type: "Scientifique"
      }
    ]
  },

  // 🌳 ARBORICOLES / FRUITIÈRES
  {
    id: 11,
    nomCommun: "Manguier",
    nomScientifique: "Mangifera indica",
    famille: "Anacardiaceae",
    origine: "Inde, Birmanie",
    saison: "Saison sèche (décembre à avril)",
    cycle: "Vivace (50-100 ans)",
    description: "Grand arbre fruitier tropical produisant des délicieux fruits charnus, riche en vitamines et antioxydants, roi des fruits tropicaux.",
    caracteristiques: {
      hauteur: "10-30 mètres",
      port: "Arbre large, arrondi, dense",
      feuilles: "Lancéolées, coriaces, vert foncé brillant (15-35 cm)",
      fleurs: "Panicules rose-jaune, odorantes, hermaphrodites",
      fruits: "Drupes ovales (5-25 cm), jaune-rouge à maturité, chair jaune-orange",
      croissance: "Lente (fruits en 3-6 ans)",
      longevite: "Très longue (jusqu'à 100 ans)"
    },
    culture: {
      climat: "Tropical à subtropical (24-30°C), sensible au gel",
      besoinEau: "Élevé en croissance, réduit en floraison",
      exposition: "Plein soleil",
      sol: {
        type: "Profond, bien drainé, riche, tous types sauf lourds",
        pH: "5.5-7.5",
        amendement: "Fumier bien décomposé, compost, cendres"
      },
      plantation: {
        periode: "Début saison des pluies",
        espacement: "8-12 m entre arbres",
        profondeur: "Même niveau que conteneur"
      },
      entretien: [
        "Taille de formation jeunes arbres",
        "Fertilisation annuelle NPK équilibré",
        "Irrigation régulière jeunes plants",
        "Paillage large pied"
      ]
    },
    maladies: [
      {
        nom: "Anthracnose",
        symptoms: "Taches noires feuilles et fruits, pourriture",
        traitement: "Fongicides cuivre (bouillie bordelaise)",
        prevention: "Taille aération, élimination débris, variétés résistantes",
        severity: "high"
      },
      {
        nom: "Oïdium",
        symptoms: "Feutrage blanc inflorescences et jeunes fruits",
        traitement: "Soufre, fongicides systémiques",
        prevention: "Variétés résistantes, taille aération",
        severity: "medium"
      },
      {
        nom: "Mouche des fruits",
        symptoms: "Vers dans fruits, chute prématurée",
        traitement: "Pièges, insecticides, cueillette précoce",
        prevention: "Hygiène, variétés précoces, filets",
        severity: "high"
      }
    ],
    traitements: [
      "Bouillie bordelaise préventive",
      "Pièges à phéromones contre mouches",
      "Traitement tronc chaux",
      "Rotation cultures intercalaires"
    ],
    recolte: {
      periode: "3-6 ans après plantation",
      signes: "Changement couleur, légère souplesse, parfum",
      conservation: "1-2 semaines frais, plusieurs mois transformé",
      rendement: "50-200 kg/arbre/an selon âge"
    },
    valeurNutritionnelle: {
      calories: "60 kcal/100g",
      vitamines: "Vitamine C (36mg), A (1082 UI), B6 (0.1mg)",
      mineraux: "Potassium (168mg), cuivre (0.1mg)",
      fibres: "1.6g/100g",
      antioxydants: "Polyphénols, caroténoïdes"
    },
    utilisations: [
      "Fruit frais",
      "Jus, smoothies, cocktails",
      "Conserves, chutneys",
      "Séchage (mangues séchées)",
      "Cosmétique (beurre de mangue)"
    ],
    conseils: [
      "Tailler après récolte pour aérer couronne",
      "Éclaircir fruits pour grosseur et qualité",
      "Protéger jeunes plants du vent",
      "Ne pas trop irriguer pendant floraison"
    ],
    images: [
      "https://media.istockphoto.com/id/1432601209/fr/photo/mangues-m%C3%BBres-sur-manguier-feuillage-vert-%C3%A0-larri%C3%A8re-plan.webp?a=1&b=1&s=612x612&w=0&k=20&c=XYKFn2d8SreEcb2rFdcRXeDjCLHQ5xgJVqJmRWYxlGg=",
      "https://images.unsplash.com/photo-1622955658214-d05c1c6fcf84?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8TWFuZ3VpZXJ8ZW58MHx8MHx8fDA%3D"
    ],
    liensGoogle: [
      {
        titre: "Culture manguier - FAO",
        url: "https://www.fao.org/3/x6900f/x6900f08.htm",
        type: "Officiel"
      },
      {
        titre: "Maladies manguier - CIRAD",
        url: "https://www.cirad.fr/les-regions/tropicales/manguier/maladies",
        type: "Scientifique"
      }
    ]
  },

  {
    id: 12,
    nomCommun: "Oranger ",
    nomScientifique: "Citrus sinensis",
    famille: "Rutaceae",
    origine: "Chine du Sud-Est",
    saison: "Saison sèche fraîche",
    cycle: "Vivace (50-80 ans)",
    description: "Arbre fruitier des régions subtropicales produisant des agrumes juteux riches en vitamine C, symbole de vitalité.",
    caracteristiques: {
      hauteur: "5-8 mètres (taillé)",
      port: "Arbre arrondi, dense, épineux",
      feuilles: "Ovales, coriaces, vert foncé brillant (7-10 cm)",
      fleurs: "Blanches, très parfumées (fleurs d'oranger)",
      fruits: "Hespérides sphériques (6-10 cm), orange, pulpe juteuse",
      croissance: "Moyenne (fruits en 3-4 ans)",
      longevite: "Longue (50-80 ans)"
    },
    culture: {
      climat: "Subtropical méditerranéen (13-30°C), sensible gel fort",
      besoinEau: "Modéré mais régulier (irrigation goutte-à-goutte)",
      exposition: "Plein soleil",
      sol: {
        type: "Profond, léger, bien drainé, légèrement acide",
        pH: "6.0-7.5",
        amendement: "Fumier décomposé, compost, engrais citrus"
      },
      plantation: {
        periode: "Début saison des pluies",
        espacement: "5-7 m entre arbres",
        profondeur: "Collet au-dessus sol"
      },
      entretien: [
        "Taille légère après récolte",
        "Fertilisation spécifique agrumes",
        "Irrigation régulière surtout floraison/fruits",
        "Paillage pied"
      ]
    },
    maladies: [
      {
        nom: "Tristeza des agrumes",
        symptoms: "Dépérissement rapide, écoulement gommeux",
        traitement: "Aucun, greffage sur porte-greffe résistant",
        prevention: "Plants certifiés, porte-greffe résistant",
        severity: "high"
      },
      {
        nom: "Maladie du greening",
        symptoms: "Feuilles marbrées, fruits déformés asymétriques",
        traitement: "Élimination arbres atteints, lutte psylle",
        prevention: "Plants sains, surveillance, lutte biologique",
        severity: "high"
      },
      {
        nom: "Chancre citrique",
        symptoms: "Lésions brunes feuilles et fruits, chute feuilles",
        traitement: "Fongicides cuivre, élimination parties atteintes",
        prevention: "Plants certifiés, protection vent, variétés résistantes",
        severity: "medium"
      }
    ],
    traitements: [
      "Bouillie bordelaise préventive",
      "Lutte biologique contre psylle",
      "Greffage sur porte-greffe résistant",
      "Fertilisation équilibrée"
    ],
    recolte: {
      periode: "6-14 mois après floraison selon variété",
      signes: "Couleur orange intense, légère souplesse",
      conservation: "2-3 semaines frais, plusieurs mois en jus",
      rendement: "100-300 kg/arbre/an"
    },
    valeurNutritionnelle: {
      calories: "47 kcal/100g",
      vitamines: "Vitamine C (53mg), A (225 UI), B9 (30μg)",
      mineraux: "Potassium (181mg), calcium (40mg)",
      fibres: "2.4g/100g",
      antioxydants: "Flavonoïdes (hesperidine)"
    },
    utilisations: [
      "Fruit frais, jus",
      "Confiserie (écorces confites)",
      "Huile essentielle (neroli, petitgrain)",
      "Cosmétique",
      "Fleurs en infusion"
    ],
    conseils: [
      "Ne pas planter trop profondément",
      "Protéger du vent fort",
      "Irrigation goutte-à-goutte économise eau",
      "Récolter avec ciseaux pour ne pas abîmer"
    ],
    images: [
      "https://plus.unsplash.com/premium_photo-1675011288421-21c7add02738?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjl8fG9yYW5nZXJ8ZW58MHx8MHx8fDA%3D",
      "https://images.unsplash.com/photo-1597714026720-8f74c62310ba?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8b3JhbmdlcnxlbnwwfHwwfHx8MA%3D%3D"
    ],
    liensGoogle: [
      {
        titre: "Culture oranger - INRA",
        url: "https://www.inra.fr/actualites/culture-oranger",
        type: "Scientifique"
      },
      {
        titre: "Maladies agrumes - FAO",
        url: "https://www.fao.org/3/y4252f/y4252f06.htm",
        type: "Officiel"
      }
    ]
  },

  {
    id: 13,
    nomCommun: "Citronnier ",
    nomScientifique: "Citrus limon",
    famille: "Rutaceae",
    origine: "Inde, régions subtropicales",
    saison: "Plusieurs floraisons annuelles",
    cycle: "Vivace (40-60 ans)",
    description: "Petit arbre fruitier produisant des citrons acides riches en vitamine C et acide citrique, utilisé en cuisine et médecine.",
    caracteristiques: {
      hauteur: "3-6 mètres",
      port: "Arbre épineux, irrégulier",
      feuilles: "Ovales, vert foncé, légèrement dentelées (8-14 cm)",
      fleurs: "Blanches teintées rose, très parfumées",
      fruits: "Hespérides ovales (7-12 cm), jaune vif, pulpe acide",
      croissance: "Rapide (fruits en 2-3 ans)",
      longevite: "Moyenne à longue"
    },
    culture: {
      climat: "Subtropical à méditerranéen (15-30°C), sensible gel",
      besoinEau: "Modéré mais régulier, sensible sécheresse",
      exposition: "Plein soleil",
      sol: {
        type: "Léger, profond, bien drainé, légèrement acide",
        pH: "5.5-6.5",
        amendement: "Fumier bien décomposé, compost, engrais citrus"
      },
      plantation: {
        periode: "Printemps ou début saison pluies",
        espacement: "4-6 m entre arbres",
        profondeur: "Collet au-dessus sol"
      },
      entretien: [
        "Taille légère pour aération",
        "Fertilisation régulière agrumes",
        "Arrosage régulier sans excès",
        "Protection hivernale si gel"
      ]
    },
    maladies: [
      {
        nom: "Gommose (Phytophthora)",
        symptoms: "Écoulement gommeux tronc, pourriture collet",
        traitement: "Grattage zone atteinte, fongicides cuivre",
        prevention: "Bon drainage, éviter blessures, plantation haute",
        severity: "high"
      },
      {
        nom: "Mineuse des agrumes",
        symptoms: "Galeries sinueuses feuilles, défoliation",
        traitement: "Insecticides systémiques, pièges",
        prevention: "Surveillance, traitements préventifs",
        severity: "medium"
      },
      {
        nom: "Mal secco",
        symptoms: "Dessèchement rameaux, feuilles jaunes persistantes",
        traitement: "Taille parties atteintes, fongicides",
        prevention: "Variétés résistantes, outils désinfectés",
        severity: "high"
      }
    ],
    traitements: [
      "Bouillie bordelaise préventive",
      "Traitement tronc chaux",
      "Lutte biologique contre mineuse",
      "Fertilisation équilibrée"
    ],
    recolte: {
      periode: "Toute l'année selon variété",
      signes: "Couleur jaune vif, fermeté, parfum",
      conservation: "3-4 semaines frais",
      rendement: "50-150 kg/arbre/an"
    },
    valeurNutritionnelle: {
      calories: "29 kcal/100g",
      vitamines: "Vitamine C (53mg), B6 (0.1mg), B9 (11μg)",
      mineraux: "Potassium (138mg), calcium (26mg)",
      acideCitrique: "5-6%",
      fibres: "2.8g/100g"
    },
    utilisations: [
      "Assaisonnement, boissons",
      "Conserverie, confiserie",
      "Nettoyant ménager naturel",
      "Cosmétique (astringent)",
      "Médicament (antiscorbutique)"
    ],
    conseils: [
      "Récolter avec ciseaux pour éviter blessures",
      "Tailler après récolte principale",
      "Pailler pour conserver humidité",
      "Protéger des vents froids"
    ],
    images: [
      "https://media.istockphoto.com/id/2235790735/fr/photo/citrons-jaunes-frais-aux-feuilles-vertes-sur-un-march%C3%A9-de-rue-en-sicile.webp?a=1&b=1&s=612x612&w=0&k=20&c=Mt83EvUmF5Nu3hNJzW3qfDfXHlbIAN0eVzNvbDuinYg=",
      "https://images.unsplash.com/photo-1594360999890-0bcb8fc40643?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nzh8fGNpdHJvbm5pZXJ8ZW58MHx8MHx8fDA%3D"
    ],
    liensGoogle: [
      {
        titre: "Culture citronnier - INRA",
        url: "https://www.inra.fr/actualites/citronnier-culture",
        type: "Scientifique"
      },
      {
        titre: "Maladies citronnier - FAO",
        url: "https://www.fao.org/3/y4252f/y4252f07.htm",
        type: "Officiel"
      }
    ]
  },

  {
    id: 14,
    nomCommun: "Anacardier (Noix de cajou)",
    nomScientifique: "Anacardium occidentale",
    famille: "Anacardiaceae",
    origine: "Brésil, Nord-Est",
    saison: "Saison sèche (décembre à mars)",
    cycle: "Vivace (30-40 ans)",
    description: "Arbre tropical cultivé pour ses noix de cajou et son pseudo-fruit (pomme de cajou), important économiquement en Afrique.",
    caracteristiques: {
      hauteur: "6-12 mètres",
      port: "Arbre étalé, irrégulier",
      feuilles: "Alternes, ovales, coriaces, vert foncé (10-20 cm)",
      fleurs: "Petites, jaune-rosé, en panicules",
      fruits: "Noix en forme de rein (3 cm) sur pédoncule charnu rouge (pomme)",
      croissance: "Lente (fruits en 3-5 ans)",
      longevite: "30-40 ans productifs"
    },
    culture: {
      climat: "Tropical sec (20-30°C), résiste sécheresse",
      besoinEau: "Faible une fois établi",
      exposition: "Plein soleil",
      sol: {
        type: "Sableux, bien drainé, même pauvre",
        pH: "4.5-6.5",
        amendement: "Peu exigeant, fumier léger"
      },
      plantation: {
        periode: "Début saison des pluies",
        espacement: "8-10 m entre arbres",
        profondeur: "Même niveau que conteneur"
      },
      entretien: [
        "Taille légère pour forme",
        "Fertilisation légère jeunes plants",
        "Désherbage cercle pied",
        "Protection contre feux brousse"
      ]
    },
    maladies: [
      {
        nom: "Anthracnose",
        symptoms: "Taches noires feuilles et fruits, défoliation",
        traitement: "Fongicides cuivre, élimination débris",
        prevention: "Taille aération, variétés résistantes",
        severity: "medium"
      },
      {
        nom: "Pourriture racinaire",
        symptoms: "Jaunissement, flétrissement, mort plants",
        traitement: "Amélioration drainage, fongicides",
        prevention: "Éviter sols lourds, plants sains",
        severity: "high"
      },
      {
        nom: "Teigne des inflorescences",
        symptoms: "Dégâts fleurs, chute prématurée",
        traitement: "Insecticides, pièges",
        prevention: "Surveillance, lutte biologique",
        severity: "medium"
      }
    ],
    traitements: [
      "Bouillie bordelaise préventive",
      "Traitement sol avant plantation",
      "Lutte contre fourmis (protègent cochenilles)",
      "Paillage pied"
    ],
    recolte: {
      periode: "2-3 mois après floraison",
      signes: "Pomme rouge/jaune, noix grise",
      conservation: "Noix sèches plusieurs mois, pommes périssables",
      rendement: "5-20 kg noix/arbre/an"
    },
    valeurNutritionnelle: {
      calories: "553 kcal/100g (noix)",
      vitamines: "Vitamine K (34μg), B6 (0.4mg), E (0.9mg)",
      mineraux: "Magnésium (292mg), cuivre (2.2mg), phosphore (593mg)",
      lipides: "44g/100g (dont acides gras insaturés)",
      proteines: "18g/100g"
    },
    utilisations: [
      "Noix grillées salées",
      "Beurre de cajou",
      "Lait végétal",
      "Pomme en jus, confiture",
      "Bois de chauffage"
    ],
    conseils: [
      "Manipuler noix fraîches avec gants (urushiol irritant)",
      "Séchage noix crucial avant décorticage",
      "Récolter pommes rapidement (périssables)",
      "Planter variétés améliorées"
    ],
    images: [
      "https://images.unsplash.com/photo-1726771517475-e7acdd34cd8a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YW5hY2FyZGllcnxlbnwwfHwwfHx8MA%3D%3D",
      "https://images.unsplash.com/photo-1660807694363-5caec037f3d0?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTZ8fGFuYWNhcmRpZXJ8ZW58MHx8MHx8fDA%3D"
    ],
    liensGoogle: [
      {
        titre: "Culture anacardier - FAO",
        url: "https://www.fao.org/3/x6900f/x6900f09.htm",
        type: "Officiel"
      },
      {
        titre: "Transformation noix cajou - CIRAD",
        url: "https://www.cirad.fr/les-regions/afrique/anacarde",
        type: "Scientifique"
      }
    ]
  },

  {
    id: 15,
    nomCommun: "Avocatier",
    nomScientifique: "Persea americana",
    famille: "Lauraceae",
    origine: "Mexique, Amérique centrale",
    saison: "Variable selon variété",
    cycle: "Vivace (30-50 ans)",
    description: "Arbre fruitier produisant des fruits charnus riches en bonnes graisses, considéré comme un super aliment pour ses qualités nutritionnelles.",
    caracteristiques: {
      hauteur: "10-20 mètres",
      port: "Arbre étalé, dense",
      feuilles: "Alternes, ovales, coriaces, vert foncé (10-30 cm)",
      fleurs: "Petites, jaune-vert, hermaphrodites mais auto-incompatibles",
      fruits: "Baies piriformes (7-20 cm), vert à pourpre, chair beurrée",
      croissance: "Lente (fruits en 3-5 ans)",
      longevite: "Longue (30-50 ans)"
    },
    culture: {
      climat: "Subtropical à tropical doux (15-30°C), sensible gel",
      besoinEau: "Élevé mais bon drainage essentiel",
      exposition: "Plein soleil à mi-ombre",
      sol: {
        type: "Profond, riche, bien drainé, limoneux",
        pH: "5.5-7.0",
        amendement: "Compost, fumier bien décomposé"
      },
      plantation: {
        periode: "Début saison des pluies",
        espacement: "6-10 m entre arbres",
        profondeur: "Collet au-dessus sol"
      },
      entretien: [
        "Taille légère après récolte",
        "Fertilisation équilibrée riche en potassium",
        "Irrigation régulière surtout floraison/fruits",
        "Paillage épais pied"
      ]
    },
    maladies: [
      {
        nom: "Pourriture racinaire (Phytophthora)",
        symptoms: "Feuilles jaunes, flétrissement, mort racines",
        traitement: "Fongicides systémiques, amélioration drainage",
        prevention: "Porte-greffe résistant, sol bien drainé, éviter blessures",
        severity: "high"
      },
      {
        nom: "Anthracnose",
        symptoms: "Taches noires fruits, pourriture",
        traitement: "Fongicides cuivre, élimination fruits atteints",
        prevention: "Taille aération, variétés résistantes",
        severity: "medium"
      },
      {
        nom: "Tavelure",
        symptoms: "Lésions brunes feuilles et fruits",
        traitement: "Fongicides, élimination parties atteintes",
        prevention: "Variétés résistantes, bonne aération",
        severity: "low"
      }
    ],
    traitements: [
      "Bouillie bordelaise préventive",
      "Greffage sur porte-greffe résistant",
      "Paillage pour éviter éclaboussures",
      "Fertilisation équilibrée"
    ],
    recolte: {
      periode: "6-18 mois après floraison selon variété",
      signes: "Changement couleur, légère souplesse col",
      conservation: "2-4 semaines frais selon variété",
      rendement: "100-500 fruits/arbre/an"
    },
    valeurNutritionnelle: {
      calories: "160 kcal/100g",
      vitamines: "Vitamine K (21μg), C (10mg), B9 (81μg)",
      mineraux: "Potassium (485mg), magnésium (29mg)",
      lipides: "15g/100g (dont acides gras monoinsaturés)",
      fibres: "7g/100g"
    },
    utilisations: [
      "Consommation fraîche (salades, tartines)",
      "Guacamole",
      "Huile d'avocat",
      "Cosmétique (masques, crèmes)",
      "Feuilles en infusion"
    ],
    conseils: [
      "Planter deux variétés compatibles pour pollinisation",
      "Ne pas trop irriguer (sensible pourriture racinaire)",
      "Récolter avant maturité complète, maturation à température ambiante",
      "Tailler pour limiter hauteur"
    ],
    images: [
      "https://images.unsplash.com/photo-1671624749229-7d37826013b5?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8YXZvY2F0aWVyfGVufDB8fDB8fHww",
      "https://media.istockphoto.com/id/2249012151/fr/photo/avocatier-persea-observ%C3%A9-lors-dune-randonn%C3%A9e-dans-larri%C3%A8re-pays-dalmu%C3%B1%C3%A9car-costa-tropical.webp?a=1&b=1&s=612x612&w=0&k=20&c=NcNPf2r7n7-qf1xVWkImqdTNTTIYmm5cddQ46_AUsTM="
    ],
    liensGoogle: [
      {
        titre: "Culture avocatier - FAO",
        url: "https://www.fao.org/3/x6900f/x6900f10.htm",
        type: "Officiel"
      },
      {
        titre: "Maladies avocatier - CIRAD",
        url: "https://www.cirad.fr/les-regions/tropicales/avocatier/maladies",
        type: "Scientifique"
      }
    ]
  },

  {
    id: 16,
    nomCommun: "Bananier",
    nomScientifique: "Musa spp.",
    famille: "Musaceae",
    origine: "Asie du Sud-Est",
    saison: "Toute l'année",
    cycle: "Vivace herbacée (cycle de 9-18 mois)",
    description: "Plante herbacée géante produisant des régimes de fruits, base alimentaire essentielle en régions tropicales sous deux formes : dessert (banane douce) et à cuire (plantain).",
    caracteristiques: {
      hauteur: "2-8 mètres",
      port: "Fausse tige (pseudo-tronc) de gaines foliaires",
      feuilles: "Très grandes (2-4 m), entières puis déchirées par vent",
      fleurs: "Inflorescence terminale (régime) avec fleurs mâles et femelles",
      fruits: "Baies courbes en régime (50-150 fruits), vert puis jaune",
      croissance: "Très rapide (fruits en 9-12 mois)",
      longevite: "Plante mère meurt après fructification, rejets continuent"
    },
    culture: {
      climat: "Tropical humide (25-30°C), pas de froid",
      besoinEau: "Très élevé (1500-2500 mm/an bien répartis)",
      exposition: "Plein soleil à mi-ombre légère",
      sol: {
        type: "Profond, riche, bien drainé, limoneux",
        pH: "5.5-7.0",
        amendement: "Fumier, compost, cendres riches potassium"
      },
      plantation: {
        periode: "Début saison des pluies",
        espacement: "2-3 m entre plants",
        profondeur: "30-40 cm pour rejets"
      },
      entretien: [
        "Désherbage régulier",
        "Élagage feuilles sèches",
        "Fertilisation riche en potassium",
        "Débaguage (suppression surplus rejets)"
      ]
    },
    maladies: [
      {
        nom: "Maladie de Panama (Fusarium)",
        symptoms: "Jaunissement feuilles extérieures, fendillement pseudo-tronc",
        traitement: "Aucun traitement efficace",
        prevention: "Variétés résistantes, plants sains, rotation",
        severity: "high"
      },
      {
        nom: "Sigatoka noire",
        symptoms: "Stries noires feuilles, dessèchement précoce",
        traitement: "Fongicides systémiques, huile minérale",
        prevention: "Aération, drainage, variétés résistantes",
        severity: "high"
      },
      {
        nom: "Bunchy top",
        symptoms: "Feuilles dressées, étroites, rabougries",
        traitement: "Arrachage destruction plantes atteintes",
        prevention: "Plants sains, lutte pucerons vecteurs",
        severity: "high"
      }
    ],
    traitements: [
      "Fongicides préventifs Sigatoka",
      "Traitement sol contre nématodes",
      "Paillage pour conserver humidité",
      "Rotation avec légumineuses"
    ],
    recolte: {
      periode: "9-12 mois après plantation",
      signes: "Fruits anguleux devenant ronds, couleur vert pâle",
      conservation: "Banane: 1-2 semaines; Plantain: plusieurs semaines",
      rendement: "20-50 t/ha/an"
    },
    valeurNutritionnelle: {
      calories: "89 kcal/100g (banane), 122 kcal/100g (plantain)",
      vitamines: "Vitamine C (8.7mg), B6 (0.4mg), B9 (20μg)",
      mineraux: "Potassium (358mg), magnésium (27mg)",
      glucides: "23g/100g (banane), 32g/100g (plantain)",
      fibres: "2.6g/100g"
    },
    utilisations: [
      "Fruit frais (banane dessert)",
      "Fruit à cuire (plantain frit, bouilli)",
      "Farine de banane/plantain",
      "Feuilles pour emballage cuisine",
      "Fibres textiles"
    ],
    conseils: [
      "Maintenir 2-3 rejets par pied d'âges différents",
      "Étayer régimes lourds",
      "Récolter vert pour transport longue distance",
      "Ne pas blesser pseudo-tronc (porte d'entrée maladies)"
    ],
    images: [
      "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=800&h=600&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1603833665858-e61d17a86224?w=800&h=600&fit=crop&auto=format"
    ],
    liensGoogle: [
      {
        titre: "Culture bananier - FAO",
        url: "https://www.fao.org/3/x6900f/x6900f11.htm",
        type: "Officiel"
      },
      {
        titre: "Maladies bananier - CIRAD",
        url: "https://www.cirad.fr/les-regions/tropicales/bananier/maladies",
        type: "Scientifique"
      }
    ]
  },

  {
    id: 17,
    nomCommun: "Goyavier",
    nomScientifique: "Psidium guajava",
    famille: "Myrtaceae",
    origine: "Amérique tropicale",
    saison: "Variable selon région",
    cycle: "Vivace (20-40 ans)",
    description: "Arbre fruitier tropical produisant des fruits riches en vitamine C, facile à cultiver, très répandu en régions tropicales.",
    caracteristiques: {
      hauteur: "3-10 mètres",
      port: "Arbre tortueux, écorce lisse qui s'écaille",
      feuilles: "Opposées, ovales, coriaces, vert foncé (5-15 cm)",
      fleurs: "Blanches, solitaires ou en petits groupes, nombreuses étamines",
      fruits: "Baies rondes ou piriformes (4-12 cm), vert puis jaune, nombreuses graines",
      croissance: "Rapide (fruits en 2-3 ans)",
      longevite: "20-40 ans"
    },
    culture: {
      climat: "Tropical à subtropical (15-30°C), tolère léger gel",
      besoinEau: "Modéré, supporte sécheresse une fois établi",
      exposition: "Plein soleil",
      sol: {
        type: "Tous types même pauvres, bien drainé",
        pH: "4.5-7.0",
        amendement: "Peu exigeant, compost léger"
      },
      plantation: {
        periode: "Début saison des pluies",
        espacement: "4-6 m entre arbres",
        profondeur: "Même niveau que conteneur"
      },
      entretien: [
        "Taille légère après récolte",
        "Fertilisation légère jeunes plants",
        "Désherbage cercle pied",
        "Paillage modéré"
      ]
    },
    maladies: [
      {
        nom: "Anthracnose",
        symptoms: "Taches noires fruits, pourriture",
        traitement: "Fongicides cuivre, élimination fruits atteints",
        prevention: "Taille aération, variétés résistantes",
        severity: "medium"
      },
      {
        nom: "Mouche des fruits",
        symptoms: "Vers dans fruits, chute prématurée",
        traitement: "Pièges, insecticides, cueillette précoce",
        prevention: "Hygiène, variétés précoces, filets",
        severity: "medium"
      },
      {
        nom: "Rouille",
        symptoms: "Pustules orangées feuilles, défoliation",
        traitement: "Fongicides, élimination feuilles atteintes",
        prevention: "Bon espacement, aération",
        severity: "low"
      }
    ],
    traitements: [
      "Bouillie bordelaise préventive",
      "Pièges à phéromones contre mouches",
      "Paillage pour éviter éclaboussures",
      "Taille régulière"
    ],
    recolte: {
      periode: "2-3 ans après plantation",
      signes: "Changement couleur, légère souplesse, parfum",
      conservation: "3-7 jours frais, transformé en jus/confiture",
      rendement: "50-100 kg/arbre/an"
    },
    valeurNutritionnelle: {
      calories: "68 kcal/100g",
      vitamines: "Vitamine C (228mg - très riche), A (624 UI), B9 (49μg)",
      mineraux: "Potassium (417mg), cuivre (0.2mg)",
      fibres: "5.4g/100g",
      lycopène: "Antioxydant (rose)"
    },
    utilisations: [
      "Fruit frais",
      "Jus, nectar",
      "Confiture, gelée",
      "Feuilles en infusion (antidiarrhéique)",
      "Cosmétique"
    ],
    conseils: [
      "Éclaircir fruits pour grosseur",
      "Récolter avant pleine maturité pour transport",
      "Tailler pour limiter hauteur facilitant récolte",
      "Planter variétés améliorées à gros fruits"
    ],
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoRSB2qPdF6I2i-wDcmFhQZOTwtnxaNB6rjA&s",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsCU0AKYqO9udsZ17kF3LpbUjxi2izCDe8hQ&s"
    ],
    liensGoogle: [
      {
        titre: "Culture goyavier - FAO",
        url: "https://www.fao.org/3/x6900f/x6900f12.htm",
        type: "Officiel"
      },
      {
        titre: "Maladies goyavier - INRA",
        url: "https://www.inra.fr/actualites/maladies-goyavier",
        type: "Scientifique"
      }
    ]
  },

  {
    id: 18,
    nomCommun: "Cocotier",
    nomScientifique: "Cocos nucifera",
    famille: "Arecaceae",
    origine: "Régions tropicales (origine incertaine)",
    saison: "Production continue",
    cycle: "Vivace (60-80 ans)",
    description: "Palmier emblématique des tropiques, cultivé pour ses noix de coco polyvalentes (eau, chair, huile), arbre de vie des zones côtières.",
    caracteristiques: {
      hauteur: "15-30 mètres",
      port: "Palmier à stipe unique incliné souvent",
      feuilles: "Palmes pennées très grandes (4-6 m), en couronne apicale",
      fleurs: "Inflorescences ramifiées (spadices) à base de couronne",
      fruits: "Drupes très grosses (1-2 kg), fibres extérieures, coque dure",
      croissance: "Lente (fruits en 6-10 ans)",
      longevite: "Longue (60-80 ans)"
    },
    culture: {
      climat: "Tropical maritime chaud humide (27±5°C), besoin lumière intense",
      besoinEau: "Élevé (1500-2500 mm/an bien répartis)",
      exposition: "Plein soleil, tolère vent salé",
      sol: {
        type: "Sableux, bien drainé, même salin, profond",
        pH: "5.0-8.0",
        amendement: "Peu exigeant, fumier côtier, compost"
      },
      plantation: {
        periode: "Début saison des pluies",
        espacement: "7-9 m entre arbres (triangle)",
        profondeur: "2/3 de la noix enterrée"
      },
      entretien: [
        "Désherbage cercle pied jeunes plants",
        "Fertilisation légère jeunes plants",
        "Élagage vieilles palmes",
        "Protection contre rongeurs (écureuils)"
      ]
    },
    maladies: [
      {
        nom: "Flétrissement mortel (Lethal yellowing)",
        symptoms: "Jaunissement puis noircissement palmes, chute noix, mort",
        traitement: "Antibiotiques (tétracycline) en injection tronc",
        prevention: "Variétés résistantes, surveillance, élimination atteints",
        severity: "high"
      },
      {
        nom: "Pourriture bourgeons",
        symptoms: "Pourriture cœur palmier, odeur nauséabonde",
        traitement: "Fongicides, excision tissus atteints",
        prevention: "Éviter blessures, bon drainage",
        severity: "high"
      },
      {
        nom: "Rhinoceros beetle",
        symptoms: "Trous dans couronne, dégâts bourgeons",
        traitement: "Insecticides, pièges à phéromones, lutte biologique",
        prevention: "Hygiène plantation, élimination lieux ponte",
        severity: "medium"
      }
    ],
    traitements: [
      "Injection tétracycline préventive zones à risque",
      "Pièges rhinoceros beetle",
      "Traitement sol contre nématodes",
      "Paillage organique pied"
    ],
    recolte: {
      periode: "Toute l'année, pics selon région",
      signes: "Noix brunissement, bruit d'eau quand secouée (eau potable)",
      conservation: "2-3 mois entières, plus longtemps transformées",
      rendement: "50-100 noix/arbre/an"
    },
    valeurNutritionnelle: {
      calories: "354 kcal/100g (chair sèche)",
      vitamines: "Vitamine C (3.3mg), B6 (0.05mg), B9 (26μg)",
      mineraux: "Manganèse (1.5mg), cuivre (0.4mg), fer (2.4mg)",
      lipides: "33g/100g (huile saturée)",
      fibres: "9g/100g"
    },
    utilisations: [
      "Eau de coco (boisson isotonique)",
      "Chair fraîche ou séchée (coprah)",
      "Huile de coco (alimentaire, cosmétique)",
      "Fibres (coco, bourre)",
      "Bois, feuilles (vannerie, toiture)"
    ],
    conseils: [
      "Planter noix fraîches (moins de 3 mois)",
      "Orienter germe vers le haut à plantation",
      "Irrigation cruciale 3 premières années",
      "Récolter régulièrement pour stimuler production"
    ],
    images: [
      "https://www.radiofrance.fr/pikapi/images/e3502000-ac31-4b93-9aaf-173e408afd89/1200x680?webp=false",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBejcyuQJlHcfRySw5UjSPNpqFVFUKOOm_9Q&s"
    ],
    liensGoogle: [
      {
        titre: "Culture cocotier - FAO",
        url: "https://www.fao.org/3/x6900f/x6900f13.htm",
        type: "Officiel"
      },
      {
        titre: "Maladies cocotier - CIRAD",
        url: "https://www.cirad.fr/les-regions/tropicales/cocotier/maladies",
        type: "Scientifique"
      }
    ]
 
 },

{
    id: 17,
    nomCommun: "Carotte",
    nomScientifique: "Daucus carota subsp. sativus",
    famille: "Apiaceae",
    origine: "Afghanistan / Asie centrale",
    saison: "Saison fraîche (automne-hiver)",
    cycle: "Bisannuel cultivé en annuel (3-5 mois)",
    description: "Légume-racine riche en bêta-carotène (provitamine A), à la racine pivotante charnue, très consommé cru ou cuit.",
    caracteristiques: {
      hauteur: "20-30 cm (feuillage)",
      port: "Rosette de feuilles",
      feuilles: "Finement découpées, vert clair",
      fleurs: "Blanches en ombelle (2e année)",
      racine: "Pivotante, allongée, orange le plus souvent",
      croissance: "Moyenne (70-120 jours)",
      longevite: "Annuel (récolte racine)"
    },
    culture: {
      climat: "Tempéré frais (15-20°C), redoute la chaleur",
      besoinEau: "Régulier (sol toujours frais)",
      exposition: "Plein soleil",
      sol: {
        type: "Profond, meuble, sableux, sans cailloux",
        pH: "6.0-7.0",
        amendement: "Compost bien décomposé, pas de fumier frais"
      },
      plantation: {
        periode: "Semis direct mars-juillet ou août-octobre selon région",
        espacement: "5 cm sur ligne, 25-30 cm entre rangs",
        profondeur: "1 cm"
      },
      entretien: [
        "Éclaircissage à 3-5 cm",
        "Binage superficiel",
        "Paillage pour garder fraîcheur",
        "Arrosage régulier sans excès"
      ]
    },
    maladies: [
      {
        nom: "Mouche de la carotte",
        symptoms: "Galeries dans racines, feuilles rouges",
        traitement: "Filets anti-insectes, rotation",
        prevention: "Associer avec poireau, oignon",
        severity: "medium"
      },
      {
        nom: "Alternariose",
        symptoms: "Taches brunes sur feuilles, puis racines",
        traitement: "Fongicides cuivre, rotation",
        prevention: "Semences saines, éliminer débris",
        severity: "medium"
      },
      {
        nom: "Sclérotiniose",
        symptoms: "Pourriture blanche du collet",
        traitement: "Fongicides, solarisation",
        prevention: "Drainage, rotation longue",
        severity: "high"
      }
    ],
    traitements: [
      "Rotation de 4 ans",
      "Associer avec poireau, oignon, romarin",
      "Filet anti-insectes dès semis",
      "Purin de prêle préventif"
    ],
    recolte: {
      periode: "70-120 jours selon variété",
      signes: "Collet élargi (2-3 cm de diamètre)",
      conservation: "En silo (sable humide) plusieurs mois, ou au frais",
      rendement: "3-6 kg/m²"
    },
    valeurNutritionnelle: {
      calories: "41 kcal/100g",
      vitamines: "Vitamine A (835µg ER), K (13µg), C (5.9mg)",
      mineraux: "Potassium (320mg), calcium (33mg)",
      fibres: "2.8g/100g",
      antioxydants: "Bêta-carotène, lutéine"
    },
    utilisations: [
      "Crue (râpée, bâtonnets)",
      "Cuite (purée, soupe, potée)",
      "Jus, smoothies",
      "Gâteau de carottes",
      "Baby-food"
    ],
    conseils: [
      "Éclaircir tôt pour éviter racines tordues",
      "Arroser régulièrement pour éviter le fendillement",
      "Récolter avant les fortes gelées",
      "Conserver les fanes pour pesto ou soupe"
    ],
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTe-NyKWOoKJhLJi3YT-sJOwsk8VwNbIuyO9w&s",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZq6xyruiaCjSBWwEHcJfhzTQZzIRVXaER7Q&s"
    ],
    liensGoogle: [
      {
        titre: "Fiche carotte - INRAE",
        url: "https://www.inrae.fr/carotte-culture",
        type: "Scientifique"
      },
      {
        titre: "Maladies de la carotte - Agriculture.gouv",
        url: "https://agriculture.gouv.fr/maladies-carotte",
        type: "Gouvernemental"
      }
    ]
  },
  {
    id: 18,
    nomCommun: "Navet",
    nomScientifique: "Brassica rapa subsp. rapa",
    famille: "Brassicaceae",
    origine: "Europe / Asie occidentale",
    saison: "Saison fraîche",
    cycle: "Bisannuel cultivé en annuel (2-4 mois)",
    description: "Légume-racine à chair blanche, au goût légèrement poivré, riche en vitamine C et fibres. Les fanes sont également comestibles.",
    caracteristiques: {
      hauteur: "30-40 cm",
      port: "Rosette de feuilles",
      feuilles: "Lobées, velues, vert foncé",
      fleurs: "Jaunes en grappe (2e année)",
      racine: "Sphérique ou allongée, blanche à collet violet",
      croissance: "Rapide (50-90 jours)",
      longevite: "Annuel"
    },
    culture: {
      climat: "Frais (10-20°C), supporte petites gelées",
      besoinEau: "Régulier",
      exposition: "Plein soleil à mi-ombre",
      sol: {
        type: "Léger, frais, profond",
        pH: "5.5-7.0",
        amendement: "Compost, peu d'azote"
      },
      plantation: {
        periode: "Printemps ou fin été",
        espacement: "10-15 cm sur ligne, 25-30 cm entre rangs",
        profondeur: "1-2 cm"
      },
      entretien: [
        "Éclaircissage",
        "Binage",
        "Arrosage régulier",
        "Buttage léger"
      ]
    },
    maladies: [
      {
        nom: "Hernie du chou",
        symptoms: "Galles racinaires, rabougrissement",
        traitement: "Chauler (pH>7), rotation longue",
        prevention: "Éviter sol acide, plants sains",
        severity: "high"
      },
      {
        nom: "Altise",
        symptoms: "Trous dans les feuilles",
        traitement: "Filet, insecticides naturels",
        prevention: "Associer avec tomate, arroser",
        severity: "low"
      },
      {
        nom: "Oïdium",
        symptoms: "Poudre blanche sur feuilles",
        traitement: "Soufre, bicarbonate",
        prevention: "Aération, espacement",
        severity: "medium"
      }
    ],
    traitements: [
      "Rotation 4 ans",
      "Purin d'ortie en prévention",
      "Filets anti-insectes",
      "Chauler en cas de hernie"
    ],
    recolte: {
      periode: "50-90 jours après semis",
      signes: "Racine de 5-10 cm de diamètre",
      conservation: "Plusieurs semaines au frais, en silo",
      rendement: "2-5 kg/m²"
    },
    valeurNutritionnelle: {
      calories: "28 kcal/100g",
      vitamines: "Vitamine C (21mg), B6, B9",
      mineraux: "Potassium (233mg), calcium (30mg)",
      fibres: "2.5g/100g",
      glucosinolates: "Composés soufrés (bénéfiques)"
    },
    utilisations: [
      "Cru (râpé, en salade)",
      "Cuit (purée, pot-au-feu, rôti)",
      "Fanes cuites (comme épinards)",
      "Soupe, velouté",
      "Pickles"
    ],
    conseils: [
      "Semer en été pour récolte automne/hiver",
      "Arroser régulièrement pour éviter âcreté",
      "Ne pas planter après autres Brassicacées",
      "Les fanes se cuisinent rapidement"
    ],
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHayO9qcCBZWAX0FBHcD4tMgzPZl9nN0n1aQ&s",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSefPqCLHf0WIxZgVyjIIeBlNEjM9hZTgw8OQ&s"
    ],
    liensGoogle: [
      {
        titre: "Culture du navet - Chambres d'agriculture",
        url: "https://www.chambres-agriculture.fr/navet-culture",
        type: "Professionnel"
      }
    ]
  },
  {
    id: 19,
    nomCommun: "Jaxatu",
    nomScientifique: "Solanum aethiopicum (ou variété locale)",
    famille: "Solanaceae",
    origine: "Afrique de l'Ouest",
    saison: "Saison des pluies",
    cycle: "Annuel (4-6 mois)",
    description: "Plante potagère africaine, aussi appelée 'aubergine amère' ou 'jaxatu' en wolof. Ses petits fruits amers sont utilisés dans les sauces et plats traditionnels.",
    caracteristiques: {
      hauteur: "0,5-1 m",
      port: "Buissonnant, épineux parfois",
      feuilles: "Alternes, lobées, vert foncé",
      fleurs: "Blanches à violettes, petites",
      fruits: "Baies sphériques, vertes puis rouges à maturité",
      croissance: "Moyenne (80-120 jours)",
      longevite: "Annuel"
    },
    culture: {
      climat: "Tropical humide, chaud",
      besoinEau: "Régulier",
      exposition: "Plein soleil",
      sol: {
        type: "Riche, bien drainé",
        pH: "5.5-6.8",
        amendement: "Compost, fumier décomposé"
      },
      plantation: {
        periode: "Début saison des pluies",
        espacement: "50-70 cm entre plants",
        profondeur: "Même niveau que la motte"
      },
      entretien: [
        "Arrosage régulier",
        "Binage",
        "Paillage",
        "Fertilisation modérée"
      ]
    },
    maladies: [
      {
        nom: "Flétrissement bactérien",
        symptoms: "Flétrissement brutal, racines brunes",
        traitement: "Rotation, plants sains",
        prevention: "Sol bien drainé, solarisation",
        severity: "high"
      },
      {
        nom: "Pucerons",
        symptoms: "Feuilles enroulées, miellat",
        traitement: "Savon insecticide, huile de neem",
        prevention: "Biodiversité, plantes compagnes",
        severity: "low"
      },
      {
        nom: "Mildiou",
        symptoms: "Taches huileuses sur feuilles",
        traitement: "Bouillie bordelaise préventive",
        prevention: "Éviter humidité foliaire",
        severity: "medium"
      }
    ],
    traitements: [
      "Rotation avec céréales ou légumineuses",
      "Purin d'ortie",
      "Pièges à insectes",
      "Désinfection des outils"
    ],
    recolte: {
      periode: "80-120 jours après plantation",
      signes: "Fruits verts encore fermes (avant coloration rouge)",
      conservation: "Quelques jours à température ambiante",
      rendement: "10-20 t/ha"
    },
    valeurNutritionnelle: {
      calories: "25 kcal/100g",
      vitamines: "Vitamine C, B1, B6",
      mineraux: "Potassium, magnésium",
      fibres: "2g/100g",
      composés: "Alcaloïdes (amertume), antioxydants"
    },
    utilisations: [
      "Sauces (mafé, yassa)",
      "Ragoûts",
      "Grillé ou bouilli",
      "Séché pour conservation",
      "Médicinal (traditionnel)"
    ],
    conseils: [
      "Récolter avant maturité pour moins d'amertume",
      "Porter des gants (épines)",
      "Associer avec des plantes répulsives (œillet d'Inde)",
      "Arroser régulièrement en saison sèche"
    ],
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRB4goYcncgweRcugKlF-twpan_XDIFIPLaOA&s",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5nuvb6EecjAAKOOxho1_r-sl4m9X38a8DKA&s"
    ],
    liensGoogle: [
      {
        titre: "Fiche Jaxatu - PROTA",
        url: "https://www.prota.org/jaxatu",
        type: "Scientifique"
      }
    ]
  },
  {
    id: 20,
    nomCommun: "Pomme de terre",
    nomScientifique: "Solanum tuberosum",
    famille: "Solanaceae",
    origine: "Cordillère des Andes (Pérou/Bolivie)",
    saison: "Printemps-été (plantation) ou saison fraîche",
    cycle: "Annuel (3-5 mois)",
    description: "Tubercule comestible, base de l'alimentation mondiale, riche en amidon et vitamine C. Multiples variétés à chair ferme ou farineuse.",
    caracteristiques: {
      hauteur: "30-60 cm",
      port: "Tiges dressées",
      feuilles: "Composées, vert foncé",
      fleurs: "Blanches, roses ou violettes selon variété",
      tubercules: "Souterrains, formes et couleurs variables",
      croissance: "Rapide (90-150 jours)",
      longevite: "Annuel"
    },
    culture: {
      climat: "Tempéré frais (15-20°C), sensible au gel",
      besoinEau: "Régulier surtout lors tubérisation",
      exposition: "Plein soleil",
      sol: {
        type: "Léger, profond, bien drainé",
        pH: "5.5-6.5",
        amendement: "Fumier bien décomposé à l'automne"
      },
      plantation: {
        periode: "Printemps (après gelées)",
        espacement: "30-40 cm sur ligne, 60-70 cm entre rangs",
        profondeur: "8-10 cm"
      },
      entretien: [
        "Buttage dès que plantes 20 cm",
        "Arrosage régulier",
        "Paillage pour conserver humidité",
        "Supprimer doryphores"
      ]
    },
    maladies: [
      {
        nom: "Mildiou",
        symptoms: "Taches brunes sur feuilles, pourriture tubercules",
        traitement: "Fongicides cuivre (Bouillie bordelaise)",
        prevention: "Variétés résistantes, rotation",
        severity: "high"
      },
      {
        nom: "Doryphore",
        symptoms: "Feuilles dévorées, larves roses",
        traitement: "Ramassage manuel, insecticides",
        prevention: "Rotation, paillage",
        severity: "medium"
      },
      {
        nom: "Gale commune",
        symptoms: "Lésions liégeuses sur tubercules",
        traitement: "Irrigation pendant tubérisation",
        prevention: "Sol avec pH <5.5, rotation",
        severity: "medium"
      }
    ],
    traitements: [
      "Rotation de 4 ans",
      "Plants certifiés",
      "Buttage régulier",
      "Purin de prêle préventif"
    ],
    recolte: {
      periode: "90-150 jours après plantation",
      signes: "Feuillage jauni et sec",
      conservation: "Plusieurs mois au frais, obscurité, hors gel",
      rendement: "20-40 t/ha"
    },
    valeurNutritionnelle: {
      calories: "77 kcal/100g",
      vitamines: "Vitamine C (19.7mg), B6",
      mineraux: "Potassium (421mg), magnésium (23mg)",
      amidon: "15-20%",
      fibres: "2.2g/100g"
    },
    utilisations: [
      "Purée, frites, chips",
      "Soupe, potage",
      "Gratin, rôti",
      "Salades (pommes de terre vapeur)",
      "Féculent"
    ],
    conseils: [
      "Conserver à l'obscurité (éviter verdissement toxique)",
      "Ne pas planter au même endroit avant 4 ans",
      "Arroser régulièrement surtout en période sèche",
      "Butter pour favoriser tubérisation"
    ],
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYQEY5BKAfXCHQa4x86tC-0AQxOiGRryxQjK4xT8UStCNcEY9KuXFrDgg2bUD7xhGzLHQBknKhoyivkiNb-p0I8toG160a48iycm5fWw&s=10",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRU9XkTTPQCwtBzUgCbA2JKMjJghRB01IL66Q&s"
    ],
    liensGoogle: [
      {
        titre: "Pomme de terre - INRA",
        url: "https://www.inrae.fr/pomme-de-terre",
        type: "Scientifique"
      }
    ]
  },
  {
    id: 21,
    nomCommun: "Carrasol",
    nomScientifique: "Pisum sativum var. saccharatum (pois sucré) / ou haricot kilomètre",
    famille: "Fabaceae",
    origine: "Méditerranée / Proche-Orient",
    saison: "Saison fraîche",
    cycle: "Annuel (2-4 mois)",
    description: "Légumineuse produisant des gousses charnues sans parchemin, consommées entières, également appelé pois mangetout ou pois gourmand.",
    caracteristiques: {
      hauteur: "0,5-2 m (selon variété naine ou à rames)",
      port: "Tiges grimpantes ou naines",
      feuilles: "Composées, avec vrilles",
      fleurs: "Blanches ou violettes",
      gousses: "Plates, vertes, sans fil, graines peu développées",
      croissance: "Rapide (60-90 jours)",
      longevite: "Annuel"
    },
    culture: {
      climat: "Tempéré frais (10-20°C)",
      besoinEau: "Régulier",
      exposition: "Plein soleil à mi-ombre",
      sol: {
        type: "Léger, frais, pas trop riche (fixe l'azote)",
        pH: "6.0-7.5",
        amendement: "Compost, phosphore"
      },
      plantation: {
        periode: "Printemps ou fin été",
        espacement: "5-10 cm sur ligne, 30-40 cm entre rangs",
        profondeur: "3-5 cm"
      },
      entretien: [
        "Tuteurage pour variétés grimpantes",
        "Binage",
        "Arrosage modéré",
        "Paillage"
      ]
    },
    maladies: [
      {
        nom: "Oïdium",
        symptoms: "Blanc poudreux sur feuilles",
        traitement: "Soufre, bicarbonate",
        prevention: "Aération, variétés résistantes",
        severity: "medium"
      },
      {
        nom: "Anthracnose",
        symptoms: "Taches brunes sur gousses",
        traitement: "Fongicides préventifs",
        prevention: "Rotation, semences saines",
        severity: "medium"
      },
      {
        nom: "Pucerons",
        symptoms: "Colonies sur jeunes pousses",
        traitement: "Savon noir, insecticide doux",
        prevention: "Favoriser auxiliaires",
        severity: "low"
      }
    ],
    traitements: [
      "Rotation 3-4 ans",
      "Paillage",
      "Purin de prêle",
      "Éliminer plantes malades"
    ],
    recolte: {
      periode: "60-90 jours après semis",
      signes: "Gousses jeunes, plates, avant formation des grains",
      conservation: "2-3 jours au frais",
      rendement: "1-2 kg/m²"
    },
    valeurNutritionnelle: {
      calories: "42 kcal/100g",
      vitamines: "Vitamine C (60mg), B9",
      mineraux: "Fer, potassium",
      fibres: "2.6g/100g",
      protéines: "2.8g/100g"
    },
    utilisations: [
      "Sauté (wok)",
      "Vapeur",
      "Salades",
      "Crudités",
      "Accompagnement"
    ],
    conseils: [
      "Récolter tôt pour plus de tendreté",
      "Semer en place (racines sensibles)",
      "Arroser régulièrement en cas de sécheresse",
      "Associer avec carottes, radis"
    ],
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPtd5vjt15AmDPlvgY9a_ALWreQ1ciMy-2ZQ&s",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKRI2F4TokPrdYPVMukxdQYHZ2yVAVmJqIPQ&s"
    ],
    liensGoogle: [
      {
        titre: "Pois mangetout - ITAB",
        url: "https://www.itab.asso.fr/pois-mangetout",
        type: "Professionnel"
      }
    ]
  },
  {
    id: 22,
    nomCommun: "Poivron",
    nomScientifique: "Capsicum annuum var. grossum",
    famille: "Solanaceae",
    origine: "Amérique centrale et du Sud",
    saison: "Saison chaude",
    cycle: "Annuel (4-6 mois)",
    description: "Variété douce de piment, aux fruits charnus en forme de cloche, consommés verts ou colorés (rouge, jaune, orange). Riche en vitamine C.",
    caracteristiques: {
      hauteur: "50-100 cm",
      port: "Buissonnant",
      feuilles: "Vert foncé, ovales",
      fleurs: "Blanches, solitaires",
      fruits: "Baies creuses, parois épaisses, forme cubique",
      croissance: "Moyenne (70-100 jours après plantation)",
      longevite: "Annuel"
    },
    culture: {
      climat: "Chaud (20-30°C), sensible au froid",
      besoinEau: "Régulier (éviter excès)",
      exposition: "Plein soleil",
      sol: {
        type: "Riche, profond, bien drainé",
        pH: "6.0-7.0",
        amendement: "Compost, engrais riche en potassium"
      },
      plantation: {
        periode: "Printemps (après gelées)",
        espacement: "50 cm entre plants, 70 cm entre rangs",
        profondeur: "Jusqu'aux premières feuilles"
      },
      entretien: [
        "Tuteurage pour variétés productives",
        "Paillage",
        "Fertilisation potassique",
        "Arrosage au pied"
      ]
    },
    maladies: [
      {
        nom: "Anthracnose",
        symptoms: "Taches noires enfoncées sur fruits",
        traitement: "Fongicides cuivre, rotation",
        prevention: "Éviter excès d'humidité",
        severity: "high"
      },
      {
        nom: "Virus de la mosaïque",
        symptoms: "Mosaïque foliaire, nanisme",
        traitement: "Aucun, arracher",
        prevention: "Lutte contre pucerons",
        severity: "high"
      },
      {
        nom: "Pourriture apicale",
        symptoms: "Tache noire au bas du fruit",
        traitement: "Apport calcium foliaire, arrosage régulier",
        prevention: "Irrigation régulière, pH adapté",
        severity: "medium"
      }
    ],
    traitements: [
      "Rotation 3-4 ans",
      "Plants sains",
      "Paillage",
      "Purin de prêle préventif"
    ],
    recolte: {
      periode: "70-100 jours après plantation",
      signes: "Fruits fermes, brillants, couleur selon variété",
      conservation: "1 semaine au frais, 2-3 mois surgelés",
      rendement: "3-5 kg/m²"
    },
    valeurNutritionnelle: {
      calories: "26 kcal/100g",
      vitamines: "Vitamine C (128mg), A (3131 UI)",
      mineraux: "Potassium (211mg), magnésium (12mg)",
      antioxydants: "Capsanthine (rouge), lutéine",
      fibres: "2.1g/100g"
    },
    utilisations: [
      "Cru en salade",
      "Grillé, rôti",
      "Farcis",
      "Poêlée",
      "Coulis, sauce"
    ],
    conseils: [
      "Récolter vert pour favoriser production, ou laisser mûrir pour couleur",
      "Protéger du vent",
      "Éviter les excès d'azote",
      "Arroser régulièrement pour prévenir pourriture apicale"
    ],
    images: [
      "https://images.unsplash.com/photo-1567539549213-cc1697632146?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cG9pdnJvbnN8ZW58MHx8MHx8fDA%3D",
  "https://images.unsplash.com/photo-1585159079680-8dec029b76ed?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHBvaXZyb25zfGVufDB8fDB8fHww"
    ],
    liensGoogle: [
      {
        titre: "Culture poivron - Agriculture.gouv",
        url: "https://agriculture.gouv.fr/poivron-culture",
        type: "Gouvernemental"
      }
    ]
  },

{
    id: 23,
    nomCommun: "Ail",
    nomScientifique: "Allium sativum",
    famille: "Amaryllidaceae (anciennement Liliaceae)",
    origine: "Asie centrale",
    saison: "Automne / hiver (plantation), récolte été",
    cycle: "Bisannuel cultivé en annuel (6-9 mois)",
    description: "Plante bulbeuse cultivée pour ses gousses (caïeux) au goût et à l'odeur puissants. Utilisé comme condiment et en phytothérapie pour ses propriétés antibactériennes et cardioprotectrices.",
    caracteristiques: {
      hauteur: "30-60 cm",
      port: "Tige dressée, bulbe souterrain composé de caïeux",
      feuilles: "Plates, rubanées, vert grisâtre",
      fleurs: "Blanches ou rosées en ombelle (rare, sauf ail rocambole)",
      bulbe: "Composé de plusieurs caïeux protégés par tuniques",
      croissance: "Lente (120-210 jours)",
      longevite: "Bisannuel (récolte la première année)"
    },
    culture: {
      climat: "Tempéré à continental, besoin de froid pour la vernalisation",
      besoinEau: "Faible, arrêter avant récolte",
      exposition: "Plein soleil",
      sol: {
        type: "Léger, sableux, bien drainé",
        pH: "6.0-7.5",
        amendement: "Compost bien décomposé, pas de fumier frais"
      },
      plantation: {
        periode: "Octobre-novembre (ail d'automne) ou février-mars (ail de printemps)",
        espacement: "10-15 cm sur ligne, 25-30 cm entre rangs",
        profondeur: "3-5 cm, pointe vers le haut"
      },
      entretien: [
        "Binage soigneux (concurrence des mauvaises herbes)",
        "Arrosage modéré (seulement en cas de sécheresse prolongée)",
        "Suppression des hampes florales pour favoriser le bulbe",
        "Arrêt des arrosages 3 semaines avant récolte"
      ]
    },
    maladies: [
      {
        nom: "Rouille de l'ail (Puccinia allii)",
        symptoms: "Pustules orange sur feuilles, jaunissement",
        traitement: "Fongicides à base de soufre, élimination parties atteintes",
        prevention: "Rotation, éviter excès d'azote, bon espacement",
        severity: "medium"
      },
      {
        nom: "Pourriture blanche (Sclerotium cepivorum)",
        symptoms: "Feuilles jaunissent, pourriture du bulbe, mycélium blanc",
        traitement: "Difficile, élimination des plants malades, solarisation",
        prevention: "Rotation très longue (8-10 ans), plants sains",
        severity: "high"
      },
      {
        nom: "Mildiou (Peronospora destructor)",
        symptoms: "Taches grisâtres sur feuilles, déformation",
        traitement: "Bouillie bordelaise, fongicides",
        prevention: "Bon drainage, éviter humidité foliaire",
        severity: "medium"
      }
    ],
    traitements: [
      "Rotation de 4-5 ans minimum",
      "Traitement des caïeux à l'eau chaude (50°C, 10 min) avant plantation",
      "Purin de prêle en prévention",
      "Associations favorables : carotte, betterave, fraisier"
    ],
    recolte: {
      periode: "Juin-août selon climat",
      signes: "Feuilles jaunies et sèches aux 2/3",
      conservation: "Séchage 2-3 semaines à l'ombre ventilée, puis tressage ou stockage en lieu sec",
      rendement: "0,5-1 kg/m²"
    },
    valeurNutritionnelle: {
      calories: "149 kcal/100g",
      vitamines: "Vitamine C (31mg), B6 (1.24mg)",
      mineraux: "Manganèse (1.67mg), sélénium (14μg), calcium (181mg)",
      composés: "Allicine (antibactérien), ajoène, quercétine",
      fibres: "2.1g/100g"
    },
    utilisations: [
      "Condiment en cuisine (frais, séché, poudre)",
      "Phytothérapie (infections, hypertension, cholestérol)",
      "Huile d'ail macérée",
      "Ail noir (fermenté)",
      "Insecticide naturel au jardin"
    ],
    conseils: [
      "Planter les plus gros caïeux pour obtenir de belles têtes",
      "Ne pas planter trop profond (risque de pourriture)",
      "Conserver quelques têtes pour la plantation de l'année suivante",
      "Éviter les sols argileux et humides",
      "Le stress hydrique en fin de cycle favorise la conservation"
    ],
    images: [
      "https://www.leparisien.fr/resizer/WkcJ87XVLniDN0RdCOddXwf16kA=/932x582/cloudfront-eu-central-1.images.arcpublishing.com/leparisien/MK2LMRL265CS5PZ3Q5HYIHZB5U.jpg",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSzafYFBXg2JFBsPkGTubeNCehJPRg83dwRA&s"
    ],
    liensGoogle: [
      {
        titre: "Fiche technique Ail - INRAE",
        url: "https://www.inrae.fr/ail-culture",
        type: "Scientifique"
      },
      {
        titre: "Maladies de l'ail - Agriculture.gouv",
        url: "https://agriculture.gouv.fr/maladies-de-lail",
        type: "Gouvernemental"
      }
    ]
  }
];

// Base de données des maladies
const diseasesDatabase = [


  
    {

    id: 1,
    nom: "Mildiou",
    nomScientifique: "Phytophthora infestans",
    type: "fongique",
    severite: "haute",
    description: "Maladie fongique dévastatrice qui se propage rapidement par temps humide, affectant les tissus végétaux et provoquant une pourriture rapide.",
    symptomes: [
      "Taches huileuses vert foncé sur le dessus des feuilles",
      "Moisissure blanche cotonneuse au revers des feuilles",
      "Pourriture brune rapide des tiges et fruits",
      "Feuilles qui se dessèchent et tombent",
      "Fruits qui pourrissent sur pied"
    ],
    plantesAffectees: ["Tomate", "Pomme de terre", "Poivron", "Laitue", "Aubergine"],
    conditions: "Humidité relative > 90%, températures fraîches (10-25°C), pluie persistante",
    cycle: "Survie dans le sol sur débris infectés, dissémination par l'eau et le vent",
    traitements: [
      {
        nom: "Bouillie bordelaise",
        type: "chimique",
        efficacite: "haute",
        dosage: "20g/L, application toutes les 2 semaines",
        precautions: "Traitement préventif, éviter en floraison"
      },
      {
        nom: "Purin de prêle",
        type: "naturel",
        efficacite: "moyenne",
        dosage: "Dilution 10%, pulvérisation tous les 10 jours",
        precautions: "Traitement préventif renforçant les défenses"
      },
      {
        nom: "Mancozèbe",
        type: "chimique",
        efficacite: "haute",
        dosage: "200g/100L, traitement curatif",
        precautions: "Respecter délai avant récolte"
      }
    ],
    prevention: [
      "Rotation des cultures sur 4-5 ans",
      "Aération suffisante entre les plants",
      "Éviter l'arrosage foliaire, privilégier le goutte-à-goutte",
      "Paillage pour éviter les éclaboussures",
      "Utilisation de variétés résistantes"
    ],
    diagnostic: {
      testSimple: "Placer une feuille suspecte dans un sac plastique humide pendant 24h",
      signeConfirmation: "Apparition de moisissure blanche"
    },
    images: [
      "https://www.cabidigitallibrary.org/cms/10.1079/cabicompendium.40970/asset/3f5aa953-33cd-4578-9fa5-51a49922090b/assets/graphic/40970_02.jpg",
      "https://ars.els-cdn.com/content/image/3-s2.0-B9780123877376500029-f02-307-9780123877376.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/d/d7/Unidentified_disease_on_potato_leaf.jpg"
    ],
    references: [
      "Phytophthora Database - USDA",
      "Guide des maladies des plantes - INRAE"
    ]
  },
  {
    id: 2,
    nom: "Pourriture du collet",
    nomScientifique: "Phytophthora spp.",
    type: "fongique",
    severite: "critique",
    description: "Maladie fongique du sol qui attaque la base des tiges, provoquant le flétrissement et la mort rapide des plants.",
    symptomes: [
      "Noircissement et ramollissement à la base de la tige",
      "Flétrissement soudain des feuilles",
      "Odeur nauséabonde caractéristique",
      "Feuilles jaunissantes qui persistent sur la plante",
      "Plante qui se détache facilement du sol"
    ],
    plantesAffectees: ["Papayer", "Tomate", "Poivron", "Aubergine"],
    conditions: "Sol mal drainé, excès d'humidité, températures chaudes (25-30°C)",
    cycle: "Champignon tellurique, survie dans le sol 5-7 ans",
    traitements: [
      {
        nom: "Fongicides systémiques",
        type: "chimique",
        efficacite: "moyenne",
        dosage: "Selon produit, traitement au sol",
        precautions: "Efficacité limitée en sol contaminé"
      },
      {
        nom: "Chaux agricole",
        type: "naturel",
        efficacite: "moyenne",
        dosage: "200g/m², incorporation superficielle",
        precautions: "Éviter sur plantes acidophiles"
      },
      {
        nom: "Extrait de pépins de pamplemousse",
        type: "biologique",
        efficacite: "faible",
        dosage: "10 gouttes/L d'eau, arrosage",
        precautions: "Traitement préventif seulement"
      }
    ],
    prevention: [
      "Amélioration du drainage du sol",
      "Rotation longue (minimum 5 ans)",
      "Plants greffés sur porte-greffes résistants",
      "Éviter les blessures au collet",
      "Surélévation des plants (buttage)"
    ],
    diagnostic: {
      testSimple: "Couper une tranche de tige à la base",
      signeConfirmation: "Tissus vasculaires bruns à l'intérieur"
    },
    images: [
      "https://forestphytophthoras.org/sites/default/files/photo_gallery/l6_6_0.jpg",
      "https://d2u1z1lopyfwlx.cloudfront.net/thumbnails/19283465-52b6-58ad-8c38-4acb3ac9d2bd/b7aa45c5-4e6a-50e2-a5da-866ae0be2ce4.jpg",
      "https://www.assets.envu.com/-/media/prfunitedstates/turf/ornamentals/po/aaron_article2_image1.ashx"
    ],
    references: [
      "Fiches maladies tropicales - CIRAD",
      "Phytophthora en zones tropicales"
    ]
  },
  {
    id: 3,
    nom: "Oïdium",
    nomScientifique: "Erysiphe cichoracearum, Podosphaera xanthii",
    type: "fongique",
    severite: "moyenne",
    description: "Maladie fongique caractérisée par un feutrage blanc poudreux sur les organes aériens, réduisant la photosynthèse et la vigueur des plantes.",
    symptomes: [
      "Feutrage blanc poudreux sur feuilles et tiges",
      "Déformation et enroulement des feuilles",
      "Floraison réduite ou absente",
      "Feuilles qui jaunissent et tombent prématurément",
      "Fruits à développement anormal"
    ],
    plantesAffectees: ["Papayer", "Gombo", "Concombre", "Courgette", "Melon", "Tomate"],
    conditions: "Températures modérées (15-27°C), humidité modérée, faible luminosité",
    cycle: "Survie sur débris végétaux, dissémination par le vent",
    traitements: [
      {
        nom: "Soufre mouillable",
        type: "chimique",
        efficacite: "haute",
        dosage: "5-8g/L, application toutes les semaines",
        precautions: "Éviter par temps chaud (>30°C)"
      },
      {
        nom: "Bicarbonate de soude",
        type: "naturel",
        efficacite: "moyenne",
        dosage: "5g/L + savon noir, pulvérisation",
        precautions: "Ne pas appliquer en plein soleil"
      },
      {
        nom: "Lait écrémé",
        type: "biologique",
        efficacite: "moyenne",
        dosage: "10% de lait dans eau, 2 fois/semaine",
        precautions: "Traitement préventif efficace"
      }
    ],
    prevention: [
      "Espacement suffisant entre les plants",
      "Éviter les excès d'azote",
      "Tailler pour améliorer l'aération",
      "Arrosage au pied sans mouiller le feuillage",
      "Utilisation de variétés résistantes"
    ],
    diagnostic: {
      testSimple: "Passer un doigt sur la poudre blanche",
      signeConfirmation: "Poudre qui s'enlève facilement"
    },
    images: [
      "https://agrichem.dz/up/borytis_feve.jpg",
      "https://agrichem.dz/up/chickpea1.jpganthracnose.jpg",
      "https://greenastic.com/wp-content/uploads/2017/09/alternariose.png"
    ],
    references: [
      "Maladies fongiques des cultures - ANSES",
      "Oïdium des cucurbitacées - INRAE"
    ]
  },
  {
    id: 4,
    nom: "Alternariose",
    nomScientifique: "Alternaria solani, Alternaria brassicicola",
    type: "fongique",
    severite: "moyenne",
    description: "Maladie fongique provoquant des taches concentriques caractéristiques sur les feuilles, réduisant la surface photosynthétique.",
    symptomes: [
      "Taches circulaires brunes à centre clair",
      "Zones concentriques visibles dans les taches",
      "Nécrose progressive des feuilles",
      "Taches sur tiges et fruits",
      "Feuilles qui se dessèchent et tombent"
    ],
    plantesAffectees: ["Tomate", "Chou", "Carotte", "Pomme de terre"],
    conditions: "Temps chaud et humide, rosées abondantes, blessures des plantes",
    cycle: "Survie sur débris infectés, dissémination par éclaboussures",
    traitements: [
      {
        nom: "Mancozèbe",
        type: "chimique",
        efficacite: "haute",
        dosage: "200g/100L, traitement préventif",
        precautions: "Respecter délai avant récolte"
      },
      {
        nom: "Purin d'ortie",
        type: "naturel",
        efficacite: "moyenne",
        dosage: "Dilution 10%, renforce les défenses",
        precautions: "Odeur forte, application matinale"
      },
      {
        nom: "Huile de neem",
        type: "biologique",
        efficacite: "faible",
        dosage: "5ml/L + savon noir, pulvérisation",
        precautions: "Éviter en période de floraison"
      }
    ],
    prevention: [
      "Rotation des cultures sur 3 ans minimum",
      "Élimination des débris végétaux infectés",
      "Éviter l'irrigation par aspersion",
      "Paillage pour réduire les éclaboussures",
      "Plants sains et robustes"
    ],
    diagnostic: {
      testSimple: "Observer les taches à la loupe",
      signeConfirmation: "Cercles concentriques bien marqués"
    },
    images: [
      "https://tomatonews.com/phototheque/photos/Images_TN/7656_00.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/3/3a/Alternariaalternata.jpg",
      "https://www.frontiersin.org/files/Articles/1524586/xml-images/fpls-16-1524586-g001.webp",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Chain_of_conidia_of_a_Alternaria_sp._fungus_PHIL_3962_lores.jpg/330px-Chain_of_conidia_of_a_Alternaria_sp._fungus_PHIL_3962_lores.jpg"
    ],
    references: [
      "Alternaria spp. Database",
      "Maladies foliaires des solanacées"
    ]
  },
  {
    id: 5,
    nom: "Pucerons",
    nomScientifique: "Aphis gossypii, Myzus persicae",
    type: "ravageur",
    severite: "moyenne",
    description: "Insectes piqueurs-suceurs qui affaiblissent les plantes en prélevant la sève et transmettent des virus.",
    symptomes: [
      "Colonies d'insectes verts, noirs ou bruns sous les feuilles",
      "Feuilles déformées et enroulées",
      "Miellat collant sur les feuilles",
      "Fumagine (moisissure noire) sur le miellat",
      "Transmission de virus (mosaïques)"
    ],
    plantesAffectees: ["Gombo", "Chou", "Laitue", "Tomate", "Poivron"],
    conditions: "Temps sec et chaud, plantes stressées, excès d'azote",
    cycle: "Reproduction asexuée rapide, plusieurs générations par an",
    traitements: [
      {
        nom: "Savon insecticide",
        type: "naturel",
        efficacite: "haute",
        dosage: "20ml/L d'eau, pulvérisation directe",
        precautions: "Éviter en plein soleil"
      },
      {
        nom: "Purin d'ortie",
        type: "biologique",
        efficacite: "moyenne",
        dosage: "Dilution 5%, répulsif et fertilisant",
        precautions: "Odeur forte"
      },
      {
        nom: "Coccinelles",
        type: "biocontrôle",
        efficacite: "haute",
        dosage: "10-20 coccinelles/m²",
        precautions: "Libération en fin de journée"
      }
    ],
    prevention: [
      "Encouragement des auxiliaires (coccinelles, syrphes)",
      "Associations répulsives (œillet d'Inde, menthe)",
      "Éviter les excès d'azote",
      "Plants sains et bien nourris",
      "Filets anti-insectes en début de culture"
    ],
    diagnostic: {
      testSimple: "Secouer doucement les feuilles",
      signeConfirmation: "Chute de petits insectes"
    },
    images: [
      "https://cetab.bio/wp-content/uploads/vignette-maladies-et-ravageurs-xvd.jpg",
      "https://cetab.bio/wp-content/uploads/vignette-maladies-et-ravageurs-xvd.jpg",
      "https://www.terreau-fste.org/images/resources/681b56de2e65d-681b56de3469c937479382.png"
    ],
    references: [
      "Ravageurs des cultures maraîchères",
      "Guide de lutte intégrée contre les pucerons"
    ]
  },
  {
    id: 6,
    nom: "Virus de la mosaïque",
    nomScientifique: "Tobacco mosaic virus, Cucumber mosaic virus",
    type: "viral",
    severite: "haute",
    description: "Maladies virales provoquant des décolorations en mosaïque et des déformations sévères des plantes, sans traitement curatif.",
    symptomes: [
      "Mosaïque de taches vert clair et foncé sur feuilles",
      "Feuilles déformées, cloques et boursouflures",
      "Nanisme de la plante",
      "Fruits tachetés et déformés",
      "Marbrure des fleurs"
    ],
    plantesAffectees: ["Piment", "Tomate", "Concombre", "Courgette", "Poivron"],
    conditions: "Transmission mécanique ou par insectes piqueurs",
    cycle: "Survie sur outils, mains, débris, transmission par pucerons",
    traitements: [
      {
        nom: "Aucun traitement curatif",
        type: "prévention",
        efficacite: "n/a",
        dosage: "n/a",
        precautions: "Seule la prévention est efficace"
      }
    ],
    prevention: [
      "Désinfection systématique des outils",
      "Élimination immédiate des plants atteints",
      "Lutte contre les pucerons vecteurs",
      "Utilisation de variétés résistantes",
      "Rotation des cultures"
    ],
    diagnostic: {
      testSimple: "Observer les nouvelles feuilles",
      signeConfirmation: "Mosaïque + déformation caractéristique"
    },
    images: [
      "https://www.semencemag.fr/photos/mars-2021-virus-concombre.jpg",
      "https://images.ctfassets.net/b85ozb2q358o/49QokBWnf091xc2YVD4cYg/1ceae8189d4e91c9f7a8d0974c34b8c2/maladies-les-plus-frequentes-au-potager-1.jpg",
      "https://images.ctfassets.net/b85ozb2q358o/U3id3FLipE6Xw9iP6V2yY/fb197dbbb1de232a596dcb4c50b7d18e/maladies-les-plus-frequentes-au-potager-5.jpg"
    ],
    references: [
      "Virus des plantes potagères - INRAE",
      "Virologie végétale"
    ]
  },
  {
    id: 7,
    nom: "Flétrissement bactérien",
    nomScientifique: "Ralstonia solanacearum",
    type: "bactérien",
    severite: "critique",
    description: "Maladie bactérienne vasculaire provoquant un flétrissement rapide et irréversible des plantes, sans traitement efficace.",
    symptomes: [
      "Flétrissement soudain des feuilles par temps chaud",
      "Feuilles qui restent vertes avant de flétrir",
      "Exsudat bactérien blanc des tiges coupées",
      "Pourriture des racines et base des tiges",
      "Plante qui meurt en quelques jours"
    ],
    plantesAffectees: ["Aubergine", "Tomate", "Poivron", "Pomme de terre"],
    conditions: "Sol chaud (>25°C), humidité élevée, blessures racinaires",
    cycle: "Survie longue dans le sol, transmission par eau et outils",
    traitements: [
      {
        nom: "Aucun traitement efficace",
        type: "prévention",
        efficacite: "n/a",
        dosage: "n/a",
        precautions: "Prévention stricte nécessaire"
      }
    ],
    prevention: [
      "Rotation très longue (minimum 5 ans)",
      "Plants certifiés sains",
      "Désinfection des outils et chaussures",
      "Éviter les excès d'humidité",
      "Solarisation du sol en été"
    ],
    diagnostic: {
      testSimple: "Couper une tige et plonger dans l'eau",
      signeConfirmation: "Exsudat bactérien blanc qui s'écoule"
    },
    images: [
      "https://s.alicdn.com/@sc02/kf/A8376e2ac0e6a414292b9848b8ddc4502n.jpg",
      "https://www.jardinsdefrance.org/wp-content/uploads/2025/12/popillia-japonica-vigne.jpg"
    ],
    references: [
      "Bactérioses des solanacées - ANSES",
      "Ralstonia solanacearum - quarantaine"
    ]
  },
  {
    id: 8,
    nom: "Piéride du chou",
    nomScientifique: "Pieris brassicae",
    type: "ravageur",
    severite: "moyenne",
    description: "Papillon dont les chenilles dévorent les feuilles des choux, provoquant des dégâts importants sur la récolte.",
    symptomes: [
      "Feuilles largement dévorées",
      "Présence de chenilles vertes avec bandes jaunes",
      "Déjections vertes sur les feuilles",
      "Feuilles réduites à la nervure centrale",
      "Plants affaiblis et croissance réduite"
    ],
    plantesAffectees: ["Chou", "Brocoli", "Chou-fleur", "Navet"],
    conditions: "Températures douces, printemps et été",
    cycle: "2-3 générations par an, pupes hivernent",
    traitements: [
      {
        nom: "Bacillus thuringiensis",
        type: "biologique",
        efficacite: "haute",
        dosage: "1g/L, pulvérisation sur chenilles",
        precautions: "Éviter en période de floraison"
      },
      {
        nom: "Filets anti-insectes",
        type: "mécanique",
        efficacite: "haute",
        dosage: "Filet de 1.4mm de maille",
        precautions: "Installation avant la ponte"
      },
      {
        nom: "Ramassage manuel",
        type: "manuel",
        efficacite: "moyenne",
        dosage: "Quotidien en période d'attaque",
        precautions: "Tôt le matin ou en soirée"
      }
    ],
    prevention: [
      "Filets anti-insectes dès la plantation",
      "Associations avec tomates, céleri",
      "Encouragement des prédateurs naturels",
      "Rotation des cultures",
      "Surveillance régulière des feuilles"
    ],
    diagnostic: {
      testSimple: "Examiner le revers des feuilles",
      signeConfirmation: "Œufs jaunes en groupes et chenilles"
    },
    images: [
      "https://beta.iriisphytoprotection.qc.ca/sites/default/files/styles/carusel_hd_crop/public/2023-01/Testing1_7072.jpg?itok=Z_OUMOvQ",
      "https://img.src.ca/2016/09/02/1250x703/160902_cn2t6_insecte-cruciferes_sn1250.jpg",
      "https://www.syngenta.fr/sites/g/files/kgtney1611/files/image/import/field_carousel/datapro/target/cecidomyie-des-siliques-des-cruciferes-1.jpg"
    ],
    references: [
      "Ravageurs des crucifères",
      "Lutte biologique contre la piéride"
    ]
  },
  {
    id: 9,
    nom: "Pourriture des bulbes",
    nomScientifique: "Botrytis spp., Fusarium spp.",
    type: "fongique",
    severite: "moyenne",
    description: "Maladies fongiques provoquant la pourriture des bulbes d'oignon et d'ail, surtout en conditions de stockage humides.",
    symptomes: [
      "Ramollissement et pourriture des bulbes",
      "Moisissure grise ou blanche à la base",
      "Feuilles jaunissantes à partir des pointes",
      "Odeur de pourriture",
      "Bulbes qui se décomposent complètement"
    ],
    plantesAffectees: ["Oignon", "Ail", "Échalote"],
    conditions: "Humidité élevée, températures chaudes, blessures des bulbes",
    cycle: "Survie dans le sol et sur débris, infection par blessures",
    traitements: [
      {
        nom: "Fongicides de stockage",
        type: "chimique",
        efficacite: "moyenne",
        dosage: "Traitement avant stockage selon étiquette",
        precautions: "Respecter les délais avant consommation"
      },
      {
        nom: "Séchage prolongé",
        type: "culturel",
        efficacite: "haute",
        dosage: "Séchage 3-4 semaines à l'ombre",
        precautions: "Éviter l'humidité pendant le séchage"
      },
      {
        nom: "Extrait de pamplemousse",
        type: "naturel",
        efficacite: "faible",
        dosage: "Pulvérisation sur bulbes avant stockage",
        precautions: "Efficacité préventive seulement"
      }
    ],
    prevention: [
      "Récolte par temps sec",
      "Séchage complet avant stockage",
      "Stockage dans un endroit frais, sec et aéré",
      "Éviter les blessures lors de la récolte",
      "Rotation des cultures"
    ],
    diagnostic: {
      testSimple: "Presser doucement le bulbe",
      signeConfirmation: "Ramollissement anormal et odeur"
    },
    images: [
      "https://cdn.britannica.com/77/9677-050-1A7777C4/Penicillium-notatum-source-penicillin.jpg",
      "https://www.researchgate.net/publication/322813810/figure/fig1/AS%3A11431281271578002%401723667992691/Microscopic-examination-of-Penicillium-oxalicum-strain-SL2-focusing-on-conidiophores-and.tif"
    ],
    references: [
      "Maladies de conservation des bulbes",
      "Post-récolte des alliacées"
    ]
  },
  {
    id: 10,
    nom: "Rouille",
    nomScientifique: "Puccinia allii",
    type: "fongique",
    severite: "faible à moyenne",
    description: "Maladie fongique caractérisée par des pustules orangées sur les feuilles, réduisant la photosynthèse et la vigueur des plants.",
    symptomes: [
      "Petites pustules orangées sur feuilles",
      "Taches jaunes autour des pustules",
      "Feuilles qui sèchent prématurément",
      "Réduction de la taille des bulbes",
      "Plantes affaiblies"
    ],
    plantesAffectees: ["Ail", "Oignon", "Poireau", "Échalote"],
    conditions: "Temps humide, rosées abondantes, températures modérées",
    cycle: "Survie sur débris infectés, dissémination par le vent",
    traitements: [
      {
        nom: "Fongicides à base de soufre",
        type: "chimique",
        efficacite: "haute",
        dosage: "Selon produit, traitement préventif",
        precautions: "Éviter par temps très chaud"
      },
      {
        nom: "Décoction de prêle",
        type: "naturel",
        efficacite: "moyenne",
        dosage: "Dilution 20%, pulvérisation préventive",
        precautions: "Application tous les 15 jours"
      },
      {
        nom: "Élimination des feuilles atteintes",
        type: "manuel",
        efficacite: "moyenne",
        dosage: "Retrait régulier des feuilles malades",
        precautions: "Désinfection des outils après usage"
      }
    ],
    prevention: [
      "Rotation des cultures sur 4 ans",
      "Espacement suffisant pour l'aération",
      "Éviter les excès d'azote",
      "Élimination des débris de culture",
      "Irrigation au goutte-à-goutte"
    ],
    diagnostic: {
      testSimple: "Frotter doucement une pustule",
      signeConfirmation: "Poudre orangée qui s'enlève"
    },
    images: [
      "https://gd.eppo.int/media/data/taxon/P/PUCCAL/pics/220x130/12731.jpg",
      "https://www.cabidigitallibrary.org/cms/10.1079/cabicompendium.45741/asset/b44d9816-681a-4175-9fd8-94f6bf56000f/assets/graphic/pucall2.jpg"
    ],
    references: [
      "Rouilles des alliacées",
      "Maladies fongiques des plantes bulbeuses"
    ]
  },
  {
    id: 11,
    nom: "Fusariose",
    nomScientifique: "Fusarium oxysporum",
    type: "fongique",
    severite: "haute à critique",
    description: "Maladie fongique vasculaire provoquant le flétrissement et la mort des plantes, particulièrement difficile à contrôler.",
    symptomes: [
      "Flétrissement unilatéral des feuilles",
      "Jaunissement progressif du feuillage",
      "Nécrose des tissus vasculaires (brunissement)",
      "Pourriture des racines",
      "Mort rapide de la plante"
    ],
    plantesAffectees: ["Pastèque", "Tomate", "Banane", "Palmier"],
    conditions: "Sol chaud (>25°C), stress hydrique, blessures racinaires",
    cycle: "Survie longue dans le sol (10+ ans), transmission par eau et outils",
    traitements: [
      {
        nom: "Plants greffés sur porte-greffes résistants",
        type: "culturel",
        efficacite: "haute",
        dosage: "n/a",
        precautions: "Solution la plus efficace"
      },
      {
        nom: "Solarisation du sol",
        type: "physique",
        efficacite: "moyenne",
        dosage: "4-6 semaines en été",
        precautions: "Nécessite ensoleillement intense"
      },
      {
        nom: "Mycorhizes",
        type: "biologique",
        efficacite: "moyenne",
        dosage: "Incorporation au sol avant plantation",
        precautions: "Efficacité préventive"
      }
    ],
    prevention: [
      "Utilisation de variétés résistantes",
      "Rotation très longue (minimum 5 ans)",
      "Drainage impeccable du sol",
      "Éviter les blessures aux racines",
      "Désinfection des outils"
    ],
    diagnostic: {
      testSimple: "Couper une tige basse longitudinalement",
      signeConfirmation: "Stries brunes dans les tissus vasculaires"
    },
    images: [
      "https://upload.wikimedia.org/wikipedia/commons/7/7c/Fusarium_oxysporum_E.F._Sm._%26_Swingle_4822044.jpg?_=20140726152131",
      "https://beta.iriisphytoprotection.qc.ca/sites/default/files/2023-02/Testing1_2211.jpg"
    ],
    references: [
      "Fusarium wilt - Compendium",
      "Maladies vasculaires des cultures"
    ]
  },
  {
    id: 12,
    nom: "Anthracnose",
    nomScientifique: "Colletotrichum lindemuthianum",
    type: "fongique",
    severite: "moyenne",
    description: "Maladie fongique affectant feuilles, tiges et fruits, provoquant des taches enfoncées caractéristiques pouvant ruiner la récolte.",
    symptomes: [
      "Taches circulaires brunes enfoncées sur fruits",
      "Lésions noires sur feuilles et tiges",
      "Pourriture des jeunes fruits",
      "Feuilles qui se dessèchent et tombent",
      "Graines infectées et décolorées"
    ],
    plantesAffectees: ["Haricot vert", "Tomate", "Concombre", "Courgette"],
    conditions: "Temps chaud et humide, blessures des plantes",
    cycle: "Survie sur semences et débris, dissémination par éclaboussures",
    traitements: [
      {
        nom: "Fongicides à base de cuivre",
        type: "chimique",
        efficacite: "haute",
        dosage: "Selon produit, traitement préventif",
        precautions: "Application régulière en période à risque"
      },
      {
        nom: "Traitement des semences, Traitements fongicides à base de cuivre (préventif), Variétés résistantes (quand disponibles)",
        type: "préventif",
        efficacite: "haute",
        dosage: "Trempage dans eau chaude (50°C, 25 min)",
        precautions: "Ne pas dépasser la température"
      },
      {
        nom: "Purin de consoude",
        type: "naturel",
        efficacite: "moyenne",
        dosage: "Dilution 10%, renforce les plantes",
        precautions: "Application foliaire"
      }
    ],
    prevention: [
      "Utilisation de semences saines",
      "Rotation des cultures sur 3 ans",
      "Éviter l'irrigation par aspersion",
      "Élimination des débris infectés",
      "Plants espacés pour une bonne aération"
    ],
    diagnostic: {
      testSimple: "Observer les taches avec une loupe",
      signeConfirmation: "Points noirs (fructifications) au centre des taches, Taches brun foncé à noires, souvent enfoncées sur les gousses, Lésions ovales sur les tiges et pétioles, Nervures noircies sous les feuilles, Graines tachées ou décolorées, Dépérissement en cas d’attaque sévère"
    },
    images: [
      "https://images.pexels.com/photos/6216299/pexels-photo-6216299.jpeg",
      "https://assets.syngenta.ca/images/pest/125/ca2020_anthracnose-bean2.png",
      "https://www.vegetables.cornell.edu/files/2021/05/BeanAnthColl.jpg"
    ],
    references: [
      "Anthracnose des légumineuses",
      "Maladies fongiques des fruits et légumes"
    ]
  },
  {
    id: 13,
    nom: "Carence en azote",
    type: "physiologique",
    severite: "faible à moyenne",
    description: "Déficience nutritionnelle provoquant un jaunissement généralisé des plantes et une croissance réduite.",
    symptomes: [
      "Jaunissement des feuilles les plus âgées",
      "Croissance ralentie et plantes chétives",
      "Feuilles petites et pâles",
      "Tiges minces et fragiles",
      "Floraison et fructification réduites"
    ],
    plantesAffectees: ["Toutes les plantes, surtout légumes feuilles"],
    conditions: "Sol pauvre, lessivage par pluies, pH inadapté",
    cycle: "n/a",
    traitements: [
      {
        nom: "Engrais azoté (sang séché, corne broyée)",
        type: "organique",
        efficacite: "haute",
        dosage: "Selon produit, incorporation au sol",
        precautions: "Ne pas surdoser"
      },
      {
        nom: "Purin d'ortie",
        type: "naturel",
        efficacite: "moyenne",
        dosage: "Dilution 5-10%, arrosage au pied",
        precautions: "Odeur forte"
      },
      {
        nom: "Compost bien décomposé",
        type: "organique",
        efficacite: "moyenne",
        dosage: "5kg/m², incorporation superficielle",
        precautions: "Longue action"
      }
    ],
    prevention: [
      "Apport régulier de matière organique",
      "Rotation avec légumineuses (fixatrices d'azote)",
      "Paillage organique (tontes, feuilles)",
      "Éviter le lessivage (paillage, couverture sol)",
      "Analyser régulièrement le sol"
    ],
    diagnostic: {
      testSimple: "Observer la progression du jaunissement",
      signeConfirmation: "Jaunissement commence par les vieilles feuilles"
    },
    images: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Blossom_end_rot_tomatoes_2017_A.jpg/1280px-Blossom_end_rot_tomatoes_2017_A.jpg?_=20171027061635",
      "https://images.pexels.com/photos/3070935/pexels-photo-3070935.jpeg"
    ],
    references: [
      "Nutrition des plantes",
      "Carences minérales en agriculture"
    ]
  },
  {
    id: 14,
    nom: "Pourriture apicale",
    type: "physiologique",
    severite: "moyenne",
    description: "Trouble physiologique causé par une carence en calcium dans les fruits en développement, non d'origine parasitaire.",
    symptomes: [
      "Tache brune ou noire au bout du fruit (côté opposé au pédoncule)",
      "Tache qui s'étend et se creuse",
      "Tissus nécrosés et secs",
      "Affecte surtout les premiers fruits",
      "Fruits immangeables mais plante saine"
    ],
    plantesAffectees: ["Tomate", "Poivron", "Aubergine", "Courgette"],
    conditions: "Alternance sécheresse/excès d'eau, sol pauvre en calcium, racines endommagées",
    cycle: "n/a",
    traitements: [
      {
        nom: "Apport de calcium foliaire",
        type: "chimique",
        efficacite: "haute",
        dosage: "Chlorure de calcium 0.5%, pulvérisation",
        precautions: "Application directe sur fruits"
      },
      {
        nom: "Arrosage régulier",
        type: "culturel",
        efficacite: "haute",
        dosage: "Maintenir sol constamment humide",
        precautions: "Goutte-à-goutte recommandé"
      },
      {
        nom: "Purin de consoude",
        type: "naturel",
        efficacite: "moyenne",
        dosage: "Dilution 10%, riche en calcium",
        precautions: "Application au sol et foliaire"
      }
    ],
    prevention: [
      "Arrosage régulier et constant",
      "Paillage pour maintenir l'humidité",
      "Apport de compost riche en calcium",
      "Éviter les excès d'azote",
      "Plants non stressés"
    ],
    diagnostic: {
      testSimple: "Observer l'extrémité des jeunes fruits",
      signeConfirmation: "Tache sèche et noire caractéristique"
    },
    images: [
      "https://cdn.shopify.com/s/files/1/0573/3993/6868/files/blossom-end-rot-tomato-in-hand.jpg?v=1713487070",
      "https://gardening.usask.ca/images/disorders-images/disorders-on-vegetables/blossom%20end%20rot.jpg"
    ],
    references: [
      "Troubles physiologiques des solanacées",
      "Carence en calcium chez les plantes"
    ]
  },
  {
    id: 15,
    nom: "Acariens (araignées rouges)",
    nomScientifique: "Tetranychus urticae",
    type: "ravageur",
    severite: "moyenne",
    description: "Acariens piqueurs qui provoquent une décoloration caractéristique des feuilles et affaiblissent considérablement les plantes.",
    symptomes: [
      "Ponctuations blanches ou jaunes sur feuilles",
      "Feuilles qui prennent un aspect grisâtre ou bronzé",
      "Toiles fines sur le revers des feuilles",
      "Feuilles qui se dessèchent et tombent",
      "Plantes affaiblies et croissance réduite"
    ],
    plantesAffectees: ["Aubergine", "Haricot", "Tomate", "Concombre", "Fraisier"],
    conditions: "Temps chaud et sec, faible humidité, plantes stressées",
    cycle: "Reproduction rapide (5 jours à 30°C), plusieurs générations",
    traitements: [
      {
        nom: "Acaricides spécifiques",
        type: "chimique",
        efficacite: "haute",
        dosage: "Selon produit, rotation des matières actives",
        precautions: "Résistance fréquente, alterner les produits"
      },
      {
        nom: "Soufre mouillable",
        type: "naturel",
        efficacite: "moyenne",
        dosage: "5g/L, pulvérisation sur revers feuilles",
        precautions: "Éviter par temps chaud"
      },
      {
        nom: "Acariens prédateurs (Phytoseiulus)",
        type: "biocontrôle",
        efficacite: "haute",
        dosage: "Introduction précoce, 5-10/m²",
        precautions: "Humidité relative >60% nécessaire"
      }
    ],
    prevention: [
      "Maintenir une humidité élevée (brumisation)",
      "Élimination des mauvaises herbes hôtes",
      "Surveillance régulière du revers des feuilles",
      "Plants vigoureux et bien arrosés",
      "Rotation des cultures"
    ],
    diagnostic: {
      testSimple: "Secouer une feuille sur papier blanc",
      signeConfirmation: "Petits points rouges qui bougent"
    },
    images: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Tetranychus_urticae_%284884160894%29.jpg/1280px-Tetranychus_urticae_%284884160894%29.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Tetranychus_urticae_with_silk_threads.jpg/1280px-Tetranychus_urticae_with_silk_threads.jpg"
    ],
    references: [
      "Acariens des cultures",
      "Lutte intégrée contre Tetranychus"
    ]
  },
  {
    id: 16,
    nom: "Mouche des semis",
    nomScientifique: "Delia platura",
    type: "ravageur",
    severite: "moyenne",
    description: "Mouche dont les larves creusent des galeries dans les semences et les plantules, provoquant leur mort avant ou après la levée.",
    symptomes: [
      "Semences qui ne germent pas",
      "Plantules qui flétrissent et meurent",
      "Galeries dans les tiges et racines",
      "Plantes chétives et croissance ralentie",
      "Présence de petites mouches autour des plants"
    ],
    plantesAffectees: ["Haricot", "Mais", "Tournesol", "Courge"],
    conditions: "Sol frais et humide, semis direct",
    cycle: "Plusieurs générations par an, pupes hivernent",
    traitements: [
      {
        nom: "Traitement des semences",
        type: "chimique",
        efficacite: "haute",
        dosage: "Enrobage insecticide des semences",
        precautions: "Respecter les doses"
      },
      {
        nom: "Pièges chromatiques",
        type: "mécanique",
        efficacite: "moyenne",
        dosage: "Plaques jaunes engluées",
        precautions: "Placer près du sol"
      },
      {
        nom: "Nématodes entomopathogènes",
        type: "biologique",
        efficacite: "moyenne",
        dosage: "Arrosage au moment du semis",
        precautions: "Sol humide et frais"
      }
    ],
    prevention: [
      "Semis en godets sous abri",
      "Repiquage de plants déjà développés",
      "Rotation des cultures",
      "Éviter les fumures fraîches",
      "Travail du sol avant semis"
    ],
    diagnostic: {
      testSimple: "Examiner les semences et jeunes plants",
      signeConfirmation: "Galeries dans les tissus et larves blanches"
    },
    images: [
      "https://pixabay.com/images/download/x-173784_1920.jpg",
      "https://pixabay.com/photos/caterpillar-maggot-black-prickly-143181/"
    ],
    references: [
      "Ravageurs des semis et plantules",
      "Insectes du sol en agriculture"
    ]
  }
];

const SearchPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const initialQuery = queryParams.get('q') || '';
  const categoryParam = queryParams.get('category') || 'all';

  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [results, setResults] = useState({
    plants: [],
    diseases: [],
    treatments: [],
    articles: [],
    webResults: []
  });
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    category: categoryParam,
    type: 'all',
    severite: 'all',
    saison: 'all',
    famille: 'all',
    sortBy: 'pertinence',
    searchMode: 'all',
    googleSite: 'all',
    googleDate: 'anytime'
  });
  const [recentSearches, setRecentSearches] = useState([]);
  const [searchStats, setSearchStats] = useState({
    total: 0,
    time: 0,
    source: { internal: 0, google: 0 }
  });
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [expandedResult, setExpandedResult] = useState(null);
  const [showTechnicalSheet, setShowTechnicalSheet] = useState(false);
  const [selectedPlant, setSelectedPlant] = useState(null);

  // Recherches populaires avec statistiques
  const popularSearches = [
    { query: 'Tomate mildiou traitement', type: 'disease', count: 245, trend: 'up' },
    { query: 'Rosier oïdium naturel', type: 'disease', count: 189, trend: 'stable' },
    { query: 'Traitement biologique pucerons', type: 'treatment', count: 156, trend: 'up' },
    { query: 'Carence azote tomate', type: 'article', count: 132, trend: 'down' },
    { query: 'Puceron traitement maison', type: 'treatment', count: 121, trend: 'up' },
    { query: 'Papayer maladies soins', type: 'plant', count: 98, trend: 'stable' },
    { query: 'Engrais naturel tomate', type: 'treatment', count: 87, trend: 'up' },
    { query: 'Rotation cultures jardin', type: 'article', count: 76, trend: 'up' }
  ];

  // Charger les recherches récentes
  useEffect(() => {
    const savedSearches = localStorage.getItem('recentSearches');
    if (savedSearches) {
      setRecentSearches(JSON.parse(savedSearches));
    }
  }, []);

  // Recherche Google Custom Search
  const searchGoogle = useCallback(async (query) => {
    if (!GOOGLE_CSE_ID || GOOGLE_CSE_ID === 'd49b0b4f632a84e23') {
      console.warn('Google CSE non configuré. Utilisation de données simulées.');
      // Données simulées pour la démonstration
      return [
       {
      id: '1',
      title: 'Plant Disease Diagnosis - FAO Knowledge Platform',
      link: 'https://www.fao.org/agriculture/crops/thematic-sitemap/theme/pests/ipm/en/',
      snippet: 'Comprehensive guide to plant disease identification and integrated pest management from Food and Agriculture Organization.',
      displayLink: 'fao.org',
      formattedUrl: 'https://www.fao.org/agriculture/crops/...',
      source: 'fao',
      language: 'en',
      relevance: 0.95
    },
    {
      id: '2',
      title: 'PlantVillage Database - Penn State University',
      link: 'https://plantvillage.psu.edu/topics',
      snippet: 'Open access plant disease database with images, symptoms, and treatments. Contains information on hundreds of plant diseases.',
      displayLink: 'plantvillage.psu.edu',
      formattedUrl: 'https://plantvillage.psu.edu/topics',
      source: 'academic',
      language: 'en',
      relevance: 0.92
    },
       {
      id: '3',
      title: 'CABI Invasive Species Compendium',
      link: 'https://www.cabi.org/isc/',
      snippet: 'Free database of invasive species and plant diseases with detailed datasheets and distribution maps.',
      displayLink: 'cabi.org',
      formattedUrl: 'https://www.cabi.org/isc/',
      source: 'scientific',
      language: 'en',
      relevance: 0.88
    },
    {
      id: '4',
      title: 'USDA Plant Disease Database',
      link: 'https://nt.ars-grin.gov/fungaldatabases/',
      snippet: 'U.S. Department of Agriculture fungal database with thousands of plant disease records.',
      displayLink: 'ars-grin.gov',
      formattedUrl: 'https://nt.ars-grin.gov/fungaldatabases/',
      source: 'government',
      language: 'en',
      relevance: 0.85
    },
    {
      id: '5',
      title: 'PubMed Central - Plant Pathology Articles',
      link: 'https://www.ncbi.nlm.nih.gov/pmc/?term=plant+disease',
      snippet: 'Free full-text scientific articles on plant pathology and disease management from NIH.',
      displayLink: 'ncbi.nlm.nih.gov',
      formattedUrl: 'https://www.ncbi.nlm.nih.gov/pmc/...',
      source: 'scientific',
      language: 'en',
      relevance: 0.82
    },
    {
      id: '6',
      title: 'World Vegetable Center - Disease Guides',
      link: 'https://avrdc.org/seed/plant-health/',
      snippet: 'Practical guides for diagnosing and treating vegetable diseases in tropical regions.',
      displayLink: 'avrdc.org',
      formattedUrl: 'https://avrdc.org/seed/plant-health/',
      source: 'research',
      language: 'en',
      relevance: 0.80
    },
    {
      id: '7',
      title: 'EPPO Global Database',
      link: 'https://gd.eppo.int/',
      snippet: 'European and Mediterranean Plant Protection Organization database with pest and disease information.',
      displayLink: 'eppo.int',
      formattedUrl: 'https://gd.eppo.int/',
      source: 'international',
      language: 'en',
      relevance: 0.78
    },
    {
      id: '8',
      title: 'Plantwise Knowledge Bank',
      link: 'https://www.plantwise.org/knowledgebank/',
      snippet: 'Free agricultural advice including pest and disease management for smallholder farmers.',
      displayLink: 'plantwise.org',
      formattedUrl: 'https://www.plantwise.org/knowledgebank/',
      source: 'ngo',
      language: 'en',
      relevance: 0.75
    },
    {
      id: '9',
      title: 'Royal Botanic Gardens Kew - Plant Resources',
      link: 'https://www.kew.org/science',
      snippet: 'Scientific resources and databases on plants including disease information.',
      displayLink: 'kew.org',
      formattedUrl: 'https://www.kew.org/science',
      source: 'botanical',
      language: 'en',
      relevance: 0.72
    },
    {
      id: '10',
      title: 'MERLOT - Plant Science Resources',
      link: 'https://www.merlot.org/merlot/materials.htm?category=2741',
      snippet: 'Open educational resources for plant science and agriculture from California State University.',
      displayLink: 'merlot.org',
      formattedUrl: 'https://www.merlot.org/merlot/materials.htm...',
      source: 'educational',
      language: 'en',
      relevance: 0.70
    }
      ];
    }

    try {
      const params = {
        key: GOOGLE_API_KEY,
        cx: GOOGLE_CSE_ID,
        q: `${query} agriculture jardinage plantes maladies`,
        num: 5,
        safe: 'active',
        lr: 'lang_fr',
        gl: 'fr',
        cr: 'countryFR'
      };

      // Filtres supplémentaires
      if (filters.googleSite !== 'all') {
        switch(filters.googleSite) {
          case 'official':
            params.siteSearch = 'gouv.fr,agriculture.gouv.fr,inra.fr';
            break;
          case 'academic':
            params.siteSearch = '.edu,.ac.,ncbi.nlm.nih.gov,hal.science';
            break;
          case 'forum':
            params.siteSearch = 'forum,jardinage,aujardin.info';
            break;
          case 'blog':
            params.siteSearch = 'blog,gerbeaud.com,rustica.fr';
            break;
        }
      }

      if (filters.googleDate !== 'anytime') {
        params.dateRestrict = filters.googleDate;
      }

      const response = await axios.get('https://www.googleapis.com/customsearch/v1', { params });
      
      return response.data.items?.map(item => ({
        id: item.cacheId,
        title: item.title,
        link: item.link,
        snippet: item.snippet,
        displayLink: item.displayLink,
        formattedUrl: item.formattedUrl,
        image: item.pagemap?.cse_image?.[0]?.src,
        source: 'google'
      })) || [];

    } catch (error) {
      console.error('Erreur Google Search:', error);
      return [];
    }
  }, [filters.googleSite, filters.googleDate]);

  // Recherche interne
  const searchInternal = useCallback((query) => {
    const queryLower = query.toLowerCase().trim();
    
    // Recherche dans les plantes
    const plantsResults = plantsDatabase.filter(plant => {
      const matchesQuery = 
        plant.nomCommun.toLowerCase().includes(queryLower) ||
        plant.nomScientifique.toLowerCase().includes(queryLower) ||
        plant.famille.toLowerCase().includes(queryLower) ||
        plant.description.toLowerCase().includes(queryLower) ||
        (plant.culture?.climat && plant.culture.climat.toLowerCase().includes(queryLower)) ||
        (plant.maladies && plant.maladies.some(m => 
          typeof m === 'object' ? m.nom.toLowerCase().includes(queryLower) : m.toLowerCase().includes(queryLower)
        )) ||
        (plant.traitements && plant.traitements.some(t => 
          typeof t === 'object' ? t.nom.toLowerCase().includes(queryLower) : t.toLowerCase().includes(queryLower)
        ));
      
      const matchesFilters = 
        (filters.saison === 'all' || plant.saison.includes(filters.saison)) &&
        (filters.famille === 'all' || plant.famille === filters.famille);
      return matchesQuery && matchesFilters;
    });

    // Recherche dans les maladies
    const diseasesResults = diseasesDatabase.filter(disease => {
      const matchesQuery = 
        disease.nom.toLowerCase().includes(queryLower) ||
        (disease.nomScientifique && disease.nomScientifique.toLowerCase().includes(queryLower)) ||
        disease.description.toLowerCase().includes(queryLower) ||
        (disease.plantesAffectees && disease.plantesAffectees.some(p => p.toLowerCase().includes(queryLower))) ||
        (disease.symptomes && disease.symptomes.some(s => s.toLowerCase().includes(queryLower)));
      
      const matchesFilters = 
        (filters.type === 'all' || disease.type === filters.type) &&
        (filters.severite === 'all' || disease.severite === filters.severite);
      
      return matchesQuery && matchesFilters;
    });

    // Articles simulés
    const articlesResults = [
      {
        id: 1,
        title: 'Guide complet de la culture biologique',
        excerpt: 'Toutes les techniques pour cultiver vos légumes sans produits chimiques, du semis à la récolte.',
        category: 'guide',
        readTime: '15 min',
        date: '2026-01-15',
        views: 1245,
        author: 'Jean Dupont',
        tags: ['biologique', 'techniques', 'débutant']
      },
      {
        id: 2,
        title: 'Les associations de plantes bénéfiques',
        excerpt: 'Découvrez quelles plantes cultiver ensemble pour favoriser leur croissance et repousser les parasites.',
        category: 'conseils',
        readTime: '8 min',
        date: '2026-01-10',
        views: 987,
        author: 'Marie Martin',
        tags: ['associations', 'compagnonnage', 'biodiversité']
      },
      {
        id: 3,
        title: 'Compostage : transformez vos déchets en or noir',
        excerpt: 'Tout savoir sur le compostage : techniques, erreurs à éviter, utilisation au jardin.',
        category: 'pratique',
        readTime: '12 min',
        date: '2024-01-05',
        views: 765,
        author: 'Pierre Leroy',
        tags: ['compost', 'fertilité', 'recyclage']
      }
    ].filter(article => 
      article.title.toLowerCase().includes(queryLower) ||
      article.excerpt.toLowerCase().includes(queryLower) ||
      article.tags.some(tag => tag.toLowerCase().includes(queryLower))
    );

    // Traitements (extraits des maladies)
    const treatmentsResults = [];
    diseasesResults.forEach(disease => {
      if (disease.traitements) {
        disease.traitements.forEach(traitement => {
          treatmentsResults.push({
            id: `${disease.id}-${traitement.nom}`,
            nom: traitement.nom,
            type: traitement.type,
            efficacite: traitement.efficacite,
            description: `Pour traiter ${disease.nom} : ${traitement.dosage || ''}`,
            maladieCible: disease.nom
          });
        });
      }
    });

    // Appliquer le tri
    const sortResults = (array) => {
      switch(filters.sortBy) {
        case 'nom':
          return array.sort((a, b) => (a.nomCommun || a.nom || a.title).localeCompare(b.nomCommun || b.nom || b.title));
        case 'famille':
          return array.sort((a, b) => (a.famille || '').localeCompare(b.famille || ''));
        case 'saison':
          return array.sort((a, b) => (a.saison || '').localeCompare(b.saison || ''));
        case 'date':
          return array.sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0));
        case 'views':
          return array.sort((a, b) => (b.views || 0) - (a.views || 0));
        default:
          return array;
      }
    };

    return {
      plants: sortResults(plantsResults),
      diseases: sortResults(diseasesResults),
      treatments: sortResults(treatmentsResults),
      articles: sortResults(articlesResults)
    };
  }, [filters.saison, filters.famille, filters.type, filters.severite, filters.sortBy]);

  // Effectuer la recherche complète
  const performSearch = useCallback(debounce(async (query) => {
    if (!query.trim()) {
      setResults({ plants: [], diseases: [], treatments: [], articles: [], webResults: [] });
      setSearchStats({ total: 0, time: 0, source: { internal: 0, google: 0 } });
      return;
    }

    const startTime = performance.now();
    setLoading(true);
    setGoogleLoading(true);
    setError(null);

    try {
      // Recherche interne
      const internalStart = performance.now();
      const internalResults = searchInternal(query);
      const internalTime = performance.now() - internalStart;

      // Recherche Google
      let googleResults = [];
      let googleTime = 0;
      
      if (filters.searchMode === 'google' || filters.searchMode === 'all') {
        const googleStart = performance.now();
        googleResults = await searchGoogle(query);
        googleTime = performance.now() - googleStart;
      }

      const endTime = performance.now();
      const totalTime = Math.round(endTime - startTime);

      // Combiner les résultats
      setResults({
        ...internalResults,
        webResults: googleResults
      });

      // Calculer les statistiques
      const totalInternal = 
        internalResults.plants.length +
        internalResults.diseases.length +
        internalResults.treatments.length +
        internalResults.articles.length;

      setSearchStats({
        total: totalInternal + googleResults.length,
        time: totalTime,
        source: {
          internal: totalInternal,
          google: googleResults.length,
          internalTime: Math.round(internalTime),
          googleTime: Math.round(googleTime)
        }
      });

      // Mettre à jour l'historique
      if (query.trim() && !recentSearches.includes(query)) {
        const updatedSearches = [query, ...recentSearches.filter(s => s !== query)].slice(0, 10);
        setRecentSearches(updatedSearches);
        localStorage.setItem('recentSearches', JSON.stringify(updatedSearches));
      }

    } catch (error) {
      console.error('Erreur de recherche:', error);
      setError('Une erreur est survenue lors de la recherche. Veuillez réessayer.');
    } finally {
      setLoading(false);
      setGoogleLoading(false);
    }
  }, [searchInternal, searchGoogle, filters.searchMode, recentSearches]), []);

  // Démarrer la recherche quand la requête ou les filtres changent
  useEffect(() => {
    if (searchQuery.trim()) {
      performSearch(searchQuery);
    }
  }, [searchQuery, filters, performSearch]);

  // Mettre à jour l'URL
  useEffect(() => {
    const params = new URLSearchParams();
    if (searchQuery) params.set('q', searchQuery);
    if (filters.category !== 'all') params.set('category', filters.category);
    navigate(`/search?${params.toString()}`, { replace: true });
  }, [searchQuery, filters.category, navigate]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      performSearch(searchQuery);
    }
  };

  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      category: 'all',
      type: 'all',
      severite: 'all',
      saison: 'all',
      famille: 'all',
      sortBy: 'pertinence',
      searchMode: 'all',
      googleSite: 'all',
      googleDate: 'anytime'
    });
  };

  const clearSearch = () => {
    setSearchQuery('');
    setResults({ plants: [], diseases: [], treatments: [], articles: [], webResults: [] });
    setSearchStats({ total: 0, time: 0, source: { internal: 0, google: 0 } });
    setExpandedResult(null);
  };

  const getResultCount = () => searchStats.total;

  const highlightText = (text, query) => {
    if (!query || !text) return text;
    const regex = new RegExp(`(${query.split(' ').filter(q => q.length > 2).join('|')})`, 'gi');
    return text.split(regex).map((part, index) =>
      regex.test(part) ? <mark key={index} className="highlight">{part}</mark> : part
    );
  };

  const getUniqueFamilies = () => [...new Set(plantsDatabase.map(p => p.famille))];
  const getUniqueSeasons = () => [...new Set(plantsDatabase.flatMap(p => p.saison.split(/[,/]/).map(s => s.trim()).filter(s => s)))];

  const toggleExpandResult = (type, id) => {
    setExpandedResult(expandedResult === `${type}-${id}` ? null : `${type}-${id}`);
  };

  const handlePlantClick = (plant) => {
    setSelectedPlant(plant);
    setShowTechnicalSheet(true);
  };

  const getSearchEngineConfig = () => {
    if (!GOOGLE_CSE_ID || GOOGLE_CSE_ID === 'd49b0b4f632a84e23') {
      return { configured: false, message: "Google Search configuré en mode démonstration" };
    }
    return { configured: true, message: "Google Search entièrement fonctionnel" };
  };

  const googleConfig = getSearchEngineConfig();

  return (
    <div className="search-page">
      {/* Barre de recherche principale */}
      <div className="search-hero">
        <div className="search-hero-header">
          
          
          <div className="search-engine-badge">
            {filters.searchMode === 'internal' && (
              <span className="badge badge-internal">
                <FaDatabase /> Base locale
              </span>
            )}
            {filters.searchMode === 'google' && (
              <span className="badge badge-google">
                <FaGoogle /> Google Search
              </span>
            )}
            {filters.searchMode === 'all' && (
              <span className="badge badge-all">
                <FaLayerGroup /> 
              </span>
            )}
          </div>
        </div>
        
        <h1>Recherche avancée</h1>
        <p>Trouvez des informations précises sur les plantes, maladies et traitements</p>
        
        <form className="main-search-form" onSubmit={handleSearch}>
          <div className="search-input-container">
           
            <input
              type="text"
              className="main-search-input"
              placeholder="Rechercher plantes, maladies, traitements..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus
            />
            {searchQuery && (
              <button
                type="button"
                className="clear-search"
                onClick={clearSearch}
                aria-label="Effacer la recherche"
              >
                <FaTimes />
              </button>
            )}
          </div>
          
          {/* Sélecteur de moteur de recherche */}
          <div className="search-engine-selector">
            <button
              type="button"
              className={`engine-btn ${filters.searchMode === 'internal' ? 'active' : ''}`}
              onClick={() => handleFilterChange('searchMode', 'internal')}
              title="Recherche dans notre base de données locale"
            >
              <FaDatabase />
              <span>Base locale</span>
            </button>
            <button
              type="button"
              className={`engine-btn ${filters.searchMode === 'google' ? 'active' : ''}`}
              onClick={() => handleFilterChange('searchMode', 'google')}
              title="Recherche sur Google"
            >
              <FaGoogle />
              <span>Google</span>
            </button>
            <button
              type="button"
              className={`engine-btn ${filters.searchMode === 'all' ? 'active' : ''}`}
              onClick={() => handleFilterChange('searchMode', 'all')}
              title="Recherche combinée"
            >
              <FaLayerGroup />
              <span>Combinée</span>
            </button>
          </div>
          
          <button type="submit" className="search-btn" disabled={loading}>
            {loading ? (
              <>
                <FaSpinner className="spinner" /> Recherche...
              </>
            ) : (
              <>
                <FaSearch /> Rechercher
                {filters.searchMode === 'google' && <FaGoogle className="google-icon" />}
              </>
            )}
          </button>
        </form>

      {/* Suggestions thématiques */}
<div className="thematic-suggestions">
  <h4>Recherches thématiques :</h4>
  <div className="thematic-buttons">
    <button
      className="thematic-btn disease-btn"
      onClick={() => {
        setSearchQuery('maladie tomate traitement');
        performSearch('maladie tomate traitement');
      }}
      title="Maladies courantes de la tomate et leurs traitements"
    >
      <FaBug /> Maladies tomate
    </button>
    <button
      className="thematic-btn treatment-btn"
      onClick={() => {
        setSearchQuery('traitement naturel jardin');
        performSearch('traitement naturel jardin');
      }}
      title="Traitements biologiques et naturels pour le jardin"
    >
      <FaFlask /> Traitements naturels
    </button>
    <button
      className="thematic-btn plant-btn"
      onClick={() => {
        setSearchQuery('plantes tropicales culture');
        performSearch('plantes tropicales culture');
      }}
      title="Culture et entretien des plantes tropicales"
    >
      <FaTree /> Plantes tropicales
    </button>
    <button
      className="thematic-btn plant-btn"
      onClick={() => {
        setSearchQuery('papayer culture maladie');
        performSearch('papayer culture maladie');
      }}
      title="Culture du papayer et maladies courantes"
    >
      <FaLeaf /> Papayer
    </button>
    <button
      className="thematic-btn disease-btn"
      onClick={() => {
        setSearchQuery('mildiou traitement prévention');
        performSearch('mildiou traitement prévention');
      }}
      title="Lutte contre le mildiou sur tomates et pommes de terre"
    >
      <FaBug /> Mildiou
    </button>
    <button
      className="thematic-btn disease-btn"
      onClick={() => {
        setSearchQuery('oïdium traitement naturel');
        performSearch('oïdium traitement naturel');
      }}
      title="Traitements naturels contre l'oïdium"
    >
      <FaBug /> Oïdium
    </button>
  </div>
  
  {/* Toutes les espèces */}
  <div className="species-section">
    <h5>Rechercher par espèce :</h5>
    <div className="species-grid">
      {/* Papayer */}
      <button
        className="species-btn"
        onClick={() => {
          setSearchQuery('Carica papaya culture');
          performSearch('Carica papaya culture');
        }}
        title="Papayer - Carica papaya"
      >
        <FaSeedling /> Papayer
      </button>
      
      {/* Tomate */}
      <button
        className="species-btn"
        onClick={() => {
          setSearchQuery('Solanum lycopersicum tomate');
          performSearch('Solanum lycopersicum tomate');
        }}
        title="Tomate - Solanum lycopersicum"
      >
        <FaSeedling /> Tomate
      </button>
      
      {/* Gombo */}
      <button
        className="species-btn"
        onClick={() => {
          setSearchQuery('Abelmoschus esculentus gombo');
          performSearch('Abelmoschus esculentus gombo');
        }}
        title="Gombo - Abelmoschus esculentus"
      >
        <FaSeedling /> Gombo
      </button>
      
      {/* Piment */}
      <button
        className="species-btn"
        onClick={() => {
          setSearchQuery('Capsicum frutescens piment');
          performSearch('Capsicum frutescens piment');
        }}
        title="Piment - Capsicum frutescens"
      >
        <FaSeedling /> Piment
      </button>
      
      {/* Poivron */}
      <button
        className="species-btn"
        onClick={() => {
          setSearchQuery('Capsicum annuum poivron');
          performSearch('Capsicum annuum poivron');
        }}
        title="Poivron - Capsicum annuum"
      >
        <FaSeedling /> Poivron
      </button>
      
      {/* Aubergine */}
      <button
        className="species-btn"
        onClick={() => {
          setSearchQuery('Solanum melongena aubergine');
          performSearch('Solanum melongena aubergine');
        }}
        title="Aubergine - Solanum melongena"
      >
        <FaSeedling /> Aubergine
      </button>
      
      {/* Chou */}
      <button
        className="species-btn"
        onClick={() => {
          setSearchQuery('Brassica oleracea chou');
          performSearch('Brassica oleracea chou');
        }}
        title="Chou - Brassica oleracea"
      >
        <FaSeedling /> Chou
      </button>
      
      {/* Laitue */}
      <button
        className="species-btn"
        onClick={() => {
          setSearchQuery('Lactuca sativa laitue');
          performSearch('Lactuca sativa laitue');
        }}
        title="Laitue - Lactuca sativa"
      >
        <FaSeedling /> Laitue
      </button>
      
      {/* Oignon */}
      <button
        className="species-btn"
        onClick={() => {
          setSearchQuery('Allium cepa oignon');
          performSearch('Allium cepa oignon');
        }}
        title="Oignon - Allium cepa"
      >
        <FaSeedling /> Oignon
      </button>
      
      {/* Ail */}
      <button
        className="species-btn"
        onClick={() => {
          setSearchQuery('Allium sativum ail');
          performSearch('Allium sativum ail');
        }}
        title="Ail - Allium sativum"
      >
        <FaSeedling /> Ail
      </button>
      
      {/* Carotte */}
      <button
        className="species-btn"
        onClick={() => {
          setSearchQuery('Daucus carota carotte');
          performSearch('Daucus carota carotte');
        }}
        title="Carotte - Daucus carota"
      >
        <FaSeedling /> Carotte
      </button>
      
      {/* Concombre */}
      <button
        className="species-btn"
        onClick={() => {
          setSearchQuery('Cucumis sativus concombre');
          performSearch('Cucumis sativus concombre');
        }}
        title="Concombre - Cucumis sativus"
      >
        <FaSeedling /> Concombre
      </button>
      
      {/* Courgette */}
      <button
        className="species-btn"
        onClick={() => {
          setSearchQuery('Cucurbita pepo courgette');
          performSearch('Cucurbita pepo courgette');
        }}
        title="Courgette - Cucurbita pepo"
      >
        <FaSeedling /> Courgette
      </button>
      
      {/* Pastèque */}
      <button
        className="species-btn"
        onClick={() => {
          setSearchQuery('Citrullus lanatus pastèque');
          performSearch('Citrullus lanatus pastèque');
        }}
        title="Pastèque - Citrullus lanatus"
      >
        <FaSeedling /> Pastèque
      </button>
      
      {/* Melon */}
      <button
        className="species-btn"
        onClick={() => {
          setSearchQuery('Cucumis melo melon');
          performSearch('Cucumis melo melon');
        }}
        title="Melon - Cucumis melo"
      >
        <FaSeedling /> Melon
      </button>
      
      {/* Haricot vert */}
      <button
        className="species-btn"
        onClick={() => {
          setSearchQuery('Phaseolus vulgaris haricot vert');
          performSearch('Phaseolus vulgaris haricot vert');
        }}
        title="Haricot vert - Phaseolus vulgaris"
      >
        <FaSeedling /> Haricot vert
      </button>
    </div>
  </div>
  
  {/* Toutes les maladies */}
  <div className="diseases-section">
    <h5>Rechercher par maladie :</h5>
    <div className="diseases-grid">
      {/* Pourriture du collet */}
      <button
        className="disease-btn-small"
        onClick={() => {
          setSearchQuery('pourriture collet traitement');
          performSearch('pourriture collet traitement');
        }}
        title="Pourriture du collet sur papayer"
      >
        <FaBug /> Pourriture collet
      </button>
      
      {/* Oïdium */}
      <button
        className="disease-btn-small"
        onClick={() => {
          setSearchQuery('oïdium traitement biologique');
          performSearch('oïdium traitement biologique');
        }}
        title="Oïdium - maladies fongiques"
      >
        <FaBug /> Oïdium
      </button>
      
      {/* Mildiou */}
      <button
        className="disease-btn-small"
        onClick={() => {
          setSearchQuery('mildiou tomate traitement');
          performSearch('mildiou tomate traitement');
        }}
        title="Mildiou sur tomates et pommes de terre"
      >
        <FaBug /> Mildiou
      </button>
      
      {/* Alternariose */}
      <button
        className="disease-btn-small"
        onClick={() => {
          setSearchQuery('alternariose traitement');
          performSearch('alternariose traitement');
        }}
        title="Alternariose sur tomates et choux"
      >
        <FaBug /> Alternariose
      </button>
      
      {/* Pucerons */}
      <button
        className="disease-btn-small"
        onClick={() => {
          setSearchQuery('pucerons traitement naturel');
          performSearch('pucerons traitement naturel');
        }}
        title="Lutte contre les pucerons"
      >
        <FaBug /> Pucerons
      </button>
      
      {/* Mosaïque */}
      <button
        className="disease-btn-small"
        onClick={() => {
          setSearchQuery('virus mosaïque traitement');
          performSearch('virus mosaïque traitement');
        }}
        title="Virus de la mosaïque"
      >
        <FaBug /> Mosaïque
      </button>
      
      {/* Flétrissement */}
      <button
        className="disease-btn-small"
        onClick={() => {
          setSearchQuery('flétrissement bactérien');
          performSearch('flétrissement bactérien');
        }}
        title="Flétrissement bactérien sur aubergine"
      >
        <FaBug /> Flétrissement
      </button>
      
      {/* Piéride */}
      <button
        className="disease-btn-small"
        onClick={() => {
          setSearchQuery('piéride du chou traitement');
          performSearch('piéride du chou traitement');
        }}
        title="Piéride du chou"
      >
        <FaBug /> Piéride
      </button>
      
      {/* Pourriture bulbe */}
      <button
        className="disease-btn-small"
        onClick={() => {
          setSearchQuery('pourriture bulbe oignon');
          performSearch('pourriture bulbe oignon');
        }}
        title="Pourriture du bulbe d'oignon"
      >
        <FaBug /> Pourriture bulbe
      </button>
      
      {/* Rouille */}
      <button
        className="disease-btn-small"
        onClick={() => {
          setSearchQuery('rouille ail traitement');
          performSearch('rouille ail traitement');
        }}
        title="Rouille sur ail"
      >
        <FaBug /> Rouille
      </button>
      
      {/* Fusariose */}
      <button
        className="disease-btn-small"
        onClick={() => {
          setSearchQuery('fusariose traitement');
          performSearch('fusariose traitement');
        }}
        title="Fusariose sur pastèque"
      >
        <FaBug /> Fusariose
      </button>
      
      {/* Anthracnose */}
      <button
        className="disease-btn-small"
        onClick={() => {
          setSearchQuery('anthracnose haricot traitement');
          performSearch('anthracnose haricot traitement');
        }}
        title="Anthracnose sur haricot vert"
      >
        <FaBug /> Anthracnose
      </button>
      
      {/* Pourriture apicale */}
      <button
        className="disease-btn-small"
        onClick={() => {
          setSearchQuery('pourriture apicale tomate');
          performSearch('pourriture apicale tomate');
        }}
        title="Pourriture apicale sur tomates et poivrons"
      >
        <FaBug /> Pourriture apicale
      </button>
      
      {/* Hernie du chou */}
      <button
        className="disease-btn-small"
        onClick={() => {
          setSearchQuery('hernie du chou traitement');
          performSearch('hernie du chou traitement');
        }}
        title="Hernie du chou"
      >
        <FaBug /> Hernie du chou
      </button>
      
      {/* Mouche de la carotte */}
      <button
        className="disease-btn-small"
        onClick={() => {
          setSearchQuery('mouche carotte traitement');
          performSearch('mouche carotte traitement');
        }}
        title="Mouche de la carotte"
      >
        <FaBug /> Mouche carotte
      </button>
      
      {/* Sclérotiniose */}
      <button
        className="disease-btn-small"
        onClick={() => {
          setSearchQuery('sclérotiniose traitement');
          performSearch('sclérotiniose traitement');
        }}
        title="Sclérotiniose sur laitue"
      >
        <FaBug /> Sclérotiniose
      </button>
    </div>
  </div>
  
  {/* Thèmes supplémentaires */}
  <div className="additional-themes">
    <h5>Thèmes complémentaires :</h5>
    <div className="theme-buttons">
      <button
        className="theme-btn"
        onClick={() => {
          setSearchQuery('fertilisation organique plantes');
          performSearch('fertilisation organique plantes');
        }}
        title="Fertilisation organique pour les plantes"
      >
        <FaLeaf /> Fertilisation
      </button>
      <button
        className="theme-btn"
        onClick={() => {
          setSearchQuery('irrigation économie eau jardin');
          performSearch('irrigation économie eau jardin');
        }}
        title="Techniques d'irrigation économes en eau"
      >
        <FaTint /> Irrigation
      </button>
      <button
        className="theme-btn"
        onClick={() => {
          setSearchQuery('compostage domestique');
          performSearch('compostage domestique');
        }}
        title="Compostage domestique et utilisation"
      >
        <FaRecycle /> Compostage
      </button>
      <button
        className="theme-btn"
        onClick={() => {
          setSearchQuery('association plantes compagnonnage');
          performSearch('association plantes compagnonnage');
        }}
        title="Association de plantes et compagnonnage"
      >
        <FaUsers /> Compagnonnage
      </button>
      <button
        className="theme-btn"
        onClick={() => {
          setSearchQuery('rotation cultures jardin');
          performSearch('rotation cultures jardin');
        }}
        title="Rotation des cultures au jardin"
      >
        <FaSync /> Rotation cultures
      </button>
      <button
        className="theme-btn"
        onClick={() => {
          setSearchQuery('lutte biologique ravageurs');
          performSearch('lutte biologique ravageurs');
        }}
        title="Lutte biologique contre les ravageurs"
      >
        <FaShieldAlt /> Lutte biologique
      </button>
    </div>
  </div>
</div>
          </div>
        

        {/* Info configuration Google */}
        {filters.searchMode === 'google' || filters.searchMode === 'all' ? (
          <div className="google-config-info">
            <FaInfoCircle />
            <span>{googleConfig.message}</span>
            {!googleConfig.configured && (
              <a href="#" className="config-link" onClick={(e) => {
                e.preventDefault();
                alert('Pour configurer Google Search :\n1. Créez un compte Google CSE\n2. Obtenez votre CX et API Key\n3. Ajoutez-les au fichier .env');
              }}>
                Comment configurer ?
              </a>
            )}
          </div>
        ) : null}
    

      {/* Filtres avancés */}
      <div className="search-filters-container">
        <div className="filters-header">
          <div className="filters-title">
            <FaFilter />
            <h3>Filtres avancés</h3>
            <button 
              className="toggle-filters-btn"
              onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
            >
              {showAdvancedFilters ? <FaCaretUp /> : <FaCaretDown />}
              {showAdvancedFilters ? 'Masquer' : 'Afficher'} les filtres
            </button>
          </div>
          <button
            className="clear-filters-btn"
            onClick={clearFilters}
            disabled={Object.values(filters).every(v => v === 'all' || v === 'pertinence' || v === 'anytime')}
          >
            <FaTimes /> Réinitialiser
          </button>
        </div>

        {showAdvancedFilters && (
          <div className="filters-grid">
            {/* Filtres Google */}
            {(filters.searchMode === 'google' || filters.searchMode === 'all') && (
              <div className="filter-section google-filters">
                <h4><FaGoogle /> Filtres Google</h4>
                <div className="filter-group">
                  <label>Type de site</label>
                  <select
                    value={filters.googleSite}
                    onChange={(e) => handleFilterChange('googleSite', e.target.value)}
                  >
                    <option value="all">Tous les sites</option>
                    <option value="official">Sites officiels (.gouv.fr)</option>
                    <option value="academic">Articles académiques</option>
                    <option value="forum">Forums et communautés</option>
                    <option value="blog">Blogs spécialisés</option>
                  </select>
                </div>

                <div className="filter-group">
                  <label>Date de publication</label>
                  <select
                    value={filters.googleDate}
                    onChange={(e) => handleFilterChange('googleDate', e.target.value)}
                  >
                    <option value="anytime">Toutes dates</option>
                    <option value="d1">Dernières 24h</option>
                    <option value="w1">Dernière semaine</option>
                    <option value="m1">Dernier mois</option>
                    <option value="y1">Dernière année</option>
                  </select>
                </div>
              </div>
            )}

            {/* Filtres base de données */}
            {(filters.searchMode === 'internal' || filters.searchMode === 'all') && (
              <div className="filter-section internal-filters">
                <h4><FaDatabase /> Filtres base locale</h4>
                
                <div className="filter-group">
                  <label>Famille botanique</label>
                  <select
                    value={filters.famille}
                    onChange={(e) => handleFilterChange('famille', e.target.value)}
                  >
                    <option value="all">Toutes les familles</option>
                    {getUniqueFamilies().map(famille => (
                      <option key={famille} value={famille}>{famille}</option>
                    ))}
                  </select>
                </div>

                <div className="filter-group">
                  <label>Saison de culture</label>
                  <select
                    value={filters.saison}
                    onChange={(e) => handleFilterChange('saison', e.target.value)}
                  >
                    <option value="all">Toutes les saisons</option>
                    {getUniqueSeasons().map(saison => (
                      <option key={saison} value={saison}>{saison}</option>
                    ))}
                  </select>
                </div>

                {filters.category === 'diseases' && (
                  <>
                    <div className="filter-group">
                      <label>Type de maladie</label>
                      <select
                        value={filters.type}
                        onChange={(e) => handleFilterChange('type', e.target.value)}
                      >
                        <option value="all">Tous les types</option>
                        <option value="fongique">Fongique</option>
                        <option value="bacterienne">Bactérienne</option>
                        <option value="virale">Virale</option>
                        <option value="parasitaire">Parasitaire</option>
                      </select>
                    </div>

                    <div className="filter-group">
                      <label>Sévérité</label>
                      <select
                        value={filters.severite}
                        onChange={(e) => handleFilterChange('severite', e.target.value)}
                      >
                        <option value="all">Toutes sévérités</option>
                        <option value="faible">Faible</option>
                        <option value="moyenne">Moyenne</option>
                        <option value="haute">Haute</option>
                      </select>
                    </div>
                  </>
                )}
              </div>
            )}

            {/* Tri */}
            <div className="filter-section sort-section">
              <h4><FaSortAmountDown /> Tri des résultats</h4>
              <div className="filter-group">
                <select
                  value={filters.sortBy}
                  onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                >
                  <option value="pertinence">Pertinence</option>
                  <option value="nom">Nom (A-Z)</option>
                  {filters.searchMode === 'google' ? (
                    <>
                      <option value="date">Date (récent)</option>
                      <option value="rating">Notation</option>
                    </>
                  ) : (
                    <>
                      <option value="famille">Famille</option>
                      <option value="saison">Saison</option>
                      <option value="views">Popularité</option>
                    </>
                  )}
                </select>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Résultats de recherche */}
      <div className="search-results">
        {loading ? (
          <div className="loading-results">
            <div className="spinner-large"></div>
            <p>Recherche en cours...</p>
            <p className="loading-details">
              {filters.searchMode === 'all' && 'Recherche locale et Google en cours'}
              {filters.searchMode === 'google' && 'Recherche Google en cours'}
              {filters.searchMode === 'internal' && 'Recherche base locale en cours'}
            </p>
          </div>
        ) : error ? (
          <div className="error-message">
            <FaExclamationTriangle className="error-icon" />
            <h3>Erreur de recherche</h3>
            <p>{error}</p>
            <button className="retry-btn" onClick={() => performSearch(searchQuery)}>
              Réessayer
            </button>
          </div>
        ) : searchQuery ? (
          <>
            {/* En-tête des résultats */}
            <div className="results-header">
              <h2>
                {getResultCount()} résultat{getResultCount() > 1 ? 's' : ''} pour "{searchQuery}"
              </h2>
              {getResultCount() > 0 && (
                <div className="results-actions">
                  <button className="export-btn" onClick={() => {
                    const data = {
                      query: searchQuery,
                      results: results,
                      timestamp: new Date().toISOString()
                    };
                    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = `recherche-${searchQuery}.json`;
                    a.click();
                    toast.success('Résultats exportés !');
                  }}>
                    <FaExternalLinkAlt /> Exporter
                  </button>
                  <button className="save-search-btn" onClick={() => {
                    const savedSearches = JSON.parse(localStorage.getItem('savedSearches') || '[]');
                    if (!savedSearches.includes(searchQuery)) {
                      savedSearches.push(searchQuery);
                      localStorage.setItem('savedSearches', JSON.stringify(savedSearches));
                      toast.success('Recherche sauvegardée !');
                    }
                  }}>
                    <FaStar /> Sauvegarder
                  </button>
                </div>
              )}
            </div>

            {/* Résultats Google */}
            {results.webResults.length > 0 && (
              <div className="results-category web-results">
                <div className="category-header">
                  <h3>
                    <FaGoogle /> Résultats Web ({results.webResults.length})
                  </h3>
                  <span className="category-subtitle">
                    Sources externes via Google Search
                  </span>
                  {googleLoading && (
                    <span className="loading-indicator">
                      <FaSpinner className="spinner-small" /> Google...
                    </span>
                  )}
                </div>

                <div className="web-results-grid">
                  {results.webResults.map((result, index) => (
                    <div key={result.id || index} className="web-result-card">
                      <div className="web-result-header">
                        <div className="site-info">
                          <span className="site-domain">{result.displayLink}</span>
                          <FaExternalLinkAlt className="external-icon" />
                        </div>
                        {result.image && (
                          <div className="result-image">
                            <img src={result.image} alt={result.title} />
                          </div>
                        )}
                      </div>
                      
                      <a 
                        href={result.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="web-result-link"
                      >
                        <h4>{highlightText(result.title, searchQuery)}</h4>
                      </a>
                      
                      <p className="web-snippet">{highlightText(result.snippet, searchQuery)}</p>
                      
                      <div className="web-result-footer">
                        <a 
                          href={result.link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="visit-btn"
                        >
                          <FaExternalLinkAlt /> Visiter
                        </a>
                        <button 
                          className="related-search-btn"
                          onClick={() => {
                            setSearchQuery(result.title.split(' ').slice(0, 3).join(' '));
                            performSearch(result.title.split(' ').slice(0, 3).join(' '));
                          }}
                        >
                          Recherche similaire
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Plus de résultats Google */}
                {searchQuery && (
                  <div className="more-google-results">
                    <a 
                      href={`https://www.google.com/search?q=${encodeURIComponent(searchQuery + ' agriculture plantes')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="more-results-btn"
                    >
                      <FaGoogle /> Plus de résultats Google pour "{searchQuery}"
                    </a>
                  </div>
                )}
              </div>
            )}

            {/* Résultats Plantes */}
            {results.plants.length > 0 && (
              <div className="results-category plants-results">
                <div className="category-header">
                  <h3>
                    <FaSeedling /> Plantes ({results.plants.length})
                  </h3>
                  <span className="category-subtitle">
                    Base de données Garapix
                  </span>
                </div>
                <div className="results-grid">
                  {results.plants.map(plant => (
                    <div key={plant.id} className="result-card plant-card">
                      <div className="card-header">
                        <div className="plant-icon">
                          <FaTree />
                        </div>
                        <h4>{highlightText(plant.nomCommun, searchQuery)}</h4>
                        <button 
                          className="expand-btn"
                          onClick={() => toggleExpandResult('plant', plant.id)}
                        >
                          {expandedResult === `plant-${plant.id}` ? <FaCaretUp /> : <FaCaretDown />}
                        </button>
                      </div>
                      
                      <p className="scientific-name">
                        <em>{highlightText(plant.nomScientifique, searchQuery)}</em>
                      </p>
                      
                      <p className="plant-description">
                        {highlightText(plant.description.substring(0, 150), searchQuery)}...
                      </p>
                      
                      <div className="plant-meta">
                        <span className="meta-item">
                          <strong>Famille:</strong> {plant.famille}
                        </span>
                        <span className="meta-item">
                          <FaSun /> {plant.saison}
                        </span>
                        <span className="meta-item">
                          <FaTint /> {plant.culture?.besoinEau || 'Modéré'}
                        </span>
                      </div>
     {/* Section détaillée */}
{expandedResult === `plant-${plant.id}` && (
  <div className="expanded-details">
    {plant.images && plant.images.length > 0 && (
      <div className="plant-image">
        <img src={plant.images[0]} alt={plant.nomCommun} />
      </div>
    )}

    <div className="details-grid">
      <div className="detail-item">
        <strong>Climat:</strong> {plant.culture?.climat}
      </div>
      <div className="detail-item">
        <strong>Exposition:</strong> {plant.culture?.exposition}
      </div>
      <div className="detail-item">
        <strong>Sol:</strong> {plant.culture?.sol?.type}
      </div>
      <div className="detail-item">
        <strong>Cycle:</strong> {plant.cycle}
      </div>
      <div className="detail-item">
        <strong>Origine:</strong> {plant.origine}
      </div>
    </div>

    {plant.maladies && plant.maladies.length > 0 && (
      <div className="diseases-section">
        <h5>Maladies courantes :</h5>
        <div className="disease-tags">
          {plant.maladies.map((maladie, idx) => (
            <span key={idx} className="disease-tag">
              {typeof maladie === 'object' ? maladie.nom : maladie}
            </span>
          ))}
        </div>
      </div>
    )}

    {plant.traitements && plant.traitements.length > 0 && (
      <div className="treatments-section">
        <h5>Traitements recommandés :</h5>
        <ul>
          {plant.traitements.map((traitement, idx) => (
            <li key={idx}>
              {typeof traitement === 'object'
                ? traitement.nom
                : traitement}
            </li>
          ))}
        </ul>
      </div>
    )}

    <button
      className="technical-sheet-btn"
      onClick={() => handlePlantClick(plant)}
    >
      <FaBook /> Fiche technique complète
    </button>
  </div>
)}

<div className="card-footer">
  <span className="card-id">ID: {plant.id}</span>

  {/* ✅ BOUTON CORRIGÉ : ouvre la modale */}
  <button
    className="detail-btn"
    onClick={() => handlePlantClick(plant)}
  >
    <FaArrowRight /> Voir détails
  </button>
</div>

                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Aucun résultat */}
            {getResultCount() === 0 && (
              <div className="no-results">
                <FaSearch className="no-results-icon" />
                <h3>Aucun résultat trouvé pour "{searchQuery}"</h3>
                <p>Essayez ces suggestions :</p>
                <div className="suggestions">
                  <ul>
                    <li>Vérifiez l'orthographe des mots</li>
                    <li>Utilisez des termes plus généraux</li>
                    <li>Essayez des synonymes</li>
                    <li>Changez de moteur de recherche (Google vs Base locale)</li>
                  </ul>
                </div>
                <button className="help-btn" onClick={() => navigate('/help/search')}>
                  <FaInfoCircle /> Aide à la recherche
                </button>
              </div>
            )}
          </>
        ) : (
          /* Page d'accueil de recherche (sans requête) */
          <div className="search-suggestions">
            {/* Recherches récentes */}
            {recentSearches.length > 0 && (
              <div className="suggestion-section">
                <div className="section-header">
                  <FaHistory />
                  <h3>Vos recherches récentes</h3>
                </div>
                <div className="suggestion-tags">
                  {recentSearches.map((search, index) => (
                    <button
                      key={index}
                      className="suggestion-tag recent"
                      onClick={() => {
                        setSearchQuery(search);
                        performSearch(search);
                      }}
                    >
                      {search}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Recherches populaires */}
            <div className="suggestion-section">
              <div className="section-header">
                <FaFire />
                <h3>Recherches populaires</h3>
              </div>
              <div className="popular-searches-grid">
                {popularSearches.map((search, index) => (
                  <button
                    key={index}
                    className="popular-search-card"
                    onClick={() => {
                      setSearchQuery(search.query);
                      performSearch(search.query);
                    }}
                  >
                    <div className="popular-search-header">
                      <span className="query">{search.query}</span>
                      <span className={`trend trend-${search.trend}`}>
                        {search.trend === 'up' && '↗'}
                        {search.trend === 'down' && '↘'}
                        {search.trend === 'stable' && '→'}
                      </span>
                    </div>
                    <div className="popular-search-meta">
                      <span className="type">{search.type}</span>
                      <span className="count">{search.count} recherches</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Statistiques globales */}
            <div className="stats-section">
              <div className="stats-card">
                <FaDatabase className="stats-icon" />
                <div className="stats-content">
                  <h4>Base de données</h4>
                  <p>{plantsDatabase.length} plantes documentées</p>
                  <p>{diseasesDatabase.length} maladies identifiées</p>
                </div>
              </div>
              <div className="stats-card">
                <FaGoogle className="stats-icon" />
                <div className="stats-content">
                  <h4>Recherche Google</h4>
                  <p>Accès à des milliers de sources</p>
                  <p>Filtres par type et date</p>
                </div>
              </div>
              <div className="stats-card">
                <FaCheckCircle className="stats-icon" />
                <div className="stats-content">
                  <h4>Informations vérifiées</h4>
                  <p>Sources fiables et actuelles</p>
                  <p>Expertise botanique</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Modal pour la fiche technique */}
      {showTechnicalSheet && selectedPlant && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Fiche technique : {selectedPlant.nomCommun}</h2>
              <button className="close-modal" onClick={() => setShowTechnicalSheet(false)}>
                <FaTimes />
              </button>
            </div>
            <div className="modal-body">
              <div className="plant-technical-sheet">
                <div className="sheet-header">
                  <h3>{selectedPlant.nomScientifique}</h3>
                  <p className="plant-family">Famille : {selectedPlant.famille}</p>
                </div>

                <div className="sheet-section">
                  <h4>Description</h4>
                  <p>{selectedPlant.description}</p>
                </div>
                <div className="sheet-section">
                  <h4>Caractéristiques</h4>
                  <div className="characteristics-grid">
                    <div className="characteristic">
                      <strong>Hauteur :</strong> {selectedPlant.caracteristiques?.hauteur}
                    </div>
                    <div className="characteristic">
                      <strong>Port :</strong> {selectedPlant.caracteristiques?.port}
                    </div>
                    <div className="characteristic">
                      <strong>Feuilles :</strong> {selectedPlant.caracteristiques?.feuilles}
                    </div>
                    <div className="characteristic">
                      <strong>Fleurs :</strong> {selectedPlant.caracteristiques?.fleurs}
                    </div>
                    <div className="characteristic">
                      <strong>Fruits :</strong> {selectedPlant.caracteristiques?.fruits}
                    </div>
                    <div className="characteristic">
                      <strong>Croissance :</strong> {selectedPlant.caracteristiques?.croissance}
                    </div>
                  </div>
                </div>
                
                <div className="sheet-section">
                  <h4>Culture</h4>
                  <div className="culture-grid">
                    <div className="culture-item">
                      <strong>Climat :</strong> {selectedPlant.culture?.climat}
                    </div>
                    <div className="culture-item">
                      <strong>Besoin en eau :</strong> {selectedPlant.culture?.besoinEau}
                    </div>
                    <div className="culture-item">
                      <strong>Exposition :</strong> {selectedPlant.culture?.exposition}
                    </div>
                    <div className="culture-item">
                      <strong>Type de sol :</strong> {selectedPlant.culture?.sol?.type}
                    </div>
                    <div className="culture-item">
                      <strong>pH du sol :</strong> {selectedPlant.culture?.sol?.pH}
                    </div>
                    <div className="culture-item">
                      <strong>Amendement :</strong> {selectedPlant.culture?.sol?.amendement}
                    </div>
                  </div>
                </div>

                
                {selectedPlant.maladies && selectedPlant.maladies.length > 0 && (
                  <div className="sheet-section">
                    <h4>Maladies courantes</h4>
                    <div className="diseases-list">
                      {selectedPlant.maladies.map((maladie, index) => (
                        <div key={index} className="disease-item">
                          <h5>{typeof maladie === 'object' ? maladie.nom : maladie}</h5>
                          {typeof maladie === 'object' && (
                            <>
                              <p><strong>Symptômes :</strong> {maladie.symptoms}</p>
                              <p><strong>Traitement :</strong> {maladie.traitement}</p>
                              <p><strong>Prévention :</strong> {maladie.prevention}</p>
                            </>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                <div className="sheet-section">
                  <h4>Valeur nutritionnelle</h4>
                  {selectedPlant.valeurNutritionnelle && (
                    <div className="nutrition-grid">
                      <div className="nutrition-item">
                        <strong>Calories :</strong> {selectedPlant.valeurNutritionnelle.calories}
                      </div>
                      <div className="nutrition-item">
                        <strong>Vitamines :</strong> {selectedPlant.valeurNutritionnelle.vitamines}
                      </div>
                      <div className="nutrition-item">
                        <strong>Minéraux :</strong> {selectedPlant.valeurNutritionnelle.mineraux}
                      </div>
                      <div className="nutrition-item">
                        <strong>Fibres :</strong> {selectedPlant.valeurNutritionnelle.fibres}
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="sheet-section">
                  <h4>Liens utiles</h4>
                  <div className="useful-links">
                    {selectedPlant.liensGoogle?.map((lien, index) => (
                      <a key={index} href={lien.url} target="_blank" rel="noopener noreferrer" className="useful-link">
                        <FaExternalLinkAlt /> {lien.titre}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-primary" onClick={() => setShowTechnicalSheet(false)}>
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchPage;