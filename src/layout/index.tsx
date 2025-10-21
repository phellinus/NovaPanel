import { Layout } from 'antd';
import styles from '@/layout/index.module.css';
import { Outlet } from 'react-router-dom';
import NavHeader from '@/layout/header';
import NavFooter from '@/layout/footer';

const { Header, Footer, Sider, Content } = Layout;

export default function LayoutContainer() {
    return (
        <>
            <Layout className={styles.layout}>
                <Sider>Sider</Sider>
                <Layout>
                    <Header className={styles.header}>
                        <NavHeader />
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
