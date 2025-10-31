import { type FC, useState } from 'react';
import styles from '@/views/user/index.module.css';
import { Button, Form, Input, Select, Space, Table, type TableColumnsType } from 'antd';
import type { IRoleRequest } from '@/types';
import { getUserListData } from '@/api';
import { useAntdTable } from 'ahooks';
import type { IUserListResponse } from '@/types/list-types.ts';
import { formatTime } from '@/utils/utils.ts';
import * as React from 'react';

const User: FC = () => {
    const [form] = Form.useForm();
    const [userIds, setUserIds] = useState<number[]>([]);
    //获取角色列表
    const getUserList = ({ current, pageSize }: { current: number; pageSize: number }, formData: IRoleRequest) => {
        return getUserListData({ ...formData, pageNum: current, pageSize: pageSize }).then((res) => {
            return {
                list: res.list || [],
                total: res.page.total || 0,
            };
        });
    };
    const { tableProps, search } = useAntdTable(getUserList, {
        form,
        defaultPageSize: 5,
    });
    //列表数据
    const columns: TableColumnsType<IUserListResponse> = [
        {
            title: '用户ID',
            dataIndex: 'userId',
            key: 'userId',
            width: '200',
        },
        {
            title: '用户名称',
            dataIndex: 'userName',
            key: 'userName',
            width: '200',
        },
        {
            title: '用户邮箱',
            dataIndex: 'userEmail',
            key: 'userEmail',
            width: '200',
        },
        {
            title: '用户角色',
            dataIndex: 'role',
            key: 'role',
            width: '200',
            render(role: number) {
                return {
                    0: '超级管理员',
                    1: '管理员',
                    2: '体验管理员',
                    3: '普通用户',
                }[role];
            },
        },
        {
            title: '用户状态',
            dataIndex: 'state',
            key: 'state',
            width: '200',
            render: (state: string) => {
                return (
                    {
                        '1': '在职',
                        '2': '离职',
                        '3': '试用期',
                    }[state] || state
                );
            },
        },
        {
            title: '注册时间',
            dataIndex: 'createTime',
            key: 'createTime',
            width: '200',
            render: (time: string) => formatTime(time),
        },
        {
            title: '操作',
            dataIndex: 'operation',
            key: 'operation',
            align: 'center',
            render: (_, _record) => {
                return (
                    <Space>
                        <Button type='primary' className={`${styles.actionButton} ${styles.actionButtonPrimary}`}>
                            编辑
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
                <Form className={styles.form} layout='inline' form={form} initialValues={{ status: 0 }}>
                    <Form.Item name='userId' label={<span className={styles.label}>用户ID：</span>}>
                        <Input placeholder={'请输入用户ID'} />
                    </Form.Item>
                    <Form.Item name='userName' label={<span className={styles.label}>用户名称：</span>}>
                        <Input placeholder={'请输入用户名称'} />
                    </Form.Item>
                    <Form.Item name='status' label={<span className={styles.label}>状态：</span>}>
                        <Select placeholder={'请选择状态'} style={{ width: 120 }}>
                            <Select.Option value={0}>所有</Select.Option>
                            <Select.Option value={1}>在职</Select.Option>
                            <Select.Option value={2}>离职</Select.Option>
                            <Select.Option value={3}>试用期</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item>
                        <Button type='primary' className='mr-2' onClick={search.submit}>
                            查询
                        </Button>
                        <Button type='primary' onClick={search.reset}>
                            重置
                        </Button>
                    </Form.Item>
                </Form>
                <div className={styles.header}>
                    <div>用户管理</div>
                    <div className={styles.leftpart}>
                        <button type='button' className={styles.buttonOne}>
                            新增
                        </button>
                        <button type='button' className={styles.dangerButton}>
                            删除
                        </button>
                    </div>
                </div>
                <Table
                    rowSelection={{
                        type: 'checkbox',
                        selectedRowKeys: userIds,
                        onChange: (selectedRowKeys: React.Key[]) => {
                            setUserIds(selectedRowKeys as number[]);
                        },
                    }}
                    className={styles.table}
                    rowKey='userId'
                    {...tableProps}
                    columns={columns}
                />
            </div>
        </>
    );
};
export default User;
