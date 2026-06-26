<template>
  <main class="w-full max-w-[1200px] mx-auto px-4 pb-8 md:pb-12 flex flex-col gap-[40px] relative">
    <!-- Hero Section -->
    <section class="flex flex-col md:flex-row items-center gap-12 pt-16 pb-8 md:pt-24 md:pb-12 animate-on-scroll relative">
      <!-- Background Grid Ornament -->
      <div class="absolute inset-0 -z-10 bg-grid-pattern opacity-50 [mask-image:linear-gradient(to_bottom,white,transparent)]"></div>

      <div class="flex flex-col flex-1 gap-6 relative z-10">
        <h1 class="text-[32px] md:text-[48px] font-gt-medium tracking-tight text-ink-black leading-tight max-w-[600px]">
          Layanan Instalasi CCTV Profesional & Terpercaya
        </h1>
        <p class="text-[16px] text-slate font-gt leading-relaxed max-w-[500px]">
          Lindungi aset berharga Anda dengan pemasangan CCTV yang rapi, cepat, dan bergaransi oleh teknisi berpengalaman kami.
        </p>
        
        <div class="mt-4">
          <a :href="waLink" target="_blank" class="inline-flex items-center justify-center h-[56px] px-8 bg-shop-violet text-pure-white rounded-buttons font-gt-medium tracking-tight hover:opacity-90 hover:shadow-shop-violet-glow transition-all duration-300 ease-out">
            Hubungi Teknisi Kami
          </a>
        </div>
      </div>

      <!-- Visual Representasi Instalasi -->
      <div class="flex-1 w-full hidden md:flex justify-end relative">
        <div class="w-full max-w-[480px] aspect-[4/3] bg-soft-canvas rounded-images overflow-hidden relative shadow-shop-lg border border-hairline group">
          <img src="https://images.unsplash.com/photo-1558002038-1055907df827?q=80&w=1548&auto=format&fit=crop" alt="Layanan Instalasi CCTV Profesional" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" crossorigin="anonymous" />
          <div class="absolute inset-0 bg-gradient-to-t from-ink-black/30 to-transparent pointer-events-none"></div>
        </div>
      </div>
    </section>

    <!-- Keunggulan Layanan -->
    <section class="flex flex-col gap-8 animate-on-scroll">
      <div class="flex flex-col gap-2">
        <h2 class="text-[24px] font-gt-medium tracking-tight text-ink-black">Mengapa Memilih Kami?</h2>
        <p class="text-[14px] text-slate font-gt max-w-[500px]">Kami mengutamakan kualitas, kerapihan, dan kepuasan Anda dalam setiap pengerjaan.</p>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div class="bg-pure-white rounded-cards p-6 border border-hairline flex flex-col gap-3 hover:border-ink-black hover:bg-soft-canvas transition-all duration-300 ease-out">
          <span class="w-10 h-10 rounded-full bg-soft-canvas flex items-center justify-center text-ink-black">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><polyline points="16 11 18 13 22 9"/></svg>
          </span>
          <h3 class="text-[14px] font-gt-medium text-ink-black tracking-tight">Teknisi Ahli</h3>
          <p class="text-[12px] text-slate font-gt leading-relaxed">Dikerjakan oleh tenaga profesional yang sangat berpengalaman.</p>
        </div>
        <div class="bg-pure-white rounded-cards p-6 border border-hairline flex flex-col gap-3 hover:border-ink-black hover:bg-soft-canvas transition-all duration-300 ease-out">
          <span class="w-10 h-10 rounded-full bg-soft-canvas flex items-center justify-center text-ink-black">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
          </span>
          <h3 class="text-[14px] font-gt-medium text-ink-black tracking-tight">Pengerjaan Cepat</h3>
          <p class="text-[12px] text-slate font-gt leading-relaxed">Efisien dan tepat waktu tanpa mengurangi kualitas kerja.</p>
        </div>
        <div class="bg-pure-white rounded-cards p-6 border border-hairline flex flex-col gap-3 hover:border-ink-black hover:bg-soft-canvas transition-all duration-300 ease-out">
          <span class="w-10 h-10 rounded-full bg-soft-canvas flex items-center justify-center text-ink-black">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>
          </span>
          <h3 class="text-[14px] font-gt-medium text-ink-black tracking-tight">Garansi Instalasi</h3>
          <p class="text-[12px] text-slate font-gt leading-relaxed">Jaminan perbaikan jika terdapat kendala pasca pemasangan.</p>
        </div>
        <div class="bg-pure-white rounded-cards p-6 border border-hairline flex flex-col gap-3 hover:border-ink-black hover:bg-soft-canvas transition-all duration-300 ease-out">
          <span class="w-10 h-10 rounded-full bg-soft-canvas flex items-center justify-center text-ink-black">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg>
          </span>
          <h3 class="text-[14px] font-gt-medium text-ink-black tracking-tight">Harga Transparan</h3>
          <p class="text-[12px] text-slate font-gt leading-relaxed">Biaya jasa dan material yang jelas di awal tanpa biaya tersembunyi.</p>
        </div>
      </div>
    </section>

    <!-- Scope of Work -->
    <section class="bg-soft-canvas rounded-cards p-8 md:p-12 border border-hairline animate-on-scroll">
      <div class="flex flex-col md:flex-row gap-12">
        <div class="flex-1 flex flex-col gap-4">
          <h2 class="text-[24px] font-gt-medium tracking-tight text-ink-black">Apa Saja yang Anda Dapatkan?</h2>
          <p class="text-[14px] text-slate font-gt leading-relaxed">Paket jasa instalasi standar kami mencakup seluruh kebutuhan agar sistem CCTV Anda siap digunakan 24/7.</p>
        </div>
        
        <div class="flex-1 flex flex-col gap-4">
          <div class="flex items-start gap-3">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-shop-violet mt-0.5 shrink-0" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            <p class="text-[14px] font-gt text-ink-black leading-relaxed">Survei lokasi & penentuan titik kamera optimal</p>
          </div>
          <div class="flex items-start gap-3">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-shop-violet mt-0.5 shrink-0" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            <p class="text-[14px] font-gt text-ink-black leading-relaxed">Penarikan kabel koaksial/LAN yang rapi & terproteksi</p>
          </div>
          <div class="flex items-start gap-3">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-shop-violet mt-0.5 shrink-0" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            <p class="text-[14px] font-gt text-ink-black leading-relaxed">Setting konfigurasi DVR/NVR dan Hardisk</p>
          </div>
          <div class="flex items-start gap-3">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-shop-violet mt-0.5 shrink-0" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            <p class="text-[14px] font-gt text-ink-black leading-relaxed">Koneksi *online* agar CCTV bisa dipantau dari Smartphone Anda</p>
          </div>
        </div>
      </div>
    </section>

  </main>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import { CONFIG } from '../constants/config';
import { initIntersectionObserver } from '../composables/useIntersectionObserver';

const waLink = computed(() => {
    const text = encodeURIComponent("Halo Retina CCTV, saya ingin menanyakan info layanan instalasi CCTV.");
    return `https://wa.me/${CONFIG.WHATSAPP_NUMBER}?text=${text}`;
});

onMounted(() => {
  initIntersectionObserver();
});
</script>
