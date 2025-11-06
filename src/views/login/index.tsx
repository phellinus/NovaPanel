import { Button, Checkbox, type CheckboxProps, Form, Input, message, Switch } from 'antd';
import storage from '@/utils/storage';
import styles from '@/views/login/index.module.css';
import type { ILoginParams } from '@/types';
import { getUserInfoData, Login } from '@/api';
import Bg from '@/components/bg';
import { useNavigate } from 'react-router-dom';
import { useStore } from '@/store';

const LoginPage = () => {
    const [form] = Form.useForm();
    const nav = useNavigate();
    const { updateUserInfo } = useStore();
    const isDark = useStore((state) => state.isDark);
    const updateTheme = useStore((state) => state.updateTheme);
    const onFinish = async (data: ILoginParams) => {
        const responseData = await Login(data);
        if (responseData) {
            //获取用户数据
            const res = await getUserInfoData();
            updateUserInfo(res);
            storage.set('nova-token', responseData);
            message.success('登录成功');
            nav('/dashboard');
        }
    };
    const onChange: CheckboxProps['onChange'] = (e) => {
        console.log(`checked = ${e.target.checked}`);
    };
    //改变主题颜色
    const handleUpdateTheme = (checked: boolean) => {
        if (checked === isDark) return;
        updateTheme(checked);
    };
    return (
        <div className={styles.login}>
            <Switch
                checkedChildren='暗黑'
                unCheckedChildren='光亮'
                checked={isDark}
                className={styles.switchButton}
                onChange={handleUpdateTheme}
            />
            <Bg />
            <div className={styles.content}>
                <aside className={styles.aside}>
                    <div>
                        <span className={styles.title}>Nova Console</span>
                        <h2 className='mt-6 text-3xl font-semibold text-[var(--app-text-primary)] dark:text-white'>
                            更智能的管理体验
                        </h2>
                        <p className='mt-4 text-sm leading-relaxed text-[var(--app-text-secondary)] dark:text-[#98B0C9]'>
                            管理工作区、权限与自动化流程，保持团队协同和系统稳定。登录后即可继续你的工作旅程。
                        </p>
                    </div>
                    <div className='flex items-center gap-3 text-xs text-[#61758A]'>
                        <img
                            src='/login-back.png'
                            alt='Nova console preview'
                            className='h-12 w-12 rounded-2xl border border-[var(--app-border)] bg-[var(--app-muted-surface)] p-2 dark:border-white/10 dark:bg-white/5'
                        />
                        <div>
                            <div className='text-sm font-medium text-[var(--app-text-primary)] dark:text-white/80'>
                                Nova 管理中心
                            </div>
                            <div className='text-[var(--app-text-secondary)] dark:text-[#98B0C9]'>
                                全新版本 · 集中运营与监控面板
                            </div>
                        </div>
                    </div>
                </aside>
                <main className={styles.main}>
                    <div className='flex flex-col gap-4 text-center lg:text-left'>
                        <div className={styles.title}>Sign In</div>
                        <h1 className='text-3xl font-semibold text-[var(--app-text-primary)] dark:text-white'>
                            欢迎登录
                        </h1>
                        <p className='text-sm leading-relaxed text-[var(--app-text-primary)] dark:text-[#98B0C9]'>
                            输入你的账户信息，继续掌控平台的实时动态。
                        </p>
                    </div>
                    <Form
                        layout='vertical'
                        form={form}
                        autoComplete='off'
                        initialValues={{ layout: 'vertical', remember: true }}
                        onFinish={onFinish}
                        requiredMark={false}
                        className='space-y-6'
                    >
                        <Form.Item
                            label={
                                <span className='text-sm font-medium text-[var(--app-text-primary)] dark:text-white/80'>
                                    用户名
                                </span>
                            }
                            name='userName'
                            rules={[{ required: true, message: '请输入用户名' }]}
                        >
                            <Input size='large' placeholder='输入用户名' className={styles.input} />
                        </Form.Item>
                        <Form.Item
                            label={
                                <span className='text-sm font-medium text-[var(--app-text-primary)] dark:text-white/80'>
                                    密码
                                </span>
                            }
                            name='userPwd'
                            rules={[{ required: true, message: '请输入密码' }]}
                        >
                            <Input.Password
                                size='large'
                                placeholder='输入密码'
                                className={
                                    (styles.input,
                                    'focus:border-[#1273D4] focus:shadow-[0_0_0_2px_rgba(18,115,212,0.35)]')
                                }
                            />
                        </Form.Item>
                        <div className='flex items-center justify-between text-xs text-[var(--app-text-secondary)] dark:text-[#61758A]'>
                            <Checkbox onChange={onChange}>
                                <span className='text-[var(--app-text-secondary)]'>记住我</span>
                            </Checkbox>
                            <button type='button' className='text-xs font-medium text-[#1273D4] hover:text-[#0F65BA]'>
                                忘记密码？
                            </button>
                        </div>
                        <Button type='primary' htmlType='submit' className={styles.button}>
                            登录
                        </Button>
                    </Form>
                    <div className='text-center text-xs text-[var(--app-text-secondary)] dark:text-[#61758A]'>
                        首次使用？请联系管理员获取访问权限。
                    </div>
                </main>
            </div>
        </div>
    );
};
export default LoginPage;
