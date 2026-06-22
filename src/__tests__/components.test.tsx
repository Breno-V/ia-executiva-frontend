import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import Button from "@/components/ui/Button";
import AlertCard from "@/components/alerts/AlertCard";
import KpiCard from "@/components/kpi/KpiCard";
import SearchBar from "@/components/ui/SearchBar";

const mockPush = vi.fn();
vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: mockPush }),
}));

afterEach(() => cleanup());

describe("Button", () => {
  it("renders label", () => {
    render(<Button label="Testar" />);
    expect(screen.getByText("Testar")).toBeInTheDocument();
  });

  it("calls onClick when clicked", () => {
    const onClick = vi.fn();
    render(<Button label="Testar" onClick={onClick} />);
    fireEvent.click(screen.getByText("Testar"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("respects disabled state", () => {
    render(<Button label="Disabled" disabled />);
    expect(screen.getByText("Disabled")).toBeDisabled();
  });

  it("is not disabled by default", () => {
    render(<Button label="Testar" />);
    expect(screen.getByText("Testar")).toBeEnabled();
  });
});

describe("AlertCard", () => {
  it("renders title, description, solution and level badge", () => {
    render(
      <AlertCard
        level="high"
        title="Risco Alto"
        description="Descrição do risco"
        solution="Solução sugerida"
      />,
    );
    expect(screen.getByText("Risco Alto")).toBeInTheDocument();
    expect(screen.getByText("Descrição do risco")).toBeInTheDocument();
    expect(
      screen.getAllByText("Solução sugerida").length,
    ).toBeGreaterThanOrEqual(1);
    expect(screen.getByText("Alto")).toBeInTheDocument();
  });

  it("defaults to medium level", () => {
    render(<AlertCard title="Risco" description="Desc" solution="Sol" />);
    expect(screen.getByText("Médio")).toBeInTheDocument();
  });
});

describe("KpiCard", () => {
  it("renders title and value", () => {
    render(<KpiCard title="Receita" value="R$ 1.000" />);
    expect(screen.getByText("Receita")).toBeInTheDocument();
    expect(screen.getByText("R$ 1.000")).toBeInTheDocument();
  });

  it("shows positive trend badge with arrow", () => {
    render(<KpiCard title="ROI" value="312%" trend={15} />);
    expect(screen.getByText(/▲/)).toBeInTheDocument();
  });

  it("shows negative trend badge with arrow", () => {
    render(<KpiCard title="Custos" value="R$ 500" trend={-5} />);
    expect(screen.getByText(/▼/)).toBeInTheDocument();
  });

  it("hides trend badge when trend is null", () => {
    const { container } = render(
      <KpiCard title="Estático" value="—" trend={null} />,
    );
    expect(screen.getByText("Estático")).toBeInTheDocument();
    const badges = container.querySelectorAll(
      '[class*="badgeUp"], [class*="badgeDown"]',
    );
    expect(badges.length).toBe(0);
  });

  it("applies fullWidth class when prop is set", () => {
    const { container } = render(
      <KpiCard title="Full" value="R$ 1" fullWidth />,
    );
    expect(container.innerHTML).toContain("fullWidth");
  });
});

describe("SearchBar", () => {
  it("renders search input with placeholder and aria-label", () => {
    render(<SearchBar />);
    const input = screen.getByPlaceholderText(
      "Buscar por área, risco ou diagnóstico...",
    );
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute(
      "aria-label",
      "Buscar por área, risco ou diagnóstico",
    );
  });

  it("navigates to /gestao on Enter with query", () => {
    render(<SearchBar />);
    const input = screen.getByPlaceholderText(
      "Buscar por área, risco ou diagnóstico...",
    );
    fireEvent.change(input, { target: { value: "Risco financeiro" } });
    fireEvent.keyDown(input, { key: "Enter" });
    expect(mockPush).toHaveBeenCalledWith("/gestao?search=Risco%20financeiro");
  });

  it("does not navigate on Enter with empty query", () => {
    mockPush.mockClear();
    render(<SearchBar />);
    const input = screen.getByPlaceholderText(
      "Buscar por área, risco ou diagnóstico...",
    );
    fireEvent.keyDown(input, { key: "Enter" });
    expect(mockPush).not.toHaveBeenCalled();
  });
});
