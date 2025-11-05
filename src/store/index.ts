import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { IUserInfoData } from '@/types/list-types.ts';

interface UserStore {
    userInfo: IUserInfoData;
    isDark: boolean;
    updateTheme: (isDark: boolean) => void;
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
            isDark: false,
            updateUserInfo: (userInfo: IUserInfoData) => set({ userInfo }),
            updateTheme: (isDark: boolean) => set({ isDark }),
        }),
        {
            name: 'user-store',
            partialize: (state: UserStore) => ({
                userInfo: state.userInfo,
                isDark: state.isDark,
            }), // 只保存必要状态，不保存方法
        },
    ),
);
