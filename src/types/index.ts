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
//删除部门请求参数
export interface IDeleteDeptParams {
    _id: string;
}
//获取菜单请求参数
export interface IMenuParams {
    menuState?: number;
}
//添加菜单请求参数
export interface ICreateMenuRequest {
    icon: string;
    menuName: string;
    menuState: number;
    menuType: number;
    orderBy: number;
    parentId: string;
    path: string;
}
//编辑菜单请求参数
export interface IEditMenuRequest extends ICreateMenuRequest {
    _id: string;
}
//删除菜单请求参数
export interface IDeleteMenuRequest {
    _id: string;
}
//获取角色列表请求参数
export interface IRoleRequest {
    pageNum?: number;
    pageSize?: number;
    roleName?: string;
}
//编辑角色请求参数
export interface IEditRoleRequest {
    _id: string;
    action: string;
    roleName: string;
}
//删除角色请求参数
export interface IDeleteRoleRequest {
    _id: string;
}
//新增角色请求参数
export interface ICreateRoleResponse {
    remark: string;
    roleName: string;
}
//设置权限请求参数
export interface ISetRolePermissionResponse {
    _id: string;
    permissionList: {
        checkedKeys: string[];
        halfCheckedKeys: string[];
    };
}
//请求用户列表参数请求参数
export interface IUserListRequest {
    pageNum?: number;
    pageSize?: number;
    state?: number; //0：所有 1在职  2离职  3 试用期
    userName?: string;
    userId?: number;
}
