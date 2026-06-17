import { DatabaseAdapter } from '../adapters/DatabaseAdapter.js';
import { uploadImage } from '../adapters/cloudinaryAdapter.js';

export const getProducts = async (req, res) => {
    try {
        const products = await DatabaseAdapter.getProducts();
        res.json(products);
    } catch (error) {
        console.error('Get Products Error:', error);
        res.status(500).json({ error: 'Gagal mengambil data produk' });
    }
};

export const addProduct = async (req, res) => {
    try {
        const { nama_barang, kategori, deskripsi, harga_beli, harga_jual, stok, satuan } = req.body;
        
        // Validasi
        if (!nama_barang || !harga_jual) {
            return res.status(400).json({ error: 'Nama barang dan Harga jual wajib diisi' });
        }
        if (Number(harga_jual) < 0 || Number(stok) < 0) {
            return res.status(400).json({ error: 'Harga dan stok tidak boleh negatif' });
        }

        let foto_url = '';
        if (req.file) {
            foto_url = await uploadImage(req.file.path);
        }

        const newProduct = {
            id: `PRD-${Date.now()}`,
            kode_barang: req.body.kode_barang || `KB-${Date.now()}`,
            nama_barang,
            kategori,
            deskripsi,
            harga_beli: harga_beli || 0,
            harga_jual,
            stok: stok || 0,
            satuan: satuan || 'pcs',
            foto_url,
            created_at: new Date().toISOString()
        };

        const addedProduct = await DatabaseAdapter.addProduct(newProduct);

        // Audit Log
        await DatabaseAdapter.addAuditLog({
            id: Date.now().toString(),
            user: req.user.email,
            aksi: 'CREATE_PRODUCT',
            detail: `Menambahkan produk: ${nama_barang}`,
            timestamp: new Date().toISOString()
        });

        res.status(201).json(addedProduct);
    } catch (error) {
        console.error('Add Product Error:', error);
        res.status(500).json({ error: 'Gagal menambahkan produk' });
    }
};

export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;
        
        if (updates.harga_jual && Number(updates.harga_jual) < 0) {
            return res.status(400).json({ error: 'Harga tidak boleh negatif' });
        }
        if (updates.stok && Number(updates.stok) < 0) {
            return res.status(400).json({ error: 'Stok tidak boleh negatif' });
        }

        if (req.file) {
            updates.foto_url = await uploadImage(req.file.path);
        }

        const oldProduct = await DatabaseAdapter.getProductById(id);
        const updatedProduct = await DatabaseAdapter.updateProduct(id, updates);

        // Audit Log
        await DatabaseAdapter.addAuditLog({
            id: Date.now().toString(),
            user: req.user.email,
            aksi: 'UPDATE_PRODUCT',
            detail: `Mengubah produk: ${oldProduct?.nama_barang} -> Perubahan stok/harga`,
            timestamp: new Date().toISOString()
        });

        res.json(updatedProduct);
    } catch (error) {
        console.error('Update Product Error:', error);
        res.status(500).json({ error: 'Gagal memperbarui produk' });
    }
};

export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await DatabaseAdapter.getProductById(id);
        
        await DatabaseAdapter.deleteProduct(id);

        // Audit Log
        await DatabaseAdapter.addAuditLog({
            id: Date.now().toString(),
            user: req.user.email,
            aksi: 'DELETE_PRODUCT',
            detail: `Menghapus produk: ${product?.nama_barang || id}`,
            timestamp: new Date().toISOString()
        });

        res.json({ message: 'Produk berhasil dihapus' });
    } catch (error) {
        console.error('Delete Product Error:', error);
        res.status(500).json({ error: 'Gagal menghapus produk' });
    }
};
