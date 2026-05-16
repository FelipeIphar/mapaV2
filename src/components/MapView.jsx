import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  
  useMapEvents
} from 'react-leaflet';
import { iconos } from './icons';
import 'leaflet/dist/leaflet.css';

function ClickHandler({ onMapClick }) {
  useMapEvents({
    click(e) {
      onMapClick(e.latlng);
    }
  });

  return null;
}

export default function MapView({
  incidentes,
  form,
  onMapClick
}) {
  return (
    <MapContainer
      center={[-42.91147, -71.31947]}
      zoom={14}
      className="leaflet-map"
    >
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        attribution="&copy; OpenStreetMap & CARTO"
      />

      <ClickHandler
        onMapClick={onMapClick}
      />

      {/* marcador temporal */}
      {form.latitud && (
        <Marker
          position={[
            form.latitud,
            form.longitud
          ]}
        >
          <Popup>
            Nuevo incidente
          </Popup>
        </Marker>
      )}

      {/* incidentes reales */}
      {incidentes.map((i) => (
        <Marker
          key={i.id}
          position={[
            i.latitud,
            i.longitud
          ]}
          icon={iconos[i.tipo]}
        >
          <Popup>
            <strong>{i.titulo}</strong>
            <br />
            Tipo: {i.tipo}
            <br />
            {i.descripcion}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}