import CustomCard from '@/components/common/custom-card';
import { Divider } from '@nextui-org/react';
import clsx from 'clsx';
import Link from 'next/link';
import * as React from 'react';
import { CATEGORY_ROUTES } from './category.routes';
import { useRouter } from 'next/router';

export interface AdminCategoryProps {}

export default function AdminCategory(props: AdminCategoryProps) {
  const router = useRouter();
  return (
    <CustomCard
      css={{
        background: '$accents1',
        borderRadius: 8,
        '& a': { color: '$gray700' },
        'a:hover': { fontWeight: 600, color: '$black' },
        'a.active': { fontWeight: 600, color: '$black' },
      }}
    >
      <ul style={{ paddingLeft: 0, margin: 0 }}>
        {CATEGORY_ROUTES.map((category, index) => (
          <li key={index}>
            <Link href={`/administration/${category.path}`}>
              <a
                style={{ fontSize: '0.875rem', fontWeight: 600 }}
                className={clsx({ active: router.pathname.includes(category.path) })}
              >
                {category.icon}
                {category.label}
              </a>
            </Link>
            {index < CATEGORY_ROUTES.length - 1 && <Divider />}
          </li>
        ))}
      </ul>
    </CustomCard>
  );
}
