<template>
  <main>
    <HeroSection @search="handleSearch" />
    <CategoryFilter 
      :categories="categories" 
      :active-category="activeCategory"
      @select="handleCategorySelect" 
    />
    <section class="w-full max-w-[1200px] mx-auto px-4 py-10" id="products-section">
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-xl font-gt-medium tracking-tight text-ink-black">{{ activeCategory === 'Semua' ? 'Semua Produk' : 'Kategori: ' + activeCategory }}</h2>
        <span class="text-[13px] text-slate">{{ filteredProducts.length }} Produk</span>
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
import HeroSection from '../components/sections/HeroSection.vue';
import CategoryFilter from '../components/common/CategoryFilter.vue';
import ProductGrid from '../components/common/ProductGrid.vue';
import FeatureCards from '../components/sections/FeatureCards.vue';
import { initIntersectionObserver } from '../composables/useIntersectionObserver';

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
    initIntersectionObserver();
});
</script>
