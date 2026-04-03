require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');
const connectDB = require('./config/db');

const products = [
  // Electronics
  {
    title: "Sony WH-1000XM5 Wireless Noise Cancelling Headphones",
    description: "Industry-leading noise cancellation, 30-hour battery life, crystal clear hands-free calling",
    price: 24990,
    originalPrice: 34990,
    discount: 29,
    rating: 4.5,
    reviewCount: 12456,
    image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=400&h=400&fit=crop",
    category: "Electronics",
    isPrime: true,
    inStock: true
  },
  {
    title: "boAt Rockerz 450 Bluetooth On Ear Headphones",
    description: "40mm audio drivers, 15 hours playback, padded ear cushions, integrated controls",
    price: 999,
    originalPrice: 2990,
    discount: 67,
    rating: 4.1,
    reviewCount: 89234,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
    category: "Electronics",
    isPrime: true,
    inStock: true
  },
  {
    title: "JBL Charge 5 Portable Bluetooth Speaker",
    description: "IP67 waterproof, 20 hours playtime, built-in powerbank, PartyBoost",
    price: 13999,
    originalPrice: 18999,
    discount: 26,
    rating: 4.6,
    reviewCount: 5678,
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop",
    category: "Electronics",
    isPrime: true,
    inStock: true
  },
  {
    title: "Samsung 980 PRO 1TB NVMe M.2 Internal SSD",
    description: "PCIe 4.0, up to 7000MB/s read speed, Samsung V-NAND technology",
    price: 7999,
    originalPrice: 13999,
    discount: 43,
    rating: 4.7,
    reviewCount: 3421,
    image: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=400&h=400&fit=crop",
    category: "Electronics",
    isPrime: true,
    inStock: true
  },
  {
    title: "Logitech MX Master 3S Wireless Mouse",
    description: "8K DPI, quiet clicks, USB-C fast charging, works on any surface",
    price: 8995,
    originalPrice: 10995,
    discount: 18,
    rating: 4.5,
    reviewCount: 7890,
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=400&fit=crop",
    category: "Electronics",
    isPrime: true,
    inStock: true
  },
  // Mobile Phones
  {
    title: "Samsung Galaxy S24 Ultra 5G (Titanium Gray, 12GB, 256GB)",
    description: "200MP Camera, Snapdragon 8 Gen 3, 6.8\" QHD+ Display, S Pen, 5000mAh",
    price: 129999,
    originalPrice: 134999,
    discount: 4,
    rating: 4.4,
    reviewCount: 15678,
    image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400&h=400&fit=crop",
    category: "Mobile Phones",
    isPrime: true,
    inStock: true
  },
  {
    title: "iPhone 15 Pro Max (Natural Titanium, 256 GB)",
    description: "A17 Pro chip, 48MP camera system, titanium design, Action button, USB-C",
    price: 156900,
    originalPrice: 159900,
    discount: 2,
    rating: 4.6,
    reviewCount: 23456,
    image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop",
    category: "Mobile Phones",
    isPrime: true,
    inStock: true
  },
  {
    title: "OnePlus 12 5G (Flowy Emerald, 12GB RAM, 256GB)",
    description: "Snapdragon 8 Gen 3, 50MP Hasselblad camera, 100W SUPERVOOC, 5400mAh",
    price: 64999,
    originalPrice: 69999,
    discount: 7,
    rating: 4.3,
    reviewCount: 8765,
    image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=400&h=400&fit=crop",
    category: "Mobile Phones",
    isPrime: true,
    inStock: true
  },
  {
    title: "Redmi Note 13 Pro+ 5G (Fusion Purple, 8GB RAM, 256GB)",
    description: "200MP camera, 120W HyperCharge, 120Hz AMOLED, MediaTek Dimensity 7200",
    price: 28999,
    originalPrice: 32999,
    discount: 12,
    rating: 4.2,
    reviewCount: 34567,
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop",
    category: "Mobile Phones",
    isPrime: true,
    inStock: true
  },
  {
    title: "realme narzo 70x 5G (Ice Blue, 6GB RAM, 128GB)",
    description: "Dimensity 6100+, 50MP AI camera, 5000mAh battery, 120Hz display",
    price: 11999,
    originalPrice: 14999,
    discount: 20,
    rating: 4.0,
    reviewCount: 12345,
    image: "https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=400&h=400&fit=crop",
    category: "Mobile Phones",
    isPrime: false,
    inStock: true
  },
  // Fashion
  {
    title: "Levi's Men's 511 Slim Fit Jeans",
    description: "Classic slim fit, stretch denim, sits below waist, slim through hip and thigh",
    price: 1799,
    originalPrice: 3999,
    discount: 55,
    rating: 4.2,
    reviewCount: 45678,
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=400&fit=crop",
    category: "Fashion",
    isPrime: true,
    inStock: true
  },
  {
    title: "Allen Solly Men's Regular Fit Polo T-Shirt",
    description: "100% Cotton, classic collar, short sleeves, regular fit, solid pattern",
    price: 699,
    originalPrice: 1499,
    discount: 53,
    rating: 4.1,
    reviewCount: 23456,
    image: "https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?w=400&h=400&fit=crop",
    category: "Fashion",
    isPrime: true,
    inStock: true
  },
  {
    title: "Nike Men's Revolution 6 Running Shoes",
    description: "Lightweight, cushioned, breathable mesh upper, rubber outsole",
    price: 2995,
    originalPrice: 3995,
    discount: 25,
    rating: 4.3,
    reviewCount: 56789,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop",
    category: "Fashion",
    isPrime: true,
    inStock: true
  },
  {
    title: "Fossil Men's Grant Chronograph Watch",
    description: "Stainless steel case, genuine leather strap, 44mm dial, water resistant",
    price: 8495,
    originalPrice: 12995,
    discount: 35,
    rating: 4.4,
    reviewCount: 12345,
    image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400&h=400&fit=crop",
    category: "Fashion",
    isPrime: true,
    inStock: true
  },
  {
    title: "Ray-Ban Aviator Classic Sunglasses",
    description: "Gold frame, green classic G-15 lenses, 100% UV protection, iconic style",
    price: 7490,
    originalPrice: 9890,
    discount: 24,
    rating: 4.5,
    reviewCount: 8901,
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop",
    category: "Fashion",
    isPrime: true,
    inStock: true
  },
  // Home & Kitchen
  {
    title: "Prestige Iris 750 Watt Mixer Grinder",
    description: "3 stainless steel jars, powerful motor, 3-speed control with pulse function",
    price: 2499,
    originalPrice: 4195,
    discount: 40,
    rating: 4.1,
    reviewCount: 34567,
    image: "https://images.unsplash.com/photo-1585515320310-259814833e62?w=400&h=400&fit=crop",
    category: "Home & Kitchen",
    isPrime: true,
    inStock: true
  },
  {
    title: "Amazon Basics Stainless Steel Dinner Set, 28 Pieces",
    description: "Food-grade stainless steel, mirror finish, includes plates, bowls, glasses, spoons",
    price: 1399,
    originalPrice: 2499,
    discount: 44,
    rating: 4.0,
    reviewCount: 23456,
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop",
    category: "Home & Kitchen",
    isPrime: true,
    inStock: true
  },
  {
    title: "Pigeon by Stovekraft Favourite 3 Burner Gas Stove",
    description: "High efficiency brass burners, powder coated body, ISI certified, spill tray",
    price: 2199,
    originalPrice: 3795,
    discount: 42,
    rating: 4.0,
    reviewCount: 45678,
    image: "https://images.unsplash.com/photo-1585664811087-47f65abbad64?w=400&h=400&fit=crop",
    category: "Home & Kitchen",
    isPrime: true,
    inStock: true
  },
  {
    title: "Wipro 10W LED Bulb Pack of 6 (Cool Day Light)",
    description: "Energy saving, 10W = 90W equivalent, 15000 hours life, B22 base",
    price: 399,
    originalPrice: 720,
    discount: 45,
    rating: 4.2,
    reviewCount: 67890,
    image: "https://images.unsplash.com/photo-1565814329452-e1432bc13201?w=400&h=400&fit=crop",
    category: "Home & Kitchen",
    isPrime: false,
    inStock: true
  },
  {
    title: "Solimo Room Darkening Blackout Curtains - Pack of 2",
    description: "100% polyester, thermal insulating, noise reducing, 7 feet length",
    price: 599,
    originalPrice: 1299,
    discount: 54,
    rating: 3.9,
    reviewCount: 12345,
    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=400&h=400&fit=crop",
    category: "Home & Kitchen",
    isPrime: true,
    inStock: true
  },
  // Books
  {
    title: "Atomic Habits by James Clear",
    description: "An Easy & Proven Way to Build Good Habits & Break Bad Ones - Paperback",
    price: 379,
    originalPrice: 799,
    discount: 53,
    rating: 4.7,
    reviewCount: 123456,
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=400&fit=crop",
    category: "Books",
    isPrime: true,
    inStock: true
  },
  {
    title: "The Psychology of Money by Morgan Housel",
    description: "Timeless lessons on wealth, greed, and happiness - Paperback",
    price: 299,
    originalPrice: 399,
    discount: 25,
    rating: 4.6,
    reviewCount: 89012,
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=400&fit=crop",
    category: "Books",
    isPrime: true,
    inStock: true
  },
  {
    title: "Rich Dad Poor Dad by Robert T. Kiyosaki",
    description: "What the Rich Teach Their Kids About Money That the Poor and Middle Class Do Not!",
    price: 279,
    originalPrice: 499,
    discount: 44,
    rating: 4.5,
    reviewCount: 156789,
    image: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=400&h=400&fit=crop",
    category: "Books",
    isPrime: true,
    inStock: true
  },
  {
    title: "Ikigai: The Japanese Secret to a Long and Happy Life",
    description: "A refreshing, simple guide to finding your purpose in life",
    price: 249,
    originalPrice: 599,
    discount: 58,
    rating: 4.4,
    reviewCount: 67890,
    image: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&h=400&fit=crop",
    category: "Books",
    isPrime: false,
    inStock: true
  },
  {
    title: "Think and Grow Rich by Napoleon Hill",
    description: "The classic personal development and self-improvement book - Paperback",
    price: 149,
    originalPrice: 299,
    discount: 50,
    rating: 4.5,
    reviewCount: 45678,
    image: "https://images.unsplash.com/photo-1524578271613-d550eacf6090?w=400&h=400&fit=crop",
    category: "Books",
    isPrime: true,
    inStock: true
  },
  // Appliances
  {
    title: "Samsung 253L Frost Free Double Door Refrigerator",
    description: "Digital Inverter Technology, All-Around Cooling, Convertible 5-in-1",
    price: 24990,
    originalPrice: 31990,
    discount: 22,
    rating: 4.3,
    reviewCount: 23456,
    image: "https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=400&h=400&fit=crop",
    category: "Appliances",
    isPrime: true,
    inStock: true
  },
  {
    title: "LG 7 Kg Fully Automatic Front Load Washing Machine",
    description: "6 Motion Direct Drive, Steam Wash, Touch Panel, Inverter Motor",
    price: 29990,
    originalPrice: 38990,
    discount: 23,
    rating: 4.4,
    reviewCount: 12345,
    image: "https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?w=400&h=400&fit=crop",
    category: "Appliances",
    isPrime: true,
    inStock: true
  },
  {
    title: "Havells Instanio Prime 3L Instant Water Heater",
    description: "3000W heating element, heavy duty anode rod, ISI marked, whirl flow technology",
    price: 3299,
    originalPrice: 5400,
    discount: 39,
    rating: 4.1,
    reviewCount: 8901,
    image: "https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=400&h=400&fit=crop",
    category: "Appliances",
    isPrime: true,
    inStock: true
  },
  {
    title: "Bajaj Majesty 1200W Dry Iron",
    description: "Non-stick coating, adjustable temperature control, lightweight design",
    price: 599,
    originalPrice: 995,
    discount: 40,
    rating: 4.0,
    reviewCount: 34567,
    image: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=400&h=400&fit=crop",
    category: "Appliances",
    isPrime: false,
    inStock: true
  },
  {
    title: "Philips Air Fryer HD9200/90 - 4.1L",
    description: "Rapid Air Technology, 1400W, touch screen, 7 presets, dishwasher safe basket",
    price: 6499,
    originalPrice: 9995,
    discount: 35,
    rating: 4.3,
    reviewCount: 19876,
    image: "https://images.unsplash.com/photo-1648464619218-09fe60207828?w=400&h=400&fit=crop",
    category: "Appliances",
    isPrime: true,
    inStock: true
  },
  {
    title: "Dyson V12 Detect Slim Cordless Vacuum Cleaner",
    description: "Laser Slim Fluffy head, 60 min runtime, HEPA filtration, LCD screen",
    price: 44900,
    originalPrice: 52900,
    discount: 15,
    rating: 4.5,
    reviewCount: 3456,
    image: "https://images.unsplash.com/photo-1558317374-067fb5f30001?w=400&h=400&fit=crop",
    category: "Appliances",
    isPrime: true,
    inStock: true
  }
];

const seedDB = async () => {
  try {
    await connectDB();
    await Product.deleteMany({});
    console.log('Products cleared');

    await Product.insertMany(products);
    console.log(`${products.length} products seeded successfully!`);

    process.exit(0);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

seedDB();
