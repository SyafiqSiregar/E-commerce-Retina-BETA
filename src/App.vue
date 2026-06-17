<template>
  <div class="flex flex-col min-h-screen bg-pure-white text-ink-black font-gt w-full">
    <SiteHeader />
    <main class="flex-1 w-full">
      <router-view v-slot="{ Component }">
        <transition name="page-fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
    <AppFooter />
    <WaFloat />
    <ToastNotif />
  </div>
</template>

<script setup>
import SiteHeader from './components/layout/SiteHeader.vue';
import AppFooter from './components/layout/AppFooter.vue';
import WaFloat from './components/layout/WaFloat.vue';
import ToastNotif from './components/ui/ToastNotif.vue';
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
