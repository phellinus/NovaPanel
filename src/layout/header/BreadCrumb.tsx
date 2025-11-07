import { Breadcrumb } from 'antd';
import { useLocation, useRouteLoaderData } from 'react-router-dom';
import { type ReactNode, useEffect, useState } from 'react';
import { findTreeNode } from '@/utils/utils.ts';

export const BreadCrumb = () => {
    const { pathname } = useLocation();
    const [breadList, setBreadList] = useState<(string | ReactNode)[]>([]);
    const data = useRouteLoaderData('layout');
    useEffect(() => {
        const list = findTreeNode(data.menuList, pathname, []);
        setBreadList([<a href='/'>首页</a>, ...list]);
    }, [pathname]);
    return (
        <>
            <Breadcrumb
                items={breadList.map((item) => ({
                    title: item,
                }))}
            />
        </>
    );
};
