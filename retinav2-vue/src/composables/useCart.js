import { reactive, computed, watch } from 'vue';
import { CONFIG } from '../config.js';
import { useToast } from './useToast.js';

const STORAGE_KEY = 'retina_cart';

// Global reactive state for cart to share across components
const state = reactive({
    items: JSON.parse(localStorage.getItem(STORAGE_KEY)) || []
});

watch(() => state.items, (newItems) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newItems));
}, { deep: true });

export function useCart() {
    const { showToast } = useToast();

    const items = computed(() => state.items);

    const totalItems = computed(() => {
        return state.items.reduce((sum, item) => sum + item.quantity, 0);
    });

    const totalPrice = computed(() => {
        return state.items.reduce((sum, item) => sum + (item.harga * item.quantity), 0);
    });

    function addItem(product, quantity = 1) {
        const existing = state.items.find(item => String(item.id) === String(product.id));
        if (existing) {
            existing.quantity += quantity;
        } else {
            state.items.push({
                id: product.id,
                nama: product.nama,
                harga: product.harga,
                gambar: product.gambar,
                quantity: quantity,
            });
        }
        showToast(`${product.nama} ditambahkan ke keranjang!`);
    }

    function removeItem(productId) {
        const index = state.items.findIndex(item => String(item.id) === String(productId));
        if (index !== -1) {
            state.items.splice(index, 1);
        }
    }

    function updateQuantity(productId, quantity) {
        const item = state.items.find(i => String(i.id) === String(productId));
        if (item) {
            item.quantity = Math.max(1, quantity);
        }
    }

    function clear() {
        state.items = [];
    }

    function formatPrice(num) {
        return CONFIG.CURRENCY + ' ' + new Intl.NumberFormat(CONFIG.LOCALE).format(num);
    }

    function generateWhatsAppMessage() {
        if (state.items.length === 0) return '';

        let message = CONFIG.WA_MESSAGE_HEADER + '\n\n';
        state.items.forEach((item, i) => {
            message += `${i + 1}. ${item.nama}\n`;
            message += `   ${item.quantity}x @ ${formatPrice(item.harga)} = ${formatPrice(item.harga * item.quantity)}\n\n`;
        });
        message += `─────────────────\n`;
        message += `*Total: ${formatPrice(totalPrice.value)}*\n\n`;
        message += `Terima kasih! 🙏`;

        return message;
    }

    function checkoutWhatsApp() {
        const message = generateWhatsAppMessage();
        if (!message) return;
        const url = `https://wa.me/${CONFIG.WA_NUMBER}?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank');
    }

    function copyOrder() {
        const message = generateWhatsAppMessage();
        if (!message) return;
        navigator.clipboard.writeText(message).then(() => {
            showToast('Pesanan berhasil disalin! 📋');
        }).catch(() => {
            showToast('Gagal menyalin, coba lagi');
        });
    }

    return {
        items,
        totalItems,
        totalPrice,
        formatPrice,
        addItem,
        removeItem,
        updateQuantity,
        clear,
        checkoutWhatsApp,
        copyOrder
    };
}
