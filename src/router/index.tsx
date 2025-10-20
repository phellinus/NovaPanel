import { createBrowserRouter } from 'react-router-dom';
import LoginPage from '../views/login';
import HomePage from '../views/home';
import Welcome from '../views/welcome';
import App from '../App';

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
    },
    {
        path: '/login',
        element: <LoginPage />,
    },
    {
        path: '/welcome',
        element: <Welcome />,
    },
    {
        path: '/home',
        element: <HomePage />,
    },
]);

export default router;
