import { fireStore } from '@/app/firebase-admin';
import Seo from '@/components/common/seo';
import { ProductData } from '@/models';
import { CategoryData } from '@/models/category';
import HomeComponent from 'features/home';
import type { GetServerSideProps } from 'next';
import { FC } from 'react';
import { getDataWithPagination, getDataWithSingleFilter } from 'services/product.service';

interface IHomeProps {
  products: Array<ProductData>;
  categories: Array<CategoryData>;
}

const Home: FC<IHomeProps> = (props: IHomeProps) => {
  const { products, categories } = props;

  return (
    <div>
      <Seo
        data={{
          title: 'LTT E-commerce | Online Shopping',
          description: 'Clothes online shopping with free ship and more promotion.',
          url: 'http://localhost:3000/',
          thumbnailUrl:
            'https://bcp.cdnchinhphu.vn/334894974524682240/2022/2/17/vcysmr-1645082567806116713836.jpg',
        }}
      />
      <HomeComponent products={products} categories={categories} />
    </div>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { productData } = await getDataWithPagination(
    fireStore,
    'products',
    1,
    8,
    'isNew:desc',
    {}
  );

  const categoryList = await getDataWithSingleFilter(fireStore, 'products-categories', 4, {
    isPublished: true,
  });

  return {
    props: {
      products: productData ? productData : {},
      categories: categoryList ? categoryList : {},
    },
  };
};
