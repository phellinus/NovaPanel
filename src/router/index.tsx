import { createBrowserRouter, Navigate } from 'react-router-dom';
import LoginPage from '../views/login';
import HomePage from '../views/home';
import Welcome from '../views/welcome';
import Dashboard from '@/views/dashboard';
import LayoutContainer from '@/layout';
import { Dept } from '@/views/dept';
import Role from '@/views/role';
import User from '@/views/user';
import Menu from '@/views/menu';
import AuthLoader, { LoginLoader } from '@/router/AuthLoader.ts';
import NotFound from '@/notFound.tsx';
import Page404 from '@/Page404.tsx';

const router = createBrowserRouter([
    {
        id: 'layout',
        element: <LayoutContainer />,
        loader: AuthLoader,
        children: [
            {
                path: '/dashboard',
                element: <Welcome />,
            },
            {
                path: '/userList',
                element: <User />,
            },
            {
                path: '/roleList',
                element: <Role />,
            },
            {
                path: '/menuList',
                element: <Menu />,
            },
            {
                path: '/deptList',
                element: <Dept />,
            },
            {
                path: '/info',
                element: <Dashboard />,
            },
        ],
    },
    {
        path: '/',
        element: <Navigate to={'/dashboard'} />,
    },
    {
        path: '/login',
        loader: LoginLoader,
        element: <LoginPage />,
    },
    {
        path: '/home',
        element: <HomePage />,
    },
    {
        path: '/notfound',
        element: <NotFound />,
    },
    {
        path: '*',
        element: <Page404 />,
    },
]);

export default router;
