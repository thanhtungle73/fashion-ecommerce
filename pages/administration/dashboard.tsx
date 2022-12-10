import CustomCard from '@/components/common/custom-card';
import { AdminLayout } from '@/components/layout/admin';
import AdminCategory from '@/features/admin/components/admin-category';
import DashboardFeature from '@/features/admin/dashboard';
import { Container, Grid } from '@nextui-org/react';
import * as React from 'react';

export interface DashboardProps {}

export default function Dashboard(props: DashboardProps) {
  return (
    <Container fluid css={{ margin: '36px 0 200px', overflow: 'visible' }}>
      <Grid.Container gap={1}>
        <Grid md={2} xs={12}>
          <AdminCategory />
        </Grid>
        <Grid md={10}>
          <CustomCard css={{ background: '$accents1', borderRadius: 8, height: '120vh' }}>
            <DashboardFeature />
          </CustomCard>
        </Grid>
      </Grid.Container>
    </Container>
  );
}

Dashboard.Layout = AdminLayout;
