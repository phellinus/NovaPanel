import styles from '@/layout/menu/index.module.css';
import { Menu } from 'antd';
import type { MenuProps } from 'antd/lib';
import {
    AppstoreOutlined,
    DesktopOutlined,
    LaptopOutlined,
    MailOutlined,
    PieChartOutlined,
    SolutionOutlined,
    UserOutlined,
} from '@ant-design/icons';
import * as React from 'react';
import { useLocation, useNavigate, useRouteLoaderData } from 'react-router-dom';
import { useEffect } from 'react';
import { useStore } from '@/store';
import type { IMenuListResponse } from '@/types/list-types.ts';

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

const iconMap: Record<string, React.ReactNode> = {
    PieChartOutlined: <PieChartOutlined />,
    MailOutlined: <MailOutlined />,
    AppstoreOutlined: <AppstoreOutlined />,
    SolutionOutlined: <SolutionOutlined />,
    LaptopOutlined: <LaptopOutlined />,
    UserOutlined: <UserOutlined />,
    DesktopOutlined: <DesktopOutlined />,
};

const getTreeMenu = (menuList: IMenuListResponse[]): MenuItem[] => {
    return menuList
        .filter((item: IMenuListResponse) => item.menuState === 1 && item.menuType === 1)
        .map((item: IMenuListResponse) => {
            return getItem(
                item.menuName,
                item.path || item._id,
                iconMap[item.icon || ''] || undefined,
                item.children && item.children.length > 0 && item.orderBy == 1
                    ? getTreeMenu(item.children as IMenuListResponse[])
                    : undefined,
            );
        });
};
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
    const isDark = useStore((state) => state.isDark);
    const { menuList } = useRouteLoaderData('layout');
    const items = React.useMemo(() => getTreeMenu(menuList || []), [menuList]);
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
                    className='border-0 bg-transparent text-[var(--app-text-primary)] transition-colors duration-300'
                    selectedKeys={[location.pathname]}
                    defaultSelectedKeys={openKeys}
                    onOpenChange={setOpenChange}
                    openKeys={openKeys}
                    mode='inline'
                    theme={isDark ? 'dark' : 'light'}
                    inlineCollapsed={collapsed}
                    onClick={menuClick}
                    items={items}
                />
            </div>
        </>
    );
};

export default SiderMenu;
