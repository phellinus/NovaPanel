//部门列表响应参数
export interface IDeptListResponse {
    _id: string;
    deptName: string;
    userName: string;
    parentId: string;
    createId: number;
    updateTime: string;
    createTime: string;
    __v: number;
    children?: Array<IDeptListResponse>;
}
//所有用户信息的响应参数
export interface IAllUserInfoResponse {
    _id: string;
    userId: number;
    userName: string;
    userEmail: string;
}

//菜单按钮响应参数
export interface IMenuButtonResponse {
    __v?: number;
    _id?: string;
    createId?: number;
    createTime?: string;
    menuCode?: string;
    menuName?: string;
    menuState?: number;
    menuType?: number;
    orderBy?: number;
    parentId?: string;
    updateTime?: string;
}
export interface IMenuListChildResponse {
    __v: number;
    _id: string;
    buttons?: Array<IMenuButtonResponse>;
    children?: IMenuListChildResponse[];
    createId: number;
    createTime: string;
    icon: string;
    menuName: string;
    menuState: number;
    menuType: number;
    orderBy: number;
    parentId: string;
    path?: string;
    updateTime: string;
    menuCode?: string;
}
//菜单列表响应参数
export type IMenuListResponse = Omit<IMenuListChildResponse, 'menuCode'> & {
    children: IMenuListChildResponse[];
    path: string;
};

//角色列表响应参数
export interface IRoleListResponse {
    __v: number;
    _id: string;
    createId: number;
    createTime: string;
    permissionList: {
        checkedKeys: string[];
        halfCheckedKeys: string[];
    };
    roleName: string;
    updateTime: string;
}
//所有角色数据响应参数
export interface IAllRoleListResponse {
    _id: string;
    roleName: string;
}
//用户列表响应
export interface IUserListResponse {
    __v?: number;
    createId?: number;
    createTime?: string;
    deptId?: string;
    deptName?: string;
    job?: string;
    lastLoginTime?: string;
    mobile?: string;
    role?: number;
    roleList?: string;
    sex?: number;
    state?: number;
    userEmail?: string;
    userId: number;
    userImg?: string;
    userName?: string;
}
