import { useEffect, useMemo } from 'react';
import { RouterProvider } from 'react-router-dom';
import { ConfigProvider, theme as antdTheme } from 'antd';
import { useStore } from '@/store';
import { applyTheme } from '@/utils/theme.ts';
import router from './router';

function App() {
    const isDark = useStore((state) => state.isDark);

    useEffect(() => {
        applyTheme(isDark);
    }, [isDark]);

    const themeConfig = useMemo(
        () => ({
            algorithm: isDark ? [antdTheme.darkAlgorithm] : [antdTheme.defaultAlgorithm],
            token: {
                colorPrimary: '#1273D4',
            },
        }),
        [isDark],
    );

    return (
        <ConfigProvider theme={themeConfig}>
            <RouterProvider router={router} />
        </ConfigProvider>
    );
}

export default App;
