import { createOrUpdateUserProfile, getUserPhoto, upload } from '@/utils/firebase-client';
import LoadingModal from 'components/Loading';
import { useAuthContext } from 'contexts/authentication';
import { doc, getDoc } from 'firebase/firestore';
import { BaseUserProfile } from 'models';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { firebase } from '../../../app/firebase-client';
import UserProfileForm from './components/user-profile-form';

export interface IUserProfileProps {}

export default function UserProfile(props: IUserProfileProps) {
  const { userDataContext, firstLoading, setNewUser } = useAuthContext();
  const router = useRouter();
  const fireStore = firebase.firestore();

  const [photo, setPhoto] = useState(null);
  const [photoLoading, setPhotoLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userInfo, setUserInfo] = useState<Partial<BaseUserProfile> | null>(null);

  const handleFileChange = (e: any) => {
    if (e.target.files[0]) {
      setPhoto(e.target.files[0]);
    }
  };

  const handleUploadClick = async () => {
    try {
      setLoading(true);
      await upload(photo, userDataContext, setPhotoLoading);
      const photoURL = await getUserPhoto(userDataContext);
      const userData = { ...userDataContext, photoURL };
      await createOrUpdateUserProfile(fireStore, userData);
      setNewUser(userData);
      setUserInfo(userData);
    } catch (error) {
      console.log('Failed to upload and get photo URL by: ', error);
    }
    setLoading(false);
  };

  const handleSaveClick = async (values: BaseUserProfile) => {
    try {
      setLoading(true);
      const userData = { ...userDataContext, ...values };
      await createOrUpdateUserProfile(fireStore, userData);
      setNewUser(userData);
      setUserInfo(userData);
    } catch (error) {
      console.log('Failed to save change by: ', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    (async () => {
      if (!firstLoading && !userDataContext?.email) router.push('/authentication?form=login');

      // Get user profile from fireStore on client.
      try {
        const fireStore = firebase.firestore();
        const docRef = doc(fireStore, 'userProfile', `${userDataContext?.uid}`);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserInfo(docSnap.data());
        }
      } catch (error) {
        console.log('Failed to get user profile on user profile page by: ', error);
      }
    })();
  }, [router, userDataContext, firstLoading]);

  if (firstLoading && !userDataContext?.email) return <LoadingModal />;

  return (
    <>
      <UserProfileForm
        userInfo={userInfo}
        loading={photoLoading}
        onFileChange={handleFileChange}
        onUploadClick={handleUploadClick}
        onSaveClick={handleSaveClick}
        photo={photo}
      />

      {loading && <LoadingModal text="load" />}
    </>
  );
}
