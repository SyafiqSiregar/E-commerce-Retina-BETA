<template>
  <div class="flex flex-col min-h-screen bg-pure-white text-ink-black font-gt w-full">
    <SiteHeader v-if="!isAdminRoute" />
    <main class="flex-1 w-full flex flex-col">
      <router-view v-slot="{ Component }">
        <transition name="page-fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
    <AppFooter v-if="!isAdminRoute" />
    <WaFloat v-if="!isAdminRoute" />
    <ToastNotif />
  </div>
</template>

import { onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useTheme } from './composables/useTheme';
import SiteHeader from './components/layout/SiteHeader.vue';
import AppFooter from './components/layout/AppFooter.vue';
import WaFloat from './components/layout/WaFloat.vue';
import ToastNotif from './components/ui/ToastNotif.vue';

const { initTheme } = useTheme();
const route = useRoute();

const isAdminRoute = computed(() => route.path.startsWith('/admin'));

onMounted(() => {
  initTheme();
});
</script>

<style>
.page-fade-enter-active,
.page-fade-leave-active {
  transition: opacity 0.4s ease, transform 0.4s ease;
}

.page-fade-enter-from,
.page-fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>
