const routeData = [
  {
    day: 1,
    title: "Basel → Ramstein/Landstuhl",
    distance: "ca. 330 km",
    countries: ["Schweiz", "Deutschland"],
    curveFactor: 5,
    description: "Direkt am ersten Abend in der Nähe der Ramstein Air Base ankommen, aber über Markgräflerland, Nordelsass und Pfälzerwald statt Autobahn.",
    focus: "Ramstein am 1. Abend, Pfälzerwald, Orte statt Autobahn",
    note: "Ramstein Air Base ist eine aktive Militärbasis. Ihr habt keinen Militärbasis-Zugang; deshalb sind nur Hotels, Diners und Restaurants außerhalb der Base eingeplant.",
    riderNotes: ["Früh starten, damit der erste Tag trotz 300+ km entspannt bleibt.", "Navigation auf „Autobahn vermeiden“ und „kurvig“ stellen.", "Im Pfälzerwald viele Pausen einplanen, die Strecke ist kurvig und konzentriert."],
    highlights: ["Markgräflerland", "Elsass", "Deutsche Weinstraße", "Johanniskreuz", "Ramstein/Landstuhl", "Kaiserslautern"],
    stops: [
      stop("Basel", "Basel, Schweiz", 47.5596, 7.5886),
      stop("Neuf-Brisach", "Neuf-Brisach, Elsass", 48.0170, 7.5270),
      stop("Ribeauvillé", "Ribeauvillé, Elsass", 48.1952, 7.3192),
      stop("Saverne", "Saverne, Frankreich", 48.7417, 7.3622),
      stop("Bad Bergzabern", "Bad Bergzabern, Deutschland", 49.1025, 7.9990),
      stop("Annweiler am Trifels", "Annweiler am Trifels", 49.2030, 7.9630),
      stop("Johanniskreuz", "Johanniskreuz, Trippstadt", 49.3376, 7.8259),
      stop("Landstuhl", "Landstuhl, Deutschland", 49.4131, 7.5702),
      stop("Ramstein-Miesenbach", "Ramstein-Miesenbach, Deutschland", 49.4450, 7.5550)
    ],
    hotels: [
      hotel("Hotel Restaurant Rosenhof", "Landstuhl, nahe Ramstein", "Am Koehlwäldchen 16, Landstuhl", 49.4007, 7.5679, "Parken am Haus wird von Buchungsportalen als vorhanden gelistet; Motorradplatz direkt anfragen.", "Sehr nah an Ramstein, guter erster Abend.", "Beliebt im Ramstein-Umfeld, früh reservieren."),
      hotel("Hotel Circle Inn", "Ramstein-Miesenbach", "Kindsbacher Str. 58, Ramstein-Miesenbach", 49.4436, 7.5680, "Parken am Haus vorab bestätigen.", "Sehr nah an der Base und praktisch für den Pflichtstopp.", "Wenig Altstadt-Atmosphäre."),
      hotel("Schlosshotel Landstuhl", "Oberhalb Landstuhl", "Burgweg 10, Landstuhl", 49.4142, 7.5730, "Parkoption vor Buchung anfragen.", "Ruhiger Abschluss mit Blicklage.", "Zufahrt kann mit Gepäck etwas steiler sein.")
    ],
    food: [
      "Kein Base-Zugang: Dinner/Diner ausschließlich außerhalb der Ramstein Air Base planen.",
      "USA-Fan-Fokus: Kullman's Diner, Benji's Birdhouse, The BBQ Connection oder Smash and Dash als Abendziel prüfen.",
      "Kaiserslautern/Ramstein ist Teil der Kaiserslautern Military Community. Für US-Flair deshalb bewusst außerhalb der Base planen."
    ],
    usaSpots: [
      spot("Kullman's Diner Kaiserslautern", "American Diner", "Mainzer Straße 119, Kaiserslautern", 49.4448, 7.7970, "Originales US-Diner-Flair, Burger, Pancakes und klassische Diner-Optik. Sehr passend für den USA-Fan in der Gruppe.", "restaurant"),
      spot("Benji's Birdhouse", "Nashville Hot Chicken", "Miesenbacher Str. 54, Ramstein-Miesenbach", 49.4452, 7.5584, "US-Style Chicken Sandwiches nahe Ramstein, laut Stars and Stripes besonders bei Amerikanern beliebt.", "restaurant"),
      spot("The BBQ Connection", "BBQ in Ramstein", "Carl-Zeiss-Str. 3A, Ramstein-Miesenbach", 49.4492, 7.5704, "Smoky BBQ als passender Dinner-Stopp nach Ankunft im Ramstein-Umfeld.", "restaurant"),
      spot("Smash and Dash", "Smash Burger", "Kaiserstraße 77, Kaiserslautern", 49.4258, 7.6745, "US-inspirierte Smash Burger, gut als Alternative Richtung Kaiserslautern/Einsiedlerhof.", "restaurant"),
      spot("Docu Center Ramstein", "US-Geschichte", "Schernauer Straße 46, Ramstein-Miesenbach", 49.4459, 7.5548, "Dokumentationszentrum zur Geschichte der US-Amerikaner in Rheinland-Pfalz. Öffentlich zugänglich, also sinnvoll ohne Base-Zugang.", "attraction"),
      spot("Museum im Westrich Ramstein", "Ramstein Ortsgeschichte", "Miesenbacher Straße 1, Ramstein-Miesenbach", 49.4455, 7.5545, "Kleiner Zusatzstopp im Ort Ramstein, gut kombinierbar mit Docu Center und Dinner.", "attraction")
    ]
  },
  {
    day: 2,
    title: "Ramstein/Landstuhl → Nancy",
    distance: "ca. 205 km",
    countries: ["Deutschland", "Frankreich"],
    curveFactor: 4,
    description: "Nach dem Ramstein-Abend weiter über Pfälzerwald, Nordvogesen und Lothringen nach Nancy. Damit liegt Nancy früh in der Reise und nicht mehr kurz vor Schluss.",
    focus: "Nordvogesen, Lothringen, Nancy früh in der Route",
    riderNotes: ["Autobahn vermeiden und bewusst über kleine Grenzorte routen.", "Bitche und Sarrebourg sind gute Pausenorte.", "Nancy ist ein angenehmer Kulturstopp nach dem Ramstein-Tag."],
    highlights: ["Landstuhl", "Bitche", "Sarrebourg", "Lunéville", "Place Stanislas"],
    stops: [
      stop("Ramstein-Miesenbach", "Ramstein-Miesenbach", 49.4450, 7.5550),
      stop("Landstuhl", "Landstuhl", 49.4131, 7.5702),
      stop("Bitche", "Bitche, Frankreich", 49.0527, 7.4268),
      stop("Sarrebourg", "Sarrebourg, Frankreich", 48.7356, 7.0546),
      stop("Lunéville", "Lunéville, Frankreich", 48.5925, 6.4937),
      stop("Nancy", "Nancy, Frankreich", 48.6921, 6.1844)
    ],
    hotels: [
      hotel("Hotel des Prélats", "Zentrum Nancy", "56 Place Monseigneur Ruch, Nancy", 48.6939, 6.1850, "Innenstadtparkhaus/Hoteloption prüfen.", "Sehr nah an Place Stanislas.", "Altstadtzufahrt."),
      hotel("Best Western Plus Crystal Nancy", "Zentrum", "5 Rue Chanzy, Nancy", 48.6897, 6.1818, "Garage/Partnerparkplatz reservieren.", "Komfortabel und zentral.", "Parklösung klären."),
      hotel("Novotel Suites Nancy Centre", "Kanalnähe", "2 Allée du Chanoine Drioton, Nancy", 48.6951, 6.1990, "Parken in Umgebung prüfen.", "Einfache Anfahrt.", "Etwas außerhalb.")
    ]
  },
  {
    day: 3,
    title: "Nancy → Reims",
    distance: "ca. 220 km",
    countries: ["Frankreich"],
    curveFactor: 3,
    description: "Von Nancy über Toul, Bar-le-Duc und die Argonnen nach Reims. Ruhige D-Straßen, viel Geschichte und keine Paris-Nähe.",
    focus: "Lothringen, Argonnen, Champagne",
    riderNotes: ["Viele Ortsdurchfahrten: lieber gleichmäßig fahren als hetzen.", "Toul oder Bar-le-Duc sind passende Frühstücks-/Kaffeepausen.", "Sainte-Menehould als entspannter Mittagspunkt vor Reims nutzen."],
    highlights: ["Toul", "Bar-le-Duc", "Sainte-Menehould", "Reims"],
    stops: [
      stop("Nancy", "Nancy, Frankreich", 48.6921, 6.1844),
      stop("Toul", "Toul, Frankreich", 48.6759, 5.8911),
      stop("Bar-le-Duc", "Bar-le-Duc, Frankreich", 48.7728, 5.1619),
      stop("Sainte-Menehould", "Sainte-Menehould, Frankreich", 49.0907, 4.8974),
      stop("Reims", "Reims, Frankreich", 49.2583, 4.0317)
    ],
    hotels: [
      hotel("Best Western Premier Hotel de la Paix", "Zentrum Reims", "9 Rue Buirette, Reims", 49.2557, 4.0274, "Gesicherte Parkoption vorab bestätigen.", "Sehr zentral für den Abend.", "Innenstadtzufahrt kostet etwas Geduld."),
      hotel("Akena City Reims Bezannes", "Südwestlich Reims", "Rue Alfred Kastler, Bezannes", 49.2235, 3.9884, "Außenparkplätze meist unkompliziert.", "Einfacher Start am nächsten Morgen.", "Abends weniger charmant."),
      hotel("Novotel Suites Reims Centre", "Bahnhofsnah", "1 Rue Edouard Mignot, Reims", 49.2630, 4.0241, "Parken in Bahnhofsnähe prüfen.", "Guter Komfort und einfache Orientierung.", "Bahnhofsumfeld statt Altstadtgefühl.")
    ]
  },
  {
    day: 4,
    title: "Reims → Rouen",
    distance: "ca. 310 km",
    countries: ["Frankreich"],
    curveFactor: 3,
    description: "Großer Nordwestbogen oberhalb von Paris über Laon, Saint-Quentin, Amiens und die Wälder vor Rouen.",
    focus: "Paris vermeiden, ruhige D-Straßen",
    riderNotes: ["Nicht südlich Richtung Paris abdriften.", "Amiens als Mittagsstopp nutzen.", "Letzte Stunde über Lyons-la-Forêt statt Schnellstraße planen."],
    highlights: ["Laon", "Amiens", "Lyons-la-Forêt", "Rouen"],
    stops: [
      stop("Reims", "Reims, Frankreich", 49.2583, 4.0317),
      stop("Laon", "Laon, Frankreich", 49.5641, 3.6249),
      stop("Saint-Quentin", "Saint-Quentin, Frankreich", 49.8489, 3.2876),
      stop("Amiens", "Amiens, Frankreich", 49.8941, 2.2958),
      stop("Lyons-la-Forêt", "Lyons-la-Forêt, Frankreich", 49.3985, 1.4773),
      stop("Rouen", "Rouen, Frankreich", 49.4432, 1.0993)
    ],
    hotels: [
      hotel("Radisson Blu Hotel Rouen Centre", "Nähe Altstadt", "6-8 Rue du Donjon, Rouen", 49.4475, 1.0952, "Parkhausoption vorab reservieren.", "Modern und gut gelegen.", "Innenstadtverkehr beachten."),
      hotel("Mercure Rouen Centre Cathedrale", "Altstadt", "7 Rue Croix de Fer, Rouen", 49.4416, 1.0955, "Zentrumsparkhaus prüfen.", "Perfekt für Rouen zu Fuß.", "Enge Zufahrt."),
      hotel("Ibis Rouen Centre Rive Droite Pasteur", "Seinenah", "7 Rue de la Pie, Rouen", 49.4445, 1.0837, "Einfachere Anfahrt als Kernaltstadt.", "Praktisch und solide.", "Funktionaler Stil.")
    ]
  },
  {
    day: 5,
    title: "Rouen → Caen",
    distance: "ca. 235 km",
    countries: ["Frankreich"],
    curveFactor: 4,
    description: "Normandie-Tag mit Seine-Schleifen, Honfleur, Deauville und einer Kurvenrunde durch die Suisse Normande nach Caen.",
    focus: "Normandie-Küste, Suisse Normande",
    riderNotes: ["Honfleur und Deauville können voll sein, früh halten.", "In der Suisse Normande eher langsam und sauber fahren.", "Guter Tag für viele kurze Pausen."],
    highlights: ["Pont-Audemer", "Honfleur", "Deauville", "Clécy", "Caen"],
    stops: [
      stop("Rouen", "Rouen, Frankreich", 49.4432, 1.0993),
      stop("Pont-Audemer", "Pont-Audemer", 49.3551, 0.5145),
      stop("Honfleur", "Honfleur", 49.4199, 0.2329),
      stop("Deauville", "Deauville", 49.3600, 0.0740),
      stop("Falaise", "Falaise, Normandie", 48.8920, -0.1993),
      stop("Clécy", "Clécy, Suisse Normande", 48.9178, -0.4817),
      stop("Caen", "Caen, Frankreich", 49.1829, -0.3707)
    ],
    hotels: [
      hotel("Best Western Plus Le Moderne", "Zentrum Caen", "116 Boulevard Marechal Leclerc, Caen", 49.1838, -0.3652, "Parkhaus in der Nähe prüfen.", "Sehr zentral.", "Einbahnstraßen beachten."),
      hotel("Hotel des Quatrans", "Altstadtrand", "17 Rue Gemare, Caen", 49.1854, -0.3658, "Parkmöglichkeiten vorher klären.", "Gute Lage für zwei Nächte.", "Nicht jeder Parkplatz ist motorradideal."),
      hotel("Novotel Caen Côte de Nacre", "Nördlich Caen", "155 Rue de la Delivrande, Caen", 49.2023, -0.3584, "Parken am Hotel meist einfacher.", "Praktisch Richtung Küste.", "Nicht mitten in der Altstadt.")
    ]
  },
  {
    day: 6,
    title: "Caen D-Day Runde",
    distance: "ca. 150 km",
    countries: ["Frankreich"],
    curveFactor: 2,
    description: "Ruhiger Rundtag zu Pegasus Bridge, Arromanches, Normandy American Cemetery, Omaha Beach und Pointe du Hoc.",
    focus: "D-Day-Orte, respektvolle Pausen",
    riderNotes: ["Als älterer Fahrer bewusst kurze Etappen zwischen den Stopps fahren.", "Gedenkstätten mit Zeit und Ruhe besuchen.", "Bei Wind an der Küste defensiv bleiben."],
    highlights: ["Pegasus Bridge", "Arromanches", "Normandy American Cemetery", "Omaha Beach", "Pointe du Hoc"],
    stops: [
      stop("Caen", "Caen", 49.1829, -0.3707),
      stop("Pegasus Bridge", "Pegasus Bridge, Bénouville", 49.2420, -0.2747),
      stop("Arromanches-les-Bains", "Arromanches-les-Bains", 49.3402, -0.6212),
      stop("Normandy American Cemetery", "Colleville-sur-Mer", 49.3594, -0.8552),
      stop("Omaha Beach", "Omaha Beach", 49.3677, -0.8804),
      stop("Pointe du Hoc", "Pointe du Hoc", 49.3946, -0.9899),
      stop("Caen", "Caen", 49.1829, -0.3707)
    ],
    hotels: [
      hotel("Best Western Royal Hotel Caen", "Zentrum", "1 Place de la Republique, Caen", 49.1816, -0.3655, "Parkhaus nahe Place de la Republique prüfen.", "Gut für zweite Nacht.", "Zentrumslogistik."),
      hotel("Ibis Styles Caen Centre Gare", "Bahnhof", "52 Quai Amiral Hamelin, Caen", 49.1764, -0.3487, "Parkhaus/öffentliche Parkplätze prüfen.", "Leicht zu erreichen.", "Weniger historisch."),
      hotel("Hotel Bristol Caen", "Bahnhofsnah", "31 Rue du 11 Novembre, Caen", 49.1772, -0.3579, "Sichere Parkoption anfragen.", "Solide und praktisch.", "Einfacher Standard.")
    ]
  },
  {
    day: 7,
    title: "Caen → Le Mans",
    distance: "ca. 260 km",
    countries: ["Frankreich"],
    curveFactor: 4,
    description: "Südwärts über Bayeux, Saint-Lô und die Suisse Normande, dann durch kleine Orte in Richtung Le Mans.",
    focus: "Suisse Normande, Bocage, kleine Straßen",
    riderNotes: ["Die Bocage-Straßen können eng und unübersichtlich sein.", "Nicht hetzen, viele Ortsdurchfahrten.", "Le Mans am Abend entspannt zu Fuß erkunden."],
    highlights: ["Bayeux", "Saint-Lô", "Domfront", "Alençon", "Le Mans"],
    stops: [
      stop("Caen", "Caen", 49.1829, -0.3707),
      stop("Bayeux", "Bayeux", 49.2765, -0.7039),
      stop("Saint-Lô", "Saint-Lô", 49.1162, -1.0900),
      stop("Domfront", "Domfront en Poiraie", 48.5920, -0.6450),
      stop("Alençon", "Alençon", 48.4329, 0.0913),
      stop("Le Mans", "Le Mans, Frankreich", 48.0061, 0.1996)
    ],
    hotels: [
      hotel("Leprince Hotel Spa", "Altstadt Le Mans", "5 Allée Leprince d'Ardenay, Le Mans", 48.0078, 0.1982, "Parken vorab anfragen.", "Schöne Lage und Komfort.", "Zentraler Preis."),
      hotel("Mercure Le Mans Centre", "Zentrum", "19 Rue Chanzy, Le Mans", 48.0036, 0.2041, "Hotel-/Partnerparkplatz prüfen.", "Guter Standard.", "Innenstadtzufahrt."),
      hotel("Ibis Le Mans Centre", "Flussnähe", "Quai Ledru Rollin, Le Mans", 48.0079, 0.1914, "Parkmöglichkeit anfragen.", "Praktisch und unkompliziert.", "Schlichter Stil.")
    ]
  },
  {
    day: 8,
    title: "Le Mans → Tours/Loire",
    distance: "ca. 185 km",
    countries: ["Frankreich"],
    curveFactor: 3,
    description: "Gemütlicher Loire-Tag über kleine Orte, Schlösser und Weinstraßen nach Tours.",
    focus: "Loire-Orte, kurze Tagesdistanz",
    riderNotes: ["Bewusst entspannter Tag nach mehreren längeren Etappen.", "Ortszentren und Kopfsteinpflaster vorsichtig.", "Am Nachmittag Zeit für Tours lassen."],
    highlights: ["La Flèche", "Saumur", "Chinon", "Azay-le-Rideau", "Tours"],
    stops: [
      stop("Le Mans", "Le Mans", 48.0061, 0.1996),
      stop("La Flèche", "La Flèche", 47.6984, -0.0755),
      stop("Saumur", "Saumur", 47.2601, -0.0760),
      stop("Chinon", "Chinon", 47.1672, 0.2429),
      stop("Azay-le-Rideau", "Azay-le-Rideau", 47.2594, 0.4669),
      stop("Tours", "Tours, Frankreich", 47.3941, 0.6848)
    ],
    hotels: [
      hotel("Hilton Garden Inn Tours Centre", "Tours Zentrum", "1 Place Anatole France, Tours", 47.3972, 0.6845, "Parkhaus/Hoteloption prüfen.", "Sehr gut für Abendspaziergang.", "Städtische Zufahrt."),
      hotel("Best Western Plus L'Artist Hotel", "Bahnhofsnah", "13-15 Rue Frederic Joliot Curie, Tours", 47.3896, 0.6951, "Parken vorab reservieren.", "Modern und zentral.", "Nicht direkt an der Loire."),
      hotel("Ibis Tours Centre Gare", "Praktisch", "1 Rue Maurice Genest, Tours", 47.3888, 0.6968, "Parkhausumfeld prüfen.", "Einfacher Start am Morgen.", "Funktionaler Stil.")
    ]
  },
  {
    day: 9,
    title: "Tours → Nevers",
    distance: "ca. 265 km",
    countries: ["Frankreich"],
    curveFactor: 3,
    description: "Südöstlicher Bogen über Loches, Valençay, Sancerre und an die Loire bei Nevers.",
    focus: "Berry, Sancerre, Loire",
    riderNotes: ["Lange, ruhige Landstraßen, ideal für gleichmäßiges Fahren.", "Sancerre als schöner Pausenort.", "Tankstopps nicht zu spät suchen."],
    highlights: ["Loches", "Valençay", "Sancerre", "Nevers"],
    stops: [
      stop("Tours", "Tours", 47.3941, 0.6848),
      stop("Loches", "Loches", 47.1286, 0.9965),
      stop("Valençay", "Valençay", 47.1613, 1.5681),
      stop("Sancerre", "Sancerre", 47.3318, 2.8370),
      stop("Nevers", "Nevers, Frankreich", 46.9896, 3.1590)
    ],
    hotels: [
      hotel("Mercure Nevers Pont de Loire", "Loireufer", "Quai de Médine, Nevers", 46.9879, 3.1608, "Parken am Hotel prüfen.", "Schöne Lage am Fluss.", "Einfacher Hotelstil."),
      hotel("Best Western de Diane", "Zentrum Nevers", "38 Rue du Midi, Nevers", 46.9907, 3.1582, "Parkmöglichkeit vorab anfragen.", "Charaktervoll und zentral.", "Altstadtzufahrt."),
      hotel("Kyriad Nevers Centre", "Zentrumsnah", "35 Boulevard Victor Hugo, Nevers", 46.9960, 3.1546, "Parken meist unkomplizierter.", "Praktisch für Motorradfahrer.", "Weniger charmant.")
    ]
  },
  {
    day: 10,
    title: "Nevers → Dijon",
    distance: "ca. 250 km",
    countries: ["Frankreich"],
    curveFactor: 5,
    description: "Einer der schönsten Motorradtage: durch den Morvan über Seen, Wälder und kleine Kurvenstraßen nach Dijon.",
    focus: "Morvan, Kurven, Seen",
    riderNotes: ["Morvan nicht bei Müdigkeit unterschätzen.", "Straßen können schmal und wellig sein.", "Viele Fotostopps, aber Tagesziel im Blick behalten."],
    highlights: ["Lac des Settons", "Saulieu", "Autun", "Beaune", "Dijon"],
    stops: [
      stop("Nevers", "Nevers", 46.9896, 3.1590),
      stop("Château-Chinon", "Château-Chinon", 47.0659, 3.9336),
      stop("Lac des Settons", "Lac des Settons", 47.1847, 4.0633),
      stop("Saulieu", "Saulieu", 47.2807, 4.2284),
      stop("Autun", "Autun", 46.9510, 4.2987),
      stop("Beaune", "Beaune", 47.0260, 4.8400),
      stop("Dijon", "Dijon, Frankreich", 47.3220, 5.0415)
    ],
    hotels: [
      hotel("Oceania Le Jura Dijon", "Bahnhofsnah Dijon", "14 Avenue Foch, Dijon", 47.3236, 5.0273, "Garage/Parkplatz prüfen.", "Komfortabel und zentral.", "Städtische Lage."),
      hotel("Vertigo Hotel Dijon", "Zentrum", "3 Rue Devosge, Dijon", 47.3241, 5.0347, "Parkoption vorab klären.", "Modern und besonders.", "Preisniveau höher."),
      hotel("Ibis Styles Dijon Central", "Altstadt", "3 Place Grangier, Dijon", 47.3233, 5.0378, "Parkhaus in Nähe prüfen.", "Sehr gute Lage.", "Innenstadtzufahrt.")
    ]
  },
  {
    day: 11,
    title: "Dijon → Besançon",
    distance: "ca. 160 km",
    countries: ["Frankreich"],
    curveFactor: 4,
    description: "Über Jura-Vorland, Weinorte und kleine Flusstäler Richtung Besançon.",
    focus: "Jura-Vorland, Weinorte, ruhige Straßen",
    riderNotes: ["Arbois und Salins-les-Bains sind schöne Pausenorte.", "Kurvige Abschnitte zwischen Weinbergen und Tälern.", "Kurzerer Tag, gut für ältere Fahrer."],
    highlights: ["Dole", "Arbois", "Salins-les-Bains", "Ornans", "Besançon"],
    stops: [
      stop("Dijon", "Dijon", 47.3220, 5.0415),
      stop("Dole", "Dole", 47.0920, 5.4897),
      stop("Arbois", "Arbois", 46.9030, 5.7740),
      stop("Salins-les-Bains", "Salins-les-Bains", 46.9398, 5.8773),
      stop("Ornans", "Ornans", 47.1050, 6.1436),
      stop("Besançon", "Besançon, Frankreich", 47.2378, 6.0241)
    ],
    hotels: [
      hotel("Hotel Vauban", "Zentrum Besançon", "9 Quai Vauban, Besançon", 47.2398, 6.0220, "Parken/Garage vorab prüfen.", "Sehr gute Altstadtlage.", "Zentraler Verkehr."),
      hotel("Ibis Besançon Centre Ville", "Altstadt", "21 Rue Gambetta, Besançon", 47.2390, 6.0272, "Parkhaus in Nähe prüfen.", "Praktisch und zentral.", "Einfacher Standard."),
      hotel("Mercure Besançon Parc Micaud", "Parknähe", "3 Avenue Edouard Droz, Besançon", 47.2419, 6.0311, "Parken am Hotel prüfen.", "Ruhiger am Park.", "Etwas außerhalb vom Kern.")
    ]
  },
  {
    day: 12,
    title: "Besançon → Colmar",
    distance: "ca. 310 km",
    countries: ["Frankreich"],
    curveFactor: 5,
    description: "Jura- und Südvogesen-Tag über Pontarlier, Morteau, Ballon d'Alsace und die Weinstraße nach Colmar.",
    focus: "Jura, Ballon d'Alsace, Vogesen",
    riderNotes: ["Bei Regen Jura/Vogesen vorsichtig fahren.", "Ballon d'Alsace nur bei guter Sicht wirklich genießen.", "Viele Kurven, regelmäßige Pausen einplanen."],
    highlights: ["Pontarlier", "Morteau", "Ballon d'Alsace", "Guebwiller", "Colmar"],
    stops: [
      stop("Besançon", "Besançon", 47.2378, 6.0241),
      stop("Pontarlier", "Pontarlier", 46.9035, 6.3542),
      stop("Morteau", "Morteau", 47.0579, 6.6076),
      stop("Ballon d'Alsace", "Ballon d'Alsace", 47.8203, 6.8455),
      stop("Guebwiller", "Guebwiller", 47.9072, 7.2100),
      stop("Colmar", "Colmar, Frankreich", 48.0794, 7.3585)
    ],
    hotels: [
      hotel("James Boutique Hotel", "Colmar Zentrum", "15 Rue Saint-Eloi, Colmar", 48.0812, 7.3632, "Parken vor Buchung bestätigen.", "Modern und gut gelegen.", "Innenstadtpreise."),
      hotel("Hotel Turenne", "Altstadtnah", "10 Route de Bâle, Colmar", 48.0727, 7.3608, "Parkgarage/Plätze prüfen.", "Praktische Lage.", "Kann stark nachgefragt sein."),
      hotel("Ibis Styles Colmar Centre", "Zentrum", "11 Boulevard du Champ de Mars, Colmar", 48.0757, 7.3559, "Parkhaus in Nähe prüfen.", "Gut für Stadtbummel.", "Zentrumszufahrt.")
    ]
  },
  {
    day: 13,
    title: "Colmar → Freiburg",
    distance: "ca. 65 km",
    countries: ["Frankreich", "Deutschland"],
    curveFactor: 4,
    description: "Kurzer, sauberer Rückweg aus dem Elsass in den Schwarzwald. Genug Zeit für Colmar am Morgen und Freiburg am Abend.",
    focus: "Elsass, Kaiserstuhl, Freiburg",
    riderNotes: ["Bewusst kurz und entspannt nach den langen Etappen.", "Bei gutem Wetter über Kaiserstuhl und kleine Weinorte fahren.", "Freiburg ist ein sinnvoller letzter Übernachtungsort vor Basel."],
    highlights: ["Colmar", "Breisach", "Kaiserstuhl", "Freiburg"],
    stops: [
      stop("Colmar", "Colmar, Frankreich", 48.0794, 7.3585),
      stop("Neuf-Brisach", "Neuf-Brisach, Elsass", 48.0170, 7.5270),
      stop("Breisach am Rhein", "Breisach am Rhein", 48.0328, 7.5829),
      stop("Vogtsburg im Kaiserstuhl", "Vogtsburg im Kaiserstuhl", 48.0960, 7.6410),
      stop("Freiburg", "Freiburg im Breisgau", 47.9990, 7.8421)
    ],
    hotels: [
      hotel("Motel One Freiburg", "Altstadtnah", "Friedrichring 1, Freiburg", 47.9997, 7.8520, "Zentrale Lage, Tiefgarage in der Umgebung prüfen.", "Sehr praktisch für Abendessen zu Fuß.", "Innenstadt kann beim Gepäck etwas enger sein."),
      hotel("Mercure Hotel Panorama Freiburg", "Oberhalb der Stadt", "Wintererstr. 89, Freiburg", 48.0066, 7.8712, "Ruhige Lage, Parken vor Buchung bestätigen.", "Toller Blick und entspannter Abschluss.", "Nicht direkt in der Altstadt."),
      hotel("Hotel Stadt Freiburg", "Westen Freiburg", "Breisacher Str. 84, Freiburg", 48.0001, 7.8259, "Anfahrt und Parken meist unkomplizierter als Altstadt.", "Gute Basis für Weiterfahrt.", "Weniger romantische Lage.")
    ]
  },
  {
    day: 14,
    title: "Freiburg → Basel",
    distance: "ca. 85 km",
    countries: ["Deutschland", "Schweiz"],
    curveFactor: 4,
    description: "Kurzer Heimtag mit Schwarzwald- und Markgräflerland-Schleife, damit die Rückgabe nach Basel entspannt bleibt.",
    focus: "Kurzer Heimtag, Schwarzwald, Basel",
    riderNotes: ["Bewusst kurz gehalten, damit die Reise nicht mit Stress endet.", "Bei schlechtem Wetter kann direkt nach Basel abgekürzt werden.", "Ideal für spätes Frühstück und entspannte Heimfahrt."],
    highlights: ["Schauinsland", "Münstertal", "Kandern", "Basel"],
    stops: [
      stop("Freiburg", "Freiburg im Breisgau", 47.9990, 7.8421),
      stop("Schauinsland", "Schauinsland, 79254 Oberried", 47.9112, 7.8980),
      stop("Münstertal", "Münstertal/Schwarzwald", 47.8548, 7.7843),
      stop("Kandern", "Kandern, Deutschland", 47.7138, 7.6607),
      stop("Basel", "Basel, Schweiz", 47.5596, 7.5886)
    ],
    hotels: [
      hotel("Hotel Spalentor", "Basel Altstadtrand", "Schönbeinstrasse 1, Basel", 47.5588, 7.5818, "Parkgarage/Hotelplätze vorher prüfen.", "Guter Abschluss nah der Altstadt.", "Schweizer Preisniveau."),
      hotel("Motel One Basel", "Innenstadt", "Barfüssergasse 16, Basel", 47.5555, 7.5909, "Parkhaus in der Umgebung einplanen.", "Sehr zentral.", "Parkdistanz mit Gepäck prüfen."),
      hotel("Essential by Dorint Basel City", "Basel Messe", "Schönaustrasse 10, Basel", 47.5668, 7.5997, "Tiefgarage/Hotelparkplatz prüfen.", "Einfachere Anfahrt als Altstadt.", "Nicht direkt am Rhein.")
    ]
  }
];

