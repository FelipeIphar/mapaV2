export default function IncidentList({
  incidentes
}) {
  return (
    <div className="card">
      <h2>Incidentes recientes</h2>

      {incidentes.map((i) => (
        <div
          key={i.id}
          className="incident-item"
        >
          <strong>{i.titulo}</strong>

          <p>{i.descripcion}</p>
        </div>
      ))}
    </div>
  );
}