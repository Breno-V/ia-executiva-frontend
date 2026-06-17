import api from "./client";
import type { LoginResponse } from "@/types";

function setTokenCookie(token: string) {
  const isHttps = typeof window !== "undefined" && window.location.protocol === "https:";
  const secure = isHttps ? "; Secure" : "";
  document.cookie = `access_token=${token}; path=/; max-age=${60 * 60 * 24}; SameSite=Strict${secure}`;
}

function removeTokenCookie() {
  document.cookie = "access_token=; path=/; max-age=0";
}

export async function login(email: string, password: string): Promise<string> {
  const response = await api.post<LoginResponse>("/auth/login", { email, password });
  const { access_token } = response.data;
  localStorage.setItem("access_token", access_token);
  setTokenCookie(access_token);
  return access_token;
}

export function logout(): void {
  localStorage.removeItem("access_token");
  removeTokenCookie();
  window.location.href = "/login";
}

export function isAuthenticated(): boolean {
  if (typeof window === "undefined") return false;
  const hasCookie = document.cookie.includes("access_token=");
  const hasLocal = !!localStorage.getItem("access_token");
  return hasCookie || hasLocal;
}

export async function refreshToken(): Promise<string> {
  const currentToken = localStorage.getItem("access_token");
  if (!currentToken) throw new Error("No token to refresh");

  const response = await api.post<LoginResponse>("/auth/refresh", {
    access_token: currentToken,
  });
  const { access_token } = response.data;
  localStorage.setItem("access_token", access_token);
  setTokenCookie(access_token);
  return access_token;
}
