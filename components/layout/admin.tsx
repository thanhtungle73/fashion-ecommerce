import Auth from 'components/common/auth';
import { LayoutProps } from 'models/index';
import * as React from 'react';
import Header from '../header';

export function AdminLayout({ children }: LayoutProps) {
  return (
    <Auth>
      <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
        <Header />
        <main style={{ marginTop: '60px', flexGrow: 1 }}> {children}</main>
      </div>
    </Auth>
  );
}
