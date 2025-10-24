import { type FC, useEffect, useState } from 'react';
import styles from '@/views/dept/index.module.css';
import type { IDeptListResponse } from '@/types/list-types.ts';
import { GetDeptListParams } from '@/api';
import { Button, type TableColumnsType, Table, Space, Form, Input } from 'antd';

export const Dept: FC = () => {
    const [data, setData] = useState<IDeptListResponse[]>();
    const [form] = Form.useForm();
    const getDeptList = async () => {
        const res = await GetDeptListParams(form.getFieldsValue());
        setData(res);
    };
    //重置操作
    const handleReset = () => {
        form.resetFields();
        getDeptList();
    };
    useEffect(() => {
        getDeptList();
    }, []);
    const colums: TableColumnsType<IDeptListResponse> = [
        {
            title: '部门名称',
            dataIndex: 'deptName',
            key: 'deptName',
            width: '200',
        },
        {
            title: '负责人',
            dataIndex: 'userName',
            key: 'userName',
            width: '150',
        },
        {
            title: '创建时间',
            dataIndex: 'createTime',
            key: 'createTime',
            width: '200',
        },
        {
            title: '更新时间',
            dataIndex: 'updateTime',
            key: 'updateTime',
            width: '200',
        },
        {
            title: '操作',
            dataIndex: 'operation',
            key: 'operation',
            render: (_, _record) => {
                return (
                    <Space>
                        <Button type='primary' className={`${styles.actionButton} ${styles.actionButtonPrimary}`}>
                            编辑
                        </Button>
                        <Button type='primary' className={`${styles.actionButton} ${styles.actionButtonSecondary}`}>
                            新增
                        </Button>
                        <Button danger className={`${styles.actionButton} ${styles.actionButtonDanger}`}>
                            删除
                        </Button>
                    </Space>
                );
            },
        },
    ];
    return (
        <>
            <div>
                <Form className={styles.form} layout='inline' form={form}>
                    <Form.Item name='deptName' label={<span className={styles.label}>部门名称：</span>}>
                        <Input placeholder='请输入部门名称' />
                    </Form.Item>
                    <Form.Item>
                        <Button type='primary' className='mr-2' onClick={getDeptList}>
                            查询
                        </Button>
                        <Button type='primary' onClick={handleReset}>
                            重置
                        </Button>
                    </Form.Item>
                </Form>
                <div className={styles.header}>
                    <div>部门管理</div>
                    <button type='button' className={styles.buttonOne}>
                        新增
                    </button>
                </div>
                <Table className={styles.table} rowKey='_id' columns={colums} dataSource={data} pagination={false} />
            </div>
        </>
    );
};
