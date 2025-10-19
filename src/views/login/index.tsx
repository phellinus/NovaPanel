import { Button, Checkbox, type CheckboxProps, Form, Input, message } from 'antd';
import style from '@/views/login/index.module.css';
import storage from '@/utils/storage';
import type { ILoginParams } from '@/types';
import { Login } from '@/api';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const [form] = Form.useForm();
    const nav = useNavigate();
    const onFinish = async (data: ILoginParams) => {
        const responseData = await Login(data);
        if (responseData) {
            storage.set('nova-token', responseData);
            message.success('登录成功');
            nav('/');
        }
    };
    const onChange: CheckboxProps['onChange'] = (e) => {
        console.log(`checked = ${e.target.checked}`);
    };
    return (
        <>
            <div className={style._loginView}>
                <img src='/login-back.png' alt='logo' className={style.logo} />
                <div className={style.title}>Welcome to Central Platform Management</div>
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
                        <Input size='large' placeholder='Enter  your username' className={style.loginInput} />
                    </Form.Item>
                    <Form.Item
                        label='Password'
                        name='userPwd'
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password size='large' placeholder='Enter  your password' className={style.loginInput} />
                    </Form.Item>
                    <Form.Item>
                        <Checkbox onChange={onChange}>Remember me</Checkbox>
                    </Form.Item>
                    <Form.Item>
                        <Button type='primary' className={style.loginButton} htmlType='submit'>
                            Log In
                        </Button>
                    </Form.Item>
                </Form>
                <div className={style.textBottom}>Forgot password?</div>
            </div>
        </>
    );
};
export default LoginPage;
