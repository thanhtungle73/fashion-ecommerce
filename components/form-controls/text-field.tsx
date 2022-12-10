import { Col, CSS, Input, Row, Text } from '@nextui-org/react';
import * as React from 'react';
import { Controller } from 'react-hook-form';

export interface CustomInputFieldProps {
  form: any;
  name: string;
  label: string;
  type: string;
  disable?: boolean;
  placeholder?: string;
  css?: CSS;
  properties?: any;
}

export default function CustomInputField(props: CustomInputFieldProps) {
  const { form, name, label, type, placeholder = '', disable = false, css, properties } = props;
  const { formState, control } = form;
  const { errors } = formState;

  return (
    <Row align="flex-start" css={{ m: 0, p: 0 }}>
      <Col span={1.5}>
        <Text size={14}>{label}</Text>
      </Col>
      <Col>
        <Controller
          control={control}
          name={name}
          render={({ field: { onChange, onBlur, value, name } }) => (
            <Input
              type={type}
              aria-label={name}
              bordered
              fullWidth
              color="primary"
              size="md"
              placeholder={placeholder}
              disabled={disable}
              name={name}
              value={value as string | undefined}
              helperText={errors[name]?.message}
              helperColor="error"
              onChange={onChange}
              onBlur={onBlur}
              {...properties}
              css={{ marginBottom: '32px', '& p': { fontSize: '13px' }, ...css }}
            ></Input>
          )}
        />
      </Col>
    </Row>
  );
}
