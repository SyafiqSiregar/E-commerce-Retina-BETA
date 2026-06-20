<template>
  <div class="min-h-screen bg-soft-canvas flex flex-col md:flex-row font-gt">
    
    <!-- Sidebar -->
    <aside class="w-full md:w-64 bg-pure-white border-r border-hairline flex flex-col hidden md:flex shrink-0">
      <div class="p-6 flex items-center justify-between border-b border-hairline">
        <div class="flex items-center gap-3">
          <div class="w-8 h-8 bg-shop-violet rounded-lg flex items-center justify-center text-white font-gt-medium">R</div>
          <span class="font-gt-medium text-ink-black tracking-tight text-[15px]">Retina Admin</span>
        </div>
        <ThemeToggle />
      </div>
      
      <nav class="flex-1 p-4 flex flex-col gap-1">
        <router-link to="/admin" exact-active-class="bg-soft-canvas text-ink-black font-gt-medium" class="px-4 py-2.5 rounded-md text-[14px] text-slate hover:bg-soft-canvas hover:text-ink-black transition-colors flex items-center gap-3">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
          Dashboard
        </router-link>
        <router-link to="/admin/products" active-class="bg-soft-canvas text-ink-black font-gt-medium" class="px-4 py-2.5 rounded-md text-[14px] text-slate hover:bg-soft-canvas hover:text-ink-black transition-colors flex items-center gap-3">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path><line x1="7" y1="7" x2="7.01" y2="7"></line></svg>
          Produk
        </router-link>
        <router-link to="/admin/categories" active-class="bg-soft-canvas text-ink-black font-gt-medium" class="px-4 py-2.5 rounded-md text-[14px] text-slate hover:bg-soft-canvas hover:text-ink-black transition-colors flex items-center gap-3">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>
          Kategori
        </router-link>
      </nav>

      <div class="p-4 border-t border-hairline flex flex-col gap-1">
        <router-link to="/" class="px-4 py-2 text-[14px] text-slate hover:bg-soft-canvas hover:text-ink-black rounded-md transition-colors flex items-center gap-3 mb-2">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
          Kembali ke Website
        </router-link>
        <button @click="handleLogout" class="w-full text-left px-4 py-2 text-[14px] text-red-500 hover:bg-red-50 rounded-md transition-colors flex items-center gap-3">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
          Logout
        </button>
      </div>
    </aside>

    <!-- Main Content -->
    <main class="flex-1 flex flex-col min-w-0 overflow-hidden relative">
      <!-- Mobile Header -->
      <header class="md:hidden bg-pure-white border-b border-hairline p-4 flex justify-between items-center z-10">
        <span class="font-gt-medium text-[15px] text-ink-black">Retina Admin</span>
        <div class="flex items-center gap-4">
          <ThemeToggle />
          <button @click="mobileMenuOpen = true" class="text-[14px] font-gt-medium text-ink-black">Menu</button>
        </div>
      </header>

      <!-- Mobile Menu Overlay -->
      <div v-if="mobileMenuOpen" class="fixed inset-0 z-[100] bg-pure-white flex flex-col md:hidden">
        <div class="p-4 border-b border-hairline flex justify-between items-center">
          <span class="font-gt-medium text-[15px] text-ink-black">Retina Admin</span>
          <button @click="mobileMenuOpen = false" class="text-[14px] font-gt-medium text-slate hover:text-ink-black">Tutup</button>
        </div>
        <nav class="flex-1 p-4 flex flex-col gap-2">
          <router-link to="/admin" @click="mobileMenuOpen = false" exact-active-class="bg-soft-canvas text-ink-black font-gt-medium" class="px-4 py-3 rounded-lg text-[15px] text-slate hover:bg-soft-canvas transition-colors">
            Dashboard
          </router-link>
          <router-link to="/admin/products" @click="mobileMenuOpen = false" active-class="bg-soft-canvas text-ink-black font-gt-medium" class="px-4 py-3 rounded-lg text-[15px] text-slate hover:bg-soft-canvas transition-colors">
            Produk
          </router-link>
          <router-link to="/admin/categories" @click="mobileMenuOpen = false" active-class="bg-soft-canvas text-ink-black font-gt-medium" class="px-4 py-3 rounded-lg text-[15px] text-slate hover:bg-soft-canvas transition-colors">
            Kategori
          </router-link>
        </nav>
        <div class="p-4 border-t border-hairline flex flex-col gap-3">
          <router-link to="/" class="text-[15px] text-slate text-center py-3 border border-hairline rounded-lg hover:bg-soft-canvas">Kembali ke Web</router-link>
          <button @click="handleLogout" class="text-[15px] text-red-500 text-center py-3 border border-red-200 bg-red-50 rounded-lg hover:bg-red-100">Logout</button>
        </div>
      </div>

      <div class="flex-1 overflow-auto p-4 md:p-8">
        <router-view />
      </div>
    </main>

  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useAdminAuth } from '../../composables/useAdminAuth';
import ThemeToggle from '../../components/common/ThemeToggle.vue';

const { logout } = useAdminAuth();
const mobileMenuOpen = ref(false);

const handleLogout = async () => {
    await logout();
};
</script>
