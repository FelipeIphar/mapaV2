export default function IncidentForm({
  form,
  setForm,
  onSubmit
}) {
  return (
    <div className="card">
      <h2>Nuevo incidente</h2>

      <form onSubmit={onSubmit}>
        <input
          placeholder="Título"
          value={form.titulo}
          onChange={(e) =>
            setForm({
              ...form,
              titulo: e.target.value
            })
          }
        />

        <textarea
          placeholder="Descripción"
          value={form.descripcion}
          onChange={(e) =>
            setForm({
              ...form,
              descripcion: e.target.value
            })
          }
        />
        <select
          value={form.tipo}
          onChange={(e) =>
            setForm({
              ...form,
              tipo: e.target.value
            })
          }
        >
          <option value="robo">Robo</option>

          <option value="violencia">
            Violencia
          </option>

          <option value="control">
            Control policial
          </option>

          <option value="sospechoso">
            Sospechoso
          </option>
        </select>

        <input
          placeholder="Latitud"
          value={form.latitud}
          readOnly
        />

        <input
          placeholder="Longitud"
          value={form.longitud}
          readOnly
        />

        <button type="submit">
          Agregar incidente
        </button>
      </form>

      <p style={{ marginTop: '10px' }}>
        Hacé click en el mapa para seleccionar ubicación
      </p>
    </div>
  );
}