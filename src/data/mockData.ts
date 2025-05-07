import { Room, RoomType, Testimonial, Service, BlogPost, User, Booking, Customer, DashboardStats } from '@/types';
import { addDays, subDays } from 'date-fns';

// Room Types
export const roomTypes: Record<RoomType, string> = {
  standard: 'Standard',
  vip: 'VIP',
  suite: 'Suite',
  luxe: 'Appartement Luxe',
  duplex: 'Duplex Paysagé',
};

// Images individuelles pour chaque chambre
const roomImagesIndividual = {
  // Chambres Standard
  'chambre-alfais': [
    '/images/rooms/chambre-alfais-1.jpg',
    '/images/rooms/chambre-alfais-2.jpg',
    '/images/rooms/chambre-alfais-3.jpg',
  ],
  'chambre-richard': [
    '/images/rooms/chambre-richard-1.jpg',
    '/images/rooms/chambre-richard-2.jpg',
    '/images/rooms/chambre-richard-3.jpg',
  ],
  'chambre-anais': [
    '/images/rooms/chambre-anais-1.jpg',
    '/images/rooms/chambre-anais-2.jpg',
    '/images/rooms/chambre-anais-3.jpg',
  ],
  'chambre-yoan': [
    '/images/rooms/chambre-yoan-1.jpg',
    '/images/rooms/chambre-yoan-2.jpg',
    '/images/rooms/chambre-yoan-3.jpg',
  ],
  
  // Chambres VIP
  'chambre-kader': [
    '/src/assets/chambre/cahmbre3.jpeg',
    '/src/assets/chambre/chambre1.jpeg',
    '/src/assets/chambre/chambre-kader-3.jpeg',
  ],
  'chambre-mathis': [
    '/src/assets/chambre/chambre1.jpeg',
    '/src/assets/chambre/chambre-mathis-2.jpeg',
    '/src/assets/chambre/chambre-mathis-3.jpeg',
  ],
  'chambre-felix': [
    '/src/assets/chambre/chambre-felix-1.jpeg',
    '/src/assets/chambre/chambre-felix-2.jpeg',
    '/src/assets/chambre/chambre-felix-3.jpeg',
  ],
  'chambre-armi': [
    '/src/assets/chambre/chambre-armi-1.jpeg',
    '/src/assets/chambre/chambre-armi-2.jpeg',
    '/src/assets/chambre/chambre-armi-3.jpeg',
  ],
  'chambre-fatima': [
    '/src/assets/chambre/chambre-fatima-1.jpeg',
    '/src/assets/chambre/chambre-fatima-2.jpeg',
    '/src/assets/chambre/chambre-fatima-3.jpeg',
  ],
  'chambre-zenab': [
    '/src/assets/chambre/chambre-zenab-1.jpeg',
    '/src/assets/chambre/chambre-zenab-2.jpeg',
    '/src/assets/chambre/chambre-zenab-3.jpeg',
  ],
  'chambre-jalil': [
    '/src/assets/chambre/chambre-jalil-1.jpeg',
    '/src/assets/chambre/chambre-jalil-2.jpeg',
    '/src/assets/chambre/chambre-jalil-3.jpeg',
  ],
  'chambre-karim': [
    '/src/assets/chambre/chambre1.jpeg',
    '/src/assets/chambre/chambre-karim-2.jpeg',
    '/src/assets/chambre/chambre-karim-3.jpeg',
  ],
  
  // Suites
  'chambre-zeco': [
    '/src/assets/chambre/chambre4.jpeg',
    '/images/rooms/chambre-zeco-2.jpg',
    '/images/rooms/chambre-zeco-3.jpg',
  ],
  'chambre-viviane': [
    '/images/rooms/chambre-viviane-1.jpg',
    '/images/rooms/chambre-viviane-2.jpg',
    '/images/rooms/chambre-viviane-3.jpg',
  ],
  
  // Studios
  'studio-florence': [
    '/src/assets/chambre/chambre2.jpeg',
    '/images/rooms/studio-florence-2.jpg',
    '/images/rooms/studio-florence-3.jpg',
  ],
  'studio-yasmine': [
    '/images/rooms/studio-yasmine-1.jpg',
    '/images/rooms/studio-yasmine-2.jpg',
    '/images/rooms/studio-yasmine-3.jpg',
  ],
  'studio-elodie': [
    '/images/rooms/studio-elodie-1.jpg',
    '/images/rooms/studio-elodie-2.jpg',
    '/images/rooms/studio-elodie-3.jpg',
  ],
  
  // Appartements
  'appartement-lydia': [
    '/src/assets/chambre/chambre1.jpeg',
    '/images/rooms/appartement-lydia-2.jpg',
    '/images/rooms/appartement-lydia-3.jpg',
  ],
  'appartement-alima': [
    '/images/rooms/appartement-alima-1.jpg',
    '/images/rooms/appartement-alima-2.jpg',
    '/images/rooms/appartement-alima-3.jpg',
  ],
  
  // Restaurant
  'restaurant-monique': [
    '/images/rooms/restaurant-monique-1.jpg',
    '/images/rooms/restaurant-monique-2.jpg',
    '/images/rooms/restaurant-monique-3.jpg',
  ],
};

