import { CartItemData } from '@/models';
import { formatPrice } from '@/utils';
import { Card, Divider, Grid, Image, Row, Text } from '@nextui-org/react';
import { useRouter } from 'next/router';
import * as React from 'react';

export interface CartSummaryProps {
  cartItems: Array<CartItemData>;
  totalPrice: number;
}

export default function CartSummary({ cartItems, totalPrice }: CartSummaryProps) {
  const router = useRouter();

  const handleProductClick = (id: string) => {
    router.push(`/shop/product-details/${id}`);
  };

  return (
    <Card shadow={false} css={{ borderRadius: 0, background: '$gray100' }}>
      {cartItems.length > 0 ? (
        cartItems.map((item) => (
          <Row key={item.id}>
            <Grid.Container
              justify="flex-start"
              alignItems="center"
              css={{
                padding: '12px 0',
              }}
            >
              <Grid
                css={{
                  overflow: 'hidden',
                  border: '1px solid #ccc',
                  borderRadius: 8,
                  cursor: 'pointer',
                  width: '80px',
                  height: '80px',
                }}
              >
                <Image
                  src={item.product.thumbnailUrls[0]}
                  alt="product img"
                  width="80px"
                  height="80px"
                  onClick={() => handleProductClick(item.id)}
                />
              </Grid>

              <Grid
                css={{
                  margin: 'auto 12px',
                  flex: 1,
                  textOverflow: 'ellipsis',
                  textAlign: 'left',
                }}
              >
                <Text
                  size={16}
                  css={{ cursor: 'pointer' }}
                  onClick={() => handleProductClick(item.id)}
                >
                  {item.product.name}
                </Text>

                <Text size={14} css={{ color: '$gray600' }}>
                  Size {item.size} / {item.color}
                </Text>
              </Grid>

              <Grid css={{ display: 'flex', alignItems: 'center' }}>
                <Text size={14} css={{ marginRight: '14px' }}>
                  x {item.quantity}
                </Text>
                <Text css={{ fontWeight: 600 }}>{formatPrice(item.product.salePrice)}</Text>
              </Grid>
            </Grid.Container>
          </Row>
        ))
      ) : (
        <Text size={16} css={{ textAlign: 'center' }}>
          There are no products in your cart!
        </Text>
      )}

      <Divider />

      <Row
        justify="space-between"
        align="center"
        css={{
          padding: '8px 0',
        }}
      >
        <Text size={14}>Subtotal</Text>
        <Text size={14}>{formatPrice(totalPrice)}</Text>
      </Row>

      <Row
        justify="space-between"
        align="center"
        css={{
          padding: '8px 0',
        }}
      >
        <Text size={14}>Shipping</Text>
        <Text size={14}>Free</Text>
      </Row>

      <Divider />

      <Row justify="space-between" css={{ padding: '8px 0', marginBottom: '16px' }}>
        <Text size={14}>Total</Text>
        <Text size={14}>{formatPrice(totalPrice)}</Text>
      </Row>
    </Card>
  );
}
