<template>
  <div class="max-w-3xl">
    <div class="mb-6">
      <router-link to="/admin/products" class="inline-flex items-center gap-2 text-slate hover:text-ink-black text-[13px] font-gt-medium transition-colors mb-4">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
        Kembali ke Produk
      </router-link>
      <h1 class="text-2xl font-gt-medium text-ink-black tracking-tight">Tambah Produk Baru</h1>
    </div>

    <form @submit.prevent="submitForm" class="bg-white border border-hairline rounded-2xl p-6 md:p-8 flex flex-col gap-6 shadow-sm">
      <div v-if="error" class="bg-red-50 text-red-500 p-4 rounded-lg text-sm border border-red-100">
        {{ error }}
      </div>

      <!-- Nama Barang & Kategori -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label class="block text-[13px] font-gt-medium text-ink-black mb-1.5">Nama Produk *</label>
          <input v-model="form.nama_barang" type="text" required class="w-full px-4 py-2.5 rounded-lg border border-hairline focus:border-shop-violet focus:ring-1 focus:ring-shop-violet outline-none text-[14px]" placeholder="Contoh: Hikvision Indoor Dome" />
        </div>
        <div>
          <label class="block text-[13px] font-gt-medium text-ink-black mb-1.5">Kategori *</label>
          <input v-model="form.kategori" type="text" required class="w-full px-4 py-2.5 rounded-lg border border-hairline focus:border-shop-violet focus:ring-1 focus:ring-shop-violet outline-none text-[14px]" placeholder="Contoh: Kamera Indoor" />
        </div>
      </div>

      <!-- Harga Jual & Stok -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label class="block text-[13px] font-gt-medium text-ink-black mb-1.5">Harga Jual (Rp) *</label>
          <input v-model="form.harga_jual" type="number" min="0" required class="w-full px-4 py-2.5 rounded-lg border border-hairline focus:border-shop-violet focus:ring-1 focus:ring-shop-violet outline-none text-[14px]" placeholder="0" />
        </div>
        <div>
          <label class="block text-[13px] font-gt-medium text-ink-black mb-1.5">Stok Awal *</label>
          <input v-model="form.stok" type="number" min="0" required class="w-full px-4 py-2.5 rounded-lg border border-hairline focus:border-shop-violet focus:ring-1 focus:ring-shop-violet outline-none text-[14px]" placeholder="0" />
        </div>
      </div>

      <!-- Deskripsi -->
      <div>
        <label class="block text-[13px] font-gt-medium text-ink-black mb-1.5">Deskripsi Produk</label>
        <textarea v-model="form.deskripsi" rows="4" class="w-full px-4 py-2.5 rounded-lg border border-hairline focus:border-shop-violet focus:ring-1 focus:ring-shop-violet outline-none text-[14px]" placeholder="Tuliskan spesifikasi produk..."></textarea>
      </div>

      <!-- Upload Foto -->
      <div>
        <label class="block text-[13px] font-gt-medium text-ink-black mb-1.5">Foto Produk (Maks 5MB)</label>
        <div class="flex items-center gap-4">
          <div class="w-24 h-24 rounded-xl border border-hairline bg-soft-canvas overflow-hidden shrink-0 flex items-center justify-center">
            <img v-if="imagePreview" :src="imagePreview" class="w-full h-full object-cover" />
            <svg v-else class="text-concrete" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
          </div>
          <div class="flex-1">
            <input type="file" @change="handleImageUpload" accept="image/jpeg, image/png, image/webp" class="block w-full text-sm text-slate file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-gt-medium file:bg-violet-50 file:text-shop-violet hover:file:bg-violet-100 transition-colors" />
          </div>
        </div>
      </div>

      <div class="pt-4 border-t border-hairline flex justify-end">
        <button type="submit" :disabled="loading" class="bg-ink-black hover:bg-near-black text-white px-8 py-3 rounded-lg font-gt-medium transition-colors disabled:opacity-70 flex items-center gap-2">
          <span v-if="loading" class="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
          {{ loading ? 'Menyimpan...' : 'Simpan Produk' }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const loading = ref(false);
const error = ref('');
const imagePreview = ref(null);
const imageFile = ref(null);

const form = ref({
    nama_barang: '',
    kategori: '',
    harga_jual: '',
    stok: '',
    deskripsi: ''
});

const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
        error.value = 'Ukuran gambar melebihi 5MB.';
        return;
    }

    imageFile.value = file;
    const reader = new FileReader();
    reader.onload = (e) => {
        imagePreview.value = e.target.result;
    };
    reader.readAsDataURL(file);
};

const submitForm = async () => {
    loading.value = true;
    error.value = '';

    const formData = new FormData();
    formData.append('nama_barang', form.value.nama_barang);
    formData.append('kategori', form.value.kategori);
    formData.append('harga_jual', form.value.harga_jual);
    formData.append('stok', form.value.stok);
    formData.append('deskripsi', form.value.deskripsi);
    
    if (imageFile.value) {
        formData.append('gambar', imageFile.value);
    }

    try {
        const token = localStorage.getItem('admin_token');
        const res = await fetch('/api/products', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: formData
        });

        const data = await res.json();
        
        if (!res.ok) throw new Error(data.error || 'Gagal menyimpan produk');
        
        // Success
        router.push('/admin/products');
    } catch (e) {
        error.value = e.message;
    } finally {
        loading.value = false;
    }
};
</script>
