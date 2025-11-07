import { Layout, message } from 'antd';
import styles from '@/layout/index.module.css';
import { Navigate, Outlet, useLocation, useRouteLoaderData } from 'react-router-dom';
import NavHeader from '@/layout/header';
import NavFooter from '@/layout/footer';
import { useState } from 'react';
import SiderMenu from '@/layout/menu';
import { useStore } from '@/store';

const { Header, Footer, Sider, Content } = Layout;

export default function LayoutContainer() {
    const [collapsed, setCollapsed] = useState(false);
    //获取用户信息
    const userStore = useStore();
    //获取当前路由
    const pathName = useLocation().pathname;
    const data = useRouteLoaderData('layout');
    const staticPath = ['/info'];
    //如果未登录直接跳转到登录页
    if (userStore.userInfo.userId < 0) {
        message.error('请先登录');
        return <Navigate to='/login' />;
    }
    if (!staticPath.includes(pathName) && !data.menuPathLists.includes(pathName)) {
        return <Navigate to='/notfound' />;
    }
    return (
        <>
            <Layout className={styles.layout}>
                <Sider trigger={null} collapsible collapsed={collapsed} className={styles.sider}>
                    <SiderMenu collapsed={collapsed} />
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
