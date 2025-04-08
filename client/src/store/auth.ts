import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { User } from '@AppTypes/user';

type AuthUser = Pick<User, 'nickname' | 'profileImage' | '_id' | 'accessToken'>;

interface AuthState {
  isLogin: boolean;
  user: AuthUser | null;
  setUser: (user: AuthUser) => void;
  login: (user: AuthUser) => void;
  logout: () => void;
  updateUser: (userData: Partial<AuthUser>) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isLogin: false,
      user: null,

      setUser: (user: AuthUser) => set({ user }),

      login: (user: AuthUser) =>
        set({
          isLogin: true,
          user,
        }),

      logout: () =>
        set({
          isLogin: false,
          user: null,
        }),

      updateUser: (userData: Partial<AuthUser>) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...userData } : null,
        })),
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        isLogin: state.isLogin,
        user: state.user,
      }),
    },
  ),
);
