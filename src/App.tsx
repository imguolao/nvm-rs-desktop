import { useEffect, useState, useMemo } from 'react';
import { RouterProvider } from 'react-router-dom';
import { useAtom } from 'jotai';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { router } from '@/routes';
import { configAtom, themeAtom, getDefaultBaseDir } from '@/atoms/config';
import { appWindow } from '@tauri-apps/api/window';
import type { UnlistenFn } from '@tauri-apps/api/event';
import ErrorModal from '@/components/error';
import './app.css';

function App() {
    const [config, setConfig] = useAtom(configAtom);
    const [theme] = useAtom(themeAtom);
    const [isDark, setIsDark] = useState<boolean>(false);
    
    useEffect(() => {
        if (!config.baseDir) {
            (async () => {
                const baseDir = await getDefaultBaseDir();
                setConfig({
                    ...config,
                    baseDir,
                });
            })();
        }
    }, []);

    useEffect(() => {
        let unlisten: UnlistenFn | undefined;
        if (theme === 'system') {
            (async () => {
                const osTheme = await appWindow.theme();
                setIsDark(osTheme === 'dark');
                unlisten = await appWindow.onThemeChanged(({ payload: theme }) => {
                    setIsDark(theme === 'dark');
                });
            })();
        } else {
            setIsDark(theme === 'dark');
        }

        return () => unlisten?.();
    }, [theme]);

    const muiTheme = useMemo(() => {
        return createTheme({
            palette: {
                mode: isDark ? 'dark' : 'light',
            },
        }),
    }, [isDark]);

    return (
        <ThemeProvider theme={muiTheme}>
            <RouterProvider router={router} />
            <ErrorModal />
        </ThemeProvider>
    );
}

export default App;
