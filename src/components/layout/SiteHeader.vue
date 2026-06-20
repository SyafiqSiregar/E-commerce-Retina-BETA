<template>
  <header class="sticky top-0 z-50 w-full bg-pure-white border-b border-hairline">
    <div class="max-w-[1200px] mx-auto px-4 h-16 flex items-center justify-between">
      <!-- Logo -->
      <router-link to="/" class="text-[20px] font-gt-medium text-shop-violet tracking-tight">
        retina
      </router-link>

      <!-- Desktop Nav (Magic Pill) -->
      <nav class="hidden md:flex items-center relative" ref="navRef">
        <!-- Active Pill Background -->
        <div 
          class="absolute top-1/2 -translate-y-1/2 h-[32px] bg-[rgba(34,197,94,0.1)] border border-[rgba(34,197,94,0.25)] rounded-full transition-all duration-300 ease-in-out pointer-events-none"
          :style="{ left: pillStyle.left, width: pillStyle.width, opacity: pillStyle.opacity }"
        ></div>

        <!-- Links -->
        <router-link 
          v-for="routeItem in navRoutes" 
          :key="routeItem.path"
          :to="routeItem.path" 
          class="relative z-10 px-4 py-1.5 text-[13px] transition-colors duration-300 rounded-full flex items-center justify-center cursor-pointer"
          :class="currentPath === routeItem.path ? 'text-ink-black font-gt-medium' : 'text-slate font-gt hover:text-ink-black'"
          :ref="el => setLinkRef(el, routeItem.path)"
        >
          {{ routeItem.label }}
        </router-link>
      </nav>

      <!-- Desktop CTA (Cart & Theme) -->
      <div class="hidden md:flex items-center gap-2">
        <ThemeToggle />
        <router-link to="/cart" class="relative p-2 text-ink-black hover:text-shop-violet transition-colors group">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
          </svg>
          <span v-if="totalItems > 0" 
            class="absolute top-1 right-0 bg-red-500 text-pure-white text-[9px] w-4 h-4 flex items-center justify-center rounded-full font-gt-medium transition-transform duration-300"
            :class="isPopping ? 'scale-150' : 'group-hover:scale-110'"
          >
            {{ totalItems }}
          </span>
          <!-- Floating +1 -->
          <div v-for="id in floatingPlusOnes" :key="id" class="absolute top-0 right-0 pointer-events-none animate-float-up text-shop-violet font-gt-bold text-[14px] drop-shadow-sm z-50">
            +1
          </div>
        </router-link>
      </div>

      <!-- Mobile Menu Button & Cart -->
      <div class="flex items-center gap-4 md:hidden">
        <ThemeToggle />
        <router-link to="/cart" class="relative p-2 text-ink-black">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
          </svg>
          <span v-if="totalItems > 0" 
            class="absolute top-1 right-0 bg-red-500 text-pure-white text-[9px] w-4 h-4 flex items-center justify-center rounded-full font-gt-medium transition-transform duration-300"
            :class="isPopping ? 'scale-150' : 'scale-100'"
          >
            {{ totalItems }}
          </span>
          <!-- Floating +1 -->
          <div v-for="id in floatingPlusOnes" :key="`mob-${id}`" class="absolute top-0 right-0 pointer-events-none animate-float-up text-shop-violet font-gt-bold text-[14px] drop-shadow-sm z-50">
            +1
          </div>
        </router-link>
        
        <button @click="mobileMenuOpen = !mobileMenuOpen" class="p-2 text-ink-black" aria-label="Menu">
          <svg v-if="!mobileMenuOpen" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
          <svg v-else width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
      </div>
    </div>

    <!-- Mobile Dropdown -->
    <div v-if="mobileMenuOpen" class="md:hidden border-t border-hairline bg-pure-white px-4 py-4 flex flex-col gap-2">
      <router-link 
        v-for="routeItem in navRoutes" 
        :key="routeItem.path"
        :to="routeItem.path" 
        class="px-4 py-3 rounded-cards text-[14px] transition-colors duration-300 ease-out"
        :class="currentPath === routeItem.path ? 'bg-[rgba(34,197,94,0.1)] text-ink-black font-gt-medium border border-[rgba(34,197,94,0.25)]' : 'text-slate hover:bg-soft-canvas border border-transparent'"
        @click="mobileMenuOpen = false"
      >
        {{ routeItem.label }}
      </router-link>
    </div>
  </header>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted, nextTick } from 'vue';
