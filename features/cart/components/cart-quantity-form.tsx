import QuantityField from '@/components/form-controls/quantity-field';
import { FieldValue } from '@/models/products';
import { useCartContext } from 'contexts';
import * as React from 'react';
import { useForm } from 'react-hook-form';

export interface CartQuantityFormProps {
  quantity: number;
  productId: string;
}

export default function CartQuantityForm({ quantity = 1, productId }: CartQuantityFormProps) {
  const { setQuantity } = useCartContext();
  const form = useForm({
    defaultValues: {
      quantity: quantity,
    },
  });

  const handleClick = (value: FieldValue) => {
    if (setQuantity) setQuantity(productId, value);
  };

  return (
    <>
      <QuantityField form={form} name="quantity" label="" onClick={handleClick} />
    </>
  );
}
