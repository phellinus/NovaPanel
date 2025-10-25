import * as React from 'react';

//登录请求参数
export interface ILoginParams {
    userName: string;
    userPwd: string;
}
//获取部门请求参数
export interface IDeptParams {
    deptName?: string;
}
//侧边导航栏收缩状态
export interface NavHeaderProps {
    collapsed: boolean;
    setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}
//添加部门请求参数
export interface ICreateDeptParams {
    _id?: string;
    deptName: string;
    parentId: string;
    userName: string;
}
