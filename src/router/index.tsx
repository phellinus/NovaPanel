import { createBrowserRouter } from 'react-router-dom';
import LoginPage from '../views/login';
import HomePage from '../views/home';
import Welcome from '../views/welcome';

const router = createBrowserRouter([
    {
        path: '/login',
        element: <LoginPage />,
    },
    {
        path: '/',
        element: <Welcome />,
    },
    {
        path: '/home',
        element: <HomePage />,
    },
]);

export default router;
