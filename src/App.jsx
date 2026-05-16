import { useEffect, useState } from 'react';
import axios from 'axios';

import './styles/globals.css';

import Sidebar from './components/Sidebar';
import MapView from './components/MapView';

const API_URL = 'https://TU-BACKEND.onrender.com/incidentes';

export default function App() {
  const [incidentes, setIncidentes] = useState([]);

  const [form, setForm] = useState({
    titulo: '',
    descripcion: '',
    tipo: 'robo',
    latitud: '',
    longitud: ''
  });

  useEffect(() => {
    async function cargarIncidentes() {
      try {
        const res = await axios.get(API_URL);
        setIncidentes(res.data);
      } catch (error) {
        console.error(error);
      }
    }

    cargarIncidentes();
  }, []);

  async function agregarIncidente(e) {
    e.preventDefault();

    try {
      const res = await axios.post(API_URL, {
        ...form,
        latitud: parseFloat(form.latitud),
        longitud: parseFloat(form.longitud)
      });

      setIncidentes(prev => [...prev, res.data]);

      setForm({
        titulo: '',
        descripcion: '',
        tipo: 'robo',
        latitud: '',
        longitud: ''
      });

    } catch (error) {
      console.error(error);
    }
  }

  function handleMapClick(latlng) {
    setForm(prev => ({
      ...prev,
      latitud: latlng.lat,
      longitud: latlng.lng
    }));
  }

  return (
    <div className="app-container">
      <Sidebar
        form={form}
        setForm={setForm}
        onSubmit={agregarIncidente}
        incidentes={incidentes}
      />

      <main className="map-container">
        <MapView
          incidentes={incidentes}
          form={form}
          onMapClick={handleMapClick}
        />
      </main>
    </div>
  );
}