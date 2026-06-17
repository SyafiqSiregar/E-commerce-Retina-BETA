<template>
  <div class="shop-card flex p-4 gap-4 animate-on-scroll items-start">
    <!-- Product Image -->
    <router-link :to="`/product/${encodeURIComponent(String(item.id))}`" class="w-[80px] h-[80px] md:w-[100px] md:h-[100px] bg-soft-canvas rounded-images overflow-hidden shrink-0 border border-hairline">
      <img :src="item.gambar" :alt="item.nama" class="w-full h-full object-cover" @error="$event.target.src = CONFIG.PLACEHOLDER_IMAGE">
    </router-link>

    <!-- Product Details -->
    <div class="flex flex-col flex-1 h-full min-h-[80px] md:min-h-[100px] py-1">
      <div class="flex justify-between items-start gap-2">
        <div class="flex flex-col">
          <router-link :to="`/product/${encodeURIComponent(String(item.id))}`" class="text-[13px] md:text-[14px] font-gt-medium text-ink-black tracking-tight leading-snug line-clamp-2 hover:text-shop-violet transition-colors">
            {{ item.nama }}
          </router-link>
          <span class="text-[11px] text-slate mt-1" v-if="item.kategori">{{ item.kategori }}</span>
          <p class="text-[13px] font-gt mt-1 md:mt-2 text-ink-black">{{ formatPrice(item.harga) }} / unit</p>
        </div>
        <button class="text-slate hover:text-ink-black p-1 transition-colors" aria-label="Hapus item" @click="$emit('remove', item.id)" title="Hapus dari keranjang">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
          </svg>
        </button>
      </div>

      <div class="flex justify-between items-end mt-auto pt-4">
        <div class="flex items-center border border-hairline rounded-buttons overflow-hidden h-[32px] w-[100px]">
          <button 
            aria-label="Kurangi" 
            class="w-8 h-full flex items-center justify-center text-ink-black hover:bg-soft-canvas disabled:opacity-50 transition-colors"
            @click="handleUpdate(item.quantity - 1)"
            :disabled="item.quantity <= 1"
          >−</button>
          <span class="flex-1 flex items-center justify-center text-[13px] font-gt-medium text-ink-black">{{ item.quantity }}</span>
          <button 
            aria-label="Tambah" 
            class="w-8 h-full flex items-center justify-center text-ink-black hover:bg-soft-canvas transition-colors"
            @click="handleUpdate(item.quantity + 1)"
          >+</button>
        </div>
        <p class="text-[14px] font-gt-medium text-ink-black">{{ formatPrice(item.harga * item.quantity) }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { CONFIG } from '../../constants/config';
import { useCart } from '../../composables/useCart';

const props = defineProps({
  item: {
    type: Object,
    required: true
  },
  index: {
    type: Number,
    default: 0
  }
});

const emit = defineEmits(['update-qty', 'remove']);
const { formatPrice } = useCart();

const handleUpdate = (newQty) => {
    if (newQty >= 1) {
        emit('update-qty', { id: props.item.id, quantity: newQty });
    }
};
</script>
