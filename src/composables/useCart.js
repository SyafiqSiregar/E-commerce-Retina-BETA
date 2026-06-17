import { reactive, computed, watch } from 'vue';
import { CONFIG } from '../constants/config.js';
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

    async function checkoutMidtrans() {
        if (state.items.length === 0) return;

        try {
            // 1. Dapatkan Token dari Backend Node.js kita
            const response = await fetch('http://localhost:3000/api/checkout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    orderDetails: {
                        items: state.items.map(item => ({
                            id: item.id,
                            price: item.harga,
                            quantity: item.quantity,
                            name: item.nama
                        }))
                    },
                    customerInfo: {
                        name: "Pelanggan Retina CCTV",
                        email: "customer@example.com",
                        phone: "08111222333"
                    }
                })
            });

            const data = await response.json();

            if (data.error) {
                showToast(`Error: ${data.error}`);
                return;
            }

            // 2. Tampilkan Pop-up Midtrans menggunakan Snap.js
            window.snap.pay(data.token, {
                onSuccess: function (result) {
                    showToast('Pembayaran Berhasil! Pesanan akan segera diproses.');
                    clear(); // Kosongkan keranjang setelah sukses
                },
                onPending: function (result) {
                    showToast('Menunggu pembayaran Anda...');
                },
                onError: function (result) {
                    showToast('Pembayaran Gagal. Silakan coba lagi.');
                },
                onClose: function () {
                    showToast('Anda menutup pop-up sebelum menyelesaikan pembayaran.');
                }
            });

        } catch (error) {
            console.error('Checkout error:', error);
            showToast('Sistem Pembayaran sedang gangguan. Silakan Checkout via WhatsApp (Manual)');
            checkoutWhatsApp(); // Fallback ke WhatsApp jika backend mati
        }
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
        checkoutMidtrans,
        copyOrder
    };
}
