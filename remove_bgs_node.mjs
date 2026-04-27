import { removeBackground } from '@imgly/background-removal-node';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const imageDir = path.join(__dirname, "public", "Opnsense", "Foto's");
const images = [
    "N150 intel Mini pc Hyper Visor Proxmox Firewall Router.png",
    "Ubuquit Switch.png",
    "Ubuquiti AccessPoint.png",
    "NUC Managment Mini PC.png",
    "Raspberry Pi 5 Pironman Max.jpg"
];

async function processImages() {
    console.log("Starting background removal process...");
    for (const filename of images) {
        const inputPath = path.join(imageDir, filename);
        if (fs.existsSync(inputPath)) {
            const ext = path.extname(filename);
            const base = path.basename(filename, ext);
            const outputPath = path.join(imageDir, `${base}_transparent.png`);
            
            console.log(`Processing: ${filename}`);
            try {
                const blob = await removeBackground(inputPath);
                const buffer = Buffer.from(await blob.arrayBuffer());
                fs.writeFileSync(outputPath, buffer);
                console.log(`Saved: ${base}_transparent.png`);
            } catch (err) {
                console.error(`Error processing ${filename}:`, err.message);
            }
        } else {
            console.log(`File not found: ${inputPath}`);
        }
    }
    console.log("All done!");
}
processImages();
