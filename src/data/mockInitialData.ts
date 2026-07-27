import { BrandSettings, Product, CustomerPersona, CalendarEvent, SavedFolder, GeneratedContent, GeneratedCampaign, TaskItem, HolidayEvent } from '../types';

export const initialBrandSettings: BrandSettings = {
  businessName: 'FreshLuxe Kitchen',
  logoUrl: 'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=150&q=80',
  primaryColor: '#e11d48', // Pink/Rose
  secondaryColor: '#f43f5e',
  accentColor: '#fda4af',
  fonts: 'Plus Jakarta Sans, Inter, sans-serif',
  targetAudience: 'Home cooks, busy parents, pantry organisation lovers, and meal preppers looking for BPA-free premium airtight storage.',
  instagramUsername: '@freshluxekitchen',
  whatsappNumber: '+1 (555) 384-9102',
  websiteUrl: 'https://freshluxekitchen.com',
  currency: 'USD ($)',
  deliveryLocations: ['USA', 'Canada', 'United Kingdom', 'Australia', 'Worldwide Shipping'],
  businessDescription: 'Premium BPA-free airtight food storage containers, modular pantry organisers, and leak-proof meal prep containers designed for crisp freshness and aesthetic kitchen harmony.',
  tagline: 'Transform Your Pantry. Preserve Pure Freshness.',
};