compressRouteToNineDays();

const optionBRouteData = createOptionBRoute();
const routeOptions = [
  {
    id: "option-a",
    label: "Option A",
    name: "Ramstein, Loire und Jura",
    headline: "Basel → Ramstein → Caen → Basel",
    totalKm: "~2.680 km",
    countries: 3,
    days: routeData,
    summary: "Aktuelle Planung mit Ramstein am ersten Abend, D-Day-Runde, Loire/Burgund/Jura und kurzem direkten Heimtag.",
    strengths: ["Ramstein/USA-Fokus am 1. Abend", "D-Day-Orte mit eigener Rundfahrt", "Rückreise gut verteilt ohne 500-km-Tage"]
  },
  {
    id: "option-b",
    label: "Option B",
    name: "Trier, Lille und Elsass",
    headline: "Basel → Trier → Lille → Caen → Basel",
    totalKm: "~2.270 km",
    countries: 5,
    days: optionBRouteData,
    summary: "Chef-Vorschlag mit Nordbogen über Trier, Belgien und Lille, danach Normandie, Reims, Nancy, Colmar und zurück nach Basel.",
    strengths: ["Mehr Nordfrankreich/Belgien", "Sehr klare Tagesziele", "Ruhiger Schluss über Nancy und Colmar"]
  }
];

