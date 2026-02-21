import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const inputPath = path.join(process.cwd(), 'public', 'dawid.jpg');
const outputPath = path.join(process.cwd(), 'public', 'dawid.avif');

if (fs.existsSync(inputPath)) {
  sharp(inputPath)
    .resize(128, 128, {
      fit: 'cover',
      position: 'center'
    })
    .avif({ quality: 60 })
    .toFile(outputPath)
    .then(info => console.log('Image converted successfully (AVIF):', info))
    .catch(err => console.error('Error converting image:', err));
} else {
  console.error('Input file not found:', inputPath);
}
