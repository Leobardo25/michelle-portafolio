import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import fs from 'fs';
import path from 'path';

const firebaseConfig = {
    apiKey: "AIzaSyCDlY8QoJ5dhTqgdPutWkshcRiPD8gg3Zw",
    authDomain: "camila-8d151.firebaseapp.com",
    projectId: "camila-8d151",
    storageBucket: "camila-8d151.firebasestorage.app",
    messagingSenderId: "137954369430",
    appId: "1:137954369430:web:e732312a44783a799f07b7",
    measurementId: "G-LBXE1KVGDL"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

const SOURCE_DIR = 'd:\\Camilla\\Free Videos';
const TARGET_FOLDER = 'videos-free';

async function uploadFiles() {
    if (!fs.existsSync(SOURCE_DIR)) {
        console.error(`Source directory not found: ${SOURCE_DIR}`);
        return;
    }

    const files = fs.readdirSync(SOURCE_DIR);
    console.log(`Found ${files.length} files in ${SOURCE_DIR}`);

    let count = 0;
    for (const file of files) {
        if (!file.toLowerCase().endsWith('.mp4')) continue;

        console.log(`[${++count}/${files.length}] Uploading ${file}...`);
        try {
            const filePath = path.join(SOURCE_DIR, file);
            const buffer = fs.readFileSync(filePath);
            const storageRef = ref(storage, `${TARGET_FOLDER}/${file}`);

            // Standard metadata
            const metadata = {
                contentType: 'video/mp4',
            };

            await uploadBytes(storageRef, buffer, metadata);
            console.log(`✅ Success: ${file}`);
        } catch (error) {
            console.error(`❌ Error uploading ${file}:`, error.message);
            if (error.code === 'storage/unauthorized') {
                console.error("   Reason: Permission denied. Rules likely require authentication.");
                process.exit(1);
            }
        }
    }
}

uploadFiles().catch(console.error);
