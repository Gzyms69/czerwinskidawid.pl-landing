import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const inputPath = path.join(process.cwd(), 'public', 'dawid.jpg');
const outputPath = path.join(process.cwd(), 'public', 'dawid.webp');

if (fs.existsSync(inputPath)) {
  sharp(inputPath)
    .resize(128, 128, {
      fit: 'cover',
      position: 'center'
    })
    .webp({ quality: 80 })
    .toFile(outputPath)
    .then(info => console.log('Image converted successfully:', info))
    .catch(err => console.error('Error converting image:', err));
} else {
  console.error('Input file not found:', inputPath);
}
