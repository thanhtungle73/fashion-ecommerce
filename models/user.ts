export interface BaseUserProfile {

  uid?: string | null;
  email?: string | null;
  displayName?: string | null;
  photoURL?: string | null;
  gender?: 'male' | 'female' | 'others' | null;
  follower?: number | null;
  following?: number | null;
  bio?: string | null;
  phoneNumber?: string | number | null;
  birthday?: string | null;
  nickName?: string | null;
  location?: string | null;
}

