import { CategoryData } from './category';

export interface PaginationQuery {
  page: number | undefined;
  limit: number | undefined;
  total: number | undefined;
}

export interface ProductData {
  id: string;
  title: string | null;
  category: CategoryData;
  colors: Array<string>;
  description: string;
  isBestSeller: boolean;
  isFreeShip: boolean;
  isNew: boolean;
  isPromotion: boolean;
  name: string | null;
  originalPrice: number | null;
  productId: number | null;
  promotionPercent: number | null;
  salePrice: number | null;
  shortDescription: string | null;
  sizes: Array<String>;
  soldQuantity: number | null;
  thumbnailUrls: Array<string>;
}

export interface FieldValue {
  quantity: number;
}

export interface CartItemData {
  id: string;
  product: ProductData;
  quantity: number;
  size: string;
  color: string;
}
