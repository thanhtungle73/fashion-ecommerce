import { Button, CSS } from '@nextui-org/react';
import * as React from 'react';

export interface CustomButtonProps {
  children: React.ReactNode;
  css?: CSS;
}

export default function CustomButton(props: CustomButtonProps) {
  return <Button css={{ borderRadius: 2, ...props.css }}>{props.children}</Button>;
}
