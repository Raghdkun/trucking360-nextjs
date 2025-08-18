// API Configuration Constants
export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL || 'https://cms.dashboard360.io/api/v1',
  ENDPOINTS: {
    // Add your specific endpoints here as you need them
    // Example:
    // USERS: '/users',
    // DASHBOARD: '/dashboard',
    // METRICS: '/metrics',
    GENERAL: '/general',
    HOMEPAGE: '/homepage',
    PRICING: '/pricing',
    NEWSLETTER: '/newsletter',
    WHY_T360: '/why-t360',
    DASHBOARD360: '/dashboard360',
  },
  TIMEOUT: 10000, // 10 seconds
  HEADERS: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
};

// HTTP Methods
export const HTTP_METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
  PATCH: 'PATCH',
} as const;

// API Response Types
export interface ApiResponse<T = any> {
  success: any;
  data: T;
  status: number;
  message?: string;
  error?: string;
}

export interface ApiError {
  message: string;
  status: number;
  code?: string;
}

// General Data Types
export interface HeaderData {
  id: number;
  singleton: number;
  logo_image: string | null;
  favicon: string | null;
  btn1_name: string;
  btn1_link: string;
  btn2_name: string;
  btn2_link: string;
  created_at: string;
  updated_at: string;
}

export interface FooterData {
  id: number;
  singleton: number;
  title: string;
  description: string;
  location: string;
  phone: string;
  email: string;
  linkedin_url: string | null;
  facebook_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface GeneralData {
  header: HeaderData;
  footer: FooterData;
}

export interface GeneralApiResponse {
  success: boolean;
  data: GeneralData;
}

// Homepage Data Types
export interface HeroData {
  title: string;
  description: string;
  image: string;
  animated_texts: string[];
}

export interface VideoData {
  title: string;
  description: string;
  video: string;
}

export interface FAQItem {
  id: number;
  title: string;
  description: string;
  order: number;
}

export interface MeetingData {
  title: string;
  description: string;
  btn_name: string;
  btn_link: string;
  image: string | null;
}

export interface FormData {
  title: string;
  description: string;
}

export interface HomepageData {
  hero: HeroData;
  video: VideoData;
  sliders: any[]; // You can define this type based on your needs
  faqs: FAQItem[];
  meeting: MeetingData;
  form: FormData;
}

export interface HomepageApiResponse {
  success: boolean;
  data: HomepageData;
}

// Pricing Data Types
export interface PricingPlan {
  id: number;
  name: string;
  description: string;
  features: string | null;
  is_customizable: boolean;
  is_best_value: boolean;
  order: number;
  button_link: string;
  button_text: string;
  highlighted_text: string | null;
  button_bg_color: string;
  total_value_bg_color: string;
  total_value: string | null;
  per_text: string;
  custom_features: any[];
}

export interface ServiceContent {
  id: number;
  service_name: string;
  description: string;
  is_safety: boolean;
}

export interface ServiceTable {
  id: number;
  title: string;
  contents: ServiceContent[];
}

export interface PricingFAQ {
  id: number;
  title: string;
  description: string;
  order: number;
}

export interface BookingData {
  title: string;
  description: string;
  btn_name: string;
  btn_link: string;
}

export interface PricingData {
  plans: PricingPlan[];
  tables: ServiceTable[];
  faqs: PricingFAQ[];
  booking: BookingData;
}

export interface PricingApiResponse {
  success: boolean;
  data: PricingData;
}

// Helper function to construct full image URL
export const getImageUrl = (imagePath: string): string => {
  if (!imagePath) return '';
  if (imagePath.startsWith('http')) return imagePath;
  return `${API_CONFIG.BASE_URL.replace('/api/v1', '')}/${imagePath}`;
};

// Helper function to construct full video URL
export const getVideoUrl = (videoPath: string): string => {
  if (!videoPath) return '';
  if (videoPath.startsWith('http')) return videoPath;
  return `${API_CONFIG.BASE_URL.replace('/api/v1', '')}/${videoPath}`;
};

// Newsletter Data Types
export interface ArticleImage {
  id: number;
  image_url: string;
  alt_text: string;
}

export interface Article {
  id: number;
  title: string;
  description: string;
  featured_image: string;
  custom_date: string;
  content: string;
  images: ArticleImage[];
}

export interface NewsletterData {
  articles: Article[];
}

export interface NewsletterApiResponse {
  success: boolean;
  data: NewsletterData;
}

// Why Trucking 360 Data Types
export interface MissionData {
  title: string;
  description: string;
  image: string;
}

export interface LeadershipData {
  name: string;
  title: string;
  image: string;
  bio_paragraphs: string[];
}

export interface CorePrinciple {
  id: number;
  title: string;
  content: string;
  order: number;
}

export interface WhyChooseUsFeature {
  id: number;
  title: string;
  description: string;
  icon: string;
  order: number;
}

export interface WhyT360Data {
  mission: MissionData;
  leadership: LeadershipData;
  core_principles: CorePrinciple[];
  why_choose_us: {
    title: string;
    subtitle: string;
    description: string;
    features: WhyChooseUsFeature[];
  };
}

export interface WhyT360ApiResponse {
  success: boolean;
  data: WhyT360Data;
}

// Dashboard360 Data Types
export interface Dashboard360Data {
  id: number;
  singleton: number;
  title: string;
  description: string;
  video: string;
  btn_text: string;
  btn_link: string;
  created_at: string;
  updated_at: string;
}

export interface Dashboard360ApiResponse {
  success: boolean;
  data: Dashboard360Data;
}