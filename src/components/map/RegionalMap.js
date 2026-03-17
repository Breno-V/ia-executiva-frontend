//Mapa Leaflet (dynamic, ssr:false)
"use client";

import { useEffect, useState } from "react";
import styles from "./RegionalMap.module.css";
import { getRevenueByRegion } from "@/libs/api";
import { formatCurrency } from "@/libs/formatters";
import { REGION_COORDS } from "@/libs/constants";

export default function RegionalMap() {
  const [MapComponents, setMapComponents] = useState(null);
  const [markers, setMarkers] = useState([]);


  useEffect(() => {
    // Busca dados do backend
    getRevenueByRegion().then((regions) => {
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
    }).catch(() => {
      // Fallback com dados estáticos se o backend falhar
      setMarkers([
        { city: "São Paulo", lat: -23.55, lng: -46.63, region: "Sudeste", revenue: "—" },
        { city: "Curitiba", lat: -25.42, lng: -49.27, region: "Sul", revenue: "—" },
      ]);
    });

    import("leaflet").then((L) => {
      delete L.Icon.Default.prototype._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
        iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      });
    });

    import("react-leaflet").then(({ MapContainer, TileLayer, Marker, Popup }) => {
      setMapComponents({ MapContainer, TileLayer, Marker, Popup });
    });
  }, []);

  if (!MapComponents) return <div className={styles.loading}>Carregando mapa...</div>;

  const { MapContainer, TileLayer, Marker, Popup } = MapComponents;

  return (
    <div className={styles.wrapper}>
      <MapContainer
        center={[-22.9, -47.06]}
        zoom={6}
        className={styles.map}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; OpenStreetMap contributors'
        />
        {markers.map((marker) => (
          <Marker key={marker.city} position={[marker.lat, marker.lng]}>
            <Popup>
              <strong>{marker.city}</strong><br />
              Receita: {marker.revenue}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}