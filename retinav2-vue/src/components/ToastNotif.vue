<template>
  <div class="toast" :class="{ show: !!activeToast }">
    <span v-if="activeToast">{{ activeToast }}</span>
  </div>
</template>

<script setup>
import { useToast } from '../composables/useToast';

const { activeToast } = useToast();
</script>
