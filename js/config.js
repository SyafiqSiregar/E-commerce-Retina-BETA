// ============================================
// RETINA CCTV — Konfigurasi Website
// ============================================
// Ubah nilai di bawah sesuai data Anda

const CONFIG = {
  // Nama toko
  STORE_NAME: 'Retina Security Technology',
  STORE_TAGLINE: 'Solusi Keamanan CCTV Terpercaya',

  // Google Sheet Integration
  // Ambil SHEET_ID dari URL: https://docs.google.com/spreadsheets/d/SHEET_ID_DISINI/edit
  SHEET_ID: '1XcuroRraZeVq09z8gjPyAGOeV5arJBfcCrkYKzKFs0w',
  SHEET_NAME: 'master barang', // Nama tab di Google Sheet

  // Mapping kolom Google Sheet ke field produk
  // Mapping kolom Google Sheet ke field produk
  // B: Nama Barang, C: Kategori, F: Harga Jual, G: Stok
  COLUMNS: {
    id: 0,          // Kolom A: Kode Barang
    nama: 1,        // Kolom B: Nama Barang
    kategori: 2,    // Kolom C: Kategori
    harga: 5,       // Kolom F: Harga Jual
    stok: 6,        // Kolom G: Stok
    gambar: 7,      // (Opsional) Tidak ada di sheet asli, asumsikan kolom H jika ada
    deskripsi: 8,   // (Opsional) Tidak ada di sheet asli, asumsikan kolom I jika ada
  },

  // WhatsApp checkout
  WA_NUMBER: '6281234567890', // Ganti dengan nomor WA Anda (format: 62xxx)
  WA_MESSAGE_HEADER: 'Halo Retina CCTV, saya ingin memesan:',

  // Mata uang
  CURRENCY: 'Rp',
  LOCALE: 'id-ID',

  // Auto-refresh stok (dalam milidetik). Default: 60000 = 1 menit
  REFRESH_INTERVAL: 60000,

  // Kategori (akan otomatis terdeteksi dari data sheet juga)
  DEFAULT_CATEGORIES: ['Semua', 'Indoor', 'Outdoor', 'DVR/NVR', 'Aksesoris'],

  // Placeholder image jika gambar tidak tersedia
  PLACEHOLDER_IMAGE: 'https://placehold.co/400x300/0a0a1a/00AADC?text=No+Image',
};
