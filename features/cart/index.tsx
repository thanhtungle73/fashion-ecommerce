import { CART_CHECKOUT_PATH } from '@/constants';
import { formatPrice } from '@/utils/common';
import { Button, Card, Container, Grid, Image, Row, Text } from '@nextui-org/react';
import { useCartContext } from 'contexts';
import { useRouter } from 'next/router';
import * as React from 'react';
import CartQuantityForm from './components/cart-quantity-form';
import CartTotals from './components/cart-totals';

export interface CartFeatureProps {}

export default function CartFeature(props: CartFeatureProps) {
  const router = useRouter();
  const { cartItems, removeFromCart } = useCartContext();

  const handleProductClick = (id: string) => {
    router.push(`/shop/product-details/${id}`);
  };

  const totalProductCount = cartItems.reduce((count, item) => count + Number(item.quantity), 0);
  const totalPrice = cartItems.reduce(
    (total, item) => total + Number(item.quantity) * Number(item.product.salePrice),
    0
  );

  const onCheckoutClick = () => {
    router.push(CART_CHECKOUT_PATH);
  };

  return (
    <Container md>
      <Row align="center">
        <Text h4 css={{ margin: '24px 0' }}>
          My Cart
        </Text>
        <Text size={14} margin={1}>{`( ${totalProductCount} products )`}</Text>
      </Row>

      <Grid.Container gap={1}>
        <Grid md={8} sm={12} xs={12}>
          <Card
            shadow={false}
            css={{
              borderRadius: 2,
              background: '$grey1',
            }}
          >
            {cartItems.length > 0 ? (
              cartItems.map((item) => (
                <Grid.Container
                  key={item.id}
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
                    <Text css={{ fontWeight: 600 }}>{formatPrice(item.product.salePrice)}</Text>

                    <CartQuantityForm quantity={item.quantity} productId={item.id} />

                    <Button
                      light
                      auto
                      css={{ margin: '0 8px' }}
                      onClick={() => removeFromCart(item.id)}
                    >
                      <i className="fa-solid fa-trash"></i>
                    </Button>
                  </Grid>
                </Grid.Container>
              ))
            ) : (
              <Text size={16} css={{ textAlign: 'center' }}>
                There are no products in your cart!
              </Text>
            )}
          </Card>
        </Grid>

        {cartItems.length > 0 && (
          <Grid md={4} sm={6} xs={12}>
            <CartTotals totalPrice={totalPrice} onCheckoutClick={onCheckoutClick} />
          </Grid>
        )}
      </Grid.Container>
    </Container>
  );
}

/* 
    - Details page
    - Click add to cart -> Open mini cart
    - Click Buy -> Go to Cart page

    Cart:
    - showMiniCart in context: true/false
    - CartItems: product, quantity
        + cartItemsCount: not saved in context
        + cartTotal: not saved in context

    data: [
        {
            id: 1,
            product: {},
            quantity: 1,
            size: s,
            color: yellow
        }
    ]
*/
