import request from '@/utils/request';
import type { IDeptParams, ILoginParams } from '@/types';
import type { IDeptListResponse } from '@/types/list-types.ts';

//登录接口
export const Login = (data: ILoginParams) => {
    return request.post('/users/login', data);
};
//获取部门列表
export const GetDeptListParams = (params: IDeptParams) => {
    return request.get<IDeptListResponse[]>('/dept/list', params);
};
