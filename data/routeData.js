const hotelImages = [
  "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=900&q=80"
];

const routeData = [
  {
    day: 1,
    title: "Basel → Ramstein/Landstuhl",
    distance: "ca. 340 km",
    countries: ["Schweiz", "Deutschland"],
    curveFactor: 5,
    description: "Direkt am ersten Abend in der Nähe der Ramstein Air Base ankommen, aber über Markgräflerland, Nordelsass und Pfälzerwald statt Autobahn.",
    focus: "Ramstein am 1. Abend, Pfälzerwald, Orte statt Autobahn",
    note: "Ramstein Air Base ist eine aktive Militärbasis. Restaurants und Einrichtungen auf der Base sind nur mit entsprechender Zugangsberechtigung nutzbar. Ohne Base-Zugang im Umfeld Landstuhl/Ramstein essen und übernachten.",
    riderNotes: ["Früh starten, damit der erste Tag trotz 300+ km entspannt bleibt.", "Navigation auf „Autobahn vermeiden“ und „kurvig“ stellen.", "Im Pfälzerwald viele Pausen einplanen, die Strecke ist kurvig und konzentriert."],
    highlights: ["Markgräflerland", "Elsass", "Deutsche Weinstraße", "Johanniskreuz", "Ramstein/Landstuhl"],
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
      "Ohne Base-Zugang: The BBQ Connection / American Food im Raum Ramstein prüfen.",
      "Mit berechtigtem Base-Zugang: Chili's auf Ramstein Air Base ist offiziell gelistet, aber Zugang ist nicht frei."
    ]
  },
  {
    day: 2,
    title: "Ramstein/Landstuhl → Reims",
    distance: "ca. 330 km",
    countries: ["Deutschland", "Frankreich"],
    curveFactor: 4,
    description: "Von der Pfalz über Saarlouis und kleine Grenzorte nach Verdun, dann durch die Argonnen nach Reims.",
    focus: "Grenzorte, Verdun, Champagne",
    riderNotes: ["Viele kleine Grenzstraßen, mit Tempolimits und Ortschaften rechnen.", "Verdun eignet sich für eine längere Pause.", "Metz wird bewusst ausgelassen, damit der Tag unter Kontrolle bleibt."],
    highlights: ["Saarlouis", "Bouzonville", "Verdun", "Sainte-Menehould", "Reims"],
    stops: [
      stop("Ramstein-Miesenbach", "Ramstein-Miesenbach", 49.4450, 7.5550),
      stop("Landstuhl", "Landstuhl", 49.4131, 7.5702),
      stop("Saarlouis", "Saarlouis, Deutschland", 49.3137, 6.7515),
      stop("Bouzonville", "Bouzonville, Frankreich", 49.2915, 6.5330),
      stop("Verdun", "Verdun, Frankreich", 49.1593, 5.3828),
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
    day: 3,
    title: "Reims → Rouen",
    distance: "ca. 300 km",
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
    day: 4,
    title: "Rouen → Caen",
    distance: "ca. 260 km",
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
    day: 5,
    title: "Caen D-Day Runde",
    distance: "ca. 160 km",
    countries: ["Frankreich"],
    curveFactor: 2,
    description: "Ruhiger Rundtag zu Pegasus Bridge, Omaha Beach, Normandy American Cemetery und Pointe du Hoc.",
    focus: "D-Day-Orte, respektvolle Pausen",
    riderNotes: ["Als älterer Fahrer bewusst kurze Etappen zwischen den Stopps fahren.", "Gedenkstätten mit Zeit und Ruhe besuchen.", "Bei Wind an der Küste defensiv bleiben."],
    highlights: ["Pegasus Bridge", "Omaha Beach", "Normandy American Cemetery", "Pointe du Hoc"],
    stops: [
      stop("Caen", "Caen", 49.1829, -0.3707),
      stop("Pegasus Bridge", "Pegasus Bridge, Bénouville", 49.2420, -0.2747),
      stop("Arromanches-les-Bains", "Arromanches-les-Bains", 49.3402, -0.6212),
      stop("Omaha Beach", "Omaha Beach", 49.3677, -0.8804),
      stop("Normandy American Cemetery", "Colleville-sur-Mer", 49.3594, -0.8552),
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
    day: 6,
    title: "Caen → Le Mans",
    distance: "ca. 270 km",
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
    day: 7,
    title: "Le Mans → Tours/Loire",
    distance: "ca. 180 km",
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
    day: 8,
    title: "Tours → Nevers",
    distance: "ca. 290 km",
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
    day: 9,
    title: "Nevers → Dijon",
    distance: "ca. 280 km",
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
    day: 10,
    title: "Dijon → Besançon",
    distance: "ca. 165 km",
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
    day: 11,
    title: "Besançon → Colmar",
    distance: "ca. 300 km",
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
    day: 12,
    title: "Colmar → Nancy",
    distance: "ca. 165 km",
    countries: ["Frankreich"],
    curveFactor: 5,
    description: "Klassische Vogesenetappe über Munster, Col de la Schlucht, Gérardmer und Épinal nach Nancy.",
    focus: "Route des Crêtes, Vogesen",
    riderNotes: ["Col de la Schlucht wetterabhängig prüfen.", "In den Vogesen mit Radfahrern, Splitt und engen Kurven rechnen.", "Der Tag ist kurvig, aber nicht zu lang."],
    highlights: ["Munster", "Col de la Schlucht", "Gérardmer", "Épinal", "Nancy"],
    stops: [
      stop("Colmar", "Colmar", 48.0794, 7.3585),
      stop("Munster", "Munster, Haut-Rhin", 48.0415, 7.1338),
      stop("Col de la Schlucht", "Col de la Schlucht", 48.0645, 7.0220),
      stop("Gérardmer", "Gérardmer", 48.0735, 6.8787),
      stop("Épinal", "Épinal", 48.1744, 6.4506),
      stop("Nancy", "Nancy, Frankreich", 48.6921, 6.1844)
    ],
    hotels: [
      hotel("Hotel des Prélats", "Zentrum Nancy", "56 Place Monseigneur Ruch, Nancy", 48.6939, 6.1850, "Innenstadtparkhaus/Hoteloption prüfen.", "Sehr nah an Place Stanislas.", "Altstadtzufahrt."),
      hotel("Best Western Plus Crystal Nancy", "Zentrum", "5 Rue Chanzy, Nancy", 48.6897, 6.1818, "Garage/Partnerparkplatz reservieren.", "Komfortabel und zentral.", "Parklösung klären."),
      hotel("Novotel Suites Nancy Centre", "Kanalnähe", "2 Allée du Chanoine Drioton, Nancy", 48.6951, 6.1990, "Parken in Umgebung prüfen.", "Einfache Anfahrt.", "Etwas außerhalb.")
    ]
  },
  {
    day: 13,
    title: "Nancy → Dijon",
    distance: "ca. 300 km",
    countries: ["Frankreich"],
    curveFactor: 3,
    description: "Südwestliche Rückrunde über Toul, Langres und kleine burgundische Straßen zurück nach Dijon.",
    focus: "Südlicher Rückbogen, keine Autobahn",
    riderNotes: ["Langres als Pause einplanen.", "Navigation genau prüfen, sonst zieht sie auf Schnellstraßen.", "Ruhiger Verbindungstag mit vielen Ortsdurchfahrten."],
    highlights: ["Toul", "Vittel", "Langres", "Dijon"],
    stops: [
      stop("Nancy", "Nancy", 48.6921, 6.1844),
      stop("Toul", "Toul", 48.6759, 5.8911),
      stop("Vittel", "Vittel", 48.2007, 5.9484),
      stop("Langres", "Langres", 47.8625, 5.3331),
      stop("Dijon", "Dijon", 47.3220, 5.0415)
    ],
    hotels: [
      hotel("Hotel des Ducs", "Dijon Zentrum", "5 Rue Lamonnoye, Dijon", 47.3228, 5.0439, "Parkmöglichkeit vorher prüfen.", "Sehr zentral und angenehm.", "Innenstadtzufahrt."),
      hotel("Oceania Le Jura Dijon", "Bahnhofsnah", "14 Avenue Foch, Dijon", 47.3236, 5.0273, "Garage/Parkplatz prüfen.", "Komfortabel.", "Städtische Lage."),
      hotel("Ibis Styles Dijon Central", "Altstadt", "3 Place Grangier, Dijon", 47.3233, 5.0378, "Parkhaus in Nähe prüfen.", "Praktisch für eine Nacht.", "Schlichte Zimmer.")
    ]
  },
  {
    day: 14,
    title: "Dijon → Basel",
    distance: "ca. 330 km",
    countries: ["Frankreich", "Schweiz"],
    curveFactor: 4,
    description: "Finaler Heimweg über Jura-Vorland, Doubs, Belfort und Sundgau zurück nach Basel.",
    focus: "Jura-Ausläufer, ruhige Rückfahrt",
    riderNotes: ["Letzter Tag nicht überziehen: früh starten.", "Bei Müdigkeit in Besançon oder Belfort kürzen.", "Schweizer Heimkehrverkehr um Basel beachten."],
    highlights: ["Dole", "Besançon", "Belfort", "Sundgau", "Basel"],
    stops: [
      stop("Dijon", "Dijon", 47.3220, 5.0415),
      stop("Dole", "Dole", 47.0920, 5.4897),
      stop("Besançon", "Besançon", 47.2378, 6.0241),
      stop("Belfort", "Belfort", 47.6397, 6.8638),
      stop("Altkirch", "Altkirch, Elsass", 47.6237, 7.2396),
      stop("Basel", "Basel, Schweiz", 47.5596, 7.5886)
    ],
    hotels: [
      hotel("Hotel Spalentor", "Basel Altstadtrand", "Schönbeinstrasse 1, Basel", 47.5588, 7.5818, "Parkgarage/Hotelplätze vorher prüfen.", "Guter Abschluss nah der Altstadt.", "Schweizer Preisniveau."),
      hotel("Motel One Basel", "Innenstadt", "Barfüssergasse 16, Basel", 47.5555, 7.5909, "Parkhaus in der Umgebung einplanen.", "Sehr zentral.", "Parkdistanz mit Gepäck prüfen."),
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
  const image = hotelImages[Math.abs(hashCode(name + area)) % hotelImages.length];
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
    image,
    imageLabel: "Hotel-Symbolbild",
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

function hashCode(value) {
  let hash = 0;
  for (let index = 0; index < value.length; index += 1) {
    hash = ((hash << 5) - hash) + value.charCodeAt(index);
    hash |= 0;
  }
  return hash;
}

function makeLinks(name, address, lat, lng) {
  const query = encodeURIComponent(`${name} ${address}`);
  return {
    google: `https://www.google.com/maps/search/?api=1&query=${query}`,
    apple: `https://maps.apple.com/?q=${query}&ll=${lat},${lng}`,
    osm: `https://www.openstreetmap.org/?mlat=${lat}&mlon=${lng}#map=14/${lat}/${lng}`
  };
}
