import { Container, Grid, Text } from '@nextui-org/react';
import * as React from 'react';

export interface IFooterProps {}

export default function Footer(props: IFooterProps) {
  return (
    <div style={{ background: '#20232a', padding: '48px 0', marginTop: '64px' }}>
      <Container css={{ background: '#20232a' }} md>
        <Grid.Container
          gap={1}
          css={{
            ' a': {
              color: '#fff',
              fontSize: '0.875rem',
            },
          }}
        >
          <Grid xs={6} sm={3} direction="column">
            <Text size={14} h4 color="#999" transform="uppercase">
              Customer Service
            </Text>
            <ul
              style={{
                padding: 0,
                listStyle: 'none',
                margin: '24px 0 0',
              }}
            >
              {[
                'Help Centre',
                'E-commerce Blog',
                'E-Commerce',
                'How To Buy',
                'How To Sell',
                'Payment',
                'Shipping',
                'Return & Refund',
                'Contact Us',
                'Warranty Policy',
              ].map((item, index) => (
                <li key={index} style={{ marginBottom: '8px' }}>
                  <a href="#">{item}</a>
                </li>
              ))}
            </ul>
          </Grid>
          <Grid xs={6} sm={3} direction="column">
            <Text size={14} h4 color="#999" transform="uppercase">
              About E-Commerce
            </Text>
            <ul
              style={{
                padding: 0,
                listStyle: 'none',
                fontSize: '14px',
                margin: '24px 0 0',
              }}
            >
              {[
                'About Us',
                'E-commerce Careers',
                'E-Commerce Policies',
                'Privacy Policy',
                'Seller Centre',
                'Flash Deals',
                'Media Contact',
              ].map((item, index) => (
                <li key={index} style={{ marginBottom: '8px' }}>
                  <a href="#">{item}</a>
                </li>
              ))}
            </ul>
          </Grid>
          <Grid xs={6} sm={3} direction="column">
            <Text size={14} h4 color="#999" transform="uppercase">
              Payment
            </Text>

            <Grid.Container
              gap={4}
              justify="flex-start"
              css={{ padding: 0, marginTop: '8px', paddingRight: '124px' }}
            >
              <Grid xs={4}>
                <a href="#">
                  <i className="fa-brands fa-cc-visa fa-xl"></i>
                </a>
              </Grid>
              <Grid xs={4}>
                <a href="#">
                  <i className="fa-brands fa-cc-mastercard fa-xl"></i>
                </a>
              </Grid>
              <Grid xs={4}>
                <a href="#">
                  <i className="fa-brands fa-cc-jcb fa-xl"></i>
                </a>
              </Grid>
              <Grid xs={4}>
                <a href="#">
                  <i className="fa-brands fa-cc-paypal fa-xl"></i>
                </a>
              </Grid>
              <Grid xs={4}>
                <a href="#">
                  <i className="fa-brands fa-cc-amazon-pay fa-xl"></i>
                </a>
              </Grid>
              <Grid xs={4}>
                <a href="#">
                  <i className="fa-solid fa-money-bill-1 fa-xl"></i>
                </a>
              </Grid>
            </Grid.Container>
          </Grid>
          <Grid xs={6} sm={3} direction="column">
            <Text size={14} h4 color="#999" transform="uppercase">
              Follow Us
            </Text>
            <ul
              style={{
                padding: 0,
                listStyle: 'none',
                fontSize: '14px',
                margin: '24px 0 0',
              }}
            >
              {['Facebook', 'Instagram', 'LinkedIn'].map((item, index) => (
                <li key={index} style={{ marginBottom: '8px' }}>
                  <a href="#">{item}</a>
                </li>
              ))}
            </ul>
          </Grid>
        </Grid.Container>
      </Container>
    </div>
  );
}
