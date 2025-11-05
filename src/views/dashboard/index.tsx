import { type FC, useEffect, useMemo, useState } from 'react';
import style from '@/views/dashboard/index.module.css';
import type { DescriptionsProps } from 'antd';
import { Avatar, Button, Card, Descriptions } from 'antd';
import { AntDesignOutlined } from '@ant-design/icons';
import { getLineData, getPieAgeData, getPieCityData, getRadarData, getReportData } from '@/api';
import type { IReportData } from '@/types/list-types.ts';
import { useStore } from '@/store';
import { useCharts } from '@/hooks/useEcharts.ts';

const Dashboard: FC = () => {
    const [lineRef, lineChartInstance] = useCharts();
    const [pieCityRef, pieCityChartInstance] = useCharts();
    const [pieRoleRef, pieRoleChartInstance] = useCharts();
    const [radarRef, radarChartInstance] = useCharts();
    const [reportData, setReportData] = useState<IReportData>(); //企业数据
    const { userInfo } = useStore();
    //获取企业的数据
    const getUserCompanyData = async () => {
        const data = await getReportData();
        setReportData(data);
    };
    //获取折线表数据
    const getUserLineData = async () => {
        const data = await getLineData();
        if (lineChartInstance) {
            lineChartInstance.setOption({
                tooltip: {
                    trigger: 'axis',
                },
                legend: {
                    data: ['收入', '支出'],
                },
                grid: {
                    left: 50,
                    right: 50,
                    bottom: 60,
                },
                xAxis: {
                    data: data.label,
                },
                yAxis: {
                    type: 'value',
                },
                series: [
                    {
                        name: '收入',
                        data: data.order,
                        type: 'line',
                    },
                    {
                        name: '支出',
                        data: data.money,
                        type: 'line',
                    },
                ],
            });
        }
    };
    //获取城市的饼图数据
    const getPieCity = async () => {
        const data = await getPieCityData();
        if (pieCityChartInstance) {
            pieCityChartInstance.setOption({
                title: {
                    text: '前端top分布',
                    left: 'center',
                },
                tooltip: {
                    trigger: 'item',
                },
                legend: {
                    orient: 'vertical',
                    left: 'left',
                },
                series: [
                    {
                        name: '城市分布',
                        type: 'pie',
                        radius: '50%',
                        data,
                    },
                ],
            });
        }
    };
    //获取年龄的饼图数据
    const getPieAge = async () => {
        const data = await getPieAgeData();
        pieRoleChartInstance?.setOption({
            title: {
                text: '后端top分布',
                left: 'center',
            },
            tooltip: {
                trigger: 'item',
            },
            legend: {
                orient: 'vertical',
                left: 'left',
            },
            series: [
                {
                    name: '年龄分布',
                    type: 'pie',
                    radius: [50, 180],
                    roseType: 'area',
                    data,
                },
            ],
        });
    };
    //获取雷达图数据
    const getRadar = async () => {
        const data = await getRadarData();
        radarChartInstance?.setOption({
            legend: {
                data: ['程序员技术分析模型'],
            },
            radar: {
                indicator: data.indicator,
            },
            series: [
                {
                    name: '程序员技术分析模型',
                    type: 'radar',
                    data: data.data,
                },
            ],
        });
    };
    const userItems = useMemo<DescriptionsProps['items']>(
        () => [
            { key: '1', label: '用户名', children: userInfo?.userName || '暂无' },
            { key: '2', label: '邮箱', children: userInfo?.userEmail || '暂无' },
            {
                key: '3',
                label: '状态',
                children:
                    {
                        1: '在职',
                        2: '离职',
                        3: '试用期',
                    }[userInfo?.state] || '未知',
            },
            { key: '4', label: '手机号', children: userInfo?.mobile || '暂无' },
            { key: '5', label: '岗位', children: userInfo?.job || '暂无' },
            { key: '6', label: '部门', children: userInfo?.deptName || '暂无' },
        ],
        [userInfo],
    );
    useEffect(() => {
        getUserCompanyData();
    }, []);
    useEffect(() => {
        getUserLineData();
        getPieCity();
        getPieAge();
        getRadar();
    }, [lineChartInstance, pieCityChartInstance, pieRoleChartInstance, radarChartInstance]);
    return (
        <>
            <div className={style.top}>
                <Avatar
                    className={style.avatar}
                    size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
                    icon={<AntDesignOutlined />}
                    src={userInfo?.userImg || ''}
                />
                <Descriptions className={style.description} title='用户信息' items={userItems} />
            </div>
            <div className={style.content}>
                <div className={style.datacenter}>
                    <span className='text-lg font-medium text-white'>提交代码行数</span>
                    <span className='text-sm leading-relaxed text-[#98B0C9]'>
                        {reportData?.codeLine + '行' || '暂无'}
                    </span>
                </div>
                <div className={style.datacenter}>
                    <span className='text-lg font-medium text-white'>工资</span>
                    <span className='text-sm leading-relaxed text-[#98B0C9]'>
                        {reportData?.salary + '元' || '暂无'}
                    </span>
                </div>
                <div className={style.datacenter}>
                    <span className='text-lg font-medium text-white'>完成需求</span>
                    <span className='text-sm leading-relaxed text-[#98B0C9]'>
                        {reportData?.icafeCount + '个' || '暂无'}
                    </span>
                </div>
                <div className={style.datacenter}>
                    <span className='text-lg font-medium text-white'>项目数量</span>
                    <span className='text-sm leading-relaxed text-[#98B0C9]'>
                        {reportData?.projectNum + '个' || '暂无'}
                    </span>
                </div>
            </div>
            <Card title='消费流水' extra={<Button type='primary'>刷新</Button>} style={{ width: '100%' }}>
                <div ref={lineRef} className={style.lineChart}></div>
            </Card>
            <Card title='程序员分析' extra={<Button type='primary'>刷新</Button>} style={{ width: '100%' }}>
                <div className={style.pieChart}>
                    <div ref={pieCityRef} className={style.cityChart}></div>
                    <div ref={pieRoleRef} className={style.roleChart}></div>
                </div>
            </Card>
            <Card title='程序员分析' extra={<Button type='primary'>刷新</Button>} style={{ width: '100%' }}>
                <div ref={radarRef} className={style.radarChart}></div>
            </Card>
        </>
    );
};

export default Dashboard;
