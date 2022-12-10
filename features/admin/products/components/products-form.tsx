import { firebase } from '@/app/firebase-client';
import SingleCheckboxField from '@/components/form-controls/single-checkbox-field';
import CustomInputField from '@/components/form-controls/text-field';
import UploadField from '@/components/form-controls/upload-field';
import { ProductData } from '@/models';
import { CategoryData } from '@/models/category';
import { Button, Col, Image, Loading, Modal, Row, Text } from '@nextui-org/react';
import React, { useEffect, useState } from 'react';
import CalculatedSalePriceField from './form-controls/calculated-sale-price-field';
import CheckboxGroupField from './form-controls/checkbox-group-field';
import RadioGroupField from './form-controls/radio-group-field';

export interface ProductFormProps {
  form: any;
  isEdit: boolean;
  productThumbnailUrls: Array<string | ArrayBuffer | null>;
  closeHandler: () => void;
  onSubmit: (values: ProductData) => void;
  onFileUpload: (e: any) => void;
}

export default function ProductForm({
  form,
  isEdit,
  productThumbnailUrls,
  closeHandler,
  onSubmit,
  onFileUpload,
}: ProductFormProps) {
  const { formState, handleSubmit, watch, reset } = form;
  const { isSubmitting } = formState;
  const [categoryNameArray, setCategoryNameArray] = useState<Array<string>>([]);
  const [categoryList, setCategoryList] = useState<
    Array<CategoryData | firebase.firestore.DocumentData>
  >([]);
  const colorCheckboxes = [
    'Red',
    'Orange',
    'Yellow',
    'Green',
    'Blue',
    'Violet',
    'Grey',
    'While',
    'Black',
  ];
  const sizeCheckboxes = ['XS', 'S', 'M', 'L', 'XL'];

  useEffect(() => {
    (async () => {
      // Get all categories from fireStore on client.
      try {
        const fireStore = firebase.firestore();
        let categoriesData: Array<CategoryData | firebase.firestore.DocumentData> = [];
        const querySnapshot = await fireStore.collection('products-categories').get();
        querySnapshot.forEach((doc) => {
          categoriesData.push({ ...doc.data(), id: doc.id });
        });
        const CategoryNameList = categoriesData.map((x) => x.name);
        setCategoryList(categoriesData);
        setCategoryNameArray(CategoryNameList);
      } catch (error) {
        console.log('Failed to get all categories by: ', error);
      }
    })();
  }, []);

  const handleCloseClick = () => {
    if (!closeHandler) return;
    closeHandler();
  };

  const calculateSalePrice = (): string | undefined => {
    const watchedValues = watch(['originalPrice', 'promotionPercent']);
    const originalPrice = watchedValues[0];
    const promotionPercent = watchedValues[1];
    const calculatedPrice = originalPrice - (promotionPercent * originalPrice) / 100;
    return calculatedPrice.toString();
  };

  const handleSubmitClick = async (values: any) => {
    if (!onSubmit) return;
    const calculatedSalePrice =
      values.originalPrice - (values.promotionPercent * values.originalPrice) / 100;
    const newCategory = categoryList.filter((x) => x.name === values.category);

    const newValues = { ...values, salePrice: calculatedSalePrice, category: newCategory[0] };
    console.log('newValues: ', newValues);
    await onSubmit(newValues);
    reset();
  };

  const handleUploadFile = (e: any) => {
    if (!onFileUpload) return;
    onFileUpload(e);
  };

  return (
    <form onSubmit={handleSubmit(handleSubmitClick)}>
      <Modal.Body>
        <CustomInputField type="text" form={form} name="name" label="Name" />
        <RadioGroupField name="category" label="Category" form={form} values={categoryNameArray} />
        <CustomInputField
          type="number"
          form={form}
          name="originalPrice"
          label="Original Price"
          properties={{ labelRight: 'VND' }}
        />
        <CustomInputField
          type="number"
          form={form}
          name="promotionPercent"
          properties={{ labelRight: '%' }}
          label="Promotion Percent"
        />
        <CalculatedSalePriceField
          form={form}
          name="salePrice"
          properties={{ labelRight: 'VND' }}
          calculatedSalePrice={calculateSalePrice}
        />
        <CustomInputField type="text" form={form} name="description" label="Description" />
        <CustomInputField
          type="text"
          form={form}
          name="shortDescription"
          label="Short Description"
        />
        <CustomInputField type="number" form={form} name="soldQuantity" label="Sold Quantity" />
        <CheckboxGroupField form={form} name="colors" values={colorCheckboxes} />
        <CheckboxGroupField form={form} name="sizes" values={sizeCheckboxes} />
        <UploadField
          properties={{ multiple: true }}
          handleUploadFile={handleUploadFile}
          name="file-upload"
          label="Image Upload"
        />

        <Row justify="center">
          {productThumbnailUrls ? (
            productThumbnailUrls.map((productThumbnailUrl, index) => (
              <Col key={index} span={2}>
                <Image
                  src={(productThumbnailUrl as string) ?? ''}
                  alt="category-image"
                  height={200}
                ></Image>
              </Col>
            ))
          ) : (
            <Text size={14}>Opps! No image to preview. Please upload the new one.</Text>
          )}
        </Row>

        <SingleCheckboxField form={form} label="Is Bestseller" name="isBestSeller" />
        <SingleCheckboxField form={form} label="Is FreeShip" name="isFreeShip" />
        <SingleCheckboxField form={form} label="Is New" name="isNew" />
        <SingleCheckboxField form={form} label="Is Promotion" name="isPromotion" />
      </Modal.Body>
      <Modal.Footer>
        <Button auto flat color="error" disabled={isSubmitting} onClick={handleCloseClick}>
          Close
        </Button>
        <Button type="submit" auto disabled={isSubmitting}>
          {isSubmitting ? (
            <Loading type="points" size="sm" />
          ) : isEdit ? (
            'Update Product'
          ) : (
            'Add Product'
          )}

          {}
        </Button>
      </Modal.Footer>
    </form>
  );
}
