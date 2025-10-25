//部门列表响应参数
export interface IDeptListResponse {
    _id: string;
    deptName: string;
    userName: string;
    parentId: string;
    createId: number;
    updateTime: string;
    createTime: string;
    __v: number;
    children?: Array<IDeptListResponse>;
}
//所有用户信息的响应参数
export interface IAllUserInfoResponse {
    _id: string;
    userId: number;
    userName: string;
    userEmail: string;
}
