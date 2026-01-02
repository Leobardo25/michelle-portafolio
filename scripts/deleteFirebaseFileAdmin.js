import admin from 'firebase-admin';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Script para eliminar archivos de Firebase Storage usando Firebase Admin SDK
 * Requiere un archivo de credenciales de servicio (service account key)
 */

// Inicializar Firebase Admin
try {
    // Leer las credenciales del archivo serviceAccountKey.json
    const serviceAccount = JSON.parse(
        readFileSync(join(__dirname, '../serviceAccountKey.json'), 'utf8')
    );

    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        storageBucket: 'camila-8d151.firebasestorage.app'
    });

    console.log('✅ Firebase Admin inicializado correctamente');
} catch (error) {
    console.error('❌ Error al inicializar Firebase Admin:', error.message);
    console.error('\n📝 Asegúrate de tener el archivo serviceAccountKey.json en la raíz del proyecto');
    console.error('   Instrucciones en: FIREBASE_ADMIN_SETUP.md');
    process.exit(1);
}

/**
 * Eliminar un archivo de Firebase Storage
 * @param {string} filePath - Ruta del archivo (ej: 'videos-free/archivo.mp4')
 */
async function deleteFile(filePath) {
    try {
        const bucket = admin.storage().bucket();
        const file = bucket.file(filePath);

        // Verificar si el archivo existe
        const [exists] = await file.exists();
        
        if (!exists) {
            console.error(`❌ El archivo no existe: ${filePath}`);
            return false;
        }

        // Eliminar el archivo
        await file.delete();
        console.log(`✅ Archivo eliminado exitosamente: ${filePath}`);
        return true;
    } catch (error) {
        console.error(`❌ Error al eliminar archivo:`, error.message);
        return false;
    }
}

/**
 * Listar archivos en una carpeta (opcional - para debugging)
 */
async function listFiles(folderPath) {
    try {
        const bucket = admin.storage().bucket();
        const [files] = await bucket.getFiles({ prefix: folderPath });
        
        console.log(`\n📁 Archivos en ${folderPath}:`);
        files.forEach(file => {
            console.log(`   - ${file.name}`);
        });
        
        return files;
    } catch (error) {
        console.error(`❌ Error al listar archivos:`, error.message);
        return [];
    }
}

// ============================================
// CONFIGURACIÓN: Archivo a eliminar
// ============================================
const fileToDelete = 'videos-free/5f2b391ac28c105d7fe1a_source.mp4';

// Ejecutar
console.log(`\n🗑️  Eliminando archivo: ${fileToDelete}\n`);

deleteFile(fileToDelete)
    .then((success) => {
        if (success) {
            console.log('\n✅ Proceso completado exitosamente');
        } else {
            console.log('\n❌ No se pudo eliminar el archivo');
        }
        process.exit(success ? 0 : 1);
    })
    .catch((error) => {
        console.error('\n❌ Error inesperado:', error);
        process.exit(1);
    });
