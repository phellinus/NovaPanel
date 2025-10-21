import { Layout } from 'antd';
import styles from '@/layout/index.module.css';
import { Outlet } from 'react-router-dom';

const { Header, Footer, Sider, Content } = Layout;

export default function LayoutContainer() {
    return (
        <>
            <Layout className={styles.layout}>
                <Sider>Sider</Sider>
                <Layout>
                    <Header>Header</Header>
                    <Content className={styles.layoutContent}>
                        <div className={styles.wrapper}>
                            <Outlet />
                        </div>
                    </Content>
                    <Footer className={styles.footer}>Footer</Footer>
                </Layout>
            </Layout>
        </>
    );
}
