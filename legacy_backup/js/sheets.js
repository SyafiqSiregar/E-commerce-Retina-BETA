// ============================================
// RETINA CCTV — Google Sheets Integration
// ============================================
// Mengambil data dari Google Sheets via Visualization API (READ-ONLY)
// Tidak menyentuh Google Apps Script yang sudah ada

const SheetsAPI = (() => {
    let cachedProducts = [];
    let lastFetch = 0;
    const CACHE_DURATION = 30000; // 30 detik cache

    /**
     * Fetch data dari Google Sheets via Google Visualization API
     * @returns {Promise<Array>} Array of product objects
     */
    async function fetchProducts(forceRefresh = false) {
        const now = Date.now();

        // Return cache jika masih valid
        if (!forceRefresh && cachedProducts.length > 0 && (now - lastFetch) < CACHE_DURATION) {
            return cachedProducts;
        }

        const url = `https://docs.google.com/spreadsheets/d/${CONFIG.SHEET_ID}/gviz/tq?tqx=out:json&sheet=${encodeURIComponent(CONFIG.SHEET_NAME)}`;

        try {
            const response = await fetch(url);
            const text = await response.text();

            // Google returns JSONP-like response, extract JSON
            const jsonStr = text.match(/google\.visualization\.Query\.setResponse\(([\s\S]*)\);?/);
            if (!jsonStr || !jsonStr[1]) {
                throw new Error('Format respons Google Sheets tidak valid');
            }

            const data = JSON.parse(jsonStr[1]);

            if (data.status === 'error') {
                throw new Error(data.errors?.[0]?.message || 'Error dari Google Sheets');
            }

            const rows = data.table.rows;
            const cols = data.table.cols;
            const colMap = CONFIG.COLUMNS;

            cachedProducts = rows
                .filter(row => row.c) // Hapus validasi ketat row.c[colMap.id] untuk barang tanpa kode
                .map(row => {
                    const namaBarang = getCellValue(row.c[colMap.nama]) || 'Produk Tanpa Nama';
                    const idBarang = getCellValue(row.c[colMap.id]) || namaBarang; // Gunakan Nama jika Kode kosong

                    // Utility to get clean numeric value
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
            return cachedProducts;
        } catch (error) {
            console.error('Error fetching dari Google Sheets:', error);

            // Jika ada cache lama, tetap gunakan
            if (cachedProducts.length > 0) {
                console.warn('Menggunakan data cache sebelumnya');
                return cachedProducts;
            }

            // Return demo data jika sheet belum dikonfigurasi
            if (CONFIG.SHEET_ID === 'GANTI_DENGAN_SHEET_ID_ANDA') {
                return getDemoProducts();
            }

            throw error;
        }
    }

    /**
     * Extract cell value dari Google Visualization format
     */
    function getCellValue(cell) {
        if (!cell) return '';
        return cell.f || cell.v || '';
    }

    /**
     * Get single product by ID
     */
    async function getProductById(id) {
        const products = await fetchProducts();
        return products.find(p => String(p.id) === String(id)) || null;
    }

    /**
     * Get unique categories dari data
     */
    async function getCategories() {
        const products = await fetchProducts();
        const cats = [...new Set(products.map(p => p.kategori))].filter(Boolean);
        return ['Semua', ...cats];
    }

    /**
     * Demo products untuk preview sebelum Google Sheet dikonfigurasi
     */
    function getDemoProducts() {
        return [
            {
                id: '1', nama: 'Camera CCTV 2MP Indoor', kategori: 'Indoor',
                harga: 350000, stok: 15,
                gambar: 'https://placehold.co/400x300/111827/00AADC?text=Camera+2MP',
                deskripsi: 'Camera CCTV resolusi 2MP untuk pengawasan indoor. Dilengkapi IR night vision hingga 20 meter, resolusi jernih, dan pemasangan mudah.'
            },
            {
                id: '2', nama: 'Camera CCTV 5MP Outdoor', kategori: 'Outdoor',
                harga: 650000, stok: 8,
                gambar: 'https://placehold.co/400x300/111827/00AADC?text=Camera+5MP',
                deskripsi: 'Camera CCTV 5MP tahan air IP67 untuk outdoor. Night vision 30 meter, wide angle 102°, tahan cuaca ekstrem.'
            },
            {
                id: '3', nama: 'DVR 8 Channel', kategori: 'DVR/NVR',
                harga: 1200000, stok: 3,
                gambar: 'https://placehold.co/400x300/111827/00AADC?text=DVR+8CH',
                deskripsi: 'DVR 8 Channel H.265+ kompresi terbaru. Support playback remote via smartphone, kapasitas HDD hingga 8TB.'
            },
            {
                id: '4', nama: 'NVR 4 Channel PoE', kategori: 'DVR/NVR',
                harga: 900000, stok: 5,
                gambar: 'https://placehold.co/400x300/111827/00AADC?text=NVR+4CH',
                deskripsi: 'NVR 4 Channel dengan built-in PoE. Plug and play, tidak perlu adaptor tambahan untuk setiap kamera.'
            },
            {
                id: '5', nama: 'Kabel Coaxial RG6 per meter', kategori: 'Aksesoris',
                harga: 5000, stok: 200,
                gambar: 'https://placehold.co/400x300/111827/00AADC?text=Kabel+RG6',
                deskripsi: 'Kabel coaxial RG6 kualitas premium untuk instalasi CCTV. Tahan interferensi, jarak jauh hingga 500 meter.'
            },
            {
                id: '6', nama: 'Adaptor 12V 2A', kategori: 'Aksesoris',
                harga: 45000, stok: 20,
                gambar: 'https://placehold.co/400x300/111827/00AADC?text=Adaptor+12V',
                deskripsi: 'Adaptor 12V 2A khusus CCTV. Stabil, aman, dan tahan lama. Cocok untuk semua jenis camera analog.'
            },
            {
                id: '7', nama: 'Camera PTZ 2MP', kategori: 'Outdoor',
                harga: 2500000, stok: 2,
                gambar: 'https://placehold.co/400x300/111827/00AADC?text=PTZ+2MP',
                deskripsi: 'Camera PTZ (Pan Tilt Zoom) 2MP dengan 20x optical zoom. Kontrol arah camera dari smartphone.'
            },
            {
                id: '8', nama: 'HDD 1TB Surveillance', kategori: 'Aksesoris',
                harga: 750000, stok: 10,
                gambar: 'https://placehold.co/400x300/111827/00AADC?text=HDD+1TB',
                deskripsi: 'Hard disk 1TB khusus CCTV surveillance. Dirancang untuk rekaman 24/7 non-stop dengan daya tahan tinggi.'
            },
        ];
    }

    return {
        fetchProducts,
        getProductById,
        getCategories,
    };
})();
