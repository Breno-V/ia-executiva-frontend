"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./RegionalMap.module.css";
import { getRevenueByRegion } from "@/services/api/dashboard";
import { formatCurrency } from "@/libs/formatters";
import { REGION_COORDS } from "@/libs/constants";
import type { RegionRevenue } from "@/types";
interface MarkerData {
  city: string;
  lat: number;
  lng: number;
  region: string;
  revenue: string;
}

interface MapComponents {
  MapContainer: React.ComponentType<any>;
  TileLayer: React.ComponentType<any>;
  Marker: React.ComponentType<any>;
  Popup: React.ComponentType<any>;
}

const createCustomIcon = (L: typeof import("leaflet")) =>
  L.divIcon({
    className: "",
    html: `
      <div style="position:relative;width:32px;height:32px">
        <div style="position:absolute;inset:0;border-radius:50%;background:rgba(var(--accent-rgb),0.15);border:1.5px solid rgba(var(--accent-rgb),0.4);animation:pulse 2s ease-out infinite;"></div>
        <div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:12px;height:12px;border-radius:50%;background:var(--color-accent);box-shadow:0 0 8px rgba(var(--accent-rgb),0.8);"></div>
      </div>
    `,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, -18],
  });

export default function RegionalMap() {
  const [MapComponents, setMapComponents] = useState<MapComponents | null>(
    null,
  );
  const [markers, setMarkers] = useState<MarkerData[]>([]);
  const [isLight, setIsLight] = useState(false);
  const leafletRef = useRef<typeof import("leaflet") | null>(null);

  useEffect(() => {
    getRevenueByRegion()
      .then((regions: RegionRevenue[]) => {
        const mapped = regions
          .filter((r) => REGION_COORDS[r.region])
          .map((r) => ({
            city: REGION_COORDS[r.region].city,
            lat: REGION_COORDS[r.region].lat,
            lng: REGION_COORDS[r.region].lng,
            region: r.region,
            revenue: formatCurrency(r.total),
          }));
        setMarkers(mapped);
      })
      .catch(() => {
        setMarkers([
          {
            city: "São Paulo",
            lat: -23.55,
            lng: -46.63,
            region: "Sudeste",
            revenue: "—",
          },
          {
            city: "Curitiba",
            lat: -25.42,
            lng: -49.27,
            region: "Sul",
            revenue: "—",
          },
        ]);
      });

    import("leaflet").then((L) => {
      leafletRef.current = L;
      delete (L.Icon.Default.prototype as unknown as Record<string, unknown>)
        ._getIconUrl;
    });

    import("react-leaflet").then(
      ({ MapContainer, TileLayer, Marker, Popup }) => {
        setMapComponents({ MapContainer, TileLayer, Marker, Popup });
      },
    );

    function updateTheme() {
      setIsLight(document.documentElement.classList.contains("light"));
    }
    updateTheme();
    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);

  if (!MapComponents) {
    return (
      <div className={styles.wrapper}>
        <div className={styles.loading}>Carregando mapa...</div>
      </div>
    );
  }

  const { MapContainer, TileLayer, Marker, Popup } = MapComponents;

  const L = leafletRef.current;
  const customIcon = L ? createCustomIcon(L) : null;

  return (
    <div className={styles.wrapper}>
      <style>{`
        @keyframes pulse {
          0%   { transform: scale(1);   opacity: 0.8; }
          70%  { transform: scale(2.2); opacity: 0; }
          100% { transform: scale(2.2); opacity: 0; }
        }
        .leaflet-popup-content-wrapper {
          background: rgba(var(--bg-surface-rgb), 0.95) !important;
          border: 1px solid rgba(var(--accent-rgb), 0.25) !important;
          border-radius: 0.75rem !important;
          box-shadow: 0 4px 24px rgba(0,0,0,0.5) !important;
          color: var(--foreground) !important;
          backdrop-filter: blur(12px);
        }
        .leaflet-popup-tip { background: rgba(var(--bg-surface-rgb), 0.95) !important; }
        .leaflet-popup-content { margin: 12px 16px !important; font-family: inherit !important; }
        .leaflet-container { font-family: inherit !important; background: var(--background) !important; }
        .leaflet-control-attribution { background: rgba(var(--bg-surface-rgb), 0.7) !important; color: rgba(var(--border-muted-rgb), 0.3) !important; font-size: 10px !important; }
        .leaflet-control-attribution a { color: rgba(var(--accent-rgb), 0.5) !important; }
        .leaflet-control-zoom a { background: rgba(var(--bg-surface-rgb), 0.9) !important; color: var(--color-primary) !important; border-color: rgba(var(--border-muted-rgb), 0.1) !important; }
        .leaflet-control-zoom a:hover { background: rgba(var(--accent-rgb), 0.15) !important; }
        .leaflet-grab { cursor: grab !important; }
        .leaflet-dragging .leaflet-grab { cursor: grabbing !important; }
      `}</style>

      <MapContainer
        center={[-15.0, -52.0]}
        zoom={4}
        className={styles.map}
        zoomControl={true}
      >
        <TileLayer
          url={`https://{s}.basemaps.cartocdn.com/${isLight ? "light_all" : "dark_all"}/{z}/{x}/{y}{r}.png`}
          attribution='&copy; <a href="https://carto.com/">CARTO</a>'
        />

        {markers.map((marker) => (
          <Marker
            key={marker.city}
            position={[marker.lat, marker.lng]}
            icon={customIcon || undefined}
          >
            <Popup>
              <div style={{ minWidth: "130px" }}>
                <p
                  style={{
                    margin: "0 0 4px",
                    fontSize: "0.8rem",
                    color: "var(--color-accent)",
                    fontWeight: 600,
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                  }}
                >
                  {marker.region}
                </p>
                <p
                  style={{
                    margin: "0 0 2px",
                    fontSize: "1rem",
                    fontWeight: 700,
                    color: "var(--foreground)",
                  }}
                >
                  {marker.city}
                </p>
                <p
                  style={{
                    margin: "6px 0 0",
                    fontSize: "0.8rem",
                    color: "rgba(var(--border-muted-rgb),0.5)",
                  }}
                >
                  Receita do mês
                </p>
                <p
                  style={{
                    margin: "2px 0 0",
                    fontSize: "1.1rem",
                    fontWeight: 700,
                    color: "var(--color-accent)",
                  }}
                >
                  {marker.revenue}
                </p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
