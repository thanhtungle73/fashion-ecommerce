import { getFile, uploadFile } from './firebase';

export function formatPrice(price: number | null) {
  if (!price) return;

  return new Intl.NumberFormat('vi-Vn', { style: 'currency', currency: 'VND' }).format(price);
}

export function readAndPreview(file: any) {
  return new Promise((resolve, reject) => {
    let reader = new FileReader();

    reader.addEventListener(
      'load',
      () => {
        resolve(reader.result);
      },
      false
    );
    reader.addEventListener('error', reject);
    reader.readAsDataURL(file);
  });
}

export function uploadMultipleImages(uploadedImages: Array<any>, productRef: any) {
  return Promise.all(
    uploadedImages.map(async (file: any, index: number) => {
      const filePath = `products/${productRef?.id}/${productRef?.id}_${index}.jpg`;
      await uploadFile(file, filePath);
      const fileUrl = await getFile(filePath);
      return fileUrl;
    })
  );
}
