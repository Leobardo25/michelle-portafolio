/**
 * Script to upload all images from the Free folder to Firebase Storage
 * Run with: node scripts/uploadToFirebase.mjs
 */

import { initializeApp } from 'firebase/app';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCDlY8QoJ5dhTqgdPutWkshcRiPD8gg3Zw",
    authDomain: "camila-8d151.firebaseapp.com",
    projectId: "camila-8d151",
    storageBucket: "camila-8d151.firebasestorage.app",
    messagingSenderId: "137954369430",
    appId: "1:137954369430:web:e732312a44783a799f07b7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

// Source folder with images
const SOURCE_FOLDER = path.join(__dirname, '..', 'Free');
const DESTINATION_FOLDER = 'gallery';

// Supported file extensions
const SUPPORTED_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.mp4', '.webm', '.mov'];

async function uploadFile(filePath, fileName) {
    try {
        const fileBuffer = fs.readFileSync(filePath);
        const storageRef = ref(storage, `${DESTINATION_FOLDER}/${fileName}`);

        // Determine content type
        const ext = path.extname(fileName).toLowerCase();
        let contentType = 'image/jpeg';
        if (ext === '.png') contentType = 'image/png';
        if (ext === '.gif') contentType = 'image/gif';
        if (ext === '.webp') contentType = 'image/webp';
        if (ext === '.mp4') contentType = 'video/mp4';
        if (ext === '.webm') contentType = 'video/webm';
        if (ext === '.mov') contentType = 'video/quicktime';

        const metadata = { contentType };

        await uploadBytes(storageRef, fileBuffer, metadata);
        const downloadURL = await getDownloadURL(storageRef);

        console.log(`✅ Uploaded: ${fileName}`);
        return { success: true, fileName, url: downloadURL };
    } catch (error) {
        console.error(`❌ Error uploading ${fileName}:`, error.message);
        return { success: false, fileName, error: error.message };
    }
}

async function main() {
    console.log('🚀 Starting upload to Firebase Storage...\n');
    console.log(`📁 Source: ${SOURCE_FOLDER}`);
    console.log(`📤 Destination: gs://camila-8d151.firebasestorage.app/${DESTINATION_FOLDER}\n`);

    // Check if source folder exists
    if (!fs.existsSync(SOURCE_FOLDER)) {
        console.error('❌ Source folder not found:', SOURCE_FOLDER);
        process.exit(1);
    }

    // Get all files
    const files = fs.readdirSync(SOURCE_FOLDER).filter(file => {
        const ext = path.extname(file).toLowerCase();
        return SUPPORTED_EXTENSIONS.includes(ext);
    });

    console.log(`📸 Found ${files.length} files to upload\n`);

    let successCount = 0;
    let errorCount = 0;

    // Upload files in batches of 5 to avoid overwhelming the connection
    const BATCH_SIZE = 5;
    for (let i = 0; i < files.length; i += BATCH_SIZE) {
        const batch = files.slice(i, i + BATCH_SIZE);
        const promises = batch.map(file => {
            const filePath = path.join(SOURCE_FOLDER, file);
            return uploadFile(filePath, file);
        });

        const results = await Promise.all(promises);

        results.forEach(result => {
            if (result.success) successCount++;
            else errorCount++;
        });

        // Progress update
        const progress = Math.min(i + BATCH_SIZE, files.length);
        console.log(`\n📊 Progress: ${progress}/${files.length} (${Math.round(progress / files.length * 100)}%)\n`);
    }

    console.log('\n========================================');
    console.log('📊 UPLOAD COMPLETE');
    console.log('========================================');
    console.log(`✅ Successful: ${successCount}`);
    console.log(`❌ Failed: ${errorCount}`);
    console.log(`📁 Total files: ${files.length}`);
    console.log('========================================\n');
}

main().catch(console.error);
