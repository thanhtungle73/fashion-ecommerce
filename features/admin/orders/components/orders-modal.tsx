import { firebase } from '@/app/firebase-client';
import { HEADER_HEIGHT } from '@/constants';
import { OrderData } from '@/models';
import { Modal, Text } from '@nextui-org/react';
import { doc, updateDoc } from 'firebase/firestore';
import dynamic from 'next/dynamic';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';

const ClientOrderForm = dynamic(() => import('./orders-form'), { ssr: false });

export interface OrderModalProps {
  handleReloadPage: () => void;
  handleModalVisible: (isVisible: boolean) => void;
  modalVisible: boolean;
  order: OrderData | firebase.firestore.DocumentData;
  isView: boolean;
}

export default function OrderModal(props: OrderModalProps) {
  const { handleReloadPage, handleModalVisible, modalVisible, order = {}, isView } = props;

  const fireStore = firebase.firestore();

  const form = useForm({
    defaultValues: {
      id: '',
      address: '',
      city: '',
      createdAt: 0,
      email: '',
      firstName: '',
      lastName: '',
      phone: '',
      productList: [],
      totalPrice: 0,
      status: 'processing',
    },
    reValidateMode: 'onSubmit',
  });

  useEffect(() => {
    let defaults = {
      id: order.id ? order.id : '',
      address: order.address ? order.address : '',
      city: order.city ? order.city : '',
      createdAt: order.createdAt ? order.createdAt : 0,
      email: order.email ? order.email : '',
      firstName: order.firstName ? order.firstName : '',
      lastName: order.lastName ? order.lastName : '',
      phone: order.phone ? order.phone : '',
      productList: order.productList ? order.productList : [],
      totalPrice: order.totalPrice ? order.totalPrice : 0,
      status: order.status ? order.status : 'processing',
    };
    form.reset(defaults);
  }, [order, form]);

  // Form actions handle.
  const closeHandler = () => {
    if (!handleModalVisible) return;
    handleModalVisible(false);
  };

  const onSubmitClick = async (values: any) => {
    if (order.id) {
      try {
        const newOrderRef = doc(fireStore, 'orders', order.id);
        await updateDoc(newOrderRef, values);
      } catch (error) {
        console.log('Failed to update the order by: ', error);
      }
    }
    if (handleReloadPage) handleReloadPage();
  };

  return (
    <>
      <Text h4 css={{ padding: '0 0 16px' }}>
        Orders
      </Text>
      <Modal
        closeButton
        preventClose
        width="900px"
        open={modalVisible}
        onClose={closeHandler}
        aria-labelledby="modal-title"
        style={{
          marginTop: HEADER_HEIGHT,
          paddingBottom: HEADER_HEIGHT,
        }}
      >
        <Modal.Header css={{ flexDirection: 'column', flexWrap: 'wrap' }}>
          <Text b id="modal-title" size={20}>
            {isView ? 'View Order' : 'Edit Order Status'}
          </Text>
          <Text size={14} color="$grey6">
            {isView ? 'View' : 'Change status'} your order and necessary information from here
          </Text>
        </Modal.Header>
        <ClientOrderForm
          form={form}
          isView={isView}
          closeHandler={closeHandler}
          onSubmitClick={onSubmitClick}
        />
      </Modal>
    </>
  );
}
