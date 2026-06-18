<template>
  <div 
    v-if="isOpen"
    class="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-ink-black/20 backdrop-blur-sm transition-opacity duration-300"
    @click.self="$emit('close')"
  >
    <div class="bg-pure-white border border-hairline rounded-[11.4px] w-full max-w-sm p-6 shadow-sm transform transition-all duration-300 translate-y-0 scale-100">
      
      <div class="w-12 h-12 bg-red-50 text-red-500 rounded-full flex items-center justify-center mb-4 border border-red-100">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="3 6 5 6 21 6"></polyline>
          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
          <line x1="10" y1="11" x2="10" y2="17"></line>
          <line x1="14" y1="11" x2="14" y2="17"></line>
        </svg>
      </div>
      
      <h3 class="text-lg font-gt-medium text-ink-black mb-2 tracking-tight">Hapus Produk</h3>
      <p class="text-[13px] text-slate mb-6">
        Apakah Anda yakin ingin menghapus produk <strong>"{{ productName }}"</strong>? Tindakan ini tidak dapat dibatalkan.
      </p>

      <div class="flex items-center justify-end gap-3">
        <button 
          @click="$emit('close')"
          class="px-4 py-2 bg-pure-white border border-hairline text-ink-black text-[13px] font-gt-medium rounded-lg hover:bg-soft-canvas transition-colors"
          :disabled="loading"
        >
          Batal
        </button>
        <button 
          @click="$emit('confirm')"
          class="px-4 py-2 bg-red-500 text-white text-[13px] font-gt-medium rounded-lg hover:bg-red-600 transition-colors flex items-center justify-center min-w-[80px]"
          :disabled="loading"
        >
          <span v-if="loading" class="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
          <span v-else>Hapus</span>
        </button>
      </div>

    </div>
  </div>
</template>

<script setup>
defineProps({
  isOpen: Boolean,
  productName: String,
  loading: Boolean
});

defineEmits(['close', 'confirm']);
</script>
