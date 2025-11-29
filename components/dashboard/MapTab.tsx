import React, { useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  useMap
} from "react-leaflet";
import * as L from "leaflet";
import { DashboardContent } from "../../types";

// Fix Leaflet icons (only once)
if (!(L as any)._iconsPatched) {
  delete (L.Icon.Default.prototype as any)._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  });
  (L as any)._iconsPatched = true;
}

// Custom Icons
const RedIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const BlueIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const GreenIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// Helper component to fix map resizing issues in tabs
const FixMapResize = () => {
  const map = useMap();
  useEffect(() => {
    // Only proceed if map and container are available
    if (!map || !map.getContainer()) return;

    const timer = setTimeout(() => {
      try {
        // Double check existence inside timeout before execution and ensure it is connected to DOM
        if (map && map.getContainer() && map.getContainer().isConnected) {
             map.invalidateSize();
        }
      } catch (err) {
        // Silent catch to prevent production crashes for resize race conditions
        console.warn('Map resize error suppressed:', err);
      }
    }, 200); 

    return () => clearTimeout(timer);
  }, [map]);
  return null;
};

interface MapTabProps {
  content: DashboardContent['map'];
}

const MapTab: React.FC<MapTabProps> = ({ content }) => {
  // Yangon Region Approx Coordinates
  // Point A: Industrial Zone (Hypothetical SMR Site) - Near Thilawa
  const pointA: [number, number] = [16.6800, 96.2500]; 
  // Point B: City Center / Load Center
  const pointB: [number, number] = [16.8409, 96.1735];
  // Point C: Hlaing Tharyar Industrial Zone
  const pointC: [number, number] = [16.8500, 96.0800];

  const transmissionLine1: [number, number][] = [pointA, pointB];
  const transmissionLine2: [number, number][] = [pointA, pointC];

  return (
    <div className="w-full h-[600px] rounded-xl overflow-hidden border border-white/10 shadow-2xl relative animate-fade-in">
      <MapContainer
        center={[16.8000, 96.1500]}
        zoom={11}
        style={{ height: "100%", width: "100%" }}
        className="z-0"
        attributionControl={false}
      >
        <FixMapResize />

        {/* Dark Mode Map Tiles */}
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />

        <Marker position={pointA} icon={RedIcon}>
          <Popup>
            <div className="font-sans">
              <h3 className="font-bold text-red-600">{content.popup.smr}</h3>
              <p>Active Output: 300 MW</p>
              <p>Status: Nominal</p>
            </div>
          </Popup>
        </Marker>

        <Marker position={pointB} icon={BlueIcon}>
           <Popup>
            <div className="font-sans">
              <h3 className="font-bold text-blue-600">{content.popup.loadCenter}</h3>
              <p>Demand: 850 MW</p>
              <p>Grid Stability: High</p>
            </div>
          </Popup>
        </Marker>

        <Marker position={pointC} icon={GreenIcon}>
           <Popup>
            <div className="font-sans">
              <h3 className="font-bold text-green-600">{content.popup.industrial}</h3>
              <p>Demand: 450 MW</p>
              <p>Backup: Active</p>
            </div>
          </Popup>
        </Marker>

        <Polyline
          positions={transmissionLine1}
          pathOptions={{ color: "#2dd4bf", weight: 3, dashArray: '10, 10', opacity: 0.8 }}
        />
        <Polyline
          positions={transmissionLine2}
          pathOptions={{ color: "#2dd4bf", weight: 3, dashArray: '10, 10', opacity: 0.8 }}
        />
      </MapContainer>
      
      {/* Legend Overlay */}
      <div className="absolute top-4 right-4 bg-slate-900/90 backdrop-blur-md p-4 rounded-xl border border-white/10 z-[1000] shadow-lg">
          <h4 className="text-white font-bold mb-3 text-sm">{content.legend.title}</h4>
          <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2 text-gray-300">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <span>{content.legend.smr}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                  <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                  <span>{content.legend.load}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span>{content.legend.ind}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                  <div className="w-8 h-1 bg-atom-400 border-b border-dashed"></div>
                  <span>{content.legend.line}</span>
              </div>
          </div>
      </div>
    </div>
  );
};

export default MapTab;