import { AuthenticationLayout } from '@/components/layout';
import { useRouter } from 'next/router';
import * as React from 'react';

export interface AdministrationPageProps {}

export default function AdministrationPage(props: AdministrationPageProps) {
  const router = useRouter();
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      router.push('/administration/dashboard');
    }
  }, [router]);
  return <div></div>;
}

AdministrationPage.Layout = AuthenticationLayout;
