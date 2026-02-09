import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase";

/**
 * Uploads a single file to Firebase Storage.
 * @param {File} file - The file object to upload.
 * @param {string} path - The folder path (e.g., 'media/images').
 * @returns {Promise<string>} - The download URL of the uploaded file.
 */
export const uploadFile = async (file, path = "media/misc") => {
    if (!file) throw new Error("No file provided");

    const storageRef = ref(storage, `${path}/${file.name}`);
    const snapshot = await uploadBytes(storageRef, file);
    return await getDownloadURL(snapshot.ref);
};

/**
 * Uploads multiple files to Firebase Storage.
 * @param {File[]} files - Array of file objects.
 * @param {string} path - The folder path.
 * @returns {Promise<string[]>} - Array of download URLs.
 */
export const uploadBatch = async (files, path = "media/misc") => {
    const uploadPromises = Array.from(files).map(file => uploadFile(file, path));
    return await Promise.all(uploadPromises);
};

/**
 * Helper to determine folder based on file type
 * @param {File} file 
 * @returns {string} - 'media/images', 'media/videos', or 'media/documents'
 */
export const getStoragePath = (file) => {
    if (file.type.startsWith('image/')) return 'media/images';
    if (file.type.startsWith('video/')) return 'media/videos';
    return 'media/documents';
};
