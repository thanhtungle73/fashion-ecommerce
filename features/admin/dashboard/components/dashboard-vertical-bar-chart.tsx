import * as React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import moment from 'moment';
import { MONTH_LIST } from '@/constants';
import { OrderData } from '@/models';
import { firebase } from '@/app/firebase-client';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export interface VerticalBarChartProps {
  orderListCurrentYear: Array<OrderData | firebase.firestore.DocumentData>;
}

export default function VerticalBarChart({ orderListCurrentYear }: VerticalBarChartProps) {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: '',
      },
    },
  };

  // Get month from January to current month.
  const labels = MONTH_LIST.filter((_, index) => index <= Number(moment().month()));
  const totalOrderArray = labels.map(
    (_, index) => orderListCurrentYear.filter((x) => moment(x.createdAt).month() === index).length
  );
  const totalDeliveredOrderArray = labels.map(
    (_, index) =>
      orderListCurrentYear.filter(
        (x) => moment(x.createdAt).month() === index && x.status === 'delivered'
      ).length
  );

  const data = {
    labels,
    datasets: [
      {
        label: 'Total Orders',
        data: totalOrderArray,
        backgroundColor: 'rgba(255, 99, 132, 0.8)',
      },
      {
        label: 'Total Delivered',
        data: totalDeliveredOrderArray,
        backgroundColor: 'rgba(53, 162, 235, 0.8)',
      },
    ],
  };

  return (
    <>
      <Bar options={options} data={data} />
    </>
  );
}
