import { firebase } from '@/app/firebase-client';
import { HEADER_HEIGHT } from '@/constants';
import { ProductData } from '@/models';
import { readAndPreview, uploadMultipleImages } from '@/utils';
import { deleteAllFiles } from '@/utils/firebase';
import { yupResolver } from '@hookform/resolvers/yup';
import { Modal, Text } from '@nextui-org/react';
import { collection, doc, setDoc, updateDoc } from 'firebase/firestore';
import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import AdminHeader from '../../components/admin-header';

const ClientProductForm = dynamic(() => import('./products-form'), { ssr: false });

export interface ProductsModalProps {
  handleReloadPage: () => void;
  handleModalVisible: (isVisible: boolean) => void;
  onAddClick: () => void;
  modalVisible: boolean;
  product: ProductData | firebase.firestore.DocumentData;
  isEdit: boolean;
}

export default function ProductsModal(props: ProductsModalProps) {
  const {
    handleReloadPage,
    handleModalVisible,
    onAddClick,
    modalVisible,
    product = {},
    isEdit,
  } = props;

  const [previewImages, setPreviewImages] = useState<Array<string | ArrayBuffer | null>>([]);
  const [uploadedImages, setUploadedImages] = useState<Array<string | ArrayBuffer | null>>([]);
  const fireStore = firebase.firestore();

  const schema = yup
    .object({
      name: yup.string().required('This is required field.'),
      originalPrice: yup
        .number()
        .min(1000, 'Please enter the valid price.')
        .required('This is required field.'),
      promotionPercent: yup.number().required('This is required field.'),
      description: yup.string().required('This is required field.'),
    })
    .required();

  const form = useForm({
    defaultValues: {
      name: '',
      category: {},
      originalPrice: 0,
      promotionPercent: 0,
      salePrice: 0,
      description: '',
      shortDescription: '',
      colors: [],
      sizes: [],
      soldQuantity: 0,
      isBestSeller: false,
      isFreeShip: false,
      isNew: false,
      isPromotion: false,
      thumbnailUrls: [],
    },
    reValidateMode: 'onSubmit',
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    let defaults = {
      name: product?.name ? product?.name : '',
      category: product?.category ? product?.category : {},
      thumbnailUrls: product?.thumbnailUrls ? product?.thumbnailUrls : [],
      originalPrice: product?.originalPrice ? product?.originalPrice : 0,
      promotionPercent: product?.promotionPercent ? product?.promotionPercent : 0,
      salePrice: product?.salePrice ? product?.salePrice : 0,
      description: product?.description ? product?.description : '',
      shortDescription: product?.shortDescription ? product?.shortDescription : '',
      colors: product?.colors ? product?.colors : [],
      sizes: product?.sizes ? product?.sizes : [],
      soldQuantity: product?.soldQuantity ? product?.soldQuantity : 0,
      isBestSeller: product?.isBestSeller ? product?.isBestSeller : false,
      isFreeShip: product?.isFreeShip ? product?.isFreeShip : false,
      isNew: product?.isNew ? product?.isNew : false,
      isPromotion: product?.isPromotion ? product?.isPromotion : false,
    };
    setPreviewImages(defaults?.thumbnailUrls);
    form.reset(defaults);
  }, [product, form]);

  // Form actions handle.
  const closeHandler = () => {
    if (!handleModalVisible) return;
    handleModalVisible(false);
  };

  const handleAddClick = () => {
    if (!onAddClick) return;
    onAddClick();
  };

  const onSubmit = async (values: ProductData) => {
    try {
      if (isEdit && product.id) {
        const newProductRef = doc(fireStore, 'products', product.id);

        if (uploadedImages.length > 0) {
          // Deleting all files before new upload.
          await deleteAllFiles(`products/${product?.id}/`);
          await uploadMultipleImages(uploadedImages, newProductRef).then((fileUrlArray) => {
            const data = { ...values, thumbnailUrls: fileUrlArray };

            updateDoc(newProductRef, data);
          });
        } else {
          await updateDoc(newProductRef, { ...values, thumbnailUrls: product?.thumbnailUrls });
        }

        handleModalVisible(false);
      } else {
        const newProductRef = doc(collection(fireStore, 'products'));
        // Deleting all files before new upload.
        await deleteAllFiles(`products/${newProductRef?.id}/`);
        await uploadMultipleImages(uploadedImages, newProductRef).then((fileUrlArray) => {
          const data = { ...values, id: newProductRef.id, thumbnailUrls: fileUrlArray };
          setDoc(newProductRef, data);
        });
      }
    } catch (error) {
      console.log('Failed to create product by: ', error);
    }
    if (handleReloadPage) handleReloadPage();
  };

  const onFileUpload = async (e: any) => {
    if (e.target.files.length) {
      const fileArray = Array.from(e.target.files).map((file: any) => file);
      setUploadedImages(fileArray);
      // Loop all files by map() method and return a Promise in an array.
      // Promise.all promises in array and return image in base64.
      Promise.all([].map.call(e.target.files, readAndPreview)).then((images: any) => {
        setPreviewImages(images);
      });
    }
  };

  return (
    <>
      <AdminHeader
        header="Products"
        label="+ Add New Product"
        info="Manage your products here and they will be displayed in shop page and home page."
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
        style={{
          marginTop: HEADER_HEIGHT,
          paddingBottom: HEADER_HEIGHT,
          overflowY: 'scroll',
        }}
      >
        <Modal.Header css={{ flexDirection: 'column', flexWrap: 'wrap' }}>
          <Text b id="modal-title" size={20}>
            {isEdit ? 'Edit product' : 'Add product'}
          </Text>
          <Text size={14} color="$grey6">
            {isEdit ? 'Edit' : 'Add'} your product and necessary information from here
          </Text>
        </Modal.Header>
        <ClientProductForm
          form={form}
          isEdit={isEdit}
          onSubmit={onSubmit}
          closeHandler={closeHandler}
          onFileUpload={onFileUpload}
          productThumbnailUrls={previewImages}
        />
      </Modal>
    </>
  );
}

// try {
//   setLoading(true);
//   let thumbnailUrlArray: Array<Promise<string>> = [];
//   // Deleting all files before new upload.
//   await deleteAllFiles(`products/${product?.id}/`);
//   thumbnailUrlArray = Array.from(e.target.files).map(async (file: any, index) => {
//     const filePath = `products/${product?.id}/${product?.id}_${index}.jpg`;
//     await uploadFile(file, filePath);
//     const fileUrl = await getFile(filePath);
//     return fileUrl;
//   });
//   Promise.all(thumbnailUrlArray).then((fileUrlArray) => {
//     setThumbnailUrls(fileUrlArray);
//     setLoading(false);
//   });
// } catch (error) {
//   console.log('Failed to upload and get file URL by: ', error);
//   setLoading(false);
// }
