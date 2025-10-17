import { createBrowserRouter } from 'react-router-dom';
import LoginPage from '../views/login';
import HomePage from '../views/home';
import Welcome from '../views/welcome';

const router = createBrowserRouter([
    {
        path: '/',
        element: <HomePage />,
    },
    {
        path: '/login',
        element: <LoginPage />,
    },
    {
        path: '/welcome',
        element: <Welcome />,
    },
]);

export default router;
