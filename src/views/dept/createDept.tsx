import { Modal } from 'antd';
import { forwardRef, useImperativeHandle, useState } from 'react';

type PopHandle = {
    open: () => void;
};

export const CreateDept = forwardRef<PopHandle>((_, ref) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const onCancel = () => {
        setIsModalOpen(false);
    };
    useImperativeHandle(ref, () => ({
        open: () => setIsModalOpen(true),
    }));
    return (
        <>
            <Modal title='基础弹窗' open={isModalOpen} onCancel={onCancel} onOk={handleOk}>
                弹窗
            </Modal>
        </>
    );
});
