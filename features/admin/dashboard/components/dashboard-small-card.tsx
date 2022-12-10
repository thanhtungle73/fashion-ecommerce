import CustomCard from '@/components/common/custom-card';
import { Col, Row, Text } from '@nextui-org/react';
import * as React from 'react';

interface SmallCardData {
  label: string;
  quantity: number;
  icon: any;
  bgColor: string;
}

export interface DashboardSmallCardProps {
  cardData: SmallCardData;
}

export default function DashboardSmallCard({ cardData }: DashboardSmallCardProps) {
  return (
    <CustomCard css={{ borderRadius: 8, border: '1px solid $gray300' }}>
      <Row align="center" css={{ p: 0 }}>
        <Col span={3} css={{ p: 0 }}>
          <Row
            justify="center"
            align="center"
            css={{
              fontSize: '18px',
              width: '48px',
              height: '48px',
              background: cardData.bgColor,
              borderRadius: '50%',
              color: '$white',
            }}
          >
            {cardData.icon}
          </Row>
        </Col>
        <Col css={{ marginLeft: '8px' }}>
          <Text size={14}>{cardData.label}</Text>
          <Text size={24} b>
            {cardData.quantity}
          </Text>
        </Col>
      </Row>
    </CustomCard>
  );
}
