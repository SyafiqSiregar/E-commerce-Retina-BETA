import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../pages/HomeView.vue';
import ProductView from '../pages/ProductView.vue';
import CartView from '../pages/CartView.vue';
import AdminLayout from '../pages/admin/AdminLayout.vue';
import AdminLogin from '../pages/admin/AdminLogin.vue';
import AdminDashboard from '../pages/admin/AdminDashboard.vue';
import AdminProducts from '../pages/admin/AdminProducts.vue';
import AdminAddProduct from '../pages/admin/AdminAddProduct.vue';
import AdminCategories from '../pages/admin/AdminCategories.vue';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView
        },
        {
            path: '/product/:id',
            name: 'product',
            component: ProductView
        },
        {
            path: '/cart',
            name: 'cart',
            component: CartView
        },
        {
            path: '/instalasi',
            name: 'instalasi',
            component: () => import('../pages/InstalasiView.vue')
        },
        {
            path: '/admin/login',
            name: 'adminLogin',
            component: AdminLogin
        },
        {
            path: '/admin',
            component: AdminLayout,
            meta: { requiresAdmin: true },
            children: [
                {
                    path: '',
                    name: 'adminDashboard',
                    component: AdminDashboard
                },
                {
                    path: 'products',
                    name: 'adminProducts',
                    component: AdminProducts
                },
                {
                    path: 'products/add',
                    name: 'adminAddProduct',
                    component: AdminAddProduct
                },
                {
                    path: 'categories',
                    name: 'adminCategories',
                    component: AdminCategories
                },
                {
                    path: 'reports',
                    name: 'adminReports',
                    component: () => import('../pages/admin/AdminReports.vue')
                }
            ]
        },
        {
            path: '/:pathMatch(.*)*',
            redirect: '/'
        }
    ],
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition;
        } else {
            return { top: 0 };
        }
    }
});

router.beforeEach((to, from, next) => {
    if (to.meta.requiresAdmin) {
        const token = localStorage.getItem('admin_token');
        if (!token) {
            next('/admin/login');
        } else {
            next();
        }
    } else {
        next();
    }
});

export default router;
