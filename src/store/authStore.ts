import { create } from "zustand";
import * as authApi from "@/services/api/auth";

interface AuthState {
  token: string | null;
  loading: boolean;
  error: string | null;
  register: (
    name: string,
    email: string,
    password: string,
    companyName?: string,
    companyAddress?: string,
  ) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: () => boolean;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  token:
    typeof window !== "undefined" ? localStorage.getItem("access_token") : null,
  loading: false,
  error: null,

  register: async (name, email, password, companyName, companyAddress) => {
    set({ loading: true, error: null });
    try {
      await authApi.register(
        name,
        email,
        password,
        companyName,
        companyAddress,
      );
      set({ loading: false });
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Erro ao cadastrar.";
      set({ error: msg, loading: false });
      throw err;
    }
  },

  login: async (email, password) => {
    set({ loading: true, error: null });
    try {
      const token = await authApi.login(email, password);
      set({ token, loading: false });
    } catch (err) {
      const msg =
        err instanceof Error ? err.message : "Email ou senha incorretos.";
      set({ error: msg, loading: false });
      throw err;
    }
  },

  logout: () => {
    authApi.logout();
    set({ token: null });
  },

  isAuthenticated: () => {
    return get().token !== null;
  },
}));
