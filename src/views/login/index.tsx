import { Button, Checkbox, type CheckboxProps, Form, Input, message } from 'antd';
import '@/views/login/index.css';
import storage from '@/utils/storage';
import type { ILoginParams } from '@/types';
import { Login } from '@/api';

const LoginPage = () => {
    const [form] = Form.useForm();
    const onFinish = async (data: ILoginParams) => {
        const responseData = await Login(data);
        if (responseData) {
            storage.set('nova-token', responseData);
            message.success('登录成功');
        }
    };
    const onChange: CheckboxProps['onChange'] = (e) => {
        console.log(`checked = ${e.target.checked}`);
    };
    return (
        <>
            <div className='_login-view'>
                <img src='/login-back.png' alt='logo' className='logo' />
                <div className='title'>Welcome to Central Platform Management</div>
                <Form
                    layout={'vertical'}
                    form={form}
                    autoComplete={'off'}
                    initialValues={{ layout: 'vertical', remember: true }}
                    onFinish={onFinish}
                >
                    <Form.Item
                        label='Username'
                        name='userName'
                        rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <Input size='large' placeholder='Enter  your username' className='login-input' />
                    </Form.Item>
                    <Form.Item
                        label='Password'
                        name='userPwd'
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password size='large' placeholder='Enter  your password' className='login-input' />
                    </Form.Item>
                    <Form.Item>
                        <Checkbox onChange={onChange}>Remember me</Checkbox>
                    </Form.Item>
                    <Form.Item>
                        <Button type='primary' className='login-button' htmlType='submit'>
                            Log In
                        </Button>
                    </Form.Item>
                </Form>
                <div className='text-bottom'>Forgot password?</div>
            </div>
        </>
    );
};
export default LoginPage;
