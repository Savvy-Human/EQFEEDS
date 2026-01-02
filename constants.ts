
import { Category, Product } from './types';

export const CONTACT_INFO = {
  owner: "Laura A. Macke",
  store: "Equine & Farm Supply",
  address: "1114 N. 1250 E. Road, Taylorville, IL 62568",
  email: "info@eqfeeds.com",
  phone: "217-824-7897",
  fax: "217-824-5458"
};

export const PRODUCTS: Product[] = [
  {
    id: 'baby-bloom',
    name: 'BABY BLOOM®',
    category: Category.YOUNG_HORSE,
    description: 'Foal & Growing Baby feed. The complete feed for your growing baby. Also used for growing halter babies to ensure optimal bone development and muscle tone.',
    price: 54.99,
    image: 'https://images.unsplash.com/photo-1551100585-6932479634be?auto=format&fit=crop&q=80&w=800',
    tags: ['Foal', 'Growing', 'Locked Formula'],
    ingredients: [
      'Soybean Hulls', 'Wheat Middlings', 'Soybean Meal', 'Pulverized Oats', 'Corn', 
      'Calcium Bentonite Clay', 'Whey', 'Soy Oil', 'Crushed Mineral Rock Salt', 
      'Concentrated Yeast Culture', 'Shredded Beet Pulp', 'Calcium Carbonate', 
      'Vitamin E Supplement', 'L-Lysine', 'Selenium Yeast', 'Vitamin A Supplement', 
      'Vitamin D3 Supplement', 'DL-Methionine'
    ],
    guaranteedAnalysis: {
      crudeProteinMin: '15.00%',
      crudeFatMin: '5.00%',
      crudeFiberMax: '15.00%',
      calciumMin: '0.70%',
      calciumMax: '1.00%',
      phosphorusMin: '0.40%',
      copperMin: '15 ppm',
      seleniumMin: '0.3 ppm',
      zincMin: '30 ppm',
      vitaminEMin: '150 I.U./lb.'
    },
    feedingDirections: 'Feed along with hay or pasture. Typical feeding rates are 0.40% to 0.80% of horse bodyweight per horse per day.',
    recommendedUses: ['Use as creep feed', 'Use up to 3 years old', 'Last 3 months of pregnancy']
  },
  {
    id: 'summit',
    name: 'SUMMIT®',
    category: Category.PERFORMANCE,
    description: 'Peak performance horse feed for working and competition. High energy for endurance.',
    price: 49.50,
    image: 'https://images.unsplash.com/photo-1534067783941-51c9c23ecefd?auto=format&fit=crop&q=80&w=800',
    tags: ['Competition', 'High Energy', 'Performance'],
    ingredients: ['Pulverized Oats', 'Corn', 'Soybean Meal', 'Soybean Hulls', 'Wheat Middlings', 'Soy Oil', 'Calcium Bentonite Clay'],
    guaranteedAnalysis: {
      crudeProteinMin: '14.00%',
      crudeFatMin: '10.00%',
      crudeFiberMax: '12.00%',
      calciumMin: '0.60%',
      calciumMax: '0.90%',
      phosphorusMin: '0.45%',
      copperMin: '20 ppm',
      seleniumMin: '0.3 ppm',
      zincMin: '40 ppm'
    }
  },
  {
    id: 'thrive',
    name: 'THRIVE®',
    category: Category.MAINTENANCE,
    description: 'The versatile horse feed for most adults. Maintain condition and vitality for pleasure and light work horses.',
    price: 42.00,
    image: 'https://images.unsplash.com/photo-1598974357801-cbca100e65d3?auto=format&fit=crop&q=80&w=800',
    tags: ['Maintenance', 'Pleasure', 'Adult'],
    ingredients: ['Soybean Hulls', 'Wheat Middlings', 'Pulverized Oats', 'Soybean Meal', 'Corn', 'Soy Oil', 'Calcium Bentonite Clay'],
    guaranteedAnalysis: {
      crudeProteinMin: '12.00%',
      crudeFatMin: '5.00%',
      crudeFiberMax: '18.00%',
      calciumMin: '0.50%',
      calciumMax: '0.80%',
      phosphorusMin: '0.40%',
      copperMin: '15 ppm',
      seleniumMin: '0.3 ppm',
      zincMin: '30 ppm'
    }
  },
  {
    id: 'renu',
    name: 'ReNu®',
    category: Category.SPECIAL_NEEDS,
    description: 'The best feed for foundered horses. Low NSC formulation designed to support metabolic health and hoof recovery.',
    price: 58.75,
    image: 'https://images.unsplash.com/photo-1601989398731-299a4dc27acc?auto=format&fit=crop&q=80&w=800',
    tags: ['Low NSC', 'Founder Safe', 'Metabolic'],
    ingredients: ['Soybean Hulls', 'Beet Pulp', 'Soybean Meal', 'Wheat Middlings', 'Soy Oil', 'Calcium Bentonite Clay'],
    guaranteedAnalysis: {
      crudeProteinMin: '11.00%',
      crudeFatMin: '3.00%',
      crudeFiberMax: '25.00%',
      calciumMin: '0.80%',
      calciumMax: '1.20%',
      phosphorusMin: '0.50%'
    }
  },
  {
    id: 'silver',
    name: 'SILVER®',
    category: Category.SENIOR,
    description: 'The advanced horse feed for older adults and revitalization. Highly digestible.',
    price: 46.50,
    image: 'https://images.unsplash.com/photo-1505933332464-42bc38b8577d?auto=format&fit=crop&q=80&w=800',
    tags: ['Senior', 'Digestible', 'Aged Horse'],
    ingredients: ['Soybean Hulls', 'Wheat Middlings', 'Soybean Meal', 'Pulverized Oats', 'Beet Pulp', 'Soy Oil', 'Calcium Bentonite Clay'],
    guaranteedAnalysis: {
      crudeProteinMin: '14.00%',
      crudeFatMin: '7.00%',
      crudeFiberMax: '20.00%',
      calciumMin: '0.70%',
      calciumMax: '1.00%',
      phosphorusMin: '0.50%'
    }
  },
  {
    id: 'mineral-salt',
    name: 'Loose Mineral Sea Salt',
    category: Category.SUPPLEMENTS,
    description: 'Free choice loose salt for optimal hydration and mineral balance.',
    price: 18.00,
    image: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&q=80&w=800',
    tags: ['Supplement', 'Hydration', 'Minerals'],
    ingredients: ['Natural Mineral Sea Salt'],
    guaranteedAnalysis: {
      crudeProteinMin: '0%',
      crudeFatMin: '0%',
      crudeFiberMax: '0%'
    }
  }
];
