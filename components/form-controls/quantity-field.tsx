import { FieldValue } from '@/models/products';
import { Button, Input, Text } from '@nextui-org/react';
import * as React from 'react';
import { Controller } from 'react-hook-form';

export interface QuantityFieldProps {
  form: any;
  name: string;
  label: string;
  onClick?: (value: FieldValue) => void;
}

export default function QuantityField(props: QuantityFieldProps) {
  const { form, name, label, onClick = null } = props;
  const { setValue, getValues } = form;

  const handleQuantityIncrease = (name: String, value: number) => {
    setValue(name, Number(value) + 1);

    if (onClick) onClick(getValues());
  };

  const handleQuantityDecrease = (name: String, value: number) => {
    setValue(name, Number(value) <= 1 ? 1 : Number(value) - 1);

    if (onClick) onClick(getValues());
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <Text>{label}</Text>
      <Controller
        name={name}
        control={form.control}
        render={({ field: { onChange, onBlur, value, name } }) => (
          <div style={{ display: 'flex', marginLeft: '16px', alignItems: 'center' }}>
            <Button
              auto
              light
              size="xs"
              bordered
              disabled={value <= 1}
              css={{ borderRadius: 2, borderColor: '#ccc' }}
              onClick={() => handleQuantityDecrease(name, value)}
            >
              <i className="fa-solid fa-minus"></i>
            </Button>

            <Input
              bordered
              animated={false}
              size="xs"
              width="70px"
              aria-label="Quantity"
              css={{ margin: '0 4px' }}
              name={name}
              value={value}
              onChange={onChange}
              onBlur={onBlur}
            />

            <Button
              auto
              light
              size="xs"
              bordered
              css={{ borderRadius: 2, borderColor: '#ccc' }}
              onClick={() => handleQuantityIncrease(name, value)}
            >
              <i className="fa-solid fa-plus"></i>
            </Button>
          </div>
        )}
      />
    </div>
  );
}
