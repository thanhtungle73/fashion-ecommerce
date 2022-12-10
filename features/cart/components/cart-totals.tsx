import { formatPrice } from '@/utils';
import { Button, Card, Container, Divider, Input, Row, Text } from '@nextui-org/react';
import * as React from 'react';

export interface CartTotalsProps {
  totalPrice: number | null;
  onCheckoutClick: () => void;
}

export default function CartTotals({ totalPrice, onCheckoutClick }: CartTotalsProps) {
  const handleClick = () => {
    if (!onCheckoutClick) return;
    onCheckoutClick();
  };

  return (
    <>
      <Card
        shadow={false}
        css={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          borderRadius: 2,
          background: '$grey1',
        }}
      >
        <Text h5 css={{ margin: '24px 0', textAlign: 'center' }}>
          Cart Totals
        </Text>

        <Container style={{ marginBottom: 'auto' }}>
          <Row>
            <Input
              fullWidth
              shadow={false}
              animated={false}
              aria-label="coupon"
              placeholder="Gift card or discount code"
              css={{ marginBottom: '16px', p: 0 }}
            />
            <Button auto disabled css={{ marginLeft: '12px' }}>
              Apply
            </Button>
          </Row>
          <Row
            justify="space-between"
            align="center"
            css={{
              padding: '8px 0',
            }}
          >
            <Text size={16} css={{ fontWeight: 600 }}>
              Subtotal:
            </Text>
            <Text size={16}>{formatPrice(totalPrice)}</Text>
          </Row>

          <Divider />

          <Row justify="space-between" css={{ padding: '8px 0', marginBottom: '16px' }}>
            <Text size={16} css={{ fontWeight: 600 }}>
              Total:
            </Text>
            <Text size={16}>{formatPrice(totalPrice)}</Text>
          </Row>
        </Container>

        <Button css={{ borderRadius: 4, fontWeight: 600 }} onClick={handleClick}>
          Proceed To Checkout
        </Button>
      </Card>
    </>
  );
}
