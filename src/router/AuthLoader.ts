import { getUserPermissionList } from '@/api';
import { getMenuPath } from '@/utils/utils.ts';
import { redirect } from 'react-router-dom';
import storage from '@/utils/storage.ts';
import { message } from 'antd';

export default async function AuthLoader() {
    const data = await getUserPermissionList();
    const { menuList } = data;
    const menuPathLists = getMenuPath(menuList);
    return {
        menuPathLists,
        menuList,
        buttonList: data.buttonList,
    };
}

export async function LoginLoader() {
    const token = storage.get('nova-token');
    if (token) {
        message.error('您已登录，无需重复登录');
        // 如果已经登录，就直接重定向到 dashboard
        return redirect('/dashboard');
    }
    return null;
}
