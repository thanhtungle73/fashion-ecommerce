import { Auth } from '@/utils/authentication';
import { Button, Card, Grid, Input, Loading, Row, Text } from '@nextui-org/react';
import { useAuthContext } from 'contexts/authentication';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

interface LoginData {
  email: string;
  password: string;
}

export interface ILoginProps {}

export default function Login(props: ILoginProps) {
  const router = useRouter();
  const { signInWithEmail } = Auth();
  const { setNewUser } = useAuthContext();

  const schema = yup
    .object({
      email: yup.string().required('This is required field.').email('Please enter your email.'),
      password: yup
        .string()
        .required('This is required field.')
        .min(6, 'Please enter at least 6 character.'),
    })
    .required();

  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    reValidateMode: 'onSubmit',
    resolver: yupResolver(schema),
  });

  const { formState, control, handleSubmit } = form;
  const { errors } = formState;
  const [loading, setLoading] = useState(false);

  const handleOnSubmit = async (values: LoginData) => {
    const { email, password } = values;
    if (email && password) {
      setLoading(true);
      try {
        const data = await signInWithEmail(email, password);
        setNewUser(data);
        router.push('/');
      } catch (error) {
        console.log('Failed to login by ', error);
      }
      setLoading(false);
    }
  };

  return (
    <Grid.Container justify="center" alignItems="center" css={{ height: '100vh' }}>
      <Grid>
        <Card css={{ width: '550px', p: '32px' }}>
          <Row justify="center">
            <Text h3 css={{ p: '24px 0' }}>
              Login Form
            </Text>
          </Row>

          <form onSubmit={handleSubmit(handleOnSubmit)}>
            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, onBlur, value, name } }) => (
                <Input
                  type="text"
                  label="User Name"
                  aria-label="User Name"
                  bordered
                  fullWidth
                  color="primary"
                  size="md"
                  placeholder="Email"
                  name={name}
                  value={value as string | undefined}
                  helperText={errors[name]?.message}
                  helperColor="error"
                  onChange={onChange}
                  onBlur={onBlur}
                  css={{ marginBottom: '16px', '& p': { fontSize: '14px', marginTop: '8px' } }}
                ></Input>
              )}
            />

            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, onBlur, value, name } }) => (
                <Input.Password
                  type="password"
                  label="Password"
                  aria-label="Password"
                  bordered
                  fullWidth
                  color="primary"
                  size="md"
                  placeholder="Password"
                  name={name}
                  value={value as string | undefined}
                  helperText={errors[name]?.message}
                  helperColor="error"
                  onChange={onChange}
                  onBlur={onBlur}
                  css={{ marginBottom: '16px', '& p': { fontSize: '14px' } }}
                ></Input.Password>
              )}
            />

            <Button
              disabled={loading}
              type="submit"
              css={{ m: '24px 0', width: '100%', fontWeight: 600 }}
            >
              {loading ? <Loading type="points" color="white" size="sm" /> : 'Login'}
            </Button>
          </form>
        </Card>
      </Grid>
    </Grid.Container>
  );
}
