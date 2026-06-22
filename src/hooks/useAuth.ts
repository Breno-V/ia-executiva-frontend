import { useAuthStore } from "@/store/authStore";

export function useAuth() {
  const { token, loading, error, login, logout, isAuthenticated } =
    useAuthStore();
  return { token, loading, error, login, logout, isAuthenticated };
}