// Sample Amenities
const standardAmenities = [
  'Wi-Fi',
  'Climatisation',
  'TV',
  'Salle de bain privée',
  'Vue sur la ville',
];

const vipAmenities = [
  ...standardAmenities,
  'Balcon privé',
  'Mini-bar',
  'Service en chambre',
];

const suiteAmenities = [
  ...vipAmenities,
  'Salon séparé',
  'Baignoire à remous',
  'Machine à café',
];

const luxeAmenities = [
  ...suiteAmenities,
  'Cuisine équipée',
  'Salle à manger',
  'Home cinéma',
  'Vue sur l\'océan',
];

const duplexAmenities = [
  ...luxeAmenities,
  'Terrasse privée',
  'Jacuzzi extérieur',
  'Jardins paysagés',
  'Service de majordome',
  'Deux chambres',
];

// Rooms Data
export const roomsData: Room[] = [
  // Standard Rooms (4)
  {
    id: 'chambre-alfais',
    name: 'Chambre Alfaïs',
    description: 'Une chambre confortable avec vue sur la ville, parfaite pour les voyageurs d\'affaires ou couples.',
    price: 25000,
    capacity: 2,
    type: 'standard',
    images: roomImagesIndividual['chambre-alfais'],
    amenities: standardAmenities,
    available: true,
  },
  {
    id: 'chambre-richard',
    name: 'Chambre Richard',
    description: 'Chambre standard élégante avec lit double et vue partielle sur l\'océan.',
    price: 25000,
    capacity: 2,
    type: 'standard',
    images: roomImagesIndividual['chambre-richard'],
    amenities: standardAmenities,
    available: true,
  },
  {
    id: 'chambre-anais',
    name: 'Chambre Anaïs',
    description: 'Chambre standard avec deux lits simples, idéale pour amis ou collègues.',
    price: 25000,
    capacity: 2,
    type: 'standard',
    images: roomImagesIndividual['chambre-anais'],
    amenities: standardAmenities,
    available: true,
  },
  {
    id: 'chambre-yoan',
    name: 'Chambre Yoan',
    description: 'Chambre standard spacieuse avec bureau et coin lecture.',
    price: 25000,
    capacity: 2,
    type: 'standard',
    images: roomImagesIndividual['chambre-yoan'],
    amenities: standardAmenities,
    available: true,
  },
  
  // VIP Rooms (8)
  {
    id: 'chambre-kader',
    name: 'Chambre Kader',
    description: 'Chambre VIP élégante avec vue panoramique sur l\'océan et service personnalisé.',
    price: 30000,
    capacity: 2,
    type: 'vip',
    images: roomImagesIndividual['chambre-kader'],
    amenities: vipAmenities,
    available: true,
    featured: true,
  },
  {
    id: 'chambre-mathis',
    name: 'Chambre Mathis',
    description: 'Chambre VIP spacieuse avec lit king-size et balcon privé.',
    price: 30000,
    capacity: 2,
    type: 'vip',
    images: roomImagesIndividual['chambre-mathis'],
    amenities: vipAmenities,
    available: true,
  },
  {
    id: 'chambre-felix',
    name: 'Chambre Felix',
    description: 'Chambre VIP moderne avec coin salon et vue sur le jardin tropical.',
    price: 30000,
    capacity: 2,
    type: 'vip',
    images: roomImagesIndividual['chambre-felix'],
    amenities: vipAmenities,
    available: true,
  },
  {
    id: 'chambre-armi',
    name: 'Chambre Armi',
    description: 'Chambre VIP de style contemporain avec accès direct à la piscine.',
    price: 30000,
    capacity: 2,
    type: 'vip',
    images: roomImagesIndividual['chambre-armi'],
    amenities: vipAmenities,
    available: true,
  },
  {
    id: 'chambre-fatima',
    name: 'Chambre Fatima',
    description: 'Chambre VIP luxueuse avec dressing et salle de bain en marbre.',
    price: 30000,
    capacity: 2,
    type: 'vip',
    images: roomImagesIndividual['chambre-fatima'],
    amenities: vipAmenities,
    available: true,
  },
  {
    id: 'chambre-zenab',
    name: 'Chambre Zénab',
    description: 'Chambre VIP avec terrasse privée et mobilier haut de gamme.',
    price: 30000,
    capacity: 2,
    type: 'vip',
    images: roomImagesIndividual['chambre-zenab'],
    amenities: vipAmenities,
    available: true,
  },
  {
    id: 'chambre-jalil',
    name: 'Chambre Jalil',
    description: 'Chambre VIP avec décoration africaine authentique et vue sur l\'océan.',
    price: 30000,
    capacity: 2,
    type: 'vip',
    images: roomImagesIndividual['chambre-jalil'],
    amenities: vipAmenities,
    available: true,
  },
  {
    id: 'chambre-karim',
    name: 'Chambre Karim',
    description: 'Notre plus belle chambre VIP avec coin bureau et lit king-size premium.',
    price: 30000,
    capacity: 2,
    type: 'vip',
    images: roomImagesIndividual['chambre-karim'],
    amenities: vipAmenities,
    available: true,
    featured: true,
  },
  
  // Suites (2)
  {
    id: 'chambre-zeco',
    name: 'Chambre Zéco',
    description: 'Suite spacieuse avec salon séparé, chambre luxueuse et vue imprenable sur l\'océan.',
    price: 40000,
    capacity: 3,
    type: 'suite',
    images: roomImagesIndividual['chambre-zeco'],
    amenities: suiteAmenities,
    available: true,
    featured: true,
  },
  {
    id: 'chambre-viviane',
    name: 'Chambre Viviane',
    description: 'Suite élégante avec décoration marine, grand salon et terrasse avec vue panoramique.',
    price: 40000,
    capacity: 3,
    type: 'suite',
    images: roomImagesIndividual['chambre-viviane'],
    amenities: suiteAmenities,
    available: true,
  },
  
  // Studios (3)
  {
    id: 'studio-florence',
    name: 'Studio Florence',
    description: 'Studio spacieux avec coin cuisine, espace de travail et vue sur la ville.',
    price: 50000,
    capacity: 2,
    type: 'luxe',
    images: roomImagesIndividual['studio-florence'],
    amenities: luxeAmenities,
    available: true,
    featured: true,
  },
  {
    id: 'studio-yasmine',
    name: 'Studio Yasmine',
    description: 'Studio élégant avec décoration contemporaine et balcon privé.',
    price: 50000,
    capacity: 2,
    type: 'luxe',
    images: roomImagesIndividual['studio-yasmine'],
    amenities: luxeAmenities,
    available: true,
  },
  {
    id: 'studio-elodie',
    name: 'Studio Elodie',
    description: 'Studio confortable avec coin salon et cuisine équipée.',
    price: 50000,
    capacity: 2,
    type: 'luxe',
    images: roomImagesIndividual['studio-elodie'],
    amenities: luxeAmenities,
    available: true,
  },
  
  // Appartements (2)
  {
    id: 'appartement-lydia',
    name: 'Appartement Lydia',
    description: 'Appartement de luxe avec deux chambres, salon spacieux, cuisine équipée et vue sur l\'océan.',
    price: 80000,
    capacity: 4,
    type: 'luxe',
    images: roomImagesIndividual['appartement-lydia'],
    amenities: luxeAmenities,
    available: true,
    featured: true,
  },
  {
    id: 'appartement-alima',
    name: 'Appartement Alima',
    description: 'Appartement de luxe avec décoration tropicale, deux chambres et grand balcon avec vue sur les jardins.',
    price: 80000,
    capacity: 4,
    type: 'luxe',
    images: roomImagesIndividual['appartement-alima'],
    amenities: luxeAmenities,
    available: true,
  },
  
  // Restaurant
  {
    id: 'restaurant-monique',
    name: 'Restaurant Monique',
    description: 'Espace de restauration élégant avec cuisine locale et internationale.',
    price: 60000,
    capacity: 20,
    type: 'luxe',
    images: roomImagesIndividual['restaurant-monique'],
    amenities: [...luxeAmenities, 'Service de restauration', 'Bar'],
    available: true,
  },
  
  // Duplex
  {
    id: 'duplex-yasmina',
    name: 'Duplex Yasmina',
    description: 'Notre hébergement le plus exclusif. Duplex sur deux étages avec jardin privé, terrasse, jacuzzi extérieur et service de majordome.',
    price: 150000,
    capacity: 6,
    type: 'duplex',
    images: roomImagesIndividual['appartement-lydia'], // Réutilisation temporaire des images
    amenities: duplexAmenities,
    available: true,
    featured: true,
  },
];

