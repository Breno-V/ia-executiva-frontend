import { describe, it, expect, vi, beforeEach } from "vitest";
import { useAuthStore } from "@/store/authStore";
import { useKpiStore } from "@/store/kpiStore";

vi.mock("@/services/api/auth", () => ({
  login: vi.fn(),
  logout: vi.fn(),
}));

vi.mock("@/services/api/client", () => ({
  default: { get: vi.fn() },
}));

import * as authApi from "@/services/api/auth";
import api from "@/services/api/client";

beforeEach(() => {
  useAuthStore.setState({ token: null, loading: false, error: null });
  useKpiStore.setState({
    kpiDaily: null,
    kpisMonthly: [],
    alerts: [],
    loading: false,
    error: null,
  });
});

describe("authStore", () => {
  it("starts unauthenticated", () => {
    expect(useAuthStore.getState().isAuthenticated()).toBe(false);
  });

  it("sets loading during login", async () => {
    vi.mocked(authApi.login).mockImplementation(() => new Promise(() => {}));
    useAuthStore.getState().login("test@test.com", "test");
    expect(useAuthStore.getState().loading).toBe(true);
  });

  it("sets token on successful login", async () => {
    vi.mocked(authApi.login).mockResolvedValue("fake-token");
    await useAuthStore.getState().login("test@test.com", "test");
    expect(useAuthStore.getState().isAuthenticated()).toBe(true);
    expect(useAuthStore.getState().token).toBe("fake-token");
    expect(useAuthStore.getState().loading).toBe(false);
  });

  it("sets error on failed login", async () => {
    vi.mocked(authApi.login).mockRejectedValue(
      new Error("Credenciais inválidas"),
    );
    await expect(
      useAuthStore.getState().login("bad@test.com", "wrong"),
    ).rejects.toThrow();
    expect(useAuthStore.getState().isAuthenticated()).toBe(false);
    expect(useAuthStore.getState().error).toBe("Credenciais inválidas");
    expect(useAuthStore.getState().loading).toBe(false);
  });

  it("clears token and error on logout", () => {
    useAuthStore.setState({ token: "some-token", error: "some-error" });
    useAuthStore.getState().logout();
    expect(useAuthStore.getState().isAuthenticated()).toBe(false);
    expect(useAuthStore.getState().token).toBeNull();
  });
});

describe("kpiStore", () => {
  it("starts with empty state", () => {
    const state = useKpiStore.getState();
    expect(state.kpiDaily).toBeNull();
    expect(state.kpisMonthly).toEqual([]);
    expect(state.alerts).toEqual([]);
    expect(state.loading).toBe(false);
    expect(state.error).toBeNull();
  });

  it("sets loading during fetch", () => {
    vi.mocked(api.get).mockImplementation(() => new Promise(() => {}));
    useKpiStore.getState().fetchKPIs();
    expect(useKpiStore.getState().loading).toBe(true);
  });

  it("updates state on successful fetch", async () => {
    const mockDaily = [{ id: 1, revenue: 1000 }];
    const mockMonthly = [{ id: 1, month: "01/2024", revenue: 5000 }];
    const mockAlerts = [{ id: 1, severity: "high", title: "Teste" }];

    vi.mocked(api.get)
      .mockResolvedValueOnce({ data: mockDaily })
      .mockResolvedValueOnce({ data: mockMonthly })
      .mockResolvedValueOnce({ data: mockAlerts });

    await useKpiStore.getState().fetchKPIs();

    const state = useKpiStore.getState();
    expect(state.kpiDaily).toEqual(mockDaily[0]);
    expect(state.kpisMonthly).toEqual([...mockMonthly].reverse());
    expect(state.alerts).toEqual(mockAlerts);
    expect(state.loading).toBe(false);
    expect(state.error).toBeNull();
  });

  it("falls back to mock data on failed fetch", async () => {
    vi.mocked(api.get).mockRejectedValue(new Error("Network error"));
    await useKpiStore.getState().fetchKPIs();
    const state = useKpiStore.getState();
    expect(state.kpiDaily).not.toBeNull();
    expect(state.kpisMonthly.length).toBeGreaterThan(0);
    expect(state.alerts.length).toBeGreaterThan(0);
    expect(state.loading).toBe(false);
    expect(state.error).toBeNull();
  });
});