export const initialProducts: Product[] = [
  {
    id: 'prod-1',
    name: 'Airtight Modular Pantry Set (7-Piece)',
    price: 49.99,
    category: 'Pantry Sets',
    colors: ['Crystal Clear / Charcoal Trim', 'Crystal Clear / Soft Rose Trim', 'White Trim'],
    material: 'BPA-Free Acrylic Shatterproof Plastic',
    capacity: '0.5L, 1.2L, 2.0L Modular Sizes',
    dimensions: 'Varies by stackable container',
    stockStatus: 'In Stock',
    description: 'Stackable, silicone-sealed airtight storage containers that keep dry goods crisp and pantry shelves looking picture-perfect.',
    benefits: [
      'Silicone airtight lock prevents moisture and pests',
      'Modular space-saving design stacks effortlessly',
      'One-push locking mechanism for easy opening'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=600&q=80',
    createdAt: '2026-07-01'
  },
  {
    id: 'prod-2',
    name: '3-Compartment Glass Meal Prep Bento Box',
    price: 34.99,
    category: 'Meal Prep',
    colors: ['Rose Gold Seal', 'Emerald Green Seal', 'Slate Gray Seal'],
    material: 'High-Borosilicate Glass with BPA-Free Snap Lid',
    capacity: '1000 ml (34 oz)',
    dimensions: '20.5cm x 15.5cm x 7cm',
    stockStatus: 'In Stock',
    description: 'Oven-safe, microwave-safe, leak-proof bento container with smart divider walls for portion-controlled weekly meal prep.',
    benefits: [
      'Oven safe up to 400°C and thermal shock resistant',
      'Four-hinge lock system with 100% leakproof silicone rim',
      'Zero flavor transfer or staining'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80',
    createdAt: '2026-07-05'
  },
  {
    id: 'prod-3',
    name: 'Fridge Produce Saver Produce Pods (Set of 3)',
    price: 27.50,
    category: 'Containers',
    colors: ['Frosted Mint', 'Clear Crystal'],
    material: 'Food-Grade BPA-Free Tritan',
    capacity: '1.8L & 2.5L Crisp Keepers',
    dimensions: '24cm x 16cm x 11cm',
    stockStatus: 'In Stock',
    description: 'Features bottom drain trays and adjustable vent filters to extend crispness of berries, herbs, and leafy greens up to 3x longer.',
    benefits: [
      'Adjustable airflow vent filters out humidity',
      'Elevated internal crisping tray prevents soggy bottoms',
      'Dishwasher safe and odor-resistant'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=600&q=80',
    createdAt: '2026-07-10'
  },
  {
    id: 'prod-4',
    name: 'Insulated Stainless Steel Bento Lunch Box',
    price: 39.95,
    category: 'Lunch Boxes',
    colors: ['Blush Pink', 'Matte Black', 'Sage Green'],
    material: '18/8 Stainless Steel & Soft Touch Exterior',
    capacity: '1200 ml Dual Tier',
    dimensions: '19cm x 12cm x 10.5cm',
    stockStatus: 'Low Stock',
    description: 'Double-walled vacuum thermal insulation keeps warm meals hot for 6 hours or salads chilled for 12 hours.',
    benefits: [
      'Sweat-proof exterior coating',
      'Compact folding handle with sauce container included',
      'Eco-friendly plastic alternative'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1590779033100-9f60a05a013d?auto=format&fit=crop&w=600&q=80',
    createdAt: '2026-07-15'
  }
];

export const initialPersonas: CustomerPersona[] = [
  {
    id: 'pers-1',
    name: 'Meal Prep Pro Sarah',
    roleTitle: 'Busy Working Parent & Wellness Enthusiast',
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
    ageGroup: '28-42 years old',
    incomeLevel: '$65k - $120k / year',
    painPoints: [
      'Wastes food because vegetables go bad quickly in basic plastic tubs',
      'Pantry looks cluttered and hard to find ingredients quickly',
      'Plastic containers warp in the dishwasher or stain with tomato sauce'
    ],
    goals: [
      'Save 2 hours every Sunday prep session',
      'Maintain an Instagram-worthy, neatly organized fridge and pantry',
      'Eat healthier home-cooked lunches at the office'
    ],
    buyingHabits: [
      'Researches on Instagram & TikTok for aesthetic kitchen organisation',
      'Values durability over cheap single-use items',
      'Appreciates bundle discounts and fast shipping'
    ],
    interests: ['Home Organisation', 'Meal Prepping', 'Healthy Eating', 'Interior Aesthetics', 'Time Saving Hacks'],
    favoritePlatforms: ['Instagram Reels', 'Pinterest', 'TikTok'],
    buyingObjections: ['Are these containers truly leakproof?', 'Will they stain or crack easily?'],
    marketingMessages: ['"Stop throwing away $50 worth of ruined berries every week. Keep produce 3x fresher."'],
    idealOffers: ['Buy 2 Get 1 50% Off Pantry Sets + Free Shipping']
  },
  {
    id: 'pers-2',
    name: 'Organised Home Enthusiast Maya',
    roleTitle: 'Interior Design & Lifestyle Creator',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    ageGroup: '24-36 years old',
    incomeLevel: '$50k - $95k / year',
    painPoints: [
      'Mismatched container lids cluttering cabinets',
      'Cheap plastic cloudy containers looking ugly on open pantry shelves'
    ],
    goals: [
      'Aesthetically uniform glass and clear acrylic containers',
      'Satisfying pantry restock videos and clean kitchen routines'
    ],
    buyingHabits: [
      'Buys complete matching sets for full kitchen overhauls',
      'Follows cleaning & reset reels daily'
    ],
    interests: ['Minimalism', 'Pantry Restock Videos', 'Kitchen Renovation', 'ASMR Cleaning'],
    favoritePlatforms: ['Instagram Stories', 'Pinterest', 'YouTube Shorts'],
    buyingObjections: ['Is acrylic shatterproof if dropped by kids?'],
    marketingMessages: ['"Transform your chaotic dry pantry into a calm luxury boutique display."'],
    idealOffers: ['The Ultimate 14-Piece Pantry Reset Bundle + Free Custom Labels']
  }
];

export const initialCalendarEvents: CalendarEvent[] = [
  {
    id: 'cal-1',
    date: '2026-07-27',
    title: 'Sunday Meal Prep Reel: 3 Bento Hacks',
    type: 'Reel',
    contentSnippet: 'Watch how Sarah preps 5 days of healthy chicken & quinoa bowls without sog.',
    status: 'Published'
  },
  {
    id: 'cal-2',
    date: '2026-07-28',
    title: 'Pantry Restock Aesthetic Carousel',
    type: 'Post',
    contentSnippet: '5 tips to arrange cereal, pasta, and spices using stackable airtight containers.',
    status: 'Scheduled'
  },
  {
    id: 'cal-3',
    date: '2026-07-29',
    title: 'Produce Freshness Quiz Story',
    type: 'Story',
    contentSnippet: 'Poll: How long do strawberries last in your fridge? (A: 3 days, B: 10 days with FreshLuxe).',
    status: 'Scheduled'
  },
  {
    id: 'cal-4',
    date: '2026-07-31',
    title: 'Flash Sale: 20% Off Glass Bento Sets',
    type: 'Promotion',
    contentSnippet: 'Limited 48hr promo for back-to-school prep lovers. Code: PREP20.',
    status: 'Draft'
  }
];

export const initialSavedFolders: SavedFolder[] = [
  { id: 'fold-1', name: 'Product Launch Captions', color: '#f43f5e', count: 8 },
  { id: 'fold-2', name: 'Viral Reel Scripts', color: '#8b5cf6', count: 12 },
  { id: 'fold-3', name: 'DM Sales Responses', color: '#10b981', count: 15 },
  { id: 'fold-4', name: 'Pantry Organisation Ideas', color: '#f59e0b', count: 6 }
];

export const initialTasks: TaskItem[] = [
  { id: 't1', title: 'Post Sunday Bento Prep Reel to IG', category: 'Reels', completed: true, dueDate: 'Today' },
  { id: 't2', title: 'Reply to 12 Price & Shipping DMs', category: 'Customer Support', completed: false, dueDate: 'Today' },
  { id: 't3', title: 'Generate Mother\'s Day Campaign Ideas', category: 'Campaigns', completed: false, dueDate: 'Tomorrow' },
  { id: 't4', title: 'Review Hashtag Performance metrics', category: 'Analytics', completed: false, dueDate: 'Jul 30' }
];

export const upcomingHolidays: HolidayEvent[] = [
  { date: 'Aug 8', title: 'National Fresh Produce Day', category: 'Food & Freshness', idea: 'Feature Fridge Produce Saver pods with a berry crispness challenge.' },
  { date: 'Aug 24', title: 'Back-to-School Prep Week', category: 'Seasonal', idea: 'Promote 3-Compartment Bento boxes for kids and university students.' },
  { date: 'Sep 1', title: 'National Food Bank Month', category: 'Community', idea: 'Launch "Prep 1 Give 1" container donation campaign.' },
  { date: 'Oct 16', title: 'World Food Day', category: 'Zero Food Waste', idea: 'Highlight zero food waste tips using airtight storage containers.' }
];

export const sampleInitialCaptions: GeneratedContent[] = [
  {
    id: 'cap-1',
    title: 'Pantry Restock Before & After',
    postType: 'Before & After Organisation',
    tone: 'Luxury',
    caption: `Say goodbye to messy cereal boxes and half-opened bags of flour lingering in your pantry! ✨\n\nOur FreshLuxe 7-Piece Airtight Modular Set transforms chaotic cabinets into a serene, high-end kitchen display.\n\n🔒 100% Silicone Airtight Lock\n✨ Crystal Clear Shatterproof Acrylic\n📦 Stackable Space-Saving Precision\n\nDrop a "PANTRY" in the comments to get an instant 15% VIP discount code sent directly to your DMs! 💬👇`,
    hook: 'Say goodbye to messy cereal boxes and half-opened bags of flour!',
    callToAction: 'Drop "PANTRY" in comments for 15% OFF VIP coupon!',
    hashtags: ['#PantryGoals', '#TupperwareOrganisation', '#KitchenInspo', '#AestheticHome', '#MealPrepContainers', '#FreshLuxe', '#PantryRestock'],
    seoKeywords: ['airtight food storage', 'pantry organization', 'modular containers', 'BPA free'],
    emojis: ['✨', '🔒', '📦', '💬', '👇'],
    engagementQuestion: 'What item in your pantry gets messy the quickest?',
    createdAt: '2026-07-26',
    folderId: 'fold-1',
    isFavorite: true
  }
];
