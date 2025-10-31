import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { Form, type GetProp, Input, message, Modal, Select, TreeSelect, Upload, type UploadProps } from 'antd';
import type { IAllRoleListResponse, IDeptListResponse, IUserListResponse } from '@/types/list-types.ts';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { createUserData, getAllRoleData, GetDeptListParams, updateUserData } from '@/api';

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

interface UserProps {
    reload: () => void;
}
interface UserHandle {
    open: (type: 'create' | 'update', data?: IUserListResponse | { userId?: number }) => void;
}
const getBase64 = (img: FileType, callback: (url: string) => void) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result as string));
    reader.readAsDataURL(img);
};

const beforeUpload = (file: FileType) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('目前文件只支持JPG/PNG格式');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('图片大小必须小于2MB');
    }
    return isJpgOrPng && isLt2M;
};

export const UserPopup = forwardRef<UserHandle, UserProps>((props, ref) => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [action, setAction] = useState<'create' | 'update'>('create');
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [deptList, setDeptList] = useState<IDeptListResponse[]>([]);
    const [rolelist, setRoleList] = useState<IAllRoleListResponse[]>([]);
    const [userAvatar, setUserImg] = useState<string>('');
    //关闭弹窗
    const onCancel = () => {
        setIsModalOpen(false);
        form.resetFields();
        setUserImg('');
    };
    const uploadButton = (
        <button style={{ border: 0, background: 'none' }} type='button'>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Upload</div>
        </button>
    );
    //获取所有部门信息
    const getDeptList = async () => {
        const res = await GetDeptListParams({});
        setDeptList(res);
    };
    //获取所有角色
    const getRoleList = async () => {
        const res = await getAllRoleData();
        setRoleList(res);
    };
    //确定操作
    const handleOk = () => {
        form.validateFields().then(async (valid) => {
            if (!valid) {
                return;
            }
            if (action == 'create') {
                await createUserData(form.getFieldsValue());
            } else {
                await updateUserData(form.getFieldsValue());
            }
            props.reload();
            onCancel();
            message.success(action == 'create' ? '创建角色成功' : '编辑角色成功');
        });
    };
    // 上传图片
    const handleChange: UploadProps['onChange'] = (info) => {
        if (info.file.status === 'uploading') {
            setLoading(true);
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj as FileType, (url) => {
                setLoading(false);
                setUserImg(url);
            });
            form.setFieldValue('userImg', info.file.response.data.file);
        }
    };
    useImperativeHandle(ref, () => ({
        open: (type: 'create' | 'update', data?: IUserListResponse | { userId?: number }) => {
            setAction(type);
            setIsModalOpen(true);
            if (type === 'update' && data) {
                if ('userImg' in data) {
                    setUserImg(data.userImg || '');
                }
                form.setFieldsValue(data);
            } else {
                form.resetFields();
            }
        },
    }));
    //获取所有部门信息
    useEffect(() => {
        getDeptList();
        getRoleList();
    }, []);
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
                        <TreeSelect
                            placeholder='请选择部门'
                            allowClear
                            treeDefaultExpandAll
                            treeData={deptList}
                            fieldNames={{ label: 'deptName', value: '_id' }}
                        ></TreeSelect>
                    </Form.Item>
                    <Form.Item label='岗位' name='job' rules={[{ required: true, message: '请输入岗位' }]}>
                        <Input placeholder={'请输入岗位'} />
                    </Form.Item>
                    <Form.Item label='状态：' name='state' rules={[{ required: true, message: '请选择状态' }]}>
                        <Select
                            options={[
                                { label: '在职', value: 1 },
                                { label: '离职', value: 2 },
                                { label: '试用期', value: 3 },
                            ]}
                        />
                    </Form.Item>
                    <Form.Item
                        name='roleList'
                        label='系统角色：'
                        rules={[{ required: true, message: '请输入角色名称' }]}
                    >
                        <Select
                            options={rolelist.map((item) => ({
                                label: item.roleName,
                                value: item._id,
                            }))}
                        />
                    </Form.Item>
                    <Form.Item name='userImg' hidden>
                        <Input />
                    </Form.Item>
                    <Form.Item label='用户头像:'>
                        <Upload
                            listType='picture-circle'
                            showUploadList={false}
                            action='/api/users/upload'
                            beforeUpload={beforeUpload}
                            onChange={handleChange}
                        >
                            {userAvatar ? (
                                <img draggable={false} src={userAvatar} alt='avatar' style={{ width: '100%' }} />
                            ) : (
                                uploadButton
                            )}
                        </Upload>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
});
