<template>
  <main class="product-detail-page">
    <router-link to="/" class="back-link">← Kembali</router-link>

    <div v-if="loading" class="empty-state">
      <div class="skeleton-image" style="height: 400px; border-radius: var(--radius-xl); width: 100%; max-width: 500px; margin: 0 auto;"></div>
    </div>
    
    <div v-else-if="!product" class="empty-state">
      <div class="empty-icon">❌</div>
      <h2>Produk Tidak Ditemukan</h2>
      <p>Maaf, produk yang Anda cari tidak ada atau sudah dihapus.</p>
      <router-link to="/" class="btn-primary" style="display:inline-flex; margin-top:1rem; width: fit-content; margin-left: auto; margin-right: auto;">Kembali ke Beranda</router-link>
    </div>
    
    <div v-else class="product-detail">
      <div class="detail-image-wrapper">
         <img :src="product.gambar" :alt="product.nama" 
              @error="$event.target.src = CONFIG.PLACEHOLDER_IMAGE">
      </div>
      
      <div class="detail-info">
         <span class="detail-category" style="cursor:pointer" @click="goToCategory(product.kategori)">{{ product.kategori }}</span>
         <h1 class="detail-name">{{ product.nama }}</h1>
         <p class="detail-price">{{ formatPrice(product.harga) }}</p>
         
         <div class="detail-stock" :class="stockClass">
           <span class="dot" v-if="product.stok > 0"></span>
           {{ stockText }}
         </div>

         <div class="detail-actions">
           <button class="btn-primary" :disabled="isDisabled" @click="handleAddToCart">
             {{ isDisabled ? 'Stok Habis' : '🛒 Tambah ke Keranjang' }}
           </button>
         </div>

         <div class="detail-description">
           <h3>Deskripsi Produk</h3>
           <p>{{ product.deskripsi || 'Tidak ada deskripsi untuk produk ini.' }}</p>
         </div>
      </div>
    </div>

    <!-- Related Products -->
    <section v-if="relatedProducts.length > 0" class="related-section">
      <h2>Produk Serupa ({{ product?.kategori }})</h2>
      <ProductGrid :products="relatedProducts" :loading="loading" />
    </section>
  </main>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useSheets } from '../composables/useSheets';
import { useCart } from '../composables/useCart';
import { CONFIG } from '../config';
import ProductGrid from '../components/ProductGrid.vue';

const route = useRoute();
const router = useRouter();
const { fetchProducts, getProductById, loading, cachedProducts } = useSheets();
const { addItem, formatPrice } = useCart();

const product = ref(null);
const relatedProducts = ref([]);

const stockClass = computed(() => {
  if (!product.value) return '';
  return product.value.stok > 5 ? 'in-stock' : product.value.stok > 0 ? 'low-stock' : 'out-of-stock';
});
const stockText = computed(() => {
  if (!product.value) return '';
  return product.value.stok > 5 ? `Stok: ${product.value.stok}` : product.value.stok > 0 ? `Sisa ${product.value.stok}` : 'Habis';
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
