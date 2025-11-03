import { type FC, useRef } from 'react';
import style from '@/views/dashboard/index.module.css';
import { Avatar, Button, Card, Descriptions } from 'antd';
import type { DescriptionsProps } from 'antd';
import { AntDesignOutlined } from '@ant-design/icons';

const items: DescriptionsProps['items'] = [
    {
        key: '1',
        label: '用户名',
        children: 'Zhou Maomao',
    },
    {
        key: '2',
        label: '邮箱',
        children: '1810000000',
    },
    {
        key: '3',
        label: '状态',
        children: 'Hangzhou, Zhejiang',
    },
    {
        key: '4',
        label: '手机号',
        children: 'empty',
    },
    {
        key: '5',
        label: '岗位',
        children: 'Zhejiang, China',
    },
    {
        key: '6',
        label: '部门',
        children: 'Zhejiang, China',
    },
];
const Dashboard: FC = () => {
    const lineRef = useRef(null);
    const pieCityRef = useRef(null);
    const pieRoleRef = useRef(null);
    const radarRef = useRef(null);
    return (
        <>
            <div className={style.top}>
                <Avatar
                    className={style.avatar}
                    size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
                    icon={<AntDesignOutlined />}
                />
                <Descriptions className={style.description} title='用户信息' items={items} />
            </div>
            <div className={style.content}>
                <div className={style.datacenter}>
                    <span className='text-lg font-medium text-white'>提交代码行数</span>
                    <span className='text-sm leading-relaxed text-[#98B0C9]'>123</span>
                </div>
                <div className={style.datacenter}>
                    <span className='text-lg font-medium text-white'>工资</span>
                    <span className='text-sm leading-relaxed text-[#98B0C9]'>123</span>
                </div>
                <div className={style.datacenter}>
                    <span className='text-lg font-medium text-white'>完成需求</span>
                    <span className='text-sm leading-relaxed text-[#98B0C9]'>123</span>
                </div>
                <div className={style.datacenter}>
                    <span className='text-lg font-medium text-white'>项目数量</span>
                    <span className='text-sm leading-relaxed text-[#98B0C9]'>123</span>
                </div>
            </div>
            <Card title='消费流水' extra={<Button type='primary'>刷新</Button>} style={{ width: '100%' }}>
                <div ref={lineRef} className={style.lineChart}></div>
            </Card>
            <Card title='程序员分析' extra={<Button type='primary'>刷新</Button>} style={{ width: '100%' }}>
                <div className={style.pieChart}>
                    <div ref={pieCityRef} className={style.lineChart}></div>
                    <div ref={pieRoleRef} className={style.roleChart}></div>
                </div>
            </Card>
            <Card title='程序员分析' extra={<Button type='primary'>刷新</Button>} style={{ width: '100%' }}>
                <div ref={radarRef} className={style.radarChart}></div>
            </Card>
        </>
    );
};

export default Dashboard;
