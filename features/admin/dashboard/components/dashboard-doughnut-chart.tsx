import * as React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Row } from '@nextui-org/react';
import { ProductData } from '@/models';
import { firebase } from '@/app/firebase-client';

ChartJS.register(ArcElement, Tooltip, Legend);

export interface DoughnutChartProps {
  productArrayList: Array<ProductData | firebase.firestore.DocumentData>;
}

export default function DoughnutChart({ productArrayList }: DoughnutChartProps) {
  const categoryList = productArrayList.map((x) => x.category.name) ?? [];
  // Remove duplicate in array.
  const labels = Array.from(new Set(categoryList));
  const numberOfProductsInCategory =
    labels.map((category) => productArrayList.filter((x) => x.category.name === category).length) ??
    [];

  const data = {
    labels,
    datasets: [
      {
        label: '',
        data: numberOfProductsInCategory,
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(255, 206, 86, 0.5)',
          'rgba(75, 192, 192, 0.5)',
          'rgba(153, 102, 255, 0.5)',
          'rgba(255, 159, 64, 0.5)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };
  return (
    <Row css={{ maxWidth: '100%' }}>
      <Doughnut data={data} />
    </Row>
  );
}
