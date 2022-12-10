import { useCartContext } from '@/contexts';
import { Container, Grid } from '@nextui-org/react';
import * as React from 'react';
import CartInformation from './components/cart-infomation';
import CartSummary from './components/cart-summary';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { CART_ORDERED_PATH } from '@/constants';
import { firebase } from '../../../app/firebase-client';
import { collection, doc, setDoc } from 'firebase/firestore';

export interface CheckoutFeatureProps {}

export default function CheckoutFeature(props: CheckoutFeatureProps) {
  const { cartItems, removeAllFromCart } = useCartContext();
  const fireStore = firebase.firestore();
  const router = useRouter();

  const schema = yup
    .object({
      email: yup
        .string()
        .email('Please enter your valid email.')
        .required('This is required field.'),
      firstName: yup.string().required('This is required field.'),
      lastName: yup.string().required('This is required field.'),
      address: yup.string().required('This is required field.'),
      city: yup.string().required('This is required field.'),
      phone: yup
        .number()
        .integer('Please enter the valid number.')
        .min(6, 'Please enter at least 6 numbers')
        .required('This is required field.'),
    })
    .required();

  const form = useForm({
    defaultValues: {
      email: '',
      firstName: '',
      lastName: '',
      address: '',
      city: '',
      phone: '',
    },
    reValidateMode: 'onSubmit',
    resolver: yupResolver(schema),
  });

  const totalPrice = cartItems.reduce(
    (total, item) => total + Number(item.quantity) * Number(item.product.salePrice),
    0
  );

  const onSubmitClick = async (values: any) => {
    const newValue = {
      ...values,
      productList: cartItems,
      totalPrice,
      createdAt: Date.now(),
      status: 'processing',
    };
    const newOrderRef = doc(collection(fireStore, 'orders'));
    await setDoc(newOrderRef, newValue);
    console.log('newValue: ', newValue);

    removeAllFromCart();
    router.push(CART_ORDERED_PATH);
  };

  return (
    <Container>
      <Grid.Container>
        <Grid md={6} css={{ marginTop: '24px' }}>
          <CartInformation form={form} onSubmitClick={onSubmitClick} />
        </Grid>
        <Grid md={6} css={{ marginTop: '24px' }}>
          <CartSummary cartItems={cartItems} totalPrice={totalPrice} />
        </Grid>
      </Grid.Container>
    </Container>
  );
}
