<template>
  <nav class="navbar" :class="{ scrolled: isScrolled }">
    <div class="navbar-inner">
      <router-link to="/" class="navbar-brand">
        <img src="../assets/retina-logo.png" alt="Retina CCTV" class="brand-logo">
      </router-link>

      <!-- Desktop Menu -->
      <div class="navbar-links">
        <router-link to="/" exact-active-class="active">Beranda</router-link>
        <a href="#" @click.prevent="scrollToProducts">Produk</a>
        <router-link to="/cart" class="cart-link" active-class="active">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
          </svg>
          Keranjang
          <span class="cart-badge" v-show="totalItems > 0">{{ totalItems }}</span>
        </router-link>
      </div>

      <!-- Mobile Menu Button -->
      <button class="menu-toggle" id="menu-toggle" aria-label="Menu" @click="toggleMenu" :class="{ open: isMenuOpen }">
        <span></span><span></span><span></span>
      </button>
    </div>

    <!-- Mobile Menu Overlay -->
    <div class="mobile-menu" id="mobile-menu" :class="{ open: isMenuOpen }">
      <router-link to="/" exact-active-class="active" @click="closeMenu">Beranda</router-link>
      <a href="#" @click.prevent="scrollToProductsAndClose">Produk</a>
      <router-link to="/cart" class="mobile-cart-link" active-class="active" @click="closeMenu">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
        </svg>
        Keranjang
        <span class="cart-badge" v-show="totalItems > 0">{{ totalItems }}</span>
      </router-link>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useCart } from '../composables/useCart';

const { totalItems } = useCart();
const isScrolled = ref(false);
const isMenuOpen = ref(false);

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50;
};

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
  document.body.classList.toggle('menu-open', isMenuOpen.value);
};

const closeMenu = () => {
  isMenuOpen.value = false;
  document.body.classList.remove('menu-open');
};

const scrollToProducts = () => {
  const section = document.getElementById('products-section');
  if (section) section.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

const scrollToProductsAndClose = () => {
  scrollToProducts();
  closeMenu();
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true });
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>
