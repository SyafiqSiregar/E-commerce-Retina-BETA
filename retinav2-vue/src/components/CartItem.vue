<template>
  <div class="cart-item fade-in" :style="{ animationDelay: (index * 0.05) + 's' }">
    <!-- Product Image -->
    <router-link :to="`/product/${encodeURIComponent(String(item.id))}`" class="cart-item-image">
      <img :src="item.gambar" :alt="item.nama" @error="$event.target.src = CONFIG.PLACEHOLDER_IMAGE">
    </router-link>

    <!-- Product Details -->
    <div class="cart-item-body">
      <div class="cart-item-top">
        <div class="cart-item-info">
          <router-link :to="`/product/${encodeURIComponent(String(item.id))}`" class="cart-item-name">
            {{ item.nama }}
          </router-link>
          <span class="cart-item-category" v-if="item.kategori">{{ item.kategori }}</span>
          <p class="cart-item-unit-price">{{ formatPrice(item.harga) }} / unit</p>
        </div>
        <button class="btn-remove" aria-label="Hapus item" @click="$emit('remove', item.id)" title="Hapus dari keranjang">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
          </svg>
        </button>
      </div>

      <div class="cart-item-bottom">
        <div class="cart-qty">
          <button 
            aria-label="Kurangi" 
            @click="handleUpdate(item.quantity - 1)"
            :disabled="item.quantity <= 1"
            :class="{ disabled: item.quantity <= 1 }"
          >−</button>
          <span>{{ item.quantity }}</span>
          <button aria-label="Tambah" @click="handleUpdate(item.quantity + 1)">+</button>
        </div>
        <p class="cart-item-subtotal">{{ formatPrice(item.harga * item.quantity) }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { CONFIG } from '../config';
import { useCart } from '../composables/useCart';

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
