<template>
  <NavBar />
  <router-view />
  <AppFooter />
  <BottomNav />
  <WaFloat />
  <ToastNotif />
</template>

<script setup>
import NavBar from './components/NavBar.vue';
import AppFooter from './components/AppFooter.vue';
import BottomNav from './components/BottomNav.vue';
import WaFloat from './components/WaFloat.vue';
import ToastNotif from './components/ToastNotif.vue';
</script>
