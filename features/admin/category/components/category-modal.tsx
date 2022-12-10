import { firebase } from '@/app/firebase-client';
import { HEADER_HEIGHT } from '@/constants';
import { CategoryData } from '@/models/category';
import { getFile, uploadFile } from '@/utils/firebase';
import { yupResolver } from '@hookform/resolvers/yup';
import { Modal, Text } from '@nextui-org/react';
import { collection, doc, setDoc, updateDoc } from 'firebase/firestore';
import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import AdminHeader from '../../components/admin-header';

const ClientCategoryForm = dynamic(() => import('./category-form'), { ssr: false });

export interface CategoryModalProps {
  handleReloadPage: () => void;
  handleModalVisible: (isVisible: boolean) => void;
  setNewCategoryData: (categoryData: CategoryData | firebase.firestore.DocumentData) => void;
  onAddClick: () => void;
  modalVisible: boolean;
  category: CategoryData | firebase.firestore.DocumentData;
  isEdit: boolean;
}

export default function CategoryModal(props: CategoryModalProps) {
  const {
    handleReloadPage,
    handleModalVisible,
    setNewCategoryData,
    onAddClick,
    modalVisible,
    category = {},
    isEdit,
  } = props;
  const [loading, setLoading] = useState(false);

  const schema = yup
    .object({
      name: yup.string().required('This is required field.'),
      searchTerm: yup.string().required('This is required field.'),
      path: yup.string().required('This is required field.'),
      thumbnailUrl: yup
        .string()
        .url('Please enter URL format.')
        .required('This is required field.'),
      order: yup
        .number()
        .integer('Please enter the valid number.')
        .required('This is required field.'),
    })
    .required();

  const form = useForm({
    defaultValues: {
      name: '',
      searchTerm: '',
      path: '',
      order: 0,
      thumbnailUrl: '',
      isPublished: false,
    },
    reValidateMode: 'onSubmit',
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    let defaults = {
      name: category?.name ? category?.name : '',
      searchTerm: category?.searchTerm ? category?.searchTerm : '',
      path: category?.path ? category?.path : '',
      order: category?.order ? category?.order : 0,
      thumbnailUrl: category?.thumbnailUrl ? category?.thumbnailUrl : '',
      isPublished: category?.isPublished ? category?.isPublished : false,
    };
    form.reset(defaults);
  }, [category, form]);

  // Form actions handle.
  const closeHandler = () => {
    if (!handleModalVisible) return;
    handleModalVisible(false);
  };

  const handleAddClick = () => {
    if (!onAddClick) return;
    onAddClick();
  };

  const handleSubmit = async (values: CategoryData) => {
    try {
      const fireStore = firebase.firestore();

      if (isEdit && category.id) {
        const newCategoryRef = doc(fireStore, 'products-categories', category.id);
        await updateDoc(newCategoryRef, { ...values });
        handleModalVisible(false);
      } else {
        const newCategoryRef = doc(collection(fireStore, 'products-categories'));
        const data = { ...values, id: newCategoryRef.id, products: [''] };
        await setDoc(newCategoryRef, data);
      }
    } catch (error) {
      console.log('Failed to create category by: ', error);
    }
    if (!handleReloadPage) return;
    handleReloadPage();
  };

  const onFileUpload = async (e: any) => {
    if (category?.id && e.target.files[0]) {
      try {
        setLoading(true);
        const filePath = `products/categories/${category?.id}.jpg`;
        await uploadFile(e.target.files[0], filePath, setLoading);
        const fileUrl = await getFile(filePath);
        setNewCategoryData({ ...category, thumbnailUrl: fileUrl });
      } catch (error) {
        console.log('Failed to upload and get file URL by: ', error);
      }
    }
    setLoading(false);
  };

  return (
    <>
      <AdminHeader
        header="Category"
        label="+ Add New Category"
        info="The order from 1 to 4 will be displayed in homepage."
        handleAddClick={handleAddClick}
      />

      <Modal
        closeButton
        preventClose
        fullScreen
        width="800px"
        open={modalVisible}
        onClose={closeHandler}
        aria-labelledby="modal-title"
        style={{ marginTop: HEADER_HEIGHT, paddingBottom: HEADER_HEIGHT }}
      >
        <Modal.Header css={{ flexDirection: 'column', flexWrap: 'wrap' }}>
          <Text b id="modal-title" size={20}>
            {isEdit ? 'Edit Category' : 'Add category'}
          </Text>
          <Text size={14} color="$grey6">
            {isEdit ? 'Edit' : 'Add'} your Product category and necessary information from here
          </Text>
        </Modal.Header>
        <ClientCategoryForm
          form={form}
          isEdit={isEdit}
          loading={loading}
          onSubmit={handleSubmit}
          closeHandler={closeHandler}
          onFileUpload={onFileUpload}
          categoryThumbnailUrl={category.thumbnailUrl}
        />
      </Modal>
    </>
  );
}
