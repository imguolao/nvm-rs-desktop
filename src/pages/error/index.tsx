import { Link } from 'react-router-dom';

export default function Error() {
    return (
        <>
            <Link to={'/'}>go back to the home page</Link>
            <div>error</div>
        </>
    );
}
