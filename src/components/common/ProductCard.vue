<template>
  <div class="animate-on-scroll bg-pure-white border border-hairline rounded-cards overflow-hidden flex flex-col group hover:border-ink-black hover:bg-soft-canvas transition-all duration-300 ease-out">
    <!-- Image Area -->
    <div class="relative w-full aspect-square bg-soft-canvas overflow-hidden">
      <img :src="product.gambar" :alt="product.nama" class="w-full h-full object-cover" @error="$event.target.src = CONFIG.PLACEHOLDER_IMAGE">
      <div v-if="product.stok === 0" class="absolute top-2 left-2 bg-near-black text-pure-white text-[10px] px-2 py-1 rounded-full font-gt-medium tracking-tight">
        Habis
      </div>
      <div v-else-if="product.stok <= 5" class="absolute top-2 left-2 bg-pure-white border border-hairline text-ink-black text-[10px] px-2 py-1 rounded-full font-gt-medium tracking-tight">
        Sisa {{ product.stok }}
      </div>
    </div>

    <!-- Details -->
    <div class="p-4 flex flex-col flex-1">
      <span class="text-[11px] text-slate font-gt mb-1">{{ product.kategori }}</span>
      <router-link :to="`/product/${encodeURIComponent(String(product.id))}`" class="text-[14px] font-gt-medium tracking-tight text-ink-black line-clamp-2 leading-tight hover:text-shop-violet transition-colors">
        {{ product.nama }}
      </router-link>
      
      <div class="mt-auto pt-4 flex items-center justify-between">
        <span class="text-[14px] font-gt-medium text-ink-black tracking-tight">{{ formatPrice(product.harga) }}</span>
        
        <button 
          @click="addToCart" 
          :disabled="product.stok === 0"
          class="w-8 h-8 rounded-full border border-hairline flex items-center justify-center text-ink-black hover:border-ink-black disabled:opacity-50 disabled:bg-soft-canvas disabled:border-hairline transition-colors"
          aria-label="Tambah ke keranjang"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { CONFIG } from '../../constants/config';
import { useCart } from '../../composables/useCart';

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
});

const { addItem, formatPrice } = useCart();

const addToCart = () => {
  if (props.product.stok > 0) {
    addItem(props.product);
  }
};
</script>
