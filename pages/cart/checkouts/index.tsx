import CheckoutFeature from '@/features/cart/checkout';
import * as React from 'react';

export interface CheckoutPageProps {}

export default function CheckoutPage(props: CheckoutPageProps) {
  return (
    <>
      <CheckoutFeature />
    </>
  );
}
