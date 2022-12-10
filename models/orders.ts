import { ProductData } from '@/models';

export interface OrderData {
  id: string;
  address: string;
  city: string;
  createdAt: number;
  email: string;
  firstName: string;
  lastName: string;
  phone: number;
  productList: Array<ProductData>;
  totalPrice: number;
  status: 'active' | 'processing' | 'picked up' | 'delivered' | 'canceled' | 'refunded' | 'failed';
}