// Testimonials Data
export const testimonialsData: Testimonial[] = [
  {
    id: 't1',
    author: 'Marie Ngono',
    rating: 5,
    content: 'Un séjour inoubliable à la Résidence Madison. Les chambres sont magnifiques et le personnel très attentionné. La vue sur l\'océan depuis notre suite était à couper le souffle!',
    date: new Date('2023-09-15'),
    approved: true,
  },
  {
    id: 't2',
    author: 'Jean-Paul Mbarga',
    rating: 4,
    content: 'Excellent rapport qualité-prix. La chambre VIP était très confortable et le petit-déjeuner délicieux. Je reviendrai certainement.',
    date: new Date('2023-10-22'),
    approved: true,
  },
  {
    id: 't3',
    author: 'Sophie Etonde',
    rating: 5,
    content: 'Nous avons séjourné dans l\'appartement de luxe avec notre famille. Tout était parfait, de l\'espace aux équipements. Les enfants ont adoré la proximité avec la plage.',
    date: new Date('2023-08-03'),
    approved: true,
  },
  {
    id: 't4',
    author: 'Robert Atangana',
    rating: 4,
    content: 'Voyage d\'affaires agréable grâce au confort de la chambre standard et au WiFi performant. L\'emplacement est idéal pour se déplacer facilement dans Kribi.',
    date: new Date('2023-11-07'),
    approved: true,
  },
  {
    id: 't5',
    author: 'Carine Biya',
    rating: 5,
    content: 'Le duplex paysagé est tout simplement fabuleux! Un vrai coin de paradis avec son jardin privé et son jacuzzi. Le service de majordome était impeccable.',
    date: new Date('2023-12-18'),
    approved: true,
  }
];

