import { Checkbox, Text } from '@nextui-org/react';
import { CheckboxEvent } from '@nextui-org/react/types/checkbox/checkbox';
import { useRouter } from 'next/router';
import React from 'react';

export interface IFilterServiceProps {
  onChange: (filters: Object) => void;
}

export default function FilterService({ onChange }: IFilterServiceProps) {
  const router = useRouter();
  const serviceFilter = [
    { label: 'Free Ship', value: 'isFreeShip' },
    { label: 'Promotion', value: 'isPromotion' },
    { label: 'New', value: 'isNew' },
    { label: 'Best sell', value: 'isBestSeller' },
  ];

  const handleChange = (name: string, isChecked: CheckboxEvent | boolean) => {
    if (!onChange) return;

    onChange({ [name]: isChecked });
  };

  return (
    <div style={{ marginTop: '32px' }}>
      <Text size={14} h4 css={{ textTransform: 'uppercase' }}>
        Service
      </Text>

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {serviceFilter.map((service, index) => (
          <li key={index}>
            <Checkbox
              checked={router?.query[service.value] === 'true'}
              value={service.value}
              animated={false}
              size="xs"
              onChange={(checked: CheckboxEvent | boolean) => handleChange(service.value, checked)}
            >
              {service.label}
            </Checkbox>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* 
  // const handleChange = (serviceFilters: Array<string>) => {
  //   if (!onChange) return;

  //   const newFilters = {
  //     isFreeShip: serviceFilters.some((x) => x === 'isFreeShip'),
  //     isPromotion: serviceFilters.some((x) => x === 'isPromotion'),
  //     isNew: serviceFilters.some((x) => x === 'isNew'),
  //     isBestSeller: serviceFilters.some((x) => x === 'isBestSeller'),
  //   };

  //   onChange(newFilters);
  // };

 <Checkbox.Group value={[]} style={{ listStyle: 'none', padding: 0 }} onChange={handleChange}>
        {serviceFilter.map((service, index) => (
          <Checkbox
            value={service.value}
            animated={false}
            size="sm"
            key={index}
            onChange={(checked) => handleChange(service.value, checked)}
          >
            {service.label}
          </Checkbox>
        ))}
      </Checkbox.Group>
*/
