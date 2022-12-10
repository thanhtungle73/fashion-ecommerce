import { Button, Col, Row, Text } from '@nextui-org/react';
import * as React from 'react';

export interface AdminHeaderProps {
  header?: string;
  label: string;
  info?: string;
  handleAddClick: () => void;
}

export default function AdminHeader({ header, label, info, handleAddClick }: AdminHeaderProps) {
  return (
    <>
      <Row>
        <Text h4>{header}</Text>
      </Row>
      <Row
        fluid
        justify="space-between"
        css={{ margin: '0 auto 16px', background: '$accents1', padding: '16px 0' }}
      >
        <Col span={10} css={{ margin: 'auto' }}>
          <Text size={14}>
            {info && (
              <>
                <i className="fa-solid fa-circle-info fa-lg" style={{ marginRight: '8px' }}></i>
                {info}
              </>
            )}
          </Text>
        </Col>
        <Col span={2}>
          <Button auto onClick={handleAddClick}>
            {label}
          </Button>
        </Col>
      </Row>
    </>
  );
}
