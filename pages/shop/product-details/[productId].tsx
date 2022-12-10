import { fireStore } from '@/app/firebase-admin';
import ProductDetails from '@/features/shop/product-details';
import { getDataWithPagination, getProduct } from '@/services/product.service';
import { GetServerSideProps } from 'next';
import * as React from 'react';

export interface ProductDetailsProps {
  product: any;
  relatedProducts: any;
}

export default function ProductDetailsPage({ product, relatedProducts }: ProductDetailsProps) {
  return (
    <div>
      <ProductDetails product={product} relatedProducts={relatedProducts} />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const productId = context.query.productId as string;

  const product = await getProduct(fireStore, 'products', productId);

  const { productData } = await getDataWithPagination(
    fireStore,
    'products',
    1,
    5,
    'isNew:desc',
    {}
  );

  return {
    props: {
      product: product ? { ...product, id: productId } : {},
      relatedProducts: productData ? productData : {},
    },
  };
};