function createOptionBRoute() {
  return [
    {
      day: 1,
      title: "Basel → Trier",
      distance: "ca. 360 km",
      countries: ["Schweiz", "Frankreich", "Deutschland"],
      curveFactor: 4,
      description: "Chef-Variante mit langem Auftakt über Nordelsass, Pfälzerwald/Saarland und Moselraum bis Trier. Keine Autobahnplanung, aber als erster Tag bewusst früh starten.",
      focus: "Elsass, Nordvogesen, Saarland, Trier",
      riderNotes: [
        "Langer Auftakt: früh losfahren und Pausen nicht erst am Nachmittag suchen.",
        "Saverne oder Bitche funktionieren gut als längere Pause vor dem Saarland.",
        "Trier bietet abends viel zu Fuß, deshalb lohnt ein zentral gelegenes Hotel mit Parklösung."
      ],
      highlights: ["Saverne", "Bitche", "Saarburg", "Porta Nigra", "Trier"],
      stops: [
        stop("Basel", "Basel, Schweiz", 47.5596, 7.5886),
        stop("Saverne", "Saverne, Frankreich", 48.7417, 7.3622),
        stop("Bitche", "Bitche, Frankreich", 49.0527, 7.4268),
        stop("Saarburg", "Saarburg, Deutschland", 49.6080, 6.5520),
        stop("Trier", "Trier, Deutschland", 49.7499, 6.6371)
      ],
      hotels: [
        hotel("Park Plaza Trier", "Trier Zentrum", "Nikolaus-Koch-Platz 1, Trier", 49.7560, 6.6412, "Parkhaus/Hotelgarage vorab prüfen.", "Sehr zentral für Porta Nigra und Abendessen.", "Innenstadtpreise und Parkhöhe beachten."),
        hotel("Best Western Hotel Trier City", "Trier City", "Kaiserstraße 29, Trier", 49.7515, 6.6393, "Parkgarage/öffentliche Parkplätze direkt prüfen.", "Gute Lage und einfache Orientierung.", "Funktionaler als romantisch."),
        hotel("Vienna House Easy by Wyndham Trier", "Südlich Zentrum", "Metzer Allee 6, Trier", 49.7452, 6.6436, "Parken am Hotel prüfen.", "Etwas einfacher anzufahren als die Kernaltstadt.", "Zur Altstadt ein kurzer Weg.")
      ]
    },
    {
      day: 2,
      title: "Trier → Lille",
      distance: "ca. 360 km",
      countries: ["Deutschland", "Luxemburg", "Belgien", "Frankreich"],
      curveFactor: 3,
      description: "Nordwestlicher Verbindungstag über Luxemburg, Ardennen, Bastogne, Mons und Tournai nach Lille. Viel Geschichte und Ortsdurchfahrten, aber fahrbar, wenn die Pausen klar sitzen.",
      focus: "Luxemburg, Ardennen, Belgien, Lille",
      riderNotes: [
        "Grenzen sind unkompliziert, aber Tempo- und Umweltregeln je Land im Blick behalten.",
        "Bastogne eignet sich als thematischer Mittagsstopp für WWII-Interessierte.",
        "Lille ist eine Großstadt: Hotel mit sicherer Parklösung vorher klären."
      ],
      highlights: ["Luxemburg", "Bastogne", "Mons", "Tournai", "Lille"],
      stops: [
        stop("Trier", "Trier, Deutschland", 49.7499, 6.6371),
        stop("Luxemburg", "Luxemburg Stadt", 49.6116, 6.1319),
        stop("Bastogne", "Bastogne, Belgien", 50.0035, 5.7184),
        stop("Mons", "Mons, Belgien", 50.4542, 3.9567),
        stop("Tournai", "Tournai, Belgien", 50.6056, 3.3880),
        stop("Lille", "Lille, Frankreich", 50.6292, 3.0573)
      ],
      hotels: [
        hotel("Best Western Premier Why Hotel", "Lille Zentrum", "7 Bis Square Morisson, Lille", 50.6330, 3.0590, "Parkhaus in der Umgebung vorab auswählen.", "Sehr zentral und praktisch für Abendessen.", "Innenstadtzufahrt kann zäh sein."),
        hotel("OKKO Hotels Lille Centre", "Lille Zentrum", "13 Rue d'Amiens, Lille", 50.6340, 3.0627, "Nahegelegene Parkhäuser prüfen.", "Modern, zentral und unkompliziert.", "Kein klassisches Motorrad-Hotel."),
        hotel("Couvent des Minimes Alliance Lille", "Altstadtnah", "17 Quai du Wault, Lille", 50.6386, 3.0527, "Garage/Parkoption vorher bestätigen.", "Besonderes Gebäude und schöne Lage.", "Preisniveau oft höher.")
      ]
    },
    {
      day: 3,
      title: "Lille → Caen",
      distance: "ca. 380 km",
      countries: ["Frankreich"],
      curveFactor: 3,
      description: "Langer Verbindungstag von Lille über Arras, Albert, Amiens und Rouen nach Caen. Das ist der einzige Tag über der bisherigen Schmerzgrenze; dafür bleiben die Folgetage deutlich ruhiger.",
      focus: "Nordfrankreich, Somme, Rouen, Caen",
      note: "Dieser Chef-Vorschlag liegt realistisch bei rund 380-390 km. Für ältere Fahrer nur mit frühem Start und kurzen Stopps sinnvoll.",
      riderNotes: [
        "Früh starten und Arras/Albert eher als kurze Kaffee- oder Fotostopps behandeln.",
        "Amiens ist die beste längere Mittagspause.",
        "Wenn die Gruppe müde ist, Rouen als Not-Zwischenziel nehmen und Option B um einen Tag entzerren."
      ],
      highlights: ["Arras", "Albert", "Amiens", "Rouen", "Caen"],
      stops: [
        stop("Lille", "Lille, Frankreich", 50.6292, 3.0573),
        stop("Arras", "Arras, Frankreich", 50.2910, 2.7770),
        stop("Albert", "Albert, Somme", 50.0006, 2.6520),
        stop("Amiens", "Amiens, Frankreich", 49.8941, 2.2958),
        stop("Rouen", "Rouen, Frankreich", 49.4432, 1.0993),
        stop("Caen", "Caen, Frankreich", 49.1829, -0.3707)
      ],
      hotels: [
        hotel("Best Western Plus Le Moderne", "Zentrum Caen", "116 Boulevard Marechal Leclerc, Caen", 49.1838, -0.3652, "Parkhaus in der Nähe prüfen.", "Sehr zentral.", "Einbahnstraßen beachten."),
        hotel("Hotel des Quatrans", "Altstadtrand", "17 Rue Gemare, Caen", 49.1854, -0.3658, "Parkmöglichkeiten vorher klären.", "Gute Lage für zwei Nächte.", "Nicht jeder Parkplatz ist motorradideal."),
        hotel("Novotel Caen Côte de Nacre", "Nördlich Caen", "155 Rue de la Delivrande, Caen", 49.2023, -0.3584, "Parken am Hotel meist einfacher.", "Praktisch Richtung Küste.", "Nicht mitten in der Altstadt.")
      ]
    },
    {
      day: 4,
      title: "Normandie / Omaha Beach Runde",
      distance: "ca. 150 km",
      countries: ["Frankreich"],
      curveFactor: 2,
      description: "Tagesausflug ab Caen zu Pegasus Bridge, Arromanches, Normandy American Cemetery, Omaha Beach und Pointe du Hoc. Inhaltlich der wichtigste US-Gedenktag der Reise.",
      focus: "Omaha Beach, US-Friedhof, D-Day",
      riderNotes: [
        "Respektvolle, ruhige Tagesplanung: weniger Kilometer, mehr Zeit an den Gedenkstätten.",
        "Normandy American Cemetery und Omaha Beach nicht hetzen.",
        "Bei Wind und Regen an der Küste besonders defensiv fahren."
      ],
      highlights: ["Pegasus Bridge", "Arromanches", "Normandy American Cemetery", "Omaha Beach", "Pointe du Hoc"],
      stops: [
        stop("Caen", "Caen, Frankreich", 49.1829, -0.3707),
        stop("Pegasus Bridge", "Pegasus Bridge, Bénouville", 49.2420, -0.2747),
        stop("Arromanches-les-Bains", "Arromanches-les-Bains", 49.3402, -0.6212),
        stop("Normandy American Cemetery", "Colleville-sur-Mer", 49.3594, -0.8552),
        stop("Omaha Beach", "Omaha Beach", 49.3677, -0.8804),
        stop("Pointe du Hoc", "Pointe du Hoc", 49.3946, -0.9899),
        stop("Caen", "Caen, Frankreich", 49.1829, -0.3707)
      ],
      hotels: [
        hotel("Best Western Royal Hotel Caen", "Zentrum", "1 Place de la Republique, Caen", 49.1816, -0.3655, "Parkhaus nahe Place de la Republique prüfen.", "Gut für zweite Nacht.", "Zentrumslogistik."),
        hotel("Ibis Styles Caen Centre Gare", "Bahnhof", "52 Quai Amiral Hamelin, Caen", 49.1764, -0.3487, "Parkhaus/öffentliche Parkplätze prüfen.", "Leicht zu erreichen.", "Weniger historisch."),
        hotel("Hotel Bristol Caen", "Bahnhofsnah", "31 Rue du 11 Novembre, Caen", 49.1772, -0.3579, "Sichere Parkoption anfragen.", "Solide und praktisch.", "Einfacher Standard.")
      ]
    },
    {
      day: 5,
      title: "Caen → Rouen",
      distance: "ca. 145 km",
      countries: ["Frankreich"],
      curveFactor: 3,
      description: "Kurzer Normandie-Tag nach dem D-Day-Ausflug: Caen, Honfleur, Pont-Audemer und Rouen. Viel Zeit für Küste, Hafen und Altstadt.",
      focus: "Honfleur, Seine, Rouen",
      riderNotes: [
        "Bewusst kurz: ideal zum Ausschlafen nach dem intensiven Gedenkstätten-Tag.",
        "Honfleur kann voll sein; Motorräder früh und geordnet parken.",
        "Rouen am Nachmittag/Abend zu Fuß genießen."
      ],
      highlights: ["Honfleur", "Pont-Audemer", "Rouen Altstadt"],
      stops: [
        stop("Caen", "Caen, Frankreich", 49.1829, -0.3707),
        stop("Honfleur", "Honfleur, Frankreich", 49.4199, 0.2329),
        stop("Pont-Audemer", "Pont-Audemer, Frankreich", 49.3551, 0.5145),
        stop("Rouen", "Rouen, Frankreich", 49.4432, 1.0993)
      ],
      hotels: [
        hotel("Radisson Blu Hotel Rouen Centre", "Nähe Altstadt", "6-8 Rue du Donjon, Rouen", 49.4475, 1.0952, "Parkhausoption vorab reservieren.", "Modern und gut gelegen.", "Innenstadtverkehr beachten."),
        hotel("Mercure Rouen Centre Cathedrale", "Altstadt", "7 Rue Croix de Fer, Rouen", 49.4416, 1.0955, "Zentrumsparkhaus prüfen.", "Perfekt für Rouen zu Fuß.", "Enge Zufahrt."),
        hotel("Ibis Rouen Centre Rive Droite Pasteur", "Seinenah", "7 Rue de la Pie, Rouen", 49.4445, 1.0837, "Einfachere Anfahrt als Kernaltstadt.", "Praktisch und solide.", "Funktionaler Stil.")
      ]
    },
    {
      day: 6,
      title: "Rouen → Reims",
      distance: "ca. 330 km",
      countries: ["Frankreich"],
      curveFactor: 3,
      description: "Nordöstlicher Bogen über Lyons-la-Forêt, Amiens und Laon nach Reims. Paris wird klar vermieden.",
      focus: "Amiens, Laon, Champagne",
      riderNotes: [
        "Amiens als feste Mittagspause setzen.",
        "Laon ist ein guter letzter Kulturstopp vor Reims.",
        "Nicht südlich Richtung Paris routen lassen."
      ],
      highlights: ["Lyons-la-Forêt", "Amiens", "Laon", "Reims"],
      stops: [
        stop("Rouen", "Rouen, Frankreich", 49.4432, 1.0993),
        stop("Lyons-la-Forêt", "Lyons-la-Forêt, Frankreich", 49.3985, 1.4773),
        stop("Amiens", "Amiens, Frankreich", 49.8941, 2.2958),
        stop("Laon", "Laon, Frankreich", 49.5641, 3.6249),
        stop("Reims", "Reims, Frankreich", 49.2583, 4.0317)
      ],
      hotels: [
        hotel("Best Western Premier Hotel de la Paix", "Zentrum Reims", "9 Rue Buirette, Reims", 49.2557, 4.0274, "Gesicherte Parkoption vorab bestätigen.", "Sehr zentral für den Abend.", "Innenstadtzufahrt kostet etwas Geduld."),
        hotel("Akena City Reims Bezannes", "Südwestlich Reims", "Rue Alfred Kastler, Bezannes", 49.2235, 3.9884, "Außenparkplätze meist unkompliziert.", "Einfacher Start am nächsten Morgen.", "Abends weniger charmant."),
        hotel("Novotel Suites Reims Centre", "Bahnhofsnah", "1 Rue Edouard Mignot, Reims", 49.2630, 4.0241, "Parken in Bahnhofsnähe prüfen.", "Guter Komfort und einfache Orientierung.", "Bahnhofsumfeld statt Altstadtgefühl.")
      ]
    },
    {
      day: 7,
      title: "Reims → Nancy",
      distance: "ca. 235 km",
      countries: ["Frankreich"],
      curveFactor: 3,
      description: "Ruhige Rückreiseetappe von der Champagne über Argonnen, Verdun und Toul nach Nancy.",
      focus: "Argonnen, Verdun, Toul, Nancy",
      riderNotes: [
        "Verdun ist ein sinnvoller Geschichtsstopp, aber emotional und zeitlich nicht überladen.",
        "Toul eignet sich gut für Kaffee vor dem Ziel.",
        "Nancy am Abend mit Place Stanislas einplanen."
      ],
      highlights: ["Sainte-Menehould", "Verdun", "Toul", "Place Stanislas"],
      stops: [
        stop("Reims", "Reims, Frankreich", 49.2583, 4.0317),
        stop("Sainte-Menehould", "Sainte-Menehould, Frankreich", 49.0902, 4.8970),
        stop("Verdun", "Verdun, Frankreich", 49.1598, 5.3828),
        stop("Toul", "Toul, Frankreich", 48.6759, 5.8911),
        stop("Nancy", "Nancy, Frankreich", 48.6921, 6.1844)
      ],
      hotels: [
        hotel("Hotel des Prélats", "Zentrum Nancy", "56 Place Monseigneur Ruch, Nancy", 48.6939, 6.1850, "Innenstadtparkhaus/Hoteloption prüfen.", "Sehr nah an Place Stanislas.", "Altstadtzufahrt."),
        hotel("Best Western Plus Crystal Nancy", "Zentrum", "5 Rue Chanzy, Nancy", 48.6897, 6.1818, "Garage/Partnerparkplatz reservieren.", "Komfortabel und zentral.", "Parklösung klären."),
        hotel("Novotel Suites Nancy Centre", "Kanalnähe", "2 Allée du Chanoine Drioton, Nancy", 48.6951, 6.1990, "Parken in Umgebung prüfen.", "Einfache Anfahrt.", "Etwas außerhalb.")
      ]
    },
    {
      day: 8,
      title: "Nancy → Colmar",
      distance: "ca. 225 km",
      countries: ["Frankreich"],
      curveFactor: 4,
      description: "Von Lothringen zurück ins Elsass: Lunéville, Sarrebourg, Saverne, Riquewihr und Colmar. Eine schöne, überschaubare Etappe.",
      focus: "Lothringen, Nordvogesen, Elsass",
      riderNotes: [
        "Sarrebourg oder Saverne als ruhige Mittagspause nutzen.",
        "Riquewihr ist schön, aber touristisch; nur kurz halten, wenn viel los ist.",
        "Colmar bietet einen entspannten letzten französischen Abend."
      ],
      highlights: ["Lunéville", "Sarrebourg", "Saverne", "Riquewihr", "Colmar"],
      stops: [
        stop("Nancy", "Nancy, Frankreich", 48.6921, 6.1844),
        stop("Lunéville", "Lunéville, Frankreich", 48.5925, 6.4937),
        stop("Sarrebourg", "Sarrebourg, Frankreich", 48.7356, 7.0546),
        stop("Saverne", "Saverne, Frankreich", 48.7417, 7.3622),
        stop("Riquewihr", "Riquewihr, Elsass", 48.1663, 7.2970),
        stop("Colmar", "Colmar, Frankreich", 48.0794, 7.3585)
      ],
      hotels: [
        hotel("James Boutique Hotel", "Colmar Zentrum", "15 Rue Saint-Eloi, Colmar", 48.0812, 7.3632, "Parken vor Buchung bestätigen.", "Modern und gut gelegen.", "Innenstadtpreise."),
        hotel("Hotel Turenne", "Altstadtnah", "10 Route de Bâle, Colmar", 48.0727, 7.3608, "Parkgarage/Plätze prüfen.", "Praktische Lage.", "Kann stark nachgefragt sein."),
        hotel("Ibis Styles Colmar Centre", "Zentrum", "11 Boulevard du Champ de Mars, Colmar", 48.0757, 7.3559, "Parkhaus in Nähe prüfen.", "Gut für Stadtbummel.", "Zentrumszufahrt.")
      ]
    },
    {
      day: 9,
      title: "Colmar → Basel",
      distance: "ca. 100 km",
      countries: ["Frankreich", "Deutschland", "Schweiz"],
      curveFactor: 3,
      description: "Kurzer Heimtag von Colmar über Neuf-Brisach, Breisach und Markgräflerland nach Basel. Ohne Freiburg-Schlenker, damit der Abschluss entspannt bleibt.",
      focus: "Colmar, Rhein, direkter Heimweg",
      riderNotes: [
        "Bewusst kurz: spätes Frühstück in Colmar ist realistisch.",
        "Breisach oder Neuf-Brisach als letzter Fotostopp.",
        "Bei Müdigkeit kann auch ganz direkt nach Basel abgekürzt werden."
      ],
      highlights: ["Neuf-Brisach", "Breisach", "Markgräflerland", "Basel"],
      stops: [
        stop("Colmar", "Colmar, Frankreich", 48.0794, 7.3585),
        stop("Neuf-Brisach", "Neuf-Brisach, Elsass", 48.0170, 7.5270),
        stop("Breisach am Rhein", "Breisach am Rhein, Deutschland", 48.0328, 7.5829),
        stop("Kandern", "Kandern, Deutschland", 47.7138, 7.6607),
        stop("Basel", "Basel, Schweiz", 47.5596, 7.5886)
      ],
      hotels: [
        hotel("Hotel Spalentor", "Basel Altstadtrand", "Schönbeinstrasse 1, Basel", 47.5588, 7.5818, "Parkgarage/Hotelplätze vorher prüfen.", "Guter Abschluss nah der Altstadt.", "Schweizer Preisniveau."),
        hotel("Motel One Basel", "Innenstadt", "Barfüssergasse 16, Basel", 47.5555, 7.5909, "Parkhaus in der Umgebung einplanen.", "Sehr zentral.", "Parkdistanz mit Gepäck prüfen."),
        hotel("Essential by Dorint Basel City", "Basel Messe", "Schönaustrasse 10, Basel", 47.5668, 7.5997, "Tiefgarage/Hotelparkplatz prüfen.", "Einfachere Anfahrt als Altstadt.", "Nicht direkt am Rhein.")
      ]
    }
  ];
}

