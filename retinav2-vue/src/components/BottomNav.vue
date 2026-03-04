<template>
  <nav class="bottom-nav">
    <router-link to="/" class="bnav-item" exact-active-class="active">
      <svg class="bnav-icon" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
      <span class="bnav-label">Beranda</span>
    </router-link>
    <a href="#" class="bnav-item" @click.prevent="focusSearch">
      <svg class="bnav-icon" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
      </svg>
      <span class="bnav-label">Cari</span>
    </a>
    <router-link to="/cart" class="bnav-item" exact-active-class="active">
      <div class="bnav-icon-wrapper">
        <svg class="bnav-icon" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
        </svg>
        <span class="cart-badge" v-show="totalItems > 0">{{ totalItems }}</span>
      </div>
      <span class="bnav-label">Keranjang</span>
    </router-link>
    <a :href="waUrl" class="bnav-item" target="_blank" rel="noopener">
      <svg class="bnav-icon" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
      </svg>
      <span class="bnav-label">Bantuan</span>
    </a>
  </nav>
</template>

<script setup>
import { computed } from 'vue';
import { useCart } from '../composables/useCart';
import { CONFIG } from '../config';

const { totalItems } = useCart();
const waUrl = computed(() => `https://wa.me/${CONFIG.WA_NUMBER}?text=${encodeURIComponent('Halo ' + CONFIG.STORE_NAME + ', saya butuh bantuan.')}`);

const focusSearch = () => {
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setTimeout(() => searchInput.focus(), 500);
    }
};
</script>
