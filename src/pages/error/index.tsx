import { Link } from 'react-router-dom';
import { error } from '@/atoms/error';
import { Button } from '@fluentui/react-components'

export default function Error() {
    return (
        <>
            <Link to={'/'}>go back to the home page</Link>
            <Button onClick={() => error('test')}>123</Button>
            <div>error</div>
        </>
    );
}
