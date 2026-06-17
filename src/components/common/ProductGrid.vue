<template>
  <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-8 w-full" id="products-grid">
    <template v-if="loading">
      <div v-for="n in 6" :key="n" class="bg-pure-white border border-hairline rounded-cards overflow-hidden flex flex-col pointer-events-none p-4 gap-4">
        <div class="w-full aspect-square bg-soft-canvas rounded-sm animate-pulse"></div>
        <div class="h-3 w-3/4 bg-soft-canvas rounded-sm animate-pulse"></div>
        <div class="h-3 w-1/2 bg-soft-canvas rounded-sm animate-pulse"></div>
        <div class="h-8 w-full bg-soft-canvas rounded-buttons animate-pulse mt-auto"></div>
      </div>
    </template>
    
    <template v-else-if="products.length === 0">
      <div class="col-span-full py-20 text-center flex flex-col items-center">
        <div class="text-4xl mb-4">📦</div>
        <h3 class="text-[14px] font-gt-medium text-ink-black mb-2">Produk tidak ditemukan</h3>
        <p class="text-[13px] text-slate">Coba ubah kata kunci pencarian atau filter kategori</p>
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
