import { formatPrice } from '@/utils/index';
import { Card, Container, Image, Text } from '@nextui-org/react';
import { useRouter } from 'next/router';
import * as React from 'react';

export interface IProductProps {
  product: any;
}

export default function Product({ product }: IProductProps) {
  const router = useRouter();
  const handleClick = () => {
    router.push(`shop/product-details/${product.id}`);
  };
  return (
    <Container
      className="product-hover"
      style={{
        cursor: 'pointer',
        transition: '0.2s',
        position: 'relative',
        padding: 0,
      }}
      onClick={handleClick}
    >
      <Container fluid css={{ padding: 0, ' div': { borderRadius: 2 } }}>
        <Image
          src={product?.thumbnailUrls[0]}
          alt="product-image"
          showSkeleton
          css={{
            transition: '0.2s',
            '&:hover': {
              transform: 'scale(105%)',
            },
          }}
        ></Image>
      </Container>

      <div
        style={{
          position: 'absolute',
          top: '4%',
          left: 0,
          right: 0,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        {product?.isNew && (
          <Text
            size={14}
            css={{
              background: '#000',
              color: '#fff',
              padding: '3px',
              fontWeight: 600,
            }}
          >
            New
          </Text>
        )}
        {product?.isPromotion && (
          <Text
            size={14}
            css={{
              background: '#fff',
              color: '#FF3B30',
              fontWeight: 600,
              padding: '3px',
              marginLeft: 'auto',
            }}
          >
            - {product?.promotionPercent}%
          </Text>
        )}
      </div>

      <div style={{ textAlign: 'center', marginTop: '12px' }}>
        <Text h6 css={{ textTransform: 'uppercase' }}>
          {product?.name}
        </Text>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
            marginTop: '4px',
            paddingBottom: '12px',
          }}
        >
          {product?.promotionPercent ? (
            <Text size={15} css={{ textDecoration: 'line-through' }}>
              {formatPrice(product?.originalPrice)}
            </Text>
          ) : (
            ''
          )}

          {product?.promotionPercent ? (
            <Text size={16} css={{ color: '#FF3B30', fontWeight: 600 }}>
              {formatPrice(product?.salePrice)}
            </Text>
          ) : (
            <Text>{formatPrice(product?.originalPrice)}</Text>
          )}
        </div>
      </div>
    </Container>
  );
}
