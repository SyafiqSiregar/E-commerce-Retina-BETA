<template>
  <div>
    <h1 class="text-2xl font-gt-medium text-ink-black tracking-tight mb-6">Dashboard Overview</h1>
    
    <!-- Stats Grid -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
      <div class="bg-white p-6 rounded-2xl border border-hairline shadow-sm flex flex-col">
        <span class="text-[13px] text-slate mb-2">Total Produk Aktif</span>
        <span class="text-3xl font-gt-medium text-ink-black">{{ stats.totalProducts }}</span>
      </div>
      <div class="bg-white p-6 rounded-2xl border border-hairline shadow-sm flex flex-col">
        <span class="text-[13px] text-slate mb-2">Total Kategori</span>
        <span class="text-3xl font-gt-medium text-ink-black">{{ stats.totalCategories }}</span>
      </div>
      <div class="bg-white p-6 rounded-2xl border border-hairline shadow-sm flex flex-col">
        <span class="text-[13px] text-red-500 mb-2">Stok Menipis</span>
        <span class="text-3xl font-gt-medium text-ink-black">{{ stats.lowStock }}</span>
      </div>
    </div>

    <!-- Recent Activity Placeholder -->
    <div>
      <h2 class="text-lg font-gt-medium text-ink-black tracking-tight mb-4">Aktivitas Terbaru</h2>
      <div class="bg-white border border-hairline rounded-2xl overflow-hidden">
        <div class="p-8 text-center text-slate text-[14px]">
          Fitur Log Aktivitas akan segera tersedia.
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const stats = ref({
    totalProducts: 0,
    totalCategories: 0,
    lowStock: 0
});

onMounted(async () => {
    try {
        const res = await fetch('/api/products');
        const products = await res.json();
        
        stats.value.totalProducts = products.length;
        
        const categories = new Set(products.map(p => p.kategori));
        stats.value.totalCategories = categories.size;

        stats.value.lowStock = products.filter(p => Number(p.stok) < 5).length;
    } catch (e) {
        console.error('Failed to load stats:', e);
    }
});
</script>
