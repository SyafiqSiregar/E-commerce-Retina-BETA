<template>
  <section class="w-full max-w-[1200px] mx-auto px-4 pt-16 pb-12 md:pt-24 md:pb-20 flex flex-col md:flex-row items-center gap-12 animate-on-scroll relative">
    <!-- Background Grid Ornament -->
    <div class="absolute inset-0 -z-10 bg-grid-pattern opacity-50 [mask-image:linear-gradient(to_bottom,white,transparent)]"></div>

    <div class="flex flex-col flex-1 gap-6 relative z-10">
      <h1 class="text-[32px] md:text-[48px] font-gt-medium tracking-tight text-ink-black leading-tight max-w-[600px]">
        Sistem Keamanan Pintar untuk Rumah & Bisnis Anda
      </h1>
      <p class="text-[16px] text-slate font-gt leading-relaxed max-w-[500px]">
        Pusat grosir dan eceran CCTV terpercaya. Kami melayani pembelian unit berkualitas dan instalasi profesional dengan harga bersaing.
      </p>
      
      <div class="relative w-full max-w-[480px] mt-2">
        <input 
          type="text" 
          id="search-input" 
          v-model="searchQuery" 
          @input="onSearch"
          placeholder="Cari kamera CCTV, DVR, aksesoris..." 
          autocomplete="off"
          class="w-full h-[56px] bg-pure-white border border-hairline rounded-search pl-5 pr-14 text-ink-black text-[14px] font-gt placeholder:text-concrete focus:outline-none focus:border-ink-black transition-colors tracking-tight">
        
        <button v-show="searchQuery" class="absolute right-[52px] top-1/2 -translate-y-1/2 text-concrete hover:text-ink-black p-1 transition-colors" @click="clearSearch" aria-label="Clear">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>

        <button class="absolute right-2 top-1/2 -translate-y-1/2 w-[40px] h-[40px] rounded-full bg-shop-violet flex items-center justify-center text-pure-white hover:opacity-90 hover:shadow-shop-violet-glow transition-all duration-300 ease-out" @click="submitSearch">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
          </svg>
        </button>
      </div>
    </div>

    <!-- Product Preview Visual (Optional/Decorative) -->
    <div class="flex-1 w-full hidden md:flex justify-end">
      <div class="w-full max-w-[400px] aspect-[4/3] bg-soft-canvas rounded-images border border-hairline relative overflow-hidden flex items-center justify-center">
        <!-- Abstract Camera/Security Icon as placeholder for visual -->
        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" class="text-concrete" stroke-linecap="round" stroke-linejoin="round">
          <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
          <circle cx="12" cy="13" r="4"/>
        </svg>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue';

const emit = defineEmits(['search']);
const searchQuery = ref('');
let debounceTimer = null;

const onSearch = () => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
        emit('search', searchQuery.value);
    }, 300);
};

const submitSearch = () => {
    emit('search', searchQuery.value);
};

const clearSearch = () => {
    searchQuery.value = '';
    emit('search', '');
};
</script>
