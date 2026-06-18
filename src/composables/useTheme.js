import { ref, onMounted } from 'vue';

const isDark = ref(true); // Default ke dark mode sesuai request

export const useTheme = () => {
    const initTheme = () => {
        const storedTheme = localStorage.getItem('theme');
        if (storedTheme) {
            isDark.value = storedTheme === 'dark';
        } else {
            // Default dark
            isDark.value = true;
        }
        applyTheme();
    };

    const toggleTheme = () => {
        isDark.value = !isDark.value;
        localStorage.setItem('theme', isDark.value ? 'dark' : 'light');
        applyTheme();
    };

    const applyTheme = () => {
        if (isDark.value) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    };

    return {
        isDark,
        toggleTheme,
        initTheme
    };
};
