import fs from 'fs';
import path from 'path';

export const initCloudinary = () => {
    // Tidak melakukan apa-apa karena Cloudinary diganti Local Storage
    console.log('Menggunakan Local Storage untuk gambar (Cloudinary disabled)');
};

export const uploadImage = async (filePath) => {
    try {
        const publicDir = path.join(process.cwd(), 'public');
        const uploadDir = path.join(publicDir, 'uploads');
        
        // Buat folder public/uploads jika belum ada
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }

        const fileName = path.basename(filePath);
        const destPath = path.join(uploadDir, fileName);

        // Pindahkan file dari temp ke public/uploads
        fs.renameSync(filePath, destPath);

        // Kembalikan URL relatif yang bisa diakses via Vite (misal: /uploads/namafile.jpg)
        return `/uploads/${fileName}`;
    } catch (error) {
        console.error('Local Upload Error:', error);
        throw new Error('Gagal menyimpan gambar secara lokal');
    }
};
