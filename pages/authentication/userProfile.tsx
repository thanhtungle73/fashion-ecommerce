import dynamic from 'next/dynamic';
import React from 'react';

export interface IUserProfilePageProps {}

// Client side rendering for private pages: user profile
const UserProfileFormClientSide = dynamic(() => import('features/auth/userProfile'), {
  ssr: false,
});

export default function UserProfilePage(props: IUserProfilePageProps) {
  return (
    <>
      <UserProfileFormClientSide />
    </>
  );
}
