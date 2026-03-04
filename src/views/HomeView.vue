<template>
  <main>
    <HeroSection @search="handleSearch" />
    <CategoryFilter 
      :categories="categories" 
      :active-category="activeCategory"
      @select="handleCategorySelect" 
    />
    <section class="products-section" id="products-section">
      <div class="section-header">
        <h2>{{ activeCategory === 'Semua' ? 'Semua Produk' : 'Kategori: ' + activeCategory }}</h2>
        <span class="product-count">{{ filteredProducts.length }} Produk</span>
      </div>
      <ProductGrid :products="filteredProducts" :loading="loading" />
    </section>
    <FeatureCards />
  </main>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useSheets } from '../composables/useSheets';
import HeroSection from '../components/HeroSection.vue';
import CategoryFilter from '../components/CategoryFilter.vue';
import ProductGrid from '../components/ProductGrid.vue';
import FeatureCards from '../components/FeatureCards.vue';

const route = useRoute();
const { cachedProducts, loading, fetchProducts, getCategories } = useSheets();

const categories = ref(['Semua']);
const activeCategory = ref('Semua');
const searchQuery = ref('');

const filteredProducts = computed(() => {
    return cachedProducts.value.filter(p => {
        const matchCategory = activeCategory.value === 'Semua' || p.kategori === activeCategory.value;
        const matchSearch = !searchQuery.value ||
            p.nama.toLowerCase().includes(searchQuery.value) ||
            p.deskripsi.toLowerCase().includes(searchQuery.value) ||
            p.kategori.toLowerCase().includes(searchQuery.value);
        return matchCategory && matchSearch;
    });
});

const handleSearch = (query) => {
    searchQuery.value = query.toLowerCase().trim();
};

const handleCategorySelect = (cat) => {
    activeCategory.value = cat;
};

onMounted(async () => {
    await fetchProducts();
    categories.value = await getCategories();
    if (route.query.category) {
        activeCategory.value = route.query.category;
    }
});
</script>
