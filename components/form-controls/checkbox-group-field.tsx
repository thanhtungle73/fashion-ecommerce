import { Checkbox, Col, Row, Text } from '@nextui-org/react';
import * as React from 'react';
import { Controller } from 'react-hook-form';

export interface CheckboxGroupFieldProps {
  form: any;
  name: string;
  values: Array<string>;
  label?: string;
  properties?: any;
}

export default function CheckboxGroupField(props: CheckboxGroupFieldProps) {
  const { form, name, values, label, properties } = props;
  const { control } = form;

  return (
    <>
      <Row>
        <Col span={1.5}>
          <Text size={14}>{label}</Text>
        </Col>
        <Col>
          <Controller
            control={control}
            name={name}
            render={({ field: { onChange, onBlur, value, name } }) => (
              <Checkbox.Group
                aria-label={name}
                color="primary"
                size="sm"
                isRow
                name={name}
                value={value}
                onBlur={onBlur}
                onChange={onChange}
                {...properties}
                css={{
                  marginBottom: '32px',
                  '& span': { fontSize: '14px' },
                }}
              >
                {values.map((value, index) => (
                  <Checkbox key={index} value={value}>
                    {value}
                  </Checkbox>
                ))}
              </Checkbox.Group>
            )}
          />
        </Col>
      </Row>
    </>
  );
}
