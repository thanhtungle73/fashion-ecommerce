import { firebase } from '@/app/firebase-client';
import LoadingModal from '@/components/Loading';
import { OrderData } from '@/models';
import { deleteDoc, doc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import OrderModal from './components/orders-modal';
import OrdersTable from './components/orders-table';

export interface OrdersFeatureProps {}

export default function OrdersFeature(props: OrdersFeatureProps) {
  const [orderArrayList, setOrderArrayList] = useState<
    Array<OrderData | firebase.firestore.DocumentData>
  >([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [isView, setIsView] = useState(false);
  const [reload, setReload] = useState(false);
  const [orderData, setOrderData] = useState<OrderData | firebase.firestore.DocumentData>({});
  const fireStore = firebase.firestore();

  // Get all products from fireStore on client.
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const fireStore = firebase.firestore();
        let orderListData: Array<firebase.firestore.DocumentData> = [];
        const querySnapshot = await fireStore.collection('orders').get();
        querySnapshot.forEach((doc) => {
          orderListData.push({ ...doc.data(), id: doc.id });
        });

        setOrderArrayList(orderListData);
      } catch (error) {
        console.log('Failed to get all products by: ', error);
      }
      setLoading(false);
    })();
  }, [reload]);

  const onViewAction = (order: OrderData | firebase.firestore.DocumentData) => {
    setModalVisible(true);
    setIsView(true);
    setOrderData(order);
  };

  const onStatusAction = (order: OrderData | firebase.firestore.DocumentData) => {
    setModalVisible(true);
    setIsView(false);
    setOrderData(order);
  };

  const onDeleteAction = async (orderId: string) => {
    await deleteDoc(doc(fireStore, 'orders', orderId));
    setReload(!reload);
  };

  const handleReloadPage = () => setReload(!reload);
  const handleModalVisible = (isVisible: boolean) => setModalVisible(isVisible);

  if (loading) return <LoadingModal />;

  return (
    <>
      <OrderModal
        isView={isView}
        order={orderData}
        modalVisible={modalVisible}
        handleReloadPage={handleReloadPage}
        handleModalVisible={handleModalVisible}
      />

      <OrdersTable
        orderArrayList={orderArrayList}
        onViewAction={onViewAction}
        onDeleteAction={onDeleteAction}
        onStatusAction={onStatusAction}
      />
    </>
  );
}
