import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { getStoredAccessToken } from "@/services/api/client";

/**
 * Limpa a sessão simulada antes de cada teste para evitar vazamento entre casos.
 */
function resetAuthStorage() {
  localStorage.removeItem("access_token");
  document.cookie = "access_token=; path=/; max-age=0";
}

beforeEach(() => {
  resetAuthStorage();
});

afterEach(() => {
  resetAuthStorage();
});

describe("getStoredAccessToken", () => {
  it("prioriza o token do localStorage", () => {
    localStorage.setItem("access_token", "local-token");
    document.cookie = "access_token=cookie-token; path=/";

    expect(getStoredAccessToken()).toBe("local-token");
  });

  it("usa o cookie como fallback quando o localStorage esta vazio", () => {
    document.cookie = "access_token=cookie-token; path=/";

    expect(getStoredAccessToken()).toBe("cookie-token");
  });

  it("retorna null quando nao ha token disponivel", () => {
    expect(getStoredAccessToken()).toBeNull();
  });
});
