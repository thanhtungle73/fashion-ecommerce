import { firebase } from '@/app/firebase-client';
import { OrderData } from '@/models';
import { Grid } from '@nextui-org/react';
import * as React from 'react';
import DashboardSmallCard from './dashboard-small-card';

export interface DashboardSmallCardsProps {
  orderArrayList: Array<OrderData | firebase.firestore.DocumentData>;
}

export default function DashboardSmallCards({ orderArrayList }: DashboardSmallCardsProps) {
  const processingOrderList = orderArrayList.filter((x) => x.status === 'processing');
  const pickedUpOrderList = orderArrayList.filter((x) => x.status === 'picked up');
  const deliveredOrderList = orderArrayList.filter((x) => x.status === 'delivered');

  const smallCardData = [
    {
      label: 'Total Order',
      quantity: orderArrayList.length,
      icon: <i className="fa-solid fa-cart-shopping"></i>,
      bgColor: '#ff5a1f',
    },
    {
      label: 'Order Processing',
      quantity: processingOrderList.length,
      icon: <i className="fa-solid fa-arrows-rotate"></i>,
      bgColor: '#3f83f8',
    },
    {
      label: 'Order Picked Up',
      quantity: pickedUpOrderList.length,
      icon: <i className="fa-solid fa-truck"></i>,
      bgColor: '#0694a2',
    },
    {
      label: 'Order Delivered',
      quantity: deliveredOrderList.length,
      icon: <i className="fa-solid fa-check"></i>,
      bgColor: '#0e9f6e',
    },
  ];

  return (
    <Grid.Container gap={1}>
      {smallCardData.map((card, index) => (
        <Grid md={3} key={index}>
          <DashboardSmallCard cardData={card} />
        </Grid>
      ))}
    </Grid.Container>
  );
}
