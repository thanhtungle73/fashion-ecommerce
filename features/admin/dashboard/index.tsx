import { firebase } from '@/app/firebase-client';
import CustomCard from '@/components/common/custom-card';
import LoadingModal from '@/components/Loading';
import { OrderData, ProductData } from '@/models';
import { Grid, Row, Text } from '@nextui-org/react';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import DoughnutChart from './components/dashboard-doughnut-chart';
import DashboardLargeCards from './components/dashboard-lg-cards';
import DashboardSmallCards from './components/dashboard-sm-cards';
import VerticalBarChart from './components/dashboard-vertical-bar-chart';

export interface DashboardFeatureProps {}

export default function DashboardFeature(props: DashboardFeatureProps) {
  const [loading, setLoading] = useState(false);
  const [orderArrayList, setOrderArrayList] = useState<
    Array<OrderData | firebase.firestore.DocumentData>
  >([]);
  const [productArrayList, setProductArrayList] = useState<
    Array<ProductData | firebase.firestore.DocumentData>
  >([]);

  const orderListCurrentYear = orderArrayList.filter(
    (x) => moment(x.createdAt).year() === moment().year()
  );

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const fireStore = firebase.firestore();
        let orderListData: Array<OrderData | firebase.firestore.DocumentData> = [];
        let productListData: Array<ProductData | firebase.firestore.DocumentData> = [];
        const orderQuerySnapshot = await fireStore.collection('orders').get();
        orderQuerySnapshot.forEach((doc) => {
          orderListData.push({ ...doc.data(), id: doc.id });
        });

        const productQuerySnapshot = await fireStore.collection('products').get();
        productQuerySnapshot.forEach((doc) => {
          productListData.push({ ...doc.data(), id: doc.id });
        });

        setProductArrayList(productListData);
        setOrderArrayList(orderListData);
      } catch (error) {
        console.log('Failed to get all products by: ', error);
      }
      setLoading(false);
    })();
  }, []);

  if (loading) return <LoadingModal />;

  return (
    <>
      <Row>
        <Text size={18} b css={{ margin: '24px 6px' }}>
          Dashboard Review
        </Text>
      </Row>

      <Row>
        <DashboardLargeCards orderArrayList={orderListCurrentYear} />
      </Row>

      <Row css={{ margin: '32px auto' }}>
        <DashboardSmallCards orderArrayList={orderListCurrentYear} />
      </Row>

      <Row>
        <Grid.Container gap={1} css={{ height: '100%' }}>
          <Grid xs={12} md={6}>
            <CustomCard css={{ height: '100%', borderRadius: 8 }}>
              <Text size={16} b css={{ marginBottom: '16px', textAlign: 'center' }}>
                Orders In This Year
              </Text>
              <VerticalBarChart orderListCurrentYear={orderListCurrentYear} />
            </CustomCard>
          </Grid>

          <Grid xs={12} md={6}>
            <CustomCard css={{ height: '100%', borderRadius: 8, padding: '0 96px' }}>
              <Row justify="center">
                <Text size={16} b css={{ marginBottom: '16px' }}>
                  Products In Category
                </Text>
                <Text
                  size={14}
                  css={{ marginLeft: '8px' }}
                >{`(${productArrayList.length} products)`}</Text>
              </Row>
              <DoughnutChart productArrayList={productArrayList} />
            </CustomCard>
          </Grid>
        </Grid.Container>
      </Row>
    </>
  );
}
