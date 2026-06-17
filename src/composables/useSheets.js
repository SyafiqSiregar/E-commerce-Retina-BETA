import { ref } from 'vue';
import { CONFIG } from '../constants/config.js';

const cachedProducts = ref([]);
let lastFetch = 0;
const CACHE_DURATION = 30000;

export function useSheets() {
    const loading = ref(false);
    const error = ref(null);

    async function fetchProducts(forceRefresh = false) {
        const now = Date.now();
        if (!forceRefresh && cachedProducts.value.length > 0 && (now - lastFetch) < CACHE_DURATION) {
            return cachedProducts.value;
        }

        loading.value = true;
        error.value = null;
        const url = '/api/products';

        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error('Gagal memuat produk dari server');
            
            const data = await response.json();

            cachedProducts.value = data.map(row => {
                return {
                    id: row.id || row.kode_barang,
                    kode: row.kode_barang || '',
                    nama: row.nama_barang || 'Produk Tanpa Nama',
                    kategori: row.kategori || 'Lainnya',
                    harga: parseFloat(row.harga_jual) || 0,
                    stok: parseInt(row.stok) || 0,
                    gambar: row.foto_url || CONFIG.PLACEHOLDER_IMAGE,
                    deskripsi: row.deskripsi || '',
                };
            });

            lastFetch = now;
            return cachedProducts.value;
        } catch (e) {
            console.error('Error fetching dari API Backend:', e);
            if (cachedProducts.value.length > 0) return cachedProducts.value;
            error.value = e.message;
            throw e;
        } finally {
            loading.value = false;
        }
    }



    async function getProductById(id) {
        const products = await fetchProducts();
        return products.find(p => String(p.id) === String(id)) || null;
    }

    async function getCategories() {
        const products = await fetchProducts();
        const cats = [...new Set(products.map(p => p.kategori))].filter(Boolean);
        return ['Semua', ...cats];
    }

    return {
        cachedProducts,
        loading,
        error,
        fetchProducts,
        getProductById,
        getCategories
    };
}
