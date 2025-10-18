import { Button, Checkbox, type CheckboxProps, Form, Input } from 'antd';
import './index.css';

const LoginPage = () => {
    const [form] = Form.useForm();
    const onFinish = () => {
        console.log('success');
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
                    initialValues={{ layout: 'vertical', remember: true }}
                    onFinish={onFinish}
                >
                    <Form.Item label='Username'>
                        <Input size='large' placeholder='Enter  your username' className='login-input' />
                    </Form.Item>
                    <Form.Item label='Password'>
                        <Input size='large' placeholder='Enter  your password' className='login-input' />
                    </Form.Item>
                    <Form.Item>
                        <Checkbox onChange={onChange}>Remember me</Checkbox>
                    </Form.Item>
                    <Form.Item>
                        <Button type='primary' className='login-button'>
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
