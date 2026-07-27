export type TabType = 
  | 'dashboard'
  | 'ai-content'
  | 'reel-generator'
  | 'content-calendar'
  | 'dm-assistant'
  | 'comment-replies'
  | 'campaign-builder'
  | 'ad-generator'
  | 'hashtag-generator'
  | 'product-library'
  | 'customer-personas'
  | 'analytics'
  | 'image-prompt'
  | 'marketing-coach'
  | 'brand-settings'
  | 'saved-content';

export interface BrandSettings {
  businessName: string;
  logoUrl: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  fonts: string;
  targetAudience: string;
  instagramUsername: string;
  whatsappNumber: string;
  websiteUrl: string;
  currency: string;
  deliveryLocations: string[];
  businessDescription: string;
  tagline: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  category: 'Containers' | 'Meal Prep' | 'Organisers' | 'Airtight Sets' | 'Lunch Boxes' | 'Pantry Sets';
  colors: string[];
  material: string;
  capacity: string;
  dimensions: string;
  stockStatus: 'In Stock' | 'Low Stock' | 'Pre-order' | 'Out of Stock';
  description: string;
  benefits: string[];
  imageUrl: string;
  createdAt: string;
}

export type PostType = 
  | 'Instagram Caption'
  | 'Carousel Caption'
  | 'Story Caption'
  | 'Reel Script'
  | 'Educational Post'
  | 'Promotional Post'
  | 'Seasonal Campaign'
  | 'Holiday Campaign'
  | 'Customer Testimonial'
  | 'FAQ Post'
  | 'Problem/Solution Post'
  | 'Product Highlight'
  | 'Lifestyle Post'
  | 'Before & After Organisation'
  | 'Launch Post';

export type ToneType = 'Professional' | 'Friendly' | 'Luxury' | 'Funny' | 'Minimal' | 'Exciting' | 'Educational';
export type LengthType = 'Short' | 'Medium' | 'Long';
export type CtaStyle = 'Soft' | 'Strong' | 'Sales' | 'Urgent';

export interface GeneratedContent {
  id: string;
  title: string;
  postType: PostType;
  tone: ToneType;
  caption: string;
  hook?: string;
  callToAction?: string;
  hashtags: string[];
  seoKeywords: string[];
  emojis: string[];
  engagementQuestion?: string;
  productId?: string;
  createdAt: string;
  folderId?: string;
  isFavorite?: boolean;
}

export interface ReelScene {
  sceneNumber: number;
  timeframe: string;
  visual: string;
  cameraAngle: string;
  bRollIdea: string;
  voiceoverText: string;
  onScreenText: string;
}

export interface GeneratedReel {
  id: string;
  title: string;
  hook: string;
  scenes: ReelScene[];
  musicSuggestion: string;
  endingCta: string;
  voiceoverScript: string;
  caption: string;
  hashtags: string[];
  createdAt: string;
}

export interface GeneratedDmReply {
  id: string;
  category: string;
  userQuery: string;
  friendlyVersion: string;
  professionalVersion: string;
  luxuryVersion: string;
}

export interface GeneratedCommentReply {
  id: string;
  comment: string;
  suggestedReply: string;
  friendlyReply: string;
  quickReply: string;
}

export interface AdVariation {
  headline: string;
  primaryText: string;
  description: string;
  ctaText: string;
  targetAngle: string;
}

export interface GeneratedCampaign {
  id: string;
  name: string;
  type: '30-Day Growth' | 'Product Launch' | 'Holiday Special' | 'Flash Sale' | 'Clearance' | 'Giveaway' | 'Referral' | 'Bundle Offer' | 'Back to School' | 'Mother\'s Day' | 'Black Friday';
  durationDays: number;
  goal: string;
  dailyContentSchedule: {
    day: number;
    title: string;
    type: 'Post' | 'Reel' | 'Story' | 'Ad' | 'Email' | 'WhatsApp';
    topic: string;
    captionSnippet: string;
  }[];
  emailCopy: string;
  whatsappMessages: string[];
  dmSequence: string[];
  createdAt: string;
}

export interface CustomerPersona {
  id: string;
  name: string;
  roleTitle: string;
  avatarUrl: string;
  ageGroup: string;
  incomeLevel: string;
  painPoints: string[];
  goals: string[];
  buyingHabits: string[];
  interests: string[];
  favoritePlatforms: string[];
  buyingObjections: string[];
  marketingMessages: string[];
  idealOffers: string[];
}

export interface CalendarEvent {
  id: string;
  date: string; // YYYY-MM-DD
  title: string;
  type: 'Story' | 'Post' | 'Reel' | 'Promotion';
  contentSnippet: string;
  status: 'Scheduled' | 'Published' | 'Draft';
}

export interface SavedFolder {
  id: string;
  name: string;
  color: string;
  count: number;
}

export interface ImagePromptResult {
  id: string;
  category: string;
  promptText: string;
  negativePrompt: string;
  recommendedAspect: string;
  mockImageUrl?: string;
  createdAt: string;
}

export interface TaskItem {
  id: string;
  title: string;
  category: string;
  completed: boolean;
  dueDate: string;
}

export interface HolidayEvent {
  date: string;
  title: string;
  category: string;
  idea: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
}
