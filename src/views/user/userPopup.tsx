import { forwardRef, useImperativeHandle, useState } from 'react';
import { Form, Input, Modal, Select } from 'antd';
import type { IUserListResponse } from '@/types/list-types.ts';

interface UserProps {
    reload: () => void;
}
interface UserHandle {
    open: (type: 'create' | 'update', data?: IUserListResponse | { userId?: number }) => void;
}
export const UserPopup = forwardRef<UserHandle, UserProps>((props, ref) => {
    const [form] = Form.useForm();
    const [action, setAction] = useState<'create' | 'update'>('create');
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    //关闭弹窗
    const onCancel = () => {
        setIsModalOpen(false);
        form.resetFields();
    };
    //确定操作
    const handleOk = () => {
        props.reload();
    };

    useImperativeHandle(ref, () => ({
        open: (type: 'create' | 'update', data?: IUserListResponse | { userId?: number }) => {
            setAction(type);
            setIsModalOpen(true);
            if (type === 'update' && data) {
                form.setFieldsValue(data);
            } else {
                form.resetFields();
            }
        },
    }));
    return (
        <>
            <Modal
                title={action == 'create' ? '添加用户' : '编辑用户'}
                width={600}
                open={isModalOpen}
                onCancel={onCancel}
                onOk={handleOk}
            >
                <Form form={form} labelAlign='right' labelCol={{ span: 4 }}>
                    <Form.Item name='userId' hidden>
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label='用户名称:'
                        name='userName'
                        rules={[{ required: true, message: '请输入用户名称' }]}
                    >
                        <Input placeholder={'请输入用户名称'} />
                    </Form.Item>
                    <Form.Item
                        label='用户邮箱：'
                        name='userEmail'
                        rules={[{ required: true, message: '请输入用户邮箱' }]}
                    >
                        <Input placeholder={'请输入用户邮箱'} />
                    </Form.Item>
                    <Form.Item label='手机号' name='mobile' rules={[{ required: true, message: '请输入用户手机号' }]}>
                        <Input placeholder={'请输入用户手机号'} />
                    </Form.Item>
                    <Form.Item label='部门：' name='deptId' rules={[{ required: true, message: '请选择部门' }]}>
                        <Select placeholder={'请选择部门'} options={[{ label: '部门1', value: '1' }]} />
                    </Form.Item>
                    <Form.Item label='岗位' name='job' rules={[{ required: true, message: '请输入岗位' }]}>
                        <Input placeholder={'请输入岗位'} />
                    </Form.Item>
                    <Form.Item label='状态：' name='status' rules={[{ required: true, message: '请选择状态' }]}>
                        <Select
                            options={[
                                { label: '启用', value: '1' },
                                { label: '禁用', value: '0' },
                            ]}
                        />
                    </Form.Item>
                    <Form.Item
                        name='roleList'
                        label='系统角色：'
                        rules={[{ required: true, message: '请输入角色名称' }]}
                    >
                        <Input placeholder={'请输入角色名称'} />
                    </Form.Item>
                    <Form.Item name='userImg' label='用户头像:'></Form.Item>
                </Form>
            </Modal>
        </>
    );
});
