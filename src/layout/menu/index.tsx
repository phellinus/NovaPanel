import styles from '@/layout/menu/index.module.css';
import { Menu } from 'antd';
import type { MenuProps } from 'antd/lib';
import {
    AppstoreOutlined,
    LaptopOutlined,
    MailOutlined,
    PieChartOutlined,
    SolutionOutlined,
    UserOutlined,
} from '@ant-design/icons';
import * as React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: 'group',
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
        type,
    } as MenuItem;
}

const items: MenuItem[] = [
    getItem('Dashboard', '/welcome', <PieChartOutlined />),
    getItem('用户模块', '/user', <MailOutlined />, [
        getItem('用户列表', '/userList', <UserOutlined />),
        getItem('菜单管理', '/menuList', <AppstoreOutlined />),
        getItem('角色管理', '/roleList', <SolutionOutlined />),
        getItem('部门管理', '/deptList', <LaptopOutlined />),
    ]),
];
const parentMap: Record<string, string> = {
    '/userList': '/user',
    '/menuList': '/user',
    '/roleList': '/user',
    '/deptList': '/user',
};
const SiderMenu = ({ collapsed }: { collapsed: boolean }) => {
    const nav = useNavigate();
    const location = useLocation();
    const [openKeys, setOpenKeys] = React.useState<string[]>([]);
    const menuClick = ({ key }: { key: string }) => {
        nav(key);
    };
    const setOpenChange = (openKeys: string[]) => {
        setOpenKeys(openKeys);
    };
    useEffect(() => {
        const currentPath = location.pathname;
        const parentKey = parentMap[currentPath];
        if (parentKey) {
            setOpenKeys([parentKey]);
        } else {
            setOpenKeys([]);
        }
    }, [location.pathname]);
    return (
        <>
            <div className={styles.navSide}>
                <div className={styles.logo}>
                    <img className={styles.img} src='/system-logo.png' alt='logo' />
                    {!collapsed && '企业中台'}
                </div>
                <Menu
                    selectedKeys={[location.pathname]}
                    defaultSelectedKeys={openKeys}
                    onOpenChange={setOpenChange}
                    openKeys={openKeys}
                    mode='inline'
                    theme='dark'
                    inlineCollapsed={collapsed}
                    onClick={menuClick}
                    items={items}
                />
            </div>
        </>
    );
};

export default SiderMenu;
