
export enum Category {
  PERFORMANCE = 'Performance',
  SENIOR = 'Senior',
  MAINTENANCE = 'Maintenance',
  SUPPLEMENTS = 'Supplements',
  SPECIAL_NEEDS = 'Special Needs',
  YOUNG_HORSE = 'Young Horse',
  OTHER = 'Other Products'
}

export interface GuaranteedAnalysis {
  crudeProteinMin: string;
  crudeFatMin: string;
  crudeFiberMax: string;
  calciumMin?: string;
  calciumMax?: string;
  phosphorusMin?: string;
  copperMin?: string;
  seleniumMin?: string;
  zincMin?: string;
  vitaminAMin?: string;
  vitaminEMin?: string;
}

export interface Product {
  id: string;
  name: string;
  category: Category;
  description: string;
  price: number;
  image: string;
  tags: string[];
  ingredients: string[];
  guaranteedAnalysis: GuaranteedAnalysis;
  feedingDirections?: string;
  recommendedUses?: string[];
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export interface CartItem extends Product {
  quantity: number;
}
