const products = [
  {
    name: "Classic Stripe Crew",
    price: 12.99,
    originalPrice: 16.99,
    description: "Our best-selling crew sock with a timeless stripe pattern. Crafted from premium combed cotton for all-day comfort. Reinforced heel and toe for lasting durability.",
    category: "crew",
    gender: "unisex",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Navy/White", "Black/Red", "Grey/Yellow"],
    images: [
      "https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?w=600&q=80",
      "https://images.unsplash.com/photo-1582588678413-dbf45f4823e9?w=600&q=80"
    ],
    tags: ["bestseller", "striped", "cotton"],
    featured: true,
    rating: 4.8,
    reviewCount: 342,
  },
  {
    name: "Cushion Run No-Show",
    price: 14.99,
    description: "Engineered for runners. Extra cushioning at heel and forefoot, moisture-wicking fabric, and a stay-put tab to prevent slipping into your shoe.",
    category: "no-show",
    gender: "unisex",
    sizes: ["S", "M", "L", "XL"],
    colors: ["White", "Black", "Grey"],
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80",
      "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=600&q=80"
    ],
    tags: ["sport", "running", "cushion"],
    featured: true,
    rating: 4.9,
    reviewCount: 518,
  },
  {
    name: "Merino Wool Ankle",
    price: 22.99,
    originalPrice: 27.99,
    description: "Premium Merino wool ankle socks that regulate temperature naturally. Perfect for both outdoor adventures and everyday wear. Naturally odor-resistant.",
    category: "ankle",
    gender: "unisex",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Charcoal", "Oatmeal", "Forest Green"],
    images: [
      "https://images.unsplash.com/photo-1595341888016-a392ef81b7de?w=600&q=80",
      "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=600&q=80"
    ],
    tags: ["merino", "wool", "premium"],
    featured: true,
    rating: 4.7,
    reviewCount: 189,
  },
  {
    name: "Bold Botanical Crew",
    price: 13.99,
    description: "Make a statement with our botanical print crew socks. Vibrant, colorfast dyes on a soft cotton-blend base. Because socks should spark joy.",
    category: "crew",
    gender: "women",
    sizes: ["S", "M", "L"],
    colors: ["Pink Floral", "Blue Garden", "Sage Green"],
    images: [
      "https://images.unsplash.com/photo-1604671801908-6f0c6a092c05?w=600&q=80",
      "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600&q=80"
    ],
    tags: ["pattern", "fun", "women"],
    featured: true,
    rating: 4.6,
    reviewCount: 267,
  },
  {
    name: "Compression Travel Knee-High",
    price: 28.99,
    description: "20-30mmHg graduated compression for long flights, desk jobs, or recovery days. Anti-fatigue design keeps your legs feeling fresh all day.",
    category: "knee-high",
    gender: "unisex",
    sizes: ["S/M", "L/XL"],
    colors: ["Black", "Navy", "Beige"],
    images: [
      "https://images.unsplash.com/photo-1544441452-d9ef6bd9be37?w=600&q=80",
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=600&q=80"
    ],
    tags: ["compression", "travel", "medical"],
    featured: false,
    rating: 4.5,
    reviewCount: 423,
  },
  {
    name: "Athletic Quarter Crew",
    price: 11.99,
    description: "Built for performance. Arch support banding, breathable mesh zones, and moisture-wicking fibers keep you dry and supported during any workout.",
    category: "ankle",
    gender: "men",
    sizes: ["M", "L", "XL"],
    colors: ["White/Grey", "Black/White", "Navy/Orange"],
    images: [
      "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=600&q=80",
      "https://images.unsplash.com/photo-1612901819046-4f2516aa7dc3?w=600&q=80"
    ],
    tags: ["sport", "athletic", "men"],
    featured: false,
    rating: 4.4,
    reviewCount: 156,
  },
  {
    name: "Cozy Knit Knee-High",
    price: 19.99,
    originalPrice: 24.99,
    description: "Chunky cable-knit knee-highs that are equal parts cozy and chic. Made from a soft acrylic blend, perfect for layering over tights or wearing solo.",
    category: "knee-high",
    gender: "women",
    sizes: ["S", "M", "L"],
    colors: ["Cream", "Dusty Rose", "Slate Blue"],
    images: [
      "https://images.unsplash.com/photo-1611048267451-e6ed903d4a38?w=600&q=80",
      "https://images.unsplash.com/photo-1580163661417-3606299aba72?w=600&q=80"
    ],
    tags: ["cozy", "winter", "women", "knit"],
    featured: true,
    rating: 4.8,
    reviewCount: 301,
  },
  {
    name: "Everyday Liner No-Show",
    price: 9.99,
    description: "Ultra-low cut so they stay truly invisible in any shoe. Silicone heel grip keeps them locked in place. Available in a 6-pack value set.",
    category: "no-show",
    gender: "women",
    sizes: ["S", "M", "L"],
    colors: ["Nude", "White", "Black"],
    images: [
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&q=80",
      "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=600&q=80"
    ],
    tags: ["invisible", "liner", "everyday"],
    featured: false,
    rating: 4.3,
    reviewCount: 892,
  },
];

module.exports = { products };
