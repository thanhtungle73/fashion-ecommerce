import { Checkbox } from '@nextui-org/react';
import * as React from 'react';
import { Controller } from 'react-hook-form';

export interface SingleCheckboxFieldProps {
  form: any;
  label?: string;
  name: string;
  disable?: boolean;
}

export default function SingleCheckboxField(props: SingleCheckboxFieldProps) {
  const { form, name, label, disable = false } = props;
  const { control } = form;

  return (
    <>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, onBlur, value, name } }) => (
          <Checkbox
            aria-label="id"
            color="primary"
            size="sm"
            isSelected={value}
            name={name}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            css={{ marginBottom: '32px', '& span': { fontSize: '14px' } }}
          >
            {label}
          </Checkbox>
        )}
      />
    </>
  );
}
