import { initializeApp } from 'firebase/app';
import { getStorage, ref, listAll, getDownloadURL } from 'firebase/storage';
import firebaseConfig from '../config/firebase.config';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

/**
 * Get all images from a folder in Firebase Storage
 * @param {string} folderPath - Path to the folder (e.g., 'gallery' or 'gallery/photos')
 * @returns {Promise<Array<{id: string, url: string, name: string, type: string}>>}
 */
export async function getGalleryImages(folderPath = 'gallery') {
    try {
        const folderRef = ref(storage, folderPath);
        const result = await listAll(folderRef);

        // Collect all items from current folder
        let allItems = [...result.items];

        // Also check if there are subfolders (prefixes) and fetch from them (1 level deep recursion)
        if (result.prefixes.length > 0) {
            for (const prefix of result.prefixes) {
                const subResult = await listAll(prefix);
                allItems = [...allItems, ...subResult.items];
            }
        }

        const images = await Promise.all(
            allItems.map(async (itemRef) => {
                const url = await getDownloadURL(itemRef);
                const name = itemRef.name;
                const isVideo = /\.(mp4|webm|mov|avi)$/i.test(name);

                return {
                    id: itemRef.fullPath,
                    url,
                    name,
                    type: isVideo ? 'video' : 'image',
                    isExclusive: true, // All Firebase images are exclusive by default
                };
            })
        );

        return images;
    } catch (error) {
        console.error('Error fetching gallery images:', error);
        throw error; // Re-throw to allow component to handle specific error UI
    }
}

/**
 * Get a single image URL
 * @param {string} imagePath - Full path to the image
 * @returns {Promise<string>}
 */
export async function getImageUrl(imagePath) {
    try {
        const imageRef = ref(storage, imagePath);
        return await getDownloadURL(imageRef);
    } catch (error) {
        console.error('Error fetching image URL:', error);
        return null;
    }
}

export { storage };
