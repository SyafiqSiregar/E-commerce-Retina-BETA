<template>
  <!-- Backdrop (Menggunakan bg-ink-black dengan opacity) -->
  <div 
    v-if="isOpen"
    class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink-black/20 backdrop-blur-sm transition-opacity duration-300 ease-out"
    @click.self="closeModal"
    @keydown.esc="closeModal"
    tabindex="0"
    ref="modalRef"
  >
    <!-- Modal Container (No Drop Shadow, border-hairline, bg-pure-white) -->
    <div 
      class="bg-pure-white border border-hairline rounded-[11.4px] w-full max-w-4xl flex flex-col md:flex-row overflow-hidden transition-all duration-300 ease-out transform"
      :class="isEntering ? 'opacity-100 translate-y-0 sm:scale-100' : 'opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'"
    >
      <!-- Close Button (Ghost Icon Button) -->
      <button 
        @click="closeModal"
        class="absolute top-4 right-4 w-11 h-11 flex items-center justify-center text-slate hover:text-ink-black transition-colors z-10"
        aria-label="Tutup modal"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>

      <!-- Skeleton Loading State -->
      <template v-if="loading">
        <div class="w-full md:w-1/2 aspect-square md:aspect-auto bg-soft-canvas animate-pulse"></div>
        <div class="w-full md:w-1/2 p-6 md:p-10 flex flex-col justify-center gap-4">
          <div class="h-4 w-24 bg-soft-canvas rounded-full animate-pulse"></div>
          <div class="h-8 w-3/4 bg-soft-canvas rounded-sm animate-pulse"></div>
          <div class="h-6 w-1/3 bg-soft-canvas rounded-sm animate-pulse mb-4"></div>
          <div class="h-4 w-full bg-soft-canvas rounded-sm animate-pulse"></div>
          <div class="h-4 w-5/6 bg-soft-canvas rounded-sm animate-pulse"></div>
          <div class="h-12 w-full bg-soft-canvas rounded-buttons animate-pulse mt-8"></div>
        </div>
      </template>

      <!-- Loaded Data State -->
      <template v-else-if="product">
        <!-- Image Section -->
        <div class="w-full md:w-1/2 bg-soft-canvas relative transition-opacity duration-500 ease-out" :class="isEntering ? 'opacity-100' : 'opacity-0'">
          <img :src="product.foto_url" :alt="product.nama_barang" class="w-full h-full object-cover aspect-square md:aspect-auto md:rounded-l-[11.4px] rounded-t-[11.4px] md:rounded-tr-none" @error="$event.target.src = CONFIG.PLACEHOLDER_IMAGE">
          <div class="absolute top-4 left-4 bg-pure-white border border-hairline text-ink-black text-[11px] px-3 py-1 rounded-full font-gt-medium tracking-tight">
            {{ product.kategori }}
          </div>
        </div>

        <!-- Detail Section -->
        <div class="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
          <div class="transition-all duration-500 ease-out delay-75 transform" :class="isEntering ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'">
            <h2 class="text-[16px] font-gt-medium text-ink-black tracking-tight leading-tight mb-2">{{ product.nama_barang }}</h2>
            
            <!-- Star Rating Row (Mock) -->
            <div class="flex items-center mb-4">
              <div class="flex text-amber-400">
                <svg v-for="i in 5" :key="i" class="w-3 h-3 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
              </div>
              <span class="ml-1 text-[11px] text-slate font-gt">(1.9K)</span>
            </div>
          </div>

          <div class="flex items-center justify-between mb-6 transition-all duration-500 ease-out delay-100 transform" :class="isEntering ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'">
            <span class="text-[14px] font-gt-medium text-ink-black">{{ formatPrice(product.harga_jual) }}</span>
            <span class="text-[11px] text-slate font-gt">
              Sisa {{ product.stok }}
            </span>
          </div>

          <p class="text-[12px] text-slate font-gt leading-relaxed mb-8 transition-all duration-500 ease-out delay-150 transform" :class="isEntering ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'">
            {{ product.deskripsi || 'Belum ada deskripsi untuk produk ini.' }}
          </p>

          <!-- Primary Pill Button -->
          <div class="mt-auto transition-all duration-500 ease-out delay-200 transform" :class="isEntering ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'">
            <button 
              @click="addToCart" 
              :disabled="product.stok === 0"
              class="w-full h-[48px] rounded-buttons font-gt-medium text-[14px] flex items-center justify-center transition-all duration-300 disabled:opacity-50 disabled:bg-concrete disabled:shadow-none"
              :class="isAdded ? 'bg-pure-white text-shop-violet border border-shop-violet shadow-none' : 'bg-shop-violet text-pure-white shadow-shop-lg hover:bg-opacity-90 active:scale-95'"
            >
              <span v-if="isAdded" class="flex items-center gap-2">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                Berhasil
              </span>
              <span v-else>
                {{ product.stok === 0 ? 'Stok Habis' : 'Tambah ke Keranjang' }}
              </span>
            </button>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, nextTick, onUnmounted } from 'vue';
import { CONFIG } from '../../constants/config';
import { useCart } from '../../composables/useCart';

const props = defineProps({
  isOpen: Boolean,
  productId: String
});

const emit = defineEmits(['close']);
const { addItem, formatPrice } = useCart();

const loading = ref(false);
const product = ref(null);
const isEntering = ref(false);
const isAdded = ref(false);
const modalRef = ref(null);

const fetchProduct = async (id) => {
  loading.value = true;
  try {
    const res = await fetch(`/api/products/${id}`);
    const result = await res.json();
    if (result.success) {
      product.value = result.data;
    }
  } catch (error) {
    console.error("Gagal mengambil produk:", error);
  } finally {
    loading.value = false;
  }
};

watch(() => props.isOpen, async (newVal) => {
  if (newVal) {
    document.body.style.overflow = 'hidden'; // Kunci scroll
    if (props.productId) {
      await fetchProduct(props.productId);
    }
    nextTick(() => {
      isEntering.value = true;
      modalRef.value?.focus();
    });
  } else {
    document.body.style.overflow = ''; // Lepas scroll
    isEntering.value = false;
    setTimeout(() => {
      product.value = null; // Reset state saat animasi selesai
    }, 300);
  }
});

const closeModal = () => {
  emit('close');
};

const addToCart = () => {
  if (product.value && product.value.stok > 0) {
    addItem({
      id: product.value.id,
      nama: product.value.nama_barang,
      harga: product.value.harga_jual,
      stok: product.value.stok,
      gambar: product.value.foto_url
    });
    isAdded.value = true;
    setTimeout(() => {
      isAdded.value = false;
      closeModal();
    }, 1000);
  }
};

onUnmounted(() => {
  document.body.style.overflow = '';
});
</script>
