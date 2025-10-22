import { Layout } from 'antd';
import styles from '@/layout/index.module.css';
import { Outlet } from 'react-router-dom';
import NavHeader from '@/layout/header';
import NavFooter from '@/layout/footer';
import { useState } from 'react';

const { Header, Footer, Sider, Content } = Layout;

export default function LayoutContainer() {
    const [collapsed, setCollapsed] = useState(false);
    return (
        <>
            <Layout className={styles.layout}>
                <Sider trigger={null} collapsible collapsed={collapsed}>
                    Sider
                </Sider>
                <Layout>
                    <Header className={styles.header}>
                        <NavHeader collapsed={collapsed} setCollapsed={setCollapsed} />
                    </Header>
                    <Content className={styles.layoutContent}>
                        <div className={styles.wrapper}>
                            <Outlet />
                        </div>
                    </Content>
                    <Footer className={styles.footer}>
                        <NavFooter />
                    </Footer>
                </Layout>
            </Layout>
        </>
    );
}
