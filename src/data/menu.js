// Menu data — realistic Kenyan restaurant offering in KES.
// Prices reflect Nairobi mid-tier restaurant pricing as of 2026.

export const categories = [
  { id: 'mains', label: 'Mains', icon: '🍛' },
  { id: 'nyama', label: 'Nyama Choma', icon: '🔥' },
  { id: 'sides', label: 'Sides', icon: '🫓' },
  { id: 'drinks', label: 'Drinks', icon: '🥤' },
  { id: 'hot', label: 'Hot', icon: '☕' },
]

export const menu = [
  // Mains
  { id: 'm1', name: 'Ugali & Sukuma Wiki', category: 'mains', price: 250, prepMin: 10, tags: ['vegetarian'] },
  { id: 'm2', name: 'Pilau ya Nyama', category: 'mains', price: 450, prepMin: 15 },
  { id: 'm3', name: 'Mukimo na Stew', category: 'mains', price: 380, prepMin: 12 },
  { id: 'm4', name: 'Githeri Special', category: 'mains', price: 320, prepMin: 10, tags: ['vegetarian'] },
  { id: 'm5', name: 'Wali wa Nazi & Beans', category: 'mains', price: 350, prepMin: 15, tags: ['vegetarian'] },
  { id: 'm6', name: 'Samaki wa Kupaka', category: 'mains', price: 750, prepMin: 20 },

  // Nyama Choma
  { id: 'n1', name: 'Nyama Choma (½ kg)', category: 'nyama', price: 900, prepMin: 25 },
  { id: 'n2', name: 'Nyama Choma (1 kg)', category: 'nyama', price: 1700, prepMin: 30 },
  { id: 'n3', name: 'Mbuzi Choma (½ kg)', category: 'nyama', price: 1100, prepMin: 25 },
  { id: 'n4', name: 'Kuku Kienyeji (half)', category: 'nyama', price: 850, prepMin: 25 },
  { id: 'n5', name: 'Mshikaki Plate', category: 'nyama', price: 600, prepMin: 15 },

  // Sides
  { id: 's1', name: 'Chapati', category: 'sides', price: 60, prepMin: 5, tags: ['vegetarian'] },
  { id: 's2', name: 'Mandazi (3 pc)', category: 'sides', price: 90, prepMin: 5, tags: ['vegetarian'] },
  { id: 's3', name: 'Kachumbari', category: 'sides', price: 100, prepMin: 3, tags: ['vegetarian'] },
  { id: 's4', name: 'Ugali (plate)', category: 'sides', price: 80, prepMin: 5, tags: ['vegetarian'] },
  { id: 's5', name: 'Rice (plate)', category: 'sides', price: 120, prepMin: 5, tags: ['vegetarian'] },

  // Drinks
  { id: 'd1', name: 'Tusker 500ml', category: 'drinks', price: 350 },
  { id: 'd2', name: 'White Cap 500ml', category: 'drinks', price: 350 },
  { id: 'd3', name: 'Stoney Tangawizi', category: 'drinks', price: 120 },
  { id: 'd4', name: 'Coca-Cola 500ml', category: 'drinks', price: 100 },
  { id: 'd5', name: 'Fresh Mango Juice', category: 'drinks', price: 220 },
  { id: 'd6', name: 'Passion Juice', category: 'drinks', price: 200 },
  { id: 'd7', name: 'Dasani 500ml', category: 'drinks', price: 80 },

  // Hot
  { id: 'h1', name: 'Chai ya Maziwa', category: 'hot', price: 80, prepMin: 4 },
  { id: 'h2', name: 'Dawa (lemon-ginger-honey)', category: 'hot', price: 180, prepMin: 5 },
  { id: 'h3', name: 'Kahawa (Kenyan coffee)', category: 'hot', price: 150, prepMin: 5 },
  { id: 'h4', name: 'Masala Chai', category: 'hot', price: 120, prepMin: 5 },
]

export const initialTables = [
  { id: 1, label: 'T1', seats: 2, status: 'available' },
  { id: 2, label: 'T2', seats: 4, status: 'occupied', openedAt: Date.now() - 1000 * 60 * 22 },
  { id: 3, label: 'T3', seats: 4, status: 'available' },
  { id: 4, label: 'T4', seats: 6, status: 'occupied', openedAt: Date.now() - 1000 * 60 * 8 },
  { id: 5, label: 'T5', seats: 2, status: 'reserved' },
  { id: 6, label: 'T6', seats: 4, status: 'available' },
  { id: 7, label: 'T7', seats: 2, status: 'paying', openedAt: Date.now() - 1000 * 60 * 55 },
  { id: 8, label: 'T8', seats: 8, status: 'available' },
  { id: 9, label: 'B1', seats: 1, status: 'occupied', openedAt: Date.now() - 1000 * 60 * 14 },
  { id: 10, label: 'B2', seats: 1, status: 'available' },
  { id: 11, label: 'P1', seats: 4, status: 'available' },
  { id: 12, label: 'P2', seats: 4, status: 'occupied', openedAt: Date.now() - 1000 * 60 * 40 },
]
