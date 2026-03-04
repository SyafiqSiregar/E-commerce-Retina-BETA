<template>
  <div class="product-card fade-in" :class="{ 'added-to-cart': isAdded }">
    <router-link :to="`/product/${encodeURIComponent(String(product.id))}`" class="product-link">
      <div class="product-image-wrapper">
        <img :src="product.gambar" :alt="product.nama" class="product-image"
             @error="$event.target.src = CONFIG.PLACEHOLDER_IMAGE" loading="lazy">
        <span class="stock-badge" :class="stockClass">{{ stockText }}</span>
        <span class="category-tag">{{ product.kategori }}</span>
      </div>
      <div class="product-info">
        <h3 class="product-name">{{ product.nama }}</h3>
        <p class="product-price">{{ formatPrice(product.harga) }}</p>
      </div>
    </router-link>
    <button class="btn-add-cart" :disabled="isDisabled" @click.prevent="handleAddToCart">
      <template v-if="isDisabled">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
        Habis
      </template>
      <template v-else>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
        + Keranjang
      </template>
    </button>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import { CONFIG } from '../config';
import { useCart } from '../composables/useCart';

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
});

const { addItem, formatPrice } = useCart();
const isAdded = ref(false);

const stockClass = computed(() => props.product.stok > 5 ? 'in-stock' : props.product.stok > 0 ? 'low-stock' : 'out-of-stock');
const stockText = computed(() => props.product.stok > 5 ? `Stok: ${props.product.stok}` : props.product.stok > 0 ? `Sisa ${props.product.stok} unit` : 'Stok Habis');
const isDisabled = computed(() => props.product.stok === 0);

const handleAddToCart = () => {
    if (props.product.stok > 0) {
        addItem(props.product);
        isAdded.value = true;
        setTimeout(() => isAdded.value = false, 600);
    }
};
</script>
