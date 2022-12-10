import { ProductData } from './products';

export interface CategoryData {
  id?: string;
  name: string | null;
  searchTerm: string;
  path: string;
  thumbnailUrl: string;
  products?: ProductData;
  isPublished?: boolean;
  order: number;
}
