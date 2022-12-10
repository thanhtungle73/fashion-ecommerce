import CustomCard from '@/components/common/custom-card';
import { OrderData } from '@/models';
import { formatPrice } from '@/utils';
import { Grid, Row, Text } from '@nextui-org/react';
import * as React from 'react';
import { firebase } from '@/app/firebase-client';
import moment from 'moment';

export interface DashboardLargeCardsProps {
  orderArrayList: Array<OrderData | firebase.firestore.DocumentData>;
}

export default function DashboardLargeCards({ orderArrayList }: DashboardLargeCardsProps) {
  const orderListCurrentMonth = orderArrayList.filter(
    (x) => moment(x.createdAt).month() === moment().month()
  );
  const orderListCurrentDate = orderListCurrentMonth.filter(
    (x) => moment(x.createdAt).date() === moment().date()
  );

  const totalPriceCurrentMonth = orderListCurrentMonth.reduce(
    (total, current) => Number(total) + Number(current.totalPrice),
    0
  );
  const totalPriceCurrentDate = orderListCurrentDate.reduce(
    (total, current) => Number(total) + Number(current.totalPrice),
    0
  );

  const totalOrderPrice = orderArrayList.reduce(
    (total, current) => Number(total) + Number(current.totalPrice),
    0
  );

  return (
    <Grid.Container gap={1}>
      <Grid sm={4} xs={12}>
        <CustomCard css={{ p: 24, borderRadius: 8, background: '#0694a2', color: '$white' }}>
          <Row justify="center" align="center" css={{ fontSize: '24px' }}>
            <i className="fa-solid fa-layer-group"></i>
          </Row>
          <Text size={16} css={{ margin: '12px auto', color: '$white' }}>
            Today Order
          </Text>
          <Text size={24} b css={{ margin: 'auto', color: '$white' }}>
            {formatPrice(totalPriceCurrentDate ?? 0)}
          </Text>
        </CustomCard>
      </Grid>

      <Grid sm={4} xs={12}>
        <CustomCard css={{ p: 24, borderRadius: 8, background: '#3f83f8', color: '$white' }}>
          <Row justify="center" align="center" css={{ fontSize: '24px' }}>
            <i className="fa-solid fa-cart-shopping"></i>
          </Row>
          <Text size={16} css={{ margin: '12px auto', color: '$white' }}>
            This Month
          </Text>
          <Text size={24} b css={{ margin: 'auto', color: '$white' }}>
            {formatPrice(totalPriceCurrentMonth ?? 0)}
          </Text>
        </CustomCard>
      </Grid>

      <Grid sm={4} xs={12}>
        <CustomCard css={{ p: 24, borderRadius: 8, background: '#0e9f6e', color: '$white' }}>
          <Row justify="center" align="center" css={{ fontSize: '24px' }}>
            <i className="fa-regular fa-credit-card"></i>
          </Row>
          <Text size={16} css={{ margin: '12px auto', color: '$white' }}>
            Total Order
          </Text>
          <Text size={24} b css={{ margin: 'auto', color: '$white' }}>
            {formatPrice(totalOrderPrice ?? 0)}
          </Text>
        </CustomCard>
      </Grid>
    </Grid.Container>
  );
}
