<template>
  <div class="min-h-screen flex items-center justify-center bg-soft-canvas font-gt px-4">
    <div class="w-full max-w-md bg-pure-white p-8 rounded-2xl shadow-shop-lg border border-hairline">
      <div class="flex justify-center mb-6">
        <div class="w-12 h-12 bg-shop-violet rounded-xl flex items-center justify-center text-white text-xl font-gt-medium">R</div>
      </div>
      <h1 class="text-2xl font-gt-medium text-ink-black text-center tracking-tight mb-2">Login Admin</h1>
      <p class="text-sm text-slate text-center mb-8">Masuk ke sistem manajemen Retina CCTV</p>

      <form @submit.prevent="submitLogin" class="flex flex-col gap-4">
        <div v-if="errorMessage" class="bg-red-50 text-red-500 p-3 rounded-lg text-sm mb-2 text-center">
          {{ errorMessage }}
        </div>

        <div>
          <label class="block text-sm font-gt-medium text-ink-black mb-1.5">Email</label>
          <input 
            v-model="email" 
            type="email" 
            required
            class="w-full px-4 py-2.5 rounded-lg border border-hairline bg-transparent text-ink-black focus:border-shop-violet focus:ring-1 focus:ring-shop-violet outline-none transition-all text-[14px]"
            placeholder="admin@retina.id"
          />
        </div>

        <div>
          <label class="block text-sm font-gt-medium text-ink-black mb-1.5">Password</label>
          <input 
            v-model="password" 
            type="password" 
            required
            class="w-full px-4 py-2.5 rounded-lg border border-hairline bg-transparent text-ink-black focus:border-shop-violet focus:ring-1 focus:ring-shop-violet outline-none transition-all text-[14px]"
            placeholder="••••••••"
          />
        </div>

        <button 
          type="submit" 
          :disabled="loading"
          class="w-full mt-2 bg-ink-black hover:bg-near-black text-pure-white font-gt-medium py-3 rounded-lg transition-colors flex items-center justify-center disabled:opacity-70"
        >
          <span v-if="loading" class="w-5 h-5 border-2 border-pure-white/30 border-t-pure-white rounded-full animate-spin"></span>
          <span v-else>Masuk ke Dashboard</span>
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAdminAuth } from '../../composables/useAdminAuth';

const email = ref('');
const password = ref('');
const errorMessage = ref('');
const loading = ref(false);

const router = useRouter();
const { login } = useAdminAuth();

const submitLogin = async () => {
    loading.value = true;
    errorMessage.value = '';
    
    try {
        await login(email.value, password.value);
        router.push('/admin');
    } catch (error) {
        errorMessage.value = error.message || 'Gagal login. Periksa kembali email dan password Anda.';
    } finally {
        loading.value = false;
    }
};
</script>
