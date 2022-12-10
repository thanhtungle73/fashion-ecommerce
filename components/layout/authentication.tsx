import { LayoutProps } from 'models/index';
import Auth from 'components/common/auth';
import * as React from 'react';
import Header from '../header';
import Footer from '../footer';

export function AuthenticationLayout({ children }: LayoutProps) {
  return (
    <Auth>
      <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
        <Header />
        <main style={{ marginTop: '60px', flexGrow: 1 }}> {children}</main>
        <Footer />
      </div>
    </Auth>
  );
}
