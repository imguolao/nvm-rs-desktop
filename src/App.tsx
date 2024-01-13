import { useState } from 'react';
import { Button } from '@fluentui/react-components';
import { invoke } from '@tauri-apps/api/tauri';

type DesktopConfig = {
    node_dist_mirror: string;
    base_dir: string;
}

function App() {
    const [config, setConfig] = useState<DesktopConfig>();

    async function handleConfigDisplay() {
        const config = await invoke<DesktopConfig>('get_desktop_config');
        setConfig(config);
    }
    
    return (
        <>
            <Button onClick={handleConfigDisplay}>display config</Button>
            {
                !!config && <p>
                    { JSON.stringify(config) }
                </p>
            }
        </>
    );
}

export default App;
