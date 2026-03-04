<template>
  <main class="cart-page">
    <div class="cart-header">
      <router-link to="/" class="back-link">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
        Lanjut Belanja
      </router-link>
      <h1>Keranjang Belanja</h1>
      <p class="cart-header-sub" v-if="items.length > 0">{{ items.length }} produk di keranjang Anda</p>
    </div>

    <!-- Empty State -->
    <div v-if="items.length === 0" class="cart-empty">
      <div class="cart-empty-illustration">
        <div class="empty-cart-icon">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" style="color: var(--primary)">
            <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
          </svg>
        </div>
      </div>
      <h2>Keranjang Anda masih kosong</h2>
      <p>Yuk, mulai tambahkan produk favoritmu ke keranjang!</p>
      <router-link to="/" class="btn-shop-now">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
        Mulai Belanja
      </router-link>
    </div>

    <!-- Cart Content -->
    <div v-else class="cart-layout">
      <div class="cart-items-column">
        <div class="cart-items-header">
          <label class="cart-select-all">
            <span class="item-count-label">Semua Produk ({{ items.length }})</span>
          </label>
        </div>
        
        <div class="cart-items" id="cart-container">
          <CartItem 
            v-for="(item, index) in items" 
            :key="item.id" 
            :item="item"
            :index="index"
            @update-qty="handleUpdateQty"
            @remove="removeItem"
          />
        </div>
      </div>

      <CartSummary 
        :item-count="items.length"
        @checkout="checkoutWhatsApp" 
        @copy="copyOrder" 
      />
    </div>
  </main>
</template>

<script setup>
import { useCart } from '../composables/useCart';
import CartItem from '../components/CartItem.vue';
import CartSummary from '../components/CartSummary.vue';

const { items, updateQuantity, removeItem, checkoutWhatsApp, copyOrder } = useCart();

const handleUpdateQty = ({ id, quantity }) => {
    updateQuantity(id, quantity);
};
</script>
