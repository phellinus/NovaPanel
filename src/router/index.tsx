import { createBrowserRouter, Navigate } from 'react-router-dom';
import LoginPage from '../views/login';
import HomePage from '../views/home';
import Welcome from '../views/welcome';
import LayoutContainer from '@/layout';

const router = createBrowserRouter([
    {
        element: <LayoutContainer />,
        children: [
            {
                path: '/welcome',
                element: <Welcome />,
            },
        ],
    },
    {
        path: '/',
        element: <Navigate to={'/welcome'} />,
    },
    {
        path: '/login',
        element: <LoginPage />,
    },
    {
        path: '/home',
        element: <HomePage />,
    },
]);

export default router;
