import "./LocationPage.css";
import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import { useStore } from "../../hooks/useStore";

export const LocationPage = () => {
  const { store } = useStore();

  return (
    <div className="location-page">
      <p>Find us on the {store.address}</p>
      <MapContainer
        center={[store.latitude, store.longitude]}
        zoom={10}
        scrollWheelZoom={true}
        className="map"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[store.latitude, store.longitude]} />
      </MapContainer>
    </div>
  );
};
