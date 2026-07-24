function AnalyticsCards({ employees }) {
  const total = employees.length;
  const active = employees.filter((emp) => emp.status === "Active").length;
  const inactive = employees.filter((emp) => emp.status === "Inactive").length;

  const departmentList = employees.map((emp) => emp.department);
  const uniqueDepartments = [...new Set(departmentList)];
  const departmentCount = uniqueDepartments.length;

  const cards = [
    {
      label: "TOTAL EMPLOYEES",
      value: total,
      color: "text-ink dark:text-paper",
    },
    {
      label: "ACTIVE",
      value: active,
      color: "text-terminal dark:text-terminal-light",
    },
    {
      label: "INACTIVE",
      value: inactive,
      color: "text-rust dark:text-rust-light",
    },
    {
      label: "DEPARTMENTS",
      value: departmentCount,
      color: "text-signal dark:text-signal-light",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-ink/10 dark:bg-edge border border-ink/10 dark:border-edge mb-6">
      {cards.map((card, index) => (
        <div key={index} className="bg-white dark:bg-surface p-4">
          <p className="text-muted dark:text-muted-light text-xs tracking-widest mb-2">
            {card.label}
          </p>
          <p className={`text-3xl font-semibold ${card.color}`}>{card.value}</p>
        </div>
      ))}
    </div>
  );
}

export default AnalyticsCards;
