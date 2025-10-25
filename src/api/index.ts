import request from '@/utils/request';
import type { ICreateDeptParams, IDeleteDeptParams, IDeptParams, ILoginParams } from '@/types';
import type { IAllUserInfoResponse, IDeptListResponse } from '@/types/list-types.ts';

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
