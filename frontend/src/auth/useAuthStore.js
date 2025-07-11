import {create} from 'zustand';

export const useAuthStore = create((set) => ({
    token: null,
    setToken: (t) => set ({token: t}),
    clearToken: () => set ({token: null}),
    isAuthored: false,

}));