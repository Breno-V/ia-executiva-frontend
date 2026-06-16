import { create } from "zustand";
import * as authApi from "@/services/api/auth";

interface AuthState {
  token: string | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: () => boolean;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  token: typeof window !== "undefined" ? localStorage.getItem("access_token") : null,
  loading: false,
  error: null,

  login: async (email, password) => {
    set({ loading: true, error: null });
    try {
      const token = await authApi.login(email, password);
      set({ token, loading: false });
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Email ou senha incorretos.";
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
