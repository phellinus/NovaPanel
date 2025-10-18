import request from '@/utils/request';
import type { ILoginParams } from '@/types';

//登录接口
export const Login = (data: ILoginParams) => {
    return request.post('/users/login', data);
};
