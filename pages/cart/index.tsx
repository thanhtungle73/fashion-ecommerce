import CartFeature from '@/features/cart';
import * as React from 'react';

export interface CartPageProps {}

export default function CartPage(props: CartPageProps) {
  return (
    <>
      <CartFeature />
    </>
  );
}
