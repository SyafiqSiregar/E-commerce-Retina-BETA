<template>
  <div class="shop-card p-6 flex flex-col gap-6 sticky top-24">
    <h3 class="text-[16px] font-gt-medium text-ink-black tracking-tight border-b border-hairline pb-4">Ringkasan Belanja</h3>
    
    <div class="flex flex-col gap-4 text-[13px] font-gt text-ink-black">
      <div class="flex justify-between items-center">
        <span class="text-slate">Total Barang</span>
        <span>{{ totalItems }} Item</span>
      </div>
      <div class="flex justify-between items-center">
        <span class="text-slate">Subtotal Produk</span>
        <span>{{ formatPrice(totalPrice) }}</span>
      </div>
      <div class="flex justify-between items-center">
        <span class="text-slate">Ongkir</span>
        <span class="px-2 py-1 bg-soft-canvas text-ink-black text-[11px] rounded-sm">Hubungi Admin</span>
      </div>
    </div>

    <div class="pt-4 border-t border-hairline flex justify-between items-center">
      <span class="text-[14px] font-gt-medium text-ink-black">Total Harga</span>
      <span class="text-[18px] font-gt-medium text-shop-violet">{{ formatPrice(totalPrice) }}</span>
    </div>
    
    <div class="flex flex-col gap-3 mt-2">
      <button class="w-full h-[48px] shop-btn-primary flex items-center justify-center gap-2" @click="$emit('checkout-midtrans')">
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
          <path d="M9 12l2 2 4-4"/>
        </svg>
        Bayar Otomatis
      </button>
      <button class="w-full h-[48px] shop-btn-outline flex items-center justify-center gap-2" @click="$emit('copy')">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
        </svg>
        Salin Pesanan
      </button>
    </div>

    <div class="mt-2 flex flex-col gap-3">
      <div class="flex items-center gap-3 text-[11px] text-slate font-gt">
        <div class="w-6 h-6 rounded-full bg-soft-canvas flex items-center justify-center text-ink-black shrink-0">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
          </svg>
        </div>
        <span>Transaksi Aman (Midtrans)</span>
      </div>
      <div class="flex items-center gap-3 text-[11px] text-slate font-gt">
        <div class="w-6 h-6 rounded-full bg-soft-canvas flex items-center justify-center text-ink-black shrink-0">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
          </svg>
        </div>
        <span>Konfirmasi via WhatsApp</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCart } from '../../composables/useCart';

const { totalItems, totalPrice, formatPrice } = useCart();
defineEmits(['checkout', 'copy', 'checkout-midtrans']);
</script>
