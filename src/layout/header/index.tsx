import styles from '@/layout/header/index.module.css';
import { CrownOutlined, LogoutOutlined, MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Dropdown, message, Space } from 'antd';
import type { MenuProps } from 'antd/lib';
import { useNavigate } from 'react-router-dom';
import storage from '@/utils/storage.ts';
import * as React from 'react';
import type { NavHeaderProps } from '@/types';
import { useStore } from '@/store';

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
    const operate = ({ key }: { key: string }) => {
        if (key == 'setting') {
            // 个人中心
            nav('/info');
        } else if (key === 'logout') {
            // 退出登录
            nav('/login');
            storage.remove('nova-token');
            useStore.persist.clearStorage();
            message.success('退出登录成功');
        }
    };
    return (
        <>
            <div className={styles.navHeader}>
                {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                    className: 'trigger',
                    onClick: () => setCollapsed(!collapsed),
                })}
                <Dropdown menu={{ items, onClick: operate }}>
                    <div className='cursor-pointer'>
                        <Space>桑榆</Space>
                    </div>
                </Dropdown>
            </div>
        </>
    );
}
