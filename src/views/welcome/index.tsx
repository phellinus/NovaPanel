import styles from './index.module.css';
import { useNavigate } from 'react-router-dom';
import Bg from '@/components/bg.tsx';

const insights = [
    { label: 'Active Workspaces', value: '24', trend: '+12%' },
    { label: 'Pending Approvals', value: '5', trend: '−2' },
    { label: 'Realtime Users', value: '312', trend: '+38' },
];

const nextSteps = [
    { title: 'Browse Dashboard', description: 'Analyse today’s performance and recent changes.' },
    { title: 'Create Automation', description: 'Build flows that streamline routine operations.' },
    { title: 'Invite Collaborator', description: 'Share access and keep your team in sync.' },
];

const Welcome = () => {
    const nav = useNavigate();

    return (
        <div className={styles.welcome}>
            <Bg />
            <div className={styles.content}>
                <header className={styles.header}>
                    <div className='space-y-6 lg:max-w-xl'>
                        <span className={styles.title}>Nova Console</span>
                        <div className='space-y-4'>
                            <h1 className='text-4xl font-semibold leading-tight text-white lg:text-[42px]'>
                                欢迎回到 Nova 管理中心
                            </h1>
                            <p className='text-base leading-relaxed text-[#98B0C9]'>
                                集中监管平台动态，跟踪运营数据，并在一个界面内完成关键操作。保持轻盈、专注而高效的工作节奏。
                            </p>
                        </div>
                        <div className='flex flex-wrap items-center gap-4'>
                            <button type='button' className={styles.buttonOne} onClick={() => nav('/')}>
                                进入仪表盘
                            </button>
                            <button type='button' className={styles.buttonTwo}>
                                查看更新日志
                            </button>
                        </div>
                    </div>
                    <div className={styles.insights}>
                        <h2 className='text-sm font-medium uppercase tracking-[0.2em] text-[#61758A]'>今日概览</h2>
                        <div className='space-y-4'>
                            {insights.map((item) => (
                                <div
                                    key={item.label}
                                    className='flex items-center justify-between rounded-xl bg-white/5 px-4 py-3 text-left'
                                >
                                    <div>
                                        <div className='text-sm font-medium text-white/85'>{item.label}</div>
                                        <div className='mt-0.5 text-xs text-[#61758A]'>{item.trend}</div>
                                    </div>
                                    <span className='text-2xl font-semibold text-white'>{item.value}</span>
                                </div>
                            ))}
                        </div>
                        <p className='text-xs text-[#61758A]'>数据实时刷新，确保下一步决策拥有最新依据。</p>
                    </div>
                </header>

                <section className='grid gap-6 lg:grid-cols-3'>
                    {nextSteps.map((step) => (
                        <button key={step.title} type='button' className={styles.buttonThree}>
                            <span className='rounded-full bg-[#1273D4]/15 px-3 py-1 text-xs font-semibold text-[#1273D4]'>
                                Quick Start
                            </span>
                            <span className='text-lg font-medium text-white'>{step.title}</span>
                            <span className='text-sm leading-relaxed text-[#98B0C9]'>{step.description}</span>
                        </button>
                    ))}
                </section>
            </div>
        </div>
    );
};

export default Welcome;
