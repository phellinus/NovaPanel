import { createBrowserRouter, Navigate } from 'react-router-dom';
import LoginPage from '../views/login';
import HomePage from '../views/home';
import Welcome from '../views/welcome';
import LayoutContainer from '@/layout';
import Dept from "@/views/dept";
import Dashboard from "@/views/dashboard";
import Role from "@/views/role";
import User from "@/views/user";
import Menu from "@/views/menu";

const router = createBrowserRouter([
    {
        element: <LayoutContainer />,
        children: [
            {
                path: '/welcome',
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
                path: '/dashboard',
                element: <Dashboard />,
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
