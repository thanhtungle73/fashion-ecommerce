import { PLACEHOLDER_IMG_URL_300 } from '@/constants';
import { CategoryData } from '@/models/category';
import { Button, Grid, Image, Row, Text } from '@nextui-org/react';
import * as React from 'react';

export interface ICategoryProps {
  categories: Array<CategoryData>;
}

export default function Category({ categories }: ICategoryProps) {
  // Filter and sort ascending order.
  const sortedCategory = categories.sort((a, b) => a.order - b.order);

  return (
    <>
      <Text h3 css={{ textAlign: 'center', margin: '56px auto' }}>
        Category
      </Text>

      <Grid.Container
        gap={1}
        justify="center"
        alignItems="center"
        css={{
          display: 'flex',
          flexDirection: 'row',
          width: '100%',
          marginTop: '24px',
        }}
      >
        {sortedCategory &&
          sortedCategory.map((category) => (
            <Grid
              key={category.id}
              md={3}
              xs={4}
              sm={4}
              justify="center"
              alignItems="center"
              css={{ marginBottom: '32px', position: 'relative' }}
            >
              <Row
                css={{
                  p: 0,
                  position: 'relative',
                  cursor: 'pointer',
                  '& div': { borderRadius: 2 },
                  '&:hover img': {
                    transform: 'scale(105%)',
                  },
                }}
              >
                <Image
                  src={category.thumbnailUrl ?? PLACEHOLDER_IMG_URL_300}
                  alt="category-image"
                  height={370}
                  css={{ transition: '0.2s' }}
                />

                <Row
                  justify="space-between"
                  align="flex-end"
                  css={{
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    top: 0,
                    bottom: 0,
                    p: 12,
                    backgroundImage:
                      'linear-gradient(180deg, rgba(0, 0 ,0, 0.01) 70%, rgba(0, 0 ,0, 0.3))',
                    '& button:hover': { background: '$primary' },
                  }}
                >
                  <Text h4 css={{ color: '$accents1', textShadow: '0 1px 1px #000' }}>
                    {category.name}
                  </Text>
                  <Button
                    auto
                    light
                    size="sm"
                    css={{ color: '#fff', textShadow: '0 1px 1px #000' }}
                  >
                    Shop now
                    <i className="fa-solid fa-arrow-right-long" style={{ marginLeft: 8 }}></i>
                  </Button>
                </Row>
              </Row>
            </Grid>
          ))}
      </Grid.Container>
    </>
  );
}
