import { type RefObject, useEffect, useRef, useState } from 'react';
import * as echarts from 'echarts';

export const useCharts = (): [RefObject<HTMLDivElement | null>, echarts.EChartsType | undefined] => {
    const chartRef = useRef<HTMLDivElement>(null);
    const [chartInstance, setChartInstance] = useState<echarts.EChartsType>();
    useEffect(() => {
        if (chartRef.current) {
            const chartInstance = echarts.init(chartRef.current);
            setChartInstance(chartInstance);
        }
    }, []);
    return [chartRef, chartInstance];
};
