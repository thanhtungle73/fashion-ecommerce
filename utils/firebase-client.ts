import { doc, getDoc } from 'firebase/firestore';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import { BaseUserProfile, UserData } from 'models';
import { firebase } from '../app/firebase-client';

export const upload = async (
  photo: Blob | Uint8Array | ArrayBuffer | null,
  userDataContext: UserData | null,
  setLoading: any
) => {
  setLoading(true);
  const storage = getStorage();
  const fileRef = ref(storage, `userProfile/avatar/${userDataContext?.uid}.png`);
  if (!photo) return;

  await uploadBytes(fileRef, photo);
  setLoading(false);
};

export const getUserProfileFromFireStore = async (
  db: firebase.firestore.Firestore,
  userDataContext: UserData | null,
  setUserInfo: React.Dispatch<React.SetStateAction<any>>
) => {
  const docRef = doc(db, 'userProfile', `${userDataContext?.uid}`);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    setUserInfo(docSnap.data());
  }
};

export const createOrUpdateUserProfile = async (
  db: firebase.firestore.Firestore,
  data: BaseUserProfile
): Promise<firebase.firestore.DocumentData | undefined> => {
  const profileCollection = db.collection('userProfile');

  if (data.uid) {
    const currentProfile = await profileCollection.doc(data.uid).get();
    const _data = currentProfile.data() ? { ...currentProfile.data(), ...data } : { ...data };
    try {
      await profileCollection.doc(data.uid).set(JSON.parse(JSON.stringify({ ..._data })));
    } catch (e) {
      console.log('error', e);
    }

    return profileCollection.doc(data.uid).get();
  } else {
    return (await profileCollection.add(data)).get();
  }
};

// Storage
export const getUserPhoto = async (userDataContext: BaseUserProfile | null) => {
  const storage = getStorage();
  const fileRef = ref(storage, `userProfile/avatar/${userDataContext?.uid}.png`);
  const photoUrl = await getDownloadURL(fileRef);
  return photoUrl;
};
