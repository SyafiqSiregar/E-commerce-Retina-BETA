import { ref } from 'vue';
import { CONFIG } from '../config.js';

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
        const url = `https://docs.google.com/spreadsheets/d/${CONFIG.SHEET_ID}/gviz/tq?tqx=out:json&sheet=${encodeURIComponent(CONFIG.SHEET_NAME)}`;

        try {
            const response = await fetch(url);
            const text = await response.text();

            const jsonStr = text.match(/google\.visualization\.Query\.setResponse\(([\s\S]*)\);?/);
            if (!jsonStr || !jsonStr[1]) throw new Error('Format respons Google Sheets tidak valid');

            const data = JSON.parse(jsonStr[1]);
            if (data.status === 'error') throw new Error(data.errors?.[0]?.message || 'Error dari Google Sheets');

            const rows = data.table.rows;
            const colMap = CONFIG.COLUMNS;

            cachedProducts.value = rows
                .filter(row => row.c)
                .map(row => {
                    const namaBarang = getCellValue(row.c[colMap.nama]) || 'Produk Tanpa Nama';
                    const idBarang = getCellValue(row.c[colMap.id]) || namaBarang;

                    const rawHarga = getCellValue(row.c[colMap.harga]);
                    const cleanHarga = typeof rawHarga === 'string' ? rawHarga.replace(/[^0-9]/g, '') : rawHarga;

                    const rawStok = getCellValue(row.c[colMap.stok]);
                    const cleanStok = typeof rawStok === 'string' ? rawStok.replace(/[^0-9-]/g, '') : rawStok;

                    return {
                        id: idBarang,
                        nama: namaBarang,
                        kategori: getCellValue(row.c[colMap.kategori]) || 'Lainnya',
                        harga: parseFloat(cleanHarga) || 0,
                        stok: parseInt(cleanStok) || 0,
                        gambar: getCellValue(row.c[colMap.gambar]) || CONFIG.PLACEHOLDER_IMAGE,
                        deskripsi: getCellValue(row.c[colMap.deskripsi]) || '',
                    };
                });

            lastFetch = now;
            return cachedProducts.value;
        } catch (e) {
            console.error('Error fetching dari Google Sheets:', e);
            if (cachedProducts.value.length > 0) return cachedProducts.value;
            error.value = e.message;
            throw e;
        } finally {
            loading.value = false;
        }
    }

    function getCellValue(cell) {
        if (!cell) return '';
        return cell.f || cell.v || '';
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
