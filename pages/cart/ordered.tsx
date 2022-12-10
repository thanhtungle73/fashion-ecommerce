import { Card, Container, Grid, Image, Row, Text } from '@nextui-org/react';
import * as React from 'react';

export interface OrderedPageProps {}

export default function OrderedPage(props: OrderedPageProps) {
  return (
    <Container fluid>
      <Grid.Container
        justify="center"
        alignItems="center"
        css={{ height: '100%', margin: '96px 0' }}
      >
        <Grid xs={12} sm={12} md={6}>
          <Card css={{ p: 36 }}>
            <Row css={{ marginBottom: '16px' }}>
              <Image
                src="https://firebasestorage.googleapis.com/v0/b/test-953fe.appspot.com/o/others%2Fcommon%2Fcongratulation.jpg?alt=media&token=ee1ac6ca-4dde-4244-a53d-ebd24d57c0c8"
                alt="success-image"
              />
            </Row>
            <Text size={24} css={{ textAlign: 'center' }}>
              Your order is completed!
            </Text>
            <Text size={16} css={{ textAlign: 'center' }} color="$gray500">
              You will be receiving a confirmation email with order details.
            </Text>
          </Card>
        </Grid>
      </Grid.Container>
    </Container>
  );
}
