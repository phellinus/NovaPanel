import { getUserPermissionList } from '@/api';
import { getMenuPath } from '@/utils/utils.ts';

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
