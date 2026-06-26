<template>
  <div class="w-full flex flex-col items-center">
    <section class="w-full max-w-[1200px] mx-auto px-4 pt-16 pb-8 md:pt-24 md:pb-12 flex flex-col md:flex-row items-center gap-12 animate-on-scroll relative">
      <!-- Background Grid Ornament -->
      <div class="absolute inset-0 -z-10 bg-grid-pattern opacity-50 [mask-image:linear-gradient(to_bottom,white,transparent)]"></div>

      <div class="flex flex-col flex-1 gap-6 relative z-10">
        <h1 class="text-[32px] md:text-[48px] font-gt-medium tracking-tight text-ink-black leading-tight max-w-[600px]">
          Sistem Keamanan Pintar untuk Rumah & Bisnis Anda
        </h1>
        <p class="text-[16px] text-slate font-gt leading-relaxed max-w-[500px]">
          Pusat grosir dan eceran CCTV terpercaya. Kami melayani pembelian unit berkualitas dan instalasi profesional dengan harga bersaing.
        </p>
        
        <div class="relative w-full max-w-[480px] mt-2 flex flex-col gap-4">
          <div class="relative w-full">
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

          <!-- CTA Konsultasi Pemasangan -->
          <div class="flex items-center gap-2 mt-1">
            <span class="text-[13px] text-slate font-gt">Butuh bantuan pemasangan?</span>
            <a href="https://wa.me/6281297460115?text=Halo%20Retina%20CCTV,%20saya%20ingin%20konsultasi%20mengenai%20pemasangan." target="_blank" class="text-[13px] font-gt-medium text-shop-violet hover:underline flex items-center gap-1 group">
              Konsultasi Sekarang
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="transform transition-transform group-hover:translate-x-1"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
            </a>
          </div>
        </div>
      </div>

      <!-- Product Preview Visual -->
      <div class="flex-1 w-full hidden md:flex justify-end relative">
        <div class="w-full max-w-[440px] aspect-[4/3] bg-soft-canvas rounded-images overflow-hidden relative shadow-shop-lg border border-hairline group">
          <img src="https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=1548&auto=format&fit=crop" alt="Kamera Keamanan CCTV" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" crossorigin="anonymous" />
          <div class="absolute inset-0 bg-gradient-to-t from-ink-black/20 to-transparent pointer-events-none"></div>
        </div>
      </div>
    </section>

    <!-- Brand Showcase -->
    <div class="w-full max-w-[1200px] mx-auto px-4 pb-12 pt-4">
      <p class="text-[11px] uppercase tracking-widest text-concrete font-gt-medium mb-6 text-center md:text-left">Mitra Resmi Kami</p>
      <div class="flex flex-wrap items-center justify-center md:justify-start gap-8 md:gap-12 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
        <img src="/brands/2560px-Hikvision_logo.svg.png" alt="Hikvision" class="h-6 md:h-8 object-contain" />
        <img src="/brands/Dahua_Technology_logo.svg.png" alt="Dahua" class="h-5 md:h-7 object-contain" />
        <img src="/brands/ezviz-logo.png" alt="EZVIZ" class="h-6 md:h-8 object-contain" />
        <img src="/brands/tiandy-logo.png" alt="Tiandy" class="h-6 md:h-8 object-contain" />
        <img src="/brands/Hilook.png" alt="HiLook" class="h-5 md:h-7 object-contain" />
      </div>
    </div>
  </div>
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
