import { createBrowserRouter } from 'react-router-dom';
import Home from '@/pages/home';
import Error from '@/pages/error';
import Settings from '@/pages/settings';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Home />,
    },
    {
        path: '/error',
        element: <Error />,
    },
    {
        path: '/settings',
        element: <Settings />,
    }
]);