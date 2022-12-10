import ColorsField from '@/components/form-controls/colors-field';
import QuantityField from '@/components/form-controls/quantity-field';
import SizeField from '@/components/form-controls/sizes-field';
import { ProductData } from '@/models/products';
import { Button, Spacer } from '@nextui-org/react';
import { useRouter } from 'next/router';
import React from 'react';
import { useForm } from 'react-hook-form';

export interface AddToCardFormProps {
  product: ProductData;
  onSubmit: (values: any) => void;
}

export default function AddToCardForm(props: AddToCardFormProps) {
  const router = useRouter();
  const { product, onSubmit } = props;

  const form = useForm({
    defaultValues: {
      quantity: 1,
      size: 's',
      color: 'black',
    },
  });

  const handleFormSubmit = async (values: any) => {
    if (!onSubmit) return;

    await onSubmit(values);
  };

  const handleFormSubmitAndNavigate = (e: React.MouseEvent) => {
    e.preventDefault();
    router.push('/cart');
    return form.handleSubmit(handleFormSubmit)();
  };

  return (
    <form style={{ margin: '16px 0 0' }} onSubmit={form.handleSubmit(handleFormSubmit)}>
      <SizeField form={form} name="size" label="Sizes" product={product} />
      <ColorsField form={form} name="color" label="Colors" product={product} />
      <QuantityField form={form} name="quantity" label="Quantity:" />

      <Button
        type="submit"
        bordered
        size="md"
        css={{ minWidth: '80%', marginTop: '32px', borderRadius: 2, fontWeight: 'bold' }}
      >
        Add To Cart
      </Button>

      <Spacer y={0.5} />

      <Button
        type="submit"
        size="md"
        onClick={(e) => handleFormSubmitAndNavigate(e)}
        css={{ minWidth: '80%', borderRadius: 2, fontWeight: 'bold' }}
      >
        Buy Now
      </Button>
    </form>
  );
}
