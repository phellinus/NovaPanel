import { forwardRef, useImperativeHandle, useState } from 'react';
import { Form, Input, message, Modal } from 'antd';
import type { IRoleListResponse } from '@/types/list-types.ts';
import { createRoleData, toEditRole } from '@/api';

type PopHandle = {
    open: (type: 'create' | 'update', data: IRoleListResponse | { _id: string }) => void;
};
interface PopProps {
    reload: () => void;
}
export const RolePopup = forwardRef<PopHandle, PopProps>((props, ref) => {
    const [form] = Form.useForm();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [action, setAction] = useState<'create' | 'update'>('create');
    //关闭弹窗
    const onCancel = () => {
        form.resetFields();
        setIsModalOpen(false);
    };
    //确定操作
    const handleOk = () => {
        form.validateFields().then(async (valid) => {
            if (!valid) {
                return;
            }
            if (action == 'create') {
                await createRoleData(form.getFieldsValue());
            } else {
                await toEditRole(form.getFieldsValue());
            }
            props.reload();
            onCancel();
            message.success(action == 'create' ? '创建角色成功' : '编辑角色成功');
        });
    };
    useImperativeHandle(ref, () => ({
        open: (type: 'create' | 'update', data: IRoleListResponse | { _id: string }) => {
            setAction(type);
            if (data) {
                form.setFieldsValue(data);
            }
            setIsModalOpen(true);
        },
    }));
    return (
        <div>
            <Modal
                title={action == 'create' ? '创建部门' : '编辑部门'}
                width={800}
                open={isModalOpen}
                onCancel={onCancel}
                onOk={handleOk}
            >
                <Form form={form} labelAlign='right' labelCol={{ span: 4 }}>
                    <Form.Item name='_id' hidden>
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name='roleName'
                        label='角色名称：'
                        rules={[{ required: true, message: '请输入角色名称' }]}
                    >
                        <Input placeholder={'请输入角色名称'} />
                    </Form.Item>
                    <Form.Item name='remark' label='备注：'>
                        <Input placeholder={'请输入备注'} />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
});
