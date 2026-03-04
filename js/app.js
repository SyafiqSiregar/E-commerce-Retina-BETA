// ============================================
// RETINA CCTV — App Initialization & Utilities
// ============================================

// ── Utility Functions ──

function formatPrice(num) {
    return CONFIG.CURRENCY + ' ' + new Intl.NumberFormat(CONFIG.LOCALE).format(num);
}

function showToast(message, duration = 3000) {
    // Remove existing toast
    const existing = document.querySelector('.toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<span>${message}</span>`;
    document.body.appendChild(toast);

    // Force reflow for animation
    toast.offsetHeight;
    toast.classList.add('show');

    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, duration);
}

function getUrlParam(param) {
    return new URLSearchParams(window.location.search).get(param);
}

// ── Navbar ──

function initNavbar() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    // Scroll effect
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;
        navbar.classList.toggle('scrolled', currentScroll > 50);
        lastScroll = currentScroll;
    }, { passive: true });

    // Mobile menu toggle
    const menuBtn = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('open');
            menuBtn.classList.toggle('open');
            document.body.classList.toggle('menu-open');
        });

        // Close on link click
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('open');
                menuBtn.classList.remove('open');
                document.body.classList.remove('menu-open');
            });
        });
    }
}

// ── Search Handler ──

function initSearch() {
    const searchInput = document.getElementById('search-input');
    if (!searchInput) return;

    let debounceTimer;
    searchInput.addEventListener('input', (e) => {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
            Products.search(e.target.value);
        }, 300);
    });

    // Clear search
    const clearBtn = document.getElementById('search-clear');
    if (clearBtn) {
        clearBtn.addEventListener('click', () => {
            searchInput.value = '';
            Products.search('');
            clearBtn.style.display = 'none';
        });

        searchInput.addEventListener('input', () => {
            clearBtn.style.display = searchInput.value ? 'flex' : 'none';
        });
    }
}

// ── Scroll Animations ──

function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });
}

// ── Smooth Scroll to Products ──

function scrollToProducts() {
    const section = document.getElementById('products-section');
    if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// ── App Init ──

document.addEventListener('DOMContentLoaded', () => {
    Cart.init();
    initNavbar();
    initSearch();

    // Init scroll animations after a short delay
    setTimeout(initScrollAnimations, 100);
});
