import { Button, Radio, Text } from '@nextui-org/react';
import * as React from 'react';
import { Controller } from 'react-hook-form';

export interface ColorsFieldProps {
  form: any;
  name: string;
  label: string;
  product: any;
}

export default function ColorsField(props: ColorsFieldProps) {
  const { form, name, label, product } = props;

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        margin: '24px 0 16px',
      }}
    >
      <Text css={{ margin: '0 12px 0 0' }}>{label}:</Text>
      {product.sizes.length && (
        <Controller
          name={name}
          control={form.control}
          render={({ field: { onChange, onBlur, value } }) => (
            <Radio.Group
              value={value}
              onChange={onChange}
              onBlur={onBlur}
              css={{ position: 'relative' }}
              row
            >
              {product.colors.map((color: string, index: number) => (
                <Button
                  key={index}
                  auto
                  bordered
                  size="xs"
                  css={{
                    marginRight: '6px',
                    borderRadius: '50%',
                    backgroundColor: `${color}`,
                    border: color === value ? '2px solid #0099ff' : '',
                  }}
                >
                  <Radio
                    size="lg"
                    value={color}
                    css={{
                      opacity: 0,
                      position: 'absolute',
                      left: '50%',
                      transform: 'translateX(-50%)',
                    }}
                  ></Radio>
                </Button>
              ))}
            </Radio.Group>
          )}
        />
      )}
    </div>
  );
}
