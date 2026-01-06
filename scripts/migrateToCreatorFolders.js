/**
 * Script para migrar archivos de Firebase Storage de la raíz a carpetas por creadora
 * 
 * Este script mueve las carpetas existentes:
 * - fotos-premium/ -> Camila/fotos-premium/
 * - gallery/ -> Camila/gallery/
 * - videos-free/ -> Camila/videos-free/
 * - videos-premium/ -> Camila/videos-premium/
 * - videos-preview/ -> Camila/videos-preview/
 */

import admin from 'firebase-admin';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Leer Service Account Key
const serviceAccountPath = join(__dirname, '../camila-8d151-firebase-adminsdk-fbsvc-4087e5f675.json');
const serviceAccount = JSON.parse(readFileSync(serviceAccountPath, 'utf-8'));

const firebaseConfig = {
    projectId: "camila-8d151",
    storageBucket: "camila-8d151.firebasestorage.app"
};

// Inicializar Firebase Admin
if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        storageBucket: firebaseConfig.storageBucket
    });
}

const bucket = admin.storage().bucket();

// Carpetas a migrar
const foldersToMigrate = [
    'fotos-premium',
    'gallery',
    'videos-free',
    'videos-premium',
    'videos-preview'
];

const targetCreator = 'Camila';

/**
 * Lista todos los archivos en una carpeta
 */
async function listFiles(folderPath) {
    const [files] = await bucket.getFiles({
        prefix: folderPath + '/',
        delimiter: '/'
    });
    return files;
}

/**
 * Copia un archivo a una nueva ubicación
 */
async function copyFile(sourceFile, destinationPath) {
    try {
        await sourceFile.copy(destinationPath);
        console.log(`✓ Copiado: ${sourceFile.name} -> ${destinationPath}`);
        return true;
    } catch (error) {
        console.error(`✗ Error copiando ${sourceFile.name}:`, error.message);
        return false;
    }
}

/**
 * Elimina un archivo
 */
async function deleteFile(file) {
    try {
        await file.delete();
        console.log(`✓ Eliminado: ${file.name}`);
        return true;
    } catch (error) {
        console.error(`✗ Error eliminando ${file.name}:`, error.message);
        return false;
    }
}

/**
 * Migra una carpeta completa
 */
async function migrateFolder(folderName) {
    console.log(`\n📁 Migrando carpeta: ${folderName}/`);
    console.log('─'.repeat(50));

    try {
        // Listar todos los archivos en la carpeta
        const files = await listFiles(folderName);
        
        if (files.length === 0) {
            console.log(`⚠️  No se encontraron archivos en ${folderName}/`);
            return { success: 0, failed: 0, skipped: 0 };
        }

        console.log(`📊 Encontrados ${files.length} archivos`);

        let successCount = 0;
        let failedCount = 0;

        // Procesar cada archivo
        for (const file of files) {
            const fileName = file.name.replace(`${folderName}/`, '');
            const newPath = `${targetCreator}/${folderName}/${fileName}`;

            // Copiar archivo
            const copied = await copyFile(file, newPath);
            
            if (copied) {
                // Eliminar archivo original solo si la copia fue exitosa
                const deleted = await deleteFile(file);
                if (deleted) {
                    successCount++;
                } else {
                    failedCount++;
                }
            } else {
                failedCount++;
            }
        }

        console.log(`\n✅ Completado: ${successCount} exitosos, ${failedCount} fallidos`);
        return { success: successCount, failed: failedCount };

    } catch (error) {
        console.error(`❌ Error migrando ${folderName}:`, error.message);
        return { success: 0, failed: 0, error: error.message };
    }
}

/**
 * Función principal
 */
async function main() {
    console.log('\n🚀 INICIANDO MIGRACIÓN DE FIREBASE STORAGE');
    console.log('═'.repeat(50));
    console.log(`📦 Proyecto: ${firebaseConfig.projectId}`);
    console.log(`🎯 Destino: ${targetCreator}/`);
    console.log('═'.repeat(50));

    const totalStats = {
        success: 0,
        failed: 0,
        folders: 0
    };

    // Migrar cada carpeta
    for (const folder of foldersToMigrate) {
        const stats = await migrateFolder(folder);
        totalStats.success += stats.success || 0;
        totalStats.failed += stats.failed || 0;
        if (stats.success > 0) totalStats.folders++;
    }

    // Resumen final
    console.log('\n' + '═'.repeat(50));
    console.log('📊 RESUMEN FINAL');
    console.log('═'.repeat(50));
    console.log(`✅ Archivos migrados exitosamente: ${totalStats.success}`);
    console.log(`❌ Archivos con errores: ${totalStats.failed}`);
    console.log(`📁 Carpetas procesadas: ${totalStats.folders}/${foldersToMigrate.length}`);
    console.log('═'.repeat(50));

    if (totalStats.failed === 0 && totalStats.success > 0) {
        console.log('\n🎉 ¡Migración completada exitosamente!');
        console.log(`\n📝 Próximo paso: Actualizar las rutas en el código para apuntar a "${targetCreator}/"`);
    } else if (totalStats.success === 0) {
        console.log('\n⚠️  No se migraron archivos. Verifica que las carpetas existan en Firebase Storage.');
    } else {
        console.log('\n⚠️  Migración completada con algunos errores. Revisa los logs arriba.');
    }

    process.exit(totalStats.failed > 0 ? 1 : 0);
}

// Ejecutar script
main().catch(error => {
    console.error('\n❌ ERROR FATAL:', error);
    process.exit(1);
});
