import { fireStore } from '@/app/firebase-admin';
import Seo from '@/components/common/seo';
import ShopComponent from 'features/shop';
import { PaginationQuery } from 'models';
import { GetServerSideProps } from 'next';
import * as React from 'react';
import { getAllData, getDataWithPagination } from 'services/product.service';

export interface IShopPageProps {
  products: Array<any>;
  categories: Array<any>;
  pagination: PaginationQuery;
}

export default function ShopPage({
  products = [],
  categories = [],
  pagination = { page: 1, limit: 5, total: 10 },
}: IShopPageProps) {
  return (
    <>
      <Seo
        data={{
          title: 'LTT E-commerce | Online Shopping',
          description: 'Clothes list with all you need, free ship and more promotion.',
          url: 'http://localhost:3000/shop?_page=1&_limit=5&_sort=salePrice%3Aasc',
          thumbnailUrl:
            'https://img.jakpost.net/c/2020/02/18/2020_02_18_86872_1582000199._large.jpg',
        }}
      />
      <ShopComponent products={products} categories={categories} pagination={pagination} />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { query } = context;
  const { _page, _limit, _sort, ...filters } = query;

  const { productData, totalCount } = await getDataWithPagination(
    fireStore,
    'products',
    Number(_page),
    Number(_limit),
    _sort,
    filters
  );

  const categoryList = await getAllData(fireStore, 'products-categories', 10);

  return {
    props: {
      products: productData ? productData : [],
      categories: categoryList,
      pagination: {
        page: Number(query?._page) || 1,
        limit: Number(query?._limit) || 5,
        total: Number(totalCount),
      },
    },
  };
};