function compressRouteToNineDays() {
  const original = [...routeData];
  const byDay = new Map(original.map((day) => [day.day, day]));

  routeData.splice(
    0,
    routeData.length,
    cloneDay(byDay.get(1), 1),
    {
      day: 2,
      title: "Ramstein/Landstuhl → Reims",
      distance: "ca. 325 km",
      countries: ["Deutschland", "Frankreich"],
      curveFactor: 4,
      description: "Zweiter längerer Fahrtag von Ramstein über Saarbrücken, Metz, Verdun und die Argonnen nach Reims. Nancy wird bewusst nicht mehr als großer Routenschlenker gefahren, damit die Etappe unter der Schmerzgrenze bleibt.",
      focus: "Saarland, Metz, Verdun, Reims",
      riderNotes: [
        "Früh losfahren, weil Verdun und Reims beide lohnende, aber kurze Stopps sind.",
        "Mittag ideal im Raum Metz oder Verdun, danach ruhig über Sainte-Menehould Richtung Champagne rollen.",
        "Nancy bleibt wegen der 9-Tage-Kompression bewusst draußen; der Umweg würde die Etappe deutlich über 370 km ziehen."
      ],
      highlights: ["Saarbrücken", "Metz", "Verdun", "Sainte-Menehould", "Reims"],
      stops: [
        stop("Ramstein-Miesenbach", "Ramstein-Miesenbach, Deutschland", 49.4447, 7.5540),
        stop("Landstuhl", "Landstuhl, Deutschland", 49.4137, 7.5706),
        stop("Saarbrücken", "Saarbrücken, Deutschland", 49.2402, 6.9969),
        stop("Metz", "Metz, Frankreich", 49.1193, 6.1757),
        stop("Verdun", "Verdun, Frankreich", 49.1598, 5.3828),
        stop("Sainte-Menehould", "Sainte-Menehould, Frankreich", 49.0902, 4.8970),
        stop("Reims", "Reims, Frankreich", 49.2583, 4.0317)
      ],
      hotels: byDay.get(3).hotels
    },
    cloneDay(byDay.get(4), 3, {
      title: "Reims → Rouen"
    }),
    cloneDay(byDay.get(5), 4, {
      title: "Rouen → Caen"
    }),
    cloneDay(byDay.get(6), 5, {
      title: "Caen D-Day Runde"
    }),
    {
      day: 6,
      title: "Caen → Saumur",
      distance: "ca. 365 km",
      countries: ["Frankreich"],
      curveFactor: 4,
      description: "Der längere Rückweg beginnt nach der D-Day-Runde: Bocage, Domfront, Alençon, Le Mans und weiter an die Loire bis Saumur.",
      focus: "Bocage, Le Mans, Loire, Saumur",
      riderNotes: [
        "Schmerzgrenze-Tag: früh starten und Le Mans eher als kompakte Mittagspause planen.",
        "Der Abschnitt zieht Kilometer vor, damit die letzten Tage nicht auf 500 km anwachsen.",
        "Saumur ist ein guter Abendort, weil Hotel, Essen und Loire-Spaziergang nah beieinander liegen."
      ],
      highlights: ["Bayeux", "Saint-Lô", "Domfront", "Alençon", "Le Mans", "Saumur"],
      stops: [
        stop("Caen", "Caen, Frankreich", 49.1829, -0.3707),
        stop("Bayeux", "Bayeux, Frankreich", 49.2766, -0.7025),
        stop("Saint-Lô", "Saint-Lô, Frankreich", 49.1156, -1.0907),
        stop("Domfront", "Domfront en Poiraie, Frankreich", 48.5946, -0.6451),
        stop("Alençon", "Alençon, Frankreich", 48.4329, 0.0913),
        stop("Le Mans", "Le Mans, Frankreich", 48.0061, 0.1996),
        stop("La Flèche", "La Flèche, Frankreich", 47.6985, -0.0755),
        stop("Saumur", "Saumur, Frankreich", 47.2601, -0.0760)
      ],
      hotels: [
        hotel("Hôtel Anne d'Anjou", "Saumur Loireufer", "32 Quai Mayaud, Saumur", 47.2593, -0.0731, "Öffentliche Parkplätze/Hotel vorab prüfen.", "Sehr schöner Abendstandort direkt an der Loire.", "Zentrale Lage kann bei Gepäck etwas enger sein."),
        hotel("The Originals Boutique Hôtel Le Londres", "Saumur Zentrum", "48 Rue d'Orléans, Saumur", 47.2606, -0.0781, "Garage/Parkmöglichkeit vor Reservierung klären.", "Praktisch für Altstadt und Restaurants zu Fuß.", "Innenstadtverkehr beim Ankommen beachten."),
        hotel("Ibis Styles Saumur Gare Centre", "Saumur Bahnhof", "15 Avenue David d'Angers, Saumur", 47.2684, -0.0710, "Parkplätze in der Umgebung gut planbar.", "Einfache Anfahrt nach einem langen Tag.", "Weniger romantisch als Loireufer/Altstadt.")
      ]
    },
    {
      day: 7,
      title: "Saumur → Nevers",
      distance: "ca. 350 km",
      countries: ["Frankreich"],
      curveFactor: 4,
      description: "Loire-Tag mit Saumur, Chinon, Azay-le-Rideau, Tours, Valençay und Sancerre bis Nevers. Viele Orte bleiben bewusst kurze Stopps, damit die Etappe fahrbar bleibt.",
      focus: "Loire, Châteaux, Sancerre, Nevers",
      riderNotes: [
        "Maximal-Tag: Frühstück früh in Saumur, Mittag im Raum Tours/Loches.",
        "Chinon und Azay-le-Rideau als Fotostopps behandeln, nicht beide lang ausdehnen.",
        "Sancerre ist der schönste späte Pausenpunkt vor Nevers."
      ],
      highlights: ["La Flèche", "Saumur", "Tours", "Valençay", "Sancerre", "Nevers"],
      stops: [
        stop("Saumur", "Saumur, Frankreich", 47.2601, -0.0760),
        stop("Chinon", "Chinon, Frankreich", 47.1663, 0.2427),
        stop("Azay-le-Rideau", "Azay-le-Rideau, Frankreich", 47.2606, 0.4669),
        stop("Tours", "Tours, Frankreich", 47.3941, 0.6848),
        stop("Loches", "Loches, Frankreich", 47.1287, 0.9962),
        stop("Valençay", "Valençay, Frankreich", 47.1627, 1.5639),
        stop("Sancerre", "Sancerre, Frankreich", 47.3305, 2.8397),
        stop("Nevers", "Nevers, Frankreich", 46.9896, 3.1590)
      ],
      hotels: byDay.get(9).hotels
    },
    {
      day: 8,
      title: "Nevers → Besançon",
      distance: "ca. 345 km",
      countries: ["Frankreich"],
      curveFactor: 5,
      description: "Vom Burgund in den Jura: Nevers, Dijon, Dole, Arbois, Salins-les-Bains und Ornans bis Besançon. Der Tag zieht den Jura vor, damit Tag 9 entspannt nach Basel führt.",
      focus: "Burgund, Jura, Besançon",
      riderNotes: [
        "Dijon als längere Kaffeepause oder frühes Mittagessen einplanen, nicht als ganzer Stadttag.",
        "Arbois und Salins-les-Bains bringen kleine Straßen und Jura-Charakter in die Etappe.",
        "Besançon ist der bessere letzte französische Übernachtungsort als eine überlange Heimfahrt."
      ],
      highlights: ["Dijon", "Dole", "Arbois", "Salins-les-Bains", "Ornans", "Besançon"],
      stops: [
        stop("Nevers", "Nevers, Frankreich", 46.9896, 3.1590),
        stop("Dijon", "Dijon, Frankreich", 47.3220, 5.0415),
        stop("Dole", "Dole, Frankreich", 47.0921, 5.4899),
        stop("Arbois", "Arbois, Frankreich", 46.9030, 5.7740),
        stop("Salins-les-Bains", "Salins-les-Bains, Frankreich", 46.9402, 5.8777),
        stop("Ornans", "Ornans, Frankreich", 47.1065, 6.1431),
        stop("Besançon", "Besançon, Frankreich", 47.2378, 6.0241)
      ],
      hotels: byDay.get(11).hotels
    },
    {
      day: 9,
      title: "Besançon → Basel",
      distance: "ca. 215 km",
      countries: ["Frankreich", "Schweiz"],
      curveFactor: 4,
      description: "Direkter Abschlusstag aus Besançon nach Basel über Pontarlier und Morteau. Ohne Colmar, Freiburg, Guebwiller, Ballon d'Alsace oder zusätzliche Elsass-Schleife.",
      focus: "Pontarlier, Morteau, direkter Weg nach Basel",
      riderNotes: [
        "Kurzer Heimtag: bewusst ohne Colmar, Freiburg, Guebwiller und Ballon d'Alsace.",
        "Pontarlier oder Morteau als letzte entspannte Pause wählen, danach direkt Richtung Basel.",
        "Wenn alle müde sind, kann der Kurvenanteil weiter reduziert werden, ohne das Ziel zu gefährden."
      ],
      highlights: ["Besançon", "Pontarlier", "Morteau", "Basel"],
      stops: [
        stop("Besançon", "Besançon, Frankreich", 47.2378, 6.0241),
        stop("Pontarlier", "Pontarlier, Frankreich", 46.9035, 6.3542),
        stop("Morteau", "Morteau, Frankreich", 47.0579, 6.6076),
        stop("Basel", "Basel, Schweiz", 47.5596, 7.5886)
      ],
      hotels: byDay.get(14).hotels
    }
  );
}

