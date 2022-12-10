import { Grid, Row } from '@nextui-org/react';
import * as React from 'react';
import AdminCategory from './components/admin-category';

export interface AdminFeatureProps {}

export default function AdminFeature(props: AdminFeatureProps) {
  return (
    <Row>
      <Grid.Container gap={1}>
        <Grid md={2.4}>
          <AdminCategory />
        </Grid>
        <Grid md={9.6}></Grid>
      </Grid.Container>
    </Row>
  );
}
