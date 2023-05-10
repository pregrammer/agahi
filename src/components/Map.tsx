import {
  MapContainer,
  TileLayer,
  useMapEvents,
  Marker,
  Popup,
} from "react-leaflet";

interface Prop {
  coordinates: [lat: number, lng: number];
  handleCoordinates?: (value: [lat: number, lng: number]) => void;
}

const Map = ({ coordinates, handleCoordinates }: Prop) => {
  return (
    <MapContainer center={coordinates} zoom={13} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <LocationMarker
        coordinates={coordinates}
        handleCoordinates={handleCoordinates}
      />
    </MapContainer>
  );
};

export default Map;

function LocationMarker({ coordinates, handleCoordinates }: Prop) {
  useMapEvents({
    click(e) {
      if (handleCoordinates) {
        handleCoordinates([e.latlng.lat, e.latlng.lng]);
      }
    },
  });

  return (
    <Marker position={coordinates}>
      <Popup>مکان مورد نظر شما</Popup>
    </Marker>
  );
}
