<template>
  <div class="flex flex-col h-full">
    <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
      <div>
        <h1 class="text-2xl font-gt-medium text-ink-black tracking-tight">Manajemen Produk</h1>
        <p class="text-[13px] text-slate mt-1">Kelola data barang, harga, dan stok.</p>
      </div>
      
      <router-link to="/admin/products/add" class="bg-shop-violet hover:bg-[#4328c0] text-white px-4 py-2.5 rounded-lg text-[14px] font-gt-medium transition-colors flex items-center gap-2">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
        Tambah Produk
      </router-link>
    </div>

    <!-- Filters & Search -->
    <div class="flex flex-col md:flex-row gap-4 mb-6">
      <div class="relative flex-1">
        <svg class="absolute left-3 top-1/2 -translate-y-1/2 text-slate" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
        <input 
          v-model="searchQuery" 
          type="text" 
          placeholder="Cari nama atau kode produk..." 
          class="w-full pl-9 pr-4 py-2 rounded-lg border border-hairline focus:border-shop-violet outline-none text-[13px]"
        />
      </div>
      <div class="w-full md:w-48 shrink-0">
        <select v-model="selectedCategory" class="w-full px-4 py-2 rounded-lg border border-hairline focus:border-shop-violet outline-none text-[13px] bg-pure-white appearance-none">
          <option value="">Semua Kategori</option>
          <option v-for="cat in uniqueCategories" :key="cat" :value="cat">{{ cat }}</option>
        </select>
      </div>
    </div>

    <!-- Data Table -->
    <div class="bg-pure-white border border-hairline rounded-xl overflow-x-auto flex-1">
      <table class="w-full text-left border-collapse min-w-[800px]">
        <thead>
          <tr class="border-b border-hairline bg-soft-canvas text-[12px] font-gt-medium text-slate uppercase tracking-wider">
            <th class="px-6 py-4 font-medium">Produk</th>
            <th class="px-6 py-4 font-medium">Kategori</th>
            <th class="px-6 py-4 font-medium">Harga Jual</th>
            <th class="px-6 py-4 font-medium">Stok</th>
            <th class="px-6 py-4 font-medium text-right">Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="loading" class="border-b border-hairline">
            <td colspan="5" class="px-6 py-8 text-center text-slate text-[13px]">Memuat data...</td>
          </tr>
          <tr v-else-if="filteredProducts.length === 0" class="border-b border-hairline">
            <td colspan="5" class="px-6 py-8 text-center text-slate text-[13px]">Tidak ada produk ditemukan.</td>
          </tr>
          <tr v-else v-for="product in filteredProducts" :key="product.id" class="border-b border-hairline hover:bg-soft-canvas/50 transition-colors group">
            <td class="px-6 py-4">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-md bg-soft-canvas border border-hairline overflow-hidden shrink-0">
                  <img v-if="product.foto_url" :src="product.foto_url" class="w-full h-full object-cover" />
                  <div v-else class="w-full h-full flex items-center justify-center text-slate text-xs">No img</div>
                </div>
                <div>
                  <div class="text-[14px] font-gt-medium text-ink-black">{{ product.nama_barang }}</div>
                  <div class="text-[12px] text-slate">{{ product.kode_barang }}</div>
                </div>
              </div>
            </td>
            <td class="px-6 py-4 text-[13px]">
              <span class="px-2.5 py-1 bg-soft-canvas text-ink-black font-gt-medium border border-hairline rounded-tags text-[11px]">{{ product.kategori }}</span>
            </td>
            <td class="px-6 py-4 text-[13px] font-gt-medium text-ink-black">Rp {{ Number(product.harga_jual).toLocaleString('id-ID') }}</td>
            <td class="px-6 py-4 text-[13px]">
              <span :class="{'text-red-500 font-gt-medium': Number(product.stok) < 5, 'text-ink-black': Number(product.stok) >= 5}">
                {{ product.stok }}
              </span>
            </td>
            <td class="px-6 py-4 text-right">
              <div class="flex items-center justify-end gap-2">
                <!-- Edit button -->
                <button @click="editProduct(product.id)" class="p-2 bg-soft-canvas text-ink-black hover:bg-shop-violet hover:text-white rounded-md border border-hairline transition-colors shadow-sm" title="Edit">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                </button>
                <button @click="deleteProduct(product.id, product.nama_barang)" class="p-2 bg-soft-canvas text-ink-black hover:bg-red-500 hover:text-white rounded-md border border-hairline transition-colors shadow-sm" title="Hapus">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modals -->
    <AdminDeleteModal 
      :isOpen="isDeleteModalOpen" 
      :productName="selectedProduct?.nama_barang"
      :loading="isDeleting"
      @close="closeDeleteModal"
      @confirm="confirmDelete"
    />
    
    <AdminEditModal 
      :isOpen="isEditModalOpen" 
      :product="selectedProduct"
      @close="closeEditModal"
      @success="onEditSuccess"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import AdminDeleteModal from '../../components/admin/AdminDeleteModal.vue';
import AdminEditModal from '../../components/admin/AdminEditModal.vue';

const products = ref([]);
const loading = ref(true);
const searchQuery = ref('');
const selectedCategory = ref('');

const fetchProducts = async () => {
    try {
        const res = await fetch('/api/products');
        products.value = await res.json();
    } catch (e) {
        console.error(e);
    } finally {
        loading.value = false;
    }
};

onMounted(fetchProducts);

const uniqueCategories = computed(() => {
    return [...new Set(products.value.map(p => p.kategori))].filter(Boolean);
});

const filteredProducts = computed(() => {
    let result = products.value;
    
    if (selectedCategory.value) {
        result = result.filter(p => p.kategori === selectedCategory.value);
    }
    
    if (searchQuery.value) {
        const q = searchQuery.value.toLowerCase();
        result = result.filter(p => 
            p.nama_barang?.toLowerCase().includes(q) || 
            p.kode_barang?.toLowerCase().includes(q)
        );
    }
    return result;
});

// State untuk Modals
const isDeleteModalOpen = ref(false);
const isEditModalOpen = ref(false);
const selectedProduct = ref(null);
const isDeleting = ref(false);

const deleteProduct = (id, name) => {
    selectedProduct.value = { id, nama_barang: name };
    isDeleteModalOpen.value = true;
};

const closeDeleteModal = () => {
    isDeleteModalOpen.value = false;
    if (!isDeleting.value) selectedProduct.value = null;
};

const confirmDelete = async () => {
    if (!selectedProduct.value) return;
    isDeleting.value = true;
    try {
        const token = localStorage.getItem('admin_token');
        const res = await fetch(`/api/products/${selectedProduct.value.id}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${token}` }
        });
        if (res.ok) {
            products.value = products.value.filter(p => p.id !== selectedProduct.value.id);
            closeDeleteModal();
        } else {
            const data = await res.json();
            alert(data.error || 'Gagal menghapus produk.');
        }
    } catch (e) {
        alert('Terjadi kesalahan pada jaringan.');
    } finally {
        isDeleting.value = false;
    }
};

const editProduct = (id) => {
    const p = products.value.find(p => p.id === id);
    if (p) {
        selectedProduct.value = { ...p };
        isEditModalOpen.value = true;
    }
};

const closeEditModal = () => {
    isEditModalOpen.value = false;
    selectedProduct.value = null;
};

const onEditSuccess = (updatedProduct) => {
    const index = products.value.findIndex(p => p.id === updatedProduct.id);
    if (index !== -1) {
        products.value[index] = updatedProduct;
    }
    // Perbarui fetch agar mengambil foto yang baru
    fetchProducts();
};
</script>
