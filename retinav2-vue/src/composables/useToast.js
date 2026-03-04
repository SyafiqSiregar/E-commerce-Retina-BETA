import { ref } from 'vue';

const activeToast = ref(null);
let toastTimeout = null;

export function useToast() {
    function showToast(message, duration = 3000) {
        activeToast.value = message;
        if (toastTimeout) clearTimeout(toastTimeout);
        toastTimeout = setTimeout(() => {
            activeToast.value = null;
        }, duration);
    }

    return {
        activeToast,
        showToast
    };
}
