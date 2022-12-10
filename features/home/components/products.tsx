import { Button, Text } from '@nextui-org/react';
import ProductList from 'components/product-list';
import { useRouter } from 'next/router';
import * as React from 'react';

export interface IProductProps {
  products: Array<any>;
}

export default function Product({ products }: IProductProps) {
  const router = useRouter();

  return (
    <>
      <Text h3 css={{ textAlign: 'center', margin: '32px auto 48px' }}>
        New Arrivals
      </Text>

      <ProductList products={products} md={3} />

      <Button
        auto
        css={{ margin: '32px auto', color: '#999', borderColor: '#999' }}
        light
        bordered
        onClick={() => router.push('/shop?_page=1&_limit=5&_sort=salePrice:asc')}
      >
        View more...
      </Button>
    </>
  );
}
