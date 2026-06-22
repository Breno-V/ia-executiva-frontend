"use client";

import { useState, useEffect } from "react";

export interface ChartColors {
  text: string;
  accent: string;
  background: string;
  muted: string;
  grid: string;
  tooltipBg: string;
  tooltipBorder: string;
  accentLight: string;
  barBg: (index: number) => string;
}

function getSSRFallback(): ChartColors {
  return {
    text: "#F0F4F5",
    accent: "#2EB7D9",
    background: "#091113",
    muted: "rgba(255,255,255,0.5)",
    grid: "rgba(255,255,255,0.08)",
    tooltipBg: "rgba(9,17,19,0.95)",
    tooltipBorder: "rgba(255,255,255,0.15)",
    accentLight: "rgba(46,183,217,0.12)",
    barBg: (i: number) => `rgba(46, 183, 217, ${Math.max(1 - i * 0.15, 0.3)})`,
  };
}

function readColors(): ChartColors {
  if (typeof window === "undefined") return getSSRFallback();
  const el = document.documentElement;
  const s = getComputedStyle(el);
  const bg = s.getPropertyValue("--background").trim() || "#091113";
  const accent = s.getPropertyValue("--color-accent").trim() || "#2EB7D9";
  const fg = s.getPropertyValue("--foreground").trim() || "#F0F4F5";
  const borderRgb =
    s.getPropertyValue("--border-muted-rgb").trim() || "255, 255, 255";
  const surfaceRgb =
    s.getPropertyValue("--bg-surface-rgb").trim() || "9, 17, 19";
  const accentRgb = s.getPropertyValue("--accent-rgb").trim() || "46, 183, 217";

  return {
    text: fg,
    accent,
    background: bg,
    muted: `rgba(${borderRgb}, 0.5)`,
    grid: `rgba(${borderRgb}, 0.08)`,
    tooltipBg: `rgba(${surfaceRgb}, 0.95)`,
    tooltipBorder: `rgba(${borderRgb}, 0.15)`,
    accentLight: `rgba(${accentRgb}, 0.12)`,
    barBg: (i: number) => `rgba(${accentRgb}, ${Math.max(1 - i * 0.15, 0.3)})`,
  };
}

export function useChartTheme(): ChartColors {
  const [colors, setColors] = useState<ChartColors>(readColors);

  useEffect(() => {
    const observer = new MutationObserver(() => setColors(readColors()));
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);

  return colors;
}
