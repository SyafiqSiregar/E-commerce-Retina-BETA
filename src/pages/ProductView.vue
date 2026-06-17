<template>
  <main class="w-full max-w-[1200px] mx-auto px-4 py-8 md:py-12">
    <router-link to="/" class="inline-flex items-center gap-2 text-slate hover:text-ink-black text-[13px] font-gt mb-8 transition-colors">← Kembali</router-link>

    <div v-if="loading" class="col-span-full py-20 text-center flex flex-col items-center">
      <div class="w-full max-w-[500px] aspect-square bg-soft-canvas rounded-images animate-pulse"></div>
    </div>
    
    <div v-else-if="!product" class="col-span-full py-20 text-center flex flex-col items-center">
      <div class="text-4xl mb-4">❌</div>
      <h2 class="text-[14px] font-gt-medium text-ink-black mb-2">Produk Tidak Ditemukan</h2>
      <p class="text-[13px] text-slate">Maaf, produk yang Anda cari tidak ada atau sudah dihapus.</p>
      <router-link to="/" class="mt-6 px-6 py-3 shop-btn-outline">Kembali ke Beranda</router-link>
    </div>
    
    <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
      <div class="w-full aspect-square bg-soft-canvas rounded-images overflow-hidden border border-hairline">
         <img :src="product.gambar" :alt="product.nama" class="w-full h-full object-cover"
              @error="$event.target.src = CONFIG.PLACEHOLDER_IMAGE">
      </div>
      
      <div class="flex flex-col">
         <span class="text-slate text-[13px] font-gt cursor-pointer hover:text-ink-black transition-colors" @click="goToCategory(product.kategori)">{{ product.kategori }}</span>
         <h1 class="text-[24px] md:text-[32px] font-gt-medium tracking-tight text-ink-black mt-2 leading-tight">{{ product.nama }}</h1>
         <p class="text-[20px] font-gt-medium text-ink-black mt-4">{{ formatPrice(product.harga) }}</p>
         
         <div class="mt-6 flex items-center gap-2 text-[13px] font-gt" :class="product.stok > 0 ? 'text-ink-black' : 'text-slate'">
           <span class="w-2 h-2 rounded-full" :class="product.stok > 0 ? 'bg-shop-violet' : 'bg-slate'" v-if="product.stok > 0"></span>
           {{ stockText }}
         </div>

         <div class="mt-8">
           <button class="w-full md:w-auto px-8 h-[48px] shop-btn-primary disabled:opacity-50 disabled:bg-soft-canvas disabled:text-slate disabled:shadow-none" :disabled="isDisabled" @click="handleAddToCart">
             {{ isDisabled ? 'Stok Habis' : 'Tambah ke Keranjang' }}
           </button>
         </div>

         <div class="mt-12">
           <h3 class="text-[14px] font-gt-medium text-ink-black mb-4">Deskripsi Produk</h3>
           <p class="text-[14px] text-slate leading-relaxed whitespace-pre-line">{{ product.deskripsi || 'Tidak ada deskripsi untuk produk ini.' }}</p>
         </div>
      </div>
    </div>

    <!-- Related Products -->
    <section v-if="relatedProducts.length > 0" class="mt-20">
      <h2 class="text-xl font-gt-medium tracking-tight text-ink-black mb-6">Produk Serupa ({{ product?.kategori }})</h2>
      <ProductGrid :products="relatedProducts" :loading="loading" />
    </section>
  </main>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useSheets } from '../composables/useSheets';
import { useCart } from '../composables/useCart';
import { CONFIG } from '../constants/config';
import ProductGrid from '../components/common/ProductGrid.vue';

const route = useRoute();
const router = useRouter();
const { fetchProducts, getProductById, loading, cachedProducts } = useSheets();
const { addItem, formatPrice } = useCart();

const product = ref(null);
const relatedProducts = ref([]);

const stockText = computed(() => {
  if (!product.value) return '';
  return product.value.stok > 5 ? `Tersedia` : product.value.stok > 0 ? `Sisa ${product.value.stok}` : 'Habis';
});
const isDisabled = computed(() => !product.value || product.value.stok === 0);

const loadData = async (id) => {
    product.value = null;
    relatedProducts.value = [];
    product.value = await getProductById(id);
    if (product.value) {
        relatedProducts.value = cachedProducts.value
            .filter(p => String(p.id) !== String(id) && p.kategori === product.value.kategori)
            .slice(0, 4);
    }
};

onMounted(() => {
    loadData(route.params.id);
});

watch(() => route.params.id, (newId) => {
    if (newId) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        loadData(newId);
    }
});

const handleAddToCart = () => {
    if (product.value && product.value.stok > 0) {
        addItem(product.value);
    }
};

const goToCategory = (cat) => {
    router.push({ path: '/', query: { category: cat } });
};
</script>
