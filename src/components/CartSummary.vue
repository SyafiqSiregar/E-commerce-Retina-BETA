<template>
  <div class="cart-summary">
    <h3>Ringkasan Belanja</h3>
    
    <div class="summary-details">
      <div class="summary-row">
        <span>Total Barang</span>
        <span>{{ totalItems }} Item</span>
      </div>
      <div class="summary-row">
        <span>Subtotal Produk</span>
        <span>{{ formatPrice(totalPrice) }}</span>
      </div>
      <div class="summary-row">
        <span>Ongkir</span>
        <span class="ongkir-badge">Hubungi Admin</span>
      </div>
    </div>

    <div class="summary-total-box">
      <div class="summary-row total">
        <span>Total Harga</span>
        <span class="total-price">{{ formatPrice(totalPrice) }}</span>
      </div>
    </div>
    
    <div class="summary-actions">
      <button class="btn-wa-checkout" @click="$emit('checkout')">
        <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
          <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.418-.099.824zm-3.423-14.416c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm.029 18.88c-1.161 0-2.305-.292-3.318-.844l-3.677.964.984-3.595c-.607-1.052-.927-2.246-.926-3.468.001-3.825 3.113-6.937 6.937-6.937 3.825 0 6.937 3.112 6.937 6.937s-3.112 6.937-6.937 6.937z"/>
        </svg>
        Checkout via WhatsApp
      </button>
      <button class="btn-copy-order" @click="$emit('copy')">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
        </svg>
        Salin Pesanan
      </button>
    </div>

    <div class="summary-guarantee">
      <div class="guarantee-item">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
        </svg>
        <span>Transaksi Aman</span>
      </div>
      <div class="guarantee-item">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
        </svg>
        <span>Konfirmasi via WA</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCart } from '../composables/useCart';

const { totalItems, totalPrice, formatPrice } = useCart();
defineEmits(['checkout', 'copy']);
</script>
