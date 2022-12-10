import { fireStore } from '@/app/firebase-admin';
import { AuthenticationLayout } from 'components/layout';
import type { GetServerSideProps } from 'next';
import * as React from 'react';

export interface IAboutProps {
  data: any[];
}

export default function About({ data }: IAboutProps) {
  return (
    <div style={{ textAlign: 'center' }}>
      <ul>
        {data.map((x: any, index: number) => (
          <li key={index}>{x.name}</li>
        ))}
      </ul>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<any, any> = async (context) => {
  let data: any[] = [];
  const snapshot = await fireStore.collection('restaurant').get();
  snapshot.forEach((doc: any) => {
    data.push({ ...doc.data() });
  });

  return {
    props: {
      data: data,
    },
  };
};

// Layout for page.
About.Layout = AuthenticationLayout;
