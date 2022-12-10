import { Button, Text } from '@nextui-org/react';
import { PaginationQuery } from 'models';
import React, { useEffect, useState } from 'react';

export interface IShopSortProps {
  pagination: PaginationQuery;
  currentSort: string | string[];
  onChange: Function;
}

export default function ShopSort({ pagination, onChange, currentSort }: IShopSortProps) {
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  const [activeBtn, setActiveBtn] = useState(currentSort);

  const handleClick = (value: string) => {
    let newOrder: 'asc' | 'desc';
    if (activeBtn.includes(value)) {
      newOrder = order === 'asc' ? 'desc' : 'asc';
    } else {
      newOrder = 'asc';
    }
    setActiveBtn(`${value}:${newOrder}`);

    onChange(`${value}:${newOrder}`);
    setOrder(newOrder);
  };

  // Change the active button when current sort in query params has been changed.
  useEffect(() => {
    setActiveBtn(currentSort);
  }, [currentSort]);

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flex: 1,
        padding: '16px',
        background: '#eee',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Text size={14}>Sort by</Text>

        <Button
          auto
          animated={false}
          light={!activeBtn.includes('salePrice')}
          css={{ marginLeft: 10 }}
          size="sm"
          onClick={() => handleClick('salePrice')}
        >
          Price
          {activeBtn.includes('salePrice') && order === 'asc' && (
            <i className="fa-solid fa-arrow-up" style={{ marginLeft: '8px' }} />
          )}
          {activeBtn.includes('salePrice') && order === 'desc' && (
            <i className="fa-solid fa-arrow-down-long" style={{ marginLeft: '8px' }}></i>
          )}
        </Button>

        <Button
          auto
          animated={false}
          light={!activeBtn.includes('name')}
          css={{ marginLeft: 10 }}
          size="sm"
          onClick={() => handleClick('name')}
        >
          Name
          {activeBtn.includes('name') && order === 'asc' && (
            <i className="fa-solid fa-arrow-up" style={{ marginLeft: '8px' }} />
          )}
          {activeBtn.includes('name') && order === 'desc' && (
            <i className="fa-solid fa-arrow-down-long" style={{ marginLeft: '8px' }}></i>
          )}
        </Button>

        <Button
          auto
          animated={false}
          light={!activeBtn.includes('promotionPercent')}
          css={{ marginLeft: 10 }}
          size="sm"
          onClick={() => handleClick('promotionPercent')}
        >
          Promotion Percent
          {activeBtn.includes('promotionPercent') && order === 'asc' && (
            <i className="fa-solid fa-arrow-up" style={{ marginLeft: '8px' }} />
          )}
          {activeBtn.includes('promotionPercent') && order === 'desc' && (
            <i className="fa-solid fa-arrow-down-long" style={{ marginLeft: '8px' }}></i>
          )}
        </Button>
      </div>
      {pagination.limit && pagination?.total && (
        <Text>
          {pagination?.page}/{Math.ceil(pagination?.total / pagination?.limit)}
        </Text>
      )}
    </div>
  );
}
