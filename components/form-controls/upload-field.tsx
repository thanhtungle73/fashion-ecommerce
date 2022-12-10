import { Col, Input, Loading, Row, Text } from '@nextui-org/react';
import * as React from 'react';

export interface UploadFieldProps {
  name: string;
  label?: string;
  properties?: any;
  handleUploadFile: (e: any) => void;
}

export default function UploadField(props: UploadFieldProps) {
  const { handleUploadFile, name, label = '', properties } = props;
  return (
    <Row>
      <Col span={1.5}>
        <Text size={14}>{label}</Text>
      </Col>
      <Col>
        <Input
          type="file"
          aria-label={name}
          color="primary"
          size="md"
          shadow={false}
          label=""
          helperColor="error"
          onChange={handleUploadFile}
          {...properties}
          css={{ marginBottom: '32px', '& p': { fontSize: '13px' } }}
        ></Input>
      </Col>
    </Row>
  );
}
