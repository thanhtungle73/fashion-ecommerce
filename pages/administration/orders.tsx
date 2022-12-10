import CustomCard from '@/components/common/custom-card';
import { AdminLayout } from '@/components/layout/admin';
import AdminCategory from '@/features/admin/components/admin-category';
import OrdersFeature from '@/features/admin/orders';
import { Container, Grid } from '@nextui-org/react';
import * as React from 'react';

export interface OrdersProps {}

export default function Orders(props: OrdersProps) {
  return (
    <Container fluid css={{ margin: '36px 0 200px' }}>
      <Grid.Container gap={1}>
        <Grid md={2} xs={12}>
          <AdminCategory />
        </Grid>
        <Grid md={10}>
          <CustomCard css={{ background: '$accents1', borderRadius: 8 }}>
            <OrdersFeature />
          </CustomCard>
        </Grid>
      </Grid.Container>
    </Container>
  );
}

Orders.Layout = AdminLayout;
