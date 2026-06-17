<template>
  <main class="w-full max-w-[1200px] mx-auto px-4 py-8 md:py-12">
    <div class="mb-8 border-b border-hairline pb-4">
      <router-link to="/" class="inline-flex items-center gap-2 text-slate hover:text-ink-black text-[13px] font-gt mb-4 transition-colors">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
        Lanjut Belanja
      </router-link>
      <h1 class="text-[28px] font-gt-medium tracking-tight text-ink-black">Keranjang Belanja</h1>
      <p class="text-[13px] text-slate mt-1" v-if="items.length > 0">{{ items.length }} produk di keranjang Anda</p>
    </div>

    <!-- Empty State -->
    <div v-if="items.length === 0" class="col-span-full py-20 text-center flex flex-col items-center">
      <div class="w-16 h-16 rounded-full bg-soft-canvas flex items-center justify-center mb-6 text-shop-violet">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
        </svg>
      </div>
      <h2 class="text-[16px] font-gt-medium text-ink-black mb-2">Keranjang Anda masih kosong</h2>
      <p class="text-[13px] text-slate mb-6">Yuk, mulai tambahkan produk favoritmu ke keranjang!</p>
      <router-link to="/" class="px-6 py-3 shop-btn-primary gap-2">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
        Mulai Belanja
      </router-link>
    </div>

    <!-- Cart Content -->
    <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
      <div class="lg:col-span-2">
        <div class="flex items-center justify-between mb-4 border-b border-hairline pb-2">
          <span class="text-[13px] font-gt-medium text-ink-black">Semua Produk ({{ items.length }})</span>
        </div>
        
        <div class="flex flex-col gap-4">
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

      <div class="lg:col-span-1">
        <CartSummary 
          :item-count="items.length"
          @checkout="checkoutWhatsApp" 
          @copy="copyOrder" 
        />
      </div>
    </div>
  </main>
</template>

<script setup>
import { useCart } from '../composables/useCart';
import CartItem from '../components/common/CartItem.vue';
import CartSummary from '../components/common/CartSummary.vue';

const { items, updateQuantity, removeItem, checkoutWhatsApp, copyOrder } = useCart();

const handleUpdateQty = ({ id, quantity }) => {
    updateQuantity(id, quantity);
};
</script>
