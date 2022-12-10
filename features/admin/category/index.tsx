import { firebase } from '@/app/firebase-client';
import LoadingModal from '@/components/Loading';
import { CategoryData } from '@/models/category';
import { deleteDoc, doc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import CategoryModal from './components/category-modal';
import CategoryTable from './components/category-table';

export interface AdminCategoryProps {}

export default function AdministrationCategory(props: AdminCategoryProps) {
  const [categoryArray, setCategoryArray] = useState<
    Array<CategoryData | firebase.firestore.DocumentData>
  >([]);
  const [category, setCategory] = useState<CategoryData | firebase.firestore.DocumentData>({});
  const [loading, setLoading] = useState(false);
  const [reload, setReload] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const fireStore = firebase.firestore();

  useEffect(() => {
    (async () => {
      // Get all categories from fireStore on client.
      try {
        setLoading(true);
        const fireStore = firebase.firestore();
        let categoriesData: Array<CategoryData | firebase.firestore.DocumentData> = [];
        const querySnapshot = await fireStore.collection('products-categories').get();
        querySnapshot.forEach((doc) => {
          categoriesData.push({ ...doc.data(), id: doc.id });
        });

        setCategoryArray(categoriesData);
        setLoading(false);
      } catch (error) {
        console.log('Failed to get all categories by: ', error);
      }
    })();
  }, [reload]);

  const onCategoryEdit = async (category: CategoryData | firebase.firestore.DocumentData) => {
    setModalVisible(true);
    setIsEdit(true);
    setCategory(category);
  };
  const onCategoryDelete = async (categoryId: string) => {
    await deleteDoc(doc(fireStore, 'products-categories', categoryId));
    setReload(!reload);
  };
  const onAddCategoryClick = () => {
    setModalVisible(true);
    setIsEdit(false);
    setCategory({});
  };
  const handleReloadPage = () => setReload(!reload);
  const handleModalVisible = (isVisible: boolean) => setModalVisible(isVisible);
  const setNewCategoryData = (category: CategoryData | firebase.firestore.DocumentData) => {
    setCategory(category);
  };

  if (loading) return <LoadingModal />;

  return (
    <>
      <CategoryModal
        handleReloadPage={handleReloadPage}
        handleModalVisible={handleModalVisible}
        onAddClick={onAddCategoryClick}
        setNewCategoryData={setNewCategoryData}
        modalVisible={modalVisible}
        category={category}
        isEdit={isEdit}
      />
      <CategoryTable
        categories={categoryArray}
        onDeleteAction={onCategoryDelete}
        onEditAction={onCategoryEdit}
      />
    </>
  );
}
