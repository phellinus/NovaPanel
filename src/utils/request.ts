import axios from 'axios';
import storage from '@/utils/storage.ts';
import { message } from 'antd';

const api = import.meta.env.VITE_BASE_URL;
const instance = axios.create({
    baseURL: api,
    timeout: 3000,
    timeoutErrorMessage: '请求超时，请稍后重试',
    withCredentials: true, // 跨域请求时是否需要使用凭证
    headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + (storage.get('nova-token') || ''),
        'X-Requested-With': 'XMLHttpRequest',
    },
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
            return Promise.reject(data);
        }
        return data.data;
    },
    (error) => {
        return Promise.reject(error);
    },
);
export default {
    get: <T>(url: string, params?: object): Promise<T> => {
        return instance.get(url, { params });
    },
    post: <T>(url: string, data?: object): Promise<T> => {
        return instance.post(url, data);
    },
    put: <T>(url: string, data?: object): Promise<T> => {
        return instance.put(url, data);
    },
    delete: <T>(url: string): Promise<T> => {
        return instance.delete(url);
    },
};
