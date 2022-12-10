import { Col, Input, Row, Text } from '@nextui-org/react';
import * as React from 'react';
import { Controller } from 'react-hook-form';

export interface CalculatedSalePriceFieldProps {
  form: any;
  name: string;
  properties?: Object;
  calculatedSalePrice: () => string | undefined;
}

export default function CalculatedSalePriceField(props: CalculatedSalePriceFieldProps) {
  const { form, name, properties, calculatedSalePrice } = props;
  const { control, formState } = form;
  const { errors } = formState;
  return (
    <>
      <Row align="flex-start" css={{ m: 0, p: 0 }}>
        <Col span={1.5}>
          <Text size={14}>Sale Price</Text>
        </Col>
        <Col>
          <Controller
            control={control}
            name={name}
            render={({ field: { onChange, onBlur, value, name } }) => (
              <Input
                type="text"
                fullWidth
                readOnly
                aria-label={name}
                color="primary"
                size="md"
                name={name}
                value={calculatedSalePrice()}
                helperText={errors[name]?.message}
                helperColor="error"
                onChange={onChange}
                onBlur={onBlur}
                {...properties}
                css={{ marginBottom: '32px', '& p': { fontSize: '13px' } }}
              ></Input>
            )}
          />
        </Col>
      </Row>
    </>
  );
}
