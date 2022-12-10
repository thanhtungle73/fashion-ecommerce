import RadioGroupField from '@/components/form-controls/radio-group-field';
import CustomInputField from '@/components/form-controls/text-field';
import { ADMIN_ORDER_STATUS_CHECKBOX_FIELD } from '@/constants/form-field-values';
import { Button, Loading, Modal } from '@nextui-org/react';
import React from 'react';

export interface OrderFormProps {
  form: any;
  isView: boolean;
  closeHandler: () => void;
  onSubmitClick: (value: any) => void;
}

export default function OrderForm({ form, isView, closeHandler, onSubmitClick }: OrderFormProps) {
  const { formState, handleSubmit, watch, reset } = form;
  const { isSubmitting } = formState;

  const handleCloseClick = () => {
    if (!closeHandler) return;
    closeHandler();
  };

  const handleSubmitClick = async (values: any) => {
    if (!onSubmitClick) return;
    await onSubmitClick(values);
  };

  return (
    <form onSubmit={handleSubmit(handleSubmitClick)}>
      <Modal.Body>
        <CustomInputField
          type="text"
          form={form}
          name="id"
          label="Order Id"
          properties={{ readOnly: true }}
        />

        <CustomInputField
          type="text"
          form={form}
          name="createdAt"
          properties={{ readOnly: true }}
          label="Created Date"
        />

        <CustomInputField
          type="text"
          form={form}
          name="address"
          properties={{ readOnly: isView }}
          label="Address"
        />

        <CustomInputField
          type="text"
          form={form}
          name="city"
          properties={{ readOnly: isView }}
          label="City"
        />

        <CustomInputField
          type="number"
          form={form}
          name="phone"
          properties={{ readOnly: isView }}
          label="Phone"
        />

        <CustomInputField
          type="text"
          form={form}
          name="totalPrice"
          properties={{ readOnly: true, labelRight: 'VND' }}
          label="Total Amount"
        />

        <RadioGroupField
          form={form}
          name="status"
          values={ADMIN_ORDER_STATUS_CHECKBOX_FIELD}
          label="Status"
          properties={{ disabled: isView }}
        />
      </Modal.Body>

      <Modal.Footer>
        <Button auto flat color="error" disabled={isSubmitting} onClick={handleCloseClick}>
          Close
        </Button>
        {!isView && (
          <Button type="submit" auto disabled={isSubmitting}>
            {isSubmitting ? <Loading type="points" size="sm" /> : 'Change Order Status'}
          </Button>
        )}
      </Modal.Footer>
    </form>
  );
}
