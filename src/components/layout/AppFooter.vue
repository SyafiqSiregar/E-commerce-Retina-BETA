<template>
  <footer class="w-full mt-auto py-8 px-4 border-t border-hairline mt-20">
    <div class="max-w-[1200px] mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
      <span class="text-[12px] font-gt text-slate">&copy; {{ new Date().getFullYear() }} {{ CONFIG.STORE_NAME }}. All rights reserved.</span>
      <div class="flex gap-6 text-[12px] font-gt text-slate">
        <a href="https://retinacctv.id" target="_blank" class="hover:text-ink-black transition-colors">Website Utama</a>
        <router-link to="/instalasi" class="hover:text-ink-black transition-colors">Instalasi</router-link>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { CONFIG } from '../../constants/config';
</script>
