import { type FC, useRef } from 'react';
import styles from '@/views/role/index.module.css';
import { Form, Input, message, Modal, Space, Table, type TableColumnsType } from 'antd';
import type { IRoleListResponse } from '@/types/list-types.ts';
import { deleteRoleData, getRoleListParams } from '@/api';
import type { IRoleRequest } from '@/types';
import { useAntdTable } from 'ahooks';
import { RolePopup } from '@/views/role/RolePopup.tsx';
import { SetPermissionPopup } from '@/views/role/setPermissionPopup.tsx';
import { formatTime } from '@/utils/utils.ts';
import SearchForm from '@/components/SearchForm/SearchForm.tsx';
import AuthButton from '@/components/AuthButton.tsx';

type PopHandle = {
    open: (type: 'create' | 'update', data: IRoleListResponse | { _id: string }) => void;
};
type PermissionPopupHandle = {
    open: (data: IRoleListResponse) => void;
};
const Role: FC = () => {
    const [form] = Form.useForm();
    const rolePopupRef = useRef<PopHandle>(null);
    const setPermissionPopupRef = useRef<PermissionPopupHandle>(null);
    //获取角色列表
    const getRoleList = ({ current, pageSize }: { current: number; pageSize: number }, formData: IRoleRequest) => {
        return getRoleListParams({ ...formData, pageNum: current, pageSize: pageSize }).then((res) => {
            return {
                list: res.list || [],
                total: res.page.total || 0,
            };
        });
    };
    const { tableProps, search } = useAntdTable(getRoleList, {
        form,
        defaultPageSize: 5,
    });
    //编辑角色
    const handleEditRole = (role: IRoleListResponse) => {
        rolePopupRef.current?.open('update', role);
    };
    //删除角色
    const handleDeleteRole = (id: string) => {
        Modal.confirm({
            title: '确认删除该角色吗？',
            okText: '确认',
            okType: 'danger',
            onOk: () => {
                deleteRoleData({
                    _id: id,
                }).then(() => {
                    search.submit();
                });
                message.success('删除成功');
            },
        });
    };
    //设置权限
    const handleSetPermission = (role: IRoleListResponse) => {
        setPermissionPopupRef.current?.open(role);
    };
    //列表数据
    const columns: TableColumnsType<IRoleListResponse> = [
        {
            title: '角色名称',
            dataIndex: 'roleName',
            key: 'roleName',
            width: '200',
        },
        {
            title: '备注',
            dataIndex: 'remark',
            key: 'remark',
            width: '200',
        },
        {
            title: '创建时间',
            dataIndex: 'createTime',
            key: 'createTime',
            width: '200',
            render: (time: string) => formatTime(time),
        },
        {
            title: '更新时间',
            dataIndex: 'updateTime',
            key: 'updateTime',
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
                            auth='role@edit'
                            type='primary'
                            className={`${styles.actionButton} ${styles.actionButtonPrimary}`}
                            onClick={() => handleEditRole(_record)}
                        >
                            编辑
                        </AuthButton>
                        <AuthButton
                            auth='role@setting'
                            type='primary'
                            className={`${styles.actionButton} ${styles.actionButtonSecondary}`}
                            onClick={() => handleSetPermission(_record)}
                        >
                            设置权限
                        </AuthButton>
                        <AuthButton
                            auth='role@delete'
                            danger
                            className={`${styles.actionButton} ${styles.actionButtonDanger}`}
                            onClick={() => handleDeleteRole(_record._id)}
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
                <SearchForm form={form} submit={search.submit} reset={search.reset}>
                    <Form.Item name='roleName' label={<span className={styles.label}>角色名称：</span>}>
                        <Input placeholder={'请输入角色名称'} />
                    </Form.Item>
                </SearchForm>
                <div className={styles.header}>
                    <div>角色管理</div>
                    <button
                        type='button'
                        className={styles.buttonOne}
                        onClick={() => rolePopupRef.current?.open('create', form.getFieldsValue())}
                    >
                        新增
                    </button>
                </div>
                <Table className={styles.table} rowKey='_id' {...tableProps} columns={columns} />
                <RolePopup ref={rolePopupRef} reload={search.submit} />
                <SetPermissionPopup ref={setPermissionPopupRef} reload={search.submit} />
            </div>
        </>
    );
};
export default Role;
