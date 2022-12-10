import { firebase } from '@/app/firebase-client';
import LoadingModal from '@/components/Loading';
import { ProductData } from '@/models';
import { deleteDoc, doc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import ProductsModal from './components/products-modal';
import ProductTable from './components/products-table';

export interface AdministrationProductsProps {}

export default function AdministrationProducts(props: AdministrationProductsProps) {
  const fireStore = firebase.firestore();
  const [productArray, setProductArray] = useState<
    Array<ProductData | firebase.firestore.DocumentData>
  >([]);
  const [product, setProduct] = useState<ProductData | firebase.firestore.DocumentData>({});
  const [loading, setLoading] = useState(false);
  const [reload, setReload] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  // Get all products from fireStore on client.
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const fireStore = firebase.firestore();
        let productListData: Array<ProductData | firebase.firestore.DocumentData> = [];
        const querySnapshot = await fireStore.collection('products').get();
        querySnapshot.forEach((doc) => {
          productListData.push({ ...doc.data(), id: doc.id });
        });

        setProductArray(productListData);
      } catch (error) {
        console.log('Failed to get all products by: ', error);
      }
      setLoading(false);
    })();
  }, [reload]);

  const handleReloadPage = () => setReload(!reload);
  const handleModalVisible = (isVisible: boolean) => setModalVisible(isVisible);

  const onAddAction = () => {
    setModalVisible(true);
    setIsEdit(false);
    setProduct({});
  };

  const onEditAction = async (product: ProductData | firebase.firestore.DocumentData) => {
    setModalVisible(true);
    setIsEdit(true);
    setProduct(product);
  };

  const onDeleteAction = async (categoryId: string) => {
    await deleteDoc(doc(fireStore, 'products', categoryId));
    setReload(!reload);
  };

  if (loading) return <LoadingModal />;

  return (
    <>
      <ProductsModal
        isEdit={isEdit}
        product={product}
        modalVisible={modalVisible}
        onAddClick={onAddAction}
        handleReloadPage={handleReloadPage}
        handleModalVisible={handleModalVisible}
      />
      <ProductTable
        products={productArray}
        onEditAction={onEditAction}
        onDeleteAction={onDeleteAction}
      />
    </>
  );
}
