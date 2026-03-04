<template>
  <footer class="footer">
    <div class="footer-inner">
      <span class="footer-text">&copy; {{ new Date().getFullYear() }} {{ CONFIG.STORE_NAME }}. All rights reserved.</span>
      <div class="footer-links">
        <a href="https://retinacctv.id" target="_blank">Website Utama</a>
        <a href="https://retinacctv.id/instalasi/" target="_blank">Instalasi</a>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { CONFIG } from '../config';
</script>
