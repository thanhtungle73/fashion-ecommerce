import { Auth } from '@/utils/authentication';
import { Button, Card, Grid, Input, Loading, Row, Text } from '@nextui-org/react';
import { useAuthContext } from 'contexts/authentication';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

export interface IRegisterProps {}

export default function Register(props: IRegisterProps) {
  const router = useRouter();
  const { createUserWithEmail } = Auth();
  const { setNewUser } = useAuthContext();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [retypePassword, setRetypePassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFormSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    setLoading(true);

    if (email && password && password === retypePassword) {
      try {
        const data = await createUserWithEmail(email, password, fullName);
        setNewUser(data);
        // Navigate to home page after register success.
        router.push('/');
      } catch (error) {
        console.log('Failed to register new user by: ', error);
      }
    }
    setLoading(false);
  };

  return (
    <Grid.Container justify="center" alignItems="center" css={{ height: '100vh' }}>
      <Grid>
        <Card css={{ width: '500px', p: '16px' }}>
          <Row justify="center">
            <Text h3 css={{ p: '24px 0' }}>
              Register Form
            </Text>
          </Row>

          <form onSubmit={handleFormSubmit}>
            <Input
              label="Full Name"
              placeholder="Your Full Name"
              css={{ m: '8px 0' }}
              onChange={(e) => setFullName(e.target.value)}
              width="100%"
            ></Input>

            <Input
              label="User Name"
              placeholder="User Name"
              css={{ m: '8px 0' }}
              onChange={(e) => setEmail(e.target.value)}
              width="100%"
            ></Input>

            <Input.Password
              label="Password"
              placeholder="Password"
              css={{ m: '8px 0' }}
              onChange={(e) => setPassword(e.target.value)}
              width="100%"
            ></Input.Password>

            <Input.Password
              label="Retype Password"
              placeholder="Retype Your Password"
              css={{ m: '8px 0' }}
              onChange={(e) => setRetypePassword(e.target.value)}
              width="100%"
            ></Input.Password>
            <Button
              disabled={loading}
              type="submit"
              css={{ m: '24px 0', width: '100%', fontWeight: 600 }}
            >
              {loading ? <Loading type="points" color="white" size="sm" /> : 'Register'}
            </Button>
          </form>
        </Card>
      </Grid>
    </Grid.Container>
  );
}
