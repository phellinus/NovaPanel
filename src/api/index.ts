import request from '@/utils/request';
import type {
    ICreateDeptParams,
    ICreateMenuRequest,
    ICreateRoleResponse,
    ICreateUserRequest,
    IDeleteDeptParams,
    IDeleteMenuRequest,
    IDeleteRoleRequest,
    IDeleteUserRequest,
    IDeptParams,
    IEditMenuRequest,
    IEditRoleRequest,
    ILoginParams,
    IMenuParams,
    IPageParams,
    IRoleRequest,
    ISetRolePermissionResponse,
    IUpdateUserRequest,
    IUserListRequest,
} from '@/types';
import type {
    IAllRoleListResponse,
    IAllUserInfoResponse,
    IDeptListResponse,
    ILineData,
    IMenuListResponse,
    IPieData,
    IRadarData,
    IReportData,
    IRoleListResponse,
    IUserInfoData,
    IUserListResponse,
} from '@/types/list-types';

//登录接口
export const Login = (data: ILoginParams) => {
    return request.post('/users/login', data);
};
//获取部门列表
export const GetDeptListParams = (params: IDeptParams) => {
    return request.get<IDeptListResponse[]>('/dept/list', params);
};
//获取所有用户信息
export const getAllUserInfoParams = () => {
    return request.get<IAllUserInfoResponse[]>('/users/all/list');
};
//新增部门
export const createDeptData = (data: ICreateDeptParams) => {
    return request.post('/dept/create', data);
};
//编辑部门
export const updateDeptData = (data: ICreateDeptParams) => {
    return request.post('/dept/edit', data);
};
//删除部门
export const deleteDeptData = (data: IDeleteDeptParams) => {
    return request.post('/dept/delete', data);
};
//获取菜单列表
export const getMenuListParams = (params?: IMenuParams) => {
    return request.get<IMenuListResponse[]>('/menu/list', params);
};
//新增菜单
export const createMenuData = (data: ICreateMenuRequest) => {
    return request.post('/menu/create', data);
};
//删除菜单
export const deleteMenuData = (data: IDeleteMenuRequest) => {
    return request.post('/menu/delete', data);
};
//编辑菜单
export const updateMenuData = (data: IEditMenuRequest) => {
    return request.post('/menu/edit', data);
};
//获取所有角色数据
export const getAllRoleData = () => {
    return request.get<IAllRoleListResponse[]>('/roles/allList');
};
//查询角色
export const getRoleListParams = (params: IRoleRequest) => {
    return request.get<{
        list: IRoleListResponse[];
        page: {
            pageNum: number;
            pageSize: number;
            total: number;
        };
    }>('/roles/list', params);
};
//编辑角色
export const toEditRole = (data: IEditRoleRequest) => {
    return request.post('/roles/edit', data);
};
//新增角色
export const createRoleData = (data: ICreateRoleResponse) => {
    return request.post('/roles/create', data);
};
//删除角色
export const deleteRoleData = (data: IDeleteRoleRequest) => {
    return request.post('/roles/delete', data);
};
//设置权限
export const updateRoleData = (data: ISetRolePermissionResponse) => {
    return request.post('/roles/update/permission', data);
};
//获取用户列表
export const getUserListData = (params: IUserListRequest) => {
    return request.get<{
        list: IUserListResponse[];
        page: IPageParams;
    }>('/users/list', params);
};
//删除用户
export const deleteUserData = (data: IDeleteUserRequest) => {
    return request.post('/users/delete', data);
};
//添加用户
export const createUserData = (data: ICreateUserRequest) => {
    return request.post('/users/create', data);
};
//编辑用户
export const updateUserData = (data: IUpdateUserRequest) => {
    return request.post('/users/edit', data);
};
//获取用户的企业信息
export const getReportData = () => {
    return request.get<IReportData>('/order/dashboard/getReportData');
};
//获取折线表数据
export const getLineData = () => {
    return request.get<ILineData>('/order/dashboard/getLineData');
};
//获取饼图城市数据
export const getPieCityData = () => {
    return request.get<IPieData>('/order/dashboard/getPieCityData');
};
//获取饼图年龄数据
export const getPieAgeData = () => {
    return request.get<IPieData>('/order/dashboard/getPieAgeData');
};
//获取雷达图数据
export const getRadarData = () => {
    return request.get<IRadarData>('/order/dashboard/getRadarData');
};
//获取用户信息
export const getUserInfoData = () => {
    return request.get<IUserInfoData>('/users/getUserInfo');
};
