import CustomCard from '@/components/common/custom-card';
import { AdminLayout } from '@/components/layout/admin';
import AdminCategory from '@/features/admin/components/admin-category';
import AdministrationProducts from '@/features/admin/products';
import { Container, Grid } from '@nextui-org/react';
import * as React from 'react';

export interface ProductsProps {}

export default function Products(props: ProductsProps) {
  return (
    <Container fluid css={{ margin: '36px 0 200px' }}>
      <Grid.Container gap={1}>
        <Grid md={2} xs={12}>
          <AdminCategory />
        </Grid>
        <Grid md={10}>
          <CustomCard css={{ background: '$accents1', borderRadius: 8 }}>
            <AdministrationProducts />
          </CustomCard>
        </Grid>
      </Grid.Container>
    </Container>
  );
}

Products.Layout = AdminLayout;
