<template>
  <div 
    v-if="isOpen"
    class="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-ink-black/20 backdrop-blur-sm transition-opacity duration-300 overflow-y-auto"
    @click.self="closeModal"
  >
    <div class="bg-pure-white border border-hairline rounded-[11.4px] w-full max-w-2xl my-8 overflow-hidden shadow-sm transform transition-all duration-300">
      
      <div class="flex items-center justify-between p-5 border-b border-hairline">
        <h2 class="text-xl font-gt-medium text-ink-black tracking-tight">Edit Produk</h2>
        <button @click="closeModal" class="p-2 text-slate hover:text-ink-black hover:bg-soft-canvas rounded-full transition-colors">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>
      </div>

      <div class="p-6">
        <div v-if="error" class="bg-red-50 text-red-500 p-3 rounded-lg text-[13px] border border-red-100 mb-6">
          {{ error }}
        </div>

        <form @submit.prevent="submitForm" class="flex flex-col gap-5">
          <!-- Nama & Kategori -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label class="block text-[12px] font-gt-medium text-slate mb-1.5 uppercase tracking-wider">Nama Produk *</label>
              <input v-model="form.nama_barang" type="text" required class="w-full px-4 py-2.5 rounded-lg border border-hairline bg-pure-white text-ink-black focus:border-shop-violet outline-none text-[14px]" />
            </div>
            <div>
              <label class="block text-[12px] font-gt-medium text-slate mb-1.5 uppercase tracking-wider">Kategori *</label>
              <input v-model="form.kategori" type="text" required class="w-full px-4 py-2.5 rounded-lg border border-hairline bg-pure-white text-ink-black focus:border-shop-violet outline-none text-[14px]" />
            </div>
          </div>

          <!-- Harga & Stok -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label class="block text-[12px] font-gt-medium text-slate mb-1.5 uppercase tracking-wider">Harga Jual (Rp) *</label>
              <input v-model="form.harga_jual" type="number" min="0" required class="w-full px-4 py-2.5 rounded-lg border border-hairline bg-pure-white text-ink-black focus:border-shop-violet outline-none text-[14px]" />
            </div>
            <div>
              <label class="block text-[12px] font-gt-medium text-slate mb-1.5 uppercase tracking-wider">Stok *</label>
              <input v-model="form.stok" type="number" min="0" required class="w-full px-4 py-2.5 rounded-lg border border-hairline bg-pure-white text-ink-black focus:border-shop-violet outline-none text-[14px]" />
            </div>
          </div>

          <!-- Deskripsi -->
          <div>
            <label class="block text-[12px] font-gt-medium text-slate mb-1.5 uppercase tracking-wider">Deskripsi Produk</label>
            <textarea v-model="form.deskripsi" rows="3" class="w-full px-4 py-2.5 rounded-lg border border-hairline bg-pure-white text-ink-black focus:border-shop-violet outline-none text-[14px]"></textarea>
          </div>

          <!-- Foto -->
          <div>
            <label class="block text-[12px] font-gt-medium text-slate mb-1.5 uppercase tracking-wider">Foto Produk Baru (Opsional)</label>
            <div class="flex items-center gap-4">
              <div class="w-20 h-20 rounded-xl border border-hairline bg-soft-canvas overflow-hidden shrink-0 flex items-center justify-center">
                <img v-if="imagePreview || form.foto_url" :src="imagePreview || form.foto_url" class="w-full h-full object-cover" />
                <svg v-else class="text-concrete" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
              </div>
              <input type="file" @change="handleImageUpload" accept="image/jpeg, image/png, image/webp" class="block w-full text-[13px] text-slate file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-[13px] file:font-gt-medium file:bg-violet-50 file:text-shop-violet hover:file:bg-violet-100 transition-colors" />
            </div>
          </div>

          <div class="pt-4 border-t border-hairline flex justify-end gap-3 mt-2">
            <button type="button" @click="closeModal" class="px-5 py-2.5 bg-pure-white border border-hairline text-ink-black text-[14px] font-gt-medium rounded-lg hover:bg-soft-canvas transition-colors" :disabled="loading">
              Batal
            </button>
            <button type="submit" class="px-6 py-2.5 bg-shop-violet text-white text-[14px] font-gt-medium rounded-lg hover:bg-opacity-90 transition-all flex items-center justify-center min-w-[120px] shadow-sm" :disabled="loading">
              <span v-if="loading" class="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
              <span v-else>Simpan Perubahan</span>
            </button>
          </div>
        </form>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  isOpen: Boolean,
  product: Object
});

const emit = defineEmits(['close', 'success']);

const loading = ref(false);
const error = ref('');
const imagePreview = ref(null);
const imageFile = ref(null);

const form = ref({
  nama_barang: '',
  kategori: '',
  harga_jual: '',
  stok: '',
  deskripsi: '',
  foto_url: ''
});

watch(() => props.isOpen, (newVal) => {
  if (newVal && props.product) {
    form.value = {
      nama_barang: props.product.nama_barang || '',
      kategori: props.product.kategori || '',
      harga_jual: props.product.harga_jual || '',
      stok: props.product.stok || '',
      deskripsi: props.product.deskripsi || '',
      foto_url: props.product.foto_url || ''
    };
    imagePreview.value = null;
    imageFile.value = null;
    error.value = '';
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
});

const closeModal = () => {
  emit('close');
};

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
    const res = await fetch(`/api/products/${props.product.id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: formData
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Gagal menyimpan perubahan');

    emit('success', data);
    closeModal();
  } catch (e) {
    error.value = e.message;
  } finally {
    loading.value = false;
  }
};
</script>
