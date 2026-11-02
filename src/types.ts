export type CategoryId = 'all' | 'bollywood' | 'techbro' | 'genz' | 'darkhumor';

export type Size = 'S' | 'M' | 'L' | 'XL' | 'XXL';

export interface Product {
  id: string;
  title: string;
  punchline: string;
  category: CategoryId;
  priceInr: number;
  originalPriceInr: number;
  image: string;
  hoverImage?: string;
  fit: string;
  fabricGsm: number;
  composition: string;
  printType: string;
  description: string;
  sizes: Size[];
  stockLeft: Record<Size, number>;
  rating: number;
  reviewsCount: number;
  featured?: boolean;
  tags: string[];
}

export interface CartItem {
  id: string;
  productId: string;
  product: Product;
  size: Size;
  quantity: number;
  isCustom?: boolean;
  customText?: string;
  customPlacement?: 'front' | 'back';
}

export interface StreetReel {
  id: string;
  title: string;
  location: string;
  model: string;
  image: string;
  productId: string;
  likes: string;
  vibe: string;
}

export interface Review {
  id: string;
  author: string;
  city: string;
  rating: number;
  date: string;
  headline: string;
  comment: string;
  verified: boolean;
  productTitle: string;
  sizeBought: Size;
}
