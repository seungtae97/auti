import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.join(__dirname, '../dist');
const indexHtml = path.join(distDir, 'index.html');
const notFoundHtml = path.join(distDir, '404.html');

try {
    if (fs.existsSync(indexHtml)) {
        fs.copyFileSync(indexHtml, notFoundHtml);
        console.log('✅ 404.html generated successfully.');
    } else {
        console.error('❌ index.html not found in dist directory.');
        process.exit(1);
    }
} catch (error) {
    console.error('❌ Error generating 404.html:', error);
    process.exit(1);
}
