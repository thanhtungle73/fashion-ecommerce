import { Text } from '@nextui-org/react';
import * as React from 'react';

export interface IFilterCategoryProps {
  categories: Array<any>;
  onClick: (name: string) => void;
}

export default function FilterCategory({ categories, onClick }: IFilterCategoryProps) {
  const handleClick = (name: string) => {
    if (!onClick) return;
    // const categoryFilters = categories.reduce(
    //   (prevValue, currenValue) => ({
    //     ...prevValue,
    //     [currenValue.name]: currenValue.name === name ? true : false,
    //   }),
    //   {}
    // );

    onClick(name);
  };
  return (
    <div>
      <Text size={14} h4 css={{ textTransform: 'uppercase' }}>
        Category
      </Text>
      <ul style={{ listStyle: ' none', padding: 0 }}>
        {categories.map((category, index) => (
          <li
            key={index}
            style={{ cursor: 'pointer', fontSize: '14px', marginBottom: '8px' }}
            onClick={() => handleClick(category.name)}
          >
            {category.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
