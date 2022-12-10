import '@fortawesome/fontawesome-free/css/all.css';
import { NextUIProvider } from '@nextui-org/react';
import { EmptyLayout } from 'components/layout';
import { CartProvider } from 'contexts';
import { AuthProvider } from 'contexts/authentication';
import { AppPropsWithLayout } from 'models/common';
import { theme } from 'styles/theme';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const Layout = Component.Layout ?? EmptyLayout;

  return (
    <NextUIProvider theme={theme}>
      <AuthProvider>
        <CartProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </CartProvider>
      </AuthProvider>
    </NextUIProvider>
  );
}

export default MyApp;
