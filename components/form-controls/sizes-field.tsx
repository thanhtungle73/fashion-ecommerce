import { Button, Radio, Text } from '@nextui-org/react';
import * as React from 'react';
import { Controller } from 'react-hook-form';

export interface SizeFieldProps {
  form: any;
  name: string;
  label: string;
  product: any;
}

export default function SizeField(props: SizeFieldProps) {
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
              {product.sizes.map((size: string, index: number) => {
                return (
                  <Button
                    key={index}
                    auto
                    bordered={value.toLowerCase() !== size.toLowerCase()}
                    size="xs"
                    css={{ marginRight: '6px', borderRadius: 0 }}
                  >
                    {size}
                    <Radio
                      size="lg"
                      value={size}
                      css={{
                        opacity: 0,
                        position: 'absolute',
                        left: '50%',
                        transform: 'translateX(-50%)',
                      }}
                    ></Radio>
                  </Button>
                );
              })}
            </Radio.Group>
          )}
        />
      )}
    </div>
  );
}
