interface ISupermarketSection {
  name: string
  icon: string
  subSections: string[]
}

export const supermarketSections: ISupermarketSection[] = [
  {
    name: 'Fruits et Légumes',
    icon: '🍎',
    subSections: [
      'Fruits frais',
      'Légumes frais',
      'Herbes et épices',
      'Fruits secs',
    ],
  },
  {
    name: 'Boulangerie et Pâtisserie',
    icon: '🍞',
    subSections: ['Pains', 'Viennoiseries', 'Gâteaux et tartes', 'Pâtisseries'],
  },
  {
    name: 'Viandes et Poissons',
    icon: '🥩',
    subSections: ['Boucherie', 'Volaille', 'Poissonnerie'],
  },
  {
    name: 'Produits Laitiers et Fromagerie',
    icon: '🧀',
    subSections: [
      'Lait et crème',
      'Fromages',
      'Yaourts',
      'Beurres et margarines',
    ],
  },
  {
    name: 'Épicerie Salée',
    icon: '🛒',
    subSections: [
      'Pâtes, riz et céréales',
      'Conserves et plats cuisinés',
      'Huiles, vinaigres et condiments',
      'Noix et graines',
    ],
  },
  {
    name: 'Épicerie Sucrée',
    icon: '🍬',
    subSections: [
      'Confiseries',
      'Chocolats',
      'Biscuits et gâteaux',
      'Miel et confitures',
    ],
  },
  {
    name: 'Boissons',
    icon: '🥤',
    subSections: ['Boissons non-alcoolisées', 'Boissons alcoolisées'],
  },
  {
    name: 'Produits Surgelés',
    icon: '🍦',
    subSections: [
      'Légumes surgelés',
      'Plats préparés surgelés',
      'Glaces et desserts surgelés',
      'Viandes et poissons surgelés',
    ],
  },
  {
    name: 'Produits pour Bébés',
    icon: '👶',
    subSections: [
      'Couches et lingettes',
      'Nourriture pour bébés',
      'Accessoires pour bébés',
    ],
  },
  {
    name: 'Entretien et Nettoyage',
    icon: '🧼',
    subSections: [
      'Produits de nettoyage',
      'Produits de blanchisserie',
      'Ustensiles de nettoyage',
    ],
  },
  {
    name: 'Beauté et Parapharmacie',
    icon: '💄',
    subSections: [
      'Produits de soins de la peau',
      'Produits capillaires',
      'Produits d’hygiène féminine',
      'Rasage et épilation',
      'Médicaments en vente libre',
      'Produits de premiers soins',
      'Vitamines et compléments alimentaires',
    ],
  },
  {
    name: 'Animaux de Compagnie',
    icon: '🐱',
    subSections: [
      'Nourriture pour animaux',
      'Jouets et accessoires',
      'Soins et hygiène pour animaux',
    ],
  },
  {
    name: 'Maison et Jardin',
    icon: '🏠',
    subSections: [
      'Articles ménagers',
      'Décoration',
      'Jardinage',
      'Vaisselle et ustensiles de cuisine',
    ],
  },
  {
    name: 'Articles de Fête et Cadeaux',
    icon: '🎉',
    subSections: [
      'Décorations de fête',
      'Cartes de voeux',
      'Emballages cadeaux',
    ],
  },
  {
    name: 'Textiles',
    icon: '👕',
    subSections: ['Vêtements', 'Chaussures', 'Accessoires'],
  },
  {
    name: 'Électronique et Électroménager',
    icon: '🖥️',
    subSections: [
      'Téléviseurs et accessoires',
      'Téléphones et accessoires',
      'Petit électroménager',
      'Gros électroménager',
    ],
  },
  {
    name: 'Jeux Vidéo et Consoles',
    icon: '🎮',
    subSections: ['Consoles de jeux', 'Jeux vidéo', 'Accessoires de gaming'],
  },
  {
    name: 'Bricolage',
    icon: '🔨',
    subSections: ['Outils', 'Quincaillerie', 'Peinture et fournitures'],
  },
  {
    name: 'Espace Presse',
    icon: '📰',
    subSections: ['Journaux', 'Magazines', 'Livres'],
  },
  {
    name: 'Fournitures de Bureau et Scolaires',
    icon: '📚',
    subSections: [
      'Crayons et stylos',
      'Cahiers et papiers',
      'Classeurs et dossiers',
      "Articles d'art et de dessin",
    ],
  },
]
