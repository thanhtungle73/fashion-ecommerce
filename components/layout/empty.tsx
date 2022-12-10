import { LayoutProps } from 'models/common';
import * as React from 'react';
import Footer from '../footer';
import Header from '../header';

export function EmptyLayout({ children }: LayoutProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <Header />
      <main style={{ marginTop: '60px', flexGrow: 1 }}>{children}</main>
      <Footer />
    </div>
  );
}
