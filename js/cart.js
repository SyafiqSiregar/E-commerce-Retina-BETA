// ============================================
// RETINA CCTV — Cart Logic
// ============================================
// Keranjang belanja berbasis localStorage

const Cart = (() => {
    const STORAGE_KEY = 'retina_cart';

    function getItems() {
        try {
            return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
        } catch {
            return [];
        }
    }

    function saveItems(items) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
        updateBadge();
        document.dispatchEvent(new CustomEvent('cartUpdated', { detail: { items } }));
    }

    function addItem(product, quantity = 1) {
        const items = getItems();
        const existing = items.find(item => String(item.id) === String(product.id));

        if (existing) {
            existing.quantity += quantity;
        } else {
            items.push({
                id: product.id,
                nama: product.nama,
                harga: product.harga,
                gambar: product.gambar,
                quantity: quantity,
            });
        }

        saveItems(items);
        showToast(`${product.nama} ditambahkan ke keranjang!`);
        return true;
    }

    function removeItem(productId) {
        const items = getItems().filter(item => String(item.id) !== String(productId));
        saveItems(items);
    }

    function updateQuantity(productId, quantity) {
        const items = getItems();
        const item = items.find(i => String(i.id) === String(productId));
        if (item) {
            item.quantity = Math.max(1, quantity);
            saveItems(items);
        }
    }

    function getTotal() {
        return getItems().reduce((sum, item) => sum + (item.harga * item.quantity), 0);
    }

    function getTotalItems() {
        return getItems().reduce((sum, item) => sum + item.quantity, 0);
    }

    function clear() {
        localStorage.removeItem(STORAGE_KEY);
        updateBadge();
        document.dispatchEvent(new CustomEvent('cartUpdated', { detail: { items: [] } }));
    }

    function updateBadge() {
        const badges = document.querySelectorAll('.cart-badge');
        const count = getTotalItems();
        badges.forEach(badge => {
            badge.textContent = count;
            badge.style.display = count > 0 ? 'flex' : 'none';
        });
    }

    function generateWhatsAppMessage() {
        const items = getItems();
        if (items.length === 0) return '';

        let message = CONFIG.WA_MESSAGE_HEADER + '\n\n';

        items.forEach((item, i) => {
            message += `${i + 1}. ${item.nama}\n`;
            message += `   ${item.quantity}x @ ${formatPrice(item.harga)} = ${formatPrice(item.harga * item.quantity)}\n\n`;
        });

        message += `─────────────────\n`;
        message += `*Total: ${formatPrice(getTotal())}*\n\n`;
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

    // Init badge on page load
    function init() {
        updateBadge();
    }

    return {
        getItems,
        addItem,
        removeItem,
        updateQuantity,
        getTotal,
        getTotalItems,
        clear,
        updateBadge,
        checkoutWhatsApp,
        copyOrder,
        generateWhatsAppMessage,
        init,
    };
})();