// Services Data
export const servicesData: Service[] = [
  {
    id: 's1',
    name: 'Hébergement de Qualité',
    description: 'Des chambres et suites confortables, climatisées et entièrement équipées pour un séjour parfait.',
    icon: 'bed',
    featured: true,
  },
  {
    id: 's2',
    name: 'Restaurant & Bar',
    description: 'Savourez notre cuisine locale et internationale, avec petit-déjeuner offert pour tous les séjours.',
    icon: 'utensils',
    featured: true,
  },
  {
    id: 's3',
    name: 'Excursions Guidées',
    description: 'Découvrez les merveilles de Kribi avec nos excursions organisées aux chutes de la Lobé, au port de pêche et plus encore.',
    icon: 'map',
    featured: true,
  },
  {
    id: 's4',
    name: 'Navette Aéroport',
    description: 'Service de navette disponible entre l\'aéroport de Douala et notre résidence sur demande.',
    icon: 'car',
  },
  {
    id: 's5',
    name: 'WiFi Gratuit',
    description: 'Connexion WiFi haut débit gratuite dans toutes les chambres et espaces communs.',
    icon: 'wifi',
    featured: true,
  },
  {
    id: 's6',
    name: 'Parking Sécurisé',
    description: 'Parking privé sécurisé pour tous nos clients pendant leur séjour.',
    icon: 'parking',
  },
  {
    id: 's7',
    name: 'Réception 24/7',
    description: 'Notre équipe est à votre service 24h/24 et 7j/7 pour répondre à tous vos besoins.',
    icon: 'bell',
  }
];

