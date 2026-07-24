import { useState } from "react";
function EmployeeFormModal({ editEmployee, onClose, onSave }) {
  const [name, setName] = useState(editEmployee ? editEmployee.name : "");
  const [email, setEmail] = useState(editEmployee ? editEmployee.email : "");
  const [department, setDepartment] = useState(
    editEmployee ? editEmployee.department : "Engineering",
  );
  const [position, setPosition] = useState(
    editEmployee ? editEmployee.position : "",
  );
  const [status, setStatus] = useState(
    editEmployee ? editEmployee.status : "Active",
  );
  const [salary, setSalary] = useState(editEmployee ? editEmployee.salary : "");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // simple validation
    if (!name || !email || !position || !salary) {
      setError("ERR: all fields are required");
      return;
    }

    const employeeData = {
      name: name,
      email: email,
      department: department,
      position: position,
      status: status,
      salary: Number(salary),
    };

    onSave(employeeData);
  };

  const inputClass =
    "w-full bg-transparent border border-ink/20 dark:border-paper/20 px-3 py-2 outline-none focus:border-signal text-sm text-ink dark:text-paper";

  return (
    <div className="fixed inset-0 bg-ink/80 flex items-center justify-center z-50 px-4">
      <div className="bg-white dark:bg-surface w-full max-w-md border border-ink/10 dark:border-edge max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between px-4 py-2 bg-ink dark:bg-surface2 sticky top-0">
          <span className="text-paper text-xs tracking-widest">
            {editEmployee ? "EDIT_RECORD" : "NEW_RECORD"}
          </span>
          <span className="w-2 h-2 rounded-full bg-signal"></span>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="mb-3">
            <label className="block text-xs text-muted dark:text-muted-light mb-1 tracking-widest">
              NAME
            </label>
            <input
              type="text"
              className={inputClass}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="block text-xs text-muted dark:text-muted-light mb-1 tracking-widest">
              EMAIL
            </label>
            <input
              type="text"
              className={inputClass}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="block text-xs text-muted dark:text-muted-light mb-1 tracking-widest">
              DEPARTMENT
            </label>
            <select
              className={inputClass}
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
            >
              <option className="text-ink">Engineering</option>
              <option className="text-ink">HR</option>
              <option className="text-ink">Marketing</option>
              <option className="text-ink">Sales</option>
              <option className="text-ink">Finance</option>
            </select>
          </div>

          <div className="mb-3">
            <label className="block text-xs text-muted dark:text-muted-light mb-1 tracking-widest">
              POSITION
            </label>
            <input
              type="text"
              className={inputClass}
              value={position}
              onChange={(e) => setPosition(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="block text-xs text-muted dark:text-muted-light mb-1 tracking-widest">
              STATUS
            </label>
            <select
              className={inputClass}
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option className="text-ink">Active</option>
              <option className="text-ink">Inactive</option>
            </select>
          </div>

          <div className="mb-3">
            <label className="block text-xs text-muted dark:text-muted-light mb-1 tracking-widest">
              SALARY
            </label>
            <input
              type="number"
              className={inputClass}
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
            />
          </div>

          {error && (
            <p className="text-rust dark:text-rust-light text-xs mb-2">
              {error}
            </p>
          )}

          <div className="flex flex-col-reverse sm:flex-row justify-end gap-2 mt-5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-ink/20 dark:border-paper/20 text-ink dark:text-paper text-xs tracking-widest hover:border-ink dark:hover:border-paper"
            >
              CANCEL
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-ink dark:bg-signal text-paper dark:text-ink text-xs tracking-widest hover:bg-signal hover:text-ink transition-colors"
            >
              SAVE
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EmployeeFormModal;
