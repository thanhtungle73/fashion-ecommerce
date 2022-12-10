import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import * as React from 'react';

export interface IAuthenticationPageProps {}

// Client side rendering authentication forms.
const LoginFormClientSide = dynamic(() => import('features/auth/Login'), { ssr: false });
const RegisterFormClientSide = dynamic(() => import('features/auth/Register'), { ssr: false });

export default function AuthenticationPage(props: IAuthenticationPageProps) {
  const router = useRouter();

  return (
    <>
      {router.query.form === 'register' && <RegisterFormClientSide />}
      {router.query.form === 'login' && <LoginFormClientSide />}
    </>
  );
}
