import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@fluentui/react-components';
import SettingIcon from '@/components/icons/setting';
import { type DesktopConfig, getDeskTopConfig } from '@/invoke_handler';

export default function Home() {
    const [config, setConfig] = useState<DesktopConfig>();
    const navigate = useNavigate();

    async function handleDisplayConfig() {
        const config = await getDeskTopConfig();
        config && setConfig(config);
    }

    function handleJumpToSettingPage() {
        navigate('/settings')
    }
    
    return (
        <>
            <Link to={'/error'}>go to the error page</Link>
            <SettingIcon onClick={handleJumpToSettingPage} />
            <Button onClick={handleDisplayConfig}>display config</Button>
            {
                !!config && <p>
                    { JSON.stringify(config) }
                </p>
            }
        </>
    );
}
