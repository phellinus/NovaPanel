import { Form, Input, InputNumber, message, Modal, Radio, TreeSelect } from 'antd';
import { forwardRef, useImperativeHandle, useState } from 'react';
import type { IDeptListResponse, IMenuListResponse } from '@/types/list-types.ts';
import { createMenuData, getMenuListParams, updateMenuData } from '@/api';
import { InfoCircleOutlined } from '@ant-design/icons';

type PopHandle = {
    open: (type: 'create' | 'update', data: IMenuListResponse | { parentId: string }) => void;
};
interface PopProps {
    reload: () => void;
}
export const CreateMenu = forwardRef<PopHandle, PopProps>(({ reload }, ref) => {
    const [form] = Form.useForm();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [menuList, setMenuList] = useState<IMenuListResponse[]>([]);
    const [action, setAction] = useState<'create' | 'update'>('create');
    //获取所有菜单信息
    const getDeptList = async () => {
        const res = await getMenuListParams({});
        setMenuList(res);
    };
    //新增菜单
    const toActionDept = async () => {
        const valid = await form.validateFields();
        if (!valid) {
            return;
        }
        if (action == 'create') {
            await createMenuData(form.getFieldsValue());
        } else {
            await updateMenuData(form.getFieldsValue());
        }
        message.success(action == 'create' ? '创建菜单成功' : '编辑菜单成功');
    };
    //关闭弹窗
    const onCancel = () => {
        setIsModalOpen(false);
        form.resetFields();
    };
    //确定创建菜单
    const handleOk = async () => {
        await toActionDept();
        onCancel();
        reload();
    };
    useImperativeHandle(ref, () => ({
        open: async (type: 'create' | 'update', data: IDeptListResponse | { parentId?: string }) => {
            setAction(type);
            if (data) {
                form.setFieldsValue(data);
            }
            getDeptList().then(() => {
                setIsModalOpen(true);
            });
        },
    }));
    return (
        <>
            <Modal
                title={action == 'create' ? '创建菜单' : '编辑菜单'}
                width={800}
                open={isModalOpen}
                onCancel={onCancel}
                onOk={handleOk}
            >
                <Form
                    form={form}
                    labelAlign='right'
                    labelCol={{ span: 4 }}
                    initialValues={{ menuType: 1, menuState: 1 }}
                >
                    <Form.Item name='_id' hidden>
                        <Input />
                    </Form.Item>
                    <Form.Item label='上级菜单' name='parentId'>
                        <TreeSelect
                            placeholder='请选择上级菜单'
                            allowClear
                            treeDefaultExpandAll
                            treeData={menuList}
                            fieldNames={{ label: 'menuName', value: '_id' }}
                        ></TreeSelect>
                    </Form.Item>
                    <Form.Item label='菜单类型' name={'menuType'}>
                        <Radio.Group>
                            <Radio value={1}>菜单</Radio>
                            <Radio value={2}>按钮</Radio>
                            <Radio value={3}>页面</Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item
                        label='菜单名称'
                        name='menuName'
                        validateTrigger='onBlur'
                        rules={[{ required: true, message: '请输入菜单名称' }]}
                    >
                        <Input placeholder='请输入菜单名称' />
                    </Form.Item>
                    <Form.Item noStyle shouldUpdate>
                        {() => {
                            return form.getFieldValue('menuType') == 2 ? (
                                <Form.Item label='权限标识' name='menuCode'>
                                    <Input placeholder='请输入权限标识' />
                                </Form.Item>
                            ) : (
                                <>
                                    <Form.Item
                                        label='菜单图标'
                                        name='icon'
                                        validateTrigger='onBlur'
                                        rules={[{ required: true, message: '请输入菜单图标' }]}
                                    >
                                        <Input placeholder='请输入菜单图标' />
                                    </Form.Item>
                                    <Form.Item
                                        label='路由地址'
                                        name='path'
                                        validateTrigger='onBlur'
                                        rules={[{ required: true, message: '请输入路由地址' }]}
                                    >
                                        <Input placeholder='请输入路由地址' />
                                    </Form.Item>
                                </>
                            );
                        }}
                    </Form.Item>
                    <Form.Item
                        label='排序'
                        name='orderBy'
                        validateTrigger='onBlur'
                        rules={[{ required: true, message: '请输入排序' }]}
                        tooltip={{ title: '排序值越大，显示越靠后', icon: <InfoCircleOutlined rev={undefined} /> }}
                    >
                        <InputNumber min={0} placeholder='请输入排序值' />
                    </Form.Item>
                    <Form.Item label='菜单状态' name='menuState'>
                        <Radio.Group>
                            <Radio value={1}>启用</Radio>
                            <Radio value={2}>停用</Radio>
                        </Radio.Group>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
});
