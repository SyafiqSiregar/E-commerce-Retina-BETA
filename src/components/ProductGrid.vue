<template>
  <div class="products-grid" id="products-grid">
    <template v-if="loading">
      <div v-for="n in 6" :key="n" class="product-card skeleton">
        <div class="skeleton-image"></div>
        <div class="skeleton-text"></div>
        <div class="skeleton-text short"></div>
        <div class="skeleton-button"></div>
      </div>
    </template>
    
    <template v-else-if="products.length === 0">
      <div class="empty-state" style="grid-column: 1 / -1;">
        <div class="empty-icon">📦</div>
        <h3>Produk tidak ditemukan</h3>
        <p>Coba ubah kata kunci pencarian atau filter kategori</p>
      </div>
    </template>

    <template v-else>
      <ProductCard 
        v-for="product in products" 
        :key="product.id" 
        :product="product" 
      />
    </template>
  </div>
</template>

<script setup>
import ProductCard from './ProductCard.vue';

defineProps({
  products: {
    type: Array,
    required: true
  },
  loading: {
    type: Boolean,
    default: false
  }
});
</script>
