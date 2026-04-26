import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';
import './leafletFix';

const API_URL = "https://tu-backend.onrender.com/incidentes";

function ClickHandler({ onClick }) {
  useMapEvents({
    click(e) {
      onClick(e.latlng);
    }
  });
  return null;
}

export default function App() {
  const [incidentes, setIncidentes] = useState([]);
  const [form, setForm] = useState({ titulo: '', descripcion: '', latitud: '', longitud: '' });

  useEffect(() => {
    async function cargarIncidentes() {
      const res = await axios.get(API_URL);
      setIncidentes(res.data);
    }

    cargarIncidentes();
  }, []);


async function agregarIncidente(e) {
  e.preventDefault();

  const res = await axios.post(API_URL, {
    ...form,
    latitud: parseFloat(form.latitud),
    longitud: parseFloat(form.longitud)
  });

  setIncidentes([...incidentes, res.data]);

  setForm({ titulo: '', descripcion: '', latitud: '', longitud: '' });
}

  function handleMapClick(latlng) {
    setForm({ ...form, latitud: latlng.lat, longitud: latlng.lng });
  }


  return (
    <div style={{ height: '100vh', display: 'flex' }}>
      <div style={{ width: '70%' }}>
        <MapContainer center={[-42.909543115914516, -71.31157676671803]} zoom={13} style={{ height: '100%' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; OpenStreetMap contributors"
          />

          <ClickHandler onClick={handleMapClick} />

          {incidentes.map((i) => (
            <Marker key={i.id} position={[i.latitud, i.longitud]}>
              <Popup>
                <b>{i.titulo}</b><br />
                {i.descripcion}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      <div style={{ width: '30%', padding: '10px' }}>
        <h3>Nuevo incidente</h3>
        <form onSubmit={agregarIncidente}>
          <input
            placeholder="Título"
            value={form.titulo}
            onChange={(e) => setForm({ ...form, titulo: e.target.value })}
            required
          />
          <br />
          <input
            placeholder="Descripción"
            value={form.descripcion}
            onChange={(e) => setForm({ ...form, descripcion: e.target.value })}
            required
          />
          <br />
          <input placeholder="Latitud" value={form.latitud} readOnly />
          <br />
          <input placeholder="Longitud" value={form.longitud} readOnly />
          <br />
          <button type="submit">Agregar</button>
        </form>
        <p>Tip: hacé click en el mapa para elegir ubicación</p>
      </div>
    </div>
  );
}