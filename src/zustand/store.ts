import create from "zustand";

type State = {
  token: null | string;
};

type Actions = {
  login: (token: State["token"]) => void;
  logout: () => void;
};

const useStore = create<State & Actions>((set) => ({
  token: null,
  login: (token: State["token"]) => set(() => ({ token: token })),
  logout: () => set(() => ({ token: null })),
}));

export const useLogin = () => useStore((state) => state.login);
export const useLogout = () => useStore((state) => state.logout);
export const useToken = () => useStore((state) => state.token);
