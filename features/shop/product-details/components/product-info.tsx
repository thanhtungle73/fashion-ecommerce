import { ProductData } from '@/models/products';
import { formatPrice } from '@/utils/common';
import { Card, Spacer, Text } from '@nextui-org/react';
import dynamic from 'next/dynamic';
import * as React from 'react';

export interface IProductInfoProps {
  product: ProductData;
  onSubmit: (values: any) => void;
}

const AddToCardFormClientSide = dynamic(() => import('./add-to-card-form'), { ssr: false });

export default function ProductInfo({ product, onSubmit }: IProductInfoProps) {
  return (
    <Card shadow={false} css={{ borderRadius: '2px', padding: 0 }}>
      <Text h4 css={{ textTransform: 'uppercase', marginBottom: '24px' }}>
        {product.name}
      </Text>

      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
        {product.promotionPercent ? (
          <Text size={20} margin="auto 0" css={{ textDecoration: 'line-through' }}>
            {formatPrice(product.originalPrice)}
          </Text>
        ) : (
          ''
        )}

        {product.promotionPercent ? (
          <Text margin="auto 16px" size={24} css={{ color: '#FF3B30', fontWeight: 'bold' }}>
            {formatPrice(product.salePrice)}
          </Text>
        ) : (
          <Text margin="auto 16px 0 0" size={24}>
            {formatPrice(product.salePrice)}
          </Text>
        )}

        {product.promotionPercent ? (
          <Text
            size={12}
            css={{
              background: '$black',
              color: 'white',
              padding: '2px 12px',
              borderRadius: 4,
            }}
          >{`-${product.promotionPercent}%`}</Text>
        ) : (
          ''
        )}
      </div>

      <AddToCardFormClientSide product={product} onSubmit={onSubmit} />

      <Spacer y={2} />

      <div
        dangerouslySetInnerHTML={{ __html: product.description }}
        style={{ fontSize: '14px' }}
      ></div>
    </Card>
  );
}
