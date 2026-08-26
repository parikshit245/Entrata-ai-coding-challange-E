import { Product } from "@/types/product";

/**
 * Static mock product dataset with high-resolution Unsplash photography.
 *
 * Contains 48 deterministic products across 7 categories with varied
 * price ranges and ratings — sufficient to demonstrate filtering,
 * sorting, and pagination.
 */
export const PRODUCTS: Product[] = [
  // ── Electronics ──────────────────────────────────────────────────
  {
    id: "elec-001",
    name: "Wireless Noise-Cancelling Headphones",
    category: "Electronics",
    price: 299.99,
    rating: 4.7,
    reviewCount: 1842,
    imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80",
    description:
      "Premium over-ear headphones with active noise cancellation, 30-hour battery life, and Hi-Res audio certification.",
  },
  {
    id: "elec-002",
    name: "Mechanical Keyboard – TKL RGB",
    category: "Electronics",
    price: 129.99,
    rating: 4.5,
    reviewCount: 934,
    imageUrl: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600&auto=format&fit=crop&q=80",
    description:
      "Tenkeyless mechanical keyboard with tactile switches, per-key RGB lighting, and detachable USB-C cable.",
  },
  {
    id: "elec-003",
    name: '4K Ultra HD Monitor – 27"',
    category: "Electronics",
    price: 549.99,
    rating: 4.6,
    reviewCount: 721,
    imageUrl: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=600&auto=format&fit=crop&q=80",
    description:
      "27-inch IPS display with 3840×2160 resolution, 144Hz refresh rate, HDR600, and USB-C power delivery.",
  },
  {
    id: "elec-004",
    name: "Portable Bluetooth Speaker",
    category: "Electronics",
    price: 79.99,
    rating: 4.3,
    reviewCount: 2105,
    imageUrl: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600&auto=format&fit=crop&q=80",
    description:
      "IP67 waterproof speaker with 360° sound, 20-hour battery, and built-in microphone for hands-free calls.",
  },
  {
    id: "elec-005",
    name: "Smart Home Hub",
    category: "Electronics",
    price: 149.99,
    rating: 4.1,
    reviewCount: 589,
    imageUrl: "https://images.unsplash.com/photo-1558002038-1055907df827?w=600&auto=format&fit=crop&q=80",
    description:
      "Central hub compatible with Zigbee, Z-Wave, and Matter devices. Controls up to 100 smart home devices.",
  },
  {
    id: "elec-006",
    name: "Webcam 4K – Wide Angle",
    category: "Electronics",
    price: 89.99,
    rating: 4.4,
    reviewCount: 1203,
    imageUrl: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=600&auto=format&fit=crop&q=80",
    description:
      "4K webcam with 90° field of view, AI-powered autofocus, built-in ring light, and dual noise-cancelling mics.",
  },
  {
    id: "elec-007",
    name: "Wireless Ergonomic Mouse",
    category: "Electronics",
    price: 49.99,
    rating: 4.2,
    reviewCount: 3410,
    imageUrl: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=600&auto=format&fit=crop&q=80",
    description:
      "Vertical ergonomic wireless mouse with 4000 DPI sensor, silent clicks, and 70-day battery life.",
  },
  {
    id: "elec-008",
    name: "USB-C Docking Station – 12-in-1",
    category: "Electronics",
    price: 119.99,
    rating: 4.0,
    reviewCount: 876,
    imageUrl: "https://images.unsplash.com/photo-1622445262464-84b1456045b6?w=600&auto=format&fit=crop&q=80",
    description:
      "12-in-1 USB-C hub with dual HDMI (4K@60Hz), 100W PD, Gigabit Ethernet, SD/microSD, and 4× USB-A.",
  },
  {
    id: "elec-009",
    name: "True Wireless Earbuds",
    category: "Electronics",
    price: 159.99,
    rating: 4.6,
    reviewCount: 4231,
    imageUrl: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600&auto=format&fit=crop&q=80",
    description:
      "IPX5 earbuds with hybrid ANC, 8-hour playback (32h with case), multipoint Bluetooth 5.3 connection.",
  },
  {
    id: "elec-010",
    name: "Smart Lighting Starter Kit",
    category: "Electronics",
    price: 69.99,
    rating: 3.9,
    reviewCount: 642,
    imageUrl: "https://images.unsplash.com/photo-1550985543-f47f38aeee65?w=600&auto=format&fit=crop&q=80",
    description:
      "4-bulb starter kit with hub, supporting 16 million colors, voice control, and scheduling automation.",
  },

  // ── Clothing ─────────────────────────────────────────────────────
  {
    id: "clth-001",
    name: "Merino Wool Crew-Neck Sweater",
    category: "Clothing",
    price: 89.99,
    rating: 4.6,
    reviewCount: 512,
    imageUrl: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&auto=format&fit=crop&q=80",
    description:
      "100% extra-fine merino wool sweater. Temperature-regulating, naturally odour-resistant, machine washable.",
  },
  {
    id: "clth-002",
    name: "Water-Resistant Softshell Jacket",
    category: "Clothing",
    price: 139.99,
    rating: 4.4,
    reviewCount: 388,
    imageUrl: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&auto=format&fit=crop&q=80",
    description:
      "4-way stretch softshell with DWR coating, two hand pockets, one chest pocket, and a packable hood.",
  },
  {
    id: "clth-003",
    name: "Classic Slim-Fit Chinos",
    category: "Clothing",
    price: 59.99,
    rating: 4.2,
    reviewCount: 1204,
    imageUrl: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=600&auto=format&fit=crop&q=80",
    description:
      "Slim-fit cotton-stretch chinos available in 8 colors. Wrinkle-resistant, flat-front, hidden coin pocket.",
  },
  {
    id: "clth-004",
    name: "Graphic Print T-Shirt",
    category: "Clothing",
    price: 24.99,
    rating: 4.0,
    reviewCount: 2187,
    imageUrl: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=600&auto=format&fit=crop&q=80",
    description:
      "100% combed ring-spun cotton tee with vintage-wash graphic print. Pre-shrunk and tagless.",
  },
  {
    id: "clth-005",
    name: "Running Shorts – 5-inch Inseam",
    category: "Clothing",
    price: 34.99,
    rating: 4.5,
    reviewCount: 897,
    imageUrl: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=600&auto=format&fit=crop&q=80",
    description:
      "Lightweight moisture-wicking shorts with inner liner, reflective details, and zippered back pocket.",
  },
  {
    id: "clth-006",
    name: "Insulated Puffer Vest",
    category: "Clothing",
    price: 79.99,
    rating: 4.3,
    reviewCount: 441,
    imageUrl: "https://images.unsplash.com/photo-1544441893-675973e31985?w=600&auto=format&fit=crop&q=80",
    description:
      "600-fill recycled down vest with DWR treatment, two hand pockets, and a packable stuff-sack design.",
  },
  {
    id: "clth-007",
    name: "Linen Button-Down Shirt",
    category: "Clothing",
    price: 49.99,
    rating: 4.1,
    reviewCount: 763,
    imageUrl: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&auto=format&fit=crop&q=80",
    description:
      "100% European linen shirt with chest pocket, one-button adjustable cuffs, and a relaxed fit.",
  },

  // ── Books ─────────────────────────────────────────────────────────
  {
    id: "book-001",
    name: "Clean Code: A Handbook of Agile Software Craftsmanship",
    category: "Books",
    price: 34.99,
    rating: 4.7,
    reviewCount: 5120,
    imageUrl: "https://images.unsplash.com/photo-1532012164546-f432f2e3edd8?w=600&auto=format&fit=crop&q=80",
    description:
      "Robert C. Martin's classic guide to writing maintainable, professional-grade software.",
  },
  {
    id: "book-002",
    name: "Designing Data-Intensive Applications",
    category: "Books",
    price: 49.99,
    rating: 4.9,
    reviewCount: 3872,
    imageUrl: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&auto=format&fit=crop&q=80",
    description:
      "Martin Kleppmann's deep dive into the principles behind reliable, scalable, and maintainable systems.",
  },
  {
    id: "book-003",
    name: "The Pragmatic Programmer – 20th Anniversary Ed.",
    category: "Books",
    price: 39.99,
    rating: 4.8,
    reviewCount: 2941,
    imageUrl: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=600&auto=format&fit=crop&q=80",
    description:
      "Timeless advice for programmers at any stage of their career on practices, tools, and mindset.",
  },
  {
    id: "book-004",
    name: "JavaScript: The Good Parts",
    category: "Books",
    price: 24.99,
    rating: 4.3,
    reviewCount: 4210,
    imageUrl: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600&auto=format&fit=crop&q=80",
    description:
      "Douglas Crockford distils the best of JavaScript into a concise, well-reasoned guide.",
  },
  {
    id: "book-005",
    name: "You Don't Know JS Yet: Scope & Closures",
    category: "Books",
    price: 19.99,
    rating: 4.6,
    reviewCount: 1832,
    imageUrl: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=600&auto=format&fit=crop&q=80",
    description:
      "Kyle Simpson's thorough exploration of one of JavaScript's most nuanced topics.",
  },
  {
    id: "book-006",
    name: "Atomic Habits",
    category: "Books",
    price: 14.99,
    rating: 4.8,
    reviewCount: 98320,
    imageUrl: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=600&auto=format&fit=crop&q=80",
    description:
      "James Clear's practical framework for building good habits and breaking bad ones, backed by science.",
  },

  // ── Home & Garden ─────────────────────────────────────────────────
  {
    id: "home-001",
    name: "Air Purifier – HEPA H13",
    category: "Home & Garden",
    price: 199.99,
    rating: 4.5,
    reviewCount: 1320,
    imageUrl: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=600&auto=format&fit=crop&q=80",
    description:
      "True HEPA H13 filtration removes 99.97% of particles ≥0.3 µm. Coverage up to 500 sq ft with auto mode.",
  },
  {
    id: "home-002",
    name: "Stainless Steel French Press – 1L",
    category: "Home & Garden",
    price: 39.99,
    rating: 4.6,
    reviewCount: 2308,
    imageUrl: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600&auto=format&fit=crop&q=80",
    description:
      "Double-wall insulated French press with fine mesh filter, stays hot for 2 hours, dishwasher-safe.",
  },
  {
    id: "home-003",
    name: "Cast Iron Dutch Oven – 5.5 Qt",
    category: "Home & Garden",
    price: 89.99,
    rating: 4.8,
    reviewCount: 3402,
    imageUrl: "https://images.unsplash.com/photo-1584990347449-389eb02f1a66?w=600&auto=format&fit=crop&q=80",
    description:
      "Pre-seasoned cast iron Dutch oven with self-basting lid. Suitable for oven, stovetop, and campfire use.",
  },
  {
    id: "home-004",
    name: "Cordless Robotic Vacuum",
    category: "Home & Garden",
    price: 349.99,
    rating: 4.2,
    reviewCount: 854,
    imageUrl: "https://images.unsplash.com/photo-1558317374-067fb5f30001?w=600&auto=format&fit=crop&q=80",
    description:
      "LiDAR-navigation robot vacuum with app scheduling, multi-floor mapping, and 90-minute runtime.",
  },
  {
    id: "home-005",
    name: "Bamboo Cutting Board Set – 3pc",
    category: "Home & Garden",
    price: 34.99,
    rating: 4.4,
    reviewCount: 1742,
    imageUrl: "https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?w=600&auto=format&fit=crop&q=80",
    description:
      "Set of 3 eco-friendly bamboo cutting boards (S/M/L) with juice grooves and non-slip feet.",
  },
  {
    id: "home-006",
    name: "Smart Thermostat",
    category: "Home & Garden",
    price: 129.99,
    rating: 4.3,
    reviewCount: 2019,
    imageUrl: "https://images.unsplash.com/photo-1567690187548-f07b1d7bf5a9?w=600&auto=format&fit=crop&q=80",
    description:
      "Learning thermostat with geofencing, energy reports, and compatibility with most 24V HVAC systems.",
  },
  {
    id: "home-007",
    name: "Ceramic Planter Set – Indoor",
    category: "Home & Garden",
    price: 44.99,
    rating: 4.1,
    reviewCount: 619,
    imageUrl: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=600&auto=format&fit=crop&q=80",
    description:
      "Set of 4 minimalist matte ceramic planters with drainage holes and matching saucers.",
  },

  // ── Sports & Outdoors ─────────────────────────────────────────────
  {
    id: "sprt-001",
    name: "Adjustable Dumbbell Set – 5–52.5 lb",
    category: "Sports & Outdoors",
    price: 399.99,
    rating: 4.7,
    reviewCount: 6241,
    imageUrl: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=600&auto=format&fit=crop&q=80",
    description:
      "Select-a-weight system replaces 15 sets of dumbbells. Dial adjusts in 2.5 lb increments up to 52.5 lb.",
  },
  {
    id: "sprt-002",
    name: "Yoga Mat – 6mm Non-Slip",
    category: "Sports & Outdoors",
    price: 49.99,
    rating: 4.5,
    reviewCount: 3812,
    imageUrl: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=600&auto=format&fit=crop&q=80",
    description:
      "6mm thick eco-friendly TPE yoga mat with alignment guides, non-slip texture, and carry strap.",
  },
  {
    id: "sprt-003",
    name: "Trekking Poles – Carbon Fibre",
    category: "Sports & Outdoors",
    price: 119.99,
    rating: 4.6,
    reviewCount: 1024,
    imageUrl: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=600&auto=format&fit=crop&q=80",
    description:
      "Collapsible carbon fibre poles with cork grip, anti-shock mechanism, and Quick-Lock adjustment.",
  },
  {
    id: "sprt-004",
    name: "Hydration Pack – 20L",
    category: "Sports & Outdoors",
    price: 89.99,
    rating: 4.4,
    reviewCount: 741,
    imageUrl: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&auto=format&fit=crop&q=80",
    description:
      "20L trail pack with 2.5L bladder, ventilated back panel, hip belt pockets, and rain cover.",
  },
  {
    id: "sprt-005",
    name: "Jump Rope – Speed Cable",
    category: "Sports & Outdoors",
    price: 19.99,
    rating: 4.3,
    reviewCount: 5234,
    imageUrl: "https://images.unsplash.com/photo-1544216067-b50a25695079?w=600&auto=format&fit=crop&q=80",
    description:
      "Adjustable stainless steel speed rope with ball-bearing handles. Suitable for CrossFit and HIIT.",
  },
  {
    id: "sprt-006",
    name: "Foam Roller – High Density",
    category: "Sports & Outdoors",
    price: 29.99,
    rating: 4.2,
    reviewCount: 4102,
    imageUrl: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600&auto=format&fit=crop&q=80",
    description:
      "36-inch high-density EVA foam roller for myofascial release, warm-up, and recovery.",
  },

  // ── Toys & Games ─────────────────────────────────────────────────
  {
    id: "toys-001",
    name: "Strategy Board Game – Settlers",
    category: "Toys & Games",
    price: 44.99,
    rating: 4.6,
    reviewCount: 8321,
    imageUrl: "https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=600&auto=format&fit=crop&q=80",
    description:
      "Award-winning resource-management board game for 3–4 players (ages 10+). Average play time 60–120 min.",
  },
  {
    id: "toys-002",
    name: "1000-Piece Jigsaw Puzzle – World Map",
    category: "Toys & Games",
    price: 19.99,
    rating: 4.4,
    reviewCount: 2104,
    imageUrl: "https://images.unsplash.com/photo-1585336261026-7f12e8eb6841?w=600&auto=format&fit=crop&q=80",
    description:
      "High-quality 1000-piece puzzle with a precision-cut world map design. Finished size 68×48 cm.",
  },
  {
    id: "toys-003",
    name: "STEM Building Kit – Robotics",
    category: "Toys & Games",
    price: 79.99,
    rating: 4.7,
    reviewCount: 1432,
    imageUrl: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&auto=format&fit=crop&q=80",
    description:
      "400-piece robotics kit with programmable controller, sensors, and guided projects for ages 8+.",
  },
  {
    id: "toys-004",
    name: "Classic Chess Set – Staunton",
    category: "Toys & Games",
    price: 34.99,
    rating: 4.5,
    reviewCount: 3218,
    imageUrl: "https://images.unsplash.com/photo-1529699211952-734e80c4d42b?w=600&auto=format&fit=crop&q=80",
    description:
      "Weighted tournament Staunton chess pieces with felted bases and folding wooden board.",
  },
  {
    id: "toys-005",
    name: "Playing Cards – Luxury Edition",
    category: "Toys & Games",
    price: 12.99,
    rating: 4.3,
    reviewCount: 6710,
    imageUrl: "https://images.unsplash.com/photo-1511193311914-0346f16efe90?w=600&auto=format&fit=crop&q=80",
    description:
      "Premium casino-grade 100% plastic playing cards. Two-deck set with linen finish.",
  },

  // ── Beauty & Health ───────────────────────────────────────────────
  {
    id: "beau-001",
    name: "Vitamin C Brightening Serum",
    category: "Beauty & Health",
    price: 29.99,
    rating: 4.5,
    reviewCount: 7231,
    imageUrl: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&auto=format&fit=crop&q=80",
    description:
      "20% L-ascorbic acid serum with vitamin E and ferulic acid. Reduces dark spots and firms skin.",
  },
  {
    id: "beau-002",
    name: "Electric Toothbrush – Sonic Pro",
    category: "Beauty & Health",
    price: 59.99,
    rating: 4.6,
    reviewCount: 4812,
    imageUrl: "https://images.unsplash.com/photo-1559591937-e10220268593?w=600&auto=format&fit=crop&q=80",
    description:
      "40,000 strokes/min sonic toothbrush with 5 cleaning modes, 2-minute timer, and 4-week battery.",
  },
  {
    id: "beau-003",
    name: "Natural Deodorant – Sensitive Skin",
    category: "Beauty & Health",
    price: 12.99,
    rating: 4.2,
    reviewCount: 3104,
    imageUrl: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600&auto=format&fit=crop&q=80",
    description:
      "Aluminum-free, baking-soda-free formula with magnesium and shea butter. 72-hour protection.",
  },
  {
    id: "beau-004",
    name: "Silk Pillowcase – Queen Size",
    category: "Beauty & Health",
    price: 39.99,
    rating: 4.7,
    reviewCount: 2819,
    imageUrl: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=600&auto=format&fit=crop&q=80",
    description:
      "22 momme 100% mulberry silk pillowcase. Reduces friction on hair and skin, hypoallergenic.",
  },
  {
    id: "beau-005",
    name: "Foam Facial Cleanser – Hyaluronic",
    category: "Beauty & Health",
    price: 16.99,
    rating: 4.4,
    reviewCount: 5432,
    imageUrl: "https://images.unsplash.com/photo-1556228722-d0b5d0c75a40?w=600&auto=format&fit=crop&q=80",
    description:
      "Gentle foaming cleanser with hyaluronic acid and ceramides for all skin types. Fragrance-free.",
  },
  {
    id: "beau-006",
    name: "Collagen Peptides Powder – Unflavoured",
    category: "Beauty & Health",
    price: 34.99,
    rating: 4.5,
    reviewCount: 6120,
    imageUrl: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&auto=format&fit=crop&q=80",
    description:
      "Grass-fed hydrolysed collagen peptides (types I & III). Dissolves instantly in hot or cold liquids.",
  },
];
