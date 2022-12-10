import { useAuthContext } from '@/contexts';
import { Card, Row, Text } from '@nextui-org/react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import * as React from 'react';

const CheckoutInformationFormClient = dynamic(() => import('./infomation-form'), { ssr: false });

export interface CartInformationProps {
  form: any;
  onSubmitClick: (values: any) => void;
}

export default function CartInformation({ form, onSubmitClick }: CartInformationProps) {
  const { userDataContext } = useAuthContext();

  const handleSubmitClick = async (values: any) => {
    if (!onSubmitClick) return;
    onSubmitClick(values);
  };

  return (
    <Card shadow={false} css={{ borderRadius: 0 }}>
      <Row justify="space-between">
        <Text size={16} css={{ marginBottom: '32px' }}>
          Contact Information
        </Text>

        {!userDataContext?.uid && (
          <Text>
            Already have account?
            <Link href="/authentication?form=login">
              <a style={{ marginLeft: '8px' }}>Login</a>
            </Link>
          </Text>
        )}
      </Row>
      <CheckoutInformationFormClient form={form} onSubmitClick={handleSubmitClick} />
    </Card>
  );
}
