import { useCartContext } from '@/context/cart-context';
import { Auth } from '@/utils/authentication';
import { Popover, Avatar, Button, Container, Grid, Spacer, Text, Tooltip } from '@nextui-org/react';
import clsx from 'clsx';
import { useAuthContext } from 'contexts/authentication';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { Fragment } from 'react';
import { ROUTE_LIST } from './routes';

export interface IHeaderProps {}

export default function Header(props: IHeaderProps) {
  const router = useRouter();
  const { userDataContext, setNewUser } = useAuthContext();
  const { showMiniCart } = useCartContext();

  const { logout } = Auth();
  const isLoggedIn = userDataContext?.email;

  // Handle logout by remove cookie & userData.
  const handleLogoutClick = async () => {
    const data = await logout();
    setNewUser({ ...data });
    router.push('/');
    // Clear local storage;
    localStorage.clear();
  };

  return (
    <div
      className="app-header"
      style={{
        background: '#fafafa',
        height: '60px',
        borderBottom: '1px solid #eee',
        boxShadow: '0 2px 20px rgba(0, 0, 0, 0.08)',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 10000,
      }}
    >
      <Container
        md
        css={{ height: '60px', fontSize: '14px', 'a:hover': { textDecoration: 'underline' } }}
      >
        <Grid.Container
          alignItems="center"
          justify="center"
          css={{
            height: '100%',
            ' a': { color: 'black' },
            'a.active': { fontWeight: '$bold', color: '#000' },
          }}
        >
          <Grid xs={5}>
            {ROUTE_LIST.map((route, index) => (
              <Fragment key={index}>
                <Link
                  href={
                    route.path !== '/shop'
                      ? route.path
                      : {
                          pathname: '/shop',
                          query: { _page: 1, _limit: 6, _sort: 'salePrice:asc' },
                        }
                  }
                >
                  <a className={clsx({ active: router.pathname.includes(route.path.slice(0)) })}>
                    {route.label}
                  </a>
                </Link>
                <Spacer x={1} />
              </Fragment>
            ))}

            {userDataContext?.customClaims?.admin && (
              <Link href="/administration/dashboard">
                <a className={clsx({ active: router.pathname.includes('administration') })}>
                  Administration
                </a>
              </Link>
            )}
          </Grid>

          <Grid xs={2} justify="center" css={{ 'a:hover': { textDecoration: 'none' } }}>
            <Link href="/">
              <a>
                <Text
                  size={20}
                  h3
                  css={{ textShadow: '0 1px black', color: '#282c34', textTransform: 'uppercase' }}
                >
                  E-Commerce
                </Text>
              </a>
            </Link>
          </Grid>

          <Grid
            xs={5}
            justify="flex-end"
            alignItems="center"
            css={{ '& a:hover': { textDecoration: 'none' } }}
          >
            <>
              <Link href="#">
                <a>
                  <Button auto light>
                    <i className="fa-solid fa-magnifying-glass fa-lg"></i>
                  </Button>
                </a>
              </Link>

              <Popover isOpen={showMiniCart}>
                <Popover.Trigger>
                  <Button auto light onClick={() => router.push('/cart')}>
                    <i className="fa-solid fa-cart-shopping fa-lg"></i>
                  </Button>
                </Popover.Trigger>
                <Popover.Content>
                  <div style={{ padding: '16px' }}>
                    <Text size={14} css={{ p: '$5' }}>
                      <i className="fa-regular fa-circle-check" style={{ marginRight: '8px' }}></i>
                      Added to cart successfully
                    </Text>

                    <Button auto css={{ margin: 'auto' }} onClick={() => router.push('/cart')}>
                      View cart and checkout
                    </Button>
                  </div>
                </Popover.Content>
              </Popover>

              <Spacer x={0.5} />

              {!isLoggedIn && (
                <>
                  <Link
                    href={{
                      pathname: '/authentication',
                      query: { form: 'login' },
                    }}
                  >
                    <a>Login</a>
                  </Link>
                  <Spacer x={1} />
                  <Link
                    href={{
                      pathname: '/authentication',
                      query: { form: 'register' },
                    }}
                  >
                    <a
                      style={{
                        padding: '4px 12px',
                        background: '#222',
                        borderRadius: '15px',
                        color: '#fff',
                      }}
                    >
                      Register
                    </a>
                  </Link>
                </>
              )}

              {isLoggedIn && (
                <>
                  <Tooltip
                    trigger="hover"
                    placement="bottomEnd"
                    content={
                      <Button.Group
                        css={{
                          color: 'white',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'flex-start',
                        }}
                        light
                        vertical
                      >
                        <Button onClick={() => router.push('/authentication/userProfile')}>
                          User Profile
                        </Button>
                        <Button>Notification</Button>
                        <Button onClick={handleLogoutClick}>Logout</Button>
                      </Button.Group>
                    }
                  >
                    <Button
                      auto
                      light
                      icon={
                        userDataContext?.photoURL ? (
                          <Avatar src={userDataContext?.photoURL} size="sm" />
                        ) : (
                          <i className="fa-solid fa-circle-user fa-xl"></i>
                        )
                      }
                    >
                      {userDataContext?.displayName || userDataContext?.email}
                    </Button>
                  </Tooltip>
                </>
              )}
            </>
          </Grid>
        </Grid.Container>
      </Container>
    </div>
  );
}
