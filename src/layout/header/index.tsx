import styles from '@/layout/header/index.module.css';
import { CrownOutlined, LogoutOutlined, MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Dropdown, message, Space, Switch } from 'antd';
import type { MenuProps } from 'antd/lib';
import { useNavigate } from 'react-router-dom';
import storage from '@/utils/storage.ts';
import * as React from 'react';
import type { NavHeaderProps } from '@/types';
import { useStore } from '@/store';
import { BreadCrumb } from '@/layout/header/BreadCrumb.tsx';

const items: MenuProps['items'] = [
    {
        key: 'setting',
        label: (
            <div>
                <CrownOutlined className='pr-2' />
                个人中心
            </div>
        ),
    },
    {
        key: 'logout',
        label: (
            <div>
                <LogoutOutlined className='pr-2' />
                退出登录
            </div>
        ),
    },
];

export default function NavHeader({ collapsed, setCollapsed }: NavHeaderProps) {
    const nav = useNavigate();
    const isDark = useStore((state) => state.isDark);
    const updateTheme = useStore((state) => state.updateTheme);
    //改变主题颜色
    const handleUpdateTheme = (checked: boolean) => {
        if (checked === isDark) return;
        updateTheme(checked);
    };
    const operate = ({ key }: { key: string }) => {
        if (key == 'setting') {
            // 个人中心
            nav('/info');
        } else if (key === 'logout') {
            storage.remove('nova-token');
            useStore.persist.clearStorage();
            // 退出登录
            nav('/login');
            message.success('退出登录成功');
        }
    };
    return (
        <>
            <div className={styles.navHeader}>
                <div className='flex '>
                    {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                        className: 'trigger mr-4',
                        onClick: () => setCollapsed(!collapsed),
                    })}
                    <BreadCrumb />
                </div>
                <div className={styles.navHeaderItem}>
                    <Switch
                        checkedChildren='暗黑'
                        unCheckedChildren='光亮'
                        checked={isDark}
                        className={styles.switchButton}
                        onChange={handleUpdateTheme}
                    />
                    <Dropdown menu={{ items, onClick: operate }}>
                        <div className='cursor-pointer'>
                            <Space>桑榆</Space>
                        </div>
                    </Dropdown>
                </div>
            </div>
        </>
    );
}
