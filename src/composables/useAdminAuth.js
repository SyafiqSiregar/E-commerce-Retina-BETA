import { ref } from 'vue';
import { useRouter } from 'vue-router';

const user = ref(null);
const isAuthenticated = ref(false);

export const useAdminAuth = () => {
    const router = useRouter();

    const login = async (email, password) => {
        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.error);

            // Store token in memory or localStorage temporarily
            localStorage.setItem('admin_token', data.accessToken);
            user.value = data.user;
            isAuthenticated.value = true;
            return true;
        } catch (error) {
            console.error('Login Error:', error);
            throw error;
        }
    };

    const logout = async () => {
        try {
            await fetch('/api/auth/logout', { method: 'POST' });
        } catch (e) {
            console.error(e);
        } finally {
            localStorage.removeItem('admin_token');
            user.value = null;
            isAuthenticated.value = false;
            router.push('/');
        }
    };

    const checkAuth = async () => {
        const token = localStorage.getItem('admin_token');
        if (!token) {
            // Coba ambil dari refresh token cookie
            try {
                const res = await fetch('/api/auth/refresh');
                if (res.ok) {
                    const data = await res.json();
                    localStorage.setItem('admin_token', data.accessToken);
                    isAuthenticated.value = true;
                    // decode JWT (simple fallback, normally use a library or let backend return user)
                    return true;
                }
            } catch (error) {
                console.error(error);
            }
            return false;
        }
        isAuthenticated.value = true;
        return true;
    };

    return { user, isAuthenticated, login, logout, checkAuth };
};
