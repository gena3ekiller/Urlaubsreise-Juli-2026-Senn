const routeData = [
  {
    day: 1,
    title: "Basel → Freiburg im Breisgau",
    distance: "ca. 70 km",
    countries: ["Schweiz", "Deutschland"],
    curveFactor: 5,
    description: "Kurzer, sehr schöner Auftakt vom Dreiländereck in den Schwarzwald mit Kandertal, Münstertal und Schauinsland.",
    focus: "Schwarzwald, Schauinsland, Kurven",
    riderNotes: ["Schauinsland am Wochenende auf Streckensperrungen prüfen.", "In Ortsdurchfahrten rund um Freiburg konsequent defensiv fahren.", "Ideal als Einrolltag mit frühem Start und langer Pause am Schauinsland."],
    highlights: ["Schauinsland-Pass", "Münstertal", "Freiburger Altstadt"],
    stops: [
      stop("Basel", "Basel, Schweiz", 47.5596, 7.5886),
      stop("Lörrach", "Lörrach, Deutschland", 47.6140, 7.6646),
      stop("Kandern", "Kandern, Deutschland", 47.7138, 7.6607),
      stop("Münstertal", "Münstertal/Schwarzwald", 47.8548, 7.7843),
      stop("Schauinsland", "Schauinsland, 79254 Oberried", 47.9112, 7.8980),
      stop("Freiburg", "Freiburg im Breisgau", 47.9990, 7.8421)
    ],
    hotels: [
      hotel("Motel One Freiburg", "Altstadtnah", "Friedrichring 1, Freiburg", 47.9997, 7.8520, "Zentrale Lage, Tiefgarage in der Umgebung prüfen.", "Sehr praktisch für Abendessen zu Fuß.", "Innenstadt kann beim Gepäck etwas enger sein."),
      hotel("Mercure Hotel Panorama Freiburg", "Oberhalb der Stadt", "Wintererstr. 89, Freiburg", 48.0066, 7.8712, "Ruhige Lage, Parken vor Buchung bestätigen.", "Toller Blick und entspannter Abschluss.", "Nicht direkt in der Altstadt."),
      hotel("Hotel Stadt Freiburg", "Westen Freiburg", "Breisacher Str. 84, Freiburg", 48.0001, 7.8259, "Anfahrt und Parken meist unkomplizierter als Altstadt.", "Gute Basis für Weiterfahrt.", "Weniger romantische Lage.")
    ]
  },
  {
    day: 2,
    title: "Freiburg → Nancy",
    distance: "ca. 230 km",
    countries: ["Deutschland", "Frankreich"],
    curveFactor: 5,
    description: "Vogesen-Etappe mit Colmar, Munster, Col de la Schlucht, Gérardmer und einem ruhigen Zieleinlauf nach Nancy.",
    focus: "Vogesen, Route des Crêtes, D-Straßen",
    riderNotes: ["Route des Crêtes wetterabhängig prüfen.", "In den Vogesen mit Radfahrern und Splitt rechnen.", "Für Navigation besser Kurviger/Calimoto mit Autobahn vermeiden nutzen."],
    highlights: ["Colmar", "Col de la Schlucht", "Lac de Gérardmer", "Place Stanislas"],
    stops: [
      stop("Freiburg", "Freiburg im Breisgau", 47.9990, 7.8421),
      stop("Colmar", "Colmar, Frankreich", 48.0794, 7.3585),
      stop("Munster", "Munster, Haut-Rhin", 48.0415, 7.1338),
      stop("Col de la Schlucht", "Col de la Schlucht, Vosges", 48.0645, 7.0220),
      stop("Gérardmer", "Gérardmer, Frankreich", 48.0735, 6.8787),
      stop("Épinal", "Épinal, Frankreich", 48.1744, 6.4506),
      stop("Nancy", "Nancy, Frankreich", 48.6921, 6.1844)
    ],
    hotels: [
      hotel("Hotel des Prélats", "Historisches Zentrum Nancy", "56 Place Monseigneur Ruch, Nancy", 48.6939, 6.1850, "Innenstadtparkhaus oder Hoteloption vorher prüfen.", "Sehr nah an Place Stanislas.", "Altstadtzufahrt kann fummelig sein."),
      hotel("Best Western Plus Crystal Nancy", "Zentrum", "5 Rue Chanzy, Nancy", 48.6897, 6.1818, "Garage/Partnerparkplatz vorab reservieren.", "Komfortabel und zentral.", "Mit Motorradgepäck vorher Parklösung klären."),
      hotel("Novotel Suites Nancy Centre", "Kanalnähe", "2 Allée du Chanoine Drioton, Nancy", 48.6951, 6.1990, "Parkmöglichkeiten rund ums Hotel prüfen.", "Einfache Anfahrt von Osten.", "Etwas außerhalb vom historischen Kern.")
    ]
  },
  {
    day: 3,
    title: "Nancy → Reims",
    distance: "ca. 200 km",
    countries: ["Frankreich"],
    curveFactor: 3,
    description: "Entspannte Verbindung durch Lothringen und die Champagne mit viel Geschichte und weiten Landstraßen.",
    focus: "Champagne, WWI/US-Erinnerungsorte",
    riderNotes: ["Viele Ortsdurchfahrten: Zeitpuffer einplanen.", "Bei Verdun/Sainte-Menehould lohnen kurze Gedenkstättenstopps.", "Tankstellen am Sonntag frühzeitig suchen."],
    highlights: ["Toul", "Bar-le-Duc", "Argonnen", "Kathedrale Reims"],
    stops: [
      stop("Nancy", "Nancy, Frankreich", 48.6921, 6.1844),
      stop("Toul", "Toul, Frankreich", 48.6759, 5.8911),
      stop("Bar-le-Duc", "Bar-le-Duc, Frankreich", 48.7728, 5.1619),
      stop("Sainte-Menehould", "Sainte-Menehould, Frankreich", 49.0907, 4.8974),
      stop("Reims", "Reims, Frankreich", 49.2583, 4.0317)
    ],
    hotels: [
      hotel("Best Western Premier Hotel de la Paix", "Zentrum Reims", "9 Rue Buirette, Reims", 49.2557, 4.0274, "Gesicherte Parkoption vorab bestätigen.", "Sehr zentral und komfortabel.", "Zentrumspreise und Zufahrt beachten."),
      hotel("Holiday Inn Reims Centre", "Innenstadt", "46 Rue Buirette, Reims", 49.2554, 4.0254, "Parkhaus in Nähe, Höhe/Regeln prüfen.", "Guter Kompromiss aus Lage und Komfort.", "Parken nicht immer direkt am Eingang."),
      hotel("Akena City Reims Bezannes", "Südwestlich Reims", "79 Rue Alfred Kastler, Bezannes", 49.2235, 3.9884, "Außenparkplätze meist unkompliziert.", "Einfacher Start am nächsten Morgen.", "Weniger Altstadtgefühl.")
    ]
  },
  {
    day: 4,
    title: "Reims → Ramstein/Kaiserslautern",
    distance: "ca. 300 km",
    countries: ["Frankreich", "Deutschland"],
    curveFactor: 3,
    description: "Lange Ostetappe über Verdun, Metz und Saarbrücken zum Pflichtstopp Ramstein/Kaiserslautern.",
    focus: "Ramstein Pflichtstopp",
    note: "Ramstein Air Base ist eine aktive Militärbasis und nicht frei besuchbar. Plane nur offiziell zugängliche Orte im Umfeld ein.",
    riderNotes: ["Grenzübertritt und längere Stadtpassagen kosten Zeit.", "Verdun eignet sich für einen respektvollen, kurzen Geschichtsstopp.", "Ramstein-Umfeld vorher auf zugängliche Aussichtspunkte und Parkregeln prüfen."],
    highlights: ["Verdun", "Metz", "Saarbrücken", "Ramstein-Umfeld"],
    stops: [
      stop("Reims", "Reims, Frankreich", 49.2583, 4.0317),
      stop("Verdun", "Verdun, Frankreich", 49.1593, 5.3828),
      stop("Metz", "Metz, Frankreich", 49.1193, 6.1757),
      stop("Saarbrücken", "Saarbrücken, Deutschland", 49.2402, 6.9969),
      stop("Ramstein-Miesenbach", "Ramstein-Miesenbach", 49.4450, 7.5550),
      stop("Kaiserslautern", "Kaiserslautern", 49.4401, 7.7491)
    ],
    hotels: [
      hotel("Hotel Circle Inn", "Ramstein-Miesenbach", "Kindsbacher Str. 58, Ramstein-Miesenbach", 49.4436, 7.5680, "Parken direkt am Haus prüfen.", "Sehr passend für Ramstein-Stopp.", "Früh buchen, Nachfrage kann hoch sein."),
      hotel("Hampton by Hilton Kaiserslautern", "Kaiserslautern", "Fischerstr. 78, Kaiserslautern", 49.4454, 7.7742, "Hotelparkplatz/Umgebung vorab checken.", "Verlässlicher Standard und Stadtlage.", "Nicht direkt in Ramstein."),
      hotel("SAKS Urban Design Hotel", "Innenstadt Kaiserslautern", "Stiftsplatz 11, Kaiserslautern", 49.4445, 7.7690, "Tiefgarage/Partnerparkhaus klären.", "Modern, zentral, gute Abendoptionen.", "Innenstadtzufahrt mit Gepäck beachten.")
    ]
  },
  {
    day: 5,
    title: "Ramstein/Kaiserslautern → Reims",
    distance: "ca. 300 km",
    countries: ["Deutschland", "Frankreich"],
    curveFactor: 3,
    description: "Rückbogen nach Westen über Saarlouis, Verdun und Sainte-Menehould zurück in die Champagne.",
    focus: "Landstraßen zurück nach Reims",
    riderNotes: ["Nicht die schnelle Autobahnvariante übernehmen.", "Grenzgebiet bietet gute Nebenstrecken, aber Navigation kontrollieren.", "Bei Verdun eine andere Schleife als an Tag 4 wählen."],
    highlights: ["Saarlouis", "Verdun", "Argonnen", "Reims bei Abendlicht"],
    stops: [
      stop("Kaiserslautern", "Kaiserslautern", 49.4401, 7.7491),
      stop("Ramstein-Miesenbach", "Ramstein-Miesenbach", 49.4450, 7.5550),
      stop("Saarlouis", "Saarlouis, Deutschland", 49.3137, 6.7515),
      stop("Verdun", "Verdun, Frankreich", 49.1593, 5.3828),
      stop("Sainte-Menehould", "Sainte-Menehould, Frankreich", 49.0907, 4.8974),
      stop("Reims", "Reims, Frankreich", 49.2583, 4.0317)
    ],
    hotels: [
      hotel("La Caserne Chanzy Hotel & Spa", "An der Kathedrale Reims", "18 Rue Tronsson Ducoudray, Reims", 49.2539, 4.0331, "Valet/Parklösung vorher bestätigen.", "Ein besonderer Reims-Abend.", "Teurer und sehr zentral."),
      hotel("Novotel Suites Reims Centre", "Bahnhofsnah", "1 Rue Edouard Mignot, Reims", 49.2630, 4.0241, "Parken in Bahnhofsnähe prüfen.", "Einfache Orientierung.", "Bahnhofsbereich weniger charmant."),
      hotel("B&B HOTEL Reims Bezannes", "Bezannes", "2 Rue Henri Moissan, Bezannes", 49.2231, 3.9875, "Außenparkplätze, praktisch für Motorräder.", "Budgetfreundlich und unkompliziert.", "Abends eher funktional.")
    ]
  },
  {
    day: 6,
    title: "Reims → Rouen",
    distance: "ca. 170 km",
    countries: ["Frankreich"],
    curveFactor: 3,
    description: "Nordwestliche Querung über Laon, Saint-Quentin und Amiens nach Rouen, Paris bleibt weit südlich.",
    focus: "Paris großräumig vermeiden",
    riderNotes: ["Amiens kann verkehrsreich sein, Pausenzeit bewusst legen.", "Bei Regen früh los, damit Rouen nicht im Berufsverkehr wartet.", "Kurvige Optionen nördlich der direkten Linie suchen."],
    highlights: ["Laon", "Amiens", "Seine in Rouen", "Kathedrale Rouen"],
    stops: [
      stop("Reims", "Reims, Frankreich", 49.2583, 4.0317),
      stop("Laon", "Laon, Frankreich", 49.5641, 3.6249),
      stop("Saint-Quentin", "Saint-Quentin, Frankreich", 49.8489, 3.2876),
      stop("Amiens", "Amiens, Frankreich", 49.8941, 2.2958),
      stop("Rouen", "Rouen, Frankreich", 49.4432, 1.0993)
    ],
    hotels: [
      hotel("Mercure Rouen Centre Cathedrale", "Altstadt Rouen", "7 Rue Croix de Fer, Rouen", 49.4416, 1.0955, "Zentrumsparkhaus vorher prüfen.", "Perfekt für Altstadt zu Fuß.", "Enge Innenstadtzufahrt."),
      hotel("Radisson Blu Hotel Rouen Centre", "Nähe Bahnhof/Altstadt", "6-8 Rue du Donjon, Rouen", 49.4475, 1.0952, "Parkhausoption vorab reservieren.", "Modern und gut gelegen.", "Innenstadtverkehr beachten."),
      hotel("Ibis Rouen Centre Rive Droite Pasteur", "Seinenah", "7 Rue de la Pie, Rouen", 49.4445, 1.0837, "Einfachere Anfahrt als Kernaltstadt.", "Solide und praktisch.", "Etwas funktionaler.")
    ]
  },
  {
    day: 7,
    title: "Rouen → Caen",
    distance: "ca. 150 km",
    countries: ["Frankreich"],
    curveFactor: 4,
    description: "Normandie pur: Seine-Schleifen, Pont-Audemer, Honfleur, Deauville und dann Caen.",
    focus: "Normandie, Küste, Landstraßen",
    riderNotes: ["Küstenorte können voll sein, Parken früh prüfen.", "Bei Wind auf Brücken und offenen Küstenstücken locker bleiben.", "Honfleur-Pause nicht zu knapp planen."],
    highlights: ["Pont-Audemer", "Honfleur", "Deauville", "Caen"],
    stops: [
      stop("Rouen", "Rouen, Frankreich", 49.4432, 1.0993),
      stop("Pont-Audemer", "Pont-Audemer, Frankreich", 49.3551, 0.5145),
      stop("Honfleur", "Honfleur, Frankreich", 49.4199, 0.2329),
      stop("Deauville", "Deauville, Frankreich", 49.3600, 0.0740),
      stop("Caen", "Caen, Frankreich", 49.1829, -0.3707)
    ],
    hotels: [
      hotel("Best Western Plus Le Moderne", "Zentrum Caen", "116 Boulevard Marechal Leclerc, Caen", 49.1838, -0.3652, "Parkhaus in der Nähe prüfen.", "Sehr zentral für Abendessen.", "Stadtzufahrt mit Einbahnstraßen."),
      hotel("Hotel des Quatrans", "Altstadtrand Caen", "17 Rue Gemare, Caen", 49.1854, -0.3658, "Parkmöglichkeiten vorher klären.", "Charaktervolle Lage.", "Nicht jeder Parkplatz ist motorradideal."),
      hotel("Ibis Styles Caen Centre Gare", "Bahnhofsviertel", "52 Quai Amiral Hamelin, Caen", 49.1764, -0.3487, "Parkhaus/öffentliche Parkplätze prüfen.", "Leicht zu erreichen.", "Etwas weniger historisch.")
    ]
  },
  {
    day: 8,
    title: "Caen D-Day Tour",
    distance: "ca. 0-120 km",
    countries: ["Frankreich"],
    curveFactor: 2,
    description: "Rundtour zu zentralen D-Day-Orten: Pegasus Bridge, Omaha Beach, amerikanischer Friedhof und Pointe du Hoc.",
    focus: "D-Day, US-Stätten",
    riderNotes: ["Viel Zeit für respektvolle Besuche einplanen.", "Bei Gedenkstätten leise und defensiv auftreten.", "Küstenwetter kann schnell wechseln."],
    highlights: ["Pegasus Bridge", "Omaha Beach", "Normandy American Cemetery", "Pointe du Hoc"],
    stops: [
      stop("Caen", "Caen, Frankreich", 49.1829, -0.3707),
      stop("Pegasus Bridge", "Pegasus Bridge, Bénouville", 49.2420, -0.2747),
      stop("Omaha Beach", "Omaha Beach, Saint-Laurent-sur-Mer", 49.3677, -0.8804),
      stop("Normandy American Cemetery", "Normandy American Cemetery, Colleville-sur-Mer", 49.3594, -0.8552),
      stop("Pointe du Hoc", "Pointe du Hoc, Cricqueville-en-Bessin", 49.3946, -0.9899),
      stop("Caen", "Caen, Frankreich", 49.1829, -0.3707)
    ],
    hotels: [
      hotel("Best Western Royal Hotel Caen", "Zentrum Caen", "1 Place de la Republique, Caen", 49.1816, -0.3655, "Parkhaus nahe Place de la Republique prüfen.", "Gute Basis für zwei Nächte.", "Zentrumsparkplätze vorab planen."),
      hotel("Novotel Caen Côte de Nacre", "Nord-Caen", "155 Rue de la Delivrande, Caen", 49.2023, -0.3584, "Parken am Hotel meist einfacher.", "Praktisch Richtung Küste.", "Nicht mitten in der Altstadt."),
      hotel("Hotel Bristol Caen", "Bahnhofsnah", "31 Rue du 11 Novembre, Caen", 49.1772, -0.3579, "Sichere Parkoption vorher anfragen.", "Solide Lage für Rundtour.", "Einfacher Standard.")
    ]
  },
  {
    day: 9,
    title: "Caen → Bayeux",
    distance: "ca. 25-140 km",
    countries: ["Frankreich"],
    curveFactor: 2,
    description: "Kurzer Zielwechsel, optional als große Landungsstrände-Runde mit Sword, Juno, Gold, Omaha und Utah Beach.",
    focus: "Alle 5 D-Day-Strände",
    riderNotes: ["Die volle Strände-Runde ist deutlich länger als der direkte Wechsel.", "Pausen an Gedenkorten bewusst ruhig halten.", "Utah Beach nur einbauen, wenn Wetter und Energie passen."],
    highlights: ["Sword Beach", "Juno Beach", "Gold Beach", "Omaha Beach", "Utah Beach", "Bayeux"],
    stops: [
      stop("Caen", "Caen, Frankreich", 49.1829, -0.3707),
      stop("Sword Beach", "Sword Beach, Ouistreham", 49.2860, -0.3180),
      stop("Juno Beach", "Juno Beach, Courseulles-sur-Mer", 49.3357, -0.4560),
      stop("Gold Beach", "Gold Beach, Arromanches-les-Bains", 49.3402, -0.6212),
      stop("Omaha Beach", "Omaha Beach, Saint-Laurent-sur-Mer", 49.3677, -0.8804),
      stop("Utah Beach", "Utah Beach, Sainte-Marie-du-Mont", 49.4144, -1.1755),
      stop("Bayeux", "Bayeux, Frankreich", 49.2765, -0.7039)
    ],
    hotels: [
      hotel("Hotel Reine Mathilde", "Zentrum Bayeux", "23 Rue Larcher, Bayeux", 49.2766, -0.7024, "Parken in Altstadtnähe prüfen.", "Sehr gute Lage für Altstadt.", "Zufahrt kann eng sein."),
      hotel("Churchill Hotel Bayeux Centre", "Bayeux Zentrum", "14 Rue Saint Jean, Bayeux", 49.2760, -0.7036, "Parklösung vor Buchung bestätigen.", "Thematisch passend zur Reise.", "Beliebt, früh reservieren."),
      hotel("Novotel Bayeux", "Nordwest Bayeux", "117 Rue Saint Patrice, Bayeux", 49.2823, -0.7182, "Parken am Hotel meist unkompliziert.", "Einfach für Tagesstart.", "Etwas außerhalb vom Kern.")
    ]
  },
  {
    day: 10,
    title: "Bayeux → Le Mont-Saint-Michel",
    distance: "ca. 180 km",
    countries: ["Frankreich"],
    curveFactor: 3,
    description: "Südwestwärts über Saint-Lô, Villedieu-les-Poêles und Avranches zum ikonischen Mont-Saint-Michel.",
    focus: "Bocage, Handwerksorte, Mont-Saint-Michel",
    riderNotes: ["Mont-Saint-Michel-Parkregeln vorab prüfen.", "Fotostopps mit Seitenwind einplanen.", "Bocage-Straßen können schmal und feucht sein."],
    highlights: ["Saint-Lô", "Villedieu-les-Poêles", "Avranches", "Mont-Saint-Michel"],
    stops: [
      stop("Bayeux", "Bayeux, Frankreich", 49.2765, -0.7039),
      stop("Saint-Lô", "Saint-Lô, Frankreich", 49.1162, -1.0900),
      stop("Villedieu-les-Poêles", "Villedieu-les-Poêles-Rouffigny", 48.8389, -1.2210),
      stop("Avranches", "Avranches, Frankreich", 48.6844, -1.3569),
      stop("Le Mont-Saint-Michel", "Le Mont-Saint-Michel, Frankreich", 48.6361, -1.5115)
    ],
    hotels: [
      hotel("Mercure Mont Saint Michel", "La Caserne", "Route du Mont Saint Michel, Le Mont-Saint-Michel", 48.6147, -1.5105, "Parkzone/Hotelcode vorab klären.", "Sehr nah am Shuttle.", "Touristisch und gefragt."),
      hotel("Le Relais Saint Michel", "Blicklage", "La Caserne, Le Mont-Saint-Michel", 48.6162, -1.5106, "Parken nur nach Hotelregeln.", "Starker Blick auf den Mont.", "Preisniveau oft höher."),
      hotel("Auberge Saint-Pierre", "Auf dem Mont", "Grande Rue, Le Mont-Saint-Michel", 48.6363, -1.5112, "Motorrad bleibt außerhalb auf Parkflächen.", "Einmaliges Erlebnis.", "Gepäcklogistik schwieriger.")
    ]
  },
  {
    day: 11,
    title: "Mont-Saint-Michel → Granville",
    distance: "ca. 80 km",
    countries: ["Frankreich"],
    curveFactor: 4,
    description: "Kürzere Küstenetappe über Avranches, Carolles und Jullouville nach Granville.",
    focus: "Küstenstraße",
    riderNotes: ["Bewusst langsam fahren und Aussichtspunkte nutzen.", "Sand auf kleinen Küstenstraßen möglich.", "Guter Tag für Wäsche, Bike-Check und frühes Ankommen."],
    highlights: ["Baie du Mont-Saint-Michel", "Carolles", "Jullouville", "Granville Hafen"],
    stops: [
      stop("Le Mont-Saint-Michel", "Le Mont-Saint-Michel, Frankreich", 48.6361, -1.5115),
      stop("Avranches", "Avranches, Frankreich", 48.6844, -1.3569),
      stop("Carolles", "Carolles, Frankreich", 48.7510, -1.5607),
      stop("Jullouville", "Jullouville, Frankreich", 48.7755, -1.5650),
      stop("Granville", "Granville, Frankreich", 48.8376, -1.5975)
    ],
    hotels: [
      hotel("Mercure Granville Le Grand Large", "Meerblick Granville", "5 Rue de la Falaise, Granville", 48.8372, -1.6030, "Parkgarage/Hotelplätze vorher prüfen.", "Schöner Küstenabschluss.", "Steile Zufahrten möglich."),
      hotel("Ibis Granville Port de Plaisance", "Hafen", "Promenade du Docteur Lavat, Granville", 48.8383, -1.5928, "Hafennahes Parken prüfen.", "Praktisch und lebendig.", "Bei Saisonbetrieb voller."),
      hotel("Hotel des Bains", "Zentrum/Strand", "19 Rue Georges Clemenceau, Granville", 48.8388, -1.5982, "Parken vorab organisieren.", "Klassische Lage nahe Wasser.", "Altstadtparkplätze begrenzt.")
    ]
  },
  {
    day: 12,
    title: "Granville → Rambouillet",
    distance: "ca. 220 km",
    countries: ["Frankreich"],
    curveFactor: 3,
    description: "Langer Inlandbogen über Vire, Alençon und Chartres, bewusst südwestlich an Paris vorbei.",
    focus: "Paris vermeiden",
    riderNotes: ["Nicht von der Navigation auf Pariser Ring ziehen lassen.", "Chartres eignet sich als große Pause.", "Ab Rambouillet auf Pendlerverkehr achten."],
    highlights: ["Vire", "Alençon", "Kathedrale Chartres", "Rambouillet"],
    stops: [
      stop("Granville", "Granville, Frankreich", 48.8376, -1.5975),
      stop("Vire", "Vire Normandie, Frankreich", 48.8380, -0.8890),
      stop("Alençon", "Alençon, Frankreich", 48.4329, 0.0913),
      stop("Chartres", "Chartres, Frankreich", 48.4439, 1.4890),
      stop("Rambouillet", "Rambouillet, Frankreich", 48.6437, 1.8299)
    ],
    hotels: [
      hotel("Mercure Rambouillet Relays du Château", "Zentrum/Schlossnähe", "1 Place de la Liberation, Rambouillet", 48.6451, 1.8197, "Parkmöglichkeit vorab anfragen.", "Schöne Lage am Etappenende.", "Zentral, daher Parken klären."),
      hotel("Ibis Rambouillet", "Gewerbegebiet Süd", "2 Rue Pierre Métairie, Rambouillet", 48.6268, 1.8342, "Außenparkplätze meist einfach.", "Unkompliziert für Motorradfahrer.", "Nicht charmant, aber praktisch."),
      hotel("Best Western Amarys", "Rambouillet Süd", "73 Rue de la Louviere, Rambouillet", 48.6257, 1.8335, "Parken am Haus prüfen.", "Ruhiger und leicht erreichbar.", "Zum Zentrum eher fahren.")
    ]
  },
  {
    day: 13,
    title: "Rambouillet → Nancy",
    distance: "ca. 250 km",
    countries: ["Frankreich"],
    curveFactor: 3,
    description: "Ostetappe über Provins, Troyes und Joinville zurück nach Nancy.",
    focus: "Mittelalterstädte und ruhige Ostverbindung",
    riderNotes: ["Provins und Troyes sind gute Kulturpausen.", "Lange Geradeausstücke mit kleinen D-Straßen auflockern.", "Späte Ankunft in Nancy vermeiden."],
    highlights: ["Provins", "Troyes", "Joinville", "Nancy"],
    stops: [
      stop("Rambouillet", "Rambouillet, Frankreich", 48.6437, 1.8299),
      stop("Provins", "Provins, Frankreich", 48.5600, 3.2990),
      stop("Troyes", "Troyes, Frankreich", 48.2973, 4.0744),
      stop("Joinville", "Joinville, Haute-Marne", 48.4431, 5.1415),
      stop("Nancy", "Nancy, Frankreich", 48.6921, 6.1844)
    ],
    hotels: [
      hotel("Hotel Stanley by HappyCulture", "Zentrum Nancy", "61 Rue Pierre Semard, Nancy", 48.6896, 6.1783, "Parkhaus in Fußnähe prüfen.", "Zentral und oft preislich moderat.", "Zimmer/Parken vorher genau prüfen."),
      hotel("Grand Hotel de la Reine", "Place Stanislas", "2 Place Stanislas, Nancy", 48.6936, 6.1833, "Parken/Anfahrt vorab klären.", "Klassische Toplage.", "Teurer und Innenstadtlogistik."),
      hotel("Ibis Nancy Centre Gare et Congres", "Bahnhof", "3 Rue Crampel, Nancy", 48.6901, 6.1749, "Bahnhofsparkhaus prüfen.", "Praktisch für eine Nacht.", "Weniger Atmosphäre.")
    ]
  },
  {
    day: 14,
    title: "Nancy → Freiburg → Basel",
    distance: "ca. 300 km",
    countries: ["Frankreich", "Deutschland", "Schweiz"],
    curveFactor: 5,
    description: "Finale Rückfahrt über Saint-Dié, Col de la Schlucht, Munster und Freiburg zurück nach Basel.",
    focus: "Vogesen, Schwarzwald, Rückfahrt",
    riderNotes: ["Letzter Tag ist lang: Wetter und Müdigkeit ernst nehmen.", "Col de la Schlucht nur bei guten Bedingungen auskosten.", "Für Basel frühzeitig Heimkehrverkehr berücksichtigen."],
    highlights: ["Saint-Dié-des-Vosges", "Col de la Schlucht", "Munster", "Freiburg", "Basel"],
    stops: [
      stop("Nancy", "Nancy, Frankreich", 48.6921, 6.1844),
      stop("Saint-Dié-des-Vosges", "Saint-Dié-des-Vosges, Frankreich", 48.2847, 6.9492),
      stop("Col de la Schlucht", "Col de la Schlucht, Vosges", 48.0645, 7.0220),
      stop("Munster", "Munster, Haut-Rhin", 48.0415, 7.1338),
      stop("Freiburg", "Freiburg im Breisgau", 47.9990, 7.8421),
      stop("Basel", "Basel, Schweiz", 47.5596, 7.5886)
    ],
    hotels: [
      hotel("Hotel Spalentor", "Basel Altstadtrand", "Schönbeinstrasse 1, Basel", 47.5588, 7.5818, "Parkgarage/Hotelplätze vorher prüfen.", "Guter Abschluss nah der Altstadt.", "Schweizer Preisniveau."),
      hotel("Motel One Basel", "Innenstadt Basel", "Barfüssergasse 16, Basel", 47.5555, 7.5909, "Parkhaus in der Umgebung einplanen.", "Sehr zentral.", "Mit Motorradgepäck Parkdistanz prüfen."),
      hotel("Essential by Dorint Basel City", "Basel Messe", "Schönaustrasse 10, Basel", 47.5668, 7.5997, "Tiefgarage/Hotelparkplatz prüfen.", "Einfachere Anfahrt als Altstadt.", "Nicht direkt am Rhein.")
    ]
  }
];

function stop(name, address, lat, lng) {
  return {
    name,
    address,
    lat,
    lng,
    links: makeLinks(name, address, lat, lng)
  };
}

function hotel(name, area, address, lat, lng, parking, pro, con) {
  return {
    name,
    area,
    address,
    lat,
    lng,
    parking,
    pro,
    con,
    imageLabel: "Hotelbild prüfen",
    links: makeLinks(name, address, lat, lng)
  };
}

function makeLinks(name, address, lat, lng) {
  const query = encodeURIComponent(`${name} ${address}`);
  return {
    google: `https://www.google.com/maps/search/?api=1&query=${query}`,
    apple: `https://maps.apple.com/?q=${query}&ll=${lat},${lng}`,
    osm: `https://www.openstreetmap.org/?mlat=${lat}&mlon=${lng}#map=14/${lat}/${lng}`
  };
}