// Blog Posts
export const blogPostsData: BlogPost[] = [
  {
    id: 'blog1',
    title: 'Les 5 plages incontournables de Kribi',
    content: 'Kribi est connue pour ses magnifiques plages de sable doré baignées par les eaux chaudes de l\'océan Atlantique. Voici notre sélection des 5 plages à ne pas manquer lors de votre séjour...',
    excerpt: 'Découvrez les plus belles plages de Kribi pour votre prochain séjour.',
    author: 'Jeanne Ndam',
    date: new Date('2023-08-15'),
    image: '/images/blog/plages-kribi.jpg',
    tags: ['plages', 'tourisme', 'kribi', 'loisirs'],
    published: true,
  },
  {
    id: 'blog2',
    title: 'Gastronomie locale : les saveurs de Kribi',
    content: 'La cuisine de Kribi est réputée pour ses fruits de mer frais et ses plats traditionnels camerounais. Dans cet article, nous vous présentons les spécialités locales à découvrir absolument...',
    excerpt: 'Plongez dans les saveurs authentiques de la cuisine de Kribi.',
    author: 'Jeanne Ndam',
    date: new Date('2023-09-20'),
    image: '/images/blog/gastronomie.jpg',
    tags: ['gastronomie', 'cuisine', 'fruits de mer', 'tradition'],
    published: true,
  },
  {
    id: 'blog3',
    title: 'Les Chutes de la Lobé : merveille naturelle du Cameroun',
    content: 'Situées à quelques kilomètres de Kribi, les Chutes de la Lobé offrent un spectacle unique au monde : c\'est l\'un des rares endroits où une rivière se jette directement dans l\'océan...',
    excerpt: 'Tout ce que vous devez savoir pour visiter cette merveille naturelle près de Kribi.',
    author: 'Jeanne Ndam',
    date: new Date('2023-10-12'),
    image: '/images/blog/chutes-lobe.jpg',
    tags: ['nature', 'excursion', 'chutes', 'attractions'],
    published: true,
  },
  {
    id: 'blog4',
    title: 'Guide pratique pour un séjour à Kribi',
    content: 'Préparez votre voyage à Kribi avec nos conseils pratiques : meilleure période pour visiter, transports locaux, activités recommandées et bien plus encore...',
    excerpt: 'Tout ce qu\'il faut savoir pour préparer votre séjour à Kribi.',
    author: 'Jeanne Ndam',
    date: new Date('2023-11-05'),
    image: '/images/blog/guide-kribi.jpg',
    tags: ['guide', 'conseils', 'voyage', 'planification'],
    published: true,
  },
];

// Users (Admin)
export const usersData: User[] = [
  {
    id: 'admin1',
    email: 'admin@residencemadison.com',
    name: 'Admin Principal',
    role: 'admin',
  },
  {
    id: 'manager1',
    email: 'manager@residencemadison.com',
    name: 'Gestionnaire Hôtel',
    role: 'manager',
  },
  {
    id: 'reception1',
    email: 'reception@residencemadison.com',
    name: 'Réceptionniste',
    role: 'receptionist',
  }
];

// Sample Bookings
const today = new Date();
export const bookingsData: Booking[] = [
  {
    id: 'booking-1',
    roomId: 'chambre-kader',
    customerName: 'Michel Fotso',
    customerEmail: 'michel.fotso@example.com',
    customerPhone: '+237 655123456',
    checkIn: addDays(today, 5),
    checkOut: addDays(today, 8),
    status: 'confirmed',
    totalPrice: 90000,
    paymentMethod: 'orange_money',
    paymentStatus: 'completed',
    createdAt: subDays(today, 10),
    guests: 2,
  },
  {
    id: 'booking-2',
    roomId: 'appartement-lydia',
    customerName: 'Claire Moussavou',
    customerEmail: 'claire.m@example.com',
    customerPhone: '+237 677889900',
    checkIn: addDays(today, 2),
    checkOut: addDays(today, 7),
    status: 'confirmed',
    totalPrice: 400000,
    paymentMethod: 'paypal',
    paymentStatus: 'partial',
    createdAt: subDays(today, 15),
    guests: 3,
  },
  {
    id: 'booking-3',
    roomId: 'chambre-richard',
    customerName: 'Thomas Essono',
    customerEmail: 't.essono@example.com',
    customerPhone: '+237 699112233',
    checkIn: subDays(today, 3),
    checkOut: addDays(today, 1),
    status: 'completed',
    totalPrice: 100000,
    paymentMethod: 'mobile_money',
    paymentStatus: 'completed',
    createdAt: subDays(today, 20),
    guests: 1,
  },
  {
    id: 'booking-4',
    roomId: 'chambre-zeco',
    customerName: 'Patricia Ngo',
    customerEmail: 'patricia.ngo@example.com',
    customerPhone: '+237 677445566',
    checkIn: addDays(today, 15),
    checkOut: addDays(today, 20),
    status: 'pending',
    totalPrice: 200000,
    paymentStatus: 'pending',
    createdAt: subDays(today, 2),
    guests: 2,
  },
  {
    id: 'booking-5',
    roomId: 'duplex-yasmina',
    customerName: 'François Kamga',
    customerEmail: 'f.kamga@example.com',
    customerPhone: '+237 699778899',
    checkIn: addDays(today, 25),
    checkOut: addDays(today, 32),
    status: 'confirmed',
    totalPrice: 1050000,
    paymentMethod: 'paypal',
    paymentStatus: 'partial',
    createdAt: subDays(today, 5),
    guests: 4,
  }
];

