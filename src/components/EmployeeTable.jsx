function EmployeeTable({ employees, onEdit, onDelete, startIndex }) {
  if (employees.length === 0) {
    return (
      <div className="border border-ink/10 dark:border-edge bg-white dark:bg-surface p-10 text-center">
        <p className="font-serif italic text-muted dark:text-muted-light">
          No Employees Found
        </p>
        <p className="text-xs text-muted dark:text-muted-light mt-1">
          the index is empty for this query
        </p>
      </div>
    );
  }

  return (
    <div className="border border-ink/10 dark:border-edge bg-white dark:bg-surface overflow-x-auto">
      <table className="w-full text-left border-collapse text-sm">
        <thead>
          <tr className="  dark:bg-surface2 text-signal dark:text-paper/80 text-xs tracking-widest">
            <th className="px-3 py-3 font-normal">#</th>
            <th className="px-4 py-3 font-normal">NAME</th>
            <th className="px-4 py-3 font-normal">EMAIL</th>
            <th className="px-4 py-3 font-normal">DEPT</th>
            <th className="px-4 py-3 font-normal">POSITION</th>
            <th className="px-4 py-3 font-normal">STATUS</th>
            <th className="px-4 py-3 font-normal">SALARY</th>
            <th className="px-4 py-3 font-normal">ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp, index) => {
            const rowNumber = String(startIndex + index + 1).padStart(4, "0");
            return (
              <tr
                key={emp.id}
                className="border-t border-ink/10 dark:border-edge hover:bg-signal/10 dark:hover:bg-signal/10 transition-colors"
              >
                <td className="px-3 py-3 text-muted dark:text-muted-light text-xs">
                  {rowNumber}
                </td>
                <td className="px-4 py-3 text-ink dark:text-paper">
                  {emp.name}
                </td>
                <td className="px-4 py-3 text-muted dark:text-muted-light">
                  {emp.email}
                </td>
                <td className="px-4 py-3 text-ink dark:text-paper">
                  {emp.department}
                </td>
                <td className="px-4 py-3 text-muted dark:text-muted-light">
                  {emp.position}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`text-xs tracking-wide ${
                      emp.status === "Active"
                        ? "text-terminal dark:text-terminal-light"
                        : "text-rust dark:text-rust-light"
                    }`}
                  >
                    [{emp.status === "Active" ? "ACTIVE" : "INACTIVE"}]
                  </span>
                </td>
                <td className="px-4 py-3 text-ink dark:text-paper">
                  &#8377;{emp.salary}
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <button
                    onClick={() => onEdit(emp)}
                    className="text-signal dark:text-signal-light hover:underline mr-3 text-xs tracking-wide"
                  >
                    EDIT
                  </button>
                  <button
                    onClick={() => onDelete(emp.id)}
                    className="text-rust dark:text-rust-light hover:underline text-xs tracking-wide"
                  >
                    DELETE
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default EmployeeTable;
