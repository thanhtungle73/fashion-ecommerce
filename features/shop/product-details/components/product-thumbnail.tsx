import { Container, Grid, Row } from '@nextui-org/react';
import Image from 'next/image';
import * as React from 'react';

export interface IProductThumbnailProps {
  product: any;
}

export default function ProductThumbnail({ product }: IProductThumbnailProps) {
  return (
    <Grid.Container gap={1}>
      <Grid md={2} sm={2} xs={2}>
        <Container fluid css={{ padding: 0 }}>
          {product.thumbnailUrls.length &&
            product.thumbnailUrls.map((imgUrl: string, index: number) => (
              <Row key={index} css={{ marginBottom: '16px', flexShrink: 0 }}>
                <div style={{ width: '100%', cursor: 'pointer' }}>
                  <Image
                    src={imgUrl}
                    width="100px"
                    height="150px"
                    alt="product images"
                    layout="responsive"
                  ></Image>
                </div>
              </Row>
            ))}
        </Container>
      </Grid>

      <Grid md={10} sm={10} xs={10}>
        <Container fluid css={{ ':hover': { cursor: 'pointer' } }}>
          <div style={{ border: '1px solid #eee' }}>
            <Image
              src={product.thumbnailUrls[0]}
              width="100px"
              height="150px"
              alt="product image"
              layout="responsive"
            ></Image>
          </div>
        </Container>
      </Grid>
    </Grid.Container>
  );
}
