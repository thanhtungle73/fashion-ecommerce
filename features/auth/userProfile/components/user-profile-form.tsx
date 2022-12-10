import { Button, Card, Container, Divider, Grid, Input, Radio, Text } from '@nextui-org/react';
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import LoadingModal from 'components/Loading';
import { BaseUserProfile } from 'models';
import LeftCard from './left-card';

export interface IUserProfileFormProps {
  userInfo: Partial<BaseUserProfile> | null;
  loading: boolean;
  onFileChange: Function;
  onUploadClick: () => void;
  onSaveClick: (values: BaseUserProfile) => void;
  photo: Blob | Uint8Array | ArrayBuffer | null;
}

export default function UserProfileForm({
  userInfo,
  loading,
  onFileChange,
  onUploadClick,
  onSaveClick,
  photo,
}: IUserProfileFormProps) {
  const [isEdit, setIsEdit] = useState(false);

  const form = useForm<BaseUserProfile>({
    defaultValues: {
      birthday: '',
      gender: 'male',
      nickName: '',
      phoneNumber: '',
      displayName: '',
    },
    reValidateMode: 'onSubmit',
  });
  const { formState, reset, handleSubmit, control } = form;
  const { isSubmitting } = formState;

  // Show user values from fireStore in form fields.
  useEffect(() => {
    let defaults = {
      birthday: userInfo?.birthday ? userInfo?.birthday : '',
      gender: userInfo?.gender ? userInfo?.gender : 'male',
      nickName: userInfo?.nickName ? userInfo?.nickName : '',
      phoneNumber: userInfo?.phoneNumber ? userInfo?.phoneNumber : '',
      displayName: userInfo?.displayName ? userInfo?.displayName : '',
    };
    reset(defaults);
  }, [userInfo, reset]);

  const handleFileChange = (e: any) => {
    if (onFileChange) onFileChange(e);
  };

  const handleUploadClick = async () => {
    if (onUploadClick) await onUploadClick();
  };

  const handleSaveClick = async (values: BaseUserProfile) => {
    if (onSaveClick) {
      await onSaveClick(values);
      setIsEdit(false);
    }
  };

  const handleEditClick = () => {
    setIsEdit(!isEdit);
  };

  return (
    <Container md>
      <Grid.Container gap={2}>
        <Grid md={4} xs={4}>
          <LeftCard
            userInfo={userInfo}
            handleFileChange={handleFileChange}
            handleUploadClick={handleUploadClick}
            loading={loading}
            photo={photo}
          />
        </Grid>

        <Grid md={8} xs={8}>
          <Card css={{ marginTop: '24px' }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '4px 0 16px 0',
              }}
            >
              <Text h3 css={{ lineHeight: '40px' }}>
                Your Account
              </Text>
              {!isEdit && (
                <Button auto onClick={handleEditClick}>
                  Edit Profile
                </Button>
              )}
            </div>

            <Divider></Divider>

            <div style={{ padding: '24px 0' }}>
              <form onSubmit={handleSubmit(handleSaveClick)}>
                <Text size={14}>Display Name</Text>
                <Controller
                  control={control}
                  name="displayName"
                  render={({ field: { onChange, onBlur, value, name } }) => (
                    <Input
                      type="text"
                      aria-label="Display Name"
                      name={name}
                      value={value as string | undefined}
                      readOnly={!isEdit}
                      placeholder={userInfo?.displayName ? `${userInfo?.displayName}` : ''}
                      onChange={onChange}
                      onBlur={onBlur}
                      css={{ marginBottom: '16px' }}
                    ></Input>
                  )}
                />

                <Text size={14}>Nick Name</Text>
                <Controller
                  control={control}
                  name="nickName"
                  render={({ field: { onChange, onBlur, value, name } }) => (
                    <Input
                      type="text"
                      aria-label="Nick Name"
                      name={name}
                      value={value as string | undefined}
                      readOnly={!isEdit}
                      placeholder={userInfo?.nickName ? `${userInfo?.nickName}` : ''}
                      onChange={onChange}
                      onBlur={onBlur}
                      css={{ marginBottom: '16px' }}
                    ></Input>
                  )}
                />

                <Text size={14}>Phone Number</Text>
                <Controller
                  control={control}
                  name="phoneNumber"
                  render={({ field: { onChange, onBlur, value, name } }) => (
                    <Input
                      type="text"
                      aria-label="Phone Number"
                      name={name}
                      value={value as string | undefined}
                      readOnly={!isEdit}
                      placeholder={userInfo?.phoneNumber ? `${userInfo?.phoneNumber}` : ''}
                      onChange={onChange}
                      onBlur={onBlur}
                      css={{ marginBottom: '16px' }}
                    ></Input>
                  )}
                />

                <Text size={14}>Birthday</Text>
                <Controller
                  control={control}
                  name="birthday"
                  render={({ field: { onChange, onBlur, value, name } }) => (
                    <Input
                      aria-label="Birthday"
                      type="date"
                      name={name}
                      value={value as string | undefined}
                      onChange={onChange}
                      onBlur={onBlur}
                      readOnly={!isEdit}
                      css={{ marginBottom: '16px' }}
                    />
                  )}
                />

                <Text size={14}>Gender</Text>
                <Controller
                  control={control}
                  name="gender"
                  render={({ field: { onChange, onBlur, value, name } }) => (
                    <Radio.Group
                      value={value as 'male' | 'female' | 'others' | undefined}
                      row
                      disabled={!isEdit}
                      onBlur={onBlur}
                      onChange={onChange}
                      css={{ marginBottom: '16px' }}
                    >
                      <Radio value="male" size="xs">
                        Male
                      </Radio>
                      <Radio value="female" size="xs">
                        Female
                      </Radio>
                      <Radio value="others" size="xs">
                        Others
                      </Radio>
                    </Radio.Group>
                  )}
                />

                {isEdit && (
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      margin: 'auto',
                      marginTop: 16,
                    }}
                  >
                    <Button
                      auto
                      css={{ width: '20%', background: '#ccc', color: 'black' }}
                      onClick={handleEditClick}
                    >
                      Cancel
                    </Button>

                    <Button type="submit" auto css={{ width: '20%', marginLeft: '24px' }}>
                      Save Change
                    </Button>
                  </div>
                )}
              </form>
            </div>
          </Card>
        </Grid>
      </Grid.Container>

      {isSubmitting && <LoadingModal />}
    </Container>
  );
}
