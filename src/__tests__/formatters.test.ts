import { describe, it, expect } from "vitest";
import { formatCurrency, formatPercent } from "@/libs/formatters";

describe("formatCurrency", () => {
  it("formats BRL currency", () => {
    expect(formatCurrency(1234567)).toBe("R$ 1.234.567");
  });

  it("returns dash for null", () => {
    expect(formatCurrency(null)).toBe("—");
  });

  it("returns dash for undefined", () => {
    expect(formatCurrency(undefined)).toBe("—");
  });
});

describe("formatPercent", () => {
  it("formats positive percent", () => {
    expect(formatPercent(34)).toBe("+34.0%");
  });

  it("returns dash for null", () => {
    expect(formatPercent(null)).toBe("—");
  });
});
