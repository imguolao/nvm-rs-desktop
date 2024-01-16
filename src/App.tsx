import { useState } from 'react';
import { Button } from '@fluentui/react-components';
import {
    type DesktopConfig,
    callInvokeHandler,
    INVOKE_HANDLER,
} from '@/invoke_handler';

function App() {
    const [config, setConfig] = useState<DesktopConfig>();

    async function handleConfigDisplay() {
        const config = await callInvokeHandler<DesktopConfig>(INVOKE_HANDLER.desktopConfig);
        config && setConfig(config);
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
