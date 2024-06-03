import Card from "./Card";

export default function OptsList() {
  const options = [
    {
      label: "Grados",
      path: "/dash/grades",
    },
    {
      label: "Usuarios",
      path: "/dash/users",
    },
    {
      label: "Asistencias",
      path: "/dash/assistances",
    },
    {
      label: "Asistencias",
      path: "/dash/assistances",
    },
    {
      label: "Asistencias",
      path: "/dash/assistances",
    },
    {
      label: "Asistencias",
      path: "/dash/assistances",
    },
  ];

  return (
    <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {options.map(({ label, path }, key) => (
        <li key={key}>
          <Card label={label} url={path} />
        </li>
      ))}
    </ul>
  );
}
