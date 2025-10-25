import { Form, Input, message, Modal, Select, TreeSelect } from 'antd';
import { forwardRef, useImperativeHandle, useState } from 'react';
import type { IAllUserInfoResponse, IDeptListResponse } from '@/types/list-types.ts';
import { createDeptData, getAllUserInfoParams, GetDeptListParams, updateDeptData } from '@/api';

type PopHandle = {
    open: (type: 'create' | 'update', data: IDeptListResponse | { parentId: string }) => void;
};
interface PopProps {
    reload: () => void;
}
export const CreateDept = forwardRef<PopHandle, PopProps>(({ reload }, ref) => {
    const [form] = Form.useForm();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [userList, setUserList] = useState<IAllUserInfoResponse[]>([]);
    const [deptList, setDeptList] = useState<IDeptListResponse[]>([]);
    const [action, setAction] = useState<'create' | 'update'>('create');
    //获取所有部门信息
    const getDeptList = async () => {
        const res = await GetDeptListParams({});
        setDeptList(res);
    };
    //获取所有的用户信息
    const getAllUserInfo = async () => {
        const userList = await getAllUserInfoParams();
        setUserList(userList);
    };
    //新增部门
    const toActionDept = async () => {
        const valid = await form.validateFields();
        if (!valid) {
            return;
        }
        if (action == 'create') {
            await createDeptData(form.getFieldsValue());
        } else {
            await updateDeptData(form.getFieldsValue());
        }
        message.success(action == 'create' ? '创建部门成功' : '编辑部门成功');
    };
    //关闭弹窗
    const onCancel = () => {
        setIsModalOpen(false);
        form.resetFields();
    };
    //确定创建部门
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
            await getAllUserInfo();
            getDeptList().then(() => {
                setIsModalOpen(true);
            });
        },
    }));
    return (
        <>
            <Modal
                title={action == 'create' ? '创建部门' : '编辑部门'}
                width={800}
                open={isModalOpen}
                onCancel={onCancel}
                onOk={handleOk}
            >
                <Form form={form} labelAlign='right' labelCol={{ span: 4 }}>
                    <Form.Item name='_id' hidden />
                    <Form.Item label='上级部门' name='parentId'>
                        <TreeSelect
                            placeholder='请选择上级部门'
                            allowClear
                            treeDefaultExpandAll
                            treeData={deptList}
                            fieldNames={{ label: 'deptName', value: '_id' }}
                        ></TreeSelect>
                    </Form.Item>
                    <Form.Item
                        label='部门名称'
                        name='deptName'
                        validateTrigger='onBlur'
                        rules={[{ required: true, message: '请输入部门名称' }]}
                    >
                        <Input placeholder='请输入部门名称' />
                    </Form.Item>
                    <Form.Item
                        label='负责人'
                        name='userName'
                        validateTrigger='onBlur'
                        rules={[{ required: true, message: '请输入负责人' }]}
                    >
                        <Select>
                            {userList.map((item) => (
                                <Select.Option key={item._id} value={item._id}>
                                    {item.userName}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
});
