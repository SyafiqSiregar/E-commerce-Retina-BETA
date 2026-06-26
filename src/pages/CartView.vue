<template>
  <main class="w-full max-w-[1200px] mx-auto px-4 py-8 md:py-12 relative">
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
          @checkout-midtrans="showCheckoutModal = true"
        />
      </div>
    </div>

    <!-- Guest Checkout Modal -->
    <div v-if="showCheckoutModal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink-black/20 backdrop-blur-sm transition-opacity duration-300">
      <div class="bg-pure-white p-6 md:p-8 rounded-[11.4px] w-full max-w-md shadow-shop-lg border border-hairline transform transition-all">
        <h3 class="text-[18px] font-gt-medium text-ink-black mb-2">Informasi Pengiriman</h3>
        <p class="text-[12px] text-slate font-gt mb-6">Silakan isi data diri Anda untuk melanjutkan pembayaran.</p>
        
        <form @submit.prevent="submitCheckout" class="flex flex-col gap-4">
          <div class="flex flex-col gap-1.5">
            <label class="text-[11px] font-gt-medium text-ink-black">Nama Lengkap</label>
            <input v-model="customerData.name" type="text" required placeholder="Cth: Budi Santoso" class="h-10 border border-hairline rounded-sm px-3 text-[13px] focus:border-shop-violet outline-none">
          </div>
          <div class="flex flex-col gap-1.5">
            <label class="text-[11px] font-gt-medium text-ink-black">Email</label>
            <input v-model="customerData.email" type="email" required placeholder="Cth: budi@gmail.com" class="h-10 border border-hairline rounded-sm px-3 text-[13px] focus:border-shop-violet outline-none">
          </div>
          <div class="flex flex-col gap-1.5">
            <label class="text-[11px] font-gt-medium text-ink-black">Nomor WhatsApp / HP</label>
            <input v-model="customerData.phone" type="text" required placeholder="Cth: 08123456789" class="h-10 border border-hairline rounded-sm px-3 text-[13px] focus:border-shop-violet outline-none">
          </div>
          
          <div class="flex gap-3 mt-4">
            <button type="button" @click="showCheckoutModal = false" class="flex-1 h-11 shop-btn-outline" :disabled="isProcessing">Batal</button>
            <button type="submit" class="flex-1 h-11 shop-btn-primary" :disabled="isProcessing">
              {{ isProcessing ? 'Memproses...' : 'Lanjut Bayar' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref } from 'vue';
import { useCart } from '../composables/useCart';
import CartItem from '../components/common/CartItem.vue';
import CartSummary from '../components/common/CartSummary.vue';

const { items, updateQuantity, removeItem, checkoutWhatsApp, copyOrder, checkoutMidtrans } = useCart();

const handleUpdateQty = ({ id, quantity }) => {
    updateQuantity(id, quantity);
};

// Guest Checkout State
const showCheckoutModal = ref(false);
const isProcessing = ref(false);
const customerData = ref({
  name: '',
  email: '',
  phone: ''
});

const submitCheckout = async () => {
  if(!customerData.value.name || !customerData.value.email || !customerData.value.phone) return;
  
  isProcessing.value = true;
  await checkoutMidtrans({...customerData.value});
  isProcessing.value = false;
  showCheckoutModal.value = false;
};
</script>
