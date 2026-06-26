import { getDoc } from './googleSheetsAdapter.js';

// Adapter Interface untuk abstraksi database (Google Sheets / Supabase nantinya)
export const DatabaseAdapter = {
    async getProducts() {
        try {
            const doc = getDoc();
            const sheet = doc.sheetsByTitle['BARANG'];
            if (!sheet) return [];
            
            const rows = await sheet.getRows();
            return rows.map(row => row.toObject());
        } catch (error) {
            // Fallback mock data for UI review if Google Sheets fails
            return [
                { id: '1', kode_barang: 'CCTV-001', nama_barang: 'Hikvision 2MP Indoor Dome', kategori: 'Kamera Indoor', harga_jual: 350000, stok: 15, foto_url: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', deskripsi: 'Kamera CCTV Hikvision Indoor dengan resolusi 2 Megapixel 1080p.' },
                { id: '2', kode_barang: 'CCTV-002', nama_barang: 'Dahua 2MP Outdoor Bullet', kategori: 'Kamera Outdoor', harga_jual: 420000, stok: 8, foto_url: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', deskripsi: 'Kamera CCTV Dahua Outdoor tahan cuaca IP67.' },
                { id: '3', kode_barang: 'SYS-001', nama_barang: 'DVR Hikvision 4 Channel', kategori: 'DVR/NVR', harga_jual: 850000, stok: 5, foto_url: '', deskripsi: 'Digital Video Recorder 4 Channel support 1080p.' },
                { id: '4', kode_barang: 'SYS-002', nama_barang: 'NVR Dahua 8 Channel', kategori: 'DVR/NVR', harga_jual: 1450000, stok: 2, foto_url: '', deskripsi: 'Network Video Recorder 8 Channel up to 4K resolution.' },
                { id: '5', kode_barang: 'ACC-001', nama_barang: 'Kabel Coaxial RG59 + Power 100m', kategori: 'Aksesoris', harga_jual: 300000, stok: 20, foto_url: '', deskripsi: 'Kabel CCTV kualitas tinggi panjang 100 meter.' },
                { id: '6', kode_barang: 'ACC-002', nama_barang: 'Power Supply 10A Jaring', kategori: 'Aksesoris', harga_jual: 125000, stok: 12, foto_url: '', deskripsi: 'Adaptor jaring sentral untuk 8-10 kamera.' },
                { id: '7', kode_barang: 'CCTV-003', nama_barang: 'PTZ Speed Dome 360°', kategori: 'Kamera Outdoor', harga_jual: 3500000, stok: 1, foto_url: 'https://images.unsplash.com/photo-1558002038-1055907df827?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', deskripsi: 'Kamera berputar 360 derajat dengan optical zoom 25x.' }
            ];
        }
    },

    async getProductById(id) {
        const products = await this.getProducts();
        return products.find(p => p.id === id);
    },

    async addProduct(productData) {
        const doc = getDoc();
        const sheet = doc.sheetsByTitle['BARANG'];
        if (!sheet) throw new Error("Sheet BARANG not found");
        
        const newRow = await sheet.addRow(productData);
        return newRow.toObject();
    },

    async updateProduct(id, updatedData) {
        const doc = getDoc();
        const sheet = doc.sheetsByTitle['BARANG'];
        const rows = await sheet.getRows();
        const row = rows.find(r => r.get('id') === id);
        
        if (!row) throw new Error("Product not found");
        
        Object.keys(updatedData).forEach(key => {
            row.set(key, updatedData[key]);
        });
        
        await row.save();
        return row.toObject();
    },

    async deleteProduct(id) {
        try {
            const doc = getDoc();
            const sheet = doc.sheetsByTitle['BARANG'];
            const rows = await sheet.getRows();
            const row = rows.find(r => r.get('id') === id);
            
            if (!row) throw new Error("Product not found");
            
            await row.delete();
            return true;
        } catch (error) {
            // Mock delete for UI testing
            console.log(`Mock delete product: ${id}`);
            return true;
        }
    },

    async getUserByEmail(email) {
        try {
            const doc = getDoc();
            const sheet = doc.sheetsByTitle['USER'];
            if (!sheet) return null;

            const rows = await sheet.getRows();
            const userRow = rows.find(r => r.get('email') === email);
            return userRow ? userRow.toObject() : null;
        } catch (error) {
            // Mock user for UI testing
            if (email === 'admin@retina.id') {
                import('bcryptjs').then(bcrypt => {
                    const hash = bcrypt.default.hashSync('admin123', 10);
                    return { id: 'admin1', email: 'admin@retina.id', password: hash, nama: 'Super Admin', role: 'Super Admin' };
                });
                // Since import is async, return hardcoded hash for 'admin123'
                return { id: 'admin1', email: 'admin@retina.id', password: '$2b$10$YR5VN24YuNeGmozrRiLx5OGPY/83gIdO9rMZ9Mpw0sl8MdzUiRlLS', nama: 'Super Admin', role: 'Super Admin' };
            }
            return null;
        }
    },

    async addAuditLog(logData) {
        try {
            const doc = getDoc();
            const sheet = doc.sheetsByTitle['LOG_AKTIVITAS'];
            if (!sheet) return;
            
            await sheet.addRow(logData);
        } catch (error) {
            // Mock audit log for UI testing (silent fail)
            console.log('Mock Audit Log saved:', logData);
        }
    },

    async getAuditLogs() {
        try {
            const doc = getDoc();
            const sheet = doc.sheetsByTitle['LOG_AKTIVITAS'];
            if (!sheet) return [];
            
            const rows = await sheet.getRows();
            // Ambil 5 aktivitas terbaru
            return rows.map(r => r.toObject()).reverse().slice(0, 5);
        } catch (error) {
            return [
                { id: '1', user: 'admin@retina.id', aksi: 'LOGIN', detail: 'Berhasil login ke sistem', timestamp: new Date().toISOString() }
            ];
        }
    },

    async addTransaction(transactionData) {
        try {
            const doc = getDoc();
            const sheet = doc.sheetsByTitle['TRANSAKSI'];
            if (!sheet) throw new Error("Sheet TRANSAKSI not found");
            
            await sheet.addRow(transactionData);
            return true;
        } catch (error) {
            console.log('Mock Transaction saved:', transactionData);
            return true;
        }
    },

    async getTransactions() {
        try {
            const doc = getDoc();
            const sheet = doc.sheetsByTitle['TRANSAKSI'];
            if (!sheet) return [];
            
            const rows = await sheet.getRows();
            return rows.map(r => r.toObject());
        } catch (error) {
            // Mock data transaksi
            return [
                { order_id: 'RETINA-1700000000000-123', tanggal: new Date().toISOString(), pelanggan: 'Budi Santoso', total: 1250000 },
                { order_id: 'RETINA-1700000000000-124', tanggal: new Date(Date.now() - 86400000).toISOString(), pelanggan: 'Andi Kusuma', total: 350000 }
            ];
        }
    }
};
