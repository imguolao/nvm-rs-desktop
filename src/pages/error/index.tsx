import { Link } from 'react-router-dom';
import { error } from '@/atoms/error';
import Button from '@mui/material/Button';

export default function Error() {
    return (
        <>
            <Link to={'/'}>go back to the home page</Link>
            <Button onClick={() => error('test')}>error</Button>
            <div>error</div>
        </>
    );
}
