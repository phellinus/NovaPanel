import { type FC, useRef, useState } from 'react';
import styles from '@/views/user/index.module.css';
import { Form, Input, message, Modal, Select, Space, Table, type TableColumnsType } from 'antd';
import { deleteUserData, getUserListData } from '@/api';
import { useAntdTable } from 'ahooks';
import type { IUserListResponse } from '@/types/list-types.ts';
import { formatTime } from '@/utils/utils.ts';
import { UserPopup } from '@/views/user/userPopup.tsx';
import * as React from 'react';
import SearchForm from '@/components/SearchForm/SearchForm.tsx';
import AuthButton from '@/components/AuthButton.tsx';

interface UserHandle {
    open: (type: 'create' | 'update', data?: IUserListResponse | { userId?: number }) => void;
}

const User: FC = () => {
    const [form] = Form.useForm();
    const [userIds, setUserIds] = useState<number[]>([]);
    //用户弹窗
    const userPopupRef = useRef<UserHandle>(null);
    //获取角色列表
    const getUserList = ({ current, pageSize }: { current: number; pageSize: number }, formData: IUserListResponse) => {
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
    //批量删除用户数据
    const deleteUserbyIds = (user: IUserListResponse | null = null) => {
        if (userIds.length === 0 && !user) {
            message.warning('请选择要删除的用户');
            return;
        }
        Modal.confirm({
            title: user ? `确认删除用户${user.userName}吗？` : '确认删除选中的用户吗？',
            okText: '确认',
            cancelText: '取消',
            okType: 'danger',
            onOk: () => {
                deleteUserData({
                    userIds: user ? [user.userId] : userIds,
                }).then(() => {
                    search.submit();
                });
            },
        });
    };
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
                        <AuthButton
                            auth='user@edit'
                            type='primary'
                            className={`${styles.actionButton} ${styles.actionButtonPrimary}`}
                            onClick={() => userPopupRef.current?.open('update', _record)}
                        >
                            编辑
                        </AuthButton>
                        <AuthButton
                            auth='user@delete'
                            danger
                            className={`${styles.actionButton} ${styles.actionButtonDanger}`}
                            onClick={() => deleteUserbyIds(_record)}
                        >
                            删除
                        </AuthButton>
                    </Space>
                );
            },
        },
    ];
    return (
        <>
            <div>
                <SearchForm form={form} initialValues={{ status: 0 }} submit={search.submit} reset={search.reset}>
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
                </SearchForm>
                <div className={styles.header}>
                    <div>用户管理</div>
                    <div className={styles.leftpart}>
                        <AuthButton
                            auth='user@create'
                            type='button'
                            className={styles.buttonOne}
                            onClick={() => userPopupRef.current?.open('create')}
                        >
                            新增
                        </AuthButton>
                        <AuthButton
                            auth='user@delete'
                            type='button'
                            className={styles.dangerButton}
                            onClick={() => deleteUserbyIds()}
                        >
                            删除
                        </AuthButton>
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
                <UserPopup ref={userPopupRef} reload={search.submit} />
            </div>
        </>
    );
};
export default User;