// Sample Customers
export const customersData: Customer[] = [
  {
    id: 'cust-1',
    name: 'Michel Fotso',
    email: 'michel.fotso@example.com',
    phone: '+237 655123456',
    address: 'Douala, Cameroun',
    nationality: 'Camerounaise',
    bookings: ['booking-1'],
    createdAt: subDays(today, 30),
  },
  {
    id: 'cust-2',
    name: 'Claire Moussavou',
    email: 'claire.m@example.com',
    phone: '+237 677889900',
    address: 'Yaoundé, Cameroun',
    nationality: 'Camerounaise',
    bookings: ['booking-2'],
    createdAt: subDays(today, 45),
  },
  {
    id: 'cust-3',
    name: 'Thomas Essono',
    email: 't.essono@example.com',
    phone: '+237 699112233',
    address: 'Libreville, Gabon',
    nationality: 'Gabonaise',
    bookings: ['booking-3'],
    createdAt: subDays(today, 60),
  },
  {
    id: 'cust-4',
    name: 'Patricia Ngo',
    email: 'patricia.ngo@example.com',
    phone: '+237 677445566',
    address: 'Abidjan, Côte d\'Ivoire',
    nationality: 'Ivoirienne',
    bookings: ['booking-4'],
    createdAt: subDays(today, 15),
  },
  {
    id: 'cust-5',
    name: 'François Kamga',
    email: 'f.kamga@example.com',
    phone: '+237 699778899',
    address: 'Paris, France',
    nationality: 'Française',
    bookings: ['booking-5'],
    createdAt: subDays(today, 20),
  }
];

// Dashboard Stats
export const dashboardStats: DashboardStats = {
  totalBookings: 23,
  upcomingBookings: 14,
  revenue: {
    today: 130000,
    thisWeek: 875000,
    thisMonth: 3200000,
    thisYear: 28500000,
  },
  occupancyRate: 72.4,
  totalCustomers: 18,
  popularRooms: [
    { roomId: 'chambre-kader', bookingCount: 8, roomName: 'Chambre Kader' },
    { roomId: 'chambre-kader', bookingCount: 8, roomName: 'Chambre Kader' },
    { roomId: 'appartement-lydia', bookingCount: 5, roomName: 'Appartement Lydia' },
    { roomId: 'chambre-alfais', bookingCount: 4, roomName: 'Chambre Alfaïs' },
  ]
};

// Mock Auth Functions
export const mockAuthData = {
  currentUser: null as User | null,
  isAuthenticated: false,
  
  login(email: string, password: string): Promise<User | null> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email === 'admin@residencemadison.com' && password === 'admin123') {
          const user = usersData.find(u => u.email === email) || null;
          this.currentUser = user;
          this.isAuthenticated = true;
          resolve(user);
        } else {
          reject(new Error('Email ou mot de passe incorrect'));
        }
      }, 500);
    });
  },
  
  logout(): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        this.currentUser = null;
        this.isAuthenticated = false;
        resolve();
      }, 300);
    });
  },
  
  checkAuth(): Promise<User | null> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.currentUser);
      }, 300);
    });
  }
};


