import { Card, Container, Grid, Pagination } from '@nextui-org/react';
import ProductList from 'components/product-list';
import { PaginationQuery } from 'models';
import { useRouter } from 'next/router';
import React, { useEffect, useRef } from 'react';
import FilterCategory from './components/filter-category';
import FilterService from './components/filter-service';
import ShopSort from './components/shop-sort';

interface QueryParams {
  _page: number | string | string[];
  _limit: number | string | string[];
  _sort: string | string[];
  isFreeShip?: boolean;
  isPromotion?: boolean;
  isNew?: boolean;
  isBestSeller?: boolean;
}

export interface ShopComponentProps {
  products: Array<any>;
  categories: Array<any>;
  pagination: PaginationQuery;
}

export default function ShopComponent({ products, categories, pagination }: ShopComponentProps) {
  const router = useRouter();
  const queryParamsRef = useRef<QueryParams>({
    _page: router.query?._page || 1,
    _limit: router.query?._limit || 5,
    _sort: router.query?._sort || 'salePrice:asc',
  });

  useEffect(() => {
    if (!router.isReady) return;

    const queryParams = {
      ...router.query,
      ...queryParamsRef.current,
      _page: router.query?._page || 1,
      _limit: router.query?._limit || 5,
      _sort: router.query?._sort || 'salePrice:asc',
      isFreeShip: router.query?.isFreeShip === 'true',
      isPromotion: router.query?.isPromotion === 'true',
      isNew: router.query?.isNew === 'true',
      isBestSeller: router.query?.isBestSeller === 'true',
    };

    queryParamsRef.current = queryParams;
  }, [router.isReady, router.query]);

  const handlePageChange = (page: number) => {
    const filters = {
      ...queryParamsRef.current,
      _page: page,
    };

    queryParamsRef.current = filters;

    // Passing an URL object.
    router.push({
      pathname: router.pathname,
      query: filters,
    });
  };

  const handleSortChange = (newValue: string) => {
    // Remove all filters before sort.
    const { _page, _limit } = queryParamsRef.current;
    const filters = {
      _page,
      _limit,
      _sort: newValue,
    };

    queryParamsRef.current = filters;

    router.push({
      pathname: router.pathname,
      query: filters,
    });
  };

  const handleFilterChange = (filters: any) => {
    const newFilters = {
      ...queryParamsRef.current,
      ...filters,
      _sort: 'salePrice:asc',
    };

    queryParamsRef.current = newFilters;

    router.push({
      pathname: router.pathname,
      query: newFilters,
    });
  };

  const handleCategoryChange = (name: string) => {
    const newFilters = {
      ...queryParamsRef.current,
      category: name,
    };

    delete newFilters.isBestSeller;
    delete newFilters.isFreeShip;
    delete newFilters.isNew;
    delete newFilters.isPromotion;

    queryParamsRef.current = newFilters;

    router.push({
      pathname: router.pathname,
      query: newFilters,
    });
  };

  return (
    <Container md>
      <Grid.Container gap={0.8} css={{ paddingTop: '36px' }}>
        <Grid md={2.4}>
          <Card shadow={false} css={{ borderRadius: '2px' }}>
            <FilterCategory categories={categories} onClick={handleCategoryChange} />
            <FilterService onChange={handleFilterChange} />
          </Card>
        </Grid>

        <Grid md={9.6}>
          <Card shadow={false} css={{ borderRadius: '2px' }}>
            <Card.Header>
              <ShopSort
                pagination={pagination}
                currentSort={queryParamsRef.current._sort}
                onChange={handleSortChange}
              />
            </Card.Header>

            <ProductList products={products} md={4} />

            <div style={{ margin: '32px auto' }}>
              <Pagination
                total={
                  pagination?.total && pagination?.limit
                    ? Math.ceil(pagination.total / pagination.limit)
                    : 1
                }
                initialPage={pagination.page}
                rounded
                animated={false}
                onChange={handlePageChange}
              />
            </div>
          </Card>
        </Grid>
      </Grid.Container>
    </Container>
  );
}
