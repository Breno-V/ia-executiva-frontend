//Mapa Leaflet (dynamic, ssr:false)
"use client";

import { useEffect, useState } from "react";
import styles from "./RegionalMap.module.css";

const markers = [
  { city: "São Paulo", lat: -23.55, lng: -46.63, revenue: "R$ 1.2M" },
  { city: "Campinas", lat: -22.9, lng: -47.06, revenue: "R$ 850k" },
  { city: "Belo Horizonte", lat: -19.92, lng: -43.94, revenue: "R$ 620k" },
];

export default function RegionalMap() {
  const [MapComponents, setMapComponents] = useState(null);

  useEffect(() => {
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