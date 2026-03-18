//chamadas ao backend

import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000",
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor — adiciona o token JWT em todas as requisições automaticamente
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor — se o token expirar, redireciona para o login
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("access_token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

// ─── Auth ───────────────────────────────────────────────
export async function login(email, password) {
  const response = await api.post("/auth/login", { email, password });
  const { access_token } = response.data;
  localStorage.setItem("access_token", access_token);
  return access_token;
}

export function logout() {
  localStorage.removeItem("access_token");
  window.location.href = "/login";
}

export function isAuthenticated() {
  if (typeof window === "undefined") return false;
  return !!localStorage.getItem("access_token");
}

// ─── Dashboard ──────────────────────────────────────────
export async function getKpisDaily() {
  const response = await api.get("/dashboard/kpis/daily");
  return response.data;
}

export async function getKpisMonthly() {
  const response = await api.get("/dashboard/kpis/monthly");
  return response.data;
}

export async function getAlerts() {
  const response = await api.get("/dashboard/alerts");
  return response.data;
}

export async function getRevenueByChannel() {
  const response = await api.get("/dashboard/kpis/channels");
  return response.data;
}

export async function getRevenueByRegion() {
  const response = await api.get("/dashboard/kpis/regional");
  return response.data;
}

// ─── Insights ───────────────────────────────────────────
export async function getInsights() {
  const response = await api.get("/insights/");
  return response.data;
}


export default api;