import type { FC } from 'react';
import style from '@/views/dashboard/index.module.css';
import { Descriptions } from 'antd';
import type { DescriptionsProps } from 'antd';

const items: DescriptionsProps['items'] = [
    {
        key: '1',
        label: 'UserName',
        children: 'Zhou Maomao',
    },
    {
        key: '2',
        label: 'Telephone',
        children: '1810000000',
    },
    {
        key: '3',
        label: 'Live',
        children: 'Hangzhou, Zhejiang',
    },
    {
        key: '4',
        label: 'Remark',
        children: 'empty',
    },
    {
        key: '5',
        label: 'Address',
        children: 'No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China',
    },
];
const Dashboard: FC = () => {
    return (
        <>
            <div>
                <Descriptions className={style.description} title='User Info' items={items} />
            </div>
        </>
    );
};

export default Dashboard;
