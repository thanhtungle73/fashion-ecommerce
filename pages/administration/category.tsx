import CustomCard from '@/components/common/custom-card';
import { AdminLayout } from '@/components/layout/admin';
import AdministrationCategory from '@/features/admin/category';
import AdminCategory from '@/features/admin/components/admin-category';
import { Container, Grid } from '@nextui-org/react';
import * as React from 'react';

export interface CategoryProps {}

export default function Category(props: CategoryProps) {
  return (
    <Container fluid css={{ margin: '36px 0 200px' }}>
      <Grid.Container gap={1}>
        <Grid md={2} xs={12}>
          <AdminCategory />
        </Grid>

        <Grid md={10}>
          <CustomCard css={{ background: '$accents1', borderRadius: 8 }}>
            <AdministrationCategory />
          </CustomCard>
        </Grid>
      </Grid.Container>
    </Container>
  );
}

Category.Layout = AdminLayout;
