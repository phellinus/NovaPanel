import axios from 'axios';
import { message } from 'antd';

const instance = axios.create({
    baseURL: '',
    timeout: 3000,
    timeoutErrorMessage: '请求超时，请稍后重试',
    withCredentials: true, // 跨域请求时是否需要使用凭证
});
// 请求拦截器
// 在发送请求之前做些什么
instance.interceptors.request.use(
    (config) => {
        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
);
// 响应拦截器
// 在收到响应后做些什么
instance.interceptors.response.use(
    (response) => {
        const data = response.data;
        if (data.code == 40001) {
            window.location.href = '/login';
        } else if (data.code != 200) {
            message.error(data.msg || '请求失败');
        }
        return data.data;
    },
    (error) => {
        return Promise.reject(error);
    },
);
export default {
    get: (url: string, params?: object) => {
        return instance.get(url, { params });
    },
    post: (url: string, data?: object) => {
        return instance.post(url, data);
    },
    put: (url: string, data?: object) => {
        return instance.put(url, data);
    },
    delete: (url: string) => {
        return instance.delete(url);
    },
};
