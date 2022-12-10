import * as React from 'react';
import { Loading, Modal } from '@nextui-org/react';

export interface ILoadingModalProps {
  text?: string | null | undefined;
}

export default function LoadingModal({ text }: ILoadingModalProps) {
  return (
    <Modal open preventClose style={{ backgroundColor: 'transparent', boxShadow: 'none' }}>
      <Loading size="lg" color="white" textColor="white">
        Loading...
      </Loading>
    </Modal>
  );
}
