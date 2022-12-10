import { Col, Radio, Row, Text } from '@nextui-org/react';
import * as React from 'react';
import { Controller } from 'react-hook-form';

export interface RadioGroupFieldProps {
  form: any;
  name: string;
  label?: string;
  values: Array<string>;
  properties?: any;
}

export default function RadioGroupField(props: RadioGroupFieldProps) {
  const { form, name, values, label, properties } = props;

  return (
    <Row>
      <Col span={1.5}>
        <Text size={14}>{label}</Text>
      </Col>

      <Col>
        <Controller
          control={form.control}
          name={name}
          render={({ field: { onChange, onBlur, value, name } }) => (
            <Radio.Group
              aria-label={name}
              color="primary"
              size="sm"
              row
              initialValue={values[0]}
              value={value?.name}
              onBlur={onBlur}
              onChange={onChange}
              {...properties}
              css={{
                marginBottom: '32px',
                '& span': { fontSize: '14px' },
              }}
            >
              {values.map((value, index) => (
                <Radio key={index} value={value}>
                  {value}
                </Radio>
              ))}
            </Radio.Group>
          )}
        />
      </Col>
    </Row>
  );
}
