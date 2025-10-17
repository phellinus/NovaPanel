export default {
    //获取在本地的方法
    get: (key: string) => {
        return localStorage.getItem(key);
    },
    //设置在本地的方法
    set: (key: string, value: unknown) => {
        return localStorage.setItem(key, JSON.stringify(value));
    },
    //删除在本地的方法
    remove: (key: string) => {
        return localStorage.removeItem(key);
    },
    //清空在本地的方法
    clear: () => {
        return localStorage.clear();
    },
};
