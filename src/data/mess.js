// Simple Mess data similar in spirit to rooms
// A "mess" is a communal dining option for students/tenants

export const sampleMess = [
  {
    id: 1,
    title: 'Morya Mess - Veg/Non-Veg',
    location: 'Near College Main Gate',
    contact: '+91 7385553529',
    mapLink: 'https://maps.google.com',
    pricePerMonth: 3000,
    pricePerMeal: 80,
    mealTypes: ['Breakfast', 'Lunch', 'Dinner'],
    cuisine: ['Veg', 'Non-Veg'],
    timings: '7:00 AM - 10:00 PM',
    images: [
      '/Morya Mess/morya 0_converted.avif',
      '/Morya Mess/morya 1_converted.avif',
      '/Morya Mess/morya 2_converted.avif'
    ],
    features: ['Hygienic kitchen', 'RO water', 'Seating available']
  },
  {
    id: 2,
    title: 'Trimurti Mess - Home Style',
    location: 'Behind College Library',
    contact: '+91 9000000000',
    mapLink: 'https://maps.google.com',
    pricePerMonth: 2700,
    pricePerMeal: 70,
    mealTypes: ['Lunch', 'Dinner'],
    cuisine: ['Veg'],
    timings: '11:00 AM - 9:30 PM',
    images: [
      '/Trimurti House/house 0_converted.avif',
      '/Trimurti House/house 1_converted.avif'
    ],
    features: ['Tiffin available', 'Monthly subscription']
  }
];

export const getMess = () => sampleMess;




