import ProductList from '@/components/product-list';
import { ProductData } from '@/models/products';
import { Col, Container, Divider, Grid, Row, Spacer, Text } from '@nextui-org/react';
import { useCartContext } from 'contexts';
import Router, { useRouter } from 'next/router';
import React from 'react';
import ProductInfo from './components/product-info';
import ProductThumbnail from './components/product-thumbnail';

export interface ProductDetailsProps {
  product: ProductData;
  relatedProducts: any;
}

export default function ProductDetails({ product, relatedProducts }: ProductDetailsProps) {
  const { addToCart, showCart } = useCartContext();

  const onSubmitQuantity = async (values: any) => {
    const newProduct = { id: product.id, product, ...values };

    addToCart(newProduct);
    showCart();
  };

  return (
    <Container md css={{ mt: 24, p: 0 }}>
      <Row>
        <Grid.Container justify="center" gap={4}>
          <Grid xs={12} sm={6} md={6}>
            <ProductThumbnail product={product} />
          </Grid>

          <Grid xs={12} sm={6} md={6}>
            <ProductInfo product={product} onSubmit={onSubmitQuantity} />
          </Grid>
        </Grid.Container>
      </Row>

      <Spacer y={3} />

      <Divider />

      <Row css={{ margin: '16px auto' }}>
        <Text h4>You May Also Like</Text>
      </Row>

      <Row>
        <ProductList products={relatedProducts} md={2.4} />
      </Row>
    </Container>
  );
}
