import IncidentForm from './IncidentForm';
import IncidentList from './IncidentList';

export default function Sidebar({
  form,
  setForm,
  onSubmit,
  incidentes
}) {
  return (
    <aside className="sidebar">
      <h1>Mapa de Incidentes</h1>

      <IncidentForm
        form={form}
        setForm={setForm}
        onSubmit={onSubmit}
      />

      <IncidentList
        incidentes={incidentes}
      />
    </aside>
  );
}