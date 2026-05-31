export interface Service {
  id: string;
  name: string;
  description: string;
  icon: string;
  price?: number;
  duration?: number; // in minutes
  category?: string;
}

export interface PricingTier {
  id: string;
  name: string;
  description: string;
  price: number;
  features: string[];
  isPopular?: boolean;
  icon?: string;
}
