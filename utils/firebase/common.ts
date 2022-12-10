import {
  deleteObject,
  getDownloadURL,
  getStorage,
  listAll,
  ref,
  uploadBytes,
} from 'firebase/storage';

export const uploadFile = async (
  photo: Blob | Uint8Array | ArrayBuffer | null,
  filePath: string,
  setLoading?: any
) => {
  setLoading ? setLoading(true) : null;
  const storage = getStorage();
  const fileRef = ref(storage, filePath);
  if (!photo) return;

  await uploadBytes(fileRef, photo);
  setLoading ? setLoading(false) : null;
};

export const getFile = async (filePath: string) => {
  const storage = getStorage();
  const fileRef = ref(storage, filePath);
  const photoUrl = await getDownloadURL(fileRef);
  return photoUrl;
};

export const deleteAllFiles = async (directoryPath: string) => {
  const storage = getStorage();
  const listRef = ref(storage, directoryPath);
  listAll(listRef)
    .then((res) => {
      const promise = res.items.map((itemRef) => deleteObject(itemRef));
      Promise.all(promise);
    })
    .catch((error) => {
      console.log('Failed to delete all file in folder by: ', error);
    });
};
