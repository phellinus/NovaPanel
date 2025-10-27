import { forwardRef, useImperativeHandle, useState } from 'react';
import { Form, message, Modal, Tree, type TreeDataNode, type TreeProps } from 'antd';
import type { IMenuListResponse, IRoleListResponse } from '@/types/list-types.ts';
import { getMenuListParams, updateRoleData } from '@/api';
import type { ISetRolePermissionResponse } from '@/types';

type PopHandle = {
    open: (data: IRoleListResponse) => void;
};
interface PopProps {
    reload: () => void;
}

export const SetPermissionPopup = forwardRef<PopHandle, PopProps>((props, ref) => {
    const [form] = Form.useForm();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [menuList, setMenuList] = useState<IMenuListResponse[]>([]);
    const [checkedKeys, setCheckedKeys] = useState<string[]>([]);
    const [permission, setPermission] = useState<ISetRolePermissionResponse>();
    const [roleInfo, setRoleInfo] = useState<IRoleListResponse>();
    //关闭弹窗
    const onCancel = () => {
        form.resetFields();
        setIsModalOpen(false);
    };
    //获取所有的角色
    const getAllRole = async () => {
        const data = await getMenuListParams({});
        setMenuList(data);
    };
    //确定操作
    const handleOk = () => {
        if (permission) {
            updateRoleData(permission).then(() => {
                message.success('设置权限成功');
                props.reload();
                onCancel();
            });
        }
    };
    useImperativeHandle(ref, () => ({
        open: (data: IRoleListResponse) => {
            getAllRole();
            setRoleInfo(data);
            if (data) {
                setCheckedKeys(data.permissionList.checkedKeys);
            }
            setIsModalOpen(true);
        },
    }));
    const onCheck: TreeProps['onCheck'] = (checkedKeys: any, info: any) => {
        setCheckedKeys(checkedKeys);
        const checkedKeysTemp: string[] = [];
        const halfCheckedKeysTemp: string[] = [];
        info.checkedNodes.map((node: IMenuListResponse) => {
            if (node.menuType == 2) {
                checkedKeysTemp.push(node._id);
            } else {
                halfCheckedKeysTemp.push(node._id);
            }
        });
        setPermission({
            _id: roleInfo?._id || '',
            permissionList: {
                checkedKeys: checkedKeysTemp,
                halfCheckedKeys: halfCheckedKeysTemp.concat(info.halfCheckedKeys),
            },
        });
    };
    return (
        <div>
            <Modal title='设置权限' width={600} open={isModalOpen} onCancel={onCancel} onOk={handleOk}>
                <Form form={form} labelAlign='right' labelCol={{ span: 4 }}>
                    <Form.Item label='角色名称'></Form.Item>
                    <Form.Item label='权限'>
                        <Tree
                            checkable
                            defaultExpandAll={true}
                            checkedKeys={checkedKeys}
                            onCheck={onCheck}
                            fieldNames={{
                                title: 'menuName',
                                key: '_id',
                                children: 'children',
                            }}
                            treeData={menuList as unknown as TreeDataNode[]}
                        />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
});
