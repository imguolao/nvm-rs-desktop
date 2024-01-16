import { useState } from 'react';
import { Button } from '@fluentui/react-components';
import { Link } from 'react-router-dom';
import {
    type DesktopConfig,
    callInvokeHandler,
    INVOKE_HANDLER,
} from '@/invoke_handler';

export default function Home() {
    const [config, setConfig] = useState<DesktopConfig>();

    async function handleConfigDisplay() {
        const config = await callInvokeHandler<DesktopConfig>(INVOKE_HANDLER.desktopConfig);
        config && setConfig(config);
    }
    
    return (
        <>
            <Link to={'/error'}>go to error page</Link>
            <Button onClick={handleConfigDisplay}>display config</Button>
            {
                !!config && <p>
                    { JSON.stringify(config) }
                </p>
            }
        </>
    );
}
