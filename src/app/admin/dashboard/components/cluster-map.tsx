// src/app/admin/dashboard/components/cluster-map.tsx
"use client";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { NodeStatus } from "@/types/index";

L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

export default function ClusterMap({ nodes }: { nodes: NodeStatus[] }) {
  return (
    <MapContainer
      center={[51.505, -0.09]}
      zoom={5}
      style={{ height: "100%", width: "100%" }}
      className="rounded-lg"
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; OpenStreetMap contributors'
      />
      {nodes.map((node) => (
        <Marker key={node.id} position={[node.location.lat, node.location.lng]}>
          <Popup>
            <div className="space-y-1 text-sm">
              <h3 className="font-bold text-cyan-600">{node.name}</h3>
              <p>Status: <span className="font-mono">{node.status}</span></p>
              <p>Throughput: <span className="font-mono text-purple-500">
                {node.throughput.toFixed(1)}MB/s
              </span></p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}