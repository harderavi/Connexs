// src/services/firebaseService.ts
import { ref, getDownloadURL, deleteObject, StorageReference, getMetadata, uploadBytesResumable } from 'firebase/storage';
import { storage } from '../firebase';




export const uploadResource = async (
  file: File,
  setProgress: (progress: number) => void
): Promise<{ downloadUrl: string, name: string, size: number, type: string }> => {
  const storageRef = ref(storage, `resources/${Date.now()}_${file.name}`);
  const uploadTask = uploadBytesResumable(storageRef, file);

  return new Promise((resolve, reject) => {
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress);
      },
      (error) => {
        reject(error);
      },
      async () => {
        try {
          const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
          const { name, size, type } = file;
          resolve({ downloadUrl, name, size, type });
        } catch (error) {
          reject(error);
        }
      }
    );
  });
};

// Define the type for the deleteResource function
export const deleteResource = async (url: string): Promise<void> => {
  const storageRef: StorageReference = ref(storage, url);
  await deleteObject(storageRef);
};





// Define the type for the fetchMetadata function
// Fetch metadata for a given resource URL
export const fetchMetadata = async (url: string) => {
  const storageRef: StorageReference = ref(storage, url);
  const metadata = await getMetadata(storageRef);
  return {
    name: metadata.name || '',
    size: metadata.size || 0,
    contentType: metadata.contentType || 'application/octet-stream', // Provide a default value if undefined
  };
};