import { useEffect, useState } from 'react';
import { RouterProvider } from 'react-router-dom';
import { useAtom } from 'jotai';
import { 
    FluentProvider,
    webLightTheme,
    webDarkTheme,
} from '@fluentui/react-components';
import { router } from '@/routes';
import { configAtom, getDefaultBaseDir } from '@/atoms/config';
import { appWindow } from '@tauri-apps/api/window';
import type { UnlistenFn } from '@tauri-apps/api/event';
import ErrorModal from '@/components/error';
import './app.css';

function App() {
    const [config, setConfig] = useAtom(configAtom);
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
        if (config.theme === 'system') {
            (async () => {
                const osTheme = await appWindow.theme();
                setIsDark(osTheme === 'dark');
                unlisten = await appWindow.onThemeChanged(({ payload: theme }) => {
                    setIsDark(theme === 'dark');
                });
            })();
        } else {
            setIsDark(config.theme === 'dark');
        }

        return () => unlisten?.();
    }, [config]);

    return (
        <FluentProvider theme={isDark ? webDarkTheme : webLightTheme}>
            <RouterProvider router={router} />
            <ErrorModal />
        </FluentProvider>
    );
}

export default App;
