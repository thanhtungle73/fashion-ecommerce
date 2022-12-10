import { CSS, Input } from '@nextui-org/react';
import * as React from 'react';
import { Controller } from 'react-hook-form';

export interface TextFieldNoLabelProps {
  name: string;
  control: any;
  errors: any;
  placeholder?: string;
  css?: CSS;
  properties?: any;
  disable?: boolean;
}

export default function TextFieldNoLabel(props: TextFieldNoLabelProps) {
  const { control, errors, disable, name, placeholder, css, properties } = props;
  return (
    <>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, onBlur, value, name } }) => (
          <Input
            type="text"
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
            css={{ marginBottom: '24px', '& p': { fontSize: '13px' }, ...css }}
          ></Input>
        )}
      />
    </>
  );
}
