import { Link, useNavigate } from 'react-router-dom';
import SettingIcon from '@/components/icons/setting';

export default function Home() {
    const navigate = useNavigate();

    function handleJumpToSettingPage() {
        navigate('/settings')
    }
    
    return (
        <>
            <Link to={'/error'}>go to the error page</Link>
            <SettingIcon onClick={handleJumpToSettingPage} />
        </>
    );
}
