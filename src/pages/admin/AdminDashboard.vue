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

    <!-- Recent Activity -->
    <div>
      <h2 class="text-lg font-gt-medium text-ink-black tracking-tight mb-4">Aktivitas Terbaru</h2>
      <div class="bg-white border border-hairline rounded-2xl overflow-hidden">
        
        <div v-if="loadingLogs" class="p-8 text-center text-slate text-[14px]">
          <span class="w-5 h-5 border-2 border-shop-violet/30 border-t-shop-violet rounded-full animate-spin inline-block mb-2"></span>
          <br>Memuat aktivitas...
        </div>
        
        <div v-else-if="logs.length === 0" class="p-8 text-center text-slate text-[14px]">
          Belum ada aktivitas yang tercatat.
        </div>
        
        <div v-else class="divide-y divide-hairline">
          <div v-for="log in logs" :key="log.id" class="p-4 md:p-5 flex items-start gap-4 hover:bg-soft-canvas/50 transition-colors">
            <div class="w-10 h-10 rounded-full bg-soft-canvas flex items-center justify-center shrink-0 text-slate">
              <svg v-if="log.aksi.includes('LOGIN')" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path><polyline points="10 17 15 12 10 7"></polyline><line x1="15" y1="12" x2="3" y2="12"></line></svg>
              <svg v-else-if="log.aksi.includes('CREATE')" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
              <svg v-else-if="log.aksi.includes('UPDATE')" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
              <svg v-else-if="log.aksi.includes('DELETE')" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
              <svg v-else width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
            </div>
            <div>
              <p class="text-[14px] text-ink-black font-gt-medium mb-0.5">{{ log.detail || log.aksi }}</p>
              <p class="text-[12px] text-slate">{{ log.user }} &bull; {{ new Date(log.timestamp).toLocaleString('id-ID') }}</p>
            </div>
          </div>
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

const logs = ref([]);
const loadingLogs = ref(true);

const fetchLogs = async () => {
    try {
        const token = localStorage.getItem('admin_token');
        const res = await fetch('/api/logs', {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        if (res.ok) {
            logs.value = await res.json();
        }
    } catch (e) {
        console.error('Failed to load logs', e);
    } finally {
        loadingLogs.value = false;
    }
};

onMounted(async () => {
    fetchLogs();
    
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
