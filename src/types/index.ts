import * as React from 'react';

export interface ILoginParams {
    userName: string;
    userPwd: string;
}

//侧边导航栏收缩状态
export interface NavHeaderProps {
    collapsed: boolean;
    setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}