import { useRoute } from 'vue-router';
import { useCart } from '../../composables/useCart';
import ThemeToggle from '../common/ThemeToggle.vue';

const route = useRoute();
const currentPath = computed(() => route.path);
const { totalItems } = useCart();

const mobileMenuOpen = ref(false);

const navRoutes = [
  { path: '/', label: 'Beranda' },
  { path: '/instalasi', label: 'Instalasi' },
  { path: '/admin', label: 'Admin' }
];

const navRef = ref(null);
const linkRefs = ref({});

const pillStyle = ref({
  left: '0px',
  width: '0px',
  opacity: 0
});

const setLinkRef = (el, path) => {
  if (el) {
    // Router-link mengekspos DOM element aslinya lewat $el
    linkRefs.value[path] = el.$el || el;
  }
};

const updatePillPosition = async () => {
  await nextTick();
  // Karena struktur route kita flat (misal /product/xxx), pastikan jika berada di halaman anak,
  // kita tetap bisa menandai 'Beranda' jika perlu. Tapi untuk saat ini, kita cocokkan route persis.
  // Jika route tidak ditemukan di navRoutes (misal /product/1), pill akan disembunyikan.
  let activePath = currentPath.value;
  if (!linkRefs.value[activePath] && activePath !== '/') {
      // Fallback: Jika tidak di instalasi dan bukan di home, anggap di Home (misal /product/:id)
      if (activePath.includes('/product') || activePath.includes('/cart')) {
          activePath = ''; // Sembunyikan pill jika di halaman cart/product
      }
  }

  const activeLink = linkRefs.value[activePath];
  if (activeLink && navRef.value) {
    const navRect = navRef.value.getBoundingClientRect();
    const linkRect = activeLink.getBoundingClientRect();
    
    pillStyle.value = {
      left: `${linkRect.left - navRect.left}px`,
      width: `${linkRect.width}px`,
      opacity: 1
    };
  } else {
    pillStyle.value.opacity = 0;
  }
};

watch(currentPath, () => {
  updatePillPosition();
});

const isPopping = ref(false);
const floatingPlusOnes = ref([]);
let floatId = 0;

watch(totalItems, (newVal, oldVal) => {
  if (newVal > oldVal) {
    // Jalankan animasi pop
    isPopping.value = true;
    setTimeout(() => {
      isPopping.value = false;
    }, 300);

    // Munculkan +1 melayang
    const id = floatId++;
    floatingPlusOnes.value.push(id);
    setTimeout(() => {
      floatingPlusOnes.value = floatingPlusOnes.value.filter(f => f !== id);
    }, 1000);
  }
});

onMounted(() => {
  // Tambahkan sedikit delay agar font rendering selesai dan lebar lebih akurat
  setTimeout(() => {
    updatePillPosition();
  }, 50);
  window.addEventListener('resize', updatePillPosition);
});

onUnmounted(() => {
  window.removeEventListener('resize', updatePillPosition);
});
</script>

<style scoped>
.animate-float-up {
  animation: floatUp 1s cubic-bezier(0.0, 0.0, 0.2, 1) forwards;
}

@keyframes floatUp {
  0% {
    opacity: 1;
    transform: translateY(0) scale(0.8);
  }
  100% {
    opacity: 0;
    transform: translateY(-32px) scale(1.2);
  }
}
</style>
