import { NextPage } from 'next';
import { AppProps } from 'next/app';
import { ReactElement, ReactNode } from 'react';

export interface LayoutProps {
  children: ReactNode;
}

export type NextPageWithLayout = NextPage & {
  Layout?: (props: LayoutProps) => ReactElement;
};

export type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export interface UserData {
  customClaims?: CustomClaims | undefined;
  authenticated: boolean;
  email?: string | undefined;
  uid: string | undefined;
  displayName?: string | undefined;
  photoURL?: string | undefined;
  phoneNumber?: string | undefined;
}

interface CustomClaims {
  admin: boolean;
}
