import { Avatar, Button, Card, Loading, Text, Tooltip } from '@nextui-org/react';
import { BaseUserProfile } from 'models';
import React, { useState } from 'react';

export interface ILeftCardProps {
  userInfo: BaseUserProfile | null;
  photo: Blob | Uint8Array | ArrayBuffer | null;
  loading: boolean;
  handleFileChange: (e: any) => void;
  handleUploadClick: () => void;
}

export default function LeftCard({
  userInfo,
  loading,
  photo,
  handleFileChange,
  handleUploadClick,
}: ILeftCardProps) {
  const [toggleAvatarUpload, setToggleAvatarUpload] = useState(false);

  const handleAvatarClick = () => {
    setToggleAvatarUpload(!toggleAvatarUpload);
  };

  return (
    <Card css={{ marginTop: '24px' }}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '24px',
        }}
      >
        <Tooltip content={'Click to edit your avatar'} placement="topStart">
          <Avatar
            size="xl"
            zoomed
            pointer
            bordered
            src={userInfo?.photoURL ?? ''}
            text={
              (userInfo?.displayName ? userInfo?.displayName : '') ||
              (userInfo?.email ? userInfo?.email : '')
            }
            onClick={handleAvatarClick}
          ></Avatar>
        </Tooltip>
        <Text h3>{userInfo?.displayName || userInfo?.email}</Text>
        <Text size={14}>{userInfo?.email}</Text>
      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Text size={14} h4 css={{ mr: 12 }}>
          Follower:
          <Text span css={{ fontWeight: '400' }}>
            {10}
          </Text>
        </Text>
        <Text size={14} h4>
          Following:
          <Text span css={{ fontWeight: '400' }}>
            {10}
          </Text>
        </Text>
      </div>

      {toggleAvatarUpload && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            margin: '12px 0',
          }}
        >
          <input type="file" onChange={handleFileChange} style={{ marginBottom: '16px' }}></input>
          <Button size="sm" onClick={handleUploadClick} disabled={loading || !photo}>
            {loading ? <Loading type="points" color="white" size="sm" /> : 'Upload'}
          </Button>
        </div>
      )}
    </Card>
  );
}
