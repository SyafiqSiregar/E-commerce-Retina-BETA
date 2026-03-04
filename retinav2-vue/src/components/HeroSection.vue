<template>
  <header class="hero">
    <div class="hero-content">
      <h1 class="animate-on-scroll">Pusat Grosir & Eceran<br><span class="highlight">CCTV Terbaik</span></h1>
      <p class="animate-on-scroll">Melayani pemasangan dan pembelian unit CCTV berkualitas dengan harga bersaing.</p>
      
      <div class="search-wrapper animate-on-scroll">
        <svg class="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
        </svg>
        <input 
          type="text" 
          id="search-input" 
          v-model="searchQuery" 
          @input="onSearch"
          placeholder="Cari nama produk, merk, atau tipe..." 
          autocomplete="off">
        <button v-show="searchQuery" class="search-clear" @click="clearSearch" aria-label="Bersihkan pencarian">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const emit = defineEmits(['search']);
const searchQuery = ref('');
let debounceTimer = null;

const onSearch = () => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
        emit('search', searchQuery.value);
    }, 300);
};

const clearSearch = () => {
    searchQuery.value = '';
    emit('search', '');
};

onMounted(() => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });
});
</script>
