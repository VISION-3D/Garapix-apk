// src/data/plantsDatabase.js
const plantsDatabase = [
  {
    id: 1,
    nomCommun: "Papayer",
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
        prevention: "Plants certifiés sains, rotation des cultures"
      },
      {
        nom: "Pourriture du collet",
        symptoms: "Noircissement base tige, flétrissement soudain, odeur nauséabonde",
        traitement: "Fongicides à base de cuivre (bouillie bordelaise)",
        prevention: "Bon drainage, éviter excès d'eau, sol bien aéré"
      },
      {
        nom: "Anthracnose",
        symptoms: "Taches noires circulaires sur feuilles et fruits, pourriture",
        traitement: "Fongicides systémiques (Mancozèbe)",
        prevention: "Aération, élimination débris, rotation"
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
      "https://unsplash.com/fr/photos/une-planche-a-decouper-surmontee-dune-coupe-en-deux-papaye-6dCy7LgEoM4",
      "https://unsplash.com/fr/photos/une-feuille-verte-avec-des-gouttes-deau-dessus-nXaDYe6L1Kg"
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
        prevention: "Rotation, variétés résistantes, éviter humidité foliaire"
      },
      {
        nom: "Alternariose (Alternaria solani)",
        symptoms: "Taches concentriques brunes sur feuilles",
        traitement: "Fongicides à base de cuivre",
        prevention: "Rotation, élimination débris, bonne aération"
      },
      {
        nom: "Oïdium (Leveillula taurica)",
        symptoms: "Poudre blanche sur feuilles",
        traitement: "Soufre mouillable, bicarbonate de potassium",
        prevention: "Espacement suffisant, arrosage au sol"
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
      "https://images.unsplash.com/photo-1561136594-7f68413baa99?w=800&h=600&fit=crop&auto=format"
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
  {
    id: 3,
    nomCommun: "Gombo",
    nomScientifique: "Abelmoschus esculentus",
    famille: "Malvaceae",
    origine: "Afrique de l'Est",
    saison: "Saison des pluies (juin-septembre)",
    cycle: "Annuel",
    description: "Légume-fruit tropical riche en mucilage, très apprécié pour sa texture unique en cuisine africaine et asiatique.",
    caracteristiques: {
      hauteur: "1-2.5 mètres",
      port: "Tige dressée, légèrement ligneuse",
      feuilles: "Grandes, palmées, 5-7 lobes, poilues",
      fleurs: "Grandes, jaunes avec centre pourpre, éphémères",
      fruits: "Capsules anguleuses de 10-20 cm, vertes",
      croissance: "Rapide (fruits en 50-60 jours)",
      longevite: "4-6 mois"
    },
    culture: {
      climat: "Tropical chaud (25-35°C), sensible au froid",
      besoinEau: "Modéré mais régulier",
      exposition: "Plein soleil",
      sol: {
        type: "Riche, profond, bien drainé",
        pH: "6.0-7.5",
        amendement: "Fumier bien décomposé, compost"
      },
      plantation: {
        periode: "Début saison des pluies",
        espacement: "40-60 cm entre plants, 70-90 cm entre rangs",
        profondeur: "2-3 cm"
      },
      entretien: [
        "Binage régulier pour aérer le sol",
        "Buttage pour renforcer les plants",
        "Fertilisation avec NPK 10-10-10",
        "Paillage en fin de saison sèche"
      ]
    },
    maladies: [
      {
        nom: "Oïdium (Erysiphe cichoracearum)",
        symptoms: "Poudre blanche sur feuilles et tiges",
        traitement: "Soufre, bicarbonate de sodium",
        prevention: "Rotation, espacement suffisant"
      },
      {
        nom: "Pucerons (Aphis gossypii)",
        symptoms: "Feuilles déformées, miellat, fumagine",
        traitement: "Savon insecticide, pyrèthre naturel",
        prevention: "Plants sains, biodiversité"
      },
      {
        nom: "Pourriture des racines",
        symptoms: "Flétrissement, jaunissement, racines brunes",
        traitement: "Drainage amélioré",
        prevention: "Rotation, sol bien drainé"
      }
    ],
    traitements: [
      "Rotation avec céréales",
      "Traitement semences à l'eau chaude",
      "Pièges à insectes",
      "Purin de fougère contre pucerons"
    ],
    recolte: {
      periode: "50-60 jours après semis",
      signes: "Gousses jeunes (8-12 cm), fermes, se cassent net",
      conservation: "2-3 jours à température ambiante, 1 semaine au frais",
      rendement: "8-15 tonnes/ha"
    },
    valeurNutritionnelle: {
      calories: "33 kcal/100g",
      vitamines: "Vitamine C (23mg), K (31.3μg), A (716 UI)",
      mineraux: "Magnésium (57mg), calcium (82mg), potassium (299mg)",
      fibres: "3.2g/100g",
      mucilage: "Riche en polysaccharides visqueux"
    },
    utilisations: [
      "Sauces épaissies (gombo)",
      "Sautés, ragoûts",
      "Friture (beignets)",
      "Conserves, séchage"
    ],
    conseils: [
      "Récolter tous les 2-3 jours pour éviter fibres",
      "Ne pas stocker avec fruits climactériiques",
      "Écosser juste avant utilisation",
      "Conserver dans papier absorbant"
    ],
    images: [
       "https://images.unsplash.com/photo-1558408525-1092038389ae?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Z29tYm98ZW58MHx8MHx8fDA%3D",
      "https://images.unsplash.com/photo-1640147062904-d104ba4a78fc?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Z29tYm98ZW58MHx8MHx8fDA%3D"
    ],
    liensGoogle: [
      {
        titre: "Fiche culture gombo - FAO",
        url: "https://www.fao.org/3/x6900f/x6900f04.htm",
        type: "Officiel"
      }
    ]
  },
  {
    id: 4,
    nomCommun: "Piment",
    nomScientifique: "Capsicum frutescens",
    famille: "Solanaceae",
    origine: "Amérique tropicale",
    saison: "Toute l'année",
    cycle: "Vivace en climat chaud",
    description: "Plante condimentaire produisant des fruits très piquants grâce à la capsaïcine, utilisée en cuisine et médecine traditionnelle.",
    caracteristiques: {
      hauteur: "0.5-1.5 mètre",
      port: "Arbuste buissonnant",
      feuilles: "Alternes, ovales, pointues, vert foncé",
      fleurs: "Petites, blanches, solitaires",
      fruits: "Baies pendantes, rouges à maturité, formes variées",
      croissance: "Moyenne (fruits en 70-90 jours)",
      longevite: "2-3 ans en conditions optimales"
    },
    culture: {
      climat: "Tropical à subtropical (18-30°C)",
      besoinEau: "Modéré (tolérant à la sécheresse)",
      exposition: "Plein soleil",
      sol: {
        type: "Léger, bien drainé, riche",
        pH: "5.5-7.0",
        amendement: "Compost, cendres (riche en potassium)"
      },
      plantation: {
        periode: "Toute l'année en zone tropicale",
        espacement: "40-50 cm entre plants",
        profondeur: "Même niveau que le conteneur"
      },
      entretien: [
        "Taille pour favoriser ramification",
        "Paillage pour conserver humidité",
        "Fertilisation riche en potassium",
        "Protection contre vents forts"
      ]
    },
    maladies: [
      {
        nom: "Virus de la mosaïque",
        symptoms: "Marbrure feuilles, déformation fruits",
        traitement: "Aucun, élimination plants",
        prevention: "Lutte contre pucerons, outils désinfectés"
      },
      {
        nom: "Anthracnose (Colletotrichum spp.)",
        symptoms: "Taches enfoncées sur fruits, pourriture",
        traitement: "Fongicides à base de cuivre",
        prevention: "Rotation, élimination débris"
      },
      {
        nom: "Flétrissement bactérien",
        symptoms: "Flétrissement soudain sans jaunissement",
        traitement: "Difficile, élimination plants",
        prevention: "Sol sain, plants certifiés"
      }
    ],
    traitements: [
      "Rotation des cultures",
      "Désinfection des outils",
      "Paillage plastique contre maladies du sol",
      "Traitement semences à l'eau chaude"
    ],
    recolte: {
      periode: "70-90 jours après plantation",
      signes: "Fruits fermes, couleur vive selon variété",
      conservation: "Séchage, congélation, huile pimentée",
      rendement: "1-2 kg/plant"
    },
    valeurNutritionnelle: {
      calories: "40 kcal/100g",
      vitamines: "Vitamine C (144mg), A (952 UI)",
      mineraux: "Potassium (322mg), magnésium (23mg)",
      capsaïcine: "0.1-1% selon variété",
      fibres: "1.5g/100g"
    },
    utilisations: [
      "Condiment frais ou séché",
      "Sauces piquantes",
      "Médecine traditionnelle (analgésique)",
      "Insecticide naturel"
    ],
    conseils: [
      "Porter des gants lors de la manipulation",
      "Éviter de toucher visage et yeux",
      "Sécher à l'ombre pour conserver couleur",
      "Stériliser les bocaux pour conservation"
    ],
    images: [
      "https://images.unsplash.com/photo-1586201375761-83865001e3cb?w=800&h=600&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1594482351195-5a7a5a4768a3?w=800&h=600&fit=crop&auto=format"
    ],
    liensGoogle: [
      {
        titre: "Culture du piment - Chambre d'agriculture",
        url: "https://www.chambres-agriculture.fr/culture-piment",
        type: "Professionnel"
      }
    ]
  },
  {
    id: 5,
    nomCommun: "Poivron",
    nomScientifique: "Capsicum annuum",
    famille: "Solanaceae",
    origine: "Amérique centrale",
    saison: "Saison sèche",
    cycle: "Annuel",
    description: "Variété douce du piment, cultivée pour ses fruits charnus multicolores, riche en vitamines et faible en calories.",
    caracteristiques: {
      hauteur: "0.5-1 mètre",
      port: "Buisson dressé",
      feuilles: "Alternes, ovales, pointues, vert moyen",
      fleurs: "Blanches, solitaires, autofertiles",
      fruits: "Baies creuses, charnues, vertes puis jaunes/rouges",
      croissance: "Moyenne (fruits en 70-90 jours)",
      longevite: "6-8 mois"
    },
    culture: {
      climat: "Tempéré chaud (20-30°C), sensible au froid",
      besoinEau: "Régulier mais sans excès",
      exposition: "Plein soleil",
      sol: {
        type: "Profond, riche, bien drainé",
        pH: "6.0-7.0",
        amendement: "Compost, engrais complet"
      },
      plantation: {
        periode: "Fin saison des pluies",
        espacement: "50 cm entre plants, 70 cm entre rangs",
        profondeur: "Jusqu'aux premières feuilles"
      },
      entretien: [
        "Tuteurage pour variétés productives",
        "Paillage pour réguler température sol",
        "Fertilisation équilibrée NPK",
        "Arrosage au goutte-à-goutte"
      ]
    },
    maladies: [
      {
        nom: "Mildiou (Phytophthora capsici)",
        symptoms: "Pourriture basale, flétrissement",
        traitement: "Fongicides systémiques",
        prevention: "Rotation, bon drainage, plants sains"
      },
      {
        nom: "Pourriture apicale",
        symptoms: "Tache noire au bout du fruit",
        traitement: "Apport calcium foliaire",
        prevention: "Arrosage régulier, pH adapté"
      },
      {
        nom: "Oïdium",
        symptoms: "Poudre blanche sur feuilles",
        traitement: "Soufre, bicarbonate",
        prevention: "Aération, espacement"
      }
    ],
    traitements: [
      "Rotation de 3-4 ans",
      "Solarisation du sol",
      "Purin de consoude (riche en calcium)",
      "Paillage plastique"
    ],
    recolte: {
      periode: "70-90 jours après plantation",
      signes: "Fruits fermes, couleur uniforme selon stade",
      conservation: "1-2 semaines au frais, 2-3 mois surgelés",
      rendement: "3-5 kg/m²"
    },
    valeurNutritionnelle: {
      calories: "26 kcal/100g",
      vitamines: "Vitamine C (128mg), A (3131 UI)",
      mineraux: "Potassium (211mg), magnésium (12mg)",
      fibres: "2.1g/100g",
      antioxydants: "Capsanthine (rouge)"
    },
    utilisations: [
      "Cru en salades",
      "Rôti, grillé, farci",
      "Conserves, pickles",
      "Coulis, sauces"
    ],
    conseils: [
      "Récolter vert pour stimuler production",
      "Laisser mûrir quelques fruits pour couleur",
      "Protéger du vent fort",
      "Éviter stress hydrique"
    ],
    images: [
      "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=800&h=600&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=800&h=600&fit=crop&auto=format"
    ],
    liensGoogle: [
      {
        titre: "Culture poivron - Ministère agriculture",
        url: "https://agriculture.gouv.fr/culture-poivron",
        type: "Officiel"
      }
    ]
  },
  {
    id: 6,
    nomCommun: "Aubergine",
    nomScientifique: "Solanum melongena",
    famille: "Solanaceae",
    origine: "Inde, Asie du Sud",
    saison: "Toute l'année en zone tropicale",
    cycle: "Annuel",
    description: "Plante potagère produisant des fruits charnus, généralement violets, riches en antioxydants et utilisée dans de nombreuses cuisines méditerranéennes et asiatiques.",
    caracteristiques: {
      hauteur: "0.6-1.5 mètre",
      port: "Tige dressée, parfois épineuse",
      feuilles: "Grandes, ovales, lobées, vert grisâtre, épineuses",
      fleurs: "Violacées, solitaires ou en grappes",
      fruits: "Baies de formes variées, généralement violettes",
      croissance: "Moyenne (fruits en 80-100 jours)",
      longevite: "6-9 mois"
    },
    culture: {
      climat: "Chaud (22-30°C), très sensible au froid",
      besoinEau: "Important mais sans excès",
      exposition: "Plein soleil",
      sol: {
        type: "Profond, riche, bien drainé",
        pH: "5.5-6.5",
        amendement: "Fumier bien décomposé, compost"
      },
      plantation: {
        periode: "Après dernières gelées",
        espacement: "60 cm entre plants, 80 cm entre rangs",
        profondeur: "Enterrer jusqu'aux premières feuilles"
      },
      entretien: [
        "Tuteurage pour soutenir fruits",
        "Paillage pour garder sol frais",
        "Fertilisation riche en potassium",
        "Taille pour limiter à 4-5 tiges"
      ]
    },
    maladies: [
      {
        nom: "Flétrissement bactérien (Ralstonia solanacearum)",
        symptoms: "Flétrissement soudain, vascularisation brune",
        traitement: "Difficile, élimination plants",
        prevention: "Rotation, plants sains, sol bien drainé"
      },
      {
        nom: "Mildiou (Phytophthora spp.)",
        symptoms: "Taches huileuses, pourriture fruits",
        traitement: "Fongicides à base de cuivre",
        prevention: "Éviter humidité feuillage"
      },
      {
        nom: "Acariens",
        symptoms: "Feuilles décolorées, toiles fines",
        traitement: "Soufre, acaricides",
        prevention: "Humidité ambiante, biodiversité"
      }
    ],
    traitements: [
      "Rotation longue (5 ans)",
      "Solarisation du sol",
      "Traitement semences à l'eau chaude",
      "Purin d'ortie en prévention"
    ],
    recolte: {
      periode: "80-100 jours après plantation",
      signes: "Fruits brillants, fermes, peau tendue",
      conservation: "1 semaine au frais, ne pas laver avant stockage",
      rendement: "3-8 kg/m²"
    },
    valeurNutritionnelle: {
      calories: "25 kcal/100g",
      vitamines: "Vitamine C (2.2mg), B6 (0.084mg)",
      mineraux: "Potassium (229mg), magnésium (14mg)",
      antioxydants: "Nasunine (peau violette), anthocyanes",
      fibres: "3g/100g"
    },
    utilisations: [
      "Ratatouille, moussaka",
      "Grillée, farcie",
      "Conserves, pickles",
      "Baba ghanoush"
    ],
    conseils: [
      "Récolter avant maturité complète",
      "Ne pas conserver avec fruits climactériiques",
      "Dégorgement au sel pour amertume",
      "Protéger du soleil brûlant"
    ],
    images: [
      "https://images.unsplash.com/photo-1591343395082-e120aa165bdc?w=800&h=600&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1592417817098-8fd3d9eb14a5?w=800&h=600&fit=crop&auto=format"
    ],
    liensGoogle: [
      {
        titre: "Culture aubergine - INRAE",
        url: "https://www.inrae.fr/culture-aubergine",
        type: "Scientifique"
      }
    ]
  },
  {
    id: 7,
    nomCommun: "Chou",
    nomScientifique: "Brassica oleracea var. capitata",
    famille: "Brassicaceae",
    origine: "Europe méditerranéenne",
    saison: "Saison fraîche",
    cycle: "Bisannuel cultivé en annuel",
    description: "Légume-feuille formant une pomme compacte, riche en composés soufrés aux propriétés anticancéreuses, très nutritif.",
    caracteristiques: {
      hauteur: "30-60 cm",
      port: "Rosette de feuilles formant pomme",
      feuilles: "Grandes, charnues, enveloppantes, vertes à violettes",
      fleurs: "Jaunes, en grappes (2ème année)",
      fruits: "Siliques allongées",
      croissance: "Lente (90-120 jours)",
      longevite: "6-9 mois"
    },
    culture: {
      climat: "Tempéré frais (15-20°C)",
      besoinEau: "Régulier (sol toujours frais)",
      exposition: "Plein soleil à mi-ombre",
      sol: {
        type: "Profond, riche, frais, argilo-limoneux",
        pH: "6.0-7.5",
        amendement: "Fumier décomposé, compost"
      },
      plantation: {
        periode: "Fin saison des pluies pour récolte saison sèche",
        espacement: "40-60 cm selon variété",
        profondeur: "Enterrer jusqu'aux premières feuilles"
      },
      entretien: [
        "Binage régulier",
        "Buttage pour renforcer plants",
        "Fertilisation azotée modérée",
        "Paillage pour garder fraîcheur"
      ]
    },
    maladies: [
      {
        nom: "Piéride du chou (Pieris brassicae)",
        symptoms: "Feuilles dévorées, chenilles vertes",
        traitement: "Bacillus thuringiensis, ramassage manuel",
        prevention: "Filets anti-insectes, associations"
      },
      {
        nom: "Alternariose (Alternaria brassicicola)",
        symptoms: "Taches noires concentriques sur feuilles",
        traitement: "Fongicides à base de cuivre",
        prevention: "Rotation, élimination débris"
      },
      {
        nom: "Hernie du chou (Plasmodiophora brassicae)",
        symptoms: "Galles sur racines, flétrissement",
        traitement: "Calcaire pour augmenter pH",
        prevention: "Rotation longue (7 ans), plants sains"
      }
    ],
    traitements: [
      "Rotation de 4-5 ans minimum",
      "Associations avec tomates, céleri",
      "Filets anti-insectes",
      "Purin de tanaisie contre piéride"
    ],
    recolte: {
      periode: "90-120 jours après plantation",
      signes: "Pomme ferme et compacte",
      conservation: "Plusieurs semaines au frais, 6 mois en choucroute",
      rendement: "2-4 kg/plant"
    },
    valeurNutritionnelle: {
      calories: "25 kcal/100g",
      vitamines: "Vitamine C (36.6mg), K (76μg)",
      mineraux: "Potassium (170mg), calcium (40mg)",
      glucosinolates: "Composés soufrés anticancéreux",
      fibres: "2.5g/100g"
    },
    utilisations: [
      "Cru en salade (coleslaw)",
      "Cuit (étuvé, braisé)",
      "Fermentation (choucroute, kimchi)",
      "Soupes, farcis"
    ],
    conseils: [
      "Arroser régulièrement sans mouiller feuilles",
      "Ne pas planter après autres brassicacées",
      "Éclaircir si trop serré",
      "Protéger du soleil intense"
    ],
    images: [
      "https://images.unsplash.com/photo-1540420773422-292677a4c9c9?w=800&h=600&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1574680178050-55c6a6a96e0a?w=800&h=600&fit=crop&auto=format"
    ],
    liensGoogle: [
      {
        titre: "Culture chou - Agriculture.gouv",
        url: "https://agriculture.gouv.fr/culture-chou",
        type: "Officiel"
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
    cycle: "Annuel",
    description: "Légume-feuille à croissance rapide, très apprécié en salade, existant en nombreuses variétés (pommée, batavia, romaine, feuille de chêne).",
    caracteristiques: {
      hauteur: "15-30 cm",
      port: "Rosette de feuilles",
      feuilles: "Variables selon type: lisses, frisées, rouges",
      fleurs: "Jaunes, petites (montaison en jours longs)",
      fruits: "Akènes surmontés d'une aigrette",
      croissance: "Très rapide (30-60 jours)",
      longevite: "2-3 mois"
    },
    culture: {
      climat: "Fraîs (10-20°C), sensible à la chaleur",
      besoinEau: "Important (sol toujours frais)",
      exposition: "Mi-ombre en climat chaud",
      sol: {
        type: "Léger, riche, bien drainé",
        pH: "6.0-7.0",
        amendement: "Compost léger"
      },
      plantation: {
        periode: "Période fraîche (octobre-mars en zone tropicale)",
        espacement: "25-30 cm selon variété",
        profondeur: "Surface (lumière nécessaire à germination)"
      },
      entretien: [
        "Arrosage régulier au goutte-à-goutte",
        "Paillage pour garder fraîcheur",
        "Fertilisation légère (trop d'azote favorise nitrates)",
        "Éclaircissage si semis direct"
      ]
    },
    maladies: [
      {
        nom: "Mildiou (Bremia lactucae)",
        symptoms: "Taches jaunes sur feuilles, moisissure blanche dessous",
        traitement: "Fongicides spécifiques",
        prevention: "Variétés résistantes, aération"
      },
      {
        nom: "Sclérotiniose",
        symptoms: "Pourriture blanche duveteuse à la base",
        traitement: "Élimination plants atteints",
        prevention: "Rotation, drainage"
      },
      {
        nom: "Pucerons",
        symptoms: "Feuilles déformées, colonies vertes/noires",
        traitement: "Savon insecticide, purin d'ortie",
        prevention: "Associations répulsives"
      }
    ],
    traitements: [
      "Rotation courte mais nécessaire",
      "Filets anti-insectes",
      "Purin de prêle contre mildiou",
      "Semis échelonnés"
    ],
    recolte: {
      periode: "30-60 jours après plantation",
      signes: "Feuilles tendres mais fermes",
      conservation: "3-5 jours au frais dans sac perforé",
      rendement: "1-2 kg/m²"
    },
    valeurNutritionnelle: {
      calories: "15 kcal/100g",
      vitamines: "Vitamine K (102μg), A (7405 UI)",
      mineraux: "Potassium (194mg), calcium (36mg)",
      eau: "95%",
      fibres: "1.3g/100g"
    },
    utilisations: [
      "Salades fraîches",
      "Sandwiches, wraps",
      "Cuite (soupes, braisée)",
      "Jus détox"
    ],
    conseils: [
      "Récolter le matin pour plus de fraîcheur",
      "Couper au-dessus du collet pour repousse",
      "Ne pas exposer au soleil après récolte",
      "Laver soigneusement (terre, parasites)"
    ],
    images: [
      "https://images.unsplash.com/photo-1540420773422-292677a4c9c9?w=800&h=600&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1518568814500-bf0f8d125f46?w=800&h=600&fit=crop&auto=format"
    ],
    liensGoogle: [
      {
        titre: "Culture laitue - INRAE",
        url: "https://www.inrae.fr/culture-laitue",
        type: "Scientifique"
      }
    ]
  },
  {
    id: 9,
    nomCommun: "Oignon",
    nomScientifique: "Allium cepa",
    famille: "Amaryllidaceae",
    origine: "Asie centrale",
    saison: "Saison sèche",
    cycle: "Bisannuel cultivé en annuel",
    description: "Plante bulbeuse cultivée pour son bulbe comestible, riche en composés soufrés aux propriétés antiseptiques et antioxydantes.",
    caracteristiques: {
      hauteur: "30-50 cm",
      port: "Feuilles dressées, bulbe souterrain",
      feuilles: "Cylindriques, creuses, vert bleuté",
      fleurs: "Blanches, en ombelle sphérique (2ème année)",
      fruits: "Capsules contenant graines noires",
      croissance: "Lente (90-150 jours)",
      longevite: "6-8 mois (bulbe de conservation)"
    },
    culture: {
      climat: "Tempéré à subtropical (13-24°C)",
      besoinEau: "Modéré, arrêter avant récolte",
      exposition: "Plein soleil",
      sol: {
        type: "Léger, sableux, bien drainé",
        pH: "6.0-7.0",
        amendement: "Peu d'azote, riche en phosphore/potassium"
      },
      plantation: {
        periode: "Saison sèche (semis: août-septembre)",
        espacement: "10-15 cm sur ligne, 30 cm entre rangs",
        profondeur: "Bulbilles: 2-3 cm, semis: surface"
      },
      entretien: [
        "Binage fréquent (désherbage)",
        "Buttage léger pour blanchiment",
        "Pas de fertilisation azotée excessive",
        "Arrêt irrigation 2-3 semaines avant récolte"
      ]
    },
    maladies: [
      {
        nom: "Pourriture du bulbe (Botrytis spp.)",
        symptoms: "Pourriture molle, moisissure grise",
        traitement: "Fongicides en prévention",
        prevention: "Bon séchage, rotation, drainage"
      },
      {
        nom: "Mildiou (Peronospora destructor)",
        symptoms: "Taches blanches sur feuilles, flétrissement",
        traitement: "Fongicides systémiques",
        prevention: "Rotation longue, plants sains"
      },
      {
        nom: "Mouche de l'oignon (Delia antiqua)",
        symptoms: "Feuilles jaunies, pourriture bulbe",
        traitement: "Insecticides, pièges",
        prevention: "Rotation, filets"
      }
    ],
    traitements: [
      "Rotation de 4-5 ans minimum",
      "Solarisation du sol",
      "Traitement bulbilles à l'eau chaude",
      "Associations avec carottes"
    ],
    recolte: {
      periode: "90-150 jours selon type",
      signes: "Feuilles jaunies et couchées",
      conservation: "Séchage 2-3 semaines à l'ombre, stockage frais et sec",
      rendement: "3-8 kg/m²"
    },
    valeurNutritionnelle: {
      calories: "40 kcal/100g",
      vitamines: "Vitamine C (7.4mg), B6 (0.12mg)",
      mineraux: "Potassium (146mg), soufre",
      composés: "Quercétine (antioxydant), allicine",
      fibres: "1.7g/100g"
    },
    utilisations: [
      "Condiment cru ou cuit",
      "Base aromatique (mirepoix)",
      "Conserves, pickles",
      "Médecine traditionnelle"
    ],
    conseils: [
      "Ne pas planter trop profondément",
      "Éviter fumure fraîche",
      "Tresser pour conservation",
      "Choisir variétés adaptées à photopériode"
    ],
    images: [
      "https://images.unsplash.com/photo-1580201092675-a0a6a6cafbb1?w=800&h=600&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1518977956812-cd3dbadaf4c7?w=800&h=600&fit=crop&auto=format"
    ],
    liensGoogle: [
      {
        titre: "Culture oignon - FAO",
        url: "https://www.fao.org/3/x6900f/x6900f05.htm",
        type: "Officiel"
      }
    ]
  },
  {
    id: 10,
    nomCommun: "Ail",
    nomScientifique: "Allium sativum",
    famille: "Amaryllidaceae",
    origine: "Asie centrale",
    saison: "Saison sèche",
    cycle: "Annuel",
    description: "Plante bulbeuse aux propriétés médicinales remarquables, utilisée comme condiment et remède traditionnel pour ses effets antibactériens et cardioprotecteurs.",
    caracteristiques: {
      hauteur: "30-60 cm",
      port: "Feuilles dressées, bulbe composé de caïeux",
      feuilles: "Plates, étroites, vert grisâtre",
      fleurs: "Rares (sauf ail à fleurs), ombelle",
      fruits: "Bulbilles aériens chez certaines variétés",
      croissance: "Lente (120-180 jours)",
      longevite: "6-10 mois (bulbe de conservation)"
    },
    culture: {
      climat: "Tempéré (froid nécessaire pour vernalisation)",
      besoinEau: "Faible, sol sec pendant maturation",
      exposition: "Plein soleil",
      sol: {
        type: "Léger, sableux, bien drainé",
        pH: "6.0-7.5",
        amendement: "Compost bien mûr, éviter fumure fraîche"
      },
      plantation: {
        periode: "Saison fraîche (octobre-décembre)",
        espacement: "10-15 cm sur ligne, 25-30 cm entre rangs",
        profondeur: "3-5 cm, pointe vers le haut"
      },
      entretien: [
        "Désherbage soigneux (concurrence racinaire)",
        "Pas d'arrosage excessif",
        "Buttage léger",
        "Suppression hampes florales pour gros bulbes"
      ]
    },
    maladies: [
      {
        nom: "Rouille (Puccinia allii)",
        symptoms: "Pustules orange sur feuilles",
        traitement: "Fongicides à base de soufre",
        prevention: "Rotation, espacement, éviter excès azote"
      },
      {
        nom: "Pourriture blanche (Sclerotium cepivorum)",
        symptoms: "Feuilles jaunes, pourriture bulbe, sclérotes noirs",
        traitement: "Difficile, sol contaminé longtemps",
        prevention: "Rotation très longue, plants sains"
      },
      {
        nom: "Mildiou (Peronospora destructor)",
        symptoms: "Taches grisâtres sur feuilles",
        traitement: "Fongicides cuivriques",
        prevention: "Bon drainage, aération"
      }
    ],
    traitements: [
      "Rotation de 5-6 ans minimum",
      "Traitement caïeux avant plantation (fongicide)",
      "Solarisation du sol",
      "Associations avec salades, betteraves"
    ],
    recolte: {
      periode: "120-180 jours après plantation",
      signes: "Feuilles jaunies aux 2/3",
      conservation: "Séchage 2-3 semaines à l'ombre ventilée, tressage",
      rendement: "0.5-1 kg/m²"
    },
    valeurNutritionnelle: {
      calories: "149 kcal/100g",
      vitamines: "Vitamine C (31mg), B6 (1.24mg)",
      mineraux: "Manganèse (1.67mg), sélénium (14.2μg)",
      composés: "Allicine (antibactérien), ajoène (antithrombotique)",
      fibres: "2.1g/100g"
    },
    utilisations: [
      "Condiment en cuisine",
      "Médecine traditionnelle (infections, hypertension)",
      "Insecticide naturel",
      "Conserves (ail confit)"
    ],
    conseils: [
      "Planter caïeux périphériques (plus vigoureux)",
      "Ne pas planter trop tôt (risque gel)",
      "Conserver quelques bulbes pour plantation",
      "Éviter sols lourds et humides"
    ],
    images: [
      "https://images.unsplash.com/photo-1548943487-a2e4e43b4853?w=800&h=600&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=800&h=600&fit=crop&auto=format"
    ],
    liensGoogle: [
      {
        titre: "Culture ail - Ministère agriculture",
        url: "https://agriculture.gouv.fr/culture-ail",
        type: "Officiel"
      }
    ]
  },
  {
    id: 11,
    nomCommun: "Carotte",
    nomScientifique: "Daucus carota sativus",
    famille: "Apiaceae",
    origine: "Afghanistan",
    saison: "Saison fraîche",
    cycle: "Bisannuel cultivé en annuel",
    description: "Légume-racine riche en bêta-carotène (provitamine A), apprécié pour sa polyvalence culinaire et ses bienfaits pour la vision et la peau.",
    caracteristiques: {
      hauteur: "20-30 cm (feuilles)",
      port: "Rosette de feuilles, racine pivotante",
      feuilles: "Finement divisées, vert clair",
      fleurs: "Blanches, en ombelle (2ème année)",
      fruits: "Diakènes couverts d'aiguillons",
      croissance: "Moyenne (70-120 jours)",
      longevite: "4-6 mois"
    },
    culture: {
      climat: "Tempéré frais (15-20°C)",
      besoinEau: "Régulier pour croissance uniforme",
      exposition: "Plein soleil à mi-ombre",
      sol: {
        type: "Profond, meuble, sablonneux, sans cailloux",
        pH: "6.0-7.0",
        amendement: "Compost très décomposé (pas de fumier frais)"
      },
      plantation: {
        periode: "Saison fraîche (semis direct)",
        espacement: "3-5 cm sur ligne après éclaircissage, 25-30 cm entre rangs",
        profondeur: "0.5-1 cm"
      },
      entretien: [
        "Éclaircissage impératif (2 fois)",
        "Binage superficiel",
        "Paillage pour garder fraîcheur",
        "Arrosage régulier sans à-coups"
      ]
    },
    maladies: [
      {
        nom: "Alternariose (Alternaria dauci)",
        symptoms: "Taches brunes sur feuilles, brûlure",
        traitement: "Fongicides à base de cuivre",
        prevention: "Rotation, semis sains"
      },
      {
        nom: "Mouche de la carotte (Psila rosae)",
        symptoms: "Galeries dans racines, feuilles rougies",
        traitement: "Insecticides systémiques",
        prevention: "Filets anti-insectes, associations"
      },
      {
        nom: "Rhizoctone violet",
        symptoms: "Pourriture racinaire, feuilles jaunes",
        traitement: "Rotation, drainage",
        prevention: "Éviter sols compactés"
      }
    ],
    traitements: [
      "Rotation de 3-4 ans",
      "Filets anti-insectes dès semis",
      "Associations avec poireaux, oignons",
      "Semis échelonnés"
    ],
    recolte: {
      periode: "70-120 jours selon variété",
      signes: "Collet légèrement élargi, couleur vive",
      conservation: "En terre jusqu'à besoin, 2-4 mois en silo",
      rendement: "3-6 kg/m²"
    },
    valeurNutritionnelle: {
      calories: "41 kcal/100g",
      vitamines: "Vitamine A (835μg équivalent rétinol), K (13.2μg)",
      mineraux: "Potassium (320mg), calcium (33mg)",
      caroténoïdes: "Bêta-carotène (8285μg), alpha-carotène",
      fibres: "2.8g/100g"
    },
    utilisations: [
      "Crue (râpée, bâtonnets)",
      "Cuite (purées, soupes, potées)",
      "Jus, smoothies",
      "Gâteau, confiture"
    ],
    conseils: [
      "Semer clair pour éviter éclaircissage",
      "Maintenir sol meuble en surface",
      "Récolter avant grossissement excessif",
      "Conserver sans feuilles"
    ],
    images: [
      "https://images.unsplash.com/photo-1598170845058-78131a90f4bf?w=800&h=600&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1590189182193-5d3c3fa2a51b?w=800&h=600&fit=crop&auto=format"
    ],
    liensGoogle: [
      {
        titre: "Culture carotte - INRAE",
        url: "https://www.inrae.fr/culture-carotte",
        type: "Scientifique"
      }
    ]
  },
  {
    id: 12,
    nomCommun: "Concombre",
    nomScientifique: "Cucumis sativus",
    famille: "Cucurbitaceae",
    origine: "Inde, Himalaya",
    saison: "Saison des pluies",
    cycle: "Annuel",
    description: "Légume-fruit à forte teneur en eau, rafraîchissant, largement consommé cru en salade ou transformé en pickles.",
    caracteristiques: {
      hauteur: "Rampant ou grimpant (2-3 m)",
      port: "Tiges rampantes avec vrilles",
      feuilles: "Grandes, palmées, rugueuses",
      fleurs: "Jaunes, mâles et femelles séparées",
      fruits: "Baies allongées, vertes, parfois épineuses",
      croissance: "Rapide (50-70 jours)",
      longevite: "3-4 mois"
    },
    culture: {
      climat: "Chaud (25-30°C), sensible au froid",
      besoinEau: "Très élevé (95% du fruit est eau)",
      exposition: "Plein soleil",
      sol: {
        type: "Profond, riche, bien drainé",
        pH: "6.0-7.0",
        amendement: "Fumier bien décomposé, compost"
      },
      plantation: {
        periode: "Début saison des pluies",
        espacement: "80-100 cm entre plants",
        profondeur: "2-3 cm"
      },
      entretien: [
        "Palissage pour économiser espace",
        "Paillage pour garder fraîcheur",
        "Fertilisation régulière",
        "Arrosage abondant et régulier"
      ]
    },
    maladies: [
      {
        nom: "Oïdium (Podosphaera xanthii)",
        symptoms: "Poudre blanche sur feuilles",
        traitement: "Soufre, bicarbonate, lait dilué",
        prevention: "Variétés résistantes, aération"
      },
      {
        nom: "Mildiou (Pseudoperonospora cubensis)",
        symptoms: "Taches anguleuses jaunes sur feuilles",
        traitement: "Fongicides systémiques",
        prevention: "Éviter humidité feuillage"
      },
      {
        nom: "Anthracnose",
        symptoms: "Taches brunes circulaires sur feuilles et fruits",
        traitement: "Fongicides à base de cuivre",
        prevention: "Rotation, élimination débris"
      }
    ],
    traitements: [
      "Rotation de 3-4 ans",
      "Traitement semences",
      "Purin de prêle en prévention",
      "Palissage pour aération"
    ],
    recolte: {
      periode: "50-70 jours après semis",
      signes: "Fruits fermes, couleur uniforme, avant jaunissement",
      conservation: "1 semaine au frais, 2-3 jours à température ambiante",
      rendement: "3-5 kg/plant"
    },
    valeurNutritionnelle: {
      calories: "15 kcal/100g",
      vitamines: "Vitamine K (16.4μg), C (2.8mg)",
      mineraux: "Potassium (147mg), magnésium (13mg)",
      eau: "96%",
      fibres: "0.5g/100g"
    },
    utilisations: [
      "Salades fraîches",
      "Pickles, conserves",
      "Smoothies détox",
      "Soins de beauté (masques)"
    ],
    conseils: [
      "Récolter jeunes pour éviter amertume",
      "Ne pas conserver avec fruits producteurs d'éthylène",
      "Arroser au pied sans mouiller feuilles",
      "Tailler pour favoriser fructification"
    ],
    images: [
      "https://images.unsplash.com/photo-1589621318501-4d28be7e3c4d?w=800&h=600&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1540420773422-292677a4c9c9?w=800&h=600&fit=crop&auto=format"
    ],
    liensGoogle: [
      {
        titre: "Culture concombre - FAO",
        url: "https://www.fao.org/3/x6900f/x6900f06.htm",
        type: "Officiel"
      }
    ]
  },
  {
    id: 13,
    nomCommun: "Courgette",
    nomScientifique: "Cucurbita pepo",
    famille: "Cucurbitaceae",
    origine: "Amérique centrale",
    saison: "Saison des pluies",
    cycle: "Annuel",
    description: "Légume-fruit de la famille des courges, récolté jeune, très productif et facile à cultiver, avec des fleurs comestibles délicates.",
    caracteristiques: {
      hauteur: "Rampante ou buissonnante (variétés)",
      port: "Tiges rampantes ou port compact",
      feuilles: "Grandes, palmées, très découpées, parfois épineuses",
      fleurs: "Jaune vif, unisexuées (fleurs mâles et femelles)",
      fruits: "Baies allongées ou rondes, vertes à jaunes",
      croissance: "Très rapide (45-60 jours)",
      longevite: "3-5 mois"
    },
    culture: {
      climat: "Chaud (18-25°C)",
      besoinEau: "Important (arrosage régulier)",
      exposition: "Plein soleil",
      sol: {
        type: "Profond, riche, bien drainé",
        pH: "6.0-7.5",
        amendement: "Fumier bien décomposé (très gourmand)"
      },
      plantation: {
        periode: "Début saison des pluies",
        espacement: "80-100 cm pour variétés rampantes, 50 cm pour buissonnantes",
        profondeur: "2-3 cm"
      },
      entretien: [
        "Paillage épais pour garder fraîcheur",
        "Fertilisation régulière (compost, purin)",
        "Arrosage au pied sans mouiller feuilles",
        "Récolte fréquente pour stimuler production"
      ]
    },
    maladies: [
      {
        nom: "Oïdium",
        symptoms: "Poudre blanche sur feuilles",
        traitement: "Soufre, bicarbonate, lait",
        prevention: "Aération, résistance variétale"
      },
      {
        nom: "Pourriture grise (Botrytis)",
        symptoms: "Moisissure grise sur fruits au sol",
        traitement: "Élimination fruits atteints",
        prevention: "Paillage, fruits sur supports"
      },
      {
        nom: "Virus de la mosaïque",
        symptoms: "Marbrure, déformation feuilles et fruits",
        traitement: "Aucun, élimination plants",
        prevention: "Lutte contre pucerons vecteurs"
      }
    ],
    traitements: [
      "Rotation de 3-4 ans",
      "Paillage pour éviter contact sol",
      "Purin d'ortie en fertilisant",
      "Taille pour aération si nécessaire"
    ],
    recolte: {
      periode: "45-60 jours après semis",
      signes: "Jeunes fruits (15-20 cm), peau tendue, fermes",
      conservation: "1 semaine au frais, congélation possible",
      rendement: "3-10 kg/plant selon variété"
    },
    valeurNutritionnelle: {
      calories: "17 kcal/100g",
      vitamines: "Vitamine C (17.9mg), B9 (24μg)",
      mineraux: "Potassium (261mg), magnésium (18mg)",
      eau: "95%",
      fibres: "1g/100g"
    },
    utilisations: [
      "Sautés, gratins, ratatouille",
      "Soupes, purées",
      "Fleurs farcies",
      "Spaghettis végétales (courgette jaune)"
    ],
    conseils: [
      "Récolter très jeunes pour texture et goût",
      "Cueillir fleurs mâles (tige fine) pour cuisiner",
      "Ne pas laisser grossir fruits pour production continue",
      "Planter plusieurs pieds pour pollinisation"
    ],
    images: [
      "https://images.unsplash.com/photo-1564769662533-4f00a87b4056?w=800&h=600&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1540420773422-292677a4c9c9?w=800&h=600&fit=crop&auto=format"
    ],
    liensGoogle: [
      {
        titre: "Culture courgette - Ministère agriculture",
        url: "https://agriculture.gouv.fr/culture-courgette",
        type: "Officiel"
      }
    ]
  },
  {
    id: 14,
    nomCommun: "Pastèque",
    nomScientifique: "Citrullus lanatus",
    famille: "Cucurbitaceae",
    origine: "Afrique australe",
    saison: "Saison sèche",
    cycle: "Annuel",
    description: "Fruit tropical de grande taille, très rafraîchissant avec une teneur en eau de plus de 90%, riche en lycopène et citrulline.",
    caracteristiques: {
      hauteur: "Rampante (3-5 m)",
      port: "Tiges rampantes avec vrilles",
      feuilles: "Grandes, profondément découpées, vert grisâtre",
      fleurs: "Jaunes, solitaires",
      fruits: "Baies sphériques ou ovales, rayées ou unies",
      croissance: "Rapide (80-100 jours)",
      longevite: "3-4 mois"
    },
    culture: {
      climat: "Très chaud (25-35°C), besoin de chaleur constante",
      besoinEau: "Important pendant croissance, réduire à maturation",
      exposition: "Plein soleil",
      sol: {
        type: "Profond, sableux, bien drainé, réchauffant",
        pH: "6.0-7.0",
        amendement: "Compost bien décomposé, engrais organique"
      },
      plantation: {
        periode: "Saison sèche chaude",
        espacement: "1.5-2 m entre plants",
        profondeur: "2-3 cm"
      },
      entretien: [
        "Paillage pour garder chaleur et humidité",
        "Irrigation goutte-à-goutte",
        "Fertilisation riche en potassium",
        "Suppression fruits malformés"
      ]
    },
    maladies: [
      {
        nom: "Fusariose (Fusarium oxysporum)",
        symptoms: "Flétrissement unilatéral, jaunissement",
        traitement: "Difficile, variétés résistantes",
        prevention: "Rotation longue, sol sain"
      },
      {
        nom: "Anthracnose",
        symptoms: "Taches noires sur feuilles et fruits",
        traitement: "Fongicides préventifs",
        prevention: "Rotation, élimination débris"
      },
      {
        nom: "Mildiou",
        symptoms: "Taches anguleuses sur feuilles",
        traitement: "Fongicides systémiques",
        prevention: "Éviter humidité feuillage"
      }
    ],
    traitements: [
      "Rotation de 5-6 ans minimum",
      "Plants greffés sur courges résistantes",
      "Solarisation du sol",
      "Purin de prêle en prévention"
    ],
    recolte: {
      periode: "80-100 jours après semis",
      signes: "Pédoncule qui se dessèche, tache de sol jaune, son creux",
      conservation: "2-3 semaines au frais, plusieurs mois en chambre froide",
      rendement: "2-4 fruits/plant"
    },
    valeurNutritionnelle: {
      calories: "30 kcal/100g",
      vitamines: "Vitamine C (8.1mg), A (569 UI)",
      mineraux: "Potassium (112mg), magnésium (10mg)",
      eau: "91%",
      citrulline: "Acide aminé (vasodilatateur)",
      lycopène: "Antioxydant (rouge)"
    },
    utilisations: [
      "Fruit frais en tranches",
      "Jus, smoothies",
      "Salades de fruits",
      "Sorbets, glaces"
    ],
    conseils: [
      "Tourner fruits régulièrement pour forme uniforme",
      "Mettre support sous fruits pour éviter pourriture",
      "Arroser matin pour éviter maladies fongiques",
      "Choisir variétés adaptées à région"
    ],
    images: [
      "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=800&h=600&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1560707303-4e980e876f2b?w=800&h=600&fit=crop&auto=format"
    ],
    liensGoogle: [
      {
        titre: "Culture pastèque - CIRAD",
        url: "https://www.cirad.fr/culture-pasteque",
        type: "Scientifique"
      }
    ]
  },
  {
    id: 15,
    nomCommun: "Melon",
    nomScientifique: "Cucumis melo",
    famille: "Cucurbitaceae",
    origine: "Afrique, Inde",
    saison: "Saison sèche",
    cycle: "Annuel",
    description: "Fruit très parfumé à la chair orangée ou verte, riche en bêta-carotène et en antioxydants, nécessitant beaucoup de chaleur pour développer son sucre.",
    caracteristiques: {
      hauteur: "Rampant (1-3 m)",
      port: "Tiges rampantes avec vrilles",
      feuilles: "Alternes, arrondies, lobées, rugueuses",
      fleurs: "Jaunes, petites, unisexuées",
      fruits: "Baies de formes variées, à écorce lisse ou réticulée",
      croissance: "Rapide (70-90 jours)",
      longevite: "3-4 mois"
    },
    culture: {
      climat: "Chaud et sec (25-30°C jour, 15°C nuit minimum)",
      besoinEau: "Modéré mais régulier, réduit en maturation",
      exposition: "Plein soleil",
      sol: {
        type: "Profond, léger, riche, bien drainé",
        pH: "6.0-7.0",
        amendement: "Fumier décomposé, compost"
      },
      plantation: {
        periode: "Saison sèche chaude",
        espacement: "80-100 cm entre plants",
        profondeur: "2-3 cm"
      },
      entretien: [
        "Paillage plastique noir pour réchauffer sol",
        "Taille à 4 feuilles puis 2 feuilles après fruit",
        "Fertilisation potassique",
        "Irrigation au goutte-à-goutte"
      ]
    },
    maladies: [
      {
        nom: "Oïdium",
        symptoms: "Poudre blanche sur feuilles",
        traitement: "Soufre, bicarbonate",
        prevention: "Variétés résistantes, aération"
      },
      {
        nom: "Fusariose",
        symptoms: "Flétrissement, pourriture racinaire",
        traitement: "Plants greffés",
        prevention: "Rotation, sol bien drainé"
      },
      {
        nom: "Cladosporiose",
        symptoms: "Taches brunes sur feuilles et fruits",
        traitement: "Fongicides préventifs",
        prevention: "Rotation, élimination débris"
      }
    ],
    traitements: [
      "Rotation de 4-5 ans",
      "Plants greffés sur courges",
      "Paillage pour éviter contact sol",
      "Taille pour aération"
    ],
    recolte: {
      periode: "70-90 jours après semis",
      signes: "Parfum typique, craquellement pédoncule, écorce qui jaunit",
      conservation: "1-2 semaines au frais",
      rendement: "2-3 fruits/plant"
    },
    valeurNutritionnelle: {
      calories: "34 kcal/100g",
      vitamines: "Vitamine C (36.7mg), A (3382 UI)",
      mineraux: "Potassium (267mg), magnésium (12mg)",
      eau: "90%",
      fibres: "0.9g/100g"
    },
    utilisations: [
      "Fruit frais en entrée ou dessert",
      "Salades, brochettes",
      "Smoothies, sorbets",
      "Accompagnement salé (jambon de Parme)"
    ],
    conseils: [
      "Limiter à 3-4 fruits par plant pour qualité",
      "Récolter matin pour meilleur parfum",
      "Ne pas arroser 1 semaine avant récolte",
      "Conserver à température ambiante avant consommation"
    ],
    images: [
      "https://unsplash.com/fr/photos/un-tas-de-fruits-jaunes-assis-les-uns-sur-les-autres-Dg2VE5ZnTkY",
      "https://unsplash.com/fr/photos/fruits-verts-sur-la-cloture-en-metal-noir-pendant-la-journee-lxQgjtg-es0"
    ],
    liensGoogle: [
      {
        titre: "Culture melon - INRAE",
        url: "https://www.inrae.fr/culture-melon",
        type: "Scientifique"
      }
    ]
  },
  {
    id: 16,
    nomCommun: "Haricot vert",
    nomScientifique: "Phaseolus vulgaris",
    famille: "Fabaceae",
    origine: "Amérique centrale",
    saison: "Saison des pluies",
    cycle: "Annuel",
    description: "Légumineuse cultivée pour ses gousses immatures, riche en protéines, fibres et vitamines, avec la capacité de fixer l'azote atmosphérique.",
    caracteristiques: {
      hauteur: "Nain (40 cm) ou à rames (2-3 m)",
      port: "Buissonnant ou grimpant",
      feuilles: "Trèflées (3 folioles), vert moyen",
      fleurs: "Papilionacées, blanches, roses ou violettes",
      fruits: "Gousses vertes, jaunes ou violettes, contenant graines",
      croissance: "Rapide (50-70 jours)",
      longevite: "2-3 mois"
    },
    culture: {
      climat: "Tempéré à subtropical (18-27°C)",
      besoinEau: "Modéré, sensible à l'excès",
      exposition: "Plein soleil",
      sol: {
        type: "Léger, bien drainé, pas trop riche (fixation N)",
        pH: "6.0-7.5",
        amendement: "Peu d'azote, phosphore et potassium"
      },
      plantation: {
        periode: "Début saison des pluies",
        espacement: "5-10 cm sur ligne, 40-50 cm entre rangs",
        profondeur: "3-5 cm"
      },
      entretien: [
        "Buttage pour nains, tuteurage pour rames",
        "Binage superficiel",
        "Pas de fertilisation azotée",
        "Arrosage régulier sans excès"
      ]
    },
    maladies: [
      {
        nom: "Anthracnose (Colletotrichum lindemuthianum)",
        symptoms: "Taches brunes enfoncées sur gousses",
        traitement: "Fongicides préventifs",
        prevention: "Semences saines, rotation"
      },
      {
        nom: "Rouille (Uromyces appendiculatus)",
        symptoms: "Pustules rouges sur feuilles",
        traitement: "Fongicides systémiques",
        prevention: "Variétés résistantes, rotation"
      },
      {
        nom: "Pourriture grise (Botrytis)",
        symptoms: "Moisissure grise par temps humide",
        traitement: "Fongicides, aération",
        prevention: "Espacement, bon drainage"
      }
    ],
    traitements: [
      "Rotation de 3-4 ans minimum",
      "Traitement semences à l'eau chaude",
      "Paillage pour éviter éclaboussures",
      "Élimination plants atteints"
    ],
    recolte: {
      periode: "50-70 jours après semis",
      signes: "Gousses jeunes, fermes, grains imperceptibles",
      conservation: "3-5 jours au frais, congélation idéale",
      rendement: "1-3 kg/m²"
    },
    valeurNutritionnelle: {
      calories: "31 kcal/100g",
      vitamines: "Vitamine C (16.3mg), K (14.4μg)",
      mineraux: "Potassium (211mg), magnésium (25mg)",
      proteines: "1.8g/100g",
      fibres: "2.7g/100g"
    },
    utilisations: [
      "Légume d'accompagnement (étuvé, sauté)",
      "Salades froides",
      "Conserves, surgelés",
      "Plats mijotés"
    ],
    conseils: [
      "Récolter tous les 2-3 jours pour production continue",
      "Ne pas arracher mais couper pour ne pas endommager racines",
      "Semer échelonné pour récolte prolongée",
      "Laisser quelques plants pour graines"
    ],
    images: [
      "https://unsplash.com/fr/photos/haricots-verts-du-kentucky-2JDWDtCGREA",
      "https://unsplash.com/fr/photos/gousses-vertes-suspendues-a-une-branche-de-plante-feuillue-3YUEtfeXu2g"
    ],
    liensGoogle: [
      {
        titre: "Culture haricot - FAO",
        url: "https://www.fao.org/3/x6900f/x6900f07.htm",
        type: "Officiel"
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
      "https://images.unsplash.com/photo-1598170845058-78131a90f4bf?w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1590189182193-5d3c3fa2a51b?w=600&auto=format&fit=crop"
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
      "https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1592415476706-96b7f8d97d0b?w=600&auto=format&fit=crop"
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
      "https://upload.wikimedia.org/wikipedia/commons/5/5b/Solanum_aethiopicum_fruits.jpg",
      "https://tse2.mm.bing.net/th?id=OIP.7i2c9LkqFc0yX1tFfJ0z7AHaFj&pid=Api"
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
      "https://images.unsplash.com/photo-1590163271945-4d1a2d77b3e3?w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1571741140674-8949f7c0f9f6?w=600&auto=format&fit=crop"
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
      "https://images.unsplash.com/photo-1573246123716-6b1782bfc499?w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1585020430145-2a6f34c6e8b8?w=600&auto=format&fit=crop"
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
      "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=600&auto=format&fit=crop"
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
      "https://images.unsplash.com/photo-1548943487-a2e4e43b4853?w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=600&auto=format&fit=crop"
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

// Exportation de la base de données
export default plantsDatabase;