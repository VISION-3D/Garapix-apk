// src/services/plantService.js

// Base de données complète des plantes
const plantsDatabase = [
  {
    id: 1,
    nomCommun: "Papayer ,Carica papaya L.",
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
        nom: "Virus mosaïque",
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
      "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Biodiversit%C3%A9_27.jpg/250px-Biodiversit%C3%A9_27.jpg",
      "https://herboristerie-principale.ma/wp-content/uploads/2024/08/Papayer-plante-medicinale.jpg.jpg"
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
    nomCommun: "Tomate , Solanum lycopersicum L.",
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
  {
    id: 3,
    nomCommun: "Gombo , Abelmoschus esculentus L.",
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
    id: 4,
    nomCommun: "Piment , Capsicum spp.",
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
      "https://images.unsplash.com/photo-1546860255-95536c19724e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cGltZW50fGVufDB8fDB8fHww",
      "https://images.unsplash.com/photo-1518006959466-0db0b6b4c1d0?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHBpbWVudHxlbnwwfHwwfHx8MA%3D%3D"
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
    id: 5,
    nomCommun: "Oignon , Allium cepa L.",
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
    id: 6,
    nomCommun: "Aubergine africaine , Solanum aethiopicum L.",
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
    id: 7,
    nomCommun: "Concombre , Cucumis sativus L.",
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
    id: 8,
    nomCommun: "Chou, Brassica oleracea L.",
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
    id: 9,
    nomCommun: "Laitue , Lactuca sativa L.",
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
    id: 10,
    nomCommun: "Pastèque , Citrullus lanatus (Thunb.) Matsum. & Nakai",
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
    id: 11,
    nomCommun: "Melon, Cucumis melo L.",
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
  {
    id: 12,
    nomCommun: "Manguier , Mangifera indica L.",
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
    id: 13,
    nomCommun: "Oranger , Citrus sinensis (L.) Osbeck",
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
    id: 14,
    nomCommun: "Citronnier , Citrus limon",
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
    id: 15,
    nomCommun: "Anacardier (Noix de cajou), Anacardium occidentale L.",
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
    id: 16,
    nomCommun: "Avocatier, Persea americana Mill.",
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
    id: 17,
    nomCommun: "Bananier / Plantain, Musa spp.",
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
    id: 18,
    nomCommun: "Goyavier, Psidium guajava L.",
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
    id: 19,
    nomCommun: "Cocotier, Cocos nucifera L.",
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
    id: 20,
    nomCommun: "Carotte, Daucus carota subsp. sativus",
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
    id: 21,
    nomCommun: "Navet, Brassica rapa subsp. rapa",
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
    id: 22,
    nomCommun: "Jaxatu, aubergine africaine",
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
    id: 23,
    nomCommun: "Pomme de terre, Solanum tuberosum",
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
    id: 24,
    nomCommun: "Carrasol, Pisum sativum var. saccharatum (pois sucré) / ou haricot kilomètre",
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
    id: 25,
    nomCommun: "Poivron, Capsicum annuum var. grossum",
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
    id: 26,
    nomCommun: "Ail, Allium sativum (ail commun)",
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

// Export des fonctions utilisées par DiagnosticReal
export const getAllPlants = () => plantsDatabase;

export const searchPlant = (query) => {
  if (!query) return [];
  const q = query.toLowerCase().trim();
  return plantsDatabase.filter(plant =>
    plant.nomCommun.toLowerCase().includes(q) ||
    plant.nomScientifique.toLowerCase().includes(q)
  );
};

// ... (tout le tableau plantsDatabase)

// Export des fonctions nommées
export const getStats = () => { /* ... */ };
export const getPlantById = (id) => plantsDatabase.find(p => p.id === id);
export const getPlantsByFamily = (family) => plantsDatabase.filter(p => p.famille.toLowerCase() === family.toLowerCase());

// Export par défaut pour compatibilité avec les anciens imports
const PlantService = {
  getAllPlants,
  searchPlant,
  getStats,
  getPlantById,
  getPlantsByFamily,
};

export default PlantService;