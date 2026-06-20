<template>
  <transition name="toast-slide">
    <div v-if="activeToast" class="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] bg-pure-white border border-hairline px-6 py-3 rounded-full flex items-center gap-2">
      <!-- Check Icon -->
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="text-ink-black">
        <polyline points="20 6 9 17 4 12"></polyline>
      </svg>
      <span class="text-[12px] font-gt-medium tracking-tight text-ink-black">{{ activeToast }}</span>
    </div>
  </transition>
</template>

<script setup>
import { useToast } from '../../composables/useToast';

const { activeToast } = useToast();
</script>

<style scoped>
.toast-slide-enter-active,
.toast-slide-leave-active {
  transition: all 300ms cubic-bezier(0.0, 0.0, 0.2, 1);
}

.toast-slide-enter-from,
.toast-slide-leave-to {
  opacity: 0;
  transform: translate(-50%, 16px);
}
</style>
