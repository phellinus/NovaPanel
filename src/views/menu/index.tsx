import { type FC, useEffect, useRef, useState } from 'react';
import type { IDeptListResponse, IMenuListResponse } from '@/types/list-types.ts';
import { Button, Form, message, Modal, Select, Space, Table, type TableColumnsType } from 'antd';
import { deleteDeptData, getMenuListParams } from '@/api';
import { formatTime } from '@/utils/utils.ts';
import styles from '@/views/dept/index.module.css';
import { CreateDept } from '@/views/dept/createDept.tsx';
import * as Icons from '@ant-design/icons';

type PopHandle = {
    open: (type: 'create' | 'update', data: IDeptListResponse | { parentId?: string }) => void;
};

const muenuStatusList = [
    {
        lable: '全部',
        value: '0',
    },
    {
        lable: '正常',
        value: '1',
    },
    {
        lable: '停用',
        value: '2',
    },
];
const Menu: FC = () => {
    //表格数据
    const [data, setData] = useState<IMenuListResponse[]>([]);
    //表格加载状态
    const [loading, setLoading] = useState<boolean>(true);
    //表单实例
    const [form] = Form.useForm();
    const getMenuList = async () => {
        setLoading(true);
        const res = await getMenuListParams(form.getFieldsValue());
        setData(res);
        setLoading(false);
    };
    //重置操作
    const handleReset = () => {
        form.resetFields();
        getMenuList();
    };
    //菜单下新增菜单
    const addMenu = (record: IMenuListResponse) => {
        createDeptRef.current?.open('create', { parentId: record._id });
    };
    //编辑菜单
    const editMenu = (record: IMenuListResponse) => {
        createDeptRef.current?.open('update', record);
    };
    //删除菜单
    const deleteMenu = async (record: IMenuListResponse) => {
        Modal.confirm({
            title: '确认删除菜单吗？',
            okText: '确认',
            cancelText: '取消',
            okType: 'danger',
            onOk: async () => {
                await deleteDeptData({ _id: record._id });
                message.success('删除成功');
                getMenuList();
            },
        });
    };
    //组件挂载时加载数据
    useEffect(() => {
        getMenuList();
    }, []);
    const colums: TableColumnsType<IMenuListResponse> = [
        {
            title: '菜单名称',
            dataIndex: 'menuName',
            key: 'menuName',
            width: '200',
        },
        {
            title: '菜单图标',
            dataIndex: 'icon',
            align: 'center',
            key: 'icon',
            width: '150',
            render: (icon: string) => {
                const AntdIcon = (Icons as any)[icon]; // 动态取出图标组件
                return AntdIcon ? <AntdIcon /> : null; // 如果图标存在，就渲染
            },
        },
        {
            title: '菜单类型',
            dataIndex: 'menuType',
            align: 'center',
            key: 'menuType',
            width: '150',
            render: (type: number) => {
                return {
                    1: '菜单',
                    2: '按钮',
                    3: '目录',
                }[type];
            },
        },
        {
            title: '权限标识',
            dataIndex: 'menuCode',
            key: 'menuCode',
            width: '200',
        },
        {
            title: '路由地址',
            dataIndex: 'path',
            key: 'path',
            width: '200',
        },
        {
            title: '状态',
            dataIndex: 'menuState',
            key: 'menuState',
            width: '200',
            render: (state: number) => {
                return {
                    1: <span className='text-white bg-[#22d3ee] px-2 py-1 rounded-full'>正常</span>,
                    2: <span className='text-pink-50 px-2 py-1 rounded-full'>停用</span>,
                }[state];
            },
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
                        <Button
                            type='primary'
                            className={`${styles.actionButton} ${styles.actionButtonPrimary}`}
                            onClick={() => editMenu(_record)}
                        >
                            编辑
                        </Button>
                        <Button
                            type='primary'
                            className={`${styles.actionButton} ${styles.actionButtonSecondary}`}
                            onClick={() => addMenu(_record)}
                        >
                            新增
                        </Button>
                        <Button
                            danger
                            className={`${styles.actionButton} ${styles.actionButtonDanger}`}
                            onClick={() => deleteMenu(_record)}
                        >
                            删除
                        </Button>
                    </Space>
                );
            },
        },
    ];
    const createDeptRef = useRef<PopHandle>(null);
    return (
        <>
            <div>
                <Form className={styles.form} initialValues={{ menuState: '0' }} layout='inline' form={form}>
                    <Form.Item
                        className='w-50'
                        name='menuState'
                        label={<span className={styles.label}>菜单状态：</span>}
                    >
                        <Select>
                            {muenuStatusList.map((item) => (
                                <Select.Option key={item.value} value={item.value}>
                                    {item.lable}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item>
                        <Button type='primary' className='mr-2' onClick={getMenuList}>
                            查询
                        </Button>
                        <Button type='primary' onClick={handleReset}>
                            重置
                        </Button>
                    </Form.Item>
                </Form>
                <div className={styles.header}>
                    <div>菜单管理</div>
                    <button
                        type='button'
                        className={styles.buttonOne}
                        onClick={() => createDeptRef.current?.open('create', {})}
                    >
                        新增
                    </button>
                </div>
                <Table
                    loading={loading}
                    className={styles.table}
                    scroll={{ x: 1100 }}
                    rowKey='_id'
                    columns={colums}
                    dataSource={data}
                    pagination={false}
                />
            </div>
            <CreateDept ref={createDeptRef} reload={getMenuList} />
        </>
    );
};
export default Menu;
