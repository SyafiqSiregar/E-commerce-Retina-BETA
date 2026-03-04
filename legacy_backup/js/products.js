// ============================================
// RETINA CCTV — Products Display Logic
// ============================================

const Products = (() => {
    let allProducts = [];
    let filteredProducts = [];
    let currentCategory = 'Semua';
    let searchQuery = '';

    async function init(containerId = 'products-grid') {
        const container = document.getElementById(containerId);
        if (!container) return;

        showSkeleton(container);

        try {
            allProducts = await SheetsAPI.fetchProducts();
            filteredProducts = [...allProducts];
            render(container);
            initCategories();
            startAutoRefresh(container);
        } catch (error) {
            showError(container, error.message);
        }
    }

    function render(container) {
        if (!container) container = document.getElementById('products-grid');
        if (!container) return;

        if (filteredProducts.length === 0) {
            container.innerHTML = `
        <div class="empty-state">
          <div class="empty-icon">📦</div>
          <h3>Produk tidak ditemukan</h3>
          <p>Coba ubah kata kunci pencarian atau filter kategori</p>
        </div>`;
            return;
        }

        container.innerHTML = filteredProducts.map(product => createProductCard(product)).join('');

        // Animate cards on render
        const cards = container.querySelectorAll('.product-card');
        cards.forEach((card, i) => {
            card.style.animationDelay = `${i * 0.05}s`;
        });
    }

    function createProductCard(product) {
        const stockClass = product.stok > 5 ? 'in-stock' : product.stok > 0 ? 'low-stock' : 'out-of-stock';
        const stockText = product.stok > 5 ? `Stok: ${product.stok}` : product.stok > 0 ? `Sisa ${product.stok} unit` : 'Stok Habis';
        const isDisabled = product.stok === 0;

        return `
      <div class="product-card fade-in" data-id="${product.id}">
        <a href="product.html?id=${product.id}" class="product-link">
          <div class="product-image-wrapper">
            <img src="${product.gambar}" alt="${product.nama}" class="product-image"
                 onerror="this.src='${CONFIG.PLACEHOLDER_IMAGE}'" loading="lazy">
            <span class="stock-badge ${stockClass}">${stockText}</span>
            <span class="category-tag">${product.kategori}</span>
          </div>
          <div class="product-info">
            <h3 class="product-name">${product.nama}</h3>
            <p class="product-price">${formatPrice(product.harga)}</p>
          </div>
        </a>
        <button class="btn-add-cart" ${isDisabled ? 'disabled' : ''}
                onclick="event.stopPropagation(); Products.addToCart('${product.id}')">
          ${isDisabled ? '✕ Habis' : '🛒 + Keranjang'}
        </button>
      </div>`;
    }

    function addToCart(productId) {
        const product = allProducts.find(p => String(p.id) === String(productId));
        if (product && product.stok > 0) {
            Cart.addItem(product);
            // Mini animation on button
            const card = document.querySelector(`.product-card[data-id="${productId}"]`);
            if (card) {
                card.classList.add('added-to-cart');
                setTimeout(() => card.classList.remove('added-to-cart'), 600);
            }
        }
    }

    function search(query) {
        searchQuery = query.toLowerCase().trim();
        applyFilters();
    }

    function filterByCategory(category) {
        currentCategory = category;

        // Update active button
        document.querySelectorAll('.category-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.category === category);
        });

        applyFilters();
    }

    function applyFilters() {
        filteredProducts = allProducts.filter(p => {
            const matchCategory = currentCategory === 'Semua' || p.kategori === currentCategory;
            const matchSearch = !searchQuery ||
                p.nama.toLowerCase().includes(searchQuery) ||
                p.deskripsi.toLowerCase().includes(searchQuery) ||
                p.kategori.toLowerCase().includes(searchQuery);
            return matchCategory && matchSearch;
        });
        render();
    }

    async function initCategories() {
        const container = document.getElementById('category-filters');
        if (!container) return;

        const categories = await SheetsAPI.getCategories();
        container.innerHTML = categories.map(cat => `
      <button class="category-btn ${cat === 'Semua' ? 'active' : ''}"
              data-category="${cat}"
              onclick="Products.filterByCategory('${cat}')">
        ${getCategoryIcon(cat)} ${cat}
      </button>
    `).join('');
    }

    function getCategoryIcon(cat) {
        const icons = {
            'Semua': '📋',
            'Indoor': '🏠',
            'Outdoor': '🌳',
            'DVR/NVR': '📹',
            'Aksesoris': '🔧',
            'Lainnya': '📦',
        };
        return icons[cat] || '📦';
    }

    function showSkeleton(container) {
        const skeletons = Array(6).fill('').map(() => `
      <div class="product-card skeleton">
        <div class="skeleton-image"></div>
        <div class="skeleton-text"></div>
        <div class="skeleton-text short"></div>
        <div class="skeleton-button"></div>
      </div>
    `).join('');
        container.innerHTML = skeletons;
    }

    function showError(container, message) {
        container.innerHTML = `
      <div class="empty-state error-state">
        <div class="empty-icon">⚠️</div>
        <h3>Gagal memuat produk</h3>
        <p>${message}</p>
        <button class="btn-retry" onclick="Products.init()">🔄 Coba Lagi</button>
      </div>`;
    }

    function startAutoRefresh(container) {
        setInterval(async () => {
            try {
                allProducts = await SheetsAPI.fetchProducts(true);
                applyFilters();
            } catch (e) {
                console.warn('Auto-refresh gagal:', e);
            }
        }, CONFIG.REFRESH_INTERVAL);
    }

    // Load related products (for product detail page)
    async function loadRelated(currentId, category, containerId = 'related-products') {
        const container = document.getElementById(containerId);
        if (!container) return;

        const products = await SheetsAPI.fetchProducts();
        const related = products
            .filter(p => String(p.id) !== String(currentId) && p.kategori === category)
            .slice(0, 4);

        if (related.length === 0) {
            container.parentElement.style.display = 'none';
            return;
        }

        container.innerHTML = related.map(p => createProductCard(p)).join('');
    }

    return {
        init,
        render,
        addToCart,
        search,
        filterByCategory,
        loadRelated,
    };
})();
