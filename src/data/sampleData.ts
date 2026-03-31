import { Category, DeliveryPerson, Product } from '../types';

export const categories: Category[] = [
  'Fresh Vegetables',
  'Fruits',
  'Groceries & Staples',
  'Snacks & Beverages',
  'Household Essentials',
];

export const products: Product[] = [
  {
    id: 'p1',
    name: 'Farm Fresh Tomatoes - 1kg',
    category: 'Fresh Vegetables',
    price: 52,
    rating: 4.6,
    description:
      'Juicy, vine-ripened tomatoes sourced from local farmers, perfect for salads, curries, and sandwiches.',
    image: '/tomato.jpg',
  },
  {
    id: 'p2',
    name: 'Tender Cucumbers - 500g',
    category: 'Fresh Vegetables',
    price: 32,
    rating: 4.4,
    description:
      'Crisp cucumbers with a refreshing bite, great for raita, salads, and infused water.',
    image:
      '/cucum.jpg',
  },
  {
    id: 'p3',
    name: 'Organic Spinach - 250g',
    category: 'Fresh Vegetables',
    price: 45,
    rating: 4.7,
    description:
      'Clean, tender spinach leaves grown with sustainable practices. Ideal for sautés and smoothies.',
    image:
      '/spinach.webp',
  },
  {
    id: 'p4',
    name: 'Alphonso Mangoes - 1 Dozen',
    category: 'Fruits',
    price: 699,
    rating: 4.9,
    description:
      'Premium Alphonso mangoes with rich aroma and sweetness. Perfectly ripened for desserts and shakes.',
    image:
      '/mango.jpg',
  },
  {
    id: 'p5',
    name: 'Washington Apples - 1kg',
    category: 'Fruits',
    price: 210,
    rating: 4.5,
    description:
      'Crunchy, sweet Washington apples packed with fiber and antioxidants. Great for snacking.',
    image:
      'https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'p6',
    name: 'Whole Wheat Atta - 5kg',
    category: 'Groceries & Staples',
    price: 285,
    rating: 4.6,
    description:
      'Stone-ground whole wheat flour for soft, fluffy rotis. Sourced from high-quality grains.',
    image:
      '/wheat.jpg',
  },
  {
    id: 'p7',
    name: 'Basmati Rice Premium - 5kg',
    category: 'Groceries & Staples',
    price: 599,
    rating: 4.7,
    description:
      'Aged, fragrant basmati rice with long, slender grains that stay fluffy after cooking.',
    image:
      '/basmati.jpeg',
  },
  {
    id: 'p8',
    name: 'Cold Pressed Groundnut Oil - 1L',
    category: 'Groceries & Staples',
    price: 275,
    rating: 4.5,
    description:
      'Cold-pressed groundnut oil retaining natural nutrients and aroma. Ideal for deep frying and sautéing.',
    image:
      '/Groundnut-oil.jpg',
  },
  {
    id: 'p9',
    name: 'Classic Salted Potato Chips - 200g',
    category: 'Snacks & Beverages',
    price: 65,
    rating: 4.3,
    description:
      'Crispy golden potato chips with a light salted finish. Perfect movie-time companion.',
    image:
      '/potota.jpg',
  },
  {
    id: 'p10',
    name: 'Roasted Almonds - 500g',
    category: 'Snacks & Beverages',
    price: 540,
    rating: 4.8,
    description:
      'Slow-roasted almonds seasoned lightly with sea salt. Great for healthy snacking.',
    image:
      '/almond.jpg',
  },
  {
    id: 'p11',
    name: 'Liquid Detergent - 1L',
    category: 'Household Essentials',
    price: 185,
    rating: 4.4,
    description:
      'Low-foam liquid detergent safe for front-load and top-load machines with fresh fragrance.',
    image:
      '/deter.jpg',
  },
  {
    id: 'p12',
    name: 'Kitchen Paper Towels - 6 Rolls',
    category: 'Household Essentials',
    price: 210,
    rating: 4.5,
    description:
      'Ultra-absorbent 2-ply paper towels for quick kitchen cleanups and spills.',
    image:
      '/towel.jpeg',
  },
  {
    id: 'p13',
    name: 'Fresh Carrots - 1kg',
    category: 'Fresh Vegetables',
    price: 60,
    rating: 4.5,
    description: 'Crunchy carrots rich in vitamin A and good for eyesight.',
    image: '/carrot.webp',
  },
  {
    id: 'p14',
    name: 'Green Beans - 500g',
    category: 'Fresh Vegetables',
    price: 55,
    rating: 4.3,
    description: 'Tender green beans ideal for stir fry and poriyal.',
    image: '/beans.webp',
  },
  {
    id: 'p15',
    name: 'Fresh Potatoes - 1kg',
    category: 'Fresh Vegetables',
    price: 48,
    rating: 4.4,
    description: 'Farm fresh potatoes perfect for fries and curries.',
    image: '/potatos.webp',
  },
  {
    id: 'p16',
    name: 'Big Onions - 1kg',
    category: 'Fresh Vegetables',
    price: 68,
    rating: 4.6,
    description: 'Strong flavored onions for everyday cooking.',
    image: '/onion.jpeg',
  },
  {
    id: 'p17',
    name: 'Cauliflower - 1 Piece',
    category: 'Fresh Vegetables',
    price: 45,
    rating: 4.2,
    description: 'Fresh cauliflower ideal for curry and fry.',
    image: '/cauli.jpg',
  },
  {
    id: 'p18',
    name: 'Sweet Banana - 1 Dozen',
    category: 'Fruits',
    price: 72,
    rating: 4.4,
    description: 'Naturally ripened bananas rich in potassium.',
    image: '/bana.webp',
  },
  {
    id: 'p19',
    name: 'Fresh Oranges - 1kg',
    category: 'Fruits',
    price: 125,
    rating: 4.6,
    description: 'Juicy oranges packed with vitamin C.',
    image: '/orange.jpg',
  },
  {
    id: 'p20',
    name: 'Green Grapes - 500g',
    category: 'Fruits',
    price: 98,
    rating: 4.3,
    description: 'Fresh seedless green grapes.',
    image: '/grapes.jpg',
  },
  {
    id: 'p21',
    name: 'Papaya - 1 Medium',
    category: 'Fruits',
    price: 65,
    rating: 4.2,
    description: 'Fresh papaya good for digestion.',
    image: '/papa.jpg',
  },
  {
    id: 'p22',
    name: 'Pomegranate - 1kg',
    category: 'Fruits',
    price: 220,
    rating: 4.7,
    description: 'Juicy pomegranate rich in antioxidants.',
    image: '/pome.jpg',
  },{
    id: 'p23',
    name: 'Toor Dal - 1kg',
    category: 'Groceries & Staples',
    price: 165,
    rating: 4.5,
    description: 'High protein toor dal.',
    image: '/dal.webp',
  },
  {
    id: 'p24',
    name: 'Sugar - 1kg',
    category: 'Groceries & Staples',
    price: 48,
    rating: 4.3,
    description: 'Fine quality sugar.',
    image: '/su.jpg',
  },
  {
    id: 'p25',
    name: 'Classic Salted Potato Chips - 200g',
    category: 'Snacks & Beverages',
    price: 65,
    rating: 4.3,
    description: 'Crispy salted potato chips.',
    image: '/chips.jpg',
  },
  {
    id: 'p26',
    name: 'Chocolate Biscuits - 300g',
    category: 'Snacks & Beverages',
    price: 90,
    rating: 4.5,
    description: 'Crunchy chocolate biscuits.',
    image: '/bis.webp',
  },
  {
    id: 'p27',
    name: 'Salted Peanuts - 250g',
    category: 'Snacks & Beverages',
    price: 75,
    rating: 4.4,
    description: 'Roasted salted peanuts.',
    image: '/pea.webp',
  },
  {
    id: 'p28',
    name: 'Fruit Juice - 1L',
    category: 'Snacks & Beverages',
    price: 110,
    rating: 4.2,
    description: 'Refreshing mixed fruit juice.',
    image: '/a.webp',
  },
  {
    id: 'p29',
    name: 'Instant Coffee - 100g',
    category: 'Snacks & Beverages',
    price: 180,
    rating: 4.6,
    description: 'Strong and aromatic coffee.',
    image: '/coffe.webp',
  },
  {
    id: 'p30',
    name: 'Laundry Detergent - 1kg',
    category: 'Household Essentials',
    price: 185,
    rating: 4.4,
    description: 'Powerful stain removing detergent.',
    image: '/lan.png',
  },
  {
    id: 'p31',
    name: 'Dish Wash Liquid - 500ml',
    category: 'Household Essentials',
    price: 95,
    rating: 4.3,
    description: 'Effective grease removal.',
    image: '/dish.avif',
  },
  {
    id: 'p32',
    name: 'Floor Cleaner - 1L',
    category: 'Household Essentials',
    price: 135,
    rating: 4.5,
    description: 'Keeps floors clean and fresh.',
    image: '/floor.jpg',
  },
  {
    id: 'p33',
    name: 'Garbage Bags - Pack of 30',
    category: 'Household Essentials',
    price: 120,
    rating: 4.2,
    description: 'Strong and durable garbage bags.',
    image: '/gar.jpg',
  },
  {
    id: 'p34',
    name: 'Toilet Cleaner - 500ml',
    category: 'Household Essentials',
    price: 99,
    rating: 4.4,
    description: 'Kills germs and removes stains.',
    image: '/toi.webp',
  },
  
  
  
  
];

export const deliveryPersons: DeliveryPerson[] = [
  { id: 'd1', name: 'Arun Kumar', phone: '9876543210' },
  { id: 'd2', name: 'Suresh', phone: '9123456780' },
  { id: 'd3', name: 'Mani', phone: '9001234567' },
  { id: 'd4', name: 'Priya Sharma', phone: '9011122233' },
  { id: 'd5', name: 'Naveen Raj', phone: '9090887766' },
  { id: 'd6', name: 'Kavya Menon', phone: '9887766554' },
  { id: 'd7', name: 'Daniel Joseph', phone: '9822334455' },
  { id: 'd8', name: 'Farhan Ali', phone: '9344556677' },
  { id: 'd9', name: 'Meena Krishnan', phone: '9789098080' },
  { id: 'd10', name: 'Vikram Singh', phone: '9812345670' },
  { id: 'd11', name: 'Lakshmi Nair', phone: '9765432190' },
  { id: 'd12', name: 'Ajay Thomas', phone: '9898981212' },
  { id: 'd13', name: 'Shreya Das', phone: '9700700700' },
  { id: 'd14', name: 'Rohit Kulkarni', phone: '9955664433' },
  { id: 'd15', name: 'Anita George', phone: '9844552211' },
];

