import { Button, Input, Row, Text } from '@nextui-org/react';
import * as React from 'react';
import { Controller } from 'react-hook-form';
import TextFieldNoLabel from './form-controls/text-field-no-label';

export interface CheckoutInformationFormProps {
  form: any;
  disable?: boolean;
  onSubmitClick: (values: any) => void;
}

export default function CheckoutInformationForm(props: CheckoutInformationFormProps) {
  const { form, disable, onSubmitClick } = props;
  const { formState, control, handleSubmit, reset } = form;
  const { errors } = formState;

  const handleSubmitClick = async (values: any) => {
    if (!onSubmitClick) return;
    await onSubmitClick(values);
  };

  return (
    <form onSubmit={handleSubmit(handleSubmitClick)}>
      <TextFieldNoLabel
        control={control}
        errors={errors}
        name="email"
        placeholder="Email"
        properties={{ animated: false }}
      />
      <Text size={16} css={{ marginBottom: '16px' }}>
        Shipping Address
      </Text>
      <Row justify="space-between">
        <TextFieldNoLabel
          control={control}
          errors={errors}
          name="lastName"
          placeholder="Last Name"
          properties={{ animated: false }}
          css={{ marginRight: '16px' }}
        />

        <TextFieldNoLabel
          control={control}
          errors={errors}
          name="firstName"
          properties={{ animated: false }}
          placeholder="First Name"
        />
      </Row>
      <TextFieldNoLabel
        control={control}
        errors={errors}
        name="address"
        properties={{ animated: false }}
        placeholder="Address"
      />
      <TextFieldNoLabel
        control={control}
        errors={errors}
        name="city"
        properties={{ animated: false }}
        placeholder="City"
      />
      <TextFieldNoLabel
        control={control}
        errors={errors}
        name="phone"
        properties={{ animated: false }}
        placeholder="Phone"
      />
      <Row justify="flex-end">
        <Button type="submit">Continue To Shipping</Button>
      </Row>
    </form>
  );
}
