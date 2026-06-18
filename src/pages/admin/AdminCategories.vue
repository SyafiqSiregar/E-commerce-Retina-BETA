<template>
  <div class="flex flex-col h-full">
    <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
      <div>
        <h1 class="text-2xl font-gt-medium text-ink-black tracking-tight">Kategori Produk</h1>
        <p class="text-[13px] text-slate mt-1">Daftar kategori yang tersedia di toko Anda.</p>
      </div>
      
      <!-- Button Add Category (Visual Only for now, as categories are dynamic based on products) -->
      <button @click="showAddCategoryAlert" class="bg-shop-violet hover:bg-[#4328c0] text-white px-4 py-2.5 rounded-lg text-[14px] font-gt-medium transition-colors flex items-center gap-2">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
        Tambah Kategori
      </button>
    </div>

    <!-- Info Banner -->
    <div class="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-6 flex gap-3">
      <svg class="text-blue-500 shrink-0 mt-0.5" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
      <p class="text-[13px] text-blue-800 leading-relaxed">
        <strong>Kategori Bersifat Dinamis.</strong> Sistem Retina akan secara otomatis membuatkan Kategori baru di Website berdasarkan nama Kategori yang Anda ketikkan saat menambahkan Produk Baru.
      </p>
    </div>

    <!-- Categories Grid -->
    <div v-if="loading" class="text-center py-10 text-slate text-[13px]">
      Memuat kategori...
    </div>
    <div v-else class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <div v-for="(cat, index) in uniqueCategories" :key="index" class="bg-pure-white border border-hairline rounded-xl p-5 hover:border-shop-violet transition-colors group cursor-default">
        <div class="w-10 h-10 rounded-lg bg-soft-canvas flex items-center justify-center text-shop-violet mb-4 group-hover:bg-shop-violet group-hover:text-white transition-colors">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>
        </div>
        <h3 class="font-gt-medium text-ink-black text-[15px] mb-1">{{ cat.name }}</h3>
        <p class="text-[13px] text-slate">{{ cat.count }} Produk</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';

const products = ref([]);
const loading = ref(true);

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
    const categoryMap = {};
    products.value.forEach(p => {
        const cat = p.kategori || 'Lainnya';
        if (!categoryMap[cat]) {
            categoryMap[cat] = 0;
        }
        categoryMap[cat]++;
    });
    
    return Object.keys(categoryMap).map(key => ({
        name: key,
        count: categoryMap[key]
    })).sort((a, b) => b.count - a.count);
});

const showAddCategoryAlert = () => {
    alert('Untuk menambah kategori baru, Anda cukup masuk ke halaman "Tambah Produk" dan ketikkan nama kategori baru di kolom Kategori. Kategori akan otomatis terdaftar di sistem!');
};
</script>
