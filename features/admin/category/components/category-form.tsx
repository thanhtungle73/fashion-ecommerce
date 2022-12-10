import CustomInputField from '@/components/form-controls/text-field';
import UploadField from '@/components/form-controls/upload-field';
import { Button, Checkbox, Image, Loading, Modal, Row, Text } from '@nextui-org/react';
import React from 'react';
import { Controller } from 'react-hook-form';

export interface CategoryFormProps {
  form: any;
  isEdit: boolean;
  loading: boolean;
  categoryThumbnailUrl: string;
  closeHandler: () => void;
  onSubmit: (values: any) => void;
  onFileUpload: (e: any) => void;
}

export default function CategoryForm({
  form,
  isEdit,
  loading,
  categoryThumbnailUrl,
  closeHandler,
  onSubmit,
  onFileUpload,
}: CategoryFormProps) {
  const { formState, handleSubmit, control, reset } = form;
  const { isSubmitting, errors } = formState;

  const handleCloseClick = () => {
    if (!closeHandler) return;
    closeHandler();
  };

  const handleSubmitClick = (values: any) => {
    if (!onSubmit) return;
    onSubmit(values);
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
        <CustomInputField type="text" form={form} name="searchTerm" label="Search Term" />
        <CustomInputField type="text" form={form} name="path" label="Path" />
        <CustomInputField type="number" form={form} name="order" label="Order" />
        <CustomInputField
          type="text"
          form={form}
          name="thumbnailUrl"
          label="Image Url"
          placeholder="Please paste image url here or upload image file below"
        />
        <UploadField handleUploadFile={handleUploadFile} name="file-upload" label="Image Upload" />

        {loading && (
          <Row justify="center" align="center" css={{ height: 200 }}>
            <Loading>Uploading image...</Loading>
          </Row>
        )}

        {!loading && (
          <Row justify="center">
            {categoryThumbnailUrl ? (
              <Image src={categoryThumbnailUrl ?? ''} alt="category-image" height={200}></Image>
            ) : (
              <Text size={14}>Opps! No image to preview. Please upload the new one.</Text>
            )}
          </Row>
        )}

        <Controller
          control={control}
          name="isPublished"
          render={({ field: { onChange, onBlur, value, name } }) => (
            <Checkbox
              aria-label="id"
              color="primary"
              size="sm"
              isSelected={value}
              name={name}
              value={value}
              onChange={onChange}
              onBlur={onBlur}
              css={{ marginBottom: '32px' }}
            >
              Publish
            </Checkbox>
          )}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button auto flat color="error" disabled={isSubmitting} onClick={handleCloseClick}>
          Close
        </Button>
        <Button type="submit" auto disabled={isSubmitting}>
          {isSubmitting && <Loading type="points" size="sm" />}

          {isEdit ? 'Update Category' : 'Add category'}
        </Button>
      </Modal.Footer>
    </form>
  );
}
