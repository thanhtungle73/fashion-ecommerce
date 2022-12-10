import { ProductData } from '@/models';
import { CategoryData } from '@/models/category';
import { Container } from '@nextui-org/react';
import * as React from 'react';
import Category from './components/category';
import Product from './components/products';
import Slider from './components/slider';

export interface IHomeComponentProps {
  products: Array<ProductData>;
  categories: Array<CategoryData>;
}

export default function HomeComponent({ products, categories }: IHomeComponentProps) {
  return (
    <Container fluid css={{ p: 0 }}>
      <Slider />
      <Container md>
        <Category categories={categories} />
        <Product products={products} />
      </Container>
    </Container>
  );
}