function cloneDay(day, newDay, overrides = {}) {
  return {
    ...day,
    ...overrides,
    day: newDay
  };
}

function combineDays(byDay, config) {
  const sourceDays = config.sourceDays.map((dayNumber) => byDay.get(dayNumber)).filter(Boolean);
  const removeStopNames = new Set((config.removeStopNames || []).map((name) => normalizeRouteName(name)));
  const stops = [];

  sourceDays.forEach((day) => {
    day.stops.forEach((stop) => {
      if (removeStopNames.has(normalizeRouteName(stop.name))) return;
      const previous = stops[stops.length - 1];
      if (previous && normalizeRouteName(previous.name) === normalizeRouteName(stop.name)) return;
      stops.push(stop);
    });
  });

  return {
    day: config.day,
    title: config.title,
    distance: config.distance,
    countries: [...new Set(sourceDays.flatMap((day) => day.countries))],
    curveFactor: config.curveFactor,
    description: config.description,
    focus: config.focus,
    riderNotes: config.riderNotes,
    highlights: config.highlights,
    stops,
    hotels: byDay.get(config.hotelsFrom)?.hotels || sourceDays[sourceDays.length - 1]?.hotels || []
  };
}

function normalizeRouteName(value) {
  return String(value || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

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
  const profile = hotelProfile(name, area);
  return {
    name,
    area,
    address,
    lat,
    lng,
    parking,
    pro,
    con,
    priceRange: profile.priceRange,
    rating: profile.rating,
    imageLabel: "Echte Hotelbilder",
    links: makeLinks(name, address, lat, lng)
  };
}

function spot(name, area, address, lat, lng, note, kind) {
  return {
    name,
    area,
    address,
    lat,
    lng,
    note,
    kind,
    query: `${name} ${address}`,
    links: makeLinks(name, address, lat, lng)
  };
}

function hotelProfile(name, area) {
  const text = `${name} ${area}`.toLowerCase();

  if (text.includes("rosenhof")) return { priceRange: "ca. 80-130 EUR/Nacht", rating: "Google Maps: ca. 4+ Sterne live prüfen" };
  if (text.includes("circle inn")) return { priceRange: "ca. 160-190 EUR/Nacht", rating: "Google Maps: ca. 4+ Sterne live prüfen" };
  if (text.includes("schloss")) return { priceRange: "ca. 130-180 EUR/Nacht", rating: "Google Maps: ca. 4+ Sterne live prüfen" };
  if (text.includes("best western premier") || text.includes("vertigo") || text.includes("leprince") || text.includes("hilton")) {
    return { priceRange: "ca. 150-260 EUR/Nacht", rating: "Google Maps: sehr gut prüfen" };
  }
  if (text.includes("mercure") || text.includes("novotel") || text.includes("oceania") || text.includes("james")) {
    return { priceRange: "ca. 110-210 EUR/Nacht", rating: "Google Maps: gut bis sehr gut prüfen" };
  }
  if (text.includes("ibis") || text.includes("kyriad") || text.includes("b&b")) {
    return { priceRange: "ca. 70-150 EUR/Nacht", rating: "Google Maps: solide prüfen" };
  }
  return { priceRange: "ca. 90-190 EUR/Nacht", rating: "Google Maps Sterne live prüfen" };
}


function makeLinks(name, address, lat, lng) {
  const query = encodeURIComponent(`${name} ${address}`);
  return {
    google: `https://www.google.com/maps/search/?api=1&query=${query}`,
    photos: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${name} ${address} Fotos`)}`,
    apple: `https://maps.apple.com/?q=${query}&ll=${lat},${lng}`,
    osm: `https://www.openstreetmap.org/?mlat=${lat}&mlon=${lng}#map=14/${lat}/${lng}`
  };
}
