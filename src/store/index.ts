import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { IUserInfoData } from '@/types/list-types.ts';

interface UserStore {
    userInfo: IUserInfoData;
    updateUserInfo: (userInfo: IUserInfoData) => void;
}

export const useStore = create<UserStore>()(
    persist(
        (set) => ({
            userInfo: {
                _id: '',
                createId: -1,
                deptId: '',
                deptName: '',
                job: '',
                mobile: '',
                role: -1,
                roleList: '',
                state: -1,
                userEmail: '',
                userId: -1,
                userImg: '',
                userName: '',
            },
            updateUserInfo: (userInfo: IUserInfoData) => set({ userInfo }),
        }),
        {
            name: 'user-store',
            partialize: (state: UserStore) => ({ userInfo: state.userInfo }), // 只保存 userInfo，不保存方法
        },
    ),
);
