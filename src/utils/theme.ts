export const applyTheme = (isDark: boolean) => {
    if (typeof document === 'undefined') return;

    const root = document.documentElement;
    root.dataset.theme = isDark ? 'dark' : 'light';
    root.classList.toggle('dark', isDark);
    root.style.colorScheme = isDark ? 'dark' : 'light';
};
