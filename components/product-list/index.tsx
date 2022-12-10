import { Grid, Text } from '@nextui-org/react';
import Product from 'components/product';
import * as React from 'react';

export interface IProductListProps {
  products: Array<any>;
  md: number;
}

export default function ProductList({ products, md }: IProductListProps) {
  return (
    <Grid.Container gap={1}>
      {products ? (
        products.map((product: any, index: number) => (
          <Grid
            key={product.id}
            md={md}
            sm={4}
            xs={6}
            css={{
              'div.product-hover:hover': {
                boxShadow: '0 2px 20px  rgba(0, 0, 0, 0.1)',
              },
            }}
          >
            <Product product={product} />
          </Grid>
        ))
      ) : (
        <Text css={{ textAlign: 'center ' }}>Opps! There are no products to display</Text>
      )}
    </Grid.Container>
  );
}
