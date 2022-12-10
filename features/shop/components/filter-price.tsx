import { Button, Input, Text } from '@nextui-org/react';
import * as React from 'react';

export interface IFilterPriceProps {}

export default function FilterPrice(props: IFilterPriceProps) {
  return (
    <div style={{ marginTop: '32px' }}>
      <Text size={14} h4 css={{ textTransform: 'uppercase', marginBottom: '16px' }}>
        Price Range
      </Text>

      <div>
        <Input aria-label="From"></Input>
        <span>-</span>
        <Input aria-label="To"></Input>
      </div>
      <Button type="submit" auto css={{ margin: '12px auto' }}>
        Apply
      </Button>
    </div>
  );
}
