import { initializeApp } from 'firebase/app';
import { getStorage, ref, deleteObject } from 'firebase/storage';
import firebaseConfig from '../src/config/firebase.config.js';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

/**
 * Delete a specific file from Firebase Storage
 * @param {string} filePath - Path to the file (e.g., 'videos-free/filename.mp4')
 */
async function deleteFile(filePath) {
    try {
        const fileRef = ref(storage, filePath);
        await deleteObject(fileRef);
        console.log(`✅ Archivo eliminado exitosamente: ${filePath}`);
    } catch (error) {
        if (error.code === 'storage/object-not-found') {
            console.error(`❌ Error: El archivo no existe: ${filePath}`);
        } else {
            console.error(`❌ Error al eliminar archivo:`, error.message);
        }
    }
}

// File to delete
const fileToDelete = 'videos-free/5f2b391ac28c105d7fe1a_source.mp4';

console.log(`🗑️  Eliminando archivo: ${fileToDelete}`);
deleteFile(fileToDelete)
    .then(() => {
        console.log('✅ Proceso completado');
        process.exit(0);
    })
    .catch((error) => {
        console.error('❌ Error:', error);
        process.exit(1);
    });
