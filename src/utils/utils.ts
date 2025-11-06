import type { IMenuListResponse } from '@/types/list-types.ts';

export function formatTime(dateStr: string): string {
    if (!dateStr) return '';

    const date = new Date(dateStr);

    // 获取各个时间部分
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hour = String(date.getHours()).padStart(2, '0');
    const minute = String(date.getMinutes()).padStart(2, '0');

    return `${year}-${month}-${day} ${hour}:${minute}`;
}

//获取菜单的path
export function getMenuPath(list: IMenuListResponse[]): string[] {
    return list.reduce((res: string[], item: IMenuListResponse) => {
        return res.concat(Array.isArray(item.children) && !item.buttons ? getMenuPath(item.children) : item.path || '');
    }, []);
}
