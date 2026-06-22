import api from "./client";
import type { UnitStatus } from "@/types";

interface BackendUnitStatus {
  id: string;
  name: string;
  totalRisks: number;
  averageProbability: number;
  byImpact: { ALTO: number; MEDIO: number; BAIXO: number };
}

export async function getUnitStatuses(): Promise<UnitStatus[]> {
  const response = await api.get<{ data: BackendUnitStatus[] }>(
    "/units/status",
  );
  return (response.data.data || []).map((unit) => ({
    name: unit.name,
    status:
      unit.averageProbability >= 0.7
        ? "critical"
        : unit.averageProbability >= 0.4
          ? "attention"
          : "stable",
    financialImpact: unit.totalRisks * 150000,
  }));
}
